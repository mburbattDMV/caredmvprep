"use client";

import { useQuizStore } from "@/store/quiz";
import BookmarkButton from "./BookmarkButton";

export default function QuizQuestion() {
  const q = useQuizStore((s) => s.currentQuestion());
  const answer = useQuizStore((s) => s.currentAnswer());
  const submitAnswer = useQuizStore((s) => s.submitAnswer);
  const nextQuestion = useQuizStore((s) => s.nextQuestion);
  const currentIndex = useQuizStore((s) => s.currentIndex);
  const config = useQuizStore((s) => s.config);

  if (!q || !config) return null;

  const isAnswered = !!answer;
  const isLast = currentIndex >= config.questions.length - 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Question header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Question {currentIndex + 1} of {config.questions.length}
        </p>
        <p className="text-base font-semibold text-gray-900 leading-relaxed">{q.question}</p>
      </div>

      {/* Answer options */}
      <div className="px-6 py-5 space-y-3">
        {q.options.map((opt, oi) => {
          const isCorrect = oi === q.correctIndex;
          const isSelected = oi === answer?.selectedIndex;

          let borderColor = "border-gray-200";
          let bg = "bg-white";
          let textColor = "text-gray-700";
          let badgeBg = "#e5e7eb";
          let badgeText = "#6b7280";
          let icon: React.ReactNode = null;

          if (isAnswered) {
            if (isCorrect) {
              borderColor = "border-green-500";
              bg = "bg-green-50";
              textColor = "text-green-900 font-medium";
              badgeBg = "#16a34a";
              badgeText = "#fff";
              icon = (
                <svg className="shrink-0 w-4 h-4 ml-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              );
            } else if (isSelected) {
              borderColor = "border-red-400";
              bg = "bg-red-50";
              textColor = "text-red-900 font-medium";
              badgeBg = "#ef4444";
              badgeText = "#fff";
              icon = (
                <svg className="shrink-0 w-4 h-4 ml-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              );
            } else {
              textColor = "text-gray-400";
              badgeText = "#d1d5db";
            }
          }

          return (
            <button
              key={oi}
              onClick={() => !isAnswered && submitAnswer(oi)}
              disabled={isAnswered}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${borderColor} ${bg} ${
                !isAnswered ? "hover:border-blue-400 hover:bg-blue-50 cursor-pointer active:scale-[0.99]" : "cursor-default"
              }`}
            >
              <span
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors"
                style={{ backgroundColor: badgeBg, color: badgeText }}
              >
                {String.fromCharCode(65 + oi)}
              </span>
              <span className={`text-sm leading-snug ${textColor}`}>{opt}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Explanation — shown after answering */}
      {isAnswered && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            Correct Answer: {String.fromCharCode(65 + q.correctIndex)} — {q.options[q.correctIndex]}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">{q.explanation}</p>
          <div className="flex items-center justify-between mt-2">
            {q.sourceRef ? (
              <p className="text-xs text-gray-400">Source: {q.sourceRef}</p>
            ) : (
              <span />
            )}
            <BookmarkButton questionId={q.id} />
          </div>
        </div>
      )}

      {/* Navigation */}
      {isAnswered && (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={nextQuestion}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: '#1a7f3c' }}
          >
            {isLast ? "See Results" : "Next Question"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
