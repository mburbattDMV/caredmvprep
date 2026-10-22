import { ADMIN_NOTIFY_TO, sendEmail } from "./resend";
import { adminNotificationEmail } from "./templates";

/**
 * Owner alert for a Stripe event. Best-effort: never throws. The Resend idempotency key is derived from the
 * Stripe event id, so webhook retries of the same event do not produce a second email.
 */
export async function notifyAdminOfStripeEvent(args: {
  eventId: string;
  eventType: string;
  kind: string; // e.g. "New purchase"
  product: string;
  amountCents: number | null | undefined;
  currency: string | null | undefined;
  buyerEmail: string | null | undefined;
}): Promise<void> {
  try {
    const amount =
      typeof args.amountCents === "number"
        ? `${(args.amountCents / 100).toFixed(2)} ${(args.currency ?? "usd").toUpperCase()}`
        : "unknown";
    const { html, text } = adminNotificationEmail({
      kind: `CARE DMV Prep: ${args.kind}`,
      rows: [
        ["Event", args.eventType],
        ["Product", args.product],
        ["Amount", amount],
        ["Buyer", args.buyerEmail ?? "unknown"],
        ["Stripe event", args.eventId],
      ],
    });
    const r = await sendEmail({
      to: ADMIN_NOTIFY_TO,
      subject: `CARE DMV Prep: ${args.kind} (${args.product}, ${amount})`,
      html,
      text,
      idempotencyKey: `stripe-event-${args.eventId}`,
    });
    if (!r.ok) console.error(`[webhook] admin notification not sent for ${args.eventId}: ${r.error}`);
  } catch (e) {
    console.error("[webhook] admin notification error:", e instanceof Error ? e.message : e);
  }
}
