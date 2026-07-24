import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ClientQuestion, ClientQuizConfig } from '@/types/question';

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  category: string;
  timeSpentMs: number;
  // Populated from the server grading response — never computed client-side.
  explanation: string;
  sourceRef?: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  passed: boolean;
  passingScore: number;
  answers: AnswerRecord[];
  weakCategories: string[];
  totalTimeMs: number;
}

type Phase = 'idle' | 'active' | 'complete';

interface GradeResponse {
  correct: boolean;
  correctIndex: number;
  correctText: string;
  explanation: string;
  sourceRef?: string;
  error?: string;
}

async function gradeOne(id: string, token: string, selected: number): Promise<GradeResponse | null> {
  try {
    const res = await fetch('/api/grade-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, token, selected }),
    });
    const data = await res.json();
    if (!res.ok || data?.error) return null;
    return data as GradeResponse;
  } catch {
    return null;
  }
}

async function gradeBatch(
  entries: { id: string; token: string; selected: number }[]
): Promise<Map<string, GradeResponse>> {
  const out = new Map<string, GradeResponse>();
  if (entries.length === 0) return out;
  try {
    const res = await fetch('/api/grade-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: entries }),
    });
    const data = await res.json();
    if (!res.ok || !Array.isArray(data?.results)) return out;
    for (const r of data.results) {
      if (r?.id && !r.error) out.set(r.id, r as GradeResponse);
    }
  } catch {
    // Network failure — caller falls back to a locally-marked-wrong record.
  }
  return out;
}

interface QuizStore {
  // Config — client-safe only; never carries answer keys.
  config: ClientQuizConfig | null;

  // Identifies which session request (testId + focus/practiceAll/count/etc.)
  // produced the current config, so a page remount (e.g. an accidental
  // reload mid-quiz) can tell "resume this" apart from "this is a different
  // session request that happens to reuse the same store."
  sessionKey: string | null;

  // Runtime state
  phase: Phase;
  currentIndex: number;
  answers: AnswerRecord[];
  sessionStartTime: number | null;
  questionStartTime: number | null;
  timeRemaining: number | null;  // seconds, null = no timer

  // True while the current question's answer is in flight to the grading
  // endpoint — the UI disables further clicks until this resolves.
  isGrading: boolean;

  // Computed result (set on complete)
  result: QuizResult | null;

  // Zustand's persist middleware rehydrates from sessionStorage
  // asynchronously — on mount, `phase` briefly reads its default ('idle')
  // until rehydration finishes. Consumers (QuizEngine) must wait for this
  // flag before deciding whether a session can be resumed, or they'll
  // wrongly conclude there's nothing to resume and reset a session that's
  // actually still in progress.
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  // Actions
  startQuiz: (config: ClientQuizConfig, sessionKey?: string) => void;
  submitAnswer: (selectedIndex: number) => Promise<void>;
  nextQuestion: () => Promise<void>;
  skipQuestion: () => Promise<void>;
  tickTimer: () => void;
  resetQuiz: () => void;

  // Helpers
  currentQuestion: () => ClientQuestion | null;
  currentAnswer: () => AnswerRecord | undefined;
  isAnswered: () => boolean;
  progress: () => { answered: number; total: number; percent: number };
}

function computeResult(config: ClientQuizConfig, answers: AnswerRecord[], totalTimeMs: number): QuizResult {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const scorePercent = answers.length > 0 ? correctCount / answers.length : 0;

  // Category accuracy
  const categoryMap: Record<string, { correct: number; total: number }> = {};
  for (const a of answers) {
    if (!categoryMap[a.category]) categoryMap[a.category] = { correct: 0, total: 0 };
    categoryMap[a.category].total++;
    if (a.isCorrect) categoryMap[a.category].correct++;
  }
  const weakCategories = Object.entries(categoryMap)
    .filter(([, v]) => v.total >= 2 && v.correct / v.total < 0.6)
    .map(([k]) => k);

  return {
    totalQuestions: config.questions.length,
    correctCount,
    scorePercent,
    passed: scorePercent >= config.passingScore,
    passingScore: config.passingScore,
    answers,
    weakCategories,
    totalTimeMs,
  };
}

/**
 * Backfills correctIndex/explanation (via a batch grade call) for any
 * answers that were recorded locally-only — i.e. timeout auto-submits,
 * where we mark the question wrong immediately without waiting on a
 * network round trip per question. Answers already graded by the server
 * (isCorrect already resolved via submitAnswer/skipQuestion) pass through
 * unchanged. This is the last point before a result is shown or persisted,
 * so it's the final integrity check regardless of how an answer was
 * recorded.
 */
async function finalizeAnswers(
  config: ClientQuizConfig,
  answers: AnswerRecord[]
): Promise<AnswerRecord[]> {
  const needsGrading = answers.filter((a) => a.correctIndex === -1);
  if (needsGrading.length === 0) return answers;

  const byId = new Map(config.questions.map((q) => [q.id, q]));
  const entries = needsGrading
    .map((a) => {
      const q = byId.get(a.questionId);
      return q ? { id: q.id, token: q.token, selected: a.selectedIndex } : null;
    })
    .filter((e): e is { id: string; token: string; selected: number } => e !== null);

  const graded = await gradeBatch(entries);

  return answers.map((a) => {
    if (a.correctIndex !== -1) return a;
    const g = graded.get(a.questionId);
    if (!g) return a; // grading unavailable — leave as locally-marked-wrong
    return {
      ...a,
      correctIndex: g.correctIndex,
      isCorrect: g.correct,
      explanation: g.explanation,
      sourceRef: g.sourceRef,
    };
  });
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
  config: null,
  sessionKey: null,
  phase: 'idle',
  currentIndex: 0,
  answers: [],
  sessionStartTime: null,
  questionStartTime: null,
  timeRemaining: null,
  isGrading: false,
  result: null,
  hasHydrated: false,
  setHasHydrated: (value) => set({ hasHydrated: value }),

  startQuiz: (config, sessionKey) => {
    set({
      config,
      sessionKey: sessionKey ?? null,
      phase: 'active',
      currentIndex: 0,
      answers: [],
      sessionStartTime: Date.now(),
      questionStartTime: Date.now(),
      timeRemaining: config.timeLimitSecs ?? null,
      result: null,
    });
  },

  submitAnswer: async (selectedIndex) => {
    const { config, currentIndex, answers, questionStartTime, isGrading } = get();
    if (!config || isGrading) return;
    const q = config.questions[currentIndex];
    if (!q) return;

    // Prevent double-submit
    if (answers.find((a) => a.questionId === q.id)) return;

    const timeSpentMs = questionStartTime ? Date.now() - questionStartTime : 0;

    set({ isGrading: true });
    const graded = await gradeOne(q.id, q.token, selectedIndex);
    set({ isGrading: false });

    // A network/token failure must never silently reveal or fabricate
    // correctness — mark it for the batch-grade backfill at completion
    // time instead of guessing.
    const record: AnswerRecord = graded
      ? {
          questionId: q.id,
          selectedIndex,
          correctIndex: graded.correctIndex,
          isCorrect: graded.correct,
          category: q.category,
          timeSpentMs,
          explanation: graded.explanation,
          sourceRef: graded.sourceRef,
        }
      : {
          questionId: q.id,
          selectedIndex,
          correctIndex: -1,
          isCorrect: false,
          category: q.category,
          timeSpentMs,
          explanation: '',
        };

    set((s) => ({ answers: [...s.answers, record] }));
  },

  nextQuestion: async () => {
    const { config, currentIndex, answers, sessionStartTime } = get();
    if (!config) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= config.questions.length) {
      // Quiz complete — backfill any locally-unresolved answers before
      // computing the final result.
      const finalAnswers = await finalizeAnswers(config, answers);
      const totalTimeMs = sessionStartTime ? Date.now() - sessionStartTime : 0;
      const result = computeResult(config, finalAnswers, totalTimeMs);
      set({ phase: 'complete', result, currentIndex: nextIndex, answers: finalAnswers });
    } else {
      set({ currentIndex: nextIndex, questionStartTime: Date.now() });
    }
  },

  skipQuestion: async () => {
    // Treat skip as wrong answer with selectedIndex -1. correctIndex is
    // deliberately left unresolved (-1) here rather than fetched inline —
    // the batch backfill at completion time resolves it, keeping "skip"
    // instant instead of blocking on a network call.
    const { config, currentIndex } = get();
    if (!config) return;
    const q = config.questions[currentIndex];
    if (!q) return;

    const record: AnswerRecord = {
      questionId: q.id,
      selectedIndex: -1,
      correctIndex: -1,
      isCorrect: false,
      category: q.category,
      timeSpentMs: 0,
      explanation: '',
    };
    set((s) => ({ answers: [...s.answers, record] }));
    await get().nextQuestion();
  },

  tickTimer: () => {
    set((s) => {
      if (s.timeRemaining === null || s.timeRemaining <= 0) return s;
      const next = s.timeRemaining - 1;
      if (next <= 0) {
        // Time's up — auto-submit unanswered questions as skipped.
        // correctIndex is left unresolved (-1); finalizeAnswers backfills
        // it via a single batch call once we transition to 'complete'
        // below, rather than firing N sequential grading requests here.
        const answeredIds = new Set(s.answers.map((a) => a.questionId));
        const remaining = s.config!.questions.slice(s.currentIndex)
          .filter((q) => !answeredIds.has(q.id))
          .map((q) => ({
            questionId: q.id,
            selectedIndex: -1,
            correctIndex: -1,
            isCorrect: false,
            category: q.category,
            timeSpentMs: 0,
            explanation: '',
          }));
        const allAnswers = [...s.answers, ...remaining];
        const totalTimeMs = s.sessionStartTime ? Date.now() - s.sessionStartTime : 0;

        // Fire-and-await the backfill without blocking this synchronous
        // tick — the result is provisional (locally-marked-wrong) until it
        // resolves, then gets corrected in place.
        const config = s.config!;
        finalizeAnswers(config, allAnswers).then((finalAnswers) => {
          const result = computeResult(config, finalAnswers, totalTimeMs);
          useQuizStore.setState({ result, answers: finalAnswers });
        });

        const provisionalResult = computeResult(config, allAnswers, totalTimeMs);
        return { timeRemaining: 0, phase: 'complete', result: provisionalResult, answers: allAnswers };
      }
      return { timeRemaining: next };
    });
  },

  resetQuiz: () =>
    set({
      config: null,
      sessionKey: null,
      phase: 'idle',
      currentIndex: 0,
      answers: [],
      sessionStartTime: null,
      questionStartTime: null,
      timeRemaining: null,
      isGrading: false,
      result: null,
    }),

  currentQuestion: () => {
    const { config, currentIndex } = get();
    return config?.questions[currentIndex] ?? null;
  },

  currentAnswer: () => {
    const { config, currentIndex, answers } = get();
    const q = config?.questions[currentIndex];
    return q ? answers.find((a) => a.questionId === q.id) : undefined;
  },

  isAnswered: () => !!get().currentAnswer(),

  progress: () => {
    const { config, answers } = get();
    const total = config?.questions.length ?? 0;
    const answered = answers.length;
    return { answered, total, percent: total > 0 ? Math.round((answered / total) * 100) : 0 };
  },
    }),
    {
      // sessionStorage (not localStorage): survives an accidental reload or
      // tab close/reopen within the same browser tab, but doesn't linger
      // indefinitely across unrelated future visits the way localStorage
      // would. Only worth persisting while a quiz is actually in progress —
      // idle/complete states have nothing worth resuming.
      name: 'quiz-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => (
        state.phase === 'active'
          ? {
              config: state.config,
              sessionKey: state.sessionKey,
              phase: state.phase,
              currentIndex: state.currentIndex,
              answers: state.answers,
              sessionStartTime: state.sessionStartTime,
              questionStartTime: state.questionStartTime,
              timeRemaining: state.timeRemaining,
            }
          : {}
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
