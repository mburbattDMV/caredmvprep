import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import BannersPanel from "@/components/admin/BannersPanel";

export const metadata: Metadata = { title: "Banners | Admin", robots: { index: false, follow: false } };

export default async function AdminBannersPage() {
  const admin = createAdminClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: banners = [] } = await (admin as any)
    .from("banners")
    .select("*")
    .order("created_at", { ascending: false }) as { data: any[] };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Banners</h1>
        <p className="text-sm text-gray-400 mt-0.5">Create and schedule site-wide announcement banners</p>
      </div>
      <BannersPanel initialBanners={banners} />
    </div>
  );
}
