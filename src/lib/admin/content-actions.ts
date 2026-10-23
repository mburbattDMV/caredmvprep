"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Admin writes for banners and coupons. Migration 007 grants the signed-in `authenticated` role SELECT only on
// these tables (writes were granted to service_role only), so browser-side inserts fail with
// "permission denied for table". These actions verify is_admin() on the server first, then write with the
// service-role client. RLS stays on and no new public grants are added.

type Result = { error?: string };

async function requireAdmin(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return "Not signed in.";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: isAdmin } = await (supabase as any).rpc("is_admin");
  return isAdmin ? null : "Admin access required.";
}

function iso(v: string | null | undefined): string | null {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function db(): Promise<any> {
  return createAdminClient();
}

export async function createBanner(input: { content: string; color: string; startsAt?: string; endsAt?: string }): Promise<Result> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const content = input.content.trim();
  if (!content || content.length > 2000) return { error: "Banner content is required (max 2000 characters)." };
  if (!/^#[0-9a-fA-F]{6}$/.test(input.color)) return { error: "Invalid color." };
  const { error } = await (await db()).from("banners").insert({
    content, color: input.color, starts_at: iso(input.startsAt), ends_at: iso(input.endsAt), active: false,
  });
  return error ? { error: error.message } : {};
}

export async function setBannerActive(id: string, active: boolean): Promise<Result> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const client = await db();
  if (active) {
    // Only one banner may be live at a time.
    const { error: e1 } = await client.from("banners").update({ active: false }).neq("id", id);
    if (e1) return { error: e1.message };
  }
  const { error } = await client.from("banners").update({ active }).eq("id", id);
  return error ? { error: error.message } : {};
}

export async function deleteBanner(id: string): Promise<Result> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const { error } = await (await db()).from("banners").delete().eq("id", id);
  return error ? { error: error.message } : {};
}

export async function editBanner(id: string, content: string): Promise<Result> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const text = content.trim();
  if (!text || text.length > 2000) return { error: "Banner content is required (max 2000 characters)." };
  const { error } = await (await db()).from("banners").update({ content: text }).eq("id", id);
  return error ? { error: error.message } : {};
}

export async function createCoupon(input: { code: string; pct: number; label?: string; expires?: string }): Promise<Result> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const code = input.code.trim().toUpperCase();
  if (!/^[A-Z0-9_-]{2,40}$/.test(code)) return { error: "Code must be 2-40 letters, numbers, - or _." };
  if (!Number.isInteger(input.pct) || input.pct < 1 || input.pct > 100) return { error: "% off must be 1-100." };
  const { error } = await (await db()).from("coupons").insert({
    code, discount_pct: input.pct, label: input.label?.trim() || null, expires_at: iso(input.expires),
  });
  return error ? { error: error.message } : {};
}

export async function updateCoupon(id: string, patch: { active?: boolean; expires?: string | null }): Promise<Result> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.active !== undefined) row.active = patch.active;
  if (patch.expires !== undefined) row.expires_at = iso(patch.expires);
  const { error } = await (await db()).from("coupons").update(row).eq("id", id);
  return error ? { error: error.message } : {};
}
