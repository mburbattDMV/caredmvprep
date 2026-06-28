#!/usr/bin/env npx ts-node
// QA Script 6: Explanation Quality Check
// Flags generic, too-short, circular, or non-teaching explanations.
// Cannot replace human review but surfaces the worst cases automatically.
//
// Usage: npx ts-node scripts/qa/check-explanation-quality.ts [--json]

import type { Question, AuditIssue } from "../../src/data/questions/schema";
import { loadAllQuestions } from "./load-questions";
import { normalize, MIN_EXPLANATION_LENGTH } from "./lib";

// Patterns that indicate an explanation is just restating the answer
const RESTATEMENT_PATTERNS = [
  /the correct answer is/i,
  /the answer is/i,
  /this is correct because it is correct/i,
  /because that is the rule/i,
  /per state law$/i,
  /as stated in the handbook$/i,
];

// Generic filler phrases that don't teach anything
const GENERIC_PHRASES = [
  "per state law",
  "as required by law",
  "this is the correct answer",
  "according to the handbook",
  "the law requires",
  "it is important to",
  "safety is important",
  "always follow traffic laws",
];

// Good explanations typically contain at least one of these:
const TEACHING_INDICATORS = [
  // Numbers + units (distances, speeds, times, weights)
  /\d+\s*(feet|ft|mph|seconds|sec|minutes|yards|lbs|pounds|inches|psi|percent|hours?|months?|years?|days?|points?|drinks?)/i,
  // Law codes — handles "CVC §22350", "CVC 22350", "§22350", "49 CFR", "23 USC"
  /\b(cvc|vc|cfr|usc|fmcsa)\b[\s§]*\d+/i,
  /§\s*\d+/,
  // "because" followed by a real reason
  /because\s+[a-z].{20,}/i,
  // Consequence language
  /(can cause|increases?|decreases?|results? in|leads? to|prevents?|reduces?)/i,
  // Citation language (chapter, section, page, handbook references)
  /(chapter|section|page|handbook|manual|regulation|endorsement)/i,
  // Fraction/ratio specifics
  /\d+\/\d+/,
  // Percentage
  /\d+\s*%/,
  // "means", "refers to", "defined as"
  /(means|refers to|defined as|is called|known as|is required|must be|must stop|must yield)/i,
  // Specific color/shape/number patterns ("red curb", "5-sided", "octagonal")
  /(red curb|blue curb|yellow curb|green curb|white curb|octagonal|pentagon|diamond.shaped|triangle)/i,
  // Directional / positional instructions (common in parking/turn rules)
  /(toward the (curb|traffic|road|lane)|away from the (curb|traffic|road)|in the (left|right|center|far|nearest|right-hand|left-hand) (lane|third|portion|side))/i,
  // Consequence conditions ("if brakes fail", "if the vehicle rolls")
  /if .{5,60} (fails?|rolls?|slips?|skids?|breaks?|occurs?|happens?|continues?)/i,
  // Teaching/explanation verbs
  /(this (keeps?|prevents?|ensures?|allows?|stops?|protects?|guides?|warns?|helps?|means?|indicates?))/i,
  // Requirement / prohibition language
  /(you must|must not|are required|is prohibited|is illegal|is not permitted|prohibits?|forbids?|requires? (all|you|drivers?|vehicles?))/i,
  // Identifies what sign/marking IS
  /(indicates? (a|an|the)|warns? (of|that|drivers)|separates? (traffic|lanes)|marks? (the|a|an))/i,
];

// Circular explanation: says what to do but not why
// (Explanation is essentially the correct answer restated as a sentence)
function isCircular(question: string, explanation: string): boolean {
  const qWords = new Set(
    normalize(question).split(" ").filter(w => w.length > 4)
  );
  const expWords = normalize(explanation).split(" ").filter(w => w.length > 4);
  if (qWords.size === 0 || expWords.length === 0) return false;

  // If explanation shares >70% of significant words with the question
  // AND is under 120 chars, it's likely circular
  if (explanation.length > 120) return false;
  const shared = expWords.filter(w => qWords.has(w)).length;
  return shared / expWords.length > 0.70;
}

// Explanation that starts by naming the correct answer without explaining why
const NAMES_ANSWER_WITHOUT_WHY = [
  /^[A-Z][^.!?]{5,30}\.$/, // Single short sentence, ends with period — likely just states the rule
];

async function main() {
  const questions = await loadAllQuestions();
  const useJson = process.argv.includes("--json");
  const issues: AuditIssue[] = [];

  for (const q of questions) {
    const exp = q.explanation ?? "";

    // Too short
    if (exp.length < MIN_EXPLANATION_LENGTH) {
      issues.push({
        questionId: q.id,
        issueType: "GENERIC_EXPLANATION",
        severity: "warning",
        field: "explanation",
        detail: `Explanation too short (${exp.length} chars, min ${MIN_EXPLANATION_LENGTH}): "${exp.slice(0, 60)}..."`,
      });
      continue; // Other checks won't be useful on a short explanation
    }

    // Restatement check
    for (const pattern of RESTATEMENT_PATTERNS) {
      if (pattern.test(exp)) {
        issues.push({
          questionId: q.id,
          issueType: "GENERIC_EXPLANATION",
          severity: "warning",
          field: "explanation",
          detail: `Explanation appears to restate the answer rather than teach: "${exp.slice(0, 80)}..."`,
        });
        break;
      }
    }

    // Generic phrase check
    const expLower = exp.toLowerCase();
    for (const phrase of GENERIC_PHRASES) {
      if (expLower.includes(phrase) && exp.length < 150) {
        issues.push({
          questionId: q.id,
          issueType: "GENERIC_EXPLANATION",
          severity: "warning",
          field: "explanation",
          detail: `Explanation contains generic filler ("${phrase}") and is short. Add specific rule, number, or law reference.`,
        });
        break;
      }
    }

    // Teaching indicator check — explanation should contain at least one
    const hasTeachingContent = TEACHING_INDICATORS.some(pattern => pattern.test(exp));
    if (!hasTeachingContent) {
      issues.push({
        questionId: q.id,
        issueType: "GENERIC_EXPLANATION",
        severity: "warning",
        field: "explanation",
        detail: `Explanation lacks specific teaching content (no numbers, law codes, consequences, or citations): "${exp.slice(0, 80)}..."`,
      });
    }

    // Circular explanation check
    if (isCircular(q.question, exp)) {
      issues.push({
        questionId: q.id,
        issueType: "CIRCULAR_EXPLANATION",
        severity: "warning",
        field: "explanation",
        detail: `Explanation may be circular (shares too many words with question and is short). Add WHY this rule exists: "${exp.slice(0, 80)}"`,
      });
    }

    // Explanation length vs. question complexity (difficulty 3 should have longer explanations)
    if (q.difficulty === 3 && exp.length < 150) {
      issues.push({
        questionId: q.id,
        issueType: "GENERIC_EXPLANATION",
        severity: "warning",
        field: "explanation",
        detail: `Hard (difficulty 3) question has short explanation (${exp.length} chars). Complex questions need more teaching detail: "${exp.slice(0, 60)}..."`,
      });
    }

    // Explanation that ends without sentence-closing punctuation (incomplete thought)
    // Allow ')' for citation endings like "...(CDL Manual, Section 10.2)"
    const lastChar = exp.trim().slice(-1);
    if (!['.', '!', '?', ')'].includes(lastChar)) {
      issues.push({
        questionId: q.id,
        issueType: "GENERIC_EXPLANATION",
        severity: "warning",
        field: "explanation",
        detail: `Explanation does not end with punctuation (may be truncated): "${exp.slice(-40)}"`,
      });
    }
  }

  if (useJson) {
    console.log(JSON.stringify(issues, null, 2));
    return;
  }

  console.log(`\n── Explanation Quality Audit ─────────────────────────`);
  console.log(`Questions checked: ${questions.length}`);
  console.log(`Issues flagged:    ${issues.length}`);

  if (issues.length > 0) {
    console.log("\nISSUES (all warnings — review and rewrite):");
    for (const i of issues) {
      console.log(`  [${i.questionId}] ${i.detail}`);
    }
  } else {
    console.log("✓ All explanations pass quality checks.");
  }
}

main().catch(console.error);
