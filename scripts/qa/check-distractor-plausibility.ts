#!/usr/bin/env npx ts-node
// QA Check: Distractor Plausibility
//
// Flags wrong answer options that are implausible, absurd, or obviously throwaway.
// Weak distractors make the correct answer too obvious and reduce quiz educational value.
//
// Checks:
//   1. THROWAWAY SHORT: A wrong answer is <35% of the avg length of other options.
//      Signals a filler like "No" or "Yes" vs. full sentence options.
//   2. ALL/NONE OF THE ABOVE: Lazy meta-options that don't test real knowledge.
//   3. EXTREME ABSOLUTES in wrong answers: "never", "always", "under no circumstances"
//      in wrong options signal the test-maker padding with obviously false extremes.
//   4. DUPLICATE WORDS: Wrong option shares >80% of unique words with correct answer
//      (signals a near-copy that confuses rather than tests).
//   5. ABSURDITY MARKERS: Options containing known absurd/impossible phrases.
//
// Usage: npx tsx scripts/qa/check-distractor-plausibility.ts [--json]

import type { Question, AuditIssue } from "../../src/data/questions/schema";
import { loadAllQuestions } from "./load-questions";

// Wrong-answer absolute qualifiers that are almost always false in driving contexts
const ABSOLUTE_MARKERS = [
  /^never\b/i,
  /^always\b/i,
  /\bnever under any\b/i,
  /\bunder no circumstances\b/i,
  /\babsolutely never\b/i,
  /\bit is impossible\b/i,
];

// Meta-options that avoid testing real knowledge
const META_OPTION_PATTERNS = [
  /^all of the above\.?$/i,
  /^none of the above\.?$/i,
  /^both a and b\.?$/i,
  /^a and b\.?$/i,
  /^b and c\.?$/i,
];

// Known absurd/impossible phrases flagged by prior audits
const ABSURDITY_PHRASES = [
  /jump over the car/i,
  /eyes partially closed/i,
  /drive with your eyes closed/i,
  /ignore all signals/i,
  /never stop for pedestrians/i,
  /speed up through red lights/i,
  /flash your lights aggressively/i,
];

const THROWAWAY_RATIO = 0.35;  // wrong answer length < 35% of avg other option length

function uniqueWords(text: string): Set<string> {
  return new Set(
    text.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter(w => w.length > 3)
  );
}

async function main() {
  const questions = await loadAllQuestions();
  const useJson   = process.argv.includes("--json");
  const issues: AuditIssue[] = [];

  for (const q of questions) {
    const opts         = q.options;
    const correctIdx   = q.correctIndex;
    const wrongIndices = opts.map((_, i) => i).filter(i => i !== correctIdx);

    // Average option length (all 4)
    const avgLen = opts.reduce((s, o) => s + o.trim().length, 0) / opts.length;

    for (const wi of wrongIndices) {
      const opt     = opts[wi];
      const optTrim = opt.trim();
      const label   = `option[${wi}]`;

      // 1. Throwaway short
      if (avgLen > 30 && optTrim.length < avgLen * THROWAWAY_RATIO) {
        issues.push({
          questionId: q.id,
          issueType:  "WEAK_DISTRACTOR",
          severity:   "warning",
          field:      label,
          detail:
            `[${q.id}] Throwaway distractor ${label}: "${optTrim}" is only ${optTrim.length} chars ` +
            `(avg option: ${avgLen.toFixed(0)} chars). Replace with plausible wrong answer.`,
        });
      }

      // 2. All/None of the above meta-options
      for (const pattern of META_OPTION_PATTERNS) {
        if (pattern.test(optTrim)) {
          issues.push({
            questionId: q.id,
            issueType:  "WEAK_DISTRACTOR",
            severity:   "warning",
            field:      label,
            detail:
              `[${q.id}] Meta-option ${label}: "${optTrim}". ` +
              `Replace with a specific, plausible wrong answer.`,
          });
          break;
        }
      }

      // 3. Extreme absolutes in wrong answers
      for (const pattern of ABSOLUTE_MARKERS) {
        if (pattern.test(optTrim)) {
          issues.push({
            questionId: q.id,
            issueType:  "WEAK_DISTRACTOR",
            severity:   "warning",
            field:      label,
            detail:
              `[${q.id}] Extreme absolute in wrong answer ${label}: "${optTrim.slice(0, 60)}". ` +
              `Absolutes signal obviously-false options; use a plausible near-miss instead.`,
          });
          break;
        }
      }

      // 4. Absurdity markers
      for (const pattern of ABSURDITY_PHRASES) {
        if (pattern.test(optTrim)) {
          issues.push({
            questionId: q.id,
            issueType:  "ABSURD_DISTRACTOR",
            severity:   "error",
            field:      label,
            detail:
              `[${q.id}] Absurd/impossible distractor ${label}: "${optTrim}". ` +
              `Replace with a realistic near-miss answer.`,
          });
          break;
        }
      }

      // 5. Near-copy of correct answer (shares >80% of significant words)
      const correctWords = uniqueWords(opts[correctIdx]);
      const wrongWords   = uniqueWords(optTrim);
      if (correctWords.size > 4 && wrongWords.size > 4) {
        let shared = 0;
        for (const w of wrongWords) if (correctWords.has(w)) shared++;
        const overlap = shared / wrongWords.size;
        if (overlap > 0.80) {
          issues.push({
            questionId: q.id,
            issueType:  "WEAK_DISTRACTOR",
            severity:   "warning",
            field:      label,
            detail:
              `[${q.id}] Wrong answer ${label} shares ${(overlap * 100).toFixed(0)}% of words with ` +
              `correct answer. May be too similar: "${optTrim.slice(0, 60)}"`,
          });
        }
      }
    }
  }

  if (useJson) {
    console.log(JSON.stringify(issues, null, 2));
    process.exit(issues.some(i => i.severity === "error") ? 1 : 0);
    return;
  }

  const errors   = issues.filter(i => i.severity === "error");
  const warnings = issues.filter(i => i.severity === "warning");

  console.log(`\n── Distractor Plausibility Audit ─────────────────────`);
  console.log(`Questions checked: ${questions.length}`);
  console.log(`Errors:   ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log("\nERRORS (must fix):");
    for (const e of errors) console.log(`  ${e.detail}`);
  }

  if (warnings.length > 0) {
    console.log("\nWARNINGS (review and improve):");
    for (const w of warnings.slice(0, 30)) console.log(`  ${w.detail}`);
    if (warnings.length > 30) console.log(`  ... and ${warnings.length - 30} more`);
  }

  if (issues.length === 0) {
    console.log("✓ No distractor plausibility issues detected.");
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(console.error);
