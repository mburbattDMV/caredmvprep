import type { Question as SchemaQuestion } from './schema';
import type { Question, QuizConfig } from '@/types/question';

import caDmvQuestions                from './dmv/california';
import txDmvQuestions                from './dmv/texas';
import flDmvQuestions                from './dmv/florida';
import nyDmvQuestions                from './dmv/new-york';
import paDmvQuestions                from './dmv/pennsylvania';
import ilDmvQuestions                from './dmv/illinois';
import caMotoQuestions               from './motorcycle/california';
import txMotoQuestions               from './motorcycle/texas';
import flMotoQuestions               from './motorcycle/florida';
import nyMotoQuestions               from './motorcycle/new-york';
import paMotoQuestions               from './motorcycle/pennsylvania';
import ilMotoQuestions               from './motorcycle/illinois';
import ohDmvQuestions                from './dmv/ohio';
import ohMotoQuestions               from './motorcycle/ohio';
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

  // ── Ohio ──────────────────────────────────────────────────────────────────
  'ohio-permit': {
    testId:      'ohio-permit',
    label:       'Ohio BMV Permit Practice Test',
    state:       'ohio',
    licenseType: 'permit',
    questions:   verified(ohDmvQuestions),
    passingScore: 0.75,  // 15 of 20 — Ohio BMV standard (75%)
  },
  'ohio-motorcycle': {
    testId:      'ohio-motorcycle',
    label:       'Ohio BMV Motorcycle Practice Test',
    state:       'ohio',
    licenseType: 'motorcycle',
    questions:   verified(ohMotoQuestions),
    passingScore: 0.75,
  },
  'ohio-cdl-general': {
    testId:      'ohio-cdl-general',
    label:       'Ohio CDL General Knowledge Practice Test',
    state:       'ohio',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Illinois ──────────────────────────────────────────────────────────────
  'illinois-permit': {
    testId:      'illinois-permit',
    label:       'Illinois Secretary of State Permit Practice Test',
    state:       'illinois',
    licenseType: 'permit',
    questions:   verified(ilDmvQuestions),
    passingScore: 0.80,  // 28 of 35 correct — Illinois SOS standard (80%)
  },
  'illinois-motorcycle': {
    testId:      'illinois-motorcycle',
    label:       'Illinois Secretary of State Motorcycle Practice Test',
    state:       'illinois',
    licenseType: 'motorcycle',
    questions:   verified(ilMotoQuestions),
    passingScore: 0.80,
  },
  'illinois-cdl-general': {
    testId:      'illinois-cdl-general',
    label:       'Illinois CDL General Knowledge Practice Test',
    state:       'illinois',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — FMCSA federal standard
  },

  // ── Pennsylvania ──────────────────────────────────────────────────────────
  'pennsylvania-permit': {
    testId:      'pennsylvania-permit',
    label:       'Pennsylvania PennDOT Permit Practice Test',
    state:       'pennsylvania',
    licenseType: 'permit',
    questions:   verified(paDmvQuestions),
    passingScore: 0.80,  // 32 of 40 correct — PennDOT standard (80%)
  },
  'pennsylvania-motorcycle': {
    testId:      'pennsylvania-motorcycle',
    label:       'Pennsylvania PennDOT Motorcycle Practice Test',
    state:       'pennsylvania',
    licenseType: 'motorcycle',
    questions:   verified(paMotoQuestions),
    passingScore: 0.80,
  },
  'pennsylvania-cdl-general': {
    testId:      'pennsylvania-cdl-general',
    label:       'Pennsylvania CDL General Knowledge Practice Test',
    state:       'pennsylvania',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — FMCSA federal standard
  },

  // ── New York ──────────────────────────────────────────────────────────────
  'new-york-permit': {
    testId:      'new-york-permit',
    label:       'New York DMV Permit Practice Test',
    state:       'new-york',
    licenseType: 'permit',
    questions:   verified(nyDmvQuestions),
    passingScore: 0.70,  // 14 of 20 — NY DMV standard (70%)
  },
  'new-york-motorcycle': {
    testId:      'new-york-motorcycle',
    label:       'New York DMV Motorcycle Practice Test',
    state:       'new-york',
    licenseType: 'motorcycle',
    questions:   verified(nyMotoQuestions),
    passingScore: 0.70,  // NY DMV standard (70%)
  },
  'new-york-cdl-general': {
    testId:      'new-york-cdl-general',
    label:       'New York CDL General Knowledge Practice Test',
    state:       'new-york',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — FMCSA standard
  },

  // ── Florida ───────────────────────────────────────────────────────────────
  'florida-permit': {
    testId:      'florida-permit',
    label:       'Florida DHSMV Permit Practice Test',
    state:       'florida',
    licenseType: 'permit',
    questions:   verified(flDmvQuestions),
    passingScore: 0.80,  // 40 of 50 correct — Florida DHSMV standard
  },
  'florida-motorcycle': {
    testId:      'florida-motorcycle',
    label:       'Florida DHSMV Motorcycle (Class E + M) Practice Test',
    state:       'florida',
    licenseType: 'motorcycle',
    questions:   verified(flMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — MSF/DHSMV standard
  },
  'florida-cdl-general': {
    testId:      'florida-cdl-general',
    label:       'Florida CDL General Knowledge Practice Test',
    state:       'florida',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — FMCSA federal standard
  },

  // ── Texas ─────────────────────────────────────────────────────────────────

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
  // ── California ─────────────────────────────────────────────────────────────
  {
    examId:        'california-permit-mock-1',
    label:         'California Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'california-permit',
    questionCount: 46,
    seed:          1,
    timeLimitSecs: 50 * 60,
    description:   'Simulates the real CA DMV permit test — 46 questions, 50 min.',
  },
  {
    examId:        'california-permit-mock-2',
    label:         'California Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'california-permit',
    questionCount: 46,
    seed:          2,
    timeLimitSecs: 50 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'california-permit-mock-3',
    label:         'California Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'california-permit',
    questionCount: 46,
    seed:          3,
    timeLimitSecs: 50 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── New York ────────────────────────────────────────────────────────────────
  {
    examId:        'new-york-permit-mock-1',
    label:         'New York DMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'new-york-permit',
    questionCount: 20,
    seed:          1,
    timeLimitSecs: 30 * 60,
    description:   'Simulates the real NY DMV permit test — 20 questions, 30 min.',
  },
  {
    examId:        'new-york-permit-mock-2',
    label:         'New York DMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'new-york-permit',
    questionCount: 20,
    seed:          2,
    timeLimitSecs: 30 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'new-york-permit-mock-3',
    label:         'New York DMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'new-york-permit',
    questionCount: 20,
    seed:          3,
    timeLimitSecs: 30 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Florida ────────────────────────────────────────────────────────────────
  {
    examId:        'florida-permit-mock-1',
    label:         'Florida DHSMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'florida-permit',
    questionCount: 50,
    seed:          1,
    timeLimitSecs: 60 * 60,
    description:   'Simulates the real Florida DHSMV permit test — 50 questions, 60 min.',
  },
  {
    examId:        'florida-permit-mock-2',
    label:         'Florida DHSMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'florida-permit',
    questionCount: 50,
    seed:          2,
    timeLimitSecs: 60 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'florida-permit-mock-3',
    label:         'Florida DHSMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'florida-permit',
    questionCount: 50,
    seed:          3,
    timeLimitSecs: 60 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Ohio ──────────────────────────────────────────────────────────────────
  {
    examId:        'ohio-permit-mock-1',
    label:         'Ohio BMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'ohio-permit',
    questionCount: 20,
    seed:          1,
    timeLimitSecs: 40 * 60,
    description:   'Simulates the real Ohio BMV permit test — 20 questions, 40 min.',
  },
  {
    examId:        'ohio-permit-mock-2',
    label:         'Ohio BMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'ohio-permit',
    questionCount: 20,
    seed:          2,
    timeLimitSecs: 40 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'ohio-permit-mock-3',
    label:         'Ohio BMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'ohio-permit',
    questionCount: 20,
    seed:          3,
    timeLimitSecs: 40 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Illinois ──────────────────────────────────────────────────────────────
  {
    examId:        'illinois-permit-mock-1',
    label:         'Illinois SOS Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'illinois-permit',
    questionCount: 35,
    seed:          1,
    timeLimitSecs: 60 * 60,
    description:   'Simulates the real Illinois SOS permit test — 35 questions, 60 min.',
  },
  {
    examId:        'illinois-permit-mock-2',
    label:         'Illinois SOS Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'illinois-permit',
    questionCount: 35,
    seed:          2,
    timeLimitSecs: 60 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'illinois-permit-mock-3',
    label:         'Illinois SOS Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'illinois-permit',
    questionCount: 35,
    seed:          3,
    timeLimitSecs: 60 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Pennsylvania ──────────────────────────────────────────────────────────
  {
    examId:        'pennsylvania-permit-mock-1',
    label:         'Pennsylvania PennDOT Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'pennsylvania-permit',
    questionCount: 40,
    seed:          1,
    timeLimitSecs: 60 * 60,
    description:   'Simulates the real PA PennDOT permit test — 40 questions, 60 min.',
  },
  {
    examId:        'pennsylvania-permit-mock-2',
    label:         'Pennsylvania PennDOT Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'pennsylvania-permit',
    questionCount: 40,
    seed:          2,
    timeLimitSecs: 60 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'pennsylvania-permit-mock-3',
    label:         'Pennsylvania PennDOT Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'pennsylvania-permit',
    questionCount: 40,
    seed:          3,
    timeLimitSecs: 60 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Texas ──────────────────────────────────────────────────────────────────
  {
    examId:        'texas-permit-mock-1',
    label:         'Texas DPS Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'texas-permit',
    questionCount: 30,
    seed:          1,
    timeLimitSecs: 45 * 60,
    description:   'Simulates the real Texas DPS permit test — 30 questions, 45 min.',
  },
  {
    examId:        'texas-permit-mock-2',
    label:         'Texas DPS Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'texas-permit',
    questionCount: 30,
    seed:          2,
    timeLimitSecs: 45 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'texas-permit-mock-3',
    label:         'Texas DPS Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'texas-permit',
    questionCount: 30,
    seed:          3,
    timeLimitSecs: 45 * 60,
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
