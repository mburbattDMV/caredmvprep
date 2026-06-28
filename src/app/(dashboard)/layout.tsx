import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile, getUserSubscriptions, hasAnySubscription } from "@/lib/supabase/queries";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNav from "@/components/dashboard/MobileNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [profile, subscriptions] = await Promise.all([
    getProfile(supabase, user.id),
    getUserSubscriptions(supabase, user.id),
  ]);

  const displayName = profile?.display_name ?? user.email ?? "User";
  const isPro       = hasAnySubscription(subscriptions);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f0f4f8' }}>
      <DashboardSidebar
        displayName={displayName}
        isPro={isPro}
        activeProducts={subscriptions.map((s) => s.product)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileNav displayName={displayName} isPro={isPro} />
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
