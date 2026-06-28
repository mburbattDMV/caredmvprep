// Client-side Stripe utilities (no secret key — safe to import in client components).
// Checkout sessions are created server-side via /api/stripe/create-checkout.

import type { SubscriptionProduct } from '@/types/database';

export type CheckoutInterval = 'monthly' | 'annual';

/**
 * Redirects the current page to Stripe Checkout for the given product.
 * Throws if the API returns an error (missing Stripe keys, invalid product, etc.).
 */
export async function startCheckout(
  product: SubscriptionProduct,
  interval: CheckoutInterval
): Promise<void> {
  const res = await fetch('/api/stripe/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product, interval }),
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error ?? `Checkout failed (${res.status})`);
  }

  const { url } = await res.json();
  if (!url) throw new Error('No checkout URL returned from server.');
  window.location.href = url;
}
