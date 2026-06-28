"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/store/quiz";
import type { QuizConfig } from "@/types/question";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizTimer from "./QuizTimer";
import QuizResults from "./QuizResults";
import { trackQuizStarted } from "@/lib/analytics";

interface QuizEngineProps {
  config: QuizConfig;
}

export default function QuizEngine({ config }: QuizEngineProps) {
  const phase = useQuizStore((s) => s.phase);
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const answers = useQuizStore((s) => s.answers);
  const storeConfig = useQuizStore((s) => s.config);

  // Initialize when config changes (new test ID)
  useEffect(() => {
    if (storeConfig?.testId !== config.testId) {
      startQuiz(config);
      trackQuizStarted(config.testId, config.questions.length);
    }
  }, [config.testId]); // eslint-disable-line react-hooks/exhaustive-deps

  const correctSoFar = answers.filter((a) => a.isCorrect).length;
  const progress = useQuizStore((s) => s.progress());

  if (phase === 'idle') {
    return (
      <div className="text-center py-20">
        <button
          onClick={() => startQuiz(config)}
          className="px-8 py-3.5 rounded-xl font-bold text-white text-sm transition hover:opacity-90"
          style={{ backgroundColor: '#1a7f3c' }}
        >
          Start {config.label}
        </button>
      </div>
    );
  }

  if (phase === 'complete') {
    return <QuizResults />;
  }

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <h1 className="text-lg font-bold truncate" style={{ color: '#0f1e3c' }}>{config.label}</h1>
        <QuizTimer />
      </div>

      <QuizProgress
        answered={progress.answered}
        total={progress.total}
        correct={correctSoFar}
      />

      <QuizQuestion />
    </div>
  );
}
