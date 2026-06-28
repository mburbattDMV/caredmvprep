import { createClient } from '@/lib/supabase/server';
import { getStripe } from '@/lib/stripe/server';
import { PRODUCT_CONFIG } from '@/lib/stripe/config';
import type { SubscriptionProduct } from '@/types/database';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Auth check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const product  = body.product  as SubscriptionProduct;
    const interval = body.interval as 'monthly' | 'annual';

    const config = PRODUCT_CONFIG[product];
    if (!config) {
      return Response.json({ error: 'Invalid product' }, { status: 400 });
    }

    const priceId = interval === 'annual' ? config.priceIdAnnual : config.priceIdMonthly;
    if (!priceId) {
      return Response.json(
        { error: `Stripe price not configured for ${product} ${interval}. Set env vars.` },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://caredmvprep.com';

    const session = await stripe.checkout.sessions.create({
      mode:                 'subscription',
      payment_method_types: ['card'],
      line_items:           [{ price: priceId, quantity: 1 }],
      customer_email:       user.email,
      client_reference_id:  user.id,
      metadata: {
        user_id:  user.id,
        product,
        interval,
      },
      subscription_data: {
        metadata: { user_id: user.id, product, interval },
      },
      success_url: `${appUrl}/account?checkout=success&product=${encodeURIComponent(product)}`,
      cancel_url:  `${appUrl}/pricing`,
      allow_promotion_codes: true,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout session creation failed';
    console.error('[stripe/create-checkout]', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
