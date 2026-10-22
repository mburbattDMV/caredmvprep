import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { PRODUCT_CONFIG } from '@/lib/stripe/config';
import { notifyAdminOfStripeEvent } from '@/lib/email/adminNotify';
import type { SubscriptionProduct, SubscriptionStatus, PaymentType } from '@/types/database';

export const dynamic = 'force-dynamic';

// Maps purchased product → default study path set on the user's profile.
// Only applied when target_state is null (user bought before completing onboarding).
const PRODUCT_PROFILE_MAP: Partial<Record<string, { target_state: string; target_license: string }>> = {
  dmv:        { target_state: 'CA', target_license: 'permit' },
  motorcycle: { target_state: 'CA', target_license: 'motorcycle' },
  cdl:        { target_state: 'CA', target_license: 'cdl_general' },
};

// ─── Plan ID lookup ───────────────────────────────────────────────────────────

async function getPlanId(
  supabase: ReturnType<typeof createAdminClient>,
  product:  SubscriptionProduct,
  interval: 'monthly' | 'one_time'
): Promise<string | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('subscription_plans')
    .select('id')
    .eq('product', product)
    .eq('interval', interval)
    .maybeSingle() as { data: { id: string } | null; error: { message: string; code: string } | null };

  if (error) {
    console.error(`[webhook] getPlanId query error for ${product}/${interval}:`, error.message, 'code:', error.code);
  }
  console.log(`[webhook] getPlanId(${product}, ${interval}) → data:`, JSON.stringify(data), 'error:', JSON.stringify(error));
  return data?.id ?? null;
}

// ─── Access upsert ────────────────────────────────────────────────────────────

interface UpsertArgs {
  userId:                 string;
  product:                SubscriptionProduct;
  paymentType:            PaymentType;
  planInterval:           'monthly' | 'one_time';
  stripeCustomerId:       string;
  stripeSubId:            string | null;
  stripeSubItemId:        string | null;
  stripePaymentIntentId:  string | null;
  status:                 SubscriptionStatus;
  periodStart:            Date | null;
  periodEnd:              Date | null;
  cancelAtEnd:            boolean;
  canceledAt:             Date | null;
  trialEnd:               Date | null;
  accessExpiresAt:        Date | null;   // one-time only
}

async function upsertAccess(
  supabase: ReturnType<typeof createAdminClient>,
  args: UpsertArgs
) {
  const planId = await getPlanId(supabase, args.product, args.planInterval);
  console.log(`[webhook] getPlanId(${args.product}, ${args.planInterval}) →`, planId);

  if (!planId) {
    console.warn(
      `[webhook] No subscription_plans row for product="${args.product}" interval="${args.planInterval}". ` +
      `Proceeding without plan_id — run migration 009 if this persists.`
    );
  }

  const row: Record<string, unknown> = {
    user_id:                     args.userId,
    ...(planId ? { plan_id: planId } : {}),
    product:                     args.product,
    payment_type:                args.paymentType,
    stripe_customer_id:          args.stripeCustomerId,
    stripe_subscription_id:      args.stripeSubId,
    stripe_subscription_item_id: args.stripeSubItemId,
    stripe_payment_intent_id:    args.stripePaymentIntentId,
    status:                      args.status,
    current_period_start:        args.periodStart?.toISOString()    ?? null,
    current_period_end:          args.periodEnd?.toISOString()      ?? null,
    cancel_at_period_end:        args.cancelAtEnd,
    canceled_at:                 args.canceledAt?.toISOString()     ?? null,
    trial_end:                   args.trialEnd?.toISOString()       ?? null,
    access_expires_at:           args.accessExpiresAt?.toISOString() ?? null,
  };

  console.log('[webhook] upserting row:', JSON.stringify(row));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('subscriptions') as any)
    .upsert(row, { onConflict: 'user_id,product' });

  if (error) {
    throw new Error(`[webhook] subscriptions upsert failed: ${error.message} (code: ${error.code})`);
  }

  console.log('[webhook] upsert succeeded for', args.userId, args.product);
}

// ─── Owner alerts ─────────────────────────────────────────────────────────────

function productLabel(p: string | undefined | null): string {
  return (p && PRODUCT_CONFIG[p as SubscriptionProduct]?.label) || p || 'unknown product';
}

async function sendOwnerAlert(event: Stripe.Event): Promise<void> {
  try {
    if (event.type === 'checkout.session.completed') {
      const s = event.data.object as Stripe.Checkout.Session;
      await notifyAdminOfStripeEvent({
        eventId: event.id, eventType: event.type, kind: 'New purchase',
        product: productLabel(s.metadata?.product),
        amountCents: s.amount_total, currency: s.currency,
        buyerEmail: s.customer_details?.email ?? s.customer_email,
      });
    } else if (event.type === 'invoice.payment_succeeded') {
      const inv = event.data.object as Stripe.Invoice;
      // The first invoice of a new subscription is already covered by checkout.session.completed.
      if (inv.billing_reason !== 'subscription_cycle') return;
      const meta = inv.parent?.type === 'subscription_details' ? inv.parent.subscription_details?.metadata : null;
      await notifyAdminOfStripeEvent({
        eventId: event.id, eventType: event.type, kind: 'Subscription renewal',
        product: productLabel(meta?.product),
        amountCents: inv.amount_paid, currency: inv.currency, buyerEmail: inv.customer_email,
      });
    } else if (event.type === 'invoice.payment_failed') {
      const inv = event.data.object as Stripe.Invoice;
      const meta = inv.parent?.type === 'subscription_details' ? inv.parent.subscription_details?.metadata : null;
      await notifyAdminOfStripeEvent({
        eventId: event.id, eventType: event.type, kind: 'Payment failed',
        product: productLabel(meta?.product),
        amountCents: inv.amount_due, currency: inv.currency, buyerEmail: inv.customer_email,
      });
    }
  } catch (err) {
    console.error('[webhook] owner alert error:', err instanceof Error ? err.message : err);
  }
}

// ─── Webhook handler ──────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const body      = await request.text();
  const signature = request.headers.get('stripe-signature') ?? '';
  const secret    = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET not set');
    return Response.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err);
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  let supabase: ReturnType<typeof createAdminClient>;
  try {
    supabase = createAdminClient();
    console.log('[webhook] createAdminClient() succeeded');
  } catch (err) {
    console.error('[webhook] createAdminClient() threw:', err);
    return Response.json({ error: 'Admin client init failed' }, { status: 500 });
  }

  try {
    switch (event.type) {

      // ── Checkout completed ────────────────────────────────────────────────
      // Handles BOTH subscription and one-time payment checkouts.
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log('[webhook] checkout.session.completed session.id:', session.id, 'mode:', session.mode);
        console.log('[webhook] metadata:', JSON.stringify(session.metadata));

        const userId      = session.metadata?.user_id;
        const product     = session.metadata?.product      as SubscriptionProduct | undefined;
        const paymentType = (session.metadata?.payment_type ?? 'recurring') as PaymentType;

        if (!userId || !product) {
          console.error('[webhook] checkout.session.completed missing metadata', session.id);
          break;
        }

        // ── Recurring subscription ──────────────────────────────────────────
        if (session.mode === 'subscription') {
          const sub  = await getStripe().subscriptions.retrieve(session.subscription as string);
          const item = sub.items.data[0];

          await upsertAccess(supabase, {
            userId,
            product,
            paymentType:           'recurring',
            planInterval:          'monthly',
            stripeCustomerId:      session.customer as string,
            stripeSubId:           sub.id,
            stripeSubItemId:       item?.id ?? null,
            stripePaymentIntentId: null,
            status:                'active',
            periodStart:           item?.current_period_start ? new Date(item.current_period_start * 1000) : null,
            periodEnd:             item?.current_period_end   ? new Date(item.current_period_end   * 1000) : null,
            cancelAtEnd:           sub.cancel_at_period_end,
            canceledAt:            null,
            trialEnd:              sub.trial_end ? new Date(sub.trial_end * 1000) : null,
            accessExpiresAt:       null,
          });

          // Set study path from checkout metadata (state/license chosen at purchase).
          // Falls back to PRODUCT_PROFILE_MAP for any replayed events without metadata.
          const targetState   = session.metadata?.target_state   ?? PRODUCT_PROFILE_MAP[product]?.target_state;
          const targetLicense = session.metadata?.target_license ?? PRODUCT_PROFILE_MAP[product]?.target_license;
          if (targetState && targetLicense) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase as any)
              .from('profiles')
              .update({ target_state: targetState, target_license: targetLicense, updated_at: new Date().toISOString() })
              .eq('id', userId)
              .is('target_state', null);
          }
          break;
        }

        // ── One-time payment ────────────────────────────────────────────────
        if (session.mode === 'payment') {
          // Guard: do NOT overwrite an active recurring subscription
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: existing } = await (supabase as any)
            .from('subscriptions')
            .select('payment_type, status')
            .eq('user_id', userId)
            .eq('product', product)
            .maybeSingle() as { data: { payment_type: string; status: string } | null };

          if (existing?.payment_type === 'recurring' && existing?.status === 'active') {
            console.warn(
              '[webhook] Skipping one-time upsert — user already has active recurring sub for',
              product, userId
            );
            break;
          }

          const durationMonths = PRODUCT_CONFIG[product]?.oneTime?.durationMonths ?? 3;
          const accessExpiresAt = new Date();
          accessExpiresAt.setMonth(accessExpiresAt.getMonth() + durationMonths);

          await upsertAccess(supabase, {
            userId,
            product,
            paymentType:           'one_time',
            planInterval:          'one_time',
            stripeCustomerId:      session.customer as string,
            stripeSubId:           null,
            stripeSubItemId:       null,
            stripePaymentIntentId: session.payment_intent as string,
            status:                'active',
            periodStart:           null,
            periodEnd:             null,
            cancelAtEnd:           false,
            canceledAt:            null,
            trialEnd:              null,
            accessExpiresAt,
          });

          // Set study path from checkout metadata (state/license chosen at purchase).
          // Falls back to PRODUCT_PROFILE_MAP for any replayed events without metadata.
          const targetState   = session.metadata?.target_state   ?? PRODUCT_PROFILE_MAP[product]?.target_state;
          const targetLicense = session.metadata?.target_license ?? PRODUCT_PROFILE_MAP[product]?.target_license;
          if (targetState && targetLicense) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase as any)
              .from('profiles')
              .update({ target_state: targetState, target_license: targetLicense, updated_at: new Date().toISOString() })
              .eq('id', userId)
              .is('target_state', null);
          }
          break;
        }

        break;
      }

      // ── Subscription renewed / updated ────────────────────────────────────
      case 'customer.subscription.updated': {
        const sub     = event.data.object as Stripe.Subscription;
        const userId  = sub.metadata?.user_id;
        const product = sub.metadata?.product as SubscriptionProduct | undefined;

        if (!userId || !product) {
          console.warn('[webhook] subscription.updated missing metadata', sub.id);
          break;
        }

        const statusMap: Record<string, SubscriptionStatus> = {
          active:             'active',
          canceled:           'canceled',
          past_due:           'past_due',
          trialing:           'trialing',
          incomplete:         'incomplete',
          unpaid:             'past_due',
          paused:             'canceled',
          incomplete_expired: 'canceled',
        };

        const subItem = sub.items.data[0];
        await upsertAccess(supabase, {
          userId,
          product,
          paymentType:           'recurring',
          planInterval:          'monthly',
          stripeCustomerId:      sub.customer as string,
          stripeSubId:           sub.id,
          stripeSubItemId:       subItem?.id ?? null,
          stripePaymentIntentId: null,
          status:                statusMap[sub.status] ?? 'active',
          periodStart:           subItem?.current_period_start ? new Date(subItem.current_period_start * 1000) : null,
          periodEnd:             subItem?.current_period_end   ? new Date(subItem.current_period_end   * 1000) : null,
          cancelAtEnd:           sub.cancel_at_period_end,
          canceledAt:            sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
          trialEnd:              sub.trial_end ? new Date(sub.trial_end * 1000) : null,
          accessExpiresAt:       null,
        });
        break;
      }

      // ── Subscription canceled (period ended) ──────────────────────────────
      case 'customer.subscription.deleted': {
        const sub     = event.data.object as Stripe.Subscription;
        const userId  = sub.metadata?.user_id;
        const product = sub.metadata?.product as SubscriptionProduct | undefined;

        if (!userId || !product) {
          console.warn('[webhook] subscription.deleted missing metadata', sub.id);
          break;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from('subscriptions') as any)
          .update({ status: 'canceled', canceled_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id);
        break;
      }

      // ── Payment failed (grace period → past_due) ──────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId =
          invoice.parent?.type === 'subscription_details'
            ? (invoice.parent.subscription_details?.subscription as string | null)
            : null;
        if (!subId) break;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from('subscriptions') as any)
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', subId);
        break;
      }

      // ── Subscription renewal paid (alert only; access dates come from subscription.updated) ──
      case 'invoice.payment_succeeded':
        break;

      default:
        break;
    }
  } catch (err) {
    console.error(`[webhook] Error handling ${event.type}:`, err);
    // Return 500 so Stripe retries. upsert uses onConflict so retries are idempotent.
    console.log('[webhook] → HTTP 500 returned to Stripe');
    return Response.json({ error: String(err) }, { status: 500 });
  }

  // Owner alerts run only after the event was processed successfully, never affect the response, and are
  // de-duplicated per Stripe event id (retries reuse the same Resend idempotency key).
  await sendOwnerAlert(event);

  console.log('[webhook] → HTTP 200 returned to Stripe');
  return Response.json({ received: true });
}
