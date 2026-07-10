export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  getProfile,
  getUserSubscriptions,
  getDashboardStats,
  getWeakTopics,
  getStrongTopics,
  getRecentlyMissed,
  getFlashcardStats,
  getStudyPlan,
  getBookmarkCount,
  getStreak,
} from "@/lib/supabase/queries";

// Study path auto-set when a user purchases before completing onboarding
const PRODUCT_TO_PROFILE: Partial<Record<string, { target_state: string; target_license: string }>> = {
  dmv:        { target_state: 'CA', target_license: 'permit' },
  motorcycle: { target_state: 'CA', target_license: 'motorcycle' },
  cdl:        { target_state: 'CA', target_license: 'cdl_general' },
};
import { getDefaultTestId } from "@/lib/profile-routing";
import { quizRegistry } from "@/data/questions";
import { computeReadiness, computeWeeklyActivity } from "@/lib/readiness";
import ReadinessCard from "@/components/dashboard/ReadinessCard";
import CoachBanner from "@/components/dashboard/CoachBanner";
import WeakTopics from "@/components/dashboard/WeakTopics";
import StrongTopics from "@/components/dashboard/StrongTopics";
import ActivityChart from "@/components/dashboard/ActivityChart";
import SmartReviewCard from "@/components/dashboard/SmartReviewCard";
import StudyPlanCard from "@/components/dashboard/StudyPlanCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatsCard from "@/components/dashboard/StatsCard";

// Maps profile fields to quiz routes. Delegates to the single source of truth
// (lib/profile-routing.ts) so this stays correct as states are added.
function getQuizHref(state: string | null | undefined, license: string | null | undefined): string {
  return `/quiz/${getDefaultTestId(state ?? null, license ?? null)}`;
}

function formatStudyTime(ms: number): string {
  if (ms === 0) return '—';
  if (ms < 60_000) return '< 1 min';
  const mins = Math.floor(ms / 60_000);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

interface Props {
  searchParams: Promise<{ welcome?: string }>;
}

export default async function DashboardPage({ searchParams }: Props) {
  const { welcome } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Profile first — determines whether to redirect, auto-set, or proceed
  let profile = await getProfile(supabase, user.id);

  if (!profile?.target_state) {
    // User may have purchased before completing onboarding (or webhook not yet processed).
    // Derive study path from their subscriptions instead of forcing onboarding.
    const subs = await getUserSubscriptions(supabase, user.id);
    const coreSub = subs.find((s) => PRODUCT_TO_PROFILE[s.product]);
    if (coreSub && profile) {
      const updates = PRODUCT_TO_PROFILE[coreSub.product]!;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      profile = { ...profile, ...updates };
    } else {
      redirect("/onboarding");
    }
  }

  // TypeScript narrowing — if we're still here, profile has target_state
  if (!profile?.target_state) redirect("/onboarding");

  // All remaining queries in parallel
  const [
    stats,
    weakTopics,
    strongTopics,
    missedQuestions,
    flashcards,
    studyPlan,
    bookmarkCount,
  ] = await Promise.all([
    getDashboardStats(supabase, user.id),
    getWeakTopics(supabase, user.id, 6),
    getStrongTopics(supabase, user.id),
    getRecentlyMissed(supabase, user.id),
    getFlashcardStats(supabase, user.id),
    getStudyPlan(supabase, user.id),
    getBookmarkCount(supabase, user.id),
  ]);

  const quizHref     = getQuizHref(profile.target_state, profile.target_license);
  const stateTestId  = getDefaultTestId(profile.target_state ?? null, 'permit');
  const stateSlug    = stateTestId.replace(/-permit$/, '');
  const availableTests = (['permit', 'motorcycle', 'cdl-general'] as const)
    .map((suffix) => `${stateSlug}-${suffix}`)
    .filter((id) => quizRegistry[id])
    .map((id) => ({
      id,
      label: quizRegistry[id].label,
      questions: quizRegistry[id].questions.length,
    }));
  const streak       = getStreak(profile);
  const readiness    = computeReadiness(stats, weakTopics, strongTopics);
  const weeklyActivity = computeWeeklyActivity(stats.sessions);

  const firstName = profile?.display_name?.split(' ')[0] ?? null;

  const weakTopicData = weakTopics.map((t) => ({
    category:    t.category_slug,
    correct:     t.correct,
    total:       t.total,
    accuracy_pct: Number(t.accuracy_pct),
  }));

  return (
    <div className="max-w-5xl mx-auto pb-12">

      {/* ── Welcome banner (first login after onboarding) ───────────────── */}
      {welcome === '1' && (
        <div
          className="mb-6 rounded-2xl px-6 py-4 text-white flex items-start justify-between gap-4"
          style={{ backgroundColor: '#1a7f3c' }}
        >
          <div>
            <p className="font-bold text-sm">
              {firstName ? `Welcome, ${firstName}!` : 'Welcome!'} Your study dashboard is ready.
            </p>
            <p className="text-xs mt-0.5 opacity-80">
              Start with a practice test or try a mock exam to see where you stand.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/mock-exam"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white transition hover:bg-gray-100"
              style={{ color: '#1a7f3c' }}
            >
              Try a Mock Exam →
            </Link>
          </div>
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#0f1e3c' }}>
          {firstName ? `Welcome back, ${firstName}.` : 'Your Dashboard'}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {stats.sessions.length === 0
            ? 'Start your first practice test below.'
            : `${stats.sessions.length} test${stats.sessions.length > 1 ? 's' : ''} completed · ${stats.totalAnswered.toLocaleString()} questions answered`}
        </p>
      </div>

      {/* ── Zone 1: Readiness + quick stats ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Readiness card spans 2 columns */}
        <div className="lg:col-span-2">
          <ReadinessCard readiness={readiness} sessions={stats.sessions.length} quizHref={quizHref} />
        </div>

        {/* Right column: three quick-stats stacked */}
        <div className="flex flex-col gap-3">
          <StatsCard
            label="Questions Answered"
            value={stats.totalAnswered.toLocaleString()}
            sub={`${stats.passCount} tests passed`}
            accent={stats.passCount > 0}
          />
          <StatsCard
            label="Correct Rate"
            value={`${stats.avgPct}%`}
            sub={`${stats.totalCorrect.toLocaleString()} correct`}
            accent={stats.avgPct >= 70}
          />
          <StatsCard
            label="Time Studied"
            value={formatStudyTime(stats.totalTimeMs)}
            sub={
              streak.current > 0
                ? `${streak.current}-day streak · best ${streak.best}`
                : 'Start a session to begin your streak'
            }
            accent={streak.current >= 3}
          />
        </div>
      </div>

      {/* ── Zone 2: Coach recommendation ───────────────────────────────── */}
      <div className="mb-4">
        <CoachBanner
          readiness={readiness}
          weakTopics={weakTopics}
          sessions={stats.sessions.length}
          quizHref={quizHref}
        />
      </div>

      {/* ── Zone 3: Weak + Strong topics ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <WeakTopics topics={weakTopicData} testId={quizHref.replace('/quiz/', '')} />
        <StrongTopics topics={strongTopics} />
      </div>

      {/* ── Zone 4: Activity chart (full width) ────────────────────────── */}
      <div className="mb-4">
        <ActivityChart
          days={weeklyActivity}
          streak={streak.current}
          streakBest={streak.best}
        />
      </div>

      {/* ── Zone 5: Review queue + Study plan ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <SmartReviewCard
            missedQuestions={missedQuestions}
            flashcards={flashcards}
            bookmarkCount={bookmarkCount}
          />
        </div>
        <StudyPlanCard
          plan={studyPlan}
          userId={user.id}
          weakTopicCount={weakTopics.length}
        />
      </div>

      {/* ── Zone 6: Recent activity ─────────────────────────────────────── */}
      {stats.sessions.length > 0 && (
        <div className="mb-8">
          <RecentActivity sessions={stats.sessions.slice(0, 5)} />
        </div>
      )}

      {/* ── Zone 7: Practice test picker ───────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold mb-3" style={{ color: '#0f1e3c' }}>
          Start a Practice Test
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableTests.map((t) => (
            <Link
              key={t.id}
              href={`/quiz/${t.id}`}
              className="flex flex-col items-start p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition group"
            >
              <p className="text-xs font-semibold text-gray-900 group-hover:underline leading-snug mb-1">
                {t.label}
              </p>
              <p className="text-xs text-gray-400">{t.questions} questions</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
