import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import type { QuizConfig, ClientQuizConfig } from "@/types/question";

/**
 * Server-side answer grading. This is the single point in the codebase that
 * is allowed to know a question's correct answer before the student submits
 * one — every route/Server Component that hands questions to the client
 * must go through sanitizeQuestion() below, and grading must go through
 * gradeSubmission().
 *
 * Root cause this fixes: the quiz/mock-exam engine previously resolved the
 * full question bank — including `correctIndex` and `explanation` for every
 * question, in plaintext — inside a Server Component and passed it directly
 * as props into a "use client" component (QuizEngine). The entire answer
 * key for the requested test shipped in the initial page payload, before
 * the student answered (or even started) the quiz — readable via page
 * source or the RSC payload with zero interaction. Grading itself then
 * happened client-side by comparing `selectedIndex === q.correctIndex` in
 * the browser. This is the same class of defect fixed in CARE Real Estate's
 * Gate 13 remediation (see lib/quizGrading.ts in that repo), which this
 * file deliberately mirrors — same AES-256-GCM approach, same explicit
 * field-allowlist sanitization, same "never trust the client for
 * correctness" grading contract.
 *
 * DMV does not currently shuffle answer options (only question order), so
 * the token does not need to carry a shuffled-position mapping — the
 * canonical `correctIndex` is looked up fresh, server-side, by question id,
 * at grading time. The token still exists (rather than grading bare
 * {id, selected} pairs) so this matches the proven CARE pattern exactly and
 * is ready to carry a shuffled position the moment option-shuffling ships,
 * without changing the grading contract again.
 */

const FALLBACK_SECRET =
  "care-dmv-quiz-grading-fallback-7b2e9f4a1c6d8b3e5f0a2c7d9b4e6f1a-do-not-use-in-prod";

function getKey(): Buffer {
  const envSecret = process.env.QUIZ_GRADING_SECRET;
  const secret = envSecret && envSecret.length >= 16 ? envSecret : FALLBACK_SECRET;
  if (!envSecret || envSecret.length < 16) {
    if (process.env.NODE_ENV === "production") {
      // eslint-disable-next-line no-console
      console.warn(
        "[quizGrading] QUIZ_GRADING_SECRET is not set (or too short) in production. " +
          "Falling back to a hardcoded secret, which is NOT secure against anyone with " +
          "read access to this repository. Set QUIZ_GRADING_SECRET in the Vercel project's " +
          "environment variables to a long random string."
      );
    }
  }
  // AES-256 requires a 32-byte key; derive one from the secret string so any
  // length of QUIZ_GRADING_SECRET works.
  return createHash("sha256").update(secret).digest();
}

export interface AnswerTokenPayload {
  /** Question id this token was issued for. */
  id: string;
  /** Unix ms expiry. */
  exp: number;
}

const ALGO = "aes-256-gcm";
const IV_LENGTH = 12; // 96-bit IV, standard for GCM

/**
 * Generic AES-256-GCM encrypt of any JSON-serializable payload. Shared
 * primitive behind both the id-based token scheme below (used by the paid
 * quiz/mock-exam engine) and the self-contained token scheme in
 * sanitizeSampleQuestion/gradeSampleSubmission (used by the free public
 * sample-question widget, which has no server-side question registry to
 * look ids up in).
 */
function encryptJSON(payload: unknown): string {
  const key = getKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGO, key, iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString("base64url"), ciphertext.toString("base64url"), authTag.toString("base64url")].join(".");
}

/** Returns the decoded payload if the token decrypts/authenticates, otherwise null. Caller validates shape/expiry. */
function decryptJSON(token: unknown): unknown | null {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [ivB64, ciphertextB64, authTagB64] = parts;
  if (!ivB64 || !ciphertextB64 || !authTagB64) return null;

  try {
    const key = getKey();
    const iv = Buffer.from(ivB64, "base64url");
    const ciphertext = Buffer.from(ciphertextB64, "base64url");
    const authTag = Buffer.from(authTagB64, "base64url");
    if (iv.length !== IV_LENGTH) return null;

    const decipher = createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return JSON.parse(plaintext.toString("utf8"));
  } catch {
    // Wrong key, tampered ciphertext/auth tag, or malformed input — GCM
    // authentication failure throws, which we treat as "invalid token".
    return null;
  }
}

export function signAnswerToken(payload: AnswerTokenPayload): string {
  return encryptJSON(payload);
}

/** Returns the decoded payload if the token decrypts/authenticates and is unexpired, otherwise null. */
export function verifyAnswerToken(token: unknown): AnswerTokenPayload | null {
  const payload = decryptJSON(token) as Partial<AnswerTokenPayload> | null;
  if (!payload) return null;
  if (typeof payload.id !== "string" || typeof payload.exp !== "number") {
    return null;
  }
  if (Date.now() > payload.exp) return null;
  return payload as AnswerTokenPayload;
}

/** Comfortably covers a paused/resumed quiz or mock-exam session. */
export const DEFAULT_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export interface GradableQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  category: string;
  sourceRef?: string;
}

export interface SanitizedQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  category: string;
  sourceRef?: string;
  /** Opaque, encrypted. Send back unchanged at grading time. */
  token: string;
}

/**
 * Returns ONLY the fields safe to send to the client before an answer is
 * submitted. This is an explicit allowlist, not a spread-and-omit — a
 * spread pattern would silently leak any new field (e.g. `correctIndex` or
 * `explanation`) added to the source Question type in the future.
 */
export function sanitizeQuestion(
  q: GradableQuestion,
  ttlMs: number = DEFAULT_TOKEN_TTL_MS
): SanitizedQuestion {
  const token = signAnswerToken({ id: q.id, exp: Date.now() + ttlMs });
  return {
    id: q.id,
    question: q.question,
    options: q.options,
    category: q.category,
    sourceRef: q.sourceRef,
    token,
  };
}

/**
 * Sanitizes every question in a QuizConfig for handoff from a Server
 * Component to the "use client" quiz engine. This is the one place a full
 * QuizConfig (server-only, carries answer keys) is converted to a
 * ClientQuizConfig (safe to pass as a prop, persist to sessionStorage, or
 * ship in an RSC payload).
 */
export function sanitizeQuizConfig(config: QuizConfig, ttlMs: number = DEFAULT_TOKEN_TTL_MS): ClientQuizConfig {
  return {
    ...config,
    questions: config.questions.map((q) => sanitizeQuestion(q, ttlMs)),
  };
}

export interface GradeResult {
  correct: boolean;
  correctIndex: 0 | 1 | 2 | 3;
  correctText: string;
  explanation: string;
  sourceRef?: string;
}

/**
 * Grades a submission against a token and the canonical source question
 * (looked up server-side by the caller, by id — never trust a client-
 * supplied correct index or explanation). Returns null if the token is
 * invalid/expired or doesn't match the supplied question id.
 */
export function gradeSubmission(
  token: unknown,
  submittedId: string,
  selectedIndex: number,
  sourceQuestion: GradableQuestion
): GradeResult | null {
  const payload = verifyAnswerToken(token);
  if (!payload) return null;
  if (payload.id !== submittedId) return null;
  if (payload.id !== sourceQuestion.id) return null;
  if (typeof selectedIndex !== "number" || !Number.isInteger(selectedIndex)) return null;

  return {
    correct: selectedIndex === sourceQuestion.correctIndex,
    correctIndex: sourceQuestion.correctIndex,
    correctText: sourceQuestion.options[sourceQuestion.correctIndex],
    explanation: sourceQuestion.explanation,
    sourceRef: sourceQuestion.sourceRef,
  };
}

/**
 * ── Free public "sample questions" widget (PracticeTestPage / SampleQuestions) ──
 *
 * Unlike the paid quiz/mock-exam engine, the ~170 static landing pages that
 * embed the free sample widget hardcode their own `sampleQuestions` array
 * directly in each page.tsx file — there is no id or server-side registry to
 * look a question up by. Requiring one, or rewriting all ~170 pages, is out
 * of scope for this fix. Instead the token is self-contained: the answer key
 * for that specific question is encrypted into the token when the Server
 * Component (PracticeTestPage) renders, and decrypted only inside the
 * grading route when the client submits an answer. The client never has
 * access to the key that would let it read the token's contents.
 *
 * `optionsHash` binds a token to the exact question/options it was issued
 * for, so a token can't be replayed against a different question.
 */

/**
 * Sample-question pages are statically prerendered (`○` in `next build`
 * output, no `revalidate` export) — sanitizeSampleQuestion() runs once at
 * build time, not per-request, so whatever `exp` it bakes in is frozen into
 * the static HTML until the next deploy. DEFAULT_TOKEN_TTL_MS (24h) is
 * right for the paid engine's per-request session tokens, but here it would
 * make every sample-question token sitewide start failing exactly one day
 * after a deploy. Use a long TTL instead — there's no meaningful downside:
 * this is a free, unauthenticated, no-stakes sample quiz, and any real
 * content edit (question/options text) ships as a new deploy that
 * regenerates the token anyway (and `optionsHash` invalidates any token
 * that somehow survived from stale cached HTML).
 */
export const SAMPLE_TOKEN_TTL_MS = 400 * 24 * 60 * 60 * 1000; // ~400 days

function hashSampleQuestion(question: string, options: readonly string[]): string {
  return createHash("sha256").update(question + " " + options.join(" ")).digest("base64url");
}

export interface SampleAnswerTokenPayload {
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  optionsHash: string;
  exp: number;
}

export interface SampleGradableQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SanitizedSampleQuestion {
  question: string;
  options: string[];
  /** Opaque, encrypted — carries the answer key for this exact question. Send back unchanged at grading time. */
  token: string;
}

/**
 * Returns ONLY the fields safe to send to the client before an answer is
 * submitted (question + options), plus an opaque encrypted token. Explicit
 * allowlist, not spread-and-omit, for the same reason as sanitizeQuestion().
 */
export function sanitizeSampleQuestion(
  q: SampleGradableQuestion,
  ttlMs: number = SAMPLE_TOKEN_TTL_MS
): SanitizedSampleQuestion {
  if (![0, 1, 2, 3].includes(q.correctIndex)) {
    throw new Error(`sanitizeSampleQuestion: correctIndex out of range for question "${q.question}"`);
  }
  const token = encryptJSON({
    correctIndex: q.correctIndex as 0 | 1 | 2 | 3,
    explanation: q.explanation,
    optionsHash: hashSampleQuestion(q.question, q.options),
    exp: Date.now() + ttlMs,
  } satisfies SampleAnswerTokenPayload);
  return {
    question: q.question,
    options: q.options,
    token,
  };
}

/**
 * Grades a sample-question submission entirely from the encrypted token —
 * there is no server-side source question to look up by id. Returns null if
 * the token is invalid/expired/tampered, or doesn't match the question text
 * and options it's being submitted against.
 */
export function gradeSampleSubmission(
  token: unknown,
  question: string,
  options: string[],
  selectedIndex: number
): GradeResult | null {
  const payload = decryptJSON(token) as Partial<SampleAnswerTokenPayload> | null;
  if (!payload) return null;
  if (
    typeof payload.correctIndex !== "number" ||
    ![0, 1, 2, 3].includes(payload.correctIndex) ||
    typeof payload.explanation !== "string" ||
    typeof payload.optionsHash !== "string" ||
    typeof payload.exp !== "number"
  ) {
    return null;
  }
  if (Date.now() > payload.exp) return null;
  if (payload.optionsHash !== hashSampleQuestion(question, options)) return null;
  if (typeof selectedIndex !== "number" || !Number.isInteger(selectedIndex)) return null;
  if (selectedIndex < 0 || selectedIndex >= options.length) return null;

  const correctIndex = payload.correctIndex as 0 | 1 | 2 | 3;
  return {
    correct: selectedIndex === correctIndex,
    correctIndex,
    correctText: options[correctIndex],
    explanation: payload.explanation,
  };
}
