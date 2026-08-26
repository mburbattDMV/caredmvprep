# CARE Universal Standards

**Status:** This is a local copy of CARE's universal cross-product standard, kept in this repo so its rules are available even if no other CARE repo is present on this machine. Canonical/master source (when available): `../care-admin-platform/CARE_UNIVERSAL_STANDARDS.md` (a relative sibling-directory reference, which is more portable than a bare absolute path but still assumes a common parent directory — treat this file's own local content as authoritative for this repo regardless of whether that sibling path resolves). If this local copy and the canonical copy ever diverge, the canonical copy is authoritative — resync this file to match it.

**Purpose:** a small index of permanent, cross-product lessons. Each rule is stated once, briefly, with a pointer to where the detailed/enforceable version already lives. This file is not the detailed rule itself — it never duplicates or restates the linked document's content at length.

---

## 1. Git/worktree safety (the Alabama incident)

Never run a destructive/discard git command (`git checkout --`, `git restore`, `git reset --hard`, `git clean`) without first running `git status` and inspecting what the target actually holds. Never whole-file-discard a file merely to undo a small temporary/test change if that file might also hold unrelated legitimate uncommitted work — stash, commit, or otherwise protect real work before any destructive testing operation.

**Real incident (2026-08-25, care-insurance):** ~429 lines of legitimate, uncommitted Alabama `mockExam`/`categoryStructure` work were destroyed when a deliberate test corruption in `src/data/questions/index.ts` was undone with an unstashed `git checkout -- src/data/questions/index.ts` during Series 7 defect investigation. No git object existed to recover it from.

Full rule: `care-insurance/docs/CARE_LEARNING_PLATFORM/04_ENGINEERING_STANDARDS.md` ("Never whole-file `git checkout --`/`restore` a file that may hold legitimate uncommitted work").

## 2. Repeated randomized real-engine mock-exam/blueprint certification (the Series 7 incident)

Static blueprint math alone does not certify a mock-exam engine. The real production selection engine must be exercised repeatedly (many real draws, not one deterministic test), and every generated mock exam must reconcile EXACTLY to the official blueprint — no loose tolerance. Shortfall/fallback redistribution logic must never silently cross official blueprint-group boundaries to compensate for an undersupplied group elsewhere; an unsatisfiable group must fail loudly, never distort silently.

**Real incident (fixed 2026-08-25):** Series 7's live Timed Mock Exam was selecting 11 questions for Major Job Function 1 against an official target of 9 on ~97 of 100 real draws — a gap a prior +/-1 tolerance was too loose to catch as a failure. Root cause was cross-group shortfall borrowing.

Canonical working pattern: `care-insurance/scripts/qa-product-registry-consistency.ts` §7 (30 real `careBrain.requestSession()` draws per mock exam, exact largest-remainder-apportionment reconciliation per blueprint group, no tolerance). Independently-arrived-at cross-product prior art: `carealestate-dre/docs/certification/CARE_CERTIFICATION_STANDARD.md` Gate 14 (`qa-shuffle-safety.ts`), which found and fixed a related but distinct question-*pool*-selection bias.

## 3. Server-side answer protection

No graded surface — authenticated or public/unauthenticated — may ever transmit the correct answer/explanation to the client before or independent of a graded submission, in any form (props, RSC payload, embedded JSON/JSON-LD, or a signed-but-unencrypted token — signing proves integrity, not confidentiality).

**Real incidents, DMV (two independent, per-surface recurrences of the same defect class):**
- `435fee9` (2026-07-24) — "Fix critical answer-key leak: quiz/mock-exam grading is now server-side." The authenticated quiz/mock-exam engines resolved the full bank (plaintext `correctIndex`/explanation) inside a Server Component and passed it as props into a client component; grading happened client-side. Fixed with AES-256-GCM encrypted per-question tokens and a server-side `/api/grade-answer` endpoint.
- `09a889b` (2026-08-25) — "Fix critical answer-key exposure in public Free Quiz widget." The same defect class recurred in the unauthenticated `SampleQuestions` widget (embedded in ~170 static landing pages) — plaintext answer/explanation shipped as props and embedded in the page's Quiz JSON-LD, graded in-browser — even though the authenticated engine had already been fixed a month earlier. Fixed with a self-contained encrypted-token/`grade-sample-answer` endpoint pair.

Full incident record and pre-ship checklist: `CAREDMVPREP.COM/docs/ANSWER_KEY_SECURITY.md`. See also `care-insurance/AGENTS.md` (`QUIZ_GRADING_SECRET` discipline — no fallback secret, product-specific value) and `carealestate-dre/docs/certification/CARE_CERTIFICATION_STANDARD.md` Gate 13 (transport-layer answer-key exposure, including the same signed-but-not-encrypted-token near-miss found independently in that codebase).

## 4. Scored questions vs. total-delivered/pretest questions

An exam's officially scored question count must never be conflated with its total delivered count (which may include unscored/pretest items). This exact confusion was found and corrected against primary sources in Mississippi, Hawaii, and Georgia.

Details: `care-insurance/docs/CARE_LEARNING_PLATFORM/27_INSURANCE_50_STATE_EXAM_BLUEPRINT_AND_LAUNCH_CERTIFICATION_AUDIT.md` and `24_CARE_INSURANCE_PRODUCT_REGISTRATION_AND_ACTIVATION.md`.

## 5. Improve the shared foundation before compensating in individual states/products

When a defect is found in one state/product's configuration, first determine whether it reveals a flaw in the SHARED engine/architecture before writing a state-specific workaround. (Real, already-practiced principle: Alabama's `mockExam` originally used a supply-proportional weighting workaround around a shared-engine bug; once the shared engine was fixed, the workaround itself needed re-evaluation rather than being blindly kept.)

Full rule: `care-insurance/docs/CARE_LEARNING_PLATFORM/04_ENGINEERING_STANDARDS.md` ("Every real defect should trigger a search for the underlying architectural or systemic weakness").

## 6. CONTENT ≠ REGISTERED ≠ LIVE ≠ CHECKOUT-READY ≠ CERTIFIED

These are five separate, independently-verifiable gates; passing one is never evidence of passing another.

Details: `care-insurance/docs/CARE_LEARNING_PLATFORM/24_CARE_INSURANCE_PRODUCT_REGISTRATION_AND_ACTIVATION.md` and `carealestate-dre/docs/certification/CERTIFICATION_LEVELS.md`.

## 7. Cross-product admin standard

Already established — just indexed here. Every CARE product's admin panel follows `care-admin-platform/CARE_ADMIN_STANDARD.md`.

## 8. This file's own maintenance rule

Adding a new permanent lesson here means adding one short pointer entry, never a paragraph of restated prose. If a rule needs more than 2-3 sentences, it belongs in a product-specific doc that this file links to. Keep this file small, permanently.
