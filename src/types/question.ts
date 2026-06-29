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
}
