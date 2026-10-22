import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import AdminBarChart from "@/components/admin/charts/AdminBarChart";
import AdminLineChart from "@/components/admin/charts/AdminLineChart";

export const metadata: Metadata = { title: "Revenue | Admin", robots: { index: false, follow: false } };

const PRODUCT_LABELS: Record<string, string> = {
  dmv: "Driver's License", motorcycle: "Motorcycle", cdl: "CDL Core",
  cdl_hazmat: "HazMat", cdl_tanker: "Tanker", cdl_doubles_triples: "Doubles/Triples",
  cdl_school_bus: "School Bus", cdl_passenger: "Passenger",
};

function fmt$(cents: number) {
  if (cents >= 100000) return `$${(cents / 100000).toFixed(1)}k`;
  return `$${(cents / 100).toFixed(0)}`;
}

export default async function AdminRevenuePage() {
  const admin = createAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: subs = [] } = await (admin as any)
    .from("subscriptions")
    .select("*, subscription_plans(price_cents, interval, label)")
    .order("created_at", { ascending: false }) as { data: any[] };

  const activeSubs       = subs.filter((s: any) => s.status === "active");
  const recurringActive  = activeSubs.filter((s: any) => s.payment_type === "recurring");
  const oneTimePaid      = subs.filter((s: any) => s.payment_type === "one_time");

  const mrrCents     = recurringActive.reduce((sum: number, s: any) => sum + (s.subscription_plans?.price_cents ?? 0), 0);
  const arrCents     = mrrCents * 12;
  const oneTimeCents = oneTimePaid.reduce((sum: number, s: any) => sum + (s.subscription_plans?.price_cents ?? 0), 0);
  const totalRev     = mrrCents + oneTimeCents;

  // ── Monthly revenue trend (last 6 months) ────────────────────────────────
  const now = new Date();
  const monthlyRev: Record<string, number> = {};
  for (let i = 5; i >= 0; i--) {
    const d   = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    monthlyRev[key] = 0;
  }
  for (const s of subs) {
    const d   = new Date(s.created_at);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    if (key in monthlyRev) {
      monthlyRev[key] += s.subscription_plans?.price_cents ?? 0;
    }
  }
  const monthlyChartData = Object.entries(monthlyRev).map(([name, value]) => ({
    name, value: Math.round(value / 100),
  }));

  // ── Per-product revenue ───────────────────────────────────────────────────
  interface ProductRevRow { recurring: number; oneTime: number; count: number }
  const byProduct: Record<string, ProductRevRow> = {};
  for (const s of subs) {
    if (!byProduct[s.product]) byProduct[s.product] = { recurring: 0, oneTime: 0, count: 0 };
    const cents = s.subscription_plans?.price_cents ?? 0;
    if (s.payment_type === "recurring" && s.status === "active") byProduct[s.product].recurring += cents;
    if (s.payment_type === "one_time") byProduct[s.product].oneTime += cents;
    byProduct[s.product].count++;
  }

  const productChartData = Object.entries(byProduct)
    .sort(([, a], [, b]) => (b.recurring + b.oneTime) - (a.recurring + a.oneTime))
    .map(([k, v]) => ({
      name:  (PRODUCT_LABELS[k] ?? k).split(" ")[0],
      value: Math.round((v.recurring + v.oneTime) / 100),
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Revenue</h1>
        <p className="text-sm text-gray-400 mt-0.5">Financial overview from Supabase subscriptions table</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Est. MRR",       value: fmt$(mrrCents),     accent: "#1a7f3c", sub: "Monthly recurring" },
          { label: "Annual Run Rate", value: fmt$(arrCents),    accent: "#1a7f3c", sub: "ARR projection" },
          { label: "One-Time Sales",  value: fmt$(oneTimeCents), accent: "#0f172a", sub: "Lifetime passes" },
          { label: "Total Revenue",   value: fmt$(totalRev),    accent: "#0f172a", sub: "All time" },
          { label: "Active Subs",     value: activeSubs.length,  accent: "#0f172a", sub: "Currently active" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400 mb-1">{c.label}</p>
            <p className="text-2xl font-bold" style={{ color: c.accent }}>{c.value}</p>
            {c.sub && <p className="text-xs text-gray-400 mt-1">{c.sub}</p>}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Monthly Revenue</h2>
          <p className="text-xs text-gray-400 mb-4">Revenue recognized per calendar month</p>
          <AdminLineChart
            data={monthlyChartData}
            height={180}
            prefix="$"
          />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Revenue by Product</h2>
          <p className="text-xs text-gray-400 mb-4">Total revenue (MRR + one-time) per plan</p>
          <AdminBarChart
            data={productChartData.length ? productChartData : [{ name: "None", value: 0 }]}
            height={180}
            prefix="$"
          />
        </div>
      </div>

      {/* Per-product breakdown */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Revenue by Plan</h2>
        {Object.keys(byProduct).length === 0 ? (
          <p className="text-sm text-gray-400">No revenue data yet.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(byProduct)
              .sort(([, a], [, b]) => (b.recurring + b.oneTime) - (a.recurring + a.oneTime))
              .map(([product, rev]) => {
                const total     = rev.recurring + rev.oneTime;
                const maxRev    = Math.max(...Object.values(byProduct).map((r) => r.recurring + r.oneTime), 1);
                const pct       = Math.round((total / maxRev) * 100);
                return (
                  <div key={product}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-gray-800">{PRODUCT_LABELS[product] ?? product}</span>
                      <span className="text-gray-500">
                        <span className="font-semibold text-gray-800">${(total / 100).toFixed(0)}</span> · {rev.count} sub{rev.count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#1a7f3c" }} />
                    </div>
                    <div className="flex gap-4 text-xs text-gray-400 mt-1">
                      <span>MRR: <span className="text-gray-600">${(rev.recurring / 100).toFixed(0)}</span></span>
                      <span>One-time: <span className="text-gray-600">${(rev.oneTime / 100).toFixed(0)}</span></span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* All transactions */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900">All Transactions</h2>
          <span className="text-xs text-gray-400">{subs.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead style={{ backgroundColor: "#f8fafc" }}>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left px-3 py-2.5 font-semibold">Product</th>
                <th className="text-left px-3 py-2.5 font-semibold">Type</th>
                <th className="text-left px-3 py-2.5 font-semibold">Amount</th>
                <th className="text-left px-3 py-2.5 font-semibold">Status</th>
                <th className="text-left px-3 py-2.5 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {subs.slice(0, 50).map((s: any) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition last:border-0">
                  <td className="px-3 py-2.5 font-medium text-gray-700">{PRODUCT_LABELS[s.product] ?? s.product}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.payment_type === "recurring" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                      {s.payment_type === "recurring" ? "Monthly" : "One-time"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-gray-800">
                    {s.subscription_plans?.price_cents ? `$${(s.subscription_plans.price_cents / 100).toFixed(2)}` : "—"}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      s.status === "active"   ? "bg-green-50 text-green-700" :
                      s.status === "past_due" ? "bg-red-50 text-red-700"    : "bg-gray-100 text-gray-500"
                    }`}>{s.status}</span>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-400">
                    {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">No transactions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
