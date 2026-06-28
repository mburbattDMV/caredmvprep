import type { WeakTopic } from '@/types/database';
import { CATEGORY_LABELS } from '@/lib/readiness';

interface Props {
  topics: WeakTopic[];
}

export default function StrongTopics({ topics }: Props) {
  if (topics.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5 flex flex-col">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Strong Topics
        </p>
        <div className="flex-1 flex flex-col items-center justify-center py-4 text-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-base"
            style={{ backgroundColor: '#f0fdf4' }}
          >
            🏆
          </div>
          <p className="text-xs text-gray-400 leading-snug">
            Master a topic by reaching 80% accuracy with at least 5 answers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Strong Topics
        </p>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}
        >
          {topics.length} mastered
        </span>
      </div>

      <div className="space-y-3">
        {topics.map((t) => {
          const pct = Math.round(Number(t.accuracy_pct));
          return (
            <div key={`${t.category_slug}-${t.license_type}`}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs" style={{ color: '#16a34a' }}>✓</span>
                  <span className="text-xs font-medium text-gray-700">
                    {CATEGORY_LABELS[t.category_slug] ?? t.category_slug}
                  </span>
                </div>
                <span className="text-xs font-bold" style={{ color: '#16a34a' }}>
                  {pct}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: '#86efac' }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{t.total} questions answered</p>
            </div>
          );
        })}
      </div>

      {topics.length >= 3 && (
        <p className="text-xs mt-4 pt-3 border-t border-gray-100 font-semibold" style={{ color: '#16a34a' }}>
          Great work — you&apos;ve mastered {topics.length} topic{topics.length > 1 ? 's' : ''}!
        </p>
      )}
    </div>
  );
}
