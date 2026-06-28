import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { SubscriptionProduct, SubscriptionStatus } from '@/types/database';

// Must be dynamic — reads raw body + Stripe signature header
export const dynamic = 'force-dynamic';

// ─── DB helper ───────────────────────────────────────────────────────────────

async function getPlanId(
  supabase: ReturnType<typeof createAdminClient>,
  product: SubscriptionProduct,
  interval: 'monthly' | 'annual'
): Promise<string | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from('subscription_plans')
    .select('id')
    .eq('product', product)
    .eq('interval', interval)
    .single() as { data: { id: string } | null };
  return data?.id ?? null;
}

async function upsertSubscription(
  supabase: ReturnType<typeof createAdminClient>,
  args: {
    userId:           string;
    product:          SubscriptionProduct;
    interval:         string;
    stripeCustomerId: string;
    stripeSubId:      string;
    stripeSubItemId:  string | null;
    status:           SubscriptionStatus;
    periodStart:      Date | null;
    periodEnd:        Date | null;
    cancelAtEnd:      boolean;
    canceledAt:       Date | null;
    trialEnd:         Date | null;
  }
) {
  const planId = await getPlanId(supabase, args.product, args.interval as 'monthly' | 'annual');

  const row = {
    user_id:                     args.userId,
    plan_id:                     planId ?? '00000000-0000-0000-0000-000000000000', // fallback if plan missing
    product:                     args.product,
    stripe_customer_id:          args.stripeCustomerId,
    stripe_subscription_id:      args.stripeSubId,
    stripe_subscription_item_id: args.stripeSubItemId,
    status:                      args.status,
    current_period_start:        args.periodStart?.toISOString() ?? null,
    current_period_end:          args.periodEnd?.toISOString()   ?? null,
    cancel_at_period_end:        args.cancelAtEnd,
    canceled_at:                 args.canceledAt?.toISOString()  ?? null,
    trial_end:                   args.trialEnd?.toISOString()    ?? null,
  };

  await (supabase.from('subscriptions') as any)
    .upsert(row, { onConflict: 'user_id,product' });
}

// ─── Webhook handler ──────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const body      = await request.text();        // raw body required for sig verification
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

  const supabase = createAdminClient();

  try {
    switch (event.type) {

      // ── New checkout completed ─────────────────────────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== 'subscription') break;

        const userId   = session.metadata?.user_id;
        const product  = session.metadata?.product  as SubscriptionProduct | undefined;
        const interval = session.metadata?.interval ?? 'monthly';

        if (!userId || !product) {
          console.error('[webhook] checkout.session.completed missing metadata', session.id);
          break;
        }

        // Fetch the full subscription to get period dates and item ID.
        // In Stripe API 2025+, current_period_start/end live on the SubscriptionItem.
        const sub = await getStripe().subscriptions.retrieve(
          session.subscription as string
        );
        const item = sub.items.data[0];

        await upsertSubscription(supabase, {
          userId,
          product,
          interval,
          stripeCustomerId: session.customer as string,
          stripeSubId:      sub.id,
          stripeSubItemId:  item?.id ?? null,
          status:           'active',
          periodStart:      item?.current_period_start ? new Date(item.current_period_start * 1000) : null,
          periodEnd:        item?.current_period_end   ? new Date(item.current_period_end   * 1000) : null,
          cancelAtEnd:      sub.cancel_at_period_end,
          canceledAt:       null,
          trialEnd:         sub.trial_end ? new Date(sub.trial_end * 1000) : null,
        });
        break;
      }

      // ── Subscription updated (renewal, plan change, cancel toggled) ────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const userId   = sub.metadata?.user_id;
        const product  = sub.metadata?.product  as SubscriptionProduct | undefined;
        const interval = sub.metadata?.interval ?? 'monthly';

        if (!userId || !product) {
          console.warn('[webhook] subscription.updated missing metadata', sub.id);
          break;
        }

        const statusMap: Record<string, SubscriptionStatus> = {
          active:     'active',
          canceled:   'canceled',
          past_due:   'past_due',
          trialing:   'trialing',
          incomplete: 'incomplete',
          unpaid:     'past_due',
        };

        const subItem = sub.items.data[0];
        await upsertSubscription(supabase, {
          userId,
          product,
          interval,
          stripeCustomerId: sub.customer as string,
          stripeSubId:      sub.id,
          stripeSubItemId:  subItem?.id ?? null,
          status:           statusMap[sub.status] ?? 'active',
          periodStart:      subItem?.current_period_start ? new Date(subItem.current_period_start * 1000) : null,
          periodEnd:        subItem?.current_period_end   ? new Date(subItem.current_period_end   * 1000) : null,
          cancelAtEnd:      sub.cancel_at_period_end,
          canceledAt:       sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
          trialEnd:         sub.trial_end ? new Date(sub.trial_end * 1000) : null,
        });
        break;
      }

      // ── Subscription deleted (canceled and period ended) ───────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const userId   = sub.metadata?.user_id;
        const product  = sub.metadata?.product as SubscriptionProduct | undefined;

        if (!userId || !product) {
          console.warn('[webhook] subscription.deleted missing metadata', sub.id);
          break;
        }

        await (supabase.from('subscriptions') as any)
          .update({
            status:      'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', sub.id);
        break;
      }

      // ── Payment failed (grace period / past_due) ───────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        // In Stripe API 2025+, subscription is in invoice.parent.subscription_details.subscription
        const subId =
          invoice.parent?.type === 'subscription_details'
            ? (invoice.parent.subscription_details?.subscription as string | null)
            : null;
        if (!subId) break;

        await (supabase.from('subscriptions') as any)
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', subId);
        break;
      }

      default:
        // Acknowledge unknown events without error
        break;
    }
  } catch (err) {
    console.error(`[webhook] Error handling ${event.type}:`, err);
    // Return 200 so Stripe doesn't retry — log the error separately
  }

  return Response.json({ received: true });
}
