import type { DayActivity } from '@/lib/readiness';

interface Props {
  days:         DayActivity[];
  streak:       number;
  streakBest:   number;
}

export default function ActivityChart({ days, streak, streakBest }: Props) {
  const maxQuestions = Math.max(...days.map((d) => d.questions), 1);
  const totalThisWeek = days.reduce((sum, d) => sum + d.questions, 0);
  const activeDays = days.filter((d) => d.questions > 0).length;
  const CHART_PX = 56;

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          This Week
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {streak > 0 && (
            <span className="font-semibold" style={{ color: '#d97706' }}>
              {streak}-day streak
              {streakBest > streak && (
                <span className="text-gray-400 font-normal ml-1">(best: {streakBest})</span>
              )}
            </span>
          )}
          <span>{activeDays} of 7 days active</span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 mb-2" style={{ height: `${CHART_PX + 8}px` }}>
        {days.map((day, i) => {
          const isToday = i === 6;
          const height = day.questions > 0
            ? Math.max(Math.round((day.questions / maxQuestions) * CHART_PX), 6)
            : 3;
          const barColor = day.questions > 0
            ? (isToday ? '#1a7f3c' : '#86efac')
            : '#e5e7eb';

          return (
            <div key={day.isoDate} className="flex flex-col items-center gap-1 flex-1 group relative">
              {/* Tooltip on hover */}
              {day.questions > 0 && (
                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {day.questions} q
                  </div>
                </div>
              )}
              <div
                className="w-full rounded-sm transition-all duration-300"
                style={{ height: `${height}px`, backgroundColor: barColor, marginTop: 'auto' }}
              />
            </div>
          );
        })}
      </div>

      {/* Day labels */}
      <div className="flex gap-2">
        {days.map((day, i) => (
          <div key={day.isoDate} className="flex-1 text-center">
            <span
              className="text-xs"
              style={{ color: i === 6 ? '#0f1e3c' : '#9ca3af', fontWeight: i === 6 ? 600 : 400 }}
            >
              {day.date}
            </span>
          </div>
        ))}
      </div>

      {/* Summary line */}
      <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
        {totalThisWeek > 0
          ? `${totalThisWeek} questions answered this week`
          : 'No activity this week — start a practice test to build your streak.'}
      </p>
    </div>
  );
}
