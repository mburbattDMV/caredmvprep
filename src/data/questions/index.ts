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
import gaDmvQuestions                from './dmv/georgia';
import gaMotoQuestions               from './motorcycle/georgia';
import ncDmvQuestions                from './dmv/north-carolina';
import ncMotoQuestions               from './motorcycle/north-carolina';
import arDmvQuestions                from './dmv/arkansas';
import arMotoQuestions               from './motorcycle/arkansas';
import azDmvQuestions                from './dmv/arizona';
import azMotoQuestions               from './motorcycle/arizona';
import miDmvQuestions                from './dmv/michigan';
import moDmvQuestions                from './dmv/missouri';
import moMotoQuestions               from './motorcycle/missouri';
import tnDmvQuestions                from './dmv/tennessee';
import vaDmvQuestions                from './dmv/virginia';
import vaMotoQuestions               from './motorcycle/virginia';
import waDmvQuestions                from './dmv/washington';
import njDmvQuestions                from './dmv/new-jersey';
import mdDmvQuestions                from './dmv/maryland';
import mdMotoQuestions               from './motorcycle/maryland';
import maDmvQuestions                from './dmv/massachusetts';
import maMotoQuestions               from './motorcycle/massachusetts';
import wiDmvQuestions                from './dmv/wisconsin';
import orDmvQuestions                from './dmv/oregon';
import orMotoQuestions               from './motorcycle/oregon';
import okDmvQuestions                from './dmv/oklahoma';
import ctDmvQuestions                from './dmv/connecticut';
import nvDmvQuestions                from './dmv/nevada';
import utDmvQuestions                from './dmv/utah';
import iaDmvQuestions                from './dmv/iowa';
import iaMotoQuestions               from './motorcycle/iowa';
import msDmvQuestions                from './dmv/mississippi';
import msMotoQuestions               from './motorcycle/mississippi';
import ksDmvQuestions                from './dmv/kansas';
import ksMotoQuestions               from './motorcycle/kansas';
import nmDmvQuestions                from './dmv/new-mexico';
import nmMotoQuestions               from './motorcycle/new-mexico';
import neDmvQuestions                from './dmv/nebraska';
import neMotoQuestions               from './motorcycle/nebraska';
import idDmvQuestions                from './dmv/idaho';
import idMotoQuestions               from './motorcycle/idaho';
import wvDmvQuestions                from './dmv/west-virginia';
import wvMotoQuestions               from './motorcycle/west-virginia';
import nhDmvQuestions                from './dmv/new-hampshire';
import nhMotoQuestions               from './motorcycle/new-hampshire';
import hiDmvQuestions                from './dmv/hawaii';
import hiMotoQuestions               from './motorcycle/hawaii';
import meDmvQuestions                from './dmv/maine';
import meMotoQuestions               from './motorcycle/maine';
import mtDmvQuestions                from './dmv/montana';
import mtMotoQuestions               from './motorcycle/montana';
import riDmvQuestions                from './dmv/rhode-island';
import riMotoQuestions               from './motorcycle/rhode-island';
import deDmvQuestions                from './dmv/delaware';
import deMotoQuestions               from './motorcycle/delaware';
import sdDmvQuestions                from './dmv/south-dakota';
import sdMotoQuestions               from './motorcycle/south-dakota';
import ndDmvQuestions                from './dmv/north-dakota';
import ndMotoQuestions               from './motorcycle/north-dakota';
import akDmvQuestions                from './dmv/alaska';
import akMotoQuestions               from './motorcycle/alaska';
import vtDmvQuestions                from './dmv/vermont';
import vtMotoQuestions               from './motorcycle/vermont';
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

  // ── Arkansas ──────────────────────────────────────────────────────────────
  // DL test: 25Q/20-correct/80% — high confidence but PDF could not be parsed; NEEDS_VERIFICATION.
  // Motorcycle test: same situation. Helmet law: under-21 only (Ark. Code §27-20-104).
  'ar-permit': {
    testId:      'ar-permit',
    label:       'Arkansas Driver License Knowledge Test Practice',
    state:       'arkansas',
    licenseType: 'permit',
    questions:   verified(arDmvQuestions),
    passingScore: 0.80,
  },
  'ar-motorcycle': {
    testId:      'ar-motorcycle',
    label:       'Arkansas Motorcycle Knowledge Test Practice',
    state:       'arkansas',
    licenseType: 'motorcycle',
    questions:   verified(arMotoQuestions),
    passingScore: 0.80,
  },
  'ar-cdl-general': {
    testId:      'ar-cdl-general',
    label:       'Arkansas CDL General Knowledge Practice Test',
    state:       'arkansas',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Arizona ───────────────────────────────────────────────────────────────
  'arizona-permit': {
    testId:      'arizona-permit',
    label:       'Arizona MVD Permit Practice Test',
    state:       'arizona',
    licenseType: 'permit',
    questions:   verified(azDmvQuestions),
    passingScore: 0.80,  // 24 of 30 — Arizona MVD standard (80%)
  },
  'arizona-motorcycle': {
    testId:      'arizona-motorcycle',
    label:       'Arizona MVD Motorcycle Practice Test',
    state:       'arizona',
    licenseType: 'motorcycle',
    questions:   verified(azMotoQuestions),
    passingScore: 0.80,
  },
  'arizona-cdl-general': {
    testId:      'arizona-cdl-general',
    label:       'Arizona CDL General Knowledge Practice Test',
    state:       'arizona',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── North Carolina ────────────────────────────────────────────────────────
  'north-carolina-permit': {
    testId:      'north-carolina-permit',
    label:       'North Carolina NCDMV Permit Practice Test',
    state:       'north-carolina',
    licenseType: 'permit',
    questions:   verified(ncDmvQuestions),
    passingScore: 0.80,  // 20 of 25 — NCDMV standard (80%)
  },
  'north-carolina-motorcycle': {
    testId:      'north-carolina-motorcycle',
    label:       'North Carolina NCDMV Motorcycle Practice Test',
    state:       'north-carolina',
    licenseType: 'motorcycle',
    questions:   verified(ncMotoQuestions),
    passingScore: 0.80,
  },
  'north-carolina-cdl-general': {
    testId:      'north-carolina-cdl-general',
    label:       'North Carolina CDL General Knowledge Practice Test',
    state:       'north-carolina',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Georgia ───────────────────────────────────────────────────────────────
  'georgia-permit': {
    testId:      'georgia-permit',
    label:       'Georgia DDS Permit Practice Test',
    state:       'georgia',
    licenseType: 'permit',
    questions:   verified(gaDmvQuestions),
    passingScore: 0.75,  // 15 of 20 — Georgia DDS standard (75%)
  },
  'georgia-motorcycle': {
    testId:      'georgia-motorcycle',
    label:       'Georgia DDS Motorcycle Practice Test',
    state:       'georgia',
    licenseType: 'motorcycle',
    questions:   verified(gaMotoQuestions),
    passingScore: 0.75,
  },
  'georgia-cdl-general': {
    testId:      'georgia-cdl-general',
    label:       'Georgia CDL General Knowledge Practice Test',
    state:       'georgia',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
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

  // ── Michigan ──────────────────────────────────────────────────────────────
  'michigan-permit': {
    testId:      'michigan-permit',
    label:       'Michigan SOS Permit Practice Test',
    state:       'michigan',
    licenseType: 'permit',
    questions:   verified(miDmvQuestions),
    passingScore: 0.80,  // 40 of 50 — Michigan SOS standard (80% per section)
  },
  'michigan-cdl-general': {
    testId:      'michigan-cdl-general',
    label:       'Michigan CDL General Knowledge Practice Test',
    state:       'michigan',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Missouri ──────────────────────────────────────────────────────────────
  'missouri-permit': {
    testId:      'missouri-permit',
    label:       'Missouri DOR Permit Practice Test',
    state:       'missouri',
    licenseType: 'permit',
    questions:   verified(moDmvQuestions),
    passingScore: 0.80,  // 20 of 25 — Missouri DOR standard (80%)
  },
  'missouri-motorcycle': {
    testId:      'missouri-motorcycle',
    label:       'Missouri DOR Motorcycle Practice Test',
    state:       'missouri',
    licenseType: 'motorcycle',
    questions:   verified(moMotoQuestions),
    passingScore: 0.80,
  },
  'missouri-cdl-general': {
    testId:      'missouri-cdl-general',
    label:       'Missouri CDL General Knowledge Practice Test',
    state:       'missouri',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Tennessee ─────────────────────────────────────────────────────────────
  'tennessee-permit': {
    testId:      'tennessee-permit',
    label:       'Tennessee DOSHS Permit Practice Test',
    state:       'tennessee',
    licenseType: 'permit',
    questions:   verified(tnDmvQuestions),
    passingScore: 0.80,  // 24 of 30 — Tennessee standard (80%)
  },
  'tennessee-cdl-general': {
    testId:      'tennessee-cdl-general',
    label:       'Tennessee CDL General Knowledge Practice Test',
    state:       'tennessee',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Virginia ──────────────────────────────────────────────────────────────
  'virginia-permit': {
    testId:      'virginia-permit',
    label:       'Virginia DMV Permit Practice Test',
    state:       'virginia',
    licenseType: 'permit',
    questions:   verified(vaDmvQuestions),
    passingScore: 0.80,  // 28 of 35 — Virginia DMV standard (80%)
  },
  'virginia-motorcycle': {
    testId:      'virginia-motorcycle',
    label:       'Virginia DMV Motorcycle Practice Test',
    state:       'virginia',
    licenseType: 'motorcycle',
    questions:   verified(vaMotoQuestions),
    passingScore: 0.80,
  },
  'virginia-cdl-general': {
    testId:      'virginia-cdl-general',
    label:       'Virginia CDL General Knowledge Practice Test',
    state:       'virginia',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Washington ────────────────────────────────────────────────────────────
  'washington-permit': {
    testId:      'washington-permit',
    label:       'Washington DOL Permit Practice Test',
    state:       'washington',
    licenseType: 'permit',
    questions:   verified(waDmvQuestions),
    passingScore: 0.80,  // 32 of 40 — Washington DOL standard (80%)
  },
  'washington-cdl-general': {
    testId:      'washington-cdl-general',
    label:       'Washington CDL General Knowledge Practice Test',
    state:       'washington',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── New Jersey ────────────────────────────────────────────────────────────
  // Motorcycle intentionally not wired — question count/passing score not published
  // by NJMVC; tracked in the motorcycle verification queue (see VERIFICATION.md).
  'new-jersey-permit': {
    testId:      'new-jersey-permit',
    label:       'New Jersey MVC Permit Practice Test',
    state:       'new-jersey',
    licenseType: 'permit',
    questions:   verified(njDmvQuestions),
    passingScore: 0.80,  // 40 of 50 — NJ MVC standard (80%), Driver Manual p.31
  },
  'new-jersey-cdl-general': {
    testId:      'new-jersey-cdl-general',
    label:       'New Jersey CDL General Knowledge Practice Test',
    state:       'new-jersey',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Maryland ──────────────────────────────────────────────────────────────
  'maryland-permit': {
    testId:      'maryland-permit',
    label:       'Maryland MVA Permit Practice Test',
    state:       'maryland',
    licenseType: 'permit',
    questions:   verified(mdDmvQuestions),
    passingScore: 0.88,  // 22 of 25 — MVA standard (88%), Driver's Manual Section 1.B
  },
  'maryland-motorcycle': {
    testId:      'maryland-motorcycle',
    label:       'Maryland MVA Motorcycle Practice Test',
    state:       'maryland',
    licenseType: 'motorcycle',
    questions:   verified(mdMotoQuestions),
    passingScore: 0.88,  // 22 of 25 — same 88% standard as the Class C test
  },
  'maryland-cdl-general': {
    testId:      'maryland-cdl-general',
    label:       'Maryland CDL General Knowledge Practice Test',
    state:       'maryland',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Massachusetts ─────────────────────────────────────────────────────────
  'massachusetts-permit': {
    testId:      'massachusetts-permit',
    label:       'Massachusetts RMV Permit Practice Test',
    state:       'massachusetts',
    licenseType: 'permit',
    questions:   verified(maDmvQuestions),
    passingScore: 0.72,  // 18 of 25 — RMV standard (72%), Driver's Manual "Learner's Permit Exam Procedures"
  },
  'massachusetts-motorcycle': {
    testId:      'massachusetts-motorcycle',
    label:       'Massachusetts RMV Motorcycle Practice Test',
    state:       'massachusetts',
    licenseType: 'motorcycle',
    questions:   verified(maMotoQuestions),
    passingScore: 0.72,  // 18 of 25 — same ATS system/standard as the Class D test
  },
  'massachusetts-cdl-general': {
    testId:      'massachusetts-cdl-general',
    label:       'Massachusetts CDL General Knowledge Practice Test',
    state:       'massachusetts',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Wisconsin ─────────────────────────────────────────────────────────────
  // Motorcycle intentionally not wired — question count/passing score not published
  // by WisDOT; tracked in the motorcycle verification queue (see VERIFICATION.md).
  // Wisconsin actually requires two separate official tests (15-Q Highway Signs Test
  // + 50-Q Knowledge Test, both 80%) — this bank covers both topic areas in one quiz.
  'wisconsin-permit': {
    testId:      'wisconsin-permit',
    label:       'Wisconsin DMV Permit Practice Test',
    state:       'wisconsin',
    licenseType: 'permit',
    questions:   verified(wiDmvQuestions),
    passingScore: 0.80,  // 40 of 50 (Knowledge Test) / 12 of 15 (Highway Signs Test) — both 80%, confirmed in the Motorists' Handbook
  },
  'wisconsin-cdl-general': {
    testId:      'wisconsin-cdl-general',
    label:       'Wisconsin CDL General Knowledge Practice Test',
    state:       'wisconsin',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Oregon ────────────────────────────────────────────────────────────────
  'oregon-permit': {
    testId:      'oregon-permit',
    label:       'Oregon DMV Permit Practice Test',
    state:       'oregon',
    licenseType: 'permit',
    questions:   verified(orDmvQuestions),
    passingScore: 0.80,  // 28 of 35 — confirmed verbatim in the 2026-2027 Oregon Driver Manual
  },
  'oregon-motorcycle': {
    testId:      'oregon-motorcycle',
    label:       'Oregon DMV Motorcycle Practice Test',
    state:       'oregon',
    licenseType: 'motorcycle',
    questions:   verified(orMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — passing threshold in the Motorcycle and Moped Manual, total pool confirmed on the official ODOT motorcycle endorsement page
  },
  'oregon-cdl-general': {
    testId:      'oregon-cdl-general',
    label:       'Oregon CDL General Knowledge Practice Test',
    state:       'oregon',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Oklahoma (DL + CDL only — motorcycle question count not officially verified) ──
  'oklahoma-permit': {
    testId:      'oklahoma-permit',
    label:       'Oklahoma Written Knowledge Test Practice',
    state:       'oklahoma',
    licenseType: 'permit',
    questions:   verified(okDmvQuestions),
    passingScore: 0.75,  // 15 of 20 — confirmed on the official Service Oklahoma written-test webpage
  },
  'oklahoma-cdl-general': {
    testId:      'oklahoma-cdl-general',
    label:       'Oklahoma CDL General Knowledge Practice Test',
    state:       'oklahoma',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Connecticut (DL + CDL only — motorcycle passing score not officially verified) ──
  'connecticut-permit': {
    testId:      'connecticut-permit',
    label:       'Connecticut DMV Permit Practice Test',
    state:       'connecticut',
    licenseType: 'permit',
    questions:   verified(ctDmvQuestions),
    passingScore: 0.80,  // 20 of 25 — confirmed verbatim in the Connecticut Driver's Manual
  },
  'connecticut-cdl-general': {
    testId:      'connecticut-cdl-general',
    label:       'Connecticut CDL General Knowledge Practice Test',
    state:       'connecticut',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Nevada (DL + CDL only — motorcycle passing score not officially verified) ──
  'nevada-permit': {
    testId:      'nevada-permit',
    label:       'Nevada DMV Knowledge Test Practice',
    state:       'nevada',
    licenseType: 'permit',
    questions:   verified(nvDmvQuestions),
    passingScore: 0.80,  // 20 of 25 (adaptive: stops at 20 correct or 6 incorrect) — confirmed on the official Nevada DMV testing webpage
  },
  'nevada-cdl-general': {
    testId:      'nevada-cdl-general',
    label:       'Nevada CDL General Knowledge Practice Test',
    state:       'nevada',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Iowa ──────────────────────────────────────────────────────────────────
  // Motorcycle question count not officially published by Iowa DOT; knowledge test still required.
  'iowa-permit': {
    testId:      'iowa-permit',
    label:       'Iowa DOT Driver Knowledge Test Practice',
    state:       'iowa',
    licenseType: 'permit',
    questions:   verified(iaDmvQuestions),
    passingScore: 0.80,  // 80% — confirmed in Iowa Driver's Manual MM1170
  },
  'iowa-motorcycle': {
    testId:      'iowa-motorcycle',
    label:       'Iowa DOT Motorcycle Knowledge Test Practice',
    state:       'iowa',
    licenseType: 'motorcycle',
    questions:   verified(iaMotoQuestions),
    passingScore: 0.80,  // 80% expected; motorcycle test question count not officially confirmed
  },
  'iowa-cdl-general': {
    testId:      'iowa-cdl-general',
    label:       'Iowa CDL General Knowledge Practice Test',
    state:       'iowa',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Mississippi ───────────────────────────────────────────────────────────────
  // DL test: 30Q/24-correct/80% — UNVERIFIED; not stated in the December 2024 manual.
  // Motorcycle test: 25Q/20-correct/80% — UNVERIFIED; not stated in official source.
  // Helmet law: all ages required (Miss. Code Ann. § 63-7-64); parade exception for 18+ at ≤30 mph.
  'mississippi-permit': {
    testId:      'mississippi-permit',
    label:       'Mississippi Driver Knowledge Test Practice',
    state:       'mississippi',
    licenseType: 'permit',
    questions:   verified(msDmvQuestions),
    passingScore: 0.80,  // 24 of 30 — UNVERIFIED; not stated in the manual
  },
  'mississippi-motorcycle': {
    testId:      'mississippi-motorcycle',
    label:       'Mississippi Motorcycle Knowledge Test Practice',
    state:       'mississippi',
    licenseType: 'motorcycle',
    questions:   verified(msMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — UNVERIFIED; not stated in official source
  },
  'mississippi-cdl-general': {
    testId:      'mississippi-cdl-general',
    label:       'Mississippi CDL General Knowledge Practice Test',
    state:       'mississippi',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Kansas ────────────────────────────────────────────────────────────────────
  // DL test: 25Q/20-correct/80% — LIKELY accurate (not confirmed from official DL page directly).
  // Motorcycle test: 25Q/20-correct/80%.
  // Helmet law: under-18 only (KSA 8-1598). Eye protection required for all riders.
  'kansas-permit': {
    testId:      'kansas-permit',
    label:       'Kansas Driver Knowledge Test Practice',
    state:       'kansas',
    licenseType: 'permit',
    questions:   verified(ksDmvQuestions),
    passingScore: 0.80,
  },
  'kansas-motorcycle': {
    testId:      'kansas-motorcycle',
    label:       'Kansas Motorcycle Knowledge Test Practice',
    state:       'kansas',
    licenseType: 'motorcycle',
    questions:   verified(ksMotoQuestions),
    passingScore: 0.80,
  },
  'kansas-cdl-general': {
    testId:      'kansas-cdl-general',
    label:       'Kansas CDL General Knowledge Practice Test',
    state:       'kansas',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── New Mexico ────────────────────────────────────────────────────────────────
  // DL test: 25Q/20-correct/80% — standard NM MVD knowledge test.
  // Motorcycle test: 40Q/32-correct/80% — NM MVD motorcycle endorsement standard.
  // Helmet law: under-18 only. Lane splitting illegal. MSF BRC waives both tests.
  'new-mexico-permit': {
    testId:      'new-mexico-permit',
    label:       'New Mexico MVD Permit Practice Test',
    state:       'new-mexico',
    licenseType: 'permit',
    questions:   verified(nmDmvQuestions),
    passingScore: 0.80,
  },
  'new-mexico-motorcycle': {
    testId:      'new-mexico-motorcycle',
    label:       'New Mexico MVD Motorcycle Endorsement Practice Test',
    state:       'new-mexico',
    licenseType: 'motorcycle',
    questions:   verified(nmMotoQuestions),
    passingScore: 0.80,
  },
  'new-mexico-cdl-general': {
    testId:      'new-mexico-cdl-general',
    label:       'New Mexico CDL General Knowledge Practice Test',
    state:       'new-mexico',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── Nebraska ──────────────────────────────────────────────────────────────────
  // DL test: 25Q/20-correct/80% — strong third-party consensus (not officially confirmed from DMV page)
  // Motorcycle test: 25Q/20-correct/80% — same
  // Helmet law: under-21 always required; 21+ may waive with MSF course (bifurcated by May 1, 2024)
  // Lane splitting: illegal (NRS 60-6,308). Eye protection: required all riders all ages.
  'nebraska-permit': {
    testId:      'nebraska-permit',
    label:       'Nebraska DMV Driver Knowledge Test Practice',
    state:       'nebraska',
    licenseType: 'permit',
    questions:   verified(neDmvQuestions),
    passingScore: 0.80,  // 20 of 25 — strong third-party consensus; not officially confirmed from DMV page
  },
  'nebraska-motorcycle': {
    testId:      'nebraska-motorcycle',
    label:       'Nebraska DMV Motorcycle Knowledge Test Practice',
    state:       'nebraska',
    licenseType: 'motorcycle',
    questions:   verified(neMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — same consensus as DL test; not officially confirmed
  },
  'nebraska-cdl-general': {
    testId:      'nebraska-cdl-general',
    label:       'Nebraska CDL General Knowledge Practice Test',
    state:       'nebraska',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Idaho ─────────────────────────────────────────────────────────────────────
  // DL test: 40 questions / 34 correct / 85% — Idaho Transportation Department (ITD)
  // Motorcycle test: 25 questions / 20 correct / 80%
  // Helmet law: under-18 only (§ 49-666). Lane splitting/filtering: both illegal.
  // MSF/STAR course waives skills test only — knowledge test always required.
  // Permit minimum age: 14½ (one of youngest in US).
  'idaho-permit': {
    testId:      'idaho-permit',
    label:       'Idaho ITD Driver Knowledge Test Practice',
    state:       'idaho',
    licenseType: 'permit',
    questions:   verified(idDmvQuestions),
    passingScore: 0.85,  // 34 of 40 — Idaho Transportation Department (ITD) standard (85%)
  },
  'idaho-motorcycle': {
    testId:      'idaho-motorcycle',
    label:       'Idaho ITD Motorcycle Knowledge Test Practice',
    state:       'idaho',
    licenseType: 'motorcycle',
    questions:   verified(idMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — ITD motorcycle endorsement standard (80%)
  },
  'idaho-cdl-general': {
    testId:      'idaho-cdl-general',
    label:       'Idaho CDL General Knowledge Practice Test',
    state:       'idaho',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Utah (DL + CDL only — motorcycle passing score not officially confirmed) ──
  // 50Q/40-correct/80% confirmed on dld.utah.gov/written-knowledge-test/ + Driver Handbook Rev 3.2026, Section 6.A, p.22.
  // Motorcycle: 25Q confirmed but passing score/number-correct not stated on official motorcycle pages — queued per VERIFICATION.md.
  'utah-permit': {
    testId:      'utah-permit',
    label:       'Utah DLD Knowledge Test Practice',
    state:       'utah',
    licenseType: 'permit',
    questions:   verified(utDmvQuestions),
    passingScore: 0.80,  // 40 of 50 — confirmed on dld.utah.gov/written-knowledge-test/ + Driver Handbook Rev 3.2026, Section 6.A, p.22
  },
  'utah-cdl-general': {
    testId:      'utah-cdl-general',
    label:       'Utah CDL General Knowledge Practice Test',
    state:       'utah',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,
  },

  // ── West Virginia ─────────────────────────────────────────────────────────
  // DL test: 25Q / 19-correct / 76% — WV DMV standard; universal helmet law (all ages).
  // Motorcycle: 25Q / 20-correct / 80%. Aggravated DUI: 0.15% BAC.
  // GDL curfew: 5 a.m.–10 p.m. for BOTH Level 1 and Level 2. School zone: 15 mph.
  'west-virginia-permit': {
    testId:      'west-virginia-permit',
    label:       'West Virginia DMV Driver Knowledge Test Practice',
    state:       'west-virginia',
    licenseType: 'permit',
    questions:   verified(wvDmvQuestions),
    passingScore: 0.76,  // 19 of 25 — WV DMV standard
  },
  'west-virginia-motorcycle': {
    testId:      'west-virginia-motorcycle',
    label:       'West Virginia Motorcycle Knowledge Test Practice',
    state:       'west-virginia',
    licenseType: 'motorcycle',
    questions:   verified(wvMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — WV DMV standard
  },
  'west-virginia-cdl-general': {
    testId:      'west-virginia-cdl-general',
    label:       'West Virginia CDL General Knowledge Practice Test',
    state:       'west-virginia',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── New Hampshire ─────────────────────────────────────────────────────────
  // DL test: 40Q / 32-correct / 80% — NEEDS_VERIFICATION (DMV site blocked; widely reported)
  // Motorcycle: 25Q / 20-correct / 80% — NEEDS_VERIFICATION
  // No adult seat belt law (RSA 265:107-a). No adult helmet requirement (RSA 265:122).
  // Youth Operator curfew: 1 a.m.–4 a.m. Aggravated DWI: 0.16%. MSF waives BOTH tests.
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — needs_review status
  'new-hampshire-permit': {
    testId:      'new-hampshire-permit',
    label:       'New Hampshire DMV Driver Knowledge Test Practice',
    state:       'new-hampshire',
    licenseType: 'permit',
    questions:   verified(nhDmvQuestions),
    passingScore: 0.80,  // 32 of 40 — NEEDS_VERIFICATION; widely reported, DMV site blocked
  },
  'new-hampshire-motorcycle': {
    testId:      'new-hampshire-motorcycle',
    label:       'New Hampshire Motorcycle Knowledge Test Practice',
    state:       'new-hampshire',
    licenseType: 'motorcycle',
    questions:   verified(nhMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — NEEDS_VERIFICATION; widely reported
  },
  'new-hampshire-cdl-general': {
    testId:      'new-hampshire-cdl-general',
    label:       'New Hampshire CDL General Knowledge Practice Test',
    state:       'new-hampshire',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Maine ─────────────────────────────────────────────────────────────────
  // DL test: 30Q / 24-correct / 80% — Maine BMV
  // Motorcycle: 25Q / 20-correct / 80% — NEEDS_VERIFICATION
  // Permit minimum age: 15; OUI terminology; aggravated OUI at 0.15%+
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — queued, not activated
  'maine-permit': {
    testId:      'maine-permit',
    label:       'Maine DMV Practice Test',
    state:       'ME',
    licenseType: 'permit',
    questions:   verified(meDmvQuestions),
    passingScore: 0.80,  // 24 of 30 — Maine BMV standard (80%)
  },
  'maine-motorcycle': {
    testId:      'maine-motorcycle',
    label:       'Maine Motorcycle Practice Test',
    state:       'ME',
    licenseType: 'motorcycle',
    questions:   verified(meMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — NEEDS_VERIFICATION
  },
  'maine-cdl-general': {
    testId:      'maine-cdl-general',
    label:       'Maine CDL Practice Test',
    state:       'ME',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Montana ───────────────────────────────────────────────────────────────
  // DL test: 33Q / 27-correct / 82% — NEEDS_VERIFICATION; not confirmed from official DOJ source
  // Motorcycle: 25Q / 20-correct / 80% — NEEDS_VERIFICATION
  // Helmet law: under-18 only (MCA 61-9-417). Lane filtering legal (MCA 61-8-392).
  // MSF course waives skills test only; knowledge test still required.
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — queued, not activated
  'montana-permit': {
    testId:      'montana-permit',
    label:       'Montana DMV Practice Test',
    state:       'MT',
    licenseType: 'permit',
    questions:   verified(mtDmvQuestions),
    passingScore: 0.80,  // NEEDS_VERIFICATION — 27 of 33 would be ~82%; using 80% pending confirmation
  },
  'montana-motorcycle': {
    testId:      'montana-motorcycle',
    label:       'Montana Motorcycle Practice Test',
    state:       'MT',
    licenseType: 'motorcycle',
    questions:   verified(mtMotoQuestions),
    passingScore: 0.80,  // NEEDS_VERIFICATION — 20 of 25 assumed
  },
  'montana-cdl-general': {
    testId:      'montana-cdl-general',
    label:       'Montana CDL Practice Test',
    state:       'MT',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Hawaii ────────────────────────────────────────────────────────────────
  // DL test: 30Q / 24-correct / 80% — Hawaii DOT / KnowToDrive
  // Motorcycle: 25Q / 20-correct / 80%
  // Permit minimum age: 15½; OVUII (not DUI); max speed 60 mph (lowest in US)
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — needs_review status
  'hawaii-permit': {
    testId:      'hawaii-permit',
    label:       'Hawaii Driver Knowledge Test Practice',
    state:       'hawaii',
    licenseType: 'permit',
    questions:   verified(hiDmvQuestions),
    passingScore: 0.80,  // 24 of 30 — Hawaii DOT standard
  },
  'hawaii-motorcycle': {
    testId:      'hawaii-motorcycle',
    label:       'Hawaii Motorcycle Knowledge Test Practice',
    state:       'hawaii',
    licenseType: 'motorcycle',
    questions:   verified(hiMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — Hawaii DOT standard
  },
  'hawaii-cdl-general': {
    testId:      'hawaii-cdl-general',
    label:       'Hawaii CDL General Knowledge Practice Test',
    state:       'hawaii',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Rhode Island ──────────────────────────────────────────────────────────
  // DL test: 40Q (VERIFIED from dmv.ri.gov); passing score NEEDS_VERIFICATION (third-party: 28/40 = 70%)
  // Motorcycle test: question count and passing score NEEDS_VERIFICATION
  // Helmet law: under-21 AND first-year riders of any age (§ 31-10.1-4)
  // Lane splitting: ILLEGAL (pilot H 5658 expired January 31, 2026)
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — queued, not activated
  'rhode-island-permit': {
    testId:      'rhode-island-permit',
    label:       'Rhode Island DMV Practice Test',
    state:       'RI',
    licenseType: 'permit',
    questions:   verified(riDmvQuestions),
    passingScore: 0.80,  // NEEDS_VERIFICATION — 28/40 = 70% also reported; using 80% pending confirmation
  },
  'rhode-island-motorcycle': {
    testId:      'rhode-island-motorcycle',
    label:       'Rhode Island Motorcycle Practice Test',
    state:       'RI',
    licenseType: 'motorcycle',
    questions:   verified(riMotoQuestions),
    passingScore: 0.80,  // NEEDS_VERIFICATION
  },
  'rhode-island-cdl-general': {
    testId:      'rhode-island-cdl-general',
    label:       'Rhode Island CDL Practice Test',
    state:       'RI',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Delaware ──────────────────────────────────────────────────────────────
  // DL test: 32Q / 26-correct / 81% — from official written license page (NEEDS_VERIFICATION for exact count).
  // Motorcycle: 25Q / 20-correct / 80% — NEEDS_VERIFICATION.
  // Helmet law: under-19 AND newly-endorsed riders first 2 years (§ 4185, amended July 30, 2023).
  // Lane splitting not authorized. Seat belt: PRIMARY enforcement, $25 civil penalty.
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — queued, not activated.
  'delaware-permit': {
    testId:      'delaware-permit',
    label:       'Delaware DMV Practice Test',
    state:       'DE',
    licenseType: 'permit',
    questions:   verified(deDmvQuestions),
    passingScore: 0.80,  // NEEDS_VERIFICATION — 26/32 = 81% per official page; using 0.80 pending confirmation
  },
  'delaware-motorcycle': {
    testId:      'delaware-motorcycle',
    label:       'Delaware Motorcycle Practice Test',
    state:       'DE',
    licenseType: 'motorcycle',
    questions:   verified(deMotoQuestions),
    passingScore: 0.80,  // NEEDS_VERIFICATION — 20/25 = 80% assumed
  },
  'delaware-cdl-general': {
    testId:      'delaware-cdl-general',
    label:       'Delaware CDL Practice Test',
    state:       'DE',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── South Dakota ──────────────────────────────────────────────────────────────
  // DL test: 25Q / 20-correct / 80% — NEEDS_VERIFICATION (official DPS site not accessible)
  // Motorcycle: 25Q / 20-correct / 80% — NEEDS_VERIFICATION
  // Permit min age: 14 — one of youngest in US. Helmet law: under-18 only (§ 32-20-4).
  // Eye protection: required all riders unless windscreen (§ 32-20-4.1).
  // Lane splitting: illegal. MSF BRC waives BOTH knowledge and skills tests.
  // DUI: adult 0.08%; under-21 0.02%; enhanced at 0.17% BAC.
  // Implied consent refusal: 1st = 1 year; 2nd = 2 years revocation.
  // Interstate speed: 80 mph (one of highest in US). School zone: 15 mph.
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — needs_review status.
  'south-dakota-permit': {
    testId:      'south-dakota-permit',
    label:       'South Dakota DPS Driver Knowledge Test Practice',
    state:       'SD',
    licenseType: 'permit',
    questions:   verified(sdDmvQuestions),
    passingScore: 0.80,  // 20 of 25 — NEEDS_VERIFICATION; widely reported, DPS site not accessible
  },
  'south-dakota-motorcycle': {
    testId:      'south-dakota-motorcycle',
    label:       'South Dakota DPS Motorcycle Knowledge Test Practice',
    state:       'SD',
    licenseType: 'motorcycle',
    questions:   verified(sdMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — NEEDS_VERIFICATION; widely reported
  },
  'south-dakota-cdl-general': {
    testId:      'south-dakota-cdl-general',
    label:       'South Dakota CDL General Knowledge Practice Test',
    state:       'SD',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── North Dakota ──────────────────────────────────────────────────────────
  'north-dakota-permit': {
    testId:      'north-dakota-permit',
    label:       'North Dakota DOT Driver Knowledge Test Practice',
    state:       'ND',
    licenseType: 'permit',
    questions:   verified(ndDmvQuestions),
    passingScore: 0.80,  // 20 of 25 correct — NDCC § 39-06-04; widely confirmed
  },
  'north-dakota-motorcycle': {
    testId:      'north-dakota-motorcycle',
    label:       'North Dakota DOT Motorcycle Knowledge Test Practice',
    state:       'ND',
    licenseType: 'motorcycle',
    questions:   verified(ndMotoQuestions),
    passingScore: 0.80,  // 20 of 25 correct — NDCC § 39-16-01; widely confirmed
  },
  'north-dakota-cdl-general': {
    testId:      'north-dakota-cdl-general',
    label:       'North Dakota CDL General Knowledge Practice Test',
    state:       'ND',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Alaska ────────────────────────────────────────────────────────────────
  // DL test: 20Q / 16-correct / 80% — dmv.alaska.gov (state-facts confirmed)
  // Motorcycle: 25Q / 20-correct / 80% — dmv.alaska.gov (state-facts confirmed)
  // Helmet law: all-ages universal (AS § 28.35.240). Lane splitting: ILLEGAL.
  // Permit min age: 14 (AS § 28.15.057). Online testing: ak.knowtodrive.com.
  // MSF BRC waives skills test only; knowledge test still required.
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — needs_review status.
  'alaska-permit': {
    testId:      'alaska-permit',
    label:       'Alaska DMV Practice Test',
    state:       'AK',
    licenseType: 'permit',
    questions:   verified(akDmvQuestions),
    passingScore: 0.80,  // 16 of 20 — Alaska DMV standard (80%), confirmed dmv.alaska.gov
  },
  'alaska-motorcycle': {
    testId:      'alaska-motorcycle',
    label:       'Alaska Motorcycle Practice Test',
    state:       'AK',
    licenseType: 'motorcycle',
    questions:   verified(akMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — Alaska DMV standard (80%), confirmed dmv.alaska.gov
  },
  'alaska-cdl-general': {
    testId:      'alaska-cdl-general',
    label:       'Alaska CDL General Knowledge Practice Test',
    state:       'AK',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
  },

  // ── Vermont ───────────────────────────────────────────────────────────────
  // DL test: 20Q / 16-correct / 80% — state-facts.ts (online test confirmed)
  // Motorcycle: 25Q / 20-correct / 80% — state-facts.ts confirmed
  // Helmet law: all-ages universal (23 VSA § 1182). Lane splitting: ILLEGAL.
  // Permit min age: 15. GDL: 1-year hold; 40 supervised hrs (10 night).
  // MSF BRC waives BOTH knowledge and skills tests — state-facts.ts notes.
  // OUI terminology (23 VSA § 1201); adult 0.08%; under-21 0.02%.
  // Vermont-distinctive: no roadside billboards; covered bridge weight limits;
  //   frost heaves; Appalachian Gap 18%+ grades; moose hazard; foliage season.
  // NOT in LIVE_STATE_SLUGS or LIVE_STATE_ABBRS — needs_review status.
  'vermont-permit': {
    testId:      'vermont-permit',
    label:       'Vermont DMV Practice Test',
    state:       'VT',
    licenseType: 'permit',
    questions:   verified(vtDmvQuestions),
    passingScore: 0.80,  // 16 of 20 — Vermont DMV standard (80%), confirmed state-facts.ts
  },
  'vermont-motorcycle': {
    testId:      'vermont-motorcycle',
    label:       'Vermont Motorcycle Practice Test',
    state:       'VT',
    licenseType: 'motorcycle',
    questions:   verified(vtMotoQuestions),
    passingScore: 0.80,  // 20 of 25 — Vermont DMV standard (80%), confirmed state-facts.ts
  },
  'vermont-cdl-general': {
    testId:      'vermont-cdl-general',
    label:       'Vermont CDL General Knowledge Practice Test',
    state:       'VT',
    licenseType: 'cdl_general',
    questions:   verified(cdlFederalQuestions),
    passingScore: 0.80,  // 40 of 50 — federal FMCSA standard
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
  // ── Arizona ───────────────────────────────────────────────────────────────
  {
    examId:        'arizona-permit-mock-1',
    label:         'Arizona MVD Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'arizona-permit',
    questionCount: 30,
    seed:          1,
    timeLimitSecs: 45 * 60,
    description:   'Simulates the real Arizona MVD permit test — 30 questions, 45 min.',
  },
  {
    examId:        'arizona-permit-mock-2',
    label:         'Arizona MVD Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'arizona-permit',
    questionCount: 30,
    seed:          2,
    timeLimitSecs: 45 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'arizona-permit-mock-3',
    label:         'Arizona MVD Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'arizona-permit',
    questionCount: 30,
    seed:          3,
    timeLimitSecs: 45 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── North Carolina ────────────────────────────────────────────────────────
  {
    examId:        'north-carolina-permit-mock-1',
    label:         'North Carolina NCDMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'north-carolina-permit',
    questionCount: 25,
    seed:          1,
    timeLimitSecs: 40 * 60,
    description:   'Simulates the real NC NCDMV permit test — 25 questions, 40 min.',
  },
  {
    examId:        'north-carolina-permit-mock-2',
    label:         'North Carolina NCDMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'north-carolina-permit',
    questionCount: 25,
    seed:          2,
    timeLimitSecs: 40 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'north-carolina-permit-mock-3',
    label:         'North Carolina NCDMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'north-carolina-permit',
    questionCount: 25,
    seed:          3,
    timeLimitSecs: 40 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Georgia ───────────────────────────────────────────────────────────────
  {
    examId:        'georgia-permit-mock-1',
    label:         'Georgia DDS Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'georgia-permit',
    questionCount: 20,
    seed:          1,
    timeLimitSecs: 40 * 60,
    description:   'Simulates the real Georgia DDS permit test — 20 questions, 40 min.',
  },
  {
    examId:        'georgia-permit-mock-2',
    label:         'Georgia DDS Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'georgia-permit',
    questionCount: 20,
    seed:          2,
    timeLimitSecs: 40 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'georgia-permit-mock-3',
    label:         'Georgia DDS Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'georgia-permit',
    questionCount: 20,
    seed:          3,
    timeLimitSecs: 40 * 60,
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
  // ── Michigan ──────────────────────────────────────────────────────────────
  {
    examId:        'michigan-permit-mock-1',
    label:         'Michigan SOS Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'michigan-permit',
    questionCount: 50,
    seed:          1,
    timeLimitSecs: 60 * 60,
    description:   'Simulates the real Michigan SOS permit test — 50 questions, 60 min.',
  },
  {
    examId:        'michigan-permit-mock-2',
    label:         'Michigan SOS Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'michigan-permit',
    questionCount: 50,
    seed:          2,
    timeLimitSecs: 60 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'michigan-permit-mock-3',
    label:         'Michigan SOS Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'michigan-permit',
    questionCount: 50,
    seed:          3,
    timeLimitSecs: 60 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Missouri ──────────────────────────────────────────────────────────────
  {
    examId:        'missouri-permit-mock-1',
    label:         'Missouri DOR Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'missouri-permit',
    questionCount: 25,
    seed:          1,
    timeLimitSecs: 40 * 60,
    description:   'Simulates the real Missouri DOR permit test — 25 questions, 40 min.',
  },
  {
    examId:        'missouri-permit-mock-2',
    label:         'Missouri DOR Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'missouri-permit',
    questionCount: 25,
    seed:          2,
    timeLimitSecs: 40 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'missouri-permit-mock-3',
    label:         'Missouri DOR Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'missouri-permit',
    questionCount: 25,
    seed:          3,
    timeLimitSecs: 40 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Tennessee ─────────────────────────────────────────────────────────────
  {
    examId:        'tennessee-permit-mock-1',
    label:         'Tennessee DOSHS Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'tennessee-permit',
    questionCount: 30,
    seed:          1,
    timeLimitSecs: 45 * 60,
    description:   'Simulates the real Tennessee permit test — 30 questions, 45 min.',
  },
  {
    examId:        'tennessee-permit-mock-2',
    label:         'Tennessee DOSHS Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'tennessee-permit',
    questionCount: 30,
    seed:          2,
    timeLimitSecs: 45 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'tennessee-permit-mock-3',
    label:         'Tennessee DOSHS Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'tennessee-permit',
    questionCount: 30,
    seed:          3,
    timeLimitSecs: 45 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Virginia ──────────────────────────────────────────────────────────────
  {
    examId:        'virginia-permit-mock-1',
    label:         'Virginia DMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'virginia-permit',
    questionCount: 35,
    seed:          1,
    timeLimitSecs: 60 * 60,
    description:   'Simulates the real Virginia DMV permit test — 35 questions, 60 min.',
  },
  {
    examId:        'virginia-permit-mock-2',
    label:         'Virginia DMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'virginia-permit',
    questionCount: 35,
    seed:          2,
    timeLimitSecs: 60 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'virginia-permit-mock-3',
    label:         'Virginia DMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'virginia-permit',
    questionCount: 35,
    seed:          3,
    timeLimitSecs: 60 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Washington ────────────────────────────────────────────────────────────
  {
    examId:        'washington-permit-mock-1',
    label:         'Washington DOL Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'washington-permit',
    questionCount: 40,
    seed:          1,
    timeLimitSecs: 60 * 60,
    description:   'Simulates the real Washington DOL permit test — 40 questions, 60 min.',
  },
  {
    examId:        'washington-permit-mock-2',
    label:         'Washington DOL Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'washington-permit',
    questionCount: 40,
    seed:          2,
    timeLimitSecs: 60 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'washington-permit-mock-3',
    label:         'Washington DOL Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'washington-permit',
    questionCount: 40,
    seed:          3,
    timeLimitSecs: 60 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── New Jersey ────────────────────────────────────────────────────────────
  {
    examId:        'new-jersey-permit-mock-1',
    label:         'New Jersey MVC Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'new-jersey-permit',
    questionCount: 50,
    seed:          1,
    timeLimitSecs: 60 * 60,
    description:   'Simulates the real NJ MVC permit test — 50 questions, untimed knowledge test modeled at 60 min.',
  },
  {
    examId:        'new-jersey-permit-mock-2',
    label:         'New Jersey MVC Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'new-jersey-permit',
    questionCount: 50,
    seed:          2,
    timeLimitSecs: 60 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'new-jersey-permit-mock-3',
    label:         'New Jersey MVC Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'new-jersey-permit',
    questionCount: 50,
    seed:          3,
    timeLimitSecs: 60 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Maryland ──────────────────────────────────────────────────────────────
  {
    examId:        'maryland-permit-mock-1',
    label:         'Maryland MVA Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'maryland-permit',
    questionCount: 25,
    seed:          1,
    timeLimitSecs: 20 * 60,
    description:   'Simulates the real Maryland MVA permit test — 25 questions, 20 min.',
  },
  {
    examId:        'maryland-permit-mock-2',
    label:         'Maryland MVA Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'maryland-permit',
    questionCount: 25,
    seed:          2,
    timeLimitSecs: 20 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'maryland-permit-mock-3',
    label:         'Maryland MVA Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'maryland-permit',
    questionCount: 25,
    seed:          3,
    timeLimitSecs: 20 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Massachusetts ─────────────────────────────────────────────────────────
  {
    examId:        'massachusetts-permit-mock-1',
    label:         'Massachusetts RMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'massachusetts-permit',
    questionCount: 25,
    seed:          1,
    timeLimitSecs: 25 * 60,
    description:   'Simulates the real Massachusetts RMV permit test — 25 questions, 25 min.',
  },
  {
    examId:        'massachusetts-permit-mock-2',
    label:         'Massachusetts RMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'massachusetts-permit',
    questionCount: 25,
    seed:          2,
    timeLimitSecs: 25 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'massachusetts-permit-mock-3',
    label:         'Massachusetts RMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'massachusetts-permit',
    questionCount: 25,
    seed:          3,
    timeLimitSecs: 25 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Wisconsin ─────────────────────────────────────────────────────────────
  {
    examId:        'wisconsin-permit-mock-1',
    label:         'Wisconsin DMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'wisconsin-permit',
    questionCount: 50,
    seed:          1,
    timeLimitSecs: 45 * 60,
    description:   'Simulates the real Wisconsin Knowledge Test — 50 questions, 45 min.',
  },
  {
    examId:        'wisconsin-permit-mock-2',
    label:         'Wisconsin DMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'wisconsin-permit',
    questionCount: 50,
    seed:          2,
    timeLimitSecs: 45 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'wisconsin-permit-mock-3',
    label:         'Wisconsin DMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'wisconsin-permit',
    questionCount: 50,
    seed:          3,
    timeLimitSecs: 45 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Oregon ────────────────────────────────────────────────────────────────
  {
    examId:        'oregon-permit-mock-1',
    label:         'Oregon DMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'oregon-permit',
    questionCount: 35,
    seed:          1,
    timeLimitSecs: 30 * 60,
    description:   'Simulates the real Oregon DMV knowledge test — 35 questions, 30 min.',
  },
  {
    examId:        'oregon-permit-mock-2',
    label:         'Oregon DMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'oregon-permit',
    questionCount: 35,
    seed:          2,
    timeLimitSecs: 30 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'oregon-permit-mock-3',
    label:         'Oregon DMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'oregon-permit',
    questionCount: 35,
    seed:          3,
    timeLimitSecs: 30 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Oklahoma ──────────────────────────────────────────────────────────────
  {
    examId:        'oklahoma-permit-mock-1',
    label:         'Oklahoma Written Knowledge Test Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'oklahoma-permit',
    questionCount: 20,
    seed:          1,
    timeLimitSecs: 60 * 60,
    description:   'Simulates the real Oklahoma written test — 20 questions, 60 min.',
  },
  {
    examId:        'oklahoma-permit-mock-2',
    label:         'Oklahoma Written Knowledge Test Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'oklahoma-permit',
    questionCount: 20,
    seed:          2,
    timeLimitSecs: 60 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'oklahoma-permit-mock-3',
    label:         'Oklahoma Written Knowledge Test Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'oklahoma-permit',
    questionCount: 20,
    seed:          3,
    timeLimitSecs: 60 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Connecticut ───────────────────────────────────────────────────────────
  {
    examId:        'connecticut-permit-mock-1',
    label:         'Connecticut DMV Permit Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'connecticut-permit',
    questionCount: 25,
    seed:          1,
    timeLimitSecs: 25 * 60,
    description:   'Simulates the real Connecticut DMV knowledge test — 25 questions, 25 min.',
  },
  {
    examId:        'connecticut-permit-mock-2',
    label:         'Connecticut DMV Permit Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'connecticut-permit',
    questionCount: 25,
    seed:          2,
    timeLimitSecs: 25 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'connecticut-permit-mock-3',
    label:         'Connecticut DMV Permit Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'connecticut-permit',
    questionCount: 25,
    seed:          3,
    timeLimitSecs: 25 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },
  // ── Nevada ────────────────────────────────────────────────────────────────
  {
    examId:        'nevada-permit-mock-1',
    label:         'Nevada DMV Knowledge Test Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'nevada-permit',
    questionCount: 25,
    seed:          1,
    timeLimitSecs: 30 * 60,
    description:   'Simulates the real Nevada DMV knowledge test — 25 questions, 30 min.',
  },
  {
    examId:        'nevada-permit-mock-2',
    label:         'Nevada DMV Knowledge Test Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'nevada-permit',
    questionCount: 25,
    seed:          2,
    timeLimitSecs: 30 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'nevada-permit-mock-3',
    label:         'Nevada DMV Knowledge Test Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'nevada-permit',
    questionCount: 25,
    seed:          3,
    timeLimitSecs: 30 * 60,
    description:   'Third exam simulation — no repeated questions from #1 or #2.',
  },

  // ── Utah ─────────────────────────────────────────────────────────────────
  {
    examId:        'utah-permit-mock-1',
    label:         'Utah DLD Knowledge Test Mock Exam #1',
    shortLabel:    'Mock Exam #1',
    baseTestId:    'utah-permit',
    questionCount: 50,
    seed:          1,
    timeLimitSecs: 45 * 60,
    description:   'Simulates the real Utah DLD knowledge test — 50 questions, 45 min.',
  },
  {
    examId:        'utah-permit-mock-2',
    label:         'Utah DLD Knowledge Test Mock Exam #2',
    shortLabel:    'Mock Exam #2',
    baseTestId:    'utah-permit',
    questionCount: 50,
    seed:          2,
    timeLimitSecs: 45 * 60,
    description:   'A unique second simulation with a different question mix.',
  },
  {
    examId:        'utah-permit-mock-3',
    label:         'Utah DLD Knowledge Test Mock Exam #3',
    shortLabel:    'Mock Exam #3',
    baseTestId:    'utah-permit',
    questionCount: 50,
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
    isMockExam:   true,
    baseTestId:   def.baseTestId,
  };
}
