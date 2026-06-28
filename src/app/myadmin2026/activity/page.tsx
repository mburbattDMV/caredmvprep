import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Activity | Admin", robots: { index: false, follow: false } };

const PRODUCT_LABELS: Record<string, string> = {
  dmv: "Driver's License", motorcycle: "Motorcycle", cdl: "CDL Core",
  cdl_hazmat: "HazMat", cdl_tanker: "Tanker",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default async function AdminActivityPage() {
  const admin = createAdminClient();

  const { data: { users: authUsers = [] } } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: recentSubs = [] } = await (admin as any)
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20) as { data: any[] };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: recentSessions = [] } = await (admin as any)
    .from("quiz_sessions")
    .select("*")
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false })
    .limit(20) as { data: any[] };

  const emailMap: Record<string, string> = {};
  for (const u of authUsers) emailMap[u.id] = u.email ?? "—";

  const recentSignups = [...authUsers]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 15);

  // Merge activity feed
  type Event = { type: string; label: string; detail: string; ts: string };
  const feed: Event[] = [
    ...recentSignups.map((u) => ({
      type: "signup", label: "New signup", detail: u.email ?? "unknown", ts: u.created_at,
    })),
    ...recentSubs.map((s: any) => ({
      type: "purchase", label: "Purchase", detail: `${emailMap[s.user_id] ?? "—"} · ${PRODUCT_LABELS[s.product] ?? s.product}`, ts: s.created_at,
    })),
    ...recentSessions.map((s: any) => ({
      type: "quiz", label: "Quiz completed", detail: `${emailMap[s.user_id] ?? "—"} · ${s.score ?? 0}/${s.total_questions ?? 0} correct`, ts: s.completed_at!,
    })),
  ].sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime()).slice(0, 50);

  const typeStyle: Record<string, { bg: string; color: string; dot: string }> = {
    signup:   { bg: "#eff6ff", color: "#1d4ed8", dot: "#3b82f6" },
    purchase: { bg: "#f0fdf4", color: "#15803d", dot: "#22c55e" },
    quiz:     { bg: "#fefce8", color: "#a16207", dot: "#f59e0b" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Activity</h1>
        <p className="text-sm text-gray-400 mt-0.5">Real-time feed of signups, purchases, and quiz completions</p>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-500 mb-1">Recent Signups (all time)</p>
          <p className="text-2xl font-bold" style={{ color: "#0f1e3c" }}>{authUsers.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-500 mb-1">Total Purchases</p>
          <p className="text-2xl font-bold" style={{ color: "#1a7f3c" }}>{recentSubs.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-500 mb-1">Quizzes Completed</p>
          <p className="text-2xl font-bold" style={{ color: "#0f1e3c" }}>{recentSessions.length}</p>
        </div>
      </div>

      {/* Activity feed */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Activity Log</h2>
        <div className="space-y-2">
          {feed.map((ev, i) => {
            const s = typeStyle[ev.type] ?? typeStyle.quiz;
            return (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.dot }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: s.bg, color: s.color }}
                    >
                      {ev.label}
                    </span>
                    <span className="text-sm text-gray-700 truncate">{ev.detail}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{timeAgo(ev.ts)}</span>
              </div>
            );
          })}
          {feed.length === 0 && <p className="text-sm text-gray-400">No activity yet.</p>}
        </div>
      </div>
    </div>
  );
}
