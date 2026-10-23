import { createAdminClient } from "@/lib/supabase/admin";

// Public read of the one live announcement banner.
// The banners table's own RLS cannot serve logged-out visitors: its admin policy calls is_admin(), and anon has
// no EXECUTE on that function, so every anon read fails with "permission denied for function is_admin".
// This route applies the same visibility rules (active, inside the start/end window) on the server and returns
// only the three display fields.
export async function GET() {
  const empty = () =>
    Response.json({ banner: null }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } });
  try {
    const nowIso = new Date().toISOString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (createAdminClient() as any)
      .from("banners")
      .select("id, content, color")
      .eq("active", true)
      .or(`starts_at.is.null,starts_at.lte.${nowIso}`)
      .or(`ends_at.is.null,ends_at.gt.${nowIso}`)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data) return empty();
    return Response.json({ banner: data }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } });
  } catch {
    return empty();
  }
}
