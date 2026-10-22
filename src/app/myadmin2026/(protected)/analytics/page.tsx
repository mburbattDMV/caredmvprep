import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import AdminBarChart from "@/components/admin/charts/AdminBarChart";
import AdminLineChart from "@/components/admin/charts/AdminLineChart";

export const metadata: Metadata = { title: "Analytics | Admin", robots: { index: false, follow: false } };

const PRODUCT_LABELS: Record<string, string> = {
  dmv: "Driver's License", motorcycle: "Motorcycle", cdl: "CDL Core",
  cdl_hazmat: "HazMat", cdl_tanker: "Tanker", cdl_doubles_triples: "Doubles/Triples",
  cdl_school_bus: "School Bus", cdl_passenger: "Passenger",
};
const STATE_LABELS: Record<string, string> = {
  CA: "California", TX: "Texas", FL: "Florida", NY: "New York", PA: "Pennsylvania", IL: "Illinois",
};

export default async function AdminAnalyticsPage() {
  const admin = createAdminClient();

  const { data: { users: authUsers = [] } } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profiles = [] }  = await (admin as any).from("profiles").select("target_state, target_license") as { data: any[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: allSubs = [] }   = await (admin as any).from("subscriptions").select("product, status, created_at") as { data: any[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: quizSessions = [] } = await (admin as any)
    .from("quiz_sessions")
    .select("score, total_questions, completed_at, product")
    .not("completed_at", "is", null)
    .limit(500) as { data: any[] };

  // ── Signups by month (12 months) ─────────────────────────────────────────
  const now = new Date();
  const signupByMonth: Record<string, number> = {};
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    signupByMonth[d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })] = 0;
  }
  for (const u of authUsers) {
    const d   = new Date(u.created_at);
    const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    if (key in signupByMonth) signupByMonth[key]++;
  }
  const signupChartData = Object.entries(signupByMonth).map(([name, value]) => ({ name, value }));

  // ── Top states ────────────────────────────────────────────────────────────
  const stateCounts: Record<string, number> = {};
  for (const p of profiles) {
    if (p.target_state) stateCounts[p.target_state] = (stateCounts[p.target_state] ?? 0) + 1;
  }
  const topStates = Object.entries(stateCounts)
    .sort(([, a], [, b]) => b - a).slice(0, 8)
    .map(([state, value]) => ({ name: STATE_LABELS[state] ?? state, value }));

  // ── Top products ──────────────────────────────────────────────────────────
  const productCounts: Record<string, number> = {};
  for (const s of allSubs) {
    if (s.status === "active") productCounts[s.product] = (productCounts[s.product] ?? 0) + 1;
  }
  const topProducts = Object.entries(productCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([k, value]) => ({ name: (PRODUCT_LABELS[k] ?? k).split(" ")[0], value }));

  // ── Quiz performance ──────────────────────────────────────────────────────
  const completions    = quizSessions.length;
  const avgScore       = completions > 0
    ? Math.round(quizSessions.reduce((s: number, q: any) => s + (q.total_questions > 0 ? (q.score / q.total_questions) * 100 : 0), 0) / completions)
    : 0;
  const passRate       = completions > 0
    ? Math.round((quizSessions.filter((q: any) => q.total_questions > 0 && q.score / q.total_questions >= 0.7).length / completions) * 100)
    : 0;

  // ── Completion by product ─────────────────────────────────────────────────
  const completionByProduct: Record<string, number> = {};
  for (const s of quizSessions) {
    if (s.product) completionByProduct[s.product] = (completionByProduct[s.product] ?? 0) + 1;
  }
  const completionChartData = Object.entries(completionByProduct)
    .sort(([, a], [, b]) => b - a).slice(0, 8)
    .map(([k, value]) => ({ name: (PRODUCT_LABELS[k] ?? k).split(" ")[0], value }));

  // ── Subscription growth (active subs by month) ────────────────────────────
  const subsByMonth: Record<string, number> = {};
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    subsByMonth[d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })] = 0;
  }
  for (const s of allSubs) {
    const d   = new Date(s.created_at);
    const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    if (key in subsByMonth) subsByMonth[key]++;
  }
  const subGrowthData = Object.entries(subsByMonth).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-400 mt-0.5">Platform usage, growth, and engagement metrics</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Users",       value: authUsers.length,  accent: "#0f172a" },
          { label: "Quiz Completions",  value: completions,       accent: "#1a7f3c" },
          { label: "Avg Score",         value: `${avgScore}%`,    accent: "#0f172a" },
          { label: "Pass Rate (≥70%)",  value: `${passRate}%`,    accent: passRate >= 70 ? "#1a7f3c" : "#f59e0b" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400 mb-1">{c.label}</p>
            <p className="text-2xl font-bold" style={{ color: c.accent }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Growth charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">User Growth (12 months)</h2>
          <p className="text-xs text-gray-400 mb-4">New registrations per month</p>
          <AdminLineChart data={signupChartData} height={190} color="#1a7f3c" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Subscription Growth (12 months)</h2>
          <p className="text-xs text-gray-400 mb-4">New paid subscriptions per month</p>
          <AdminLineChart data={subGrowthData} height={190} color="#0f1e3c" />
        </div>
      </div>

      {/* Top states + products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Top States</h2>
          <p className="text-xs text-gray-400 mb-4">Users by study state (from profile)</p>
          {topStates.length > 0 ? (
            <>
              <AdminBarChart data={topStates} height={180} color="#0f1e3c" />
              <div className="mt-4 space-y-2">
                {topStates.map((s) => (
                  <div key={s.name} className="flex items-center gap-3 text-xs">
                    <span className="w-28 text-gray-600 font-medium">{s.name}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(s.value / (topStates[0]?.value ?? 1)) * 100}%`, backgroundColor: "#0f1e3c" }} />
                    </div>
                    <span className="text-gray-500 w-6 text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400 py-8 text-center">No state data yet — users haven't set their study state.</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Top Products</h2>
          <p className="text-xs text-gray-400 mb-4">Active subscriptions by product</p>
          {topProducts.length > 0 ? (
            <AdminBarChart data={topProducts} height={200} color="#1a7f3c" />
          ) : (
            <p className="text-sm text-gray-400 py-8 text-center">No subscription data yet.</p>
          )}
        </div>
      </div>

      {/* Quiz completion by product */}
      {completionChartData.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Quiz Completions by Product</h2>
          <p className="text-xs text-gray-400 mb-4">Completed quiz sessions per product type</p>
          <AdminBarChart data={completionChartData} height={180} color="#f59e0b" />
        </div>
      )}

      {/* Quiz stats */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Quiz Performance Summary</h2>
        {completions === 0 ? (
          <p className="text-sm text-gray-400">No quiz sessions recorded yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Completions", value: completions.toLocaleString(), sub: "Finished sessions" },
              { label: "Average Score",     value: `${avgScore}%`,              sub: "Across all sessions" },
              { label: "Pass Rate",         value: `${passRate}%`,              sub: "Scored ≥ 70%" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl px-4 py-4" style={{ backgroundColor: "#f8fafc" }}>
                <p className="text-xs text-gray-400">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
