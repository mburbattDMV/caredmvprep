// Thin Resend REST client. Never throws: callers get { ok, id, error } and decide what to do, so an email
// failure can never break checkout, webhook processing, account creation or access.

export const FROM_ADDRESS = "CARE DMV Prep <info@caredmvprep.com>";
export const ADMIN_NOTIFY_TO = "info@carealestate.com";

export type SendResult = { ok: true; id: string } | { ok: false; error: string };

export async function sendEmail(args: {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Resend de-duplicates sends that reuse a key (24h window). */
  idempotencyKey?: string;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY is not configured." };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...(args.idempotencyKey ? { "Idempotency-Key": args.idempotencyKey } : {}),
      },
      body: JSON.stringify({ from: FROM_ADDRESS, to: [args.to], subject: args.subject, html: args.html, text: args.text }),
      signal: AbortSignal.timeout(8000),
    });
    const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string };
    if (!res.ok || !body.id) return { ok: false, error: `Resend ${res.status}: ${body.message ?? body.name ?? "send failed"}` };
    return { ok: true, id: body.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "send failed" };
  }
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
