"use client";

import { useEffect, useState } from "react";
import { useQuizStore } from "@/store/quiz";
import type { ClientQuizConfig } from "@/types/question";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizTimer from "./QuizTimer";
import QuizResults from "./QuizResults";
import { trackQuizStarted } from "@/lib/analytics";

interface QuizEngineProps {
  config: ClientQuizConfig;
  // Identifies this specific session request (testId + focus/practiceAll/
  // count/etc.). Lets the mount effect tell "the user reloaded mid-quiz,
  // resume it" apart from "this is a genuinely different session request
  // that happens to reuse the same store," e.g. clicking a different
  // weak-topic practice link before finishing the current one.
  sessionKey: string;
}

const SESSION_OPTIONS = [
  { size: 10,   label: "Quick Practice",    desc: "10 questions · ~5 min" },
  { size: 25,   label: "Standard Practice", desc: "25 questions · ~15 min" },
  { size: 50,   label: "Full Practice",     desc: "50 questions · ~30 min" },
  { size: null, label: "All Questions",     desc: "Full bank · no limits" },
] as const;

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizEngine({ config, sessionKey }: QuizEngineProps) {
  const phase = useQuizStore((s) => s.phase);
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const answers = useQuizStore((s) => s.answers);
  const storeConfig = useQuizStore((s) => s.config);
  const storeSessionKey = useQuizStore((s) => s.sessionKey);
  const hasHydrated = useQuizStore((s) => s.hasHydrated);

  const [selectedSize, setSelectedSize] = useState<number | null>(25);

  const isMockExam  = config.isMockExam === true;
  const isAutoStart = config.autoStart === true;
  const bankTotal   = config.questions.length;

  function handleStart(size?: number | null) {
    const count = (size ?? selectedSize) ?? bankTotal;
    const questions = shuffled(config.questions).slice(0, count);
    const sessionConfig: ClientQuizConfig = { ...config, questions };
    startQuiz(sessionConfig, sessionKey);
    trackQuizStarted(config.testId, questions.length);
  }

  // The parent page assigns this component a fresh React `key` per distinct
  // session request (testId + focus/practiceAll/count params), so every
  // mount here represents either a new quiz the user asked to start, or a
  // reload/reopen of a tab that had one already in progress. sessionKey
  // (persisted to sessionStorage alongside the quiz state) tells these two
  // apart: if it still matches and the session was active, resume it as-is
  // instead of wiping the user's progress out from under them. Otherwise
  // treat this as a fresh session request — including "Practice All" /
  // per-topic "Practice" clicks from a just-finished results screen, where
  // testId is unchanged but the questions/autoStart flag differ.
  useEffect(() => {
    // Zustand's persist rehydration is asynchronous — until it finishes,
    // `phase` still reads its pre-hydration default ('idle'), which would
    // otherwise look identical to "nothing to resume" and wipe out a
    // session that's actually still in progress (e.g. on page reload).
    if (!hasHydrated) return;
    const canResume = phase === 'active' && storeSessionKey === sessionKey;
    if (!canResume) {
      resetQuiz();
      if (isAutoStart) {
        handleStart(bankTotal);
      }
    }
  }, [hasHydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  const correctSoFar     = answers.filter((a) => a.isCorrect).length;
  const progressTotal    = storeConfig?.questions.length ?? 0;
  const progressAnswered = answers.length;

  // Don't render the idle selector (or anything else) until we know
  // whether there's a session to resume — otherwise a reload mid-quiz
  // flashes the "choose your session length" screen for a frame before
  // snapping back to the actual in-progress question.
  if (!hasHydrated) {
    return <div className="py-20 text-center text-sm text-gray-400">Loading session…</div>;
  }

  if (phase === 'idle') {
    // Auto-start in progress — show nothing to avoid flash of selector
    if (isAutoStart) {
      return <div className="py-20 text-center text-sm text-gray-400">Loading session…</div>;
    }

    if (isMockExam) {
      return (
        <div className="text-center py-20">
          <button
            onClick={() => handleStart(bankTotal)}
            className="px-8 py-3.5 rounded-xl font-bold text-white text-sm transition hover:opacity-90"
            style={{ backgroundColor: '#1a7f3c' }}
          >
            Start {config.label}
          </button>
        </div>
      );
    }

    // Practice test: show session size selector
    const stateName = config.state
      ? config.state.charAt(0).toUpperCase() + config.state.slice(1)
      : null;
    const displayLabel = stateName
      ? `${stateName} DMV Permit Practice`
      : config.label;

    return (
      <div className="max-w-xl mx-auto py-10">
        {config.notice && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {config.notice}
          </div>
        )}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#0f1e3c' }}>
            {displayLabel}
          </h1>
          <p className="text-sm text-gray-500">
            Full bank: {bankTotal} questions · Choose your session length below
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {SESSION_OPTIONS.map((opt) => {
            const isActive = selectedSize === opt.size;
            const count    = opt.size ?? bankTotal;
            const available = count <= bankTotal;
            return (
              <button
                key={String(opt.size)}
                disabled={!available}
                onClick={() => setSelectedSize(opt.size)}
                className="w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 text-left transition"
                style={{
                  borderColor:     isActive ? '#1a7f3c' : '#e5e7eb',
                  backgroundColor: isActive ? '#f0fdf4' : '#ffffff',
                  opacity: available ? 1 : 0.4,
                }}
              >
                <div>
                  <span className="text-sm font-semibold" style={{ color: isActive ? '#1a7f3c' : '#0f1e3c' }}>
                    {opt.label}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">{opt.desc}</span>
                </div>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: isActive ? '#1a7f3c' : '#d1d5db' }}
                >
                  {isActive && (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#1a7f3c' }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleStart()}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition hover:opacity-90"
          style={{ backgroundColor: '#1a7f3c' }}
        >
          Start {selectedSize ? `${selectedSize} Questions` : 'Full Bank'}
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
        answered={progressAnswered}
        total={progressTotal}
        correct={correctSoFar}
        bankTotal={isMockExam ? undefined : bankTotal}
      />

      <QuizQuestion />
    </div>
  );
}
