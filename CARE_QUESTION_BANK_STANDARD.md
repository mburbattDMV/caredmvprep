# CARE Question Bank Development, QA & Certification Standard

**Status:** This is a local copy of CARE's Question Bank Development, QA & Certification Standard, kept in this repo so its rules are available even if no other CARE repo is present on this machine. Canonical/master source (when available): `../care-admin-platform/CARE_QUESTION_BANK_STANDARD.md` (a relative sibling-directory reference, which is more portable than a bare absolute path but still assumes a common parent directory — treat this file's own local content as authoritative for this repo regardless of whether that sibling path resolves). If this local copy and the canonical copy ever diverge, the canonical copy is authoritative — resync this file to match it.

**Version 1.0 — Established 2026-08-25.** Synthesized from four independently-developed CARE product efforts: CARE Real Estate/DRE's 14-gate certification suite (the largest and most mature — Arizona reference implementation, 50-state DRE rollout), CARE DMV's QA classification protocol and two real answer-key-leak incidents, CARE Insurance's psychometric-audit/citation-discipline standard and the Series 7 real-engine mock-exam incident, and CARE Nursing's Knowledge-Base-to-Certification pipeline and fact-versioning discipline. This document does not preserve any one product's numbering scheme; every section below is a reconciled decision, not a concatenation. Where the four source efforts genuinely disagreed on a number or a rule, §8 states both original positions and the resolution — nothing is silently dropped or silently picked.

**Relationship to `CARE_UNIVERSAL_STANDARDS.md`:** That file's §9 points here. This is the detailed, enforceable standard; the universal-standards file stays a short index and never restates this document's content at length.

---

## 1. Pipeline Overview

Every CARE question bank — current or future product — moves through the same conceptual lifecycle, from official research to production certification. The stages below are sequential in the sense that a later stage should not begin while an earlier stage has unresolved blocking findings, but see the **Non-Substitution Principle** immediately after the table: several of these stages are parallel, non-substitutable layers, not a simple checklist to click through once.

| # | Stage | Purpose |
|---|---|---|
| 1 | Official research | Identify the real exam provider/administrator and confirm it independently (Pearson VUE, PSI, AMP, a state board, NCSBN, etc.) |
| 2 | Official blueprint / content outline | Retrieve the actual current content outline or blueprint document, not a prep-book approximation |
| 3 | Exam specifications | Question counts (scored vs. total-delivered — see §7), time limits, fees, format, number of sections |
| 4 | Scoring mechanic | Determine and record HOW the real exam is scored — raw percent, scaled score, or other — before building any practice-score framing (see §7) |
| 5 | National-core / shared-core analysis | For multi-jurisdiction products: identify what content is genuinely shared vs. jurisdiction-specific, before authoring, to avoid duplicated or contaminated content later |
| 6 | State/product architecture | Decide the technical shape (shared bank + overlays, per-state banks, blueprint groups, etc.) that the verified research in steps 1–5 actually supports |
| 7 | Verified source facts | Establish the factual foundation — see §2. No question may be authored before this stage produces a citable, verified fact |
| 8 | Question authoring | Write questions against verified facts only, following the writing standards embedded in §4 (distractor quality, no filler, no phantom citations at authoring time) |
| 9 | Factual QA | Verify every Tier-2 (externally-sourced) claim against its primary source (see §2, §5.1) |
| 10 | Citation QA | Verify every citation actually supports the claim it's attached to, in both correct answers and distractors (see §5, categories: phantom citation, citation residue) |
| 11 | **Correct-answer consistency QA** | Confirm `correctIndex`/`correct:` actually points at the answer the stem, options, and explanation agree on — see the callout below for why this runs here, immediately after factual/citation QA and before any of the layers in step 12 |
| 12 | Editorial QA, Structural QA, Psychometric QA, Exploitability/security testing, Transport-layer answer-key security, Assembled-bank QA, Real-randomized-engine QA | Six **separate, non-substituting** layers — see the Non-Substitution Principle below. Order among these six is not itself load-bearing; completeness of all six is |
| 13 | Independent/blind-derivation certification | A reviewer who did not author the content re-derives answers blind and reconciles (see §9) |
| 14 | Regression QA | Confirm no previously-fixed defect class has recurred (see §10) |
| 15 | Production certification | The formal, signed decision — Certified / Conditionally Certified / Not Certified (see §9) |

### Why correct-answer consistency moved early

CARE DMV's QA standard names a wrong `correctIndex` "the most dangerous defect type" specifically because it defeats every downstream check while looking clean: a question with a correct stem, correct options, and a correct, well-written explanation can still teach a student to select the wrong option if the index pointer itself is wrong, and no editorial, structural, or psychometric reviewer is looking for that once the surrounding prose reads well. CARE Real Estate's own certification pipeline (`CARE_CERTIFICATION_PIPELINE.md`) independently arrived at the same placement — Stage 4, immediately after Primary Source Verification and before Editorial Review — for the same underlying reason, without either product being aware of the other's reasoning at the time. Both lines of evidence agree: **verify the pointer to the correct answer before spending review effort on the prose around it.** A defect in the pointer invalidates the value of every review layer that runs before it's caught.

### The Non-Substitution Principle (named explicitly, apply everywhere)

**Passing one QA/certification layer is never evidence of passing another.** Editorial QA, structural QA, psychometric QA, exploitability testing, transport/answer-key security, assembled-bank QA, and real-randomized-engine QA each catch a different, non-overlapping failure mode:

- **Editorial QA** catches whether the content is well-written, unambiguous, and pedagogically sound — it does not catch whether the runtime shuffles answer order, or whether the API leaks the answer key.
- **Structural QA** catches missing fields, duplicate IDs, and malformed records — it says nothing about whether the content is factually correct or exploitable by a length-guessing strategy.
- **Psychometric QA** catches statistical bias patterns (length, position, hedge-language, absolute-language) in the *source* bank — it says nothing about whether those patterns are actually reachable by a real student once runtime shuffling and API sanitization are applied (see the DRE Arizona incident below), and nothing about whether the underlying facts are true.
- **Exploitability/security testing** simulates a guessing strategy against the bank's content — it does not verify the transport layer, and a bank can score 0% under simulation while still handing the answer key to any student who opens DevTools.
- **Transport-layer answer-key security** verifies what the server actually transmits — it says nothing about content quality, and a bank can be perfectly secure in transport while still being exploitable by a length-guessing strategy if a shuffle utility is broken.
- **Assembled-bank QA** verifies that a real, complete assembled bank (all states/topics/groups present, no orphaned or starved category) is internally coherent — it does not verify runtime randomized selection behavior.
- **Real-randomized-engine QA** verifies the actual production selection/shuffle code path across many real draws — it does not verify content accuracy, and a perfectly shuffled, perfectly sanitized question can still come from a factually wrong bank.

This is not a hypothetical concern. CARE Real Estate certified Arizona's shuffle-wiring (Gate 12) and, hours later, an adversarial audit found the transport layer leaked the full answer key regardless of shuffle correctness (Gate 13) — a bank that passed the shuffle gate was, in the sense a student would care about, *more* exploitable than a bank with no shuffle at all, because reading a Network tab requires no domain knowledge. A day later, a live audit of Georgia found the question-*pool* selection (not the option-order shuffle) was biased at production scale even though the option-shuffle utility (Gate 12) and the local exploitability simulation both looked clean — because pool-selection bias only shows up when the real endpoint is sampled at real scale, not when a uniform-random simulation is run offline. Each of these was a genuinely separate defect, invisible to the other gates. **Treat every layer as mandatory and independent; never infer one from another.**

---

## 2. Verified-Source-Facts Discipline (Universal Principles)

Every CARE product must observe these principles before any question is authored, regardless of how simple or fact-dense the underlying content is:

1. **Verified source facts must exist before question authoring.** A question is only as trustworthy as the fact(s) it's built on; authoring against an unverified claim propagates that uncertainty invisibly into content that reads as confident and final.
2. **Never author a question against an unresolved or unverified fact.** If evidence is ambiguous or a primary source can't be reached, the honest state is "unresolved" or "unverified-pending" — not a guess dressed up as fact. See §5.1's Tier-1/Tier-2 framework for how to classify and act on this.
3. **Maintain traceability from authoritative evidence to the question.** A reviewer (or an automated tool) must be able to walk from any question back to the specific source that justifies its correct answer. What the traceability chain actually looks like is a product's own design choice — see the schema note below — but the property (question → cited evidence, resolvable) is universal.
4. **Track version/change-awareness for source facts.** Authoritative sources change (statutes are amended, exam blueprints are revised, FDA labels are updated). A product must be able to tell whether a question was authored against the current version of its source, or a version that has since been superseded.
5. **Detect and flag stale sources.** Once version-awareness exists, it must be checked mechanically, on a standing basis — not only remembered informally. A source going stale without the questions built on it being flagged is exactly how a product ships content it would have caught if it had looked.
6. **State honest uncertainty rather than guessing.** When a citation can't be verified, when a scoring mechanic isn't published, when a source is inaccessible — the correct action is to say so explicitly (Unverified-Pending, Unknown, Draft-watch — whatever term the product uses) and choose the safest production action (freeze, defer, lock the feature), never to fill the gap with a plausible-sounding guess.

### What is and isn't universal here

CARE Nursing built a specific implementation of these principles suited to a fact-dense clinical domain: a five-layer graph (Clinical Facts → Clinical Concepts → Learning Objectives → Scope-of-Practice Overlays → State Overlays → Materialized Questions → Certification) with a five-tier verification-status taxonomy (Verified / Partially Verified / Verified by convergence / Unresolved / Draft-watch) and an explicit Fact-versioning mechanism (`FACT-NNNvN`, a `Superseded By` field, and `validate_traceability.py --stale` to mechanically find every downstream question still citing a superseded version).

**This specific schema is Nursing's own implementation choice, made because nursing content is unusually fact-dense, cross-referential, and subject to genuine clinical revision (drug half-lives, FDA labeling, protocol changes).** It is not being universalized as-is. A future product with well-defined, relatively static content (a state licensing exam built from a fixed blueprint and a state statute book, for example) satisfies the same six principles above with a much flatter structure — for instance, a simple binary or ternary gate per citation: **Verified** (read from the primary source, dated) / **Unverified-Pending** (source access failed, documented) / **Superseded** (the source has since changed, flagged for re-check). A product should build Nursing's fuller graph only if its own content genuinely warrants that granularity — evidence of the trigger condition actually firing (as Nursing found when 9 of 20 early Facts already carried "flag: re-check this" notes), not by default imitation.

---

## 3. Consolidated Defect & Bias Taxonomy

One taxonomy, reorganized by which QA layer catches it rather than by product of origin. DRE's original D-01–D-12 numbering is not preserved — every category below states what it is, which layer catches it, and (where useful) which product's incident history it draws on.

| Category | Failure mode | Caught by |
|---|---|---|
| **Correct-answer/index inconsistency** | `correctIndex`/`correct:` points to the wrong option even though stem/options/explanation are internally consistent about the right answer — DMV's "most dangerous defect type," defeats every downstream check | Correct-answer consistency QA (§1, step 11) |
| **Answer-position bias** | Correct answer clusters at one position (e.g., "B") across the bank, at a rate a length- or position-guessing student could exploit | Psychometric QA — conditional gate, see §8 |
| **Longest-answer bias** | Correct answer is systematically the longest option, exploitable by an "always pick longest" strategy | Psychometric QA + exploitability simulation |
| **Weak/filler distractors** | A wrong answer is generic, content-free, or absurd enough to eliminate without domain knowledge ("No action is required," "This varies") | Editorial QA |
| **Hedge-language bias** | Distractors disproportionately carry hedging language ("might," "sometimes") relative to correct answers, making hedge-vs-firm phrasing itself a tell | Psychometric QA |
| **Absolute-language bias** | Distractors disproportionately carry absolute words ("always," "never," "all," "none") as their distinguishing wrong feature, making absolutism itself a tell | Psychometric QA |
| **Repeated-phrase bias** | The same distinctive multi-word phrase appears overwhelmingly on the distractor side (or correct side) across many questions — a learnable tell even when each individual sentence is fine | Psychometric QA |
| **Explanation-answer leakage** | The explanation or a distractor rationale references an option by letter/position ("choice A," "the last option") — breaks silently the moment runtime shuffling reorders options | Editorial QA / structural QA |
| **Grafted distractors** | A wrong answer describes a real concept from a different domain/topic than the stem asks about, rather than a plausible misconception in the *same* domain | Editorial QA (independent reviewer) |
| **Boilerplate distractors** | Distractors that are template-generated or reused across many questions without being tailored to the specific stem, reducing effective distractor count | Editorial QA |
| **Citation residue** | A citation left over from an editing pass that no longer matches the current content of the option/explanation it's attached to (statute renumbered, rule amended, question edited without updating the citation) | Citation QA |
| **Phantom citation** | A citation to a real or invented statute/rule section that does not contain the claimed rule at all | Citation QA |
| **Statutory citation error (subdivision-level)** | Right statute, wrong subdivision — a narrower version of a phantom citation | Citation QA |
| **Cross-state/cross-jurisdiction contamination** | Content, a fact, or a rule from one state/jurisdiction leaks into another's bank without being re-verified against that jurisdiction's own controlling authority | Factual QA + assembled-bank QA |
| **Two-correct-answer defect** | Two or more options are each independently defensible as correct given the stem | Editorial QA |
| **Cross-question inconsistency** | Two questions in the same bank teach conflicting answers about the same rule | Editorial QA (cross-question consistency check) |
| **Trust/timing-rule conflation** (domain-specific instance, generalized) | A rule that varies by transaction/case type is applied using the wrong type's variant — DRE's trust-account-timing pattern generalizes to any domain with type-conditional rules | Factual QA |
| **Exam-format staleness** | A question states format details (count, fee, time limit, pass score) that have changed since authoring | Factual QA (must be re-verified against the *current* handbook, not assumed stable) |
| **Duplicate question** | Two questions share an identical or near-identical stem/tested fact | Structural QA |
| **Stem-answer overlap** | The correct answer echoes the stem's exact phrasing in a way that identifies it without content knowledge | Editorial QA |
| **Math key error** | The explanation's arithmetic doesn't match the keyed correct answer | Factual QA (self-verifying, Tier 1) |
| **Positional/re-shuffle instability** | A resumed session re-shuffles options or loses the answer mapping between save and resume | Real-randomized-engine QA |
| **Transport-layer answer-key exposure** | The server transmits `correct`/`explanation`/an equivalent field, or a reversible (signed-but-not-encrypted) token, before or independent of grading | Transport-layer answer-key security |
| **Question-pool selection bias** | The pool-selection/randomization step upstream of option shuffling is non-uniform (e.g., a biased comparator-based sort), so a "clean" simulation doesn't reflect what a real endpoint actually serves | Real-randomized-engine QA |
| **Blueprint-group reconciliation failure** | A real randomized draw's per-group question counts don't reconcile exactly to the official blueprint's apportioned share | Real-randomized-engine QA |
| **Scored-vs-delivered count conflation** | An exam's officially scored question count is confused with its total delivered (including unscored/pretest) count | Factual QA (§7) |

---

## 4. "Metrics Identify Candidates, Not Mandates"

**METRICS IDENTIFY REVIEW CANDIDATES. METRICS DO NOT AUTOMATICALLY JUSTIFY EDITS.**

Every automated QA script — length-bias detectors, position-bias counters, hedge/absolute-language scanners, near-duplicate finders — produces a list of *candidates for human review*, never a list of required edits. Classification and editorial judgment must occur before any question is changed, every time, without exception.

CARE DMV's longest-answer classification protocol is the concrete, reusable version of this principle and should be adopted platform-wide whenever a length- or position-based metric flags a question:

- **Category A — Legitimately longer. Do not edit.** The correct answer requires more length because of a list of specific required conditions, a two-part rule where both parts are required, a legally/clinically critical qualifier that is the entire point of the question, a multi-step procedure, or a trivially small (<10 character) gap that is noise. **Editing a Category A question to satisfy a percentage target is a quality regression, not an improvement** — say this explicitly to anyone running a remediation pass.
- **Category B — Correct answer unnecessarily verbose.** Move explanatory content into the `explanation` field; shorten the option to the minimum wording needed to identify it unambiguously.
- **Category C — Distractors too short/weak.** Replace with plausible misconceptions of comparable length; never change the correct answer to fix this.
- **Category D — Both B and C apply.**

No question flagged by any metric may be edited without first being classified into one of these categories (or an equivalent scheme), and the classification must be documented — not implied by the fact that an edit happened.

---

## 5. Two-Tier Evidence Standard (Tier 1 / Tier 2)

Every potential defect must be classified before any edit is made:

- **Tier 1 — Self-verifying.** The source file alone contains all evidence needed (math mismatches, key/explanation contradictions, exact duplicates, an internally-contradictory citation). Fix immediately; document the internal proof.
- **Tier 2 — Requires primary-source verification.** The defect depends on facts outside the file (statutes, administrative rules, exam handbooks, clinical guidelines, licensing policy). Verify against the current controlling authority before editing — never substitute model recall, training-data consensus, or prep-material agreement for a primary source. If the primary source is inaccessible, classify as **Unverified-Pending**, document the access failure, and choose the safest production action.

### 5.1 Source hierarchy for Tier 2 verification

| Priority | Source type | Examples |
|---|---|---|
| 1 (authoritative) | Official government/regulator publications | State law books, administrative rule chapters, official candidate handbooks (Pearson VUE, PSI, AMP, NCSBN), FDA labels |
| 2 (authoritative secondary) | Official agency pages | State licensing boards, exam-vendor state pages |
| 3 (corroborating) | Enacted statutes via legal databases | FindLaw, Justia, Cornell LII — verify the version/effective date |
| 4 (signal only) | Prep-material or secondary-source consensus | Multiple prep sources agreeing is a reason to investigate the primary source, never a substitute for reading it |

When citing authority in an explanation, always include a version indicator (statute year, handbook date, effective date, FDA label revision date).

### 5.2 Citation discipline

- Never fabricate a citation. If unsure a specific section number is real, use a general content-outline reference instead of guessing a number.
- Any citation carrying a specific checkable number (statute section, dollar threshold, percentage, day count, age threshold) is a high-risk claim — verify it against its primary source before trusting it.
- Verify the citation matches the *actual subject matter* of the claim, not merely that the cited section exists — a real, valid citation attached to the wrong topic is still a defect (citation residue).
- Don't let an explanation state more than its cited source actually says (no added qualifiers, no invented exceptions).
- One legal/factual issue, one research effort, one consistent update: when multiple questions depend on the same rule, resolve it once from the controlling authority and apply the finding to every affected question in a single pass — never fix the same rule on different dates from different sources.

---

## 6. Editorial Discipline

Every wrong answer must:
1. State a specific, plausible misconception — not a vague or content-free alternative.
2. Require content knowledge to eliminate — a student who knows the subject can rule it out; one who doesn't, cannot.
3. Be internally coherent — something that could plausibly be believed or taught, not obviously absurd.
4. Match the correct answer's domain — the same category of information/legal or clinical area, not a different concept entirely (grafted distractor).
5. Be comparable in length to the correct answer.

Never change a correct-answer index unless a separate, verified content defect proves the current key is wrong — length, style, or editorial taste are never grounds for changing a correct answer.

Every explanation must do more than justify the correct answer: it must state, for every option, why that specific option is right or wrong, name the concept being tested, and (per Nursing's Learning Quality standard, adoptable platform-wide) leave the student with one clear takeaway even if they forget the specific question. An explanation that only says "this is wrong because it isn't the correct answer" for a distractor does not meet this bar.

Explanations and distractor rationales must never reference an option by letter or position — any surface where answer order is shuffled at runtime silently breaks a positional reference (this was CARE Insurance's single most common defect class in one audit pass — 282 instances).

---

## 7. Scored vs. Total-Delivered/Pretest Question Count Discipline

An exam's officially **scored** question count must never be conflated with its **total delivered** count, which may include unscored/pretest items an official exam administers but doesn't grade. This exact confusion was found and corrected against primary sources in three real states (Mississippi, Hawaii, Georgia) during CARE Insurance's blueprint audit. Whenever an exam-spec number is recorded anywhere in a product (documentation, configuration, a mock-exam blueprint), record explicitly **which one** the number is — scored or total-delivered — and where it was verified.

The same discipline extends to scoring mechanic: record whether an exam is scored as a raw percentage, a scaled score, or something else, and never imply a raw practice-percentage equals an official scaled score unless a real, published conversion exists. The safe default for any unresearched exam is an explicit "unknown" scoring-mechanic classification, never a silent assumption of raw-percent.

---

## 8. Resolved Conflicts

Four source standards disagreed on specific numbers or rules. Each is resolved here, explicitly, rather than left to compete silently across products.

### 8.1 Independent-review sample size

**Conflict:** CARE Insurance's release-certification standard requires a flat, reproducible random sample of **at least 100 questions per bank** for blind-derivation review (statistical adequacy, size-independent). CARE Real Estate's Gate 7 uses a tapered table keyed to the size of a batch of *edited* questions: <25 → 100%, 25–50 → 25, 51–100 → 30, >100 → 40 (proportional cost fairness — a full-bank certification shouldn't require re-reviewing every question every time a small batch is touched).

**Reconciliation:** these two rules serve different moments (a full-bank pre-release audit vs. a per-batch independent distractor review) and both underlying goals are legitimate — a full-bank audit needs a sample large enough to be statistically meaningful regardless of bank size, while a small edited batch shouldn't be forced into a disproportionately expensive review. Reconciled as one size-tapered table with a hard floor that never drops below the point of statistical adequacy for a *whole-bank* certification pass:

| Population being sampled | Sample size |
|---|---|
| < 25 | 100% |
| 25–50 | 25 |
| 51–100 | 30 |
| 101–250 | 40 |
| 251–1,000 | 100 (fixed floor) |
| > 1,000 | max(100, 10% of population) |

Apply this table to *both* contexts (a batch of edited questions, or a full bank being certified for release) using whichever population size is actually under review at that moment. The floor of 100 for any population over 250 preserves Insurance's statistical-adequacy goal; the tapered lower tiers preserve DRE's proportional-cost-fairness goal for genuinely small batches.

### 8.2 Answer-position bias: advisory or hard gate

**Conflict:** CARE Real Estate treats source-level answer-position distribution as **advisory only** once Gate 12 (verified runtime shuffle) passes — a severe source-level skew is real but not student-reachable if every graded surface demonstrably shuffles and remaps before render. CARE Insurance and CARE DMV both treat position distribution as a **hard gate** (chi-square significance test; DMV's 35%/15% thresholds), on the reasoning that "there is never a good reason for 60% of correct answers to sit in one position."

**Reconciliation — conditioned on verified evidence, not by product identity:**
- **If the runtime demonstrably shuffles answer order per-presentation, and that shuffle is independently verified** (a real, automated check of the actual production code path — not an assumption that shuffling "probably" happens) — source-level positional distribution is **advisory**: worth fixing opportunistically, worth noting in a certification report, never itself a certification blocker.
- **If no verified runtime shuffle exists** (a static-order surface, an SEO page, a product that hasn't built shuffling, or one where shuffle-wiring hasn't been independently checked) — source-level positional distribution is a **hard gate**, because in that case the source-level skew *is* the actual student-facing exposure, not a mitigated pattern.

State which condition applies, explicitly, in every certification report — never leave "is this gate advisory or hard" ambiguous or assumed from a product's general reputation.

### 8.3 Length-bias / longest-answer thresholds

**Conflict:** CARE Real Estate's remediated thresholds are ≤45% (target ≤40%) uniquely-longest-correct with a 0.0% simulated pass rate and a bank-calibrated max-score ceiling; CARE Insurance's psychometric audit uses a 25–35% band; CARE Nursing tolerates up to ~35% (chance-level across 4 options, with tolerance); CARE DMV does not fix a number at all and instead runs every flagged question through the A/B/C/D classification protocol (§4) before deciding whether a real defect exists.

**Reconciliation:** the one universal, non-negotiable requirement is the **exploitability simulation pass rate must be 0.0%** for every strategy tested (always-longest, unique-longest, most-detailed) — that is a real behavioral guarantee, not a stylistic target, and no product may weaken it. The specific *source-level percentage thresholds* (45%, 35%, etc.) are legitimately bank-and-domain-calibrated triggers for review, not universal pass/fail numbers — a product should calibrate its own threshold empirically (via a topic-stratified simulation against its own bank, per DRE's Gate 4 methodology) rather than importing another product's number wholesale. Every flagged question must go through DMV's A/B/C/D classification (§4) before being edited, regardless of which threshold triggered the flag.

### 8.4 QA vs. Certification as one document or two

**Conflict/design question:** CARE Real Estate splits its standard across five documents (Certification Standard, QA Standard, Defect Catalog, Certification Pipeline, Certification Levels/Matrix). CARE Nursing deliberately splits into exactly two documents with a stated reason: QA (`30_...`) defines whether content meets the quality bar; Certification (`31_...`) defines whether QA-passing content is *approved for use* — a separate, higher bar requiring human judgment QA can't substitute for, kept apart specifically so a QA failure and a Certification denial are never confused with each other in reporting.

**Reconciliation:** Nursing's two-way conceptual split (continuous QA process vs. formal certification gate) is preserved as **two sections of this one consolidated file** (§9 covers certification levels/independent review; the rest of this document is the QA layer), not as two separate canonical files. Reasoning: DRE's five-document split exists mostly for historical/incremental reasons (each document was added at a different point as a new incident required it), not because the underlying content can't coexist — and a future product adopting this standard should not have to context-switch between five files to understand one lifecycle. The QA-vs-Certification *conceptual* boundary is real and worth keeping legible (see §9's framing), but it does not require physical file separation once the whole thing is authored as one coherent document from the start.

---

## 9. Independent Review, Certification Levels, and the QA/Certification Boundary

**QA is continuous; Certification is a gate.** Automated and editorial QA (§2–§7) runs continuously — after every batch of new or edited content, not once at the end of a pipeline. Certification is the separate, formal decision that QA-passing content is approved for student-facing production use. A bank can be 100% QA-clean and still be denied Certification (an independent reviewer finds a real edge case; a psychometric review with real response data reveals a problem invisible to static QA). Never let "this looks QA-clean" substitute for an actual Certification decision — no bank is ever described as more than its precise pipeline stage (Draft / QA-Passed / Editorially Reviewed / Certified) until a Certification Report exists naming it Certified.

### 9.1 Certification is not one guarantee

Not every "Certified" bank carries the same guarantee. Adopt a named certification-level scheme (Level A/B/C or equivalent) per product, and state explicitly, every time, which gates a given certification actually covered — full independent-reviewer sign-off and systematic citation audit vs. a narrower workflow. A "Certified" label that doesn't say which level it is invites exactly the confusion CARE Real Estate's `CERTIFICATION_LEVELS.md` was created to prevent, after discovering that its own first batch of certified states had received meaningfully different amounts of rigor under the same label.

### 9.2 Independent-reviewer requirement

Self-review by the person who authored or edited content does not satisfy an independence requirement. A distractor-quality review, a blind-derivation certification pass, or a Clinical/Professional Review must be performed by someone who did not write the content under review. If only one qualified human is available, the minimum acceptable substitute is a documented time-gap review (at least 48 hours after writing) with a record of exactly what was reviewed and why each item was accepted — not a same-session self-check.

### 9.3 Certification Report

Every Certification decision (a single batch, a full bank, an incremental addition) produces a permanent record — not a transient status flag — naming: what was audited, the automated QA results, manual/editorial QA results, independent/clinical review status and reviewer credential, psychometric review status, traceability status, the certification level and decision (Certified / Certified with named exceptions / Not Certified / Deferred), and any outstanding limitations. A Certification Report should never imply a bank is issue-free if it isn't — "Certified with known, tracked limitations" is a legitimate, honest outcome. Future re-certification produces a new report referencing the prior one; it does not edit the prior report.

---

## 10. Recurring-Defect Escalation Protocol

**ISOLATED → REPEATED → SYSTEMIC.**

- **ISOLATED:** A defect appears once, in one question or one state/product instance. Investigate and fix locally.
- **REPEATED:** The same defect class appears more than once. Investigate the common root cause and search for — and fix — every other instance of that same pattern, not just the ones already found.
- **SYSTEMIC:** The defect traces to a shared foundation (a shared engine, a shared utility, a shared architectural assumption) rather than to any single state/product's content. Stop patching individual instances and search the entire relevant repository or shared platform for the defect class before considering it closed.

**Standing rule: fix the shared foundation before compensating in individual states/products.** Two independent, real incidents prove this is not theoretical:

- CARE Insurance's Series 7 mock-exam engine was selecting the wrong number of questions for a blueprint group on ~97 of 100 real draws; the root cause was a shared cross-group shortfall-borrowing behavior in the selection engine itself, not a Series-7-specific data problem. Fixing the shared engine (not adding a Series-7-specific workaround) is what actually closed the defect, and it required re-evaluating an existing state-specific workaround (Alabama's supply-proportional weighting) that had been built *around* the earlier version of the same shared bug.
- CARE DMV's two answer-key-leak incidents (`435fee9`, then `09a889b` a month later) were the *same defect class* — a graded surface transmitting the correct answer to the client before or independent of grading — recurring on a structurally different surface after the first fix had already shipped and been treated as done. The lesson recorded in DMV's own incident history is explicit: "a general fix to 'the quiz engine' does not cover every place a question and its answer are ever rendered... fixing one graded surface is not evidence the next one is safe." Every current and future surface must be independently checked against the same standard, not assumed safe by association.

A defect that reveals a systemic weakness must trigger a platform-wide search before certification of any single instance is considered complete.

---

## 11. Real-Engine / Randomized-Selection Certification Requirement

**Static blueprint math is insufficient wherever runtime selection or randomization exists.** A simulation that samples uniformly at random by construction can look perfect while the real production selection engine — the one students actually experience — behaves completely differently. Certification must exercise the **real production selection engine**, repeatedly (many real draws, not one deterministic test or a hand-verification), and reconcile every generated exam against the official blueprint, group by group, with **no loose tolerance** — an apportionment either reconciles exactly or it's a failure.

This requirement comes directly from two real, independent incidents:

- **The Series 7/Alabama incident (CARE Insurance):** a live mock exam was selecting 11 questions for a blueprint group against an official target of 9 on ~97 of 100 real draws — a gap a prior ±1 tolerance was too loose to ever catch as a failure. The permanent fix pattern (`qa-product-registry-consistency.ts` §7): run the real `careBrain.requestSession()` mock-mode path (not a hand-verification) 30 times per exam, and assert every draw's per-blueprint-group count matches an independently-computed largest-remainder apportionment **exactly**.
- **The Georgia shuffle-algorithm incident (CARE Real Estate):** a bank's local exploitability simulation showed 0.0% pass rate, but live production sampling showed 76–86% — because the question-*pool* selection step (a biased `sort(() => Math.random() - 0.5)`) was non-uniform at real scale, even though the option-*order* shuffle was already correctly implemented and independently verified. The fix routed pool selection through the same already-correct Fisher-Yates utility used for option shuffling; the certifying evidence required a live production sampling check, not just a corrected local simulation.

**Standing rule:** shortfall/surplus redistribution logic must never silently cross official blueprint groups to compensate for an undersupplied group elsewhere — an unsatisfiable group must fail loudly, never distort silently by borrowing from another group's allocation.

---

## 12. Regression QA

A fixed defect class must be checked for recurrence in every future certification pass — not verified once and assumed permanent. Concretely:

- After every batch of edits, re-run the full defect-detection suite and confirm no previously-closed defect count has increased.
- Spot-check a random sample of edited questions to confirm no correct-answer index was inadvertently changed by a batch/regex edit process (this is a distinct, real failure mode — a substitution error can flip a correct answer with no obvious error message).
- When a shared-utility fix closes a systemic defect (§10), re-verify every previously-certified instance that used the old, broken shared code, rather than assuming a prior certification remains valid by default.
- Regression QA is not a one-time step before initial certification — it runs at every subsequent certification pass for the life of the product.

---

## 13. Continuous QA vs. End-of-Pipeline QA

Automated QA is not a gate that runs once, at the end, before certification — it runs after every production batch, as a standing part of the pipeline. A defect caught within the batch that introduced it is cheap to fix, with full context still fresh. A defect discovered only during a pre-certification audit, potentially across hundreds of already-shipped questions, is expensive and context-poor to fix. Certification-scale audits (full-bank re-verification, random-sample deep review) still happen at defined milestones — a fixed content-volume milestone, whenever a domain/state batch becomes review-ready, and always immediately before any certification decision — but these are *in addition to* continuous per-batch QA, never a replacement for it.

---

## 14. Where Product-Specific Documentation Lives

This standard is the cross-product methodology layer. Each product's own instantiation of it — the exact scripts, numeric thresholds calibrated to that product's own bank, state/domain-specific rule tables, and per-batch/per-state certification reports — belongs in that product's own repository, not in this file or its local copies. There is no single mandated folder name (existing products use `docs/certification/`, `docs/QA/`, `scripts/qa/`, and a product's own numbered `docs/NN_*.md` series — all are acceptable). What's mandatory is discoverability, not location: **every product's own AGENTS.md/CLAUDE.md must point to both this file and that product's own certification/QA documentation, immediately after the `CARE_UNIVERSAL_STANDARDS.md` pointer** — never only one or the other. This keeps every local copy of this file identical across products (no per-repo customization of the shared body) while still guaranteeing a new contributor can reach product-specific documentation directly from the repo's own AGENTS.md/CLAUDE.md, without needing this file itself to name every product's own paths.

## Revision History

| Date | Version | Change |
|---|---|---|
| 2026-08-25 | 1.0 | Initial synthesis from CARE Real Estate/DRE, CARE DMV, CARE Insurance, and CARE Nursing source standards. |
