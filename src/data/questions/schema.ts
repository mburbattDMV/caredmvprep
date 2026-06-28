// Question Bank Schema — CAREDMVPrep
// All question bank entries must conform to this schema.
// No question enters the system without all required fields populated.

export type Jurisdiction = "federal" | "state";
export type TestType = "dmv" | "cdl" | "motorcycle";
export type QuestionStatus = "draft" | "needs_review" | "verified" | "retired";

// 1 = basic (signs, rules of thumb)
// 2 = standard (common rules, straightforward application)
// 3 = applied (situational, requires judgment)
// 4 = complex (edge cases, calculations, specific regulations)
export type Difficulty = 1 | 2 | 3 | 4;

export interface Question {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: string;
  // Stable slug, never changes after assignment. Format: {abbr}-{testType}-{category}-{seq}
  // Examples: "ca-dmv-speed-001", "tx-moto-braking-003", "fed-cdl-hos-011"

  fingerprint: string;
  // SHA-256 of normalize(question.question). Computed on write. Used for exact dedup.

  // ── Jurisdiction ──────────────────────────────────────────────────────────
  jurisdiction: Jurisdiction;
  // "federal" = applies identically in all 50 states (FMCSA CDL rules, uniform traffic laws)
  // "state"   = law or procedure specific to one state

  state: string | "all";
  // Two-letter abbreviation ("CA", "TX") for state-specific, or "all" for federal.
  // jurisdiction:"federal" MUST have state:"all"
  // jurisdiction:"state"   MUST have a specific two-letter abbr

  testType: TestType;

  // ── Classification ────────────────────────────────────────────────────────
  category: string;
  // High-level topic. Examples:
  // DMV:        "Speed Limits" | "Right of Way" | "Traffic Signs" | "Alcohol & Drugs" | "Parking"
  // CDL:        "Pre-Trip Inspection" | "Hours of Service" | "Cargo Securement" | "Air Brakes"
  // Motorcycle: "Braking" | "Protective Gear" | "Group Riding" | "Hazards"

  subcategory: string;
  // Specific topic within category. Examples:
  // "School Zone Speed", "Uncontrolled Intersection", "HazMat Placard Thresholds"

  difficulty: Difficulty;

  // ── Question Content ───────────────────────────────────────────────────────
  question: string;
  // The full question text. Written from the official source, not from memory.

  options: [string, string, string, string];
  // Always exactly 4 options. All must be plausible to a non-studier.
  // No two options may be semantically equivalent.

  correctIndex: 0 | 1 | 2 | 3;
  // Index into options[]. Never change the correct answer to balance letter distribution.
  // Reorder wrong answers naturally if distribution is skewed.

  explanation: string;
  // Must: cite the specific rule, teach WHY the answer is correct, reference the source section.
  // Must NOT: merely restate the answer, be under 75 characters, be recycled from another question.
  // Example of BAD explanation: "The correct following distance is 3 seconds per state law."
  // Example of GOOD explanation: "The 3-second rule (CVC §21703) ensures minimum safe following
  //   distance at any speed. At 60 mph you travel 88 ft/sec — 3 seconds = 264 feet of buffer."

  // ── Source ────────────────────────────────────────────────────────────────
  source: string;
  // Full name of the official source document.
  // Examples: "California Driver Handbook 2025", "FMCSA CDL Manual 2024", "Texas DPS Driver Handbook"

  sourceUrl: string;
  // Direct URL to the handbook or regulation. Must be a .gov URL or official agency URL.

  sourceSection: string;
  // Specific enough to locate the rule in under 60 seconds.
  // Examples: "Chapter 4: Speed Limits, p. 52", "Section 5.2.1: Air Brake System", "CVC §22352"
  // NEVER acceptable: "Chapter 4" (no page), "Speed limits section" (no chapter number)

  federalCode?: string;
  // Optional: specific federal regulation if applicable.
  // Examples: "49 CFR 392.9", "23 CFR 655.601", "CVC §22352"

  // ── State-Specificity Flag ────────────────────────────────────────────────
  isStateSpecificLaw: boolean;
  // true  = this rule applies ONLY in this state (lane splitting, specific speed limits, helmet age)
  // false = this rule is uniform nationally or is the same as federal standard

  // ── Workflow ──────────────────────────────────────────────────────────────
  status: QuestionStatus;
  // draft        → written, not reviewed
  // needs_review → author believes correct, awaiting second review
  // verified     → reviewer confirmed against source section; appears in quizzes
  // retired      → law changed, question wrong, or superseded; never served

  createdAt: string;        // ISO 8601 date: "2026-06-22"
  lastVerifiedAt: string;   // ISO 8601 date. Must be within 365 days to remain "verified".
  verifiedBy?: string;      // Initials or name of reviewer who set status:"verified"
  retiredReason?: string;   // Required when status:"retired". Explain why.
  retiredAt?: string;       // ISO 8601 date of retirement

  // ── Tags ──────────────────────────────────────────────────────────────────
  tags?: string[];
  // Optional free-form tags for filtering. Examples: ["night-driving", "school-zone", "freeway"]
}

// ── State Facts Reference ──────────────────────────────────────────────────
// Every question's state+testType must have a matching entry in state-facts.ts.
// If a question's numeric facts (passing score, question count) contradict the
// state facts table, the question is wrong — not the table.

export interface StateFacts {
  // Identity
  state: string;                        // "California"
  abbr: string;                         // "CA"
  agencyName: string;                   // "California Department of Motor Vehicles"
  agencyUrl: string;                    // "https://www.dmv.ca.gov"

  // Driver's License / Permit Test
  handbookUrl: string;                  // Direct URL to current handbook PDF
  handbookYear: number;                 // Year of the edition verified
  permitQuestions: number | "NEEDS_VERIFICATION";
  permitToPass: number | "NEEDS_VERIFICATION";
  permitPassingPct: string | "NEEDS_VERIFICATION";  // "80%"
  permitMinAge: number | "NEEDS_VERIFICATION";      // years (decimal ok: 15.5)

  // Motorcycle Test
  motoHandbookUrl: string | "NEEDS_VERIFICATION";
  motoQuestions: number | "NEEDS_VERIFICATION";
  motoToPass: number | "NEEDS_VERIFICATION";
  motoPassingPct: string | "NEEDS_VERIFICATION";
  motoHelmetLaw: "all-ages" | "under-18" | "none" | "NEEDS_VERIFICATION";
  motoLaneSplittingLegal: boolean | "NEEDS_VERIFICATION";
  motoSafetyCourseName?: string;        // e.g. "MSF Basic RiderCourse", "CMSP"
  motoCourseWaivesSkillsTest: boolean | "NEEDS_VERIFICATION";

  // CDL General Knowledge Test
  // NOTE: CDL General Knowledge is FEDERALLY STANDARDIZED (FMCSA):
  //   50 questions, pass with 40 correct (80%) — identical in all 50 states.
  // State-specific CDL differences (fees, supplement content) are in cdlNotes.
  cdlHandbookUrl: string;               // State CDL supplement or commercial driver handbook URL
  cdlGeneralKnowledgeQuestions: 50;    // Always 50 — federal standard
  cdlGeneralKnowledgeToPass: 40;       // Always 40 — federal standard
  cdlGeneralKnowledgePassingPct: "80%"; // Always 80% — federal standard
  cdlNotes?: string;                    // State-specific CDL facts (fees, state addendum topics)

  // Metadata
  lastVerifiedAt: string;              // ISO date — when these facts were last confirmed
  verifiedBy?: string;
  notes?: string;                      // Unusual facts, known edge cases
}

// ── Audit Result Types (used by QA scripts) ───────────────────────────────

export interface AuditIssue {
  questionId: string;
  issueType:
    | "MISSING_FIELD"
    | "STALE_VERIFICATION"
    | "DUPLICATE_EXACT"
    | "DUPLICATE_NEAR"
    | "RECYCLED_EXPLANATION"
    | "ANSWER_PATTERN"
    | "STATE_ISOLATION"
    | "SHORT_EXPLANATION"
    | "GENERIC_EXPLANATION"
    | "UNVERIFIED_IN_QUIZ"
    | "INVALID_SOURCE_URL"
    | "FACTS_TABLE_MISMATCH"
    | "LONGEST_ANSWER_BIAS"
    | "WEAK_DISTRACTOR"
    | "ABSURD_DISTRACTOR"
    | "CIRCULAR_EXPLANATION"
    | "REPEATED_EXPLANATION";
  severity: "error" | "warning";
  field?: string;
  detail: string;
}

export interface AuditReport {
  runAt: string;
  totalQuestions: number;
  issues: AuditIssue[];
  summary: {
    errors: number;
    warnings: number;
    byIssueType: Record<string, number>;
    verifiedCount: number;
    draftCount: number;
    needsReviewCount: number;
    retiredCount: number;
  };
}
