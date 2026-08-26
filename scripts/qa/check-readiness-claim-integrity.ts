#!/usr/bin/env npx tsx
// QA: Readiness/pass-probability claim-integrity regression guard.
//
// Added 2026-08-26 after a confirmed incident: src/lib/readiness.ts blended
// real accuracy with two invented, uncalibrated bonus points
// ("coverageBonus"/"masteryBonus") into a fabricated `passProb`, labeled
// with unsupported certainty language ("Exam Ready"), duplicated across
// ReadinessCard.tsx and CoachBanner.tsx, plus a third, independent
// "sessions to pass" formula in QuizResults.tsx. See
// docs/readiness-claim-integrity.md for the full incident record.
//
// This script fails if any of the specific banned identifiers, formulas, or
// claim strings below reappear in application source. It does NOT ban the
// word "pass," "ready," or "readiness" generally — that would also block
// legitimate factual statements this codebase is explicitly allowed to
// make (e.g. "You passed this practice test", "at or above the passing
// threshold"). See CARE_UNIVERSAL_STANDARDS.md, "Readiness claim
// integrity," for the exact rule this enforces.
//
// Known limitation: this is a plain grep over non-comment lines, not a real
// parser — deliberately cheap and fast rather than exhaustive; it exists to
// catch an accidental regression, not a determined attempt to evade it.
//
// Usage: npx tsx scripts/qa/check-readiness-claim-integrity.ts

import { readFileSync } from "fs";
import { execSync } from "child_process";

const SCAN_DIRS = ["src"];

const BANNED_PATTERNS: { pattern: RegExp; reason: string }[] = [
  { pattern: /\bpassProb\b/, reason: "the fabricated pass-probability identifier" },
  { pattern: /\bcoverageBonus\b|\bmasteryBonus\b/, reason: "the invented, uncalibrated bonus-point formula" },
  { pattern: /\bPASSING_THRESHOLD\b/, reason: "the retired flat site-wide passing-threshold constant (use each exam's real config passingScore instead)" },
  { pattern: /Pass probability\s*:/i, reason: "unsupported 'Pass probability: X%' student-facing claim" },
  { pattern: /\bExam Ready\b/i, reason: "unsupported certainty label" },
  { pattern: /Almost Ready\b/i, reason: "unsupported certainty label" },
  { pattern: /you look exam-ready/i, reason: "unsupported certainty claim" },
  { pattern: /Estimated\s+.{0,10}more practice session/i, reason: "an invented 'sessions to pass' formula" },
  { pattern: /questionsToReady/, reason: "the retired invented 'points per correct answer' formula" },
];

function isCommentLine(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*") || trimmed.startsWith("{/*");
}

function listFiles(dir: string): string[] {
  try {
    return execSync(`find ${dir} -type f \\( -name "*.ts" -o -name "*.tsx" \\)`, { encoding: "utf-8" })
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

function main() {
  const failures: string[] = [];

  for (const dir of SCAN_DIRS) {
    for (const file of listFiles(dir)) {
      const lines = readFileSync(file, "utf-8").split("\n");
      lines.forEach((line, i) => {
        if (isCommentLine(line)) return;
        for (const { pattern, reason } of BANNED_PATTERNS) {
          if (pattern.test(line)) {
            failures.push(`${file}:${i + 1}: ${reason}\n    ${line.trim()}`);
          }
        }
      });
    }
  }

  if (failures.length > 0) {
    console.error(`\n✗ Readiness claim-integrity check FAILED — ${failures.length} violation(s):\n`);
    failures.forEach((f) => console.error(f + "\n"));
    console.error('See CARE_UNIVERSAL_STANDARDS.md, "Readiness claim integrity."\n');
    process.exit(1);
  }

  console.log("✓ Readiness claim-integrity check passed — no banned fabricated formulas or unsupported claims found.");
}

main();
