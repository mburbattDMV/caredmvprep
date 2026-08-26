# CARE_STUDENT_INTELLIGENCE_STANDARD.md

**Status:** This is a local copy of CARE's canonical Student Intelligence standard, kept in this repo so its rules are available even if no other CARE repo is present on this machine. Canonical/master source (when available): `../care-admin-platform/CARE_STUDENT_INTELLIGENCE_STANDARD.md` (a relative sibling-directory reference, which is more portable than a bare absolute path but still assumes a common parent directory — treat this file's own local content as authoritative for this repo regardless of whether that sibling path resolves). If this local copy and the canonical copy ever diverge, the canonical copy is authoritative — resync this file to match it.

**Scope:** This is the canonical Student Intelligence standard — how CARE measures what a student has done, derives what that evidence means, and decides what to recommend next. It governs every product with student-facing practice, mock exams, or study recommendations (currently Insurance, Real Estate, DMV; Nursing prospectively). It does not govern content authoring, certification, or QA — that is `CARE_QUESTION_BANK_STANDARD.md`'s domain, referenced here, never restated.

**Relationship to other CARE standards:**
- `CARE_UNIVERSAL_STANDARDS.md` — the small, permanent cross-product index. This document is indexed there, not folded into it.
- `CARE_QUESTION_BANK_STANDARD.md` — Content Intelligence (is the content correct, certified, and fairly constructed). This document — Student Intelligence — sits *on top of* certified content and never substitutes for it. A sophisticated learning algorithm cannot compensate for incorrect or uncertified content; this standard assumes upstream content already satisfies the Question Bank Standard.
- Product-specific docs — implementation details and adapters (blueprints, official passing thresholds, concept lists) live in each product's own repo, not here.

---

## 1. Purpose and priority

CARE Student Intelligence exists to answer one question honestly: **"What should this student do next to maximize their probability of passing the real exam?"**

It does this by measuring real evidence, deriving transparent signals from that evidence, and — only when statistically justified — offering calibrated predictions. Priority order: student pass rate first; factual/statistical honesty second (a dishonest system cannot reliably serve the first goal); everything else (UI polish, growth metrics, engineering convenience) below both.

This standard exists because CARE has now confirmed, independently, in three different products (Real Estate, DMV, and Nursing's own prototype), that the failure mode of inventing a confident-looking number is not hypothetical — it already happened three times. This document is the permanent fix for the underlying pattern, not just the three symptoms already remediated.

## 2. Claim model

Every statement CARE makes about a student's performance falls into exactly one of three tiers. Confusing tiers is the root cause of every fabrication incident to date.

**Tier 1 — Measured Facts.** Directly observed, no interpretation. Examples: "18/25 correct," "mock score 78%," "official passing threshold 70%," "8 of 12 blueprint domains attempted," "4 attempts on this topic." Bar to clear: must trace to a real stored event. Always permitted.

**Tier 2 — Derived Learning Signals.** A transparent, defensible, deterministic computation over Measured Facts. Examples: "weak topic," "insufficient evidence," "improving," "overdue for review," "high-priority study area," "mastery state." Bar to clear: the computation must be documented, deterministic, reproducible, and explainable on request — not a black box, not an LLM guess. Permitted when this bar is met.

**Tier 3 — Predictions.** Any claim about the *real exam* outcome. Examples: "87% chance of passing," "91% exam ready," "likely to pass," "3 sessions until ready." Bar to clear: empirical calibration and validation against trustworthy real exam outcomes — meaning, at minimum, real labeled pass/fail outcomes for a representative sample of CARE's own users, a reported calibration plot (not just discrimination/AUC), and external validation on a new cohort (see §20 for the methodological standard this implies). **CARE cannot currently clear this bar for any product, in any jurisdiction.** Until a specific product demonstrates it has (and only for that specific, validated scope), Tier 3 claims are prohibited platform-wide. This is not a new rule — it restates and formalizes `CARE_UNIVERSAL_STANDARDS.md` §12, adopted 2026-08-26.

A claim's tier is determined by what it asserts, not by how it's computed. A single, unweighted accuracy percentage is Tier 1. The same number wrapped in the word "readiness" and colored green/red is very often smuggled Tier 3 — the standard cares about the claim, not the arithmetic's complexity.

## 3. Evidence / event model

**Capability status: PARTIALLY IMPLEMENTED** (each product has a working, but non-uniform, version of this).

The smallest durable model, generalized from what Insurance and DMV already do rather than invented fresh:

- **One core event type — an item response.** `{user_id, product, item_id, item_type: 'practice' | 'mock' | 'flashcard_review' | 'full_exam', topic/blueprint_domain, selected_option, is_correct, misconception_tag (nullable), confidence (nullable, if collected), attempt_id, occurred_at}`. Deliberately *not* a proliferating catalog of named event types (`QUESTION_CORRECT`, `MOCK_COMPLETED`, `MISCONCEPTION_OBSERVED`, etc.) — those are derivable *views* over this one stream (a mock completion is a session with `item_type='mock'` and a completion timestamp; a misconception observation is a property of the response event, not a separate stream).
- **One session/attempt wrapper**, scoping a group of responses to a mode, a start, and a completion — Insurance's `study_cycle`/`quiz_session` and DMV's `quiz_sessions` are both correct instances of this shape.
- Every response event must be immune to later edits to the source content — Real Estate's `question_snapshot`-at-creation-time pattern (freezing question text, option order, correct answer, and explanation at attempt creation) is the correct reference implementation and should generalize.

**What NOT to build:** a large speculative event taxonomy invented ahead of a real need. Add a new `item_type` value only when a real product feature requires distinguishing it, not preemptively.

## 4. Sample size and uncertainty

**Capability status: IMPLEMENTED REFERENCE (Insurance)**, MISSING (Real Estate), PARTIALLY IMPLEMENTED (DMV — has minimum-N gates, no interval adjustment).

A student who is 5/5 is not equivalent to a student who is 50/50, even though both show 100%. This must be first-class architecture, not a UI afterthought.

**RESEARCH-SUPPORTED STATISTICAL METHOD:** the Wilson score interval (Wilson, 1927; validated over the naive Wald interval by Brown, Cai & DasGupta, 2001, *Statistical Science*) is the standard, settled statistical tool for expressing confidence in a small-N binomial proportion. Its coverage properties near n=5–10 are well-characterized in the literature, and it never produces a degenerate interval at 0/0 or n/n the way a raw percentage does.

**CARE DESIGN DECISION built on that method:** CARE ranks and gates topic urgency using the Wilson *lower bound*, not the raw point estimate — this is Insurance's existing, correctly-designed pattern (`weaknessScore.ts`). This is a defensible application of a validated statistic, **not itself a scientific finding CARE discovered, and not asserted as the only valid approach.** The standard explicitly permits future replacement by a better-validated model (e.g., hierarchical/empirical-Bayes shrinkage toward a cohort prior, per Efron & Morris, 1975) if one becomes practical for CARE's data.

**Minimum-N gates are CARE policy, not law.** Insurance's `n≥5` gate before any weak/proficient verdict, and its `n≥10` before "proficient," are reasonable defaults — Wilson's coverage becomes near-nominal in roughly that range — but every product must be free to justify a different gate for its own content/attempt-volume profile, with the reasoning documented. **Do not copy Insurance's exact numbers into a new product merely because they exist.**

**Three evidence tiers**, tied to the gate: `insufficient` (below minimum N), `preliminary` (at minimum N, interval still wide — DMV's "Preliminary (n=X)" badge is a good existing UI pattern to generalize), `established` (N large enough that the Wilson lower bound and raw accuracy have converged closely).

**Recent vs. historical evidence:** weight responses by recency (see §8) before computing sample size, using an *effective* sample size (Σw)²/Σw² on the decayed weights — not the raw count — so recency-weighting cannot manufacture false confidence.

## 5. Mastery model

**Capability status: IMPLEMENTED REFERENCE (Insurance, with one caveat)**; MISSING (Real Estate); PARTIALLY IMPLEMENTED (DMV — confidence buckets exist, no formal mastery-state model).

Mastery is **not**: one correct answer; a raw 80% or 90%; three correct in a row; a copied Bayesian-Knowledge-Tracing 0.95 threshold (Corbett & Anderson, 1995's convention, never empirically re-optimized by anyone who inherited it, CARE included).

Mastery **is** repeated evidence over time, considering:
- **Sample strength** — gated per §4, never assessed below the minimum N.
- **Repeated successful retrieval** — not a single success; the testing-effect literature (Karpicke & Roediger, 2008) is about retrieval as a repeated act, not a one-shot checkpoint.
- **Recency** — a topic answered correctly two months ago and never revisited is not evidence of *current* mastery; forgetting-curve research (Ebbinghaus, replicated by Murre & Dros, 2015) supports decaying old evidence rather than treating it as permanent.
- **Question diversity** — repeated success on near-identical items is weaker evidence than success across varied phrasings/scenarios of the same concept.
- **Trend** — Insurance's `detectTrend()` pattern (requiring ≥4 outcomes and a real delta threshold before calling a direction) is a reasonable, non-overfit approach.
- **Blueprint importance, where a real official weighting exists** — never defaulted to a fabricated weight when none exists; absence of blueprint data must degrade to "unweighted," never to an invented default weight.
- **Error history** — a topic with a scattered pattern of right/wrong (inconsistency) is weaker evidence than a topic with a clean, gradual improvement curve, even at the same raw accuracy.

**States** (a reasonable default, marked CARE POLICY — adjustable): `insufficient_data → weak → developing → proficient → mastered`, with any state able to decay back to a **`review_due`** state after sufficient time without practice. **No state is permanent.** A "mastered" topic with no recent activity must be able to re-enter `review_due` — this is a real gap in every current CARE product (none currently decay mastery) and should be treated as a genuine addition, not a restatement of existing behavior.

**Wheel-spinning escape principle (new, not currently implemented anywhere in CARE):** if a student has received a substantial, above-threshold amount of practice on a topic and is *not* improving, the system must not simply serve more of the same kind of question. Per Beck & Gong (2013)'s documented "wheel-spinning" failure mode, continuing to recommend more practice of the same shape when it demonstrably isn't working is itself a defect. The recommendation engine (§10) must be able to detect "N attempts, no improving trend" and switch remediation strategy (e.g., surface the concept's misconception rationale if tagged, suggest a different question format, or flag for the student to seek outside help) rather than loop indefinitely.

## 6. Weakness / priority model

**Capability status: IMPLEMENTED REFERENCE (Insurance)**; PARTIALLY IMPLEMENTED, duplicated 2–3x (Real Estate, DMV).

Weakness ranking must never be raw-percentage-only (this is the exact anti-pattern found live in Insurance's own admin dashboard — a REPEATED-class defect per `CARE_UNIVERSAL_STANDARDS.md` §10, not yet fixed as of this drafting). The canonical inputs, combined transparently:

- Confidence-adjusted accuracy (Wilson lower bound, §4) — determines *how urgently* a topic should rank, not merely *whether* it's below some cutoff.
- Recency — a topic weak two months ago that hasn't been revisited ranks differently than one that's actively being missed today.
- Blueprint importance, where real weighting data exists (never fabricated when it doesn't).

**This calculation must be computed exactly once, in one canonical location, per product.** Every dashboard, admin view, coach banner, and quiz-completion screen must read the same computed ranking. This is the single most concretely-evidenced rule in this whole standard: it was found independently duplicated 2–3 times each in Real Estate and DMV (identical formula, separately re-implemented, silently drifting), and once in Insurance's admin-vs-student split — **fixed 2026-08-26**: `studentPerformanceAdapter.ts` now calls the same `rankTopics()` the student dashboard calls, with a regression guard (`qa:admin-weakness-parity`) verifying it.

## 7. Retrieval practice and feedback

**Capability status: PARTIALLY IMPLEMENTED across all products** (all show right/wrong; explanation quality and confidence-aware remediation vary).

RESEARCH-SUPPORTED, and among the strongest evidence in this entire standard (Rowland, 2014, meta-analysis, *Psychological Bulletin*; Dunlosky et al., 2013, rating practice testing as "high utility"):

- Retrieval — producing an answer, not re-reading content — is the primary learning action a CARE product should be designed around. A question-answering attempt is the unit of intervention; passive review is not the same thing.
- Feedback is part of the intervention, not a UX nicety. Rowland (2014) found testing-with-feedback roughly doubles the effect of testing-without-feedback (g ≈ 0.73 vs. 0.39). **Score-only feedback is insufficient for learning-mode practice.**
- Wrong answers require corrective feedback — without it, multiple-choice distractor exposure can implant false beliefs that persist (Roediger & Marsh, 2005; corrected by feedback per Butler & Roediger, 2008).
- Where practical, explain *why the selected distractor is wrong*, not merely that it's wrong — this is both good pedagogy (Shute, 2008) and the foundation the misconception architecture (§9) depends on.
- Feedback must target the task and the reasoning, never the learner ("this reasoning missed X" — never "you're weak at this"). Kluger & DeNisi (1996) found self-directed feedback can actively *reduce* performance; over a third of feedback interventions in their meta-analysis did net harm.
- **High-confidence errors deserve richer remediation, where confidence data exists.** The hypercorrection effect (Butterfield & Metcalfe, 2001; Metcalfe, 2017) shows high-confidence wrong answers are the *most* correctable by good feedback — the highest-yield moment for a fuller explanation, if the product collects a confidence rating at all (none currently do; this is a FUTURE — REQUIRES DATA capability, contingent on adding confidence collection to the response event).
- **Feedback timing is not one-size-fits-all.** Immediate feedback is the safe default for practice-mode procedural recall. A timed mock exam may legitimately delay feedback until completion — this mirrors real exam conditions and is defensible per Shute (2008)'s finding that delayed feedback favors transfer while immediate feedback favors short-run procedural efficiency. Do not force identical timing across modes.

## 8. Spacing / review-due model

**Capability status: IMPLEMENTED REFERENCE, labeled honestly as partial (DMV — real SM-2, fixed ease factor)**; PARTIALLY IMPLEMENTED, approximated and explicitly self-labeled as such (Insurance — SM-2-shaped, fixed EF, documented as Phase-1); MISSING (Real Estate — no spaced repetition at all).

RESEARCH-SUPPORTED: spacing beats massed practice (Cepeda et al., 2006, *Psychological Bulletin*, 317 experiments; Cepeda et al., 2008, *Psychological Science*, the "temporal ridgeline" finding that the optimal gap between reviews scales with the intended retention interval, roughly 10–20% of it).

**CARE DESIGN DECISION, clearly separated from the above:** the exact scheduling algorithm. SM-2 (Woźniak, 1990) and its descendants (FSRS, Half-Life Regression) are validated as *recall predictors on their own telemetry* — none has a randomized trial showing superior real-world learning or exam outcomes over a simpler alternative. **CARE must not claim SM-2, or any specific scheduler, is "scientifically validated" as an algorithm.** DMV's specific ease-factor/interval constants are DMV's implementation choice, not a universal CARE truth to be copied verbatim into other products' standards language.

**New requirement not currently implemented anywhere in CARE:** the schedule should be exam-date-aware. Per Cepeda's ridgeline result, a student testing in three weeks and a student testing in six months should receive materially different review intervals for the identical item — none of the four audited products currently adjust spacing by time-to-exam at all.

## 9. Misconception architecture

**Capability status: DESIGN STANDARD** (Nursing has designed the "misconception points at one fact" principle but not built the full loop; no product has any part of this implemented).

Forward-compatible architecture, not a retrofit requirement:

`selected distractor → optional misconception_tag (authored at content-write time) → response event carries the tag → recommendation engine can surface the tagged rationale as remediation → a later correct response tagged with the same misconception is evidence-of-correction (a Tier 2 Derived Signal — "this misconception appears resolved" — never a Tier 3 claim of permanent fix)`.

Two hard constraints, both grounded directly in the research and in Nursing's own prior work:
- **A misconception is never a Fact.** It is never fact-ID'd, never merged into the Facts/Questions tables, and points at exactly one fact/concept it corrects — this is Nursing's own already-designed principle (`docs/06_KNOWLEDGE_GRAPH_SCHEMA_READINESS.md`) and it generalizes cleanly regardless of domain.
- **Misconception tagging must happen at content-authoring time, not be mined from response logs after the fact.** Sadler (1998) and Gierl et al. (2017) are unambiguous on this: diagnostic value comes from distractors deliberately written to represent a real, documented misconception; post-hoc analysis of arbitrarily-written distractors mostly identifies "this option is attractive," which is item-quality information, not a diagnosis of student cognition.

**Do not require retrofitting the existing question bank.** New content, under CARE's existing multi-agent editorial pipeline, may adopt the tag at near-zero marginal cost. Coverage grows organically; every consumer of misconception data must degrade gracefully to "none tagged for this item" — which will be the common case for years.

## 10. Next-best-action / recommendation engine

**Capability status: IMPLEMENTED REFERENCE (Insurance)**; PARTIALLY IMPLEMENTED, duplicated (Real Estate, DMV — 2–3 independent, unreconciled heuristics each); DOCUMENTED ONLY (Nursing — a requirements checklist, no design).

**One canonical decision layer per product.** Dashboards, coach banners, quiz-completion screens, and any future surface must call this single service and render its output — none may independently compute "what's weakest" or "what's next." This is not a hypothetical risk: it is a confirmed, repeated defect in two live products.

Candidate inputs (not a mandate to use all of them — see the explicit warning below): confidence-adjusted weakness (§6), blueprint importance where real data exists, coverage gaps, missed questions, mastery state and review-due status (§5/§8), recency and trend, mock-exam evidence (§12, evidence-only, never elevated to a prediction), exam date (§13, priority/spacing only).

**Do not use every input merely because it exists.** Insurance's actual reference engine uses a simple, explainable priority ladder (resume in-progress → weakest topic by confidence-adjusted urgency → missed-question retry → coverage gaps → mock-exam offer once an evidence threshold is met → honest zero-data fallback) — not a black-box weighted blend of everything available. Complexity must be earned by evidence it improves outcomes, not assumed by availability of more signals.

Every recommendation object must contain: **action** (what to do), **target** (which topic/item/mode), **priority** (why this over alternatives), **structured factors** (the named inputs that produced it), a **human-readable explanation** (deterministically generated from those factors — Insurance's `explain.ts` pattern, never an LLM post-hoc rationalization for a decision the LLM didn't make), and an **algorithm/version identifier** where practical (so a later change to the ranking logic doesn't silently reinterpret old recommendation logs).

## 11. Study plan generation

**Capability status: PARTIALLY IMPLEMENTED** (Insurance's `studyPlan.ts` is explicitly a "thin, deterministic rendering" of the recommendation engine's own output — the correct pattern; Real Estate and DMV have ad hoc, page-specific versions).

A study plan is a *rendering* of the recommendation engine's output over a time horizon (today's session, this week, until exam date) — it must never contain independent logic of its own. If a study plan needs to sequence multiple recommended actions, that sequencing (e.g., applying the interleaving guidance in §7-adjacent research, or the wheel-spinning escape in §5) happens inside the one canonical engine (§10), not in a separate plan-building module with its own copy of the priority logic.

## 12. Mock-exam evidence rules

**Capability status: IMPLEMENTED REFERENCE (Insurance, and DMV for threshold-sourcing specifically)**; PARTIALLY IMPLEMENTED and until recently factually broken in one path (Real Estate — see the 2026-08-26 pass/fail correctness fix).

Mock exams are a **distinct evidence source**, not a shortcut to a prediction.

**Allowed:** "Your CARE mock score was 78%; the official published passing threshold is 75%." Always a Tier 1 Measured Fact, always permitted, and always compared against the *real, verified, per-jurisdiction/per-exam* threshold — never a flat or guessed constant (this is precisely the defect just fixed in Real Estate; the fix — one authoritative threshold-lookup function, `null` when genuinely unverified, never a silent default — is the reference pattern for this rule going forward).

**Not allowed without empirical calibration:** "You are likely to pass." "You have an 86% chance of passing." "You are 92% ready." These are Tier 3 regardless of how many mock exams the claim is based on.

**Structural rule, from Insurance's correctly-designed pattern:** a mock exam's evidence can only *add a qualifier* to a topic-level verdict already earned through practice evidence (e.g., confirm or add caution to an existing "proficient" state) — it must never independently *upgrade* a weak student to a stronger verdict on its own. One good mock score does not overwrite a term's worth of weak-topic evidence.

**Repeated mock performance may produce Derived Signals** — "consistent," "improving," "declining," "needs review" — computed the same way topic-level trend is computed (§5). It does not, at any number of repetitions, become a probability. Passing five CARE mocks is stronger *evidence* than passing one; it is still not proof of passing the real exam, and the standard must say so explicitly rather than let repetition quietly launder itself into a certainty claim.

## 13. Exam-date adaptation

**Capability status: MISSING everywhere** (no current CARE product adjusts spacing or priority by time-to-exam).

The student's exam date, where provided, may: raise the priority weight of coverage gaps and weak topics as the date approaches; shorten spaced-repetition intervals per the ridgeline principle (§8); adjust study-plan pacing (§11).

The student's exam date may **never**: generate or imply an outcome prediction ("you won't be ready by then" is a Tier 3 claim exactly as prohibited as any other prediction) or be used to compute a countdown-styled "readiness by exam day" percentage under any label.

## 14. AI study coach role and boundaries

**Capability status: FUTURE — REQUIRES DATA / DESIGN STANDARD** (no product has a live AI tutor today; Nursing has the most relevant design review, `docs/36_AI_TUTOR_READINESS.md`, itself explicitly "not a build commitment").

AI is an explanation and tutoring layer *over* certified data — never a parallel authority.

**AI may:** explain certified concepts in the student's own words; personalize phrasing/pacing; ask Socratic questions; explain why a specific distractor is wrong (grounded in the item's real explanation/misconception tag, §9); help remediate a tagged misconception; explain, in plain language, why the recommendation engine (§10) suggested a given action — by rephrasing that engine's own structured factors, never by independently deciding what to recommend.

**AI may not:** invent facts or exam content; change or override a certified correct answer; fabricate a mastery state, a readiness signal, or a pass probability under any phrasing; become a second, parallel recommendation engine (if a student asks the AI "what should I study," the honest implementation routes that question to the one canonical engine and has the AI explain its answer — the AI does not compute its own answer); or silently alter stored student evidence (mastery, accuracy, history) as a side effect of ordinary conversation.

The deterministic, certified CARE data layer remains the sole source of truth. This mirrors Nursing's own conclusion (ground every tutor statement in a retrieved, certified Fact/LO; never let it invent beyond what's retrieved) and the Phase-1 CARE architecture drafts' AI-role language — restated here as the binding version for Student Intelligence specifically.

## 15. Shared platform vs. product adapter

**Shared (CARE Platform):** the item-response event contract (§3); the Wilson-based confidence/mastery framework (§4–§5); the weakness-ranking computation contract (§6); the recommendation contract and its explainability requirement (§10); the study-plan rendering contract (§11); the mock-exam evidence-gating pattern (§12); the misconception-registry *shape* (§9 — never its content); the streak/study-history contract.

**Product-specific (Adapter):** the real exam blueprint and domain weights; official passing thresholds per jurisdiction/license; the concept/topic list itself; Learning Objectives; Nursing's clinical scope-of-practice and state-law overlays; certification/QA rules (owned by `CARE_QUESTION_BANK_STANDARD.md`); product-specific event sub-types (e.g., a second product namespace like Nevada Property Manager).

No abstraction in this document is proposed unless at least two products already evidence the need for it. Nursing's five-layer Fact/Concept/LO/Scope-Overlay/State-Overlay graph is **not** adopted here as a shared-platform requirement — `CARE_QUESTION_BANK_STANDARD.md` §2 has already, correctly, scoped that as Nursing-specific, warranted by clinical fact-density and legal scope-of-practice complexity that Real Estate/DMV/Insurance do not share by default. That ruling is inherited, not revisited.

## 16. Data / schema semantics

**Capability status: this section is guidance for future schema design, not a migration mandate** — no schema changes are authorized by this document.

Where a future shared schema is built, two concrete lessons from the audit should shape it:
- **Compute derived aggregates (like topic accuracy) as database-generated values wherever the platform allows it.** DMV's `accuracy_pct NUMERIC GENERATED ALWAYS AS (...) STORED` column cannot drift from its inputs by construction — this is strictly better than the pattern found three times in Real Estate (independently recomputed in three different files) and once in Insurance (a second, unreconciled admin-side computation, fixed 2026-08-26). Prefer this pattern for any new shared schema.
- **A "passed" or "official threshold" field must be nullable, and null must mean "unverified," never be coerced to a guessed default.** This is the exact shape of the Real Estate pass/fail fix (2026-08-26): the schema already supported `passed: boolean | null`; the defect was application code silently guessing instead of storing the true null. Schema alone doesn't prevent this — the calling code must be held to the same discipline, which is why this rule also appears as a RUNTIME enforcement item in §18, not only a schema note.

## 17. Explainability

**Capability status: IMPLEMENTED REFERENCE (Insurance)**; MISSING (Real Estate, DMV — recommendation logic is implicit in UI copy, not independently queryable).

Every Derived Signal (§2, Tier 2) and every recommendation (§10) must be explainable via a **deterministic, pure function** over named, inspectable factors — never an LLM-generated justification invented after the fact for a decision the LLM did not actually make. Insurance's pattern (`explain.ts`: a function whose entire behavior can be audited against `RecommendationFactors` and nothing else) is the reference implementation. This is not merely good UX — it is the property that makes "why is CARE recommending this?" answerable, auditable, and safe to expose to a student, a support agent, or a future regulator.

## 18. Enforcement

For every major rule, enforcement is classified as it actually exists today, not as aspired to:

| Rule | Enforcement today | Recommended |
|---|---|---|
| No composite pass-probability/readiness claim | AUTOMATED (`qa:readiness-claim-integrity` guard, Real Estate + DMV) + DOCUMENTATION (`CARE_UNIVERSAL_STANDARDS.md` §12) | Extend the guard to any product before its dashboard ships (Nursing, when it has app code) |
| Topic accuracy computed once, consistently | SCHEMA/DATABASE (DMV, generated column); AUTOMATED for Insurance's admin/student parity specifically (`qa:admin-weakness-parity`, added 2026-08-26); **NOT ENFORCED** for Real Estate's 3 divergent implementations | New SCHEMA/DATABASE pattern where feasible in Real Estate; a lint/grep check for a second independent accuracy computation elsewhere |
| One canonical recommendation engine, no dashboard-local recompute | **DOCUMENTATION ONLY / NOT ENFORCED anywhere** — confirmed duplicated in both Real Estate and DMV | New: a targeted lint/grep rule flagging a component that independently sorts/filters topic performance for a "what's next" purpose outside the designated module |
| Mock evidence cannot upgrade topic-level mastery on its own | RUNTIME, Insurance only | Extend as a required RUNTIME pattern wherever a formal mastery model exists |
| Stored pass/fail always uses the real, current official threshold; null when unverified, never guessed | AUTOMATED (`qa:passing-threshold-consistency`, Real Estate, added 2026-08-26) | Extend the same pattern to DMV/Insurance if either is found using a hardcoded threshold anywhere (not confirmed as a live defect there today) |
| Sample-size gate before any weak/proficient verdict | RUNTIME, Insurance only | Required pattern wherever a mastery model exists; not yet automated anywhere |
| Misconception tags authored, never mined from logs | Not yet applicable — nothing built | MANUAL QA at content-authoring time, via the existing editorial pipeline |
| Recommendation explainability (deterministic, factor-based) | RUNTIME/pattern, Insurance only | Required pattern for any new recommendation engine; not automatable as a generic test, enforced by architecture review |

Consistent with the instruction not to invent speculative tests: every AUTOMATED and "Recommended: new automated" row above corresponds to a defect CARE has *actually experienced and fixed*, not a theoretical risk.

**Closing the enforcement gap deliberately, rather than leaving it open:** the automated guards above are pattern-matching against known-bad strings/formulas. They will not catch a genuinely new euphemism for a composite score, nor a subtler violation of the recommendation/explainability contracts that doesn't match an existing banned pattern. CARE's decision, made explicitly rather than by omission: **do not build a more complex automated enforcement system to close this gap.** Instead, semantic/manual review is REQUIRED — not optional, not "as time permits" — whenever any of the following materially change, in any product: student-facing performance claims or their wording; dashboard learning-signal displays; recommendation or "what to study next" language; mastery/readiness/weakness terminology of any kind. "Materially change" means a new or reworded claim, a new signal being surfaced, or a new recommendation surface being added — not a pure styling/layout change to an already-reviewed claim. This review requirement is itself the enforcement mechanism for everything the automated guards can't reach, and it is binding on any implementer, including an AI agent, per this document's own §14 boundaries.

## 19. Capability status

Status legend used throughout this document:
- **IMPLEMENTED REFERENCE** — a real, verified-against-source implementation exists and is fit to generalize from.
- **PARTIALLY IMPLEMENTED** — real code exists but is incomplete, inconsistent across products, or self-labeled as an approximation.
- **DESIGN STANDARD** — a principle or architecture this document requires going forward, with no full implementation yet anywhere.
- **FUTURE — REQUIRES DATA** — cannot be responsibly built until CARE has data it does not currently have (e.g., confidence ratings, calibration-grade outcome data).

By product, at a glance:
- **Insurance** — the strongest implemented reference for the confidence/mastery/recommendation/explainability core (§4–§6, §10, §17). Its one known defect (admin-side weak-topic calculation bypassing the Wilson-adjusted pipeline) was fixed 2026-08-26, immediately prior to this standard's adoption — see `qa:admin-weakness-parity`.
- **DMV** — the strongest reference for server-side data integrity patterns: a generated accuracy column, a real server-computed streak, a real (if simplified) SM-2 flashcard implementation, and a real-time per-exam-config passing-threshold lookup (as of the 2026-08-26 fix).
- **Real Estate** — the strongest reference for the attempt/event snapshot pattern (§3) and for a working "retry the exact missed questions" feature; historically the source of the composite-readiness-score incident and the pass/fail threshold-wiring defect, both now fixed.
- **Nursing** — the strongest *design* thinking for content traceability, fact versioning, and the misconception-as-separate-object principle (§9), with zero application code; also the source of a third, independent instance of the fabricated-readiness pattern (its own prototype mockup, now fixed).

## 20. Research basis

Full detail and citations preserved from the completed research review; classifications retained exactly as found, without inflating verified numeric effect sizes beyond what was independently confirmed.

**RESEARCH-SUPPORTED:**
- Retrieval practice / testing effect — Rowland (2014), *Psychological Bulletin*; Dunlosky et al. (2013), *Psychological Science in the Public Interest*; Karpicke & Roediger (2008), *Science*.
- Feedback matters, and roughly doubles the testing effect — Rowland (2014); Kluger & DeNisi (1996), *Psychological Bulletin*; Shute (2008), *Review of Educational Research*.
- Spacing beats massed practice, with the optimal gap scaling with retention interval — Cepeda et al. (2006, 2008).
- Interleaving helps most for discriminating confusable categories, not universally — Brunmair & Richter (2019), *Psychological Bulletin*; Rohrer, Dedrick & Stershic (2015, 2019/2020).
- Mastery learning as a concept (fixed criterion, variable time, correctives) — Bloom (1968); **Bloom's "2-sigma" figure (1984) has not replicated and must not be cited** (see VanLehn, 2011; critical reviews cited in the source research report).
- Wilson/Agresti–Coull confidence intervals for small-N binomial estimation — Brown, Cai & DasGupta (2001); Wilson (1927); Agresti & Coull (1998).
- Power-law forgetting-curve shape — Wixted & Ebbesen (1991); Rubin & Wenzel (1996); replicated by Murre & Dros (2015).
- Real computerized adaptive testing requires calibrated IRT item parameters, exposure control, and drift monitoring — Wainer (2000); van der Linden & Glas (2010); AERA/APA/NCME Standards (2014).
- Misconception diagnosis requires distractors authored from documented misconceptions, not mined post-hoc — Sadler (1998); Gierl, Bulut, Guo & Zhang (2017).
- Desirable difficulties — Bjork & Bjork (2011, 2019) — genuinely improves learning while feeling worse, in real tension with engagement metrics.

**INDUSTRY PRACTICE (common, not itself independently validated):**
- Any specific spaced-repetition algorithm (SM-2, FSRS, Half-Life Regression) — validated as recall predictors on their own telemetry, never against independent learning-outcome trials.
- Most marketed "adaptive learning" — heuristic sequencing (serve more of what's weak), not real IRT-based CAT.
- Open learner models / explainable-recommendation UX — well-supported for trust and acceptance (Bull & Kay, 2007, 2010), not for outcomes directly.

**UNVALIDATED / EXPERIMENTAL for CARE specifically:**
- Deep Knowledge Tracing and other neural sequence models — unstable at CARE's likely data scale, non-monotone predictions unsuitable for display, and published advantages over simpler models are substantially an artifact of weak baselines (Khajah et al., 2016; Yeung & Yeung, 2018; Gervet et al., 2020, showing interpretable logistic/IRT models win at moderate data scale).
- Cognitive diagnostic models (DINA/DINO) — data-hungry, require a validated Q-matrix CARE does not have.
- Elo/Glicko difficulty estimation feeding its own adaptive item-selection loop — documented convergence failure under exactly that combination (Bolsinova et al., 2026).
- Any calibrated numeric pass-probability claim — requires TRIPOD-level methodology (Collins et al., 2015, 2024) CARE cannot currently produce, and faces structural obstacles specific to CARE's shape: missing-not-at-random outcome self-reporting, survivorship bias in who sits the real exam at all, non-stationary cut scores, and fragmented small-N jurisdictions that resist both pooling and per-jurisdiction sample size simultaneously.

## 21. What CARE must not build or claim yet

Explicitly paused, not merely deprioritized:

- A numeric "CARE Ready %" or any composite readiness percentage, under any name.
- A stated pass probability, in any product, for any exam.
- Deep Knowledge Tracing or other large neural knowledge-tracing models.
- DINA/DINO or other cognitive diagnostic models.
- Real IRT/CAT item calibration and adaptive delivery claimed as such.
- Elo/Glicko ability ratings presented as if they were validated psychometric measurement.
- A large prerequisite/dependency graph between topics (no product has data to support this credibly).
- A full retrofit of misconception tags onto the existing question bank.
- A large speculative event-type taxonomy beyond the one core item-response event (§3).
- Nursing-specific Scope/State Overlay entities built for Real Estate, DMV, or Insurance absent a concrete, evidenced trigger for that product (mirroring the discipline Nursing itself already applies to its own Scope Overlay Registry decision).

---

*End of proposed standard.*
