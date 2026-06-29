"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quiz";
import { createClient } from "@/lib/supabase/client";
import WeakTopics from "@/components/dashboard/WeakTopics";
import { getCategoryLabel } from "@/lib/readiness";
import { trackQuizCompleted } from "@/lib/analytics";

type SaveState = "saving" | "saved" | "error";

export default function QuizResults() {
  const result     = useQuizStore((s) => s.result);
  const config     = useQuizStore((s) => s.config);
  const resetQuiz  = useQuizStore((s) => s.resetQuiz);
  const router     = useRouter();

  const [saveState, setSaveState] = useState<SaveState>("saving");
  const [saveError, setSaveError] = useState<string | null>(null);

  // Persist to Supabase on mount.
  // 3-step flow required by DB trigger design:
  //   Step 1: INSERT quiz_sessions (completed_at = NULL, started_at = actual start)
  //   Step 2: INSERT user_answers (with user_id for fast RLS)
  //   Step 3: UPDATE quiz_sessions SET completed_at → triggers refresh_weak_topics + update_streak
  useEffect(() => {
    if (!result || !config) return;

    async function persist() {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("[QuizResults] auth.getUser failed:", authError?.message ?? "no user");
        setSaveState("error");
        setSaveError("Not signed in — results were not saved.");
        return;
      }

      // Step 1 — create the session row (not yet marked complete)
      const startedAt = new Date(Date.now() - (result?.totalTimeMs ?? 0)).toISOString();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: session, error: sessionError } = await (supabase as any)
        .from("quiz_sessions")
        .insert({
          user_id:         user.id,
          test_id:         config?.testId,
          state:           config?.state,
          license_type:    config?.licenseType,
          total_questions: result?.totalQuestions,
          time_limit_secs: config?.timeLimitSecs ?? null,
          started_at:      startedAt,
        })
        .select("id")
        .single();

      if (sessionError || !session?.id) {
        console.error("[QuizResults] Step 1 INSERT quiz_sessions failed:", sessionError?.message ?? "null session");
        setSaveState("error");
        setSaveError(`Results could not be saved (session error: ${sessionError?.message ?? "unknown"}). Your score is shown above.`);
        return;
      }

      // Step 2 — insert all answers (user_id enables fast RLS without a join)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: answersError } = await (supabase as any).from("user_answers").insert(
        result?.answers.map((a) => ({
          session_id:     session.id,
          user_id:        user.id,
          question_id:    a.questionId,
          selected_index: a.selectedIndex,
          correct_index:  a.correctIndex,
          is_correct:     a.isCorrect,
          category:       a.category,
          time_spent_ms:  a.timeSpentMs,
        })) ?? []
      );

      if (answersError) {
        console.error("[QuizResults] Step 2 INSERT user_answers failed:", answersError.message);
        // Non-fatal: session exists, answers missing. Continue to Step 3.
      }

      // Step 3 — mark session complete; DB triggers refresh_weak_topics + update_streak
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from("quiz_sessions")
        .update({
          completed_at: new Date().toISOString(),
          score:        result?.correctCount,
          passed:       result?.passed,
        })
        .eq("id", session.id);

      if (updateError) {
        console.error("[QuizResults] Step 3 UPDATE quiz_sessions failed:", updateError.message);
        setSaveState("error");
        setSaveError(`Session created but completion not recorded (${updateError.message}). Dashboard may not update.`);
        return;
      }

      setSaveState("saved");
      router.refresh();
    }

    persist();

    // Analytics — PostHog only, fire independently of DB persist
    if (result && config) {
      trackQuizCompleted({
        testId:       config.testId,
        scorePercent: result.scorePercent,
        passed:       result.passed,
        totalTimeMs:  result.totalTimeMs,
        isMockExam:   config.testId.includes("mock"),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!result || !config) return null;

  const pct        = Math.round(result.scorePercent * 100);
  const passingPct = Math.round(result.passingScore * 100);

  // Build per-session topic breakdown for the results page
  const categoryMap: Record<string, { correct: number; total: number }> = {};
  for (const a of result.answers) {
    if (!categoryMap[a.category]) categoryMap[a.category] = { correct: 0, total: 0 };
    categoryMap[a.category].total++;
    if (a.isCorrect) categoryMap[a.category].correct++;
  }
  const topicData = Object.entries(categoryMap)
    .map(([category, v]) => ({ category, ...v }))
    .sort((a, b) => (a.correct / a.total) - (b.correct / b.total));

  const mins = Math.floor(result.totalTimeMs / 60000);
  const secs = Math.floor((result.totalTimeMs % 60000) / 1000);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Save status banner */}
      {saveState === "saving" && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-700">
          <svg className="w-3.5 h-3.5 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Saving your results…
        </div>
      )}
      {saveState === "saved" && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-50 border border-green-200 text-xs text-green-700">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Results saved — your dashboard and history have been updated.
        </div>
      )}
      {saveState === "error" && saveError && (
        <div className="mb-4 flex items-start gap-2 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
          <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {saveError}
        </div>
      )}

      {/* Result hero */}
      <div
        className="rounded-2xl px-6 py-8 text-center mb-6 text-white"
        style={{ backgroundColor: result.passed ? '#1a7f3c' : '#0f1e3c' }}
      >
        <div className="text-5xl font-extrabold mb-2">{pct}%</div>
        <div className="text-xl font-bold mb-1">
          {result.passed ? "🎉 You Passed!" : "Not Quite — Keep Studying"}
        </div>
        <p className="text-sm opacity-80">
          {result.correctCount} of {result.totalQuestions} correct · Passing score: {passingPct}%
          {result.totalTimeMs > 0 && ` · Time: ${mins}m ${String(secs).padStart(2, "0")}s`}
        </p>
      </div>

      {/* Weak topics */}
      {topicData.length > 0 && (
        <div className="mb-6">
          <WeakTopics topics={topicData} title="Topic Breakdown" />
        </div>
      )}

      {/* Per-question review */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Question Review</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {config.questions.map((q, i) => {
            const ans = result.answers.find((a) => a.questionId === q.id);
            if (!ans) return null;
            return (
              <div key={q.id} className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                    style={{ backgroundColor: ans.isCorrect ? '#16a34a' : '#ef4444' }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-snug mb-1">{q.question}</p>
                    <p className="text-xs text-gray-500">
                      {ans.isCorrect
                        ? `✓ ${q.options[q.correctIndex]}`
                        : `✗ You chose: ${ans.selectedIndex >= 0 ? q.options[ans.selectedIndex] : "Skipped"} · Correct: ${q.options[q.correctIndex]}`}
                    </p>
                    {!ans.isCorrect && (
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{q.explanation}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What to do next */}
      <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4 mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">What to do next</h3>
        <div className="space-y-2.5">
          {result.passed ? (
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-base shrink-0 mt-0.5">✓</span>
              <p className="text-sm text-gray-700">
                <strong>Strong performance.</strong> You're scoring above the passing threshold.
                {pct >= 90
                  ? " You look exam-ready — consider booking your test soon."
                  : " Try a mock exam to simulate real test conditions."}
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <span className="text-amber-500 text-base shrink-0 mt-0.5">→</span>
              <p className="text-sm text-gray-700">
                <strong>Keep practicing.</strong> You need {passingPct}% to pass. Focus on your weak topics below.
              </p>
            </div>
          )}

          {result.weakCategories.length > 0 && (
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-base shrink-0 mt-0.5">↗</span>
              <p className="text-sm text-gray-700">
                <strong>Top focus area:</strong>{" "}
                {getCategoryLabel(result.weakCategories[0])}.{" "}
                <Link
                  href={`/quiz/${config?.testId ?? "california-permit"}?focus=${result.weakCategories[0]}`}
                  className="underline font-semibold"
                  style={{ color: "#1a7f3c" }}
                >
                  Practice this topic →
                </Link>
              </p>
            </div>
          )}

          {!result.passed && (
            <div className="flex items-start gap-3">
              <span className="text-gray-400 text-base shrink-0 mt-0.5">◎</span>
              <p className="text-sm text-gray-500">
                Estimated {Math.max(1, Math.ceil((passingPct - pct) / 5))} more practice session
                {Math.max(1, Math.ceil((passingPct - pct) / 5)) > 1 ? "s" : ""} to reach the passing score.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
          <Link
            href="/mock-exam"
            className="px-4 py-2 rounded-lg text-xs font-bold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Try a Mock Exam
          </Link>
          <Link
            href="/review"
            className="px-4 py-2 rounded-lg text-xs font-bold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Review Center
          </Link>
          <Link
            href="/flashcards"
            className="px-4 py-2 rounded-lg text-xs font-bold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Flashcards
          </Link>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            resetQuiz();
            window.location.reload();
          }}
          className="flex-1 py-3 rounded-xl font-bold text-white text-sm transition hover:opacity-90"
          style={{ backgroundColor: "#1a7f3c" }}
        >
          Practice Again
        </button>
        <Link
          href="/dashboard"
          className="flex-1 py-3 rounded-xl font-bold text-center text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
