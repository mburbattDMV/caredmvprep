# CARE QA Standards

> **Partially superseded (2026-08-25).** The "metrics identify candidates, not mandates" principle and the A/B/C/D longest-answer classification protocol below were adopted platform-wide, close to verbatim, into the canonical `CARE_QUESTION_BANK_STANDARD.md` §4 (canonical at `care-admin-platform/CARE_QUESTION_BANK_STANDARD.md`; local copy at this repo's root) — that document is now the cross-product source for these principles, and Category 11 (Correct Answer Consistency) below directly motivated the canonical standard's decision to move correct-answer-consistency QA earlier in the pipeline (see canonical §1). **This document remains authoritative for CARE DMV's own specific scripts** (`check-longest-answer.ts`, `check-answer-consistency.ts`, and the rest of `scripts/qa/`) and their exact thresholds.

## Core Principle

**Metrics identify candidates for review. They do not automatically require edits.**

Every QA flag must be evaluated by a human before any change is made. A question that
triggers a metric threshold may be perfectly well-written. A question that passes all
thresholds may still have genuine problems. The scripts tell you where to look — not
what to do.

---

## Longest-Answer Classification Protocol

When `check-longest-answer.ts` flags a question (correct answer is the strictly longest
option), classify it into one of four categories before deciding whether to edit:

### Category A — Legitimately longer. Do not edit.

The correct answer requires more length because of:

- A **list of specific legal conditions** that cannot be abbreviated without losing accuracy
  (e.g., permitted exceptions to a curfew rule)
- A **two-part rule** where both parts are legally required
  (e.g., "move over if possible; otherwise slow to a safe speed")
- A **legally critical qualifier** that is the entire point of the question
  (e.g., "marked *or unmarked* crosswalk")
- A **multi-step procedure** where each step is independently required
- A **trivially small gap** (< 10 characters) where the length difference is noise

**Do not edit Category A questions to satisfy a percentage target.**

### Category B — Correct answer unnecessarily verbose. Trim the option.

The correct answer packs explanation into the option text that belongs in the
`explanation` field instead. Signs:

- The option reads like a sentence from the explanation
- Removing a clause would not change what a student must know to select the right answer
- The option explains *why* the answer is correct, not just *what* the answer is

**Fix:** Move the explanatory content to the `explanation` field. Shorten the option to
the minimum wording needed to identify the correct answer unambiguously.

### Category C — Distractors too short or weak. Strengthen wrong answers.

The correct answer length is appropriate, but the wrong answers are suspiciously brief
or obviously implausible. Signs:

- Wrong answers are single words or bare numbers when realistic wrong answers would
  naturally be longer phrases
- Wrong answers represent positions no informed student would seriously consider
- The length gap between correct and wrong answers is large entirely because wrong
  answers were written quickly

**Fix:** Replace weak distractors with plausible misconceptions of comparable length.
The new distractor must be factually wrong, but believable enough that a student who
did not study might choose it. Do not change the correct answer.

### Category D — Both B and C apply.

Trim the correct answer AND strengthen the distractors.

---

## Classification Before Editing Rule

No question flagged by any QA metric may be edited without first being classified.
Classification must be documented. Editing a Category A question to reduce a
metric percentage is a quality regression, not an improvement.

---

## Answer-Position (A/B/C/D) Distribution

The answer-position check flags when any position exceeds 35% or falls below 15%
of questions in a bank. This threshold IS treated as a hard quality standard because
position bias is purely a construction artifact with no legitimate exception — there is
never a good reason for 60% of correct answers to be in position B.

Rebalancing is mechanical (rotate option arrays, update correctIndex) and carries no
content risk provided the safety assertion passes:

```
assert options[newCorrectIndex] === originalCorrectText
```

---

## Factual Accuracy Hierarchy

All other quality properties are secondary to factual accuracy. The pipeline order is:

1. Handbook factual QA — verify every state-specific number, law, and threshold
2. Fix factual defects — minimum necessary correction only
3. Remove confirmed duplicates
4. Fix answer-position bias (mechanical rebalancing)
5. Classify and fix longest-answer issues (A/B/C/D protocol above)
6. Improve weak distractors identified by classification
7. Run full QA suite — zero new errors introduced
8. Mark state complete

A state is not marked complete until it passes every step with no known
high-confidence defects remaining.

---

---

## Category 11 — Correct Answer Consistency (Production-Blocking)

**Definition:** The `correctIndex` field points to the wrong option. The question stem,
explanation, and/or citation are factually accurate and describe a correct answer — but
that answer is not the one `correctIndex` selects. Students are taught the wrong choice.

**Why it is the most dangerous defect type:** All other defect categories involve wrong
*facts*. Category 11 involves wrong *pointers to correct facts*. A student reading the
explanation learns the right rule but is trained to select the wrong option. The question
passes casual human review because the content looks correct.

**How it enters the bank:** Typically a data-entry error — the writer correctly filled in
the explanation and options, then wired `correctIndex` to an adjacent option by off-by-one
or copy-paste error.

**Detection:** The `check-answer-consistency.ts` QA script catches this automatically:
- **Error (production-blocking):** A quantitative token (number + unit) from the
  explanation appears in a wrong option but not in the correct option.
- **Warning (human review):** The explanation has higher word-overlap with a wrong option
  than with the correct option.

**Fix:** Correct `correctIndex` to the option that matches the explanation. Do not change
the explanation or options unless they contain independent factual errors. This fix does
not require a stem rewrite.

**Threshold:** Zero tolerance. Any confirmed Category 11 defect blocks the bank from
being marked production-ready.

---

## Scope

This standard applies to all CARE products: CARE DMV, CARE Real Estate, and any
future product. The classification categories (A/B/C/D) and the "review trigger,
not automatic failure" principle are platform-wide.
