# Answer-Key Security — Incident History and Pre-Ship Checklist

**Status:** Permanent reference. This document exists because the same defect class — a graded surface transmitting the correct answer to the client before or independent of a real graded submission — has recurred in this codebase twice, independently, on two different surfaces, roughly one month apart, even though the first fix was real and correct for the surface it touched. Read this before touching any quiz/grading/mock-exam code, and required reading before shipping any new graded or quiz-like surface.

Cross-product context: this is one instance of CARE's universal "server-side answer protection" rule — see `CARE_UNIVERSAL_STANDARDS.md` (this repo's root) §3.

---

## Incident 1 — `435fee9` (2026-07-24): authenticated quiz/mock-exam engine

**Commit:** `435fee928009c6ca310c16b8b6c7d6c1323bf84e` — "Fix critical answer-key leak: quiz/mock-exam grading is now server-side"

**What leaked:** The authenticated quiz and mock-exam engines resolved the full question bank — including plaintext `correctIndex` and `explanation` for every question — inside a Server Component and passed it directly as props into a client component (`QuizEngine`). The entire answer key for the requested test shipped in the initial page payload, before the student answered or even started the quiz, readable via page source or the RSC payload with zero interaction. Grading then happened client-side (`selectedIndex === q.correctIndex` in the browser).

This was noted at the time as more severe than CARE Real Estate's own equivalent Gate-13-class defect (fixed 2026-07-22 in that codebase): Real Estate's leak was in the post-submit grading response, while this DMV leak was in the initial, pre-interaction fetch.

**Fix:**
- `src/lib/quizGrading.ts`: AES-256-GCM encrypted per-question tokens; an explicit field-allowlist `sanitizeQuestion()` (never spread-and-omit); `gradeSubmission()` that re-resolves the canonical question server-side by id and never trusts client-supplied correctness.
- `src/app/api/grade-answer/route.ts`: a shared, rate-limited grading endpoint (single + batch modes) used by both the quiz and mock-exam engines.
- Server Components (`quiz/[testId]`, `mock-exam/[examId]`) now sanitize the config before handing it to `QuizEngine` — client code only ever sees a `ClientQuestion` (id/question/options/category/sourceRef/token), never the answer.

## Incident 2 — `09a889b` (2026-08-25): public, unauthenticated Free Quiz widget

**Commit:** `09a889b86a66afd0eb1b9a051cab0f268df51747` — "Fix critical answer-key exposure in public Free Quiz widget"

**What leaked:** The `SampleQuestions` widget — embedded in ~170 static practice-test landing pages — shipped `correctIndex`/`explanation` to the client as plain props and graded answers in-browser, and also embedded the correct answer directly in the page's server-rendered Quiz JSON-LD structured data. Both were readable via view-source with zero interaction, no login required. This is the *same defect class* as Incident 1, but on a surface the first fix never touched — the authenticated engine had been fixed a full month earlier, and this public widget was never audited against the same standard.

**Fix:**
- Added `sanitizeSampleQuestion`/`gradeSampleSubmission` (self-contained AES-256-GCM tokens binding question id + options hash + explanation, reusing the existing cipher helpers from Incident 1's fix) and a new rate-limited `/api/grade-sample-answer` endpoint.
- `SampleQuestions` now POSTs the selected answer + token and only receives correctness/explanation after submission.
- The Quiz JSON-LD no longer embeds `acceptedAnswer`/`comment` for quiz questions.
- No login required, no changes to the ~170 individual landing pages, UX unchanged.

**Files touched:** `src/app/api/grade-sample-answer/route.ts` (new), `src/components/PracticeTestPage.tsx`, `src/components/SampleQuestions.tsx`, `src/lib/quizGrading.ts`.

## What the two incidents together prove

A general fix to "the quiz engine" does not cover every place a question and its answer are ever rendered. The two incidents are the same underlying mistake (answer shipped to the client before grading) recurring on two structurally different surfaces — one authenticated and dynamic, one public and embedded in ~170 static pages with structured data attached. **Fixing one graded surface is not evidence the next one is safe.** Every current and future surface that renders a question — quiz, mock exam, sample/preview widget, embedded structured data, a future feature not yet built — must be independently checked against the pre-ship checklist below, not assumed safe by association with an already-fixed surface.

## Pre-ship checklist — every graded or quiz-like surface, before shipping

Before shipping any new surface that displays a question with a correct answer (quiz, mock exam, practice widget, preview/sample component, structured data/JSON-LD, anything similar):

1. **View the actual server response.** Fetch the page/API response a real unauthenticated (or, if authenticated, minimally-privileged) client would receive, before any answer is submitted. Grep it for the raw correct-answer field name(s) (`correctIndex`, `correct`, `answer`, `explanation`) at any depth — props, RSC payload, embedded JSON, JSON-LD.
2. **Grading must happen server-side**, by re-resolving the canonical question by id on the server and comparing there — never `selectedIndex === question.correctIndex` (or equivalent) in client code.
3. **If a token is used to carry answer state between fetch and grading, it must be encrypted, not merely signed.** A signed-but-unencrypted token (HMAC, JWT-shaped) proves the token wasn't tampered with; it does not stop it from being read — literally decode it (`atob()`/base64url decode) and confirm the answer is not recoverable without the server-side key. Use authenticated encryption (e.g. AES-256-GCM), matching `src/lib/quizGrading.ts`'s pattern.
4. **Structured data (JSON-LD) must not embed the correct answer.** A `Quiz`/`Question` schema.org block must omit `acceptedAnswer`/`comment` (or any field carrying the correct answer) for any question a user hasn't yet answered.
5. **Check every surface independently — public and authenticated.** A fix to one engine does not cover a differently-built widget, a static-page embed, or a future surface. Treat "has this specific route/component been checked" as the question, not "has the quiz engine been fixed."
6. **Verify empirically, not by code review alone.** Make the actual HTTP request (or render the actual page) a real attacker would, and confirm the answer is genuinely absent — both incidents above were found by looking at what was actually transmitted, not by reasoning about the code in the abstract.
