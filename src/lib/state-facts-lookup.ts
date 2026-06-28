import stateFacts from "@/data/questions/state-facts";
import type { StateFacts } from "@/data/questions/schema";

export type TestType = "cdl" | "motorcycle" | "dmv";

const byAbbr = new Map<string, StateFacts>(
  stateFacts.map((sf) => [sf.abbr, sf])
);

export function getStateFactsByAbbr(abbr: string): StateFacts | undefined {
  return byAbbr.get(abbr.toUpperCase());
}

export function getTestTypeFromSlug(slug: string): TestType {
  if (slug.includes("cdl")) return "cdl";
  if (slug.includes("motorcycle")) return "motorcycle";
  return "dmv";
}

/** Returns question count for the given test type, or undefined if NEEDS_VERIFICATION. */
export function getQuestionCount(
  sf: StateFacts,
  type: TestType
): number | undefined {
  const val =
    type === "cdl"
      ? sf.cdlGeneralKnowledgeQuestions
      : type === "motorcycle"
      ? sf.motoQuestions
      : sf.permitQuestions;
  return val === "NEEDS_VERIFICATION" ? undefined : val;
}

/** Returns pass count for the given test type, or undefined if NEEDS_VERIFICATION. */
export function getPassCount(
  sf: StateFacts,
  type: TestType
): number | undefined {
  const val =
    type === "cdl"
      ? sf.cdlGeneralKnowledgeToPass
      : type === "motorcycle"
      ? sf.motoToPass
      : sf.permitToPass;
  return val === "NEEDS_VERIFICATION" ? undefined : val;
}

/** Returns passing percentage string, or undefined if NEEDS_VERIFICATION. */
export function getPassingPct(
  sf: StateFacts,
  type: TestType
): string | undefined {
  const val =
    type === "cdl"
      ? sf.cdlGeneralKnowledgePassingPct
      : type === "motorcycle"
      ? sf.motoPassingPct
      : sf.permitPassingPct;
  return val === "NEEDS_VERIFICATION" ? undefined : val;
}

/** Returns the handbook URL for the given test type. */
export function getHandbookUrl(sf: StateFacts, type: TestType): string {
  if (type === "cdl") return sf.cdlHandbookUrl;
  if (type === "motorcycle") {
    return sf.motoHandbookUrl === "NEEDS_VERIFICATION"
      ? sf.handbookUrl
      : sf.motoHandbookUrl;
  }
  return sf.handbookUrl;
}

/** Returns a "Based on: …" string derived from state facts. */
export function buildBasedOn(sf: StateFacts, type: TestType): string {
  if (type === "cdl")
    return `${sf.state} CDL Handbook (${sf.handbookYear}) + FMCSA`;
  if (type === "motorcycle")
    return `${sf.state} Motorcycle Handbook (${sf.handbookYear})`;
  return `${sf.state} Driver Handbook (${sf.handbookYear})`;
}

/**
 * Converts a decimal age to human-readable text.
 * 15.5 → "15 years, 6 months"  |  16 → "16 years"  |  14.75 → "14 years, 9 months"
 */
export function formatAge(age: number): string {
  const years = Math.floor(age);
  const months = Math.round((age - years) * 12);
  if (months === 0) return `${years} years`;
  return `${years} years, ${months} month${months === 1 ? "" : "s"}`;
}

/** Returns a human-readable helmet law string, or undefined if unknown. */
export function formatHelmetLaw(sf: StateFacts): string | undefined {
  if (sf.motoHelmetLaw === "NEEDS_VERIFICATION") return undefined;
  if (sf.motoHelmetLaw === "all-ages") return "Required — all riders";
  if (sf.motoHelmetLaw === "under-21") return "Required — riders under 21";
  if (sf.motoHelmetLaw === "under-18") return "Required — riders under 18";
  if (sf.motoHelmetLaw === "none") return "Not required";
  return undefined;
}

/** Returns a human-readable lane splitting string, or undefined if unknown. */
export function formatLaneSplitting(sf: StateFacts): string | undefined {
  if (sf.motoLaneSplittingLegal === "NEEDS_VERIFICATION") return undefined;
  return sf.motoLaneSplittingLegal ? "Legal" : "Not legal";
}
