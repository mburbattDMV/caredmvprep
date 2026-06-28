#!/usr/bin/env npx ts-node
// QA Script 8: State Facts Mismatch Checker
// Compares question content against the authoritative state-facts.ts table.
// If a question says "40 questions, 80% to pass" for a state where the real
// test is 46 questions at 83%, the question is wrong.
//
// Usage: npx ts-node scripts/qa/check-facts-mismatch.ts [--json]

import type { Question, StateFacts, AuditIssue } from "../../src/data/questions/schema";
import { loadAllQuestions } from "./load-questions";
import { loadStateFacts } from "./load-state-facts";

// Patterns that extract numeric facts from question/explanation text
const QUESTION_COUNT_PATTERN = /(\d+)\s*(?:questions?|items?|test questions?)\s*(?:on|in|for)/i;
const PASS_SCORE_PATTERN = /(\d+)%?\s*(?:to pass|passing score|pass(?:ing)?)\b(?!enger)/i;
const CORRECT_COUNT_PATTERN = /(\d+)\s*(?:correct|right|answers? correct)/i;

function extractNumbers(text: string): {
  questionCount?: number;
  passScore?: number;
  correctCount?: number;
} {
  const result: { questionCount?: number; passScore?: number; correctCount?: number } = {};

  const qMatch = text.match(QUESTION_COUNT_PATTERN);
  if (qMatch) result.questionCount = parseInt(qMatch[1], 10);

  const pMatch = text.match(PASS_SCORE_PATTERN);
  if (pMatch) result.passScore = parseInt(pMatch[1], 10);

  const cMatch = text.match(CORRECT_COUNT_PATTERN);
  if (cMatch) result.correctCount = parseInt(cMatch[1], 10);

  return result;
}

async function main() {
  const questions = await loadAllQuestions();
  const stateFacts = await loadStateFacts();
  const useJson = process.argv.includes("--json");
  const issues: AuditIssue[] = [];

  const factsMap = new Map<string, StateFacts>();
  for (const sf of stateFacts) {
    factsMap.set(sf.abbr, sf);
  }

  for (const q of questions) {
    // CDL federal standard: always 50 questions, 40 correct, 80% — check before skipping federal
    if (q.testType === "cdl" && q.jurisdiction === "federal") {
      const fullTextFed = `${q.question} ${q.explanation}`;
      const extractedFed = extractNumbers(fullTextFed);
      if (extractedFed.questionCount !== undefined && extractedFed.questionCount !== 50) {
        issues.push({
          questionId: q.id,
          issueType: "FACTS_TABLE_MISMATCH",
          severity: "error",
          detail: `Federal CDL General Knowledge is always 50 questions. Question states ${extractedFed.questionCount}.`,
        });
      }
      if (extractedFed.passScore !== undefined && extractedFed.passScore !== 80) {
        issues.push({
          questionId: q.id,
          issueType: "FACTS_TABLE_MISMATCH",
          severity: "error",
          detail: `Federal CDL General Knowledge passing score is always 80%. Question states ${extractedFed.passScore}%.`,
        });
      }
      continue;
    }

    if (q.state === "all") continue;
    const facts = factsMap.get(q.state);
    if (!facts) {
      issues.push({
        questionId: q.id,
        issueType: "FACTS_TABLE_MISMATCH",
        severity: "warning",
        detail: `State "${q.state}" not found in state-facts.ts. Add entry before writing questions for this state.`,
      });
      continue;
    }

    const fullText = `${q.question} ${q.explanation}`;
    const extracted = extractNumbers(fullText);

    // Check DMV permit facts
    if (q.testType === "dmv") {
      if (
        extracted.questionCount !== undefined &&
        facts.permitQuestions !== "NEEDS_VERIFICATION" &&
        extracted.questionCount !== facts.permitQuestions
      ) {
        issues.push({
          questionId: q.id,
          issueType: "FACTS_TABLE_MISMATCH",
          severity: "error",
          detail: `Question states ${extracted.questionCount} test questions, but ${facts.state} permit test has ${facts.permitQuestions} per state-facts.ts`,
        });
      }

      if (
        extracted.passScore !== undefined &&
        facts.permitPassingPct !== "NEEDS_VERIFICATION"
      ) {
        const factsScore = parseInt(facts.permitPassingPct, 10);
        if (extracted.passScore !== factsScore) {
          issues.push({
            questionId: q.id,
            issueType: "FACTS_TABLE_MISMATCH",
            severity: "error",
            detail: `Question states ${extracted.passScore}% passing score, but ${facts.state} requires ${facts.permitPassingPct} per state-facts.ts`,
          });
        }
      }
    }

    // Check motorcycle facts
    if (q.testType === "motorcycle") {
      if (
        extracted.questionCount !== undefined &&
        facts.motoQuestions !== "NEEDS_VERIFICATION" &&
        extracted.questionCount !== facts.motoQuestions
      ) {
        issues.push({
          questionId: q.id,
          issueType: "FACTS_TABLE_MISMATCH",
          severity: "error",
          detail: `Question states ${extracted.questionCount} motorcycle test questions, but ${facts.state} has ${facts.motoQuestions} per state-facts.ts`,
        });
      }
    }

    // Federal CDL checks are handled above before the state-specific loop continues
  }

  if (useJson) {
    console.log(JSON.stringify(issues, null, 2));
    return;
  }

  const errors = issues.filter(i => i.severity === "error");
  const warnings = issues.filter(i => i.severity === "warning");

  console.log(`\n── State Facts Mismatch Audit ────────────────────────`);
  console.log(`Questions checked: ${questions.length}`);
  console.log(`Errors:   ${errors.length}  ← facts in questions contradict state-facts.ts`);
  console.log(`Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log("\nERRORS (questions contain wrong facts):");
    for (const i of errors) console.log(`  [${i.questionId}] ${i.detail}`);
  }
  if (warnings.length > 0) {
    console.log("\nWARNINGS:");
    for (const i of warnings) console.log(`  [${i.questionId}] ${i.detail}`);
  }
  if (issues.length === 0) {
    console.log("✓ All question facts align with state-facts.ts.");
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(console.error);
