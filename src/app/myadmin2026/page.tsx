import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import AdminBarChart from "@/components/admin/charts/AdminBarChart";
import AdminLineChart from "@/components/admin/charts/AdminLineChart";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import caDmvQuestions         from "@/data/questions/dmv/california";
import caMotoQuestions        from "@/data/questions/motorcycle/california";
import cdlFederalQuestions    from "@/data/questions/cdl/federal";
import cdlHazmatQuestions     from "@/data/questions/cdl/hazmat";
import cdlTankerQuestions     from "@/data/questions/cdl/tank-vehicles";
import cdlDoublesTriplesQ     from "@/data/questions/cdl/doubles-triples";
import cdlPassengerQuestions  from "@/data/questions/cdl/passenger";
import cdlSchoolBusQuestions  from "@/data/questions/cdl/school-bus";
import cdlAirBrakesQuestions  from "@/data/questions/cdl/air-brakes";
import cdlCombinationQ        from "@/data/questions/cdl/combination-vehicles";

export const metadata: Metadata = { title: "Dashboard | Admin", robots: { index: false, follow: false } };

const PRODUCT_LABELS: Record<string, string> = {
  dmv: "Driver's License", motorcycle: "Motorcycle", cdl: "CDL Core",
  cdl_hazmat: "HazMat", cdl_tanker: "Tanker", cdl_doubles_triples: "Doubles/Triples",
  cdl_school_bus: "School Bus", cdl_passenger: "Passenger",
};

function fmt$(cents: number) { return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}` }

function Trend({ value, suffix = "" }: { value: number; suffix?: string }) {
  if (value === 0) return <span className="flex items-center gap-0.5 text-gray-400 text-[10px]"><Minus size={10} /> flat</span>;
  const up = value > 0;
  return (
    <span className={`flex items-center gap-0.5 text-[10px] font-medium ${up ? "text-green-600" : "text-red-500"}`}>
      {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {up ? "+" : ""}{value}{suffix} vs last mo
    </span>
  );
}

interface KpiProps {
  label: string; value: string | number; sub?: string;
  trend?: number; trendSuffix?: string; accent?: string;
}
function KpiCard({ label, value, sub, trend, trendSuffix, accent }: KpiProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 hover:shadow-sm transition-shadow">
      <p className="text-xs font-medium text-gray-400 mb-2">{label}</p>
      <p className="text-2xl font-bold tracking-tight" style={{ color: accent ?? "#0f172a" }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      {trend !== undefined && <div className="mt-1.5"><Trend value={trend} suffix={trendSuffix} /></div>}
    </div>
  );
}

export default async function AdminDashboard() {
  const admin = createAdminClient();

  const { data: { users: authUsers = [] } } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: allSubs = [] } = await (admin as any)
    .from("subscriptions")
    .select("*, subscription_plans(price_cents, interval, label)") as { data: any[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: recentSubs = [] } = await (admin as any)
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10) as { data: any[] };

  // ── Date helpers ────────────────────────────────────────────────────────────
  const now           = new Date();
  const startOfToday  = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth  = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLast   = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLast     = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  // ── User metrics ────────────────────────────────────────────────────────────
  const totalUsers     = authUsers.length;
  const newToday       = authUsers.filter(u => new Date(u.created_at) >= startOfToday).length;
  const newThisMonth   = authUsers.filter(u => new Date(u.created_at) >= startOfMonth).length;
  const newLastMonth   = authUsers.filter(u => { const d = new Date(u.created_at); return d >= startOfLast && d <= endOfLast; }).length;

  // ── Subscription metrics ─────────────────────────────────────────────────
  const activeSubs      = allSubs.filter((s: any) => s.status === "active");
  const pastDueSubs     = allSubs.filter((s: any) => s.status === "past_due");
  const canceledSubs    = allSubs.filter((s: any) => s.status === "canceled");
  const canceledThisMo  = canceledSubs.filter((s: any) => new Date(s.created_at) >= startOfMonth).length;

  const premiumUserIds  = new Set(activeSubs.map((s: any) => s.user_id));
  const premiumUsers    = premiumUserIds.size;
  const freeUsers       = totalUsers - premiumUsers;
  const conversionRate  = totalUsers > 0 ? Math.round((premiumUsers / totalUsers) * 100) : 0;

  // ── Revenue metrics ──────────────────────────────────────────────────────
  const mrrCents = activeSubs
    .filter((s: any) => s.payment_type === "recurring")
    .reduce((sum: number, s: any) => sum + (s.subscription_plans?.price_cents ?? 0), 0);
  const arrCents    = mrrCents * 12;
  const arpu        = premiumUsers > 0 ? Math.round(mrrCents / premiumUsers) : 0;
  const revenueThisMo = allSubs
    .filter((s: any) => new Date(s.created_at) >= startOfMonth)
    .reduce((sum: number, s: any) => sum + (s.subscription_plans?.price_cents ?? 0), 0);

  // Expiring soon (within 7 days)
  const in7Days = new Date(Date.now() + 7 * 86400000);
  const expiringSoon = activeSubs.filter((s: any) => {
    if (!s.current_period_end || s.payment_type !== "recurring") return false;
    return new Date(s.current_period_end) <= in7Days;
  }).length;

  // ── Per-product counts ────────────────────────────────────────────────────
  const productCounts: Record<string, number> = {};
  for (const s of activeSubs) productCounts[(s as any).product] = (productCounts[(s as any).product] ?? 0) + 1;
  const planChartData = Object.entries(PRODUCT_LABELS)
    .map(([k, label]) => ({ name: label.split(" ")[0], value: productCounts[k] ?? 0 }))
    .filter(d => d.value > 0 || Object.keys(productCounts).length === 0);

  // ── Signup growth by month (last 6 months) ───────────────────────────────
  const signupByMonth: Record<string, number> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    signupByMonth[key] = 0;
  }
  for (const u of authUsers) {
    const d = new Date(u.created_at);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    if (key in signupByMonth) signupByMonth[key]++;
  }
  const signupChartData = Object.entries(signupByMonth).map(([name, value]) => ({ name, value }));

  // ── Coverage ───────────────────────────────────────────────────────────────
  const BANKS = [
    { qs: caDmvQuestions, target: 200 },        { qs: caMotoQuestions, target: 150 },
    { qs: cdlFederalQuestions, target: 250 },   { qs: cdlHazmatQuestions, target: 80 },
    { qs: cdlTankerQuestions, target: 60 },     { qs: cdlDoublesTriplesQ, target: 60 },
    { qs: cdlPassengerQuestions, target: 60 },  { qs: cdlSchoolBusQuestions, target: 60 },
    { qs: cdlAirBrakesQuestions, target: 60 },  { qs: cdlCombinationQ, target: 60 },
  ];
  const totalQ      = BANKS.reduce((s, b) => s + b.qs.length, 0);
  const targetQ     = BANKS.reduce((s, b) => s + b.target, 0);
  const verifiedQ   = BANKS.reduce((s, b) => s + b.qs.filter((q) => q.status === "verified").length, 0);
  const warnQ       = BANKS.reduce((s, b) => s + b.qs.filter((q) => !q.sourceSection?.match(/p\.\s*[\d]/)).length, 0);
  const coveragePct = targetQ > 0 ? Math.round((verifiedQ / targetQ) * 100) : 0;

  // ── Email map ─────────────────────────────────────────────────────────────
  const emailMap: Record<string, string> = {};
  for (const u of authUsers) emailMap[u.id] = u.email ?? "—";

  const recentSignups = [...authUsers]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* KPI Grid — Row 1: Users */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Users</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <KpiCard label="Total Users"      value={totalUsers}                  trend={newThisMonth} trendSuffix=" new" />
          <KpiCard label="Premium Users"    value={premiumUsers}   accent="#1a7f3c" />
          <KpiCard label="Free Users"       value={freeUsers}      sub="Not yet converted" />
          <KpiCard label="New Today"        value={newToday}       accent={newToday > 0 ? "#1a7f3c" : "#0f172a"} />
          <KpiCard label="New This Month"   value={newThisMonth}   trend={newThisMonth - newLastMonth} />
        </div>
      </div>

      {/* KPI Grid — Row 2: Revenue */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Revenue</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <KpiCard label="Est. MRR"         value={fmt$(mrrCents)}       accent="#1a7f3c" sub="Monthly recurring" />
          <KpiCard label="Annual Run Rate"  value={fmt$(arrCents)}       accent="#1a7f3c" />
          <KpiCard label="Revenue This Mo"  value={fmt$(revenueThisMo)}  />
          <KpiCard label="ARPU"             value={fmt$(arpu)}           sub="Per premium user" />
          <KpiCard label="Conversion Rate"  value={`${conversionRate}%`} accent={conversionRate >= 10 ? "#1a7f3c" : "#0f172a"} />
        </div>
      </div>

      {/* KPI Grid — Row 3: Subscriptions */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Subscriptions</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <KpiCard label="Active"           value={activeSubs.length}    accent="#1a7f3c" />
          <KpiCard label="Past Due"         value={pastDueSubs.length}   accent={pastDueSubs.length > 0 ? "#dc2626" : "#0f172a"} />
          <KpiCard label="Expiring in 7d"   value={expiringSoon}         accent={expiringSoon > 0 ? "#f59e0b" : "#0f172a"} />
          <KpiCard label="Canceled Total"   value={canceledSubs.length}  />
          <KpiCard label="Canceled This Mo" value={canceledThisMo}       accent={canceledThisMo > 0 ? "#dc2626" : "#0f172a"} />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Signup growth chart */}
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">User Growth</h2>
              <p className="text-xs text-gray-400 mt-0.5">New signups per month (last 6 months)</p>
            </div>
            <span className="text-2xl font-bold text-gray-900">{totalUsers}</span>
          </div>
          <AdminLineChart data={signupChartData} height={160} color="#1a7f3c" />
        </div>

        {/* Active by plan chart */}
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Active by Plan</h2>
              <p className="text-xs text-gray-400 mt-0.5">Current active subscriptions per product</p>
            </div>
            <span className="text-2xl font-bold" style={{ color: "#1a7f3c" }}>{activeSubs.length}</span>
          </div>
          {planChartData.some(d => d.value > 0) ? (
            <AdminBarChart data={planChartData} height={160} color="#1a7f3c" />
          ) : (
            <div className="space-y-2.5 pt-2">
              {Object.entries(PRODUCT_LABELS).map(([product, label]) => {
                const count    = productCounts[product] ?? 0;
                const maxCount = Math.max(...Object.values(productCounts), 1);
                return (
                  <div key={product} className="flex items-center gap-3">
                    <div className="w-24 text-xs text-gray-500 truncate shrink-0">{label.split("'")[0]}</div>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(count / maxCount) * 100}%`, backgroundColor: "#1a7f3c" }} />
                    </div>
                    <div className="text-xs font-bold text-gray-600 w-4 text-right shrink-0">{count}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent signups + purchases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent signups */}
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Recent Signups</h2>
          <div className="space-y-2">
            {recentSignups.map((u) => (
              <div key={u.id} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white" style={{ backgroundColor: "#0f1e3c" }}>
                  {(u.email ?? "?")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{u.email}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            ))}
            {recentSignups.length === 0 && <p className="text-sm text-gray-400">No signups yet.</p>}
          </div>
        </div>

        {/* Recent purchases */}
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Recent Purchases</h2>
          <div className="space-y-2">
            {recentSubs.map((s: any) => (
              <div key={s.id} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 truncate">{emailMap[s.user_id] ?? "—"}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{PRODUCT_LABELS[s.product] ?? s.product}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    s.status === "active" ? "bg-green-50 text-green-700" :
                    s.status === "past_due" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-500"
                  }`}>{s.status}</span>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
            {recentSubs.length === 0 && <p className="text-sm text-gray-400">No purchases yet.</p>}
          </div>
        </div>
      </div>

      {/* Question bank health */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Question Bank Health</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {totalQ.toLocaleString()} total · {verifiedQ.toLocaleString()} verified · {(targetQ - verifiedQ).toLocaleString()} still needed · {warnQ} missing source ref
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold" style={{ color: coveragePct >= 80 ? "#1a7f3c" : coveragePct >= 50 ? "#f59e0b" : "#dc2626" }}>
              {coveragePct}%
            </span>
            <p className="text-xs text-gray-400">of target</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Total Questions", value: totalQ, color: "#0f172a" },
            { label: "Verified",        value: verifiedQ,        color: "#1a7f3c" },
            { label: "Missing Source",  value: warnQ,            color: warnQ > 0 ? "#f59e0b" : "#0f172a" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg px-3 py-2.5" style={{ backgroundColor: "#f8fafc" }}>
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className="text-lg font-bold mt-0.5" style={{ color: s.color }}>{s.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${coveragePct}%`, backgroundColor: coveragePct >= 80 ? "#22c55e" : coveragePct >= 50 ? "#f59e0b" : "#ef4444" }}
            />
          </div>
          <span className="text-xs font-bold text-gray-500 w-10 text-right">{coveragePct}%</span>
        </div>
      </div>
    </div>
  );
}
