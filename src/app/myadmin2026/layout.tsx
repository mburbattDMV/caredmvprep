import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/myadmin2026/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: isAdmin } = await (supabase as any).rpc("is_admin");
  if (!isAdmin) redirect("/myadmin2026/login");

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f1f5f9" }}>
      <AdminSidebar userEmail={user.email ?? ""} />

      {/* Mobile top bar */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-3 border-b"
        style={{ backgroundColor: "#0a1628", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <span className="text-white font-bold text-sm">CAREDMVPrep Admin</span>
        <span className="ml-auto text-xs text-gray-400">{user.email}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden lg:mt-0 mt-12">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto p-5 lg:p-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
