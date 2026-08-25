"use client";

import { useState } from "react";
import type { ClientSampleQuestion } from "./PracticeTestPage";

interface Props {
  questions: ClientSampleQuestion[];
  state: string;
  testLabel: string;
}

interface AnsweredState {
  selected: number;
  loading: boolean;
  /** Populated once the grading response arrives. */
  correct?: boolean;
  correctIndex?: number;
  explanation?: string;
  error?: boolean;
}

export default function SampleQuestions({ questions }: Props) {
  const [answers, setAnswers] = useState<Record<number, AnsweredState>>({});

  const answeredCount = Object.keys(answers).length;
  const gradedEntries = Object.values(answers).filter((a) => a.correct !== undefined);
  const correctCount = gradedEntries.filter((a) => a.correct).length;

  async function handleSelect(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;

    // Optimistic: lock the question and show a "checking" state immediately,
    // same interaction latency as before from the student's perspective.
    setAnswers((prev) => ({ ...prev, [qi]: { selected: oi, loading: true } }));

    const q = questions[qi];
    try {
      const res = await fetch("/api/grade-sample-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.question,
          options: q.options,
          token: q.token,
          selected: oi,
        }),
      });

      if (!res.ok) {
        setAnswers((prev) => ({ ...prev, [qi]: { selected: oi, loading: false, error: true } }));
        return;
      }

      const result = (await res.json()) as {
        correct: boolean;
        correctIndex: number;
        explanation: string;
      };

      setAnswers((prev) => ({
        ...prev,
        [qi]: {
          selected: oi,
          loading: false,
          correct: result.correct,
          correctIndex: result.correctIndex,
          explanation: result.explanation,
        },
      }));
    } catch {
      setAnswers((prev) => ({ ...prev, [qi]: { selected: oi, loading: false, error: true } }));
    }
  }

  return (
    <div>
      {/* Score tracker — appears once any question is answered */}
      <div
        className="mb-6 flex items-center gap-6 px-5 py-3 bg-white rounded-xl border border-gray-200 text-sm"
        aria-live="polite"
      >
        <span className="text-gray-500">
          Answered:{" "}
          <span className="font-bold text-gray-900">
            {answeredCount}/{questions.length}
          </span>
        </span>
        <span className="text-gray-500">
          Score:{" "}
          <span
            className="font-bold"
            style={{
              color:
                gradedEntries.length === 0
                  ? "#9ca3af"
                  : correctCount === gradedEntries.length
                    ? "#1a7f3c"
                    : "#b91c1c",
            }}
          >
            {correctCount}/{gradedEntries.length > 0 ? gradedEntries.length : questions.length}
          </span>{" "}
          correct
        </span>
        {gradedEntries.length === questions.length && questions.length > 0 && (
          <span
            className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: correctCount === questions.length ? "#f0fdf4" : "#fef2f2",
              color: correctCount === questions.length ? "#1a7f3c" : "#b91c1c",
            }}
          >
            {correctCount === questions.length
              ? "Perfect score!"
              : `${Math.round((correctCount / questions.length) * 100)}% — keep studying`}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {questions.map((q, qi) => {
          const answer = answers[qi];
          const userChoice = answer?.selected;
          const isAnswered = userChoice !== undefined;
          const isGraded = answer?.correct !== undefined;
          const correctIndex = answer?.correctIndex;

          return (
            <div
              key={qi}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Question */}
              <div className="flex items-start gap-3 px-5 py-4">
                <span
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                  style={{ backgroundColor: "#0f1e3c" }}
                >
                  {qi + 1}
                </span>
                <p className="font-semibold text-gray-900 text-sm leading-snug pt-0.5">
                  {q.question}
                </p>
              </div>

              {/* Answer options */}
              <div className="px-5 pb-4 space-y-2 pl-[3.25rem]">
                {q.options.map((opt, oi) => {
                  const isCorrect = isGraded && oi === correctIndex;
                  const isSelected = oi === userChoice;

                  // Determine visual state
                  let borderStyle = "border-gray-200";
                  let bgStyle = "bg-white";
                  let textStyle = "text-gray-700";
                  let badgeBg = "#e5e7eb";
                  let badgeText = "#6b7280";
                  let icon: React.ReactNode = null;

                  if (isGraded) {
                    if (isCorrect) {
                      borderStyle = "border-green-500";
                      bgStyle = "bg-green-50";
                      textStyle = "text-green-900 font-medium";
                      badgeBg = "#16a34a";
                      badgeText = "#fff";
                      icon = (
                        <svg
                          className="shrink-0 w-4 h-4 ml-auto text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      );
                    } else if (isSelected) {
                      borderStyle = "border-red-400";
                      bgStyle = "bg-red-50";
                      textStyle = "text-red-900 font-medium";
                      badgeBg = "#ef4444";
                      badgeText = "#fff";
                      icon = (
                        <svg
                          className="shrink-0 w-4 h-4 ml-auto text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      );
                    } else {
                      // Not selected, not correct — dim it
                      textStyle = "text-gray-400";
                      badgeText = "#d1d5db";
                    }
                  } else if (isSelected && answer?.loading) {
                    // Awaiting grading response — brief, same-origin round trip
                    borderStyle = "border-blue-300";
                    bgStyle = "bg-blue-50";
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(qi, oi)}
                      disabled={isAnswered}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-150 ${borderStyle} ${bgStyle} ${
                        !isAnswered
                          ? "hover:border-blue-400 hover:bg-blue-50 cursor-pointer active:scale-[0.99]"
                          : "cursor-default"
                      }`}
                    >
                      <span
                        className="shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-colors"
                        style={{ backgroundColor: badgeBg, color: badgeText }}
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className={`text-sm ${textStyle}`}>{opt}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Explanation — revealed after grading */}
              {isAnswered && answer?.loading && (
                <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 pl-[3.25rem]">
                  <p className="text-sm text-gray-400">Checking…</p>
                </div>
              )}
              {isAnswered && answer?.error && (
                <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 pl-[3.25rem]">
                  <p className="text-sm text-red-600">
                    Couldn&apos;t check that answer — please refresh and try again.
                  </p>
                </div>
              )}
              {isGraded && correctIndex !== undefined && (
                <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 pl-[3.25rem]">
                  <p className="text-sm font-semibold text-gray-800 mb-1.5">
                    Correct Answer: {String.fromCharCode(65 + correctIndex)} —{" "}
                    {q.options[correctIndex]}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{answer.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
