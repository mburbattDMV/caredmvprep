#!/usr/bin/env npx ts-node
// Master QA runner — executes all 7 audit scripts and produces a combined report.
// Exit code 1 if any script exits with errors (warnings do not fail the build).
//
// Usage:
//   npx ts-node scripts/qa/run-all.ts          (full audit)
//   npx ts-node scripts/qa/run-all.ts --json   (machine-readable combined output)

import { execSync } from "child_process";
import * as path from "path";

const SCRIPTS = [
  { name: "Missing Fields",          file: "check-missing-fields.ts" },
  { name: "Duplicates",              file: "check-duplicates.ts" },
  { name: "Stale Verification",      file: "check-stale.ts" },
  { name: "Answer Patterns",         file: "check-answer-patterns.ts" },
  { name: "Longest-Answer Bias",     file: "check-longest-answer.ts" },
  { name: "Distractor Plausibility", file: "check-distractor-plausibility.ts" },
  { name: "State Isolation",         file: "check-state-isolation.ts" },
  { name: "Explanation Quality",     file: "check-explanation-quality.ts" },
  { name: "Repeated Explanations",   file: "check-repeated-explanations.ts" },
  { name: "Unverified Questions",    file: "check-unverified.ts" },
  { name: "Facts Mismatch",          file: "check-facts-mismatch.ts" },
  { name: "Page Hardcodes",          file: "check-page-hardcodes.ts" },
];

const useJson = process.argv.includes("--json");
const root = path.resolve(__dirname);

let totalErrors = 0;
const results: Array<{ name: string; passed: boolean; output: string }> = [];

for (const script of SCRIPTS) {
  const scriptPath = path.join(root, script.file);
  const jsonFlag = useJson ? " --json" : "";

  try {
    const output = execSync(
      `npx tsx "${scriptPath}"${jsonFlag}`,
      { encoding: "utf8", stdio: "pipe" }
    );
    results.push({ name: script.name, passed: true, output });
  } catch (err: unknown) {
    totalErrors++;
    const e = err as { stdout?: string; message?: string };
    const output = e.stdout ?? e.message ?? "";
    results.push({ name: script.name, passed: false, output });
  }
}

if (useJson) {
  console.log(JSON.stringify({ results, totalErrors }, null, 2));
} else {
  console.log("\n╔══════════════════════════════════════════════════════╗");
  console.log("║         CAREDMVPrep Question Bank QA Report          ║");
  console.log("╚══════════════════════════════════════════════════════╝\n");

  for (const r of results) {
    const icon = r.passed ? "✓" : "✗";
    console.log(`${icon} ${r.name}`);
    if (!r.passed) {
      console.log(r.output.split("\n").map(l => "  " + l).join("\n"));
    }
  }

  console.log("\n──────────────────────────────────────────────────────");
  const passed = results.filter(r => r.passed).length;
  console.log(`Passed: ${passed}/${SCRIPTS.length} checks`);

  if (totalErrors > 0) {
    console.log(`\n✗ ${totalErrors} check(s) failed. Fix errors before generating question banks.\n`);
  } else {
    console.log("\n✓ All QA checks passed. Safe to proceed with question bank generation.\n");
  }
}

process.exit(totalErrors > 0 ? 1 : 0);
