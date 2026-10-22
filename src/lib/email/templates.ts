import { escapeHtml } from "./resend";

function shell(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:12px;overflow:hidden">
<tr><td style="background:#0a1628;padding:20px 28px"><span style="color:#fff;font-size:20px;font-weight:700">CARE DMV <span style="color:#4ade80">Prep</span></span></td></tr>
<tr><td style="padding:28px"><h1 style="margin:0 0 16px;font-size:22px">${escapeHtml(title)}</h1>${bodyHtml}</td></tr>
<tr><td style="padding:16px 28px;background:#f8fafc;color:#64748b;font-size:12px">CARE DMV Prep · caredmvprep.com · Questions? Reply to this email.</td></tr>
</table></td></tr></table></body></html>`;
}

export function accountSetupEmail(opts: { name?: string; setupUrl: string; accessLine: string | null; expiresNote: string }) {
  const greeting = opts.name ? `Hi ${escapeHtml(opts.name)},` : "Hi,";
  const access = opts.accessLine ? `<p style="margin:0 0 16px;padding:12px 14px;background:#ecfdf5;border-radius:8px"><strong>Your access:</strong> ${escapeHtml(opts.accessLine)}</p>` : "";
  const html = shell("Your CARE DMV Prep Account Is Ready", `
<p style="margin:0 0 16px;line-height:1.5">${greeting}</p>
<p style="margin:0 0 16px;line-height:1.5">An account has been created for you on CARE DMV Prep. Set your password to get started.</p>
${access}
<p style="margin:24px 0"><a href="${escapeHtml(opts.setupUrl)}" style="background:#1a7f3c;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;display:inline-block">Set your password</a></p>
<p style="margin:0 0 8px;color:#475569;font-size:13px;line-height:1.5">${escapeHtml(opts.expiresNote)}</p>
<p style="margin:0;color:#475569;font-size:13px;line-height:1.5">If the button doesn't work, copy this link into your browser:<br><span style="word-break:break-all">${escapeHtml(opts.setupUrl)}</span></p>`);
  const text = `${opts.name ? `Hi ${opts.name},` : "Hi,"}

Your CARE DMV Prep account is ready.
${opts.accessLine ? `\nYour access: ${opts.accessLine}\n` : ""}
Set your password: ${opts.setupUrl}

${opts.expiresNote}`;
  return { subject: "Your CARE DMV Prep Account Is Ready", html, text };
}

export function adminNotificationEmail(opts: { kind: string; rows: [string, string][] }) {
  const rowsHtml = opts.rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b">${escapeHtml(k)}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("");
  return {
    html: shell(opts.kind, `<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">${rowsHtml}</table>`),
    text: `${opts.kind}\n\n${opts.rows.map(([k, v]) => `${k}: ${v}`).join("\n")}`,
  };
}
