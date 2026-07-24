import type { LicenseType } from "./database";

export type { LicenseType };

// Lightweight question type for the quiz engine and Zustand store.
// The authoritative full-schema type (with source tracking, fingerprint, status, etc.)
// lives in src/data/questions/schema.ts — used by QA scripts only.
export interface Question {
  id:           string;
  question:     string;
  options:      [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation:  string;
  category:     string;   // category slug: 'traffic_signs', 'right_of_way', etc.
  sourceRef?:   string;   // brief citation shown to user after answering
}

export interface QuizConfig {
  testId:         string;
  label:          string;
  state:          string;
  licenseType:    LicenseType;
  questions:      Question[];
  passingScore:   number;         // 0–1, e.g. 0.80
  timeLimitSecs?: number;
  autoStart?:     boolean;        // skip session selector and start immediately
  isMockExam?:    boolean;        // fixed-length exam simulation — always runs all of `questions`, even when untimed
  notice?:        string;         // shown once above the session selector, e.g. explaining a fallback from a focused session to the full test
  // For mock exams, `testId` is the specific exam instance (e.g.
  // "virginia-permit-mock-1"), which isn't a real entry in the quiz
  // registry — only the underlying practice test is (e.g.
  // "virginia-permit"). Any "practice this weak topic" link built from
  // `testId` alone 404s after a mock exam. baseTestId gives callers the
  // real, practicable test to link back to.
  baseTestId?:    string;
}

// Client-safe question shape — deliberately omits `correctIndex` and
// `explanation`. Everything the browser holds before an answer is submitted
// must be this shape, never `Question`. See src/lib/quizGrading.ts.
export interface ClientQuestion {
  id:         string;
  question:   string;
  options:    [string, string, string, string];
  category:   string;
  sourceRef?: string;
  /** Opaque, encrypted. Sent back unchanged at grading time. */
  token:      string;
}

export interface ClientQuizConfig extends Omit<QuizConfig, "questions"> {
  questions: ClientQuestion[];
}
