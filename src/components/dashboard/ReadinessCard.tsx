import type { ReadinessResult } from '@/lib/readiness';
import { PASSING_THRESHOLD } from '@/lib/readiness';
import Link from 'next/link';

interface Props {
  readiness: ReadinessResult;
  sessions:  number;
  quizHref:  string;
}

export default function ReadinessCard({ readiness, sessions, quizHref }: Props) {
  const {
    score, confidence, label, color, description, questionsToReady, trendLabel,
    topicsMastered, totalTopics, passProb, nextStep,
  } = readiness;

  const circumference = 2 * Math.PI * 44;
  const offset = circumference * (1 - score / 100);
  const hasData = confidence !== 'no_data';

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-6 py-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Overall Readiness
      </p>

      <div className="flex items-center gap-6">
        {/* Ring */}
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="44" fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold leading-none" style={{ color }}>
              {hasData ? `${score}%` : '—'}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-lg font-bold" style={{ color: '#0f1e3c' }}>
              {label}
            </span>
            {trendLabel && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={
                  readiness.trend === 'up'   ? { backgroundColor: '#f0fdf4', color: '#16a34a' } :
                  readiness.trend === 'down' ? { backgroundColor: '#fef2f2', color: '#b91c1c' } :
                                               { backgroundColor: '#f3f4f6', color: '#6b7280' }
                }
              >
                {trendLabel}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 mb-2 leading-snug">{description}</p>

          {/* Stats row */}
          {hasData && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
              {totalTopics > 0 && (
                <span className="text-xs text-gray-500">
                  Topics mastered: <strong className="text-gray-800">{topicsMastered} of {totalTopics}</strong>
                </span>
              )}
              {passProb > 0 && (
                <span className="text-xs text-gray-500">
                  Pass probability: <strong style={{ color: passProb >= 80 ? '#16a34a' : '#d97706' }}>{passProb}%</strong>
                </span>
              )}
            </div>
          )}

          {/* Progress to ready */}
          {hasData && score < PASSING_THRESHOLD && (
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Your score</span>
                <span>{PASSING_THRESHOLD}% needed</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.min((score / PASSING_THRESHOLD) * 100, 100)}%`, backgroundColor: color }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                ~{questionsToReady} more correct answers to reach Exam Ready
              </p>
            </div>
          )}

          {score >= PASSING_THRESHOLD && (
            <p className="text-xs font-semibold mb-2" style={{ color: '#16a34a' }}>
              You&apos;re above passing threshold. Keep your streak going!
            </p>
          )}

          {/* Recommended next step */}
          {hasData && nextStep && (
            <p className="text-xs mb-3 px-3 py-2 rounded-lg" style={{ backgroundColor: '#f8fafc', color: '#374151' }}>
              <span className="font-semibold">Next: </span>{nextStep}
            </p>
          )}

          {sessions === 0 ? (
            <Link
              href={quizHref}
              className="inline-block px-4 py-2 text-xs font-bold rounded-lg text-white transition hover:opacity-90"
              style={{ backgroundColor: '#1a7f3c' }}
            >
              Take Your First Test →
            </Link>
          ) : (
            <Link
              href={quizHref}
              className="inline-block px-4 py-2 text-xs font-bold rounded-lg text-white transition hover:opacity-90"
              style={{ backgroundColor: '#1a7f3c' }}
            >
              Practice Now →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
