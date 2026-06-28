import type { MissedQuestion, FlashcardStats } from '@/lib/supabase/queries';
import { CATEGORY_LABELS } from '@/lib/readiness';
import Link from 'next/link';

interface Props {
  missedQuestions: MissedQuestion[];
  flashcards:      FlashcardStats;
  bookmarkCount:   number;
}

function groupByCategory(questions: MissedQuestion[]): Record<string, number> {
  return questions.reduce<Record<string, number>>((acc, q) => {
    acc[q.category] = (acc[q.category] ?? 0) + 1;
    return acc;
  }, {});
}

export default function SmartReviewCard({ missedQuestions, flashcards, bookmarkCount }: Props) {
  const grouped = groupByCategory(missedQuestions);
  const topCategories = Object.entries(grouped)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const hasAnything = missedQuestions.length > 0 || bookmarkCount > 0 || flashcards.dueToday > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Review Queue
      </p>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#fef2f2' }}>
          <p className="text-xl font-extrabold" style={{ color: '#b91c1c' }}>
            {missedQuestions.length}
          </p>
          <p className="text-xs text-gray-500 leading-tight mt-0.5">Recently<br />Missed</p>
        </div>
        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#fffbeb' }}>
          <p className="text-xl font-extrabold" style={{ color: '#d97706' }}>
            {bookmarkCount}
          </p>
          <p className="text-xs text-gray-500 leading-tight mt-0.5">Book-<br />marked</p>
        </div>
        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f0fdf4' }}>
          <p className="text-xl font-extrabold" style={{ color: '#1a7f3c' }}>
            {flashcards.dueToday}
          </p>
          <p className="text-xs text-gray-500 leading-tight mt-0.5">Flash-<br />cards Due</p>
        </div>
      </div>

      {/* Top missed categories */}
      {topCategories.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 mb-2">Most missed:</p>
          <div className="space-y-1.5">
            {topCategories.map(([slug, count]) => (
              <div key={slug} className="flex items-center justify-between">
                <span className="text-xs text-gray-700">
                  {CATEGORY_LABELS[slug] ?? slug}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}
                >
                  {count}×
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasAnything ? (
        <Link
          href="/review"
          className="block w-full text-center py-2.5 text-xs font-bold rounded-lg text-white transition hover:opacity-90"
          style={{ backgroundColor: '#0f1e3c' }}
        >
          Start Review Session →
        </Link>
      ) : (
        <p className="text-xs text-gray-400 text-center py-2">
          No missed questions yet — keep practicing to build your review queue.
        </p>
      )}

      {flashcards.total > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-400">
          <span>{flashcards.mastered} mastered</span>
          <span>{flashcards.learning} still learning</span>
          <span>{flashcards.total} total cards</span>
        </div>
      )}
    </div>
  );
}
