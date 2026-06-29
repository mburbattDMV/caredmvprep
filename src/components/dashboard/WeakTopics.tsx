import { getCategoryLabel, topicConfidence } from '@/lib/readiness';
import Link from 'next/link';

interface FocusTopic {
  category:     string;
  correct:      number;
  total:        number;
  accuracy_pct?: number;
}

interface Props {
  topics:  FocusTopic[];
  testId?: string;
  title?:  string;
}

export default function WeakTopics({ topics, testId = 'california-permit', title = 'Focus Areas' }: Props) {
  if (topics.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          {title}
        </p>
        <p className="text-xs text-gray-400 leading-snug">
          Complete a practice test to identify areas where you need more work.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {title}
        </p>
        <Link
          href={`/quiz/${testId}?practiceAll=1`}
          className="text-xs font-bold px-2.5 py-1 rounded-lg text-white transition hover:opacity-90"
          style={{ backgroundColor: '#b91c1c' }}
        >
          Practice All →
        </Link>
      </div>

      <div className="space-y-4">
        {topics.map((t) => {
          const pct = t.accuracy_pct != null
            ? Math.round(t.accuracy_pct)
            : t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;

          const confidence = topicConfidence(t.total);

          const color =
            pct >= 80 ? '#1a7f3c' :
            pct >= 60 ? '#d97706' :
                        '#b91c1c';

          const label = getCategoryLabel(t.category);

          return (
            <div key={t.category}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs font-medium text-gray-700 truncate">{label}</span>
                  {confidence === 'preliminary' && (
                    <span className="shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: '#fef9c3', color: '#92400e' }}>
                      Preliminary
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-xs text-gray-400">({t.total}q)</span>
                  <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                  <Link
                    href={`/quiz/${testId}?focus=${t.category}&count=10&autostart=1`}
                    className="text-xs font-semibold px-2 py-0.5 rounded transition hover:opacity-80"
                    style={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}
                  >
                    Practice
                  </Link>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
