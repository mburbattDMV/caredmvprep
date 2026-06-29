interface QuizProgressProps {
  answered: number;
  total: number;
  correct: number;
  bankTotal?: number;
}

export default function QuizProgress({ answered, total, correct, bankTotal }: QuizProgressProps) {
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5">
        <span>
          {answered} of {total} answered
          {bankTotal && bankTotal > total ? (
            <span className="ml-2 text-gray-400">· Full bank: {bankTotal} questions</span>
          ) : null}
        </span>
        <span>{correct} correct so far</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: '#1a7f3c' }}
        />
      </div>
    </div>
  );
}
