// Loader: aggregates all question files into a single array for QA scripts.
// Only re-export — never modify question data in this file.

import type { Question } from "../../src/data/questions/schema";

export async function loadAllQuestions(): Promise<Question[]> {
  const modules: { default: Question[] }[] = [];

  // ── DMV questions (one file per state) ──────────────────────────────────
  modules.push(await import("../../src/data/questions/dmv/california"));
  modules.push(await import("../../src/data/questions/dmv/texas"));
  modules.push(await import("../../src/data/questions/dmv/florida"));
  modules.push(await import("../../src/data/questions/dmv/new-york"));
  modules.push(await import("../../src/data/questions/dmv/pennsylvania"));
  modules.push(await import("../../src/data/questions/dmv/illinois"));
  modules.push(await import("../../src/data/questions/dmv/ohio"));
  modules.push(await import("../../src/data/questions/dmv/georgia"));
  modules.push(await import("../../src/data/questions/dmv/north-carolina"));
  modules.push(await import("../../src/data/questions/dmv/arizona"));

  // ── CDL questions ────────────────────────────────────────────────────────
  modules.push(await import("../../src/data/questions/cdl/federal"));
  modules.push(await import("../../src/data/questions/cdl/school-bus"));
  modules.push(await import("../../src/data/questions/cdl/tank-vehicles"));
  modules.push(await import("../../src/data/questions/cdl/air-brakes"));
  modules.push(await import("../../src/data/questions/cdl/combination-vehicles"));
  modules.push(await import("../../src/data/questions/cdl/hazmat"));
  modules.push(await import("../../src/data/questions/cdl/doubles-triples"));
  modules.push(await import("../../src/data/questions/cdl/passenger"));

  // ── Motorcycle questions ─────────────────────────────────────────────────
  modules.push(await import("../../src/data/questions/motorcycle/california"));
  modules.push(await import("../../src/data/questions/motorcycle/texas"));
  modules.push(await import("../../src/data/questions/motorcycle/florida"));
  modules.push(await import("../../src/data/questions/motorcycle/new-york"));
  modules.push(await import("../../src/data/questions/motorcycle/pennsylvania"));
  modules.push(await import("../../src/data/questions/motorcycle/illinois"));
  modules.push(await import("../../src/data/questions/motorcycle/ohio"));
  modules.push(await import("../../src/data/questions/motorcycle/georgia"));
  modules.push(await import("../../src/data/questions/motorcycle/north-carolina"));
  modules.push(await import("../../src/data/questions/motorcycle/arizona"));

  return modules.flatMap(m => m.default);
}
