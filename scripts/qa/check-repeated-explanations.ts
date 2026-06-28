#!/usr/bin/env npx ts-node
// QA Check: Repeated / Near-Duplicate Explanations
//
// Finds explanations that are identical or nearly identical across different questions.
// Repeated explanations suggest copy-paste errors or template abuse, where different
// questions share the same boilerplate explanation without question-specific teaching.
//
// Thresholds:
//   EXACT:       100% match after normalization → error
//   NEAR_DUP:    Jaccard similarity > 0.85 on word trigrams → warning
//   MIN_LENGTH:  Only compare explanations ≥ 60 chars (short ones may legitimately match)
//
// Usage: npx tsx scripts/qa/check-repeated-explanations.ts [--json]

import type { Question, AuditIssue } from "../../src/data/questions/schema";
import { loadAllQuestions } from "./load-questions";
import { normalize, jaccardSimilarity } from "./lib";

const NEAR_DUP_THRESHOLD = 0.85;
const MIN_LENGTH         = 60;

async function main() {
  const questions = await loadAllQuestions();
  const useJson   = process.argv.includes("--json");
  const issues: AuditIssue[] = [];

  // Filter to questions with long enough explanations
  const eligible = questions.filter(q => (q.explanation?.length ?? 0) >= MIN_LENGTH);

  // Group by normalized explanation for exact-match detection (O(n))
  const byNormalized = new Map<string, Question[]>();
  for (const q of eligible) {
    const norm = normalize(q.explanation);
    if (!byNormalized.has(norm)) byNormalized.set(norm, []);
    byNormalized.get(norm)!.push(q);
  }

  // Exact duplicates
  const exactGroups: string[] = [];
  for (const [norm, group] of byNormalized) {
    if (group.length > 1) {
      const ids = group.map(q => q.id).join(", ");
      exactGroups.push(ids);
      issues.push({
        questionId: group[0].id,
        issueType:  "REPEATED_EXPLANATION",
        severity:   "error",
        detail:
          `Exact duplicate explanation shared by ${group.length} questions: ${ids}. ` +
          `Explanation: "${group[0].explanation.slice(0, 80)}..."`,
      });
    }
  }

  // Near-duplicate detection using Jaccard similarity
  // O(n²) but n≈555, so ~150k comparisons — acceptable
  const nearDups: Array<[string, string, number]> = [];
  const alreadyPaired = new Set<string>();

  for (let i = 0; i < eligible.length; i++) {
    for (let j = i + 1; j < eligible.length; j++) {
      const a = eligible[i];
      const b = eligible[j];

      // Skip if both are in the same exact-dup group (already flagged)
      if (normalize(a.explanation) === normalize(b.explanation)) continue;

      const pairKey = `${a.id}::${b.id}`;
      if (alreadyPaired.has(pairKey)) continue;

      const sim = jaccardSimilarity(a.explanation, b.explanation);
      if (sim >= NEAR_DUP_THRESHOLD) {
        alreadyPaired.add(pairKey);
        nearDups.push([a.id, b.id, sim]);

        issues.push({
          questionId: a.id,
          issueType:  "REPEATED_EXPLANATION",
          severity:   "warning",
          detail:
            `Near-duplicate explanations (${(sim * 100).toFixed(0)}% similar): ` +
            `${a.id} ↔ ${b.id}. ` +
            `Rewrite one to be question-specific. ` +
            `A: "${a.explanation.slice(0, 60)}..." ` +
            `B: "${b.explanation.slice(0, 60)}..."`,
        });
      }
    }
  }

  if (useJson) {
    console.log(JSON.stringify({ issues, exactGroups, nearDups }, null, 2));
    process.exit(issues.some(i => i.severity === "error") ? 1 : 0);
    return;
  }

  const errors   = issues.filter(i => i.severity === "error");
  const warnings = issues.filter(i => i.severity === "warning");

  console.log(`\n── Repeated Explanation Audit ────────────────────────`);
  console.log(`Questions checked: ${eligible.length} (explanations ≥${MIN_LENGTH} chars)`);
  console.log(`Exact duplicates:  ${exactGroups.length} groups`);
  console.log(`Near-duplicates:   ${nearDups.length} pairs`);

  if (errors.length > 0) {
    console.log("\nERRORS (exact duplicates — must fix):");
    for (const e of errors) console.log(`  ${e.detail}`);
  }

  if (warnings.length > 0) {
    console.log("\nWARNINGS (near-duplicates — review):");
    for (const w of warnings.slice(0, 20)) console.log(`  ${w.detail}`);
    if (warnings.length > 20) console.log(`  ... and ${warnings.length - 20} more`);
  }

  if (issues.length === 0) {
    console.log("✓ No repeated explanations detected.");
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(console.error);
