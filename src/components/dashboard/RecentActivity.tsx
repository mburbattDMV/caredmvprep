import Link from "next/link";
import type { QuizSession } from "@/types/database";

const TEST_LABELS: Record<string, string> = {
  "california-permit": "CA Permit Test",
  "california-motorcycle": "CA Motorcycle Test",
  "california-cdl-general": "CA CDL General Knowledge",
  "texas-permit": "TX Permit Test",
  "texas-motorcycle": "TX Motorcycle Test",
  "texas-cdl-general": "TX CDL General Knowledge",
  "florida-permit": "FL Permit Test",
  "florida-motorcycle": "FL Motorcycle Test",
  "florida-cdl-general": "FL CDL General Knowledge",
  "new-york-permit": "NY Permit Test",
  "new-york-motorcycle": "NY Motorcycle Test",
  "new-york-cdl-general": "NY CDL General Knowledge",
};

interface RecentActivityProps {
  sessions: QuizSession[];
}

export default function RecentActivity({ sessions }: RecentActivityProps) {
  if (sessions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Activity</h3>
        <p className="text-sm text-gray-400">
          No tests taken yet.{" "}
          <Link href="/quiz/california-permit" className="underline" style={{ color: '#1a7f3c' }}>
            Start your first practice test →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {sessions.slice(0, 5).map((s) => {
          const pct = s.score !== null ? Math.round((s.score / s.total_questions) * 100) : null;
          const passed = s.passed;
          return (
            <div key={s.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {TEST_LABELS[s.test_id] ?? s.test_id}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(s.started_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {" · "}
                  {s.total_questions} questions
                </p>
              </div>
              {pct !== null ? (
                <span
                  className="shrink-0 text-xs font-bold px-2 py-1 rounded-full"
                  style={
                    passed
                      ? { backgroundColor: '#f0fdf4', color: '#1a7f3c' }
                      : { backgroundColor: '#fef2f2', color: '#b91c1c' }
                  }
                >
                  {pct}% {passed ? "Passed" : "Failed"}
                </span>
              ) : (
                <span className="shrink-0 text-xs text-gray-400">In progress</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
