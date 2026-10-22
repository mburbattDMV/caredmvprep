"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type CreateAccountState = {
  ok: boolean;
  message: string;
  setupLink?: string;
  emailSent?: boolean;
} | null;

// Products an admin may grant, with a one-time access length in months (0 = account only, no paid access).
const PRODUCTS = ["dmv", "motorcycle", "cdl", "cdl_hazmat", "cdl_tanker", "cdl_doubles_triples", "cdl_school_bus", "cdl_passenger"] as const;
const ALLOWED_MONTHS = [0, 1, 3, 6, 12] as const;
const STATE_RE = /^[A-Z]{2}$/;
const LICENSE_FOR_PRODUCT: Record<string, string> = { dmv: "permit", motorcycle: "motorcycle" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Server-side admin check: signed in AND is_admin(). Never trust the client. */
async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: isAdmin } = await (supabase as any).rpc("is_admin");
  if (!isAdmin) throw new Error("Admin access required.");
  return { supabase, adminEmail: user.email ?? "" };
}

export async function createAccount(_prev: CreateAccountState, formData: FormData): Promise<CreateAccountState> {
  try {
    const { supabase } = await requireAdmin();

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const name = String(formData.get("name") ?? "").trim().slice(0, 120);
    const product = String(formData.get("product") ?? "dmv");
    const months = Number(formData.get("months") ?? 0);
    const state = String(formData.get("state") ?? "").trim().toUpperCase();
    const sendEmail = formData.get("sendEmail") === "on";

    if (!EMAIL_RE.test(email) || email.length > 254) return { ok: false, message: "Enter a valid email address." };
    if (state && !STATE_RE.test(state)) return { ok: false, message: "Unknown state." };
    if (!(PRODUCTS as readonly string[]).includes(product)) return { ok: false, message: "Unknown product." };
    if (!(ALLOWED_MONTHS as readonly number[]).includes(months)) return { ok: false, message: "Unsupported access length." };

    const admin = createAdminClient();

    // Find an existing account for this email (the Users page lists with the same call).
    const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (listErr) return { ok: false, message: `Could not check existing accounts: ${listErr.message}` };
    let user = list.users.find((u) => (u.email ?? "").toLowerCase() === email);
    let created = false;

    if (!user) {
      const { data, error } = await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: name ? { full_name: name, display_name: name } : {},
      });
      if (error || !data.user) return { ok: false, message: `Could not create the account: ${error?.message ?? "unknown error"}` };
      user = data.user;
      created = true;
    }

    // Set the student's state (and matching license type) on their profile so they land on the right content.
    if (state) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (admin as any)
        .from("profiles")
        .update({ target_state: state, target_license: LICENSE_FOR_PRODUCT[product] ?? "cdl_general", updated_at: new Date().toISOString() })
        .eq("id", user.id);
    }

    // Grant paid access (one-time, expires). Upsert on (user_id, product) which is unique.
    let grantNote = "";
    if (months > 0) {
      const expires = new Date();
      expires.setMonth(expires.getMonth() + months);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: subErr } = await (admin as any).from("subscriptions").upsert(
        {
          user_id: user.id,
          product,
          plan_id: null,
          status: "active",
          payment_type: "one_time",
          access_expires_at: expires.toISOString(),
          cancel_at_period_end: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,product" }
      );
      if (subErr) return { ok: false, message: `Account ${created ? "created" : "found"}, but granting access failed: ${subErr.message}` };
      grantNote = ` ${product} access granted until ${expires.toISOString().slice(0, 10)}.`;
    }

    // Password-setup link: always return it to the admin; optionally email it to the person.
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "caredmvprep.com";
    const origin = `https://${host}`;
    const redirectTo = `${origin}/reset-password`;
    const { data: link } = await admin.auth.admin.generateLink({ type: "recovery", email, options: { redirectTo } });
    let emailSent = false;
    if (sendEmail) {
      const { error: mailErr } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      emailSent = !mailErr;
    }

    return {
      ok: true,
      message: `${created ? "Account created" : "Account already existed"} for ${email}.${state ? ` State set to ${state}.` : ""}${grantNote}`,
      setupLink: link?.properties?.action_link,
      emailSent: sendEmail ? emailSent : undefined,
    };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Something went wrong." };
  }
}
