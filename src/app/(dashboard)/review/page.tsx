import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  getWeakTopics,
  getRecentlyMissed,
  getBookmarks,
  getFlashcardStats,
  getProfile,
} from "@/lib/supabase/queries";
import { getQuestionById } from "@/data/questions/index";

const STATE_SLUGS: Record<string, string> = { CA: 'california' };
const LICENSE_SUFFIX: Record<string, string> = {
  permit: 'permit', motorcycle: 'motorcycle', cdl_general: 'cdl-general',
};
function getQuizHref(state: string | null | undefined, license: string | null | undefined): string {
  const slug   = STATE_SLUGS[state ?? ''] ?? 'california';
  const suffix = LICENSE_SUFFIX[license ?? ''] ?? 'permit';
  return `/quiz/${slug}-${suffix}`;
}

export const metadata = {
  title: "Review Center — CAREDMVPrep",
  robots: { index: false, follow: false },
};

function AccuracyBar({ pct }: { pct: number }) {
  const color = pct >= 80 ? '#16a34a' : pct >= 60 ? '#d97706' : '#ef4444';
  return (
    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function SectionHeader({ title, count, href }: { title: string; count?: number; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-bold" style={{ color: '#0f1e3c' }}>
        {title}
        {count !== undefined && (
          <span className="ml-2 text-xs font-normal text-gray-400">({count})</span>
        )}
      </h2>
      {href && (
        <Link href={href} className="text-xs text-gray-400 hover:text-gray-700 transition">
          See all →
        </Link>
      )}
    </div>
  );
}

export default async function ReviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [profile, weakTopics, missedRaw, bookmarks, flashcards] = await Promise.all([
    getProfile(supabase, user.id),
    getWeakTopics(supabase, user.id, 10),
    getRecentlyMissed(supabase, user.id, 30),
    getBookmarks(supabase, user.id, 30),
    getFlashcardStats(supabase, user.id),
  ]);

  const quizHref = getQuizHref(profile?.target_state, profile?.target_license);

  // Enrich missed questions with text from the in-memory question registry
  const missedEnriched = missedRaw
    .map((m) => ({ ...m, question: getQuestionById(m.question_id) }))
    .filter((m) => m.question !== undefined);

  // Enrich bookmarks with question text
  const bookmarkEnriched = bookmarks
    .map((b) => ({ ...b, question: getQuestionById(b.question_id) }))
    .filter((b) => b.question !== undefined);

  const hasContent =
    weakTopics.length > 0 ||
    missedEnriched.length > 0 ||
    bookmarkEnriched.length > 0 ||
    flashcards.total > 0;

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#0f1e3c' }}>
          Review Center
        </h1>
        <p className="text-sm text-gray-500">
          Your weak spots, missed questions, and bookmarks — all in one place.
        </p>
      </div>

      {!hasContent && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Nothing to review yet — your weak topics and missed questions will appear here after you take a few practice tests.
          </p>
          <Link
            href={quizHref}
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: '#1a7f3c' }}
          >
            Start a Practice Test
          </Link>
        </div>
      )}

      {hasContent && (
        <div className="space-y-8">

          {/* ── Weak Topics ─────────────────────────────────────────────── */}
          {weakTopics.length > 0 && (
            <section>
              <SectionHeader title="Weak Topics" count={weakTopics.length} />
              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {weakTopics.map((t) => {
                  const pct = Math.round((t.correct / t.total) * 100);
                  const label = t.category_slug
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <div key={t.category_slug} className="px-5 py-3.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-gray-800">{label}</span>
                        <span className="text-xs text-gray-400 shrink-0 ml-4">
                          {t.correct}/{t.total} · {pct}%
                        </span>
                      </div>
                      <AccuracyBar pct={pct} />
                      {t.total >= 3 && pct < 60 && (
                        <Link
                          href={`${quizHref}?focus=${t.category_slug}`}
                          className="mt-1.5 inline-block text-xs font-semibold"
                          style={{ color: '#1a7f3c' }}
                        >
                          Practice this topic →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Missed Questions ────────────────────────────────────────── */}
          {missedEnriched.length > 0 && (
            <section>
              <SectionHeader title="Recently Missed" count={missedEnriched.length} />
              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {missedEnriched.slice(0, 15).map((m, i) => {
                  const q = m.question!;
                  return (
                    <div key={`${m.question_id}-${i}`} className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900 leading-snug mb-1">
                        {q.question}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        Correct answer: <span className="text-gray-700 font-medium">{q.options[q.correctIndex]}</span>
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Bookmarks ───────────────────────────────────────────────── */}
          {bookmarkEnriched.length > 0 && (
            <section>
              <SectionHeader title="Bookmarked Questions" count={bookmarkEnriched.length} />
              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {bookmarkEnriched.map((b, i) => {
                  const q = b.question!;
                  return (
                    <div key={`${b.question_id}-${i}`} className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900 leading-snug mb-1">
                        {q.question}
                      </p>
                      <p className="text-xs text-gray-500">
                        Answer: <span className="text-gray-700 font-medium">{q.options[q.correctIndex]}</span>
                      </p>
                      {b.note && (
                        <p className="text-xs text-amber-700 mt-1 leading-relaxed italic">Note: {b.note}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Flashcards ──────────────────────────────────────────────── */}
          {flashcards.total > 0 && (
            <section>
              <SectionHeader title="Flashcards" />
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 flex items-center justify-between gap-6">
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-500">{flashcards.dueToday}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Due today</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-500">{flashcards.learning}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Learning</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{flashcards.mastered}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Mastered</p>
                    </div>
                  </div>
                  {flashcards.dueToday > 0 && (
                    <div className="shrink-0">
                      <span className="inline-block px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ backgroundColor: '#1a7f3c' }}>
                        Review due
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}
