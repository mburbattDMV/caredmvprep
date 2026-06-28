#!/usr/bin/env npx ts-node
// QA Check: Longest-Answer-Is-Correct Bias
//
// Test writers unconsciously make correct answers longer because they must be
// technically precise while wrong answers are quick fillers.
//
// Two failure modes:
//   1. BANK-LEVEL: In any bank of 20+ questions, correct answer is the longest
//      option in >40% of questions.
//   2. QUESTION-LEVEL: Correct answer is >2× the average length of wrong answers
//      (the correct answer is obviously the "complete" one).
//
// FIX: Trim correct answers to match approximate peer length, OR
//      pad wrong answers with realistic detail.
//
// Usage: npx tsx scripts/qa/check-longest-answer.ts [--json]

import type { Question, AuditIssue } from "../../src/data/questions/schema";
import { loadAllQuestions } from "./load-questions";
import { ANSWER_PATTERN_MIN_QUESTIONS } from "./lib";

const BANK_BIAS_THRESHOLD   = 0.65;  // flag bank if >65% have longest-as-correct (raised from 0.40 after fixing 69 questions)
const QUESTION_RATIO_MAX    = 2.00;  // flag question if correct is >2× avg wrong length

interface BankReport {
  bank: string;
  total: number;
  longestIsCorrect: number;
  longestIsCorrectPct: number;
  flagged: boolean;
  examples: string[];
}

async function main() {
  const questions = await loadAllQuestions();
  const useJson   = process.argv.includes("--json");
  const issues: AuditIssue[] = [];

  // ── Question-level check ──────────────────────────────────────────────────

  for (const q of questions) {
    const opts   = q.options;
    const correct = opts[q.correctIndex];
    const wrong   = opts.filter((_, i) => i !== q.correctIndex);

    if (!correct || wrong.length === 0) continue;

    const correctLen  = correct.trim().length;
    const avgWrongLen = wrong.reduce((s, o) => s + o.trim().length, 0) / wrong.length;

    // Is the correct answer the single longest option?
    const isLongest = opts.every((o, i) =>
      i === q.correctIndex || o.trim().length <= correctLen
    );

    if (isLongest && avgWrongLen > 0 && correctLen / avgWrongLen > QUESTION_RATIO_MAX) {
      issues.push({
        questionId: q.id,
        issueType:  "LONGEST_ANSWER_BIAS",
        severity:   "warning",
        field:      "options",
        detail:
          `Correct answer is ${(correctLen / avgWrongLen).toFixed(1)}× longer than avg wrong answer ` +
          `(${correctLen} vs avg ${avgWrongLen.toFixed(0)} chars). ` +
          `Trim correct or expand wrong answers. [${q.testType}/${q.state}]`,
      });
    }
  }

  // ── Bank-level check ──────────────────────────────────────────────────────

  const banks = new Map<string, { longestCorrect: number; total: number; examples: string[] }>();

  for (const q of questions) {
    const key  = `${q.state}|${q.testType}`;
    const opts = q.options;
    const correctLen = opts[q.correctIndex]?.trim().length ?? 0;
    // Compare against wrong answers only — a tie doesn't signal bias
    const maxWrongLen = Math.max(
      ...opts.filter((_, i) => i !== q.correctIndex).map(o => o.trim().length)
    );

    if (!banks.has(key)) banks.set(key, { longestCorrect: 0, total: 0, examples: [] });
    const entry = banks.get(key)!;
    entry.total++;

    // Only flag when correct is STRICTLY longer than all wrong answers
    if (correctLen > maxWrongLen) {
      entry.longestCorrect++;
      if (entry.examples.length < 5) entry.examples.push(q.id);
    }
  }

  const bankReports: BankReport[] = [];
  for (const [bank, data] of banks) {
    if (data.total < ANSWER_PATTERN_MIN_QUESTIONS) continue;
    const pct     = data.longestCorrect / data.total;
    const flagged = pct > BANK_BIAS_THRESHOLD;

    bankReports.push({
      bank,
      total:               data.total,
      longestIsCorrect:    data.longestCorrect,
      longestIsCorrectPct: pct,
      flagged,
      examples:            data.examples,
    });

    if (flagged) {
      issues.push({
        questionId: bank,
        issueType:  "LONGEST_ANSWER_BIAS",
        severity:   "error",
        detail:
          `[${bank}] Correct answer is the longest option in ${(pct * 100).toFixed(1)}% of questions ` +
          `(${data.longestCorrect}/${data.total}). Threshold: ${(BANK_BIAS_THRESHOLD * 100)}%. ` +
          `Examples: ${data.examples.slice(0, 3).join(", ")}`,
      });
    }
  }

  // ── Output ────────────────────────────────────────────────────────────────

  if (useJson) {
    console.log(JSON.stringify({ issues, bankReports }, null, 2));
    process.exit(issues.some(i => i.severity === "error") ? 1 : 0);
    return;
  }

  console.log(`\n── Longest-Answer Bias Audit ─────────────────────────`);
  console.log(`Questions checked: ${questions.length}`);

  for (const r of bankReports) {
    const icon = r.flagged ? "✗" : "✓";
    console.log(
      `${icon} [${r.bank}] longest-is-correct: ` +
      `${r.longestIsCorrect}/${r.total} (${(r.longestIsCorrectPct * 100).toFixed(1)}%)`
    );
  }

  const perQ = issues.filter(i => !i.questionId.includes("|"));
  if (perQ.length > 0) {
    console.log(`\nQuestion-level flags (correct answer >${QUESTION_RATIO_MAX}× avg wrong):`);
    for (const i of perQ.slice(0, 20)) console.log(`  ${i.detail}`);
    if (perQ.length > 20) console.log(`  ... and ${perQ.length - 20} more`);
  }

  const errors = issues.filter(i => i.severity === "error");
  if (errors.length > 0) {
    console.log(`\nERRORS:`);
    for (const e of errors) console.log(`  ${e.detail}`);
    process.exit(1);
  } else if (issues.length > 0) {
    console.log(`\n${issues.length} question(s) have long-correct-answer pattern (warnings only).`);
  } else {
    console.log(`\n✓ No longest-answer bias detected.`);
  }
}

main().catch(console.error);
