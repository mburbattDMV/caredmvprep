# Incident: Fabricated readiness/pass-probability claims — CAREDMVPREP.COM

Captured/resolved: 2026-08-26. See `CARE_UNIVERSAL_STANDARDS.md` §12 for the
permanent cross-product rule this incident produced.

## What was found (full blast radius)

One calculation engine (`src/lib/readiness.ts`), consumed by three
uncoordinated surfaces:

1. **`ReadinessCard.tsx`** — "Overall Readiness" ring, literal "Pass probability: {passProb}%" text, "Exam Ready"/"Almost Ready"/"Getting There"/"Needs Work" labels.
2. **`CoachBanner.tsx`** — separately-worded copy keyed off the same `confidence` bucket (its own duplicated strings, not shared with `ReadinessCard`'s CONFIG map).
3. **`QuizResults.tsx`** — a second, entirely independent invented formula: "Estimated N more practice session(s) to reach the passing score" (`Math.ceil((passingPct - pct) / 5)`, an unvalidated "5 points per session" assumption) and a `pct >= 90` → "You look exam-ready" claim, neither touching `readiness.ts`.
4. **`account/page.tsx`** — the fabricated score marketed as a locked paid feature ("Study streak & readiness score").
5. **Structural issue**: `PASSING_THRESHOLD = 85` was a flat, site-wide constant, while real per-exam passing scores are config-driven and vary (`src/data/questions/index.ts`, e.g. 0.80). The dashboard's "ready" bucket and the actual test's real pass/fail could silently disagree.
6. Irony noted during audit: `(marketing)/about/page.tsx` states "We don't make fake claims about pass rates" — directly contradicted by the product itself.

## What was fixed

- `computeReadiness()` rewritten: removed `coverageBonus`/`masteryBonus`/`passProb` entirely (no more invented blend). `PASSING_THRESHOLD` constant removed; the function now takes a real `officialPassingPct` parameter sourced from each exam's actual config (`quizRegistry[testId].passingScore * 100`), computed at the dashboard call site (`src/app/(dashboard)/dashboard/page.tsx`), falling back to `null` (no threshold claim shown) rather than a wrong guess if unavailable.
- `ConfidenceLevel` renamed from certainty language (`ready`/`almost_ready`/`getting_there`/`needs_work`) to factual-comparison language (`above_threshold`/`near_threshold`/`building_evidence`/`needs_practice`), each described as a comparison to the real threshold, never a probability.
- `ReadinessCard.tsx`: "Pass probability" line removed; "Overall Readiness" renamed "Practice Accuracy"; the progress bar and threshold text now reference the real `officialPassingPct` instead of the flat 85 constant; the invented "~N more correct answers to reach Exam Ready" line removed (no calibrated basis for that claim existed).
- `CoachBanner.tsx`: rewrote all `confidence`-keyed copy to factual comparisons against the real threshold; removed the `questionsToReady`-based sentence.
- `QuizResults.tsx`: "You look exam-ready" claim removed, replaced with a factual score-vs-threshold statement; the invented "sessions to reach passing" formula removed, replaced with a factual points-below-threshold statement.
- `account/page.tsx`: feature-comparison label changed to "Study streak & practice accuracy tracking."

## Regression guard

`scripts/qa/check-readiness-claim-integrity.ts` (run via `npm run qa:readiness-claim-integrity`) fails if any of the specific banned identifiers/strings (`passProb`, `coverageBonus`/`masteryBonus`, `PASSING_THRESHOLD`, "Pass probability:", "Exam Ready", "Almost Ready", "you look exam-ready", an invented "sessions to pass" formula, `questionsToReady`) reappear in `src/` outside comments.
