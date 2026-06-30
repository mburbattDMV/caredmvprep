import { createClient } from '@/lib/supabase/server';
import { getStripe } from '@/lib/stripe/server';
import { PRODUCT_CONFIG } from '@/lib/stripe/config';
import type { SubscriptionProduct, PaymentType } from '@/types/database';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body        = await request.json();
    const product     = body.product     as SubscriptionProduct;
    const paymentType = body.paymentType as PaymentType;

    const config = PRODUCT_CONFIG[product];
    if (!config) {
      return Response.json({ error: 'Invalid product' }, { status: 400 });
    }

    // CDL endorsements require an active CDL Core subscription
    const CDL_ENDORSEMENTS = new Set(['cdl_hazmat', 'cdl_tanker', 'cdl_doubles_triples', 'cdl_school_bus', 'cdl_passenger']);
    if (CDL_ENDORSEMENTS.has(product)) {
      const now = new Date().toISOString();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: cdlSub } = await (supabase as any)
        .from('subscriptions')
        .select('payment_type, status, access_expires_at')
        .eq('user_id', user.id)
        .eq('product', 'cdl')
        .eq('status', 'active')
        .maybeSingle() as { data: { payment_type: string; status: string; access_expires_at: string | null } | null };

      const hasCdlCore = cdlSub && (
        cdlSub.payment_type === 'recurring' ||
        (cdlSub.payment_type === 'one_time' && cdlSub.access_expires_at !== null && cdlSub.access_expires_at > now)
      );

      if (!hasCdlCore) {
        return Response.json(
          { error: 'CDL Core subscription required to purchase endorsements.' },
          { status: 403 }
        );
      }
    }

    // Resolve target state and license — stored in Stripe metadata and written to profile by webhook
    const ALLOWED_STATES = new Set(['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC']);
    const PRODUCT_LICENSE_MAP: Partial<Record<string, string>> = {
      dmv:        'permit',
      motorcycle: 'motorcycle',
      cdl:        'cdl_general',
    };

    let resolvedState:   string;
    let resolvedLicense: string;

    if (CDL_ENDORSEMENTS.has(product)) {
      // Endorsements: derive state from the user's profile (set when CDL Core was purchased)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: profileData } = await (supabase as any)
        .from('profiles')
        .select('target_state, target_license')
        .eq('id', user.id)
        .single() as { data: { target_state: string | null; target_license: string | null } | null };
      resolvedState   = profileData?.target_state   ?? 'CA';
      resolvedLicense = profileData?.target_license ?? 'cdl_general';
    } else {
      // Core products: use state from request body, or fall back to saved profile
      let targetState    = body.target_state    as string | undefined;
      let profileLicense = body.target_license  as string | undefined;

      if (!targetState) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: profileFallback } = await (supabase as any)
          .from('profiles')
          .select('target_state, target_license')
          .eq('id', user.id)
          .maybeSingle() as { data: { target_state: string | null; target_license: string | null } | null };
        targetState    = profileFallback?.target_state    ?? undefined;
        profileLicense = profileFallback?.target_license  ?? undefined;
      }

      if (!targetState) {
        return Response.json(
          { error: 'Please complete onboarding to set your state before purchasing.' },
          { status: 400 }
        );
      }
      if (!ALLOWED_STATES.has(targetState)) {
        return Response.json(
          { error: 'That state is not yet available. Please check back soon.' },
          { status: 400 }
        );
      }
      resolvedState   = targetState;
      resolvedLicense = profileLicense ?? PRODUCT_LICENSE_MAP[product] ?? 'permit';
    }

    // Resolve price ID and Stripe checkout mode
    let priceId: string;
    let mode: 'subscription' | 'payment';

    if (paymentType === 'recurring') {
      if (!config.recurring) {
        return Response.json(
          { error: `${product} does not have a monthly subscription option.` },
          { status: 400 }
        );
      }
      if (!config.recurring.priceId) {
        return Response.json(
          { error: `Stripe monthly price not configured for ${product}. Set STRIPE_PRICE env var.` },
          { status: 503 }
        );
      }
      priceId = config.recurring.priceId;
      mode    = 'subscription';
    } else {
      if (!config.oneTime) {
        return Response.json(
          { error: `${product} does not have a one-time purchase option.` },
          { status: 400 }
        );
      }
      if (!config.oneTime.priceId) {
        return Response.json(
          { error: `Stripe one-time price not configured for ${product}. Set STRIPE_PRICE env var.` },
          { status: 503 }
        );
      }
      priceId = config.oneTime.priceId;
      mode    = 'payment';
    }

    const stripe  = getStripe();
    const appUrl  = process.env.NEXT_PUBLIC_APP_URL ?? 'https://caredmvprep.com';

    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      mode,
      payment_method_types: ['card'],
      line_items:           [{ price: priceId, quantity: 1 }],
      customer_email:       user.email,
      client_reference_id:  user.id,
      metadata: {
        user_id:        user.id,
        product,
        payment_type:   paymentType,
        target_state:   resolvedState,
        target_license: resolvedLicense,
      },
      success_url: `${appUrl}/account?checkout=success&product=${encodeURIComponent(product)}&type=${paymentType}`,
      cancel_url:  `${appUrl}/pricing`,
      allow_promotion_codes: true,
    };

    // Subscription-specific: copy metadata so webhook can read it from the subscription object
    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        metadata: {
          user_id:        user.id,
          product,
          payment_type:   paymentType,
          target_state:   resolvedState,
          target_license: resolvedLicense,
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return Response.json({ url: session.url });

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout session creation failed';
    console.error('[stripe/create-checkout]', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
