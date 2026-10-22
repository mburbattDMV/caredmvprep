import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Subscriptions | Admin", robots: { index: false, follow: false } };

const PRODUCT_LABELS: Record<string, string> = {
  dmv: "Driver's License", motorcycle: "Motorcycle", cdl: "CDL Core",
  cdl_hazmat: "HazMat", cdl_tanker: "Tanker", cdl_doubles_triples: "Doubles/Triples",
  cdl_school_bus: "School Bus", cdl_passenger: "Passenger",
};

export default async function AdminSubscriptionsPage() {
  const admin = createAdminClient();
  const { data: { users: authUsers = [] } } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: subs = [] } = await (admin as any)
    .from("subscriptions")
    .select("*, subscription_plans(price_cents, interval, label)")
    .order("created_at", { ascending: false }) as { data: any[] };

  const emailMap: Record<string, string> = {};
  for (const u of authUsers) emailMap[u.id] = u.email ?? "—";

  const activeSubs   = subs.filter((s: any) => s.status === "active");
  const pastDueSubs  = subs.filter((s: any) => s.status === "past_due");
  const canceledSubs = subs.filter((s: any) => s.status === "canceled");
  const mrrCents     = activeSubs.filter((s: any) => s.payment_type === "recurring")
    .reduce((sum: number, s: any) => sum + (s.subscription_plans?.price_cents ?? 0), 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Subscriptions</h1>
        <p className="text-sm text-gray-400 mt-0.5">All subscription records from Stripe webhook</p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active",   value: activeSubs.length,   color: "#1a7f3c" },
          { label: "Past Due", value: pastDueSubs.length,  color: pastDueSubs.length > 0 ? "#b91c1c" : "#0f1e3c" },
          { label: "Canceled", value: canceledSubs.length, color: "#6b7280" },
          { label: "Est. MRR", value: `$${(mrrCents / 100).toFixed(0)}`, color: "#1a7f3c" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 px-5 py-4">
            <p className="text-xs text-gray-500 mb-1">{c.label}</p>
            <p className="text-2xl font-bold" style={{ color: c.color }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead style={{ backgroundColor: "#f8fafc" }}>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold">User</th>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold">Type</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Amount</th>
                <th className="text-left px-4 py-3 font-semibold">Started</th>
                <th className="text-left px-4 py-3 font-semibold">Renews / Expires</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s: any) => {
                const renewDate = s.payment_type === "recurring" ? s.current_period_end : s.access_expires_at;
                return (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition last:border-0">
                    <td className="px-4 py-3 text-gray-700 truncate max-w-[180px]">{emailMap[s.user_id] ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-700">{PRODUCT_LABELS[s.product] ?? s.product}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.payment_type === "recurring" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                        {s.payment_type === "recurring" ? "Monthly" : "One-time"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        s.status === "active" ? "bg-green-50 text-green-700" :
                        s.status === "past_due" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-500"
                      }`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {s.subscription_plans?.price_cents ? `$${(s.subscription_plans.price_cents / 100).toFixed(2)}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {renewDate ? new Date(renewDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                  </tr>
                );
              })}
              {subs.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">No subscriptions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
