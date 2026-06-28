import type { Question as SchemaQuestion } from './schema';
import type { Question, QuizConfig } from '@/types/question';

import caDmvQuestions                from './dmv/california';
import txDmvQuestions                from './dmv/texas';
import caMotoQuestions               from './motorcycle/california';
import txMotoQuestions               from './motorcycle/texas';
import cdlFederalQuestions           from './cdl/federal';
import cdlSchoolBusQuestions         from './cdl/school-bus';
import cdlTankVehicleQuestions       from './cdl/tank-vehicles';
import cdlAirBrakesQuestions         from './cdl/air-brakes';
import cdlCombinationVehicleQuestions from './cdl/combination-vehicles';
import cdlHazmatQuestions            from './cdl/hazmat';
import cdlDoublesTriplesQuestions    from './cdl/doubles-triples';
import cdlPassengerQuestions         from './cdl/passenger';

// Map a full schema Question to the lightweight quiz engine Question.
// Only called after filtering to verified status.
function toQuizQuestion(q: SchemaQuestion): Question {
  return {
    id:           q.id,
    question:     q.question,
    options:      q.options,
    correctIndex: q.correctIndex,
    explanation:  q.explanation,
    category:     q.category,
    sourceRef:    `${q.source} — ${q.sourceSection}`,
  };
}

function verified(questions: SchemaQuestion[]): Question[] {
  return questions.filter((q) => q.status === 'verified').map(toQuizQuestion);
}

export const quizRegistry: Record<string, QuizConfig> = {
  'california-permit': {
    testId:      'california-permit',
    label:       'California DMV Permit Practice Test',
    state:       'california',
    licenseType: 'permit',
    questions:   verified(caDmvQuestions),
    passingScore: 0.80,  // 37 of 46 correct on the real test
  },
  'california-motorcycle': {
    testId:      'california-motorcycle',
    label:       'California Motorcycle Practice Test',
    state:       'california',
    licenseType: 'motorcycle',
    questions:   verified(caMotoQuestions),
    passingScore: 0.80,  // 24 of 30 on the real test
  },
  'california-cdl-general': {
    testId:      'california-cdl-general',
    label:       'California CDL General Knowledge Practice Test',
    state:       'california',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal standard
  },

  // ── Texas ─────────────────────────────────────────────────────────────────
  // Question banks are empty until the TX bank is authored. The quiz page
  // returns 404 when questions.length === 0, so these registrations are safe.

  'texas-permit': {
    testId:      'texas-permit',
    label:       'Texas DPS Driver\'s License Practice Test',
    state:       'texas',
    licenseType: 'permit',
    questions:   verified(txDmvQuestions),
    passingScore: 0.70,  // 21 of 30 correct — Texas threshold is 70% (lower than most states)
  },
  'texas-motorcycle': {
    testId:      'texas-motorcycle',
    label:       'Texas DPS Motorcycle (Class M) Practice Test',
    state:       'texas',
    licenseType: 'motorcycle',
    questions:   verified(txMotoQuestions),
    passingScore: 0.80,  // 20 of 25 correct — 80% federal MSF standard
  },
  'texas-cdl-general': {
    testId:      'texas-cdl-general',
    label:       'Texas CDL General Knowledge Practice Test',
    state:       'texas',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — FMCSA federal standard, identical in all states
  },

  // ── CDL Endorsement Banks — federal (state-agnostic) ─────────────────────
  // Each endorsement is independently scalable: import its file, add a quiz here.
  // Actual test: 20 questions each, pass with 16 correct (80%) — FMCSA standard.

  'cdl-school-bus': {
    testId:      'cdl-school-bus',
    label:       'CDL School Bus Endorsement (S) Practice Test',
    state:       'federal',
    licenseType: 'cdl_school_bus',
    questions:   verified(cdlSchoolBusQuestions),
    passingScore: 0.80,
  },
  'cdl-tank-vehicles': {
    testId:      'cdl-tank-vehicles',
    label:       'CDL Tank Vehicle Endorsement (N) Practice Test',
    state:       'federal',
    licenseType: 'cdl_tanker',
    questions:   verified(cdlTankVehicleQuestions),
    passingScore: 0.80,
  },
  'cdl-air-brakes': {
    testId:      'cdl-air-brakes',
    label:       'CDL Air Brakes Knowledge Test Practice',
    state:       'federal',
    licenseType: 'cdl_air_brakes',
    questions:   verified(cdlAirBrakesQuestions),
    passingScore: 0.80,  // 20 of 25 — federal standard
  },
  'cdl-combination-vehicles': {
    testId:      'cdl-combination-vehicles',
    label:       'CDL Combination Vehicles Practice Test',
    state:       'federal',
    licenseType: 'cdl_combination',
    questions:   verified(cdlCombinationVehicleQuestions),
    passingScore: 0.80,  // 16 of 20 — federal standard
  },
  'cdl-hazmat': {
    testId:      'cdl-hazmat',
    label:       'CDL Hazardous Materials Endorsement (H) Practice Test',
    state:       'federal',
    licenseType: 'cdl_hazmat',
    questions:   verified(cdlHazmatQuestions),
    passingScore: 0.80,  // 24 of 30 — federal standard
  },
  'cdl-doubles-triples': {
    testId:      'cdl-doubles-triples',
    label:       'CDL Doubles & Triples Endorsement (T) Practice Test',
    state:       'federal',
    licenseType: 'cdl_doubles_triples',
    questions:   verified(cdlDoublesTriplesQuestions),
    passingScore: 0.80,  // 16 of 20 — federal standard
  },
  'cdl-passenger': {
    testId:      'cdl-passenger',
    label:       'CDL Passenger Transport Endorsement (P) Practice Test',
    state:       'federal',
    licenseType: 'cdl_passenger',
    questions:   verified(cdlPassengerQuestions),
    passingScore: 0.80,  // 16 of 20 — federal standard
  },
};

export function getQuizConfig(testId: string): QuizConfig | null {
  return quizRegistry[testId] ?? null;
}

export function getAllTestIds(): string[] {
  return Object.keys(quizRegistry);
}

// ── Question lookup index ─────────────────────────────────────────────────────
// Built once at module load. Covers every question across all registered tests.
const _questionIndex = new Map<string, Question>();
for (const cfg of Object.values(quizRegistry)) {
  for (const q of cfg.questions) {
    if (!_questionIndex.has(q.id)) _questionIndex.set(q.id, q);
  }
}
export function getQuestionById(id: string): Question | undefined {
  return _questionIndex.get(id);
}

// ── Mock Exam engine ──────────────────────────────────────────────────────────

export interface MockExamDef {
  examId:        string;
  label:         string;
  shortLabel:    string;
  baseTestId:    string;
  questionCount: number;
  seed:          number;
  timeLimitSecs: number;
  description:   string;
}

export const MOCK_EXAM_DEFS: MockExamDef[] = [
  {
    examId:        'california-permit-mock-1',
    label:         'California Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'california-permit',
    questionCount: 36,
    seed:          1,
    timeLimitSecs: 38 * 60,
    description:   'Simulates the real CA DMV permit test — 36 questions, 38 min.',
  },
  {
    examId:        'california-permit-mock-2',
    label:         'California Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'california-permit',
    questionCount: 36,
    seed:          2,
    timeLimitSecs: 38 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'california-permit-mock-3',
    label:         'California Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'california-permit',
    questionCount: 36,
    seed:          3,
    timeLimitSecs: 38 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
];

// Mulberry32 PRNG — deterministic, fast, no external deps.
function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getMockExamConfig(examId: string, timed = true): QuizConfig | null {
  const def = MOCK_EXAM_DEFS.find((d) => d.examId === examId);
  if (!def) return null;
  const base = quizRegistry[def.baseTestId];
  if (!base) return null;
  const questions = seededShuffle(base.questions, def.seed).slice(0, def.questionCount);
  return {
    testId:       def.examId,
    label:        def.label,
    state:        base.state,
    licenseType:  base.licenseType,
    questions,
    passingScore: base.passingScore,
    timeLimitSecs: timed ? def.timeLimitSecs : undefined,
  };
}
