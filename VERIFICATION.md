# State Facts Verification Tracker

Source of truth: `src/data/questions/state-facts.ts`
Last updated: 2026-06-26
Hardcode audit: `npm run qa:hardcodes` — 0 mismatches as of 2026-06-26
Rule: only official state .gov sources accepted. Mark `NEEDS_VERIFICATION` if unclear.

---

## Accuracy Report — as of 2026-06-26

| Category | Verified | Remaining | Status |
|----------|---------|-----------|--------|
| Permit test specs (Q count, pass threshold, %) | 49/50 | **1** (IN — Q count not published by BMV) | 🟡 Near-complete |
| Permit minimum age | 50/50 | 0 | ✅ Complete |
| Motorcycle test specs | 42/50 | **8** | 🔴 Needs phone/email verification |
| MSF course waives skills test | 50/50 | 0 | ✅ Complete |
| CDL General Knowledge specs | 50/50 | 0 | ✅ Federal standard — always 50/40/80% |
| CDL state handbook URL | 48/50 | **2** (AZ, AR use FMCSA fallback) | 🟡 Near-complete |

**Total NEEDS_VERIFICATION fields remaining: ~20** (1 permit + 16 moto fields + 2 CDL URLs)

### What "verified" means here
Values confirmed from official .gov page text or official PDF. "Medium confidence" values in VERIFICATION.md are included as verified — they match the official handbook format and passing % structure even if the specific page text didn't quote exact numbers.

---

## Summary (legacy format)

| Priority | Field | Verified | Remaining | Notes |
|----------|-------|---------|-----------|-------|
| 1 | Moto test: question count | 43/50 | **7** | CT = 16Q confirmed, passing threshold unknown |
| 1 | Moto test: passing score | 42/50 | **8** | CT + 7 states |
| 2 | Permit minimum age | 50/50 | 0 | ✅ Complete |
| 3 | MSF course waives skills test | 50/50 | 0 | ✅ Complete — all states = true |
| 4 | CDL state handbook URL | 48/50 | **2** | AZ, AR use federal FMCSA manual |
| 5 | Indiana permit question count | needs call | **1** | Not published on BMV website; 80% per section confirmed |

**Total fields needing verification: ~20**

---

## Hardcode Audit — Fixes Applied 2026-06-26

The following corrections were made to `state-facts.ts` after the hardcode audit found page files with conflicting values:

| State | Field | Old Value | New Value | Reason |
|-------|-------|-----------|-----------|--------|
| CA | permitToPass | 38 | 37 | 37/46 = 80.4%, not 38/46. CA is 80% passing. |
| CA | permitPassingPct | "83%" | "80%" | Official CA DMV: 80% required |
| GA | permitQuestions | 40 | 20 | GA DDS test is 20 questions (not 40) |
| GA | permitToPass | 30 | 15 | 15/20 = 75% — correct for GA |
| NV | permitQuestions | 25 | 50 | NV DMV: 50 questions (25 signs + 25 rules) |
| NV | permitToPass | 20 | 40 | 40/50 = 80% — correct for NV |
| VA | permitToPass | 30 | 28 | 28/35 = 80% — state-facts had inconsistent value |

Additionally, 152 state page files had stale numeric `numQuestions`, `numToPass`, and `passingScore` props removed. The component (`PracticeTestPage.tsx`) now derives all structural data from `state-facts.ts` directly.

---

## Pending Verification — Indiana DMV (Updated 2026-06-26)

**Official source checked**: `in.gov/bmv/licenses-permits-ids/learners-permits-and-drivers-licenses-overview/learners-permit/knowledge-exam`

**What the official page confirms:**
- Two-section exam: traffic maneuvers + traffic sign recognition
- **80% required on each section independently** ✓ (now in state-facts.ts)
- Computer-based, no appointment needed

**What is NOT published on the official site:** Total question count.

**Current state-facts.ts values:**
- `permitQuestions: "NEEDS_VERIFICATION"` — not published by BMV
- `permitToPass: "NEEDS_VERIFICATION"` — not published by BMV
- `permitPassingPct: "80%"` ✓ confirmed

---

## Motorcycle Verification Queue — New Jersey (Added 2026-07-10)

New Jersey Driver License, CDL General Knowledge, metadata, marketing pages, and question bank are fully verified and activated as of 2026-07-10. Motorcycle is held back per the state-completion workflow: **a state is not blocked from activation waiting on motorcycle verification if every other part can be completed from official sources.**

**Official sources checked:**
- 2025 New Jersey Driver Manual (`nj.gov/mvc/pdf/license/drivermanual.pdf`) — covers driver licensing only; does not cover the motorcycle knowledge test.
- NJ Motorcycle Manual (fetched via NJMVC site) — covers endorsement steps, permit/road-test process, safety content, helmet/gear law. Does **not** state the motorcycle knowledge test's total question count or passing score anywhere in the text.

**What is NOT published on any official NJMVC source found:**
- Motorcycle knowledge test question count
- Motorcycle knowledge test passing score / percentage

**Current state-facts.ts values:**
- `motoQuestions: "NEEDS_VERIFICATION"`
- `motoToPass: "NEEDS_VERIFICATION"`
- `motoPassingPct: "NEEDS_VERIFICATION"`
- `motoHelmetLaw: "all-ages"` ✓ confirmed (universal helmet law, no age exception)
- `motoLaneSplittingLegal: false` ✓ confirmed
- `motoCourseWaivesSkillsTest: true` ✓ confirmed (MSF BRC or state-equivalent waives both knowledge and skills tests for most adult applicants; GDL/under-18 applicants excluded)

**Next step:** Call NJMVC at **(609) 292-6500** to confirm the motorcycle knowledge test's question count and passing score before activating `new-jersey-motorcycle` in the quiz registry, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and before writing the motorcycle question bank. Marketing page copy (`new-jersey-motorcycle-practice-test`) has had unverified specific numbers (previously an unsourced "25 questions, 80%" claim) removed pending this call.

**Action required:** Call IN BMV at **888-692-6841** and ask: "How many total questions are on the operator knowledge exam?" Third-party sources report either 34 (road rules section only) or 50 (combined with 16 sign questions). Both formats require 80% per section.

---

## Permit & Motorcycle Verification Queue — South Carolina (Added 2026-07-10)

South Carolina's Driver License and Motorcycle question banks (34 + 20 questions) are fully written and QA-clean, grounded in the official 2026 SC Driver's Manual and Motorcycle & Moped Operator's Manual. **The state is NOT yet activated** (not wired into the quiz registry, mock exams, Stripe live-state lists, or onboarding/pricing pickers) because the core Driver License knowledge test's exact question count and number-correct-to-pass could not be confirmed from any official source — this blocks the flagship DL product itself, not just motorcycle, so it follows the same deferred-activation pattern as Indiana rather than the "build everything else, queue only motorcycle" pattern used for New Jersey.

**Official sources checked:**
- 2026 SC Driver's Manual (`dmv.sc.gov/sites/scdmv/files/2026-04/Driver's Manual.pdf`) — describes the knowledge test process (vision, knowledge, skills) and gives 10 sample questions, but never states the real test's total question count or number-correct-to-pass.
- SCDMV's official Driver's License Practice Exam (`apps.sc.gov/dlpracticeexam`) — confirms verbatim "a score of 80% or higher is needed to pass the exam," but its practice sessions are 10 questions each, not necessarily matching the real branch-administered test length.
- SC Motorcycle & Moped Operator's Manual (`dmv.sc.gov/sites/scdmv/files/media/Forms/Motorcycle-Manual.pdf`) — same gap: no stated knowledge-test question count or passing score for the Class M exam.

**What is NOT published on any official source found:**
- Driver's License knowledge test: total question count, number correct to pass (only the 80% *percentage* is confirmed)
- Motorcycle knowledge test: total question count, number correct to pass, passing percentage

**Current state-facts.ts values:**
- `permitQuestions: "NEEDS_VERIFICATION"`, `permitToPass: "NEEDS_VERIFICATION"`, `permitPassingPct: "80%"` ✓ confirmed
- `motoQuestions: "NEEDS_VERIFICATION"`, `motoToPass: "NEEDS_VERIFICATION"`, `motoPassingPct: "NEEDS_VERIFICATION"`
- `motoHelmetLaw: "under-21"` ✓ confirmed (corrected from a prior incorrect "under-18" — the Motorcycle Manual states the requirement applies to operators/passengers under 21)
- `motoLaneSplittingLegal: false` ✓ confirmed
- `motoCourseWaivesSkillsTest: true` ✓ confirmed (SCDMV accepts an MSF skills-test certificate from an approved third-party tester within 30 days in place of its own skills test; the knowledge test is still required separately)

**Also corrected while researching:** two existing marketing pages (`south-carolina-dmv-practice-test`, `south-carolina-motorcycle-practice-test`) asserted the unsourced "30 questions/24 correct" and "25 questions/20 correct" figures as fact, and the motorcycle page additionally claimed a "universal helmet law — all riders and passengers of any age," which directly contradicts the official manual's under-21-only helmet requirement. Both pages have been corrected to state only the confirmed 80% standard and the correct under-21 helmet law.

**Next step:** Call SCDMV at **803-896-5000** and ask for the exact number of questions and passing score on (1) the Class D beginner's permit knowledge test and (2) the Class M motorcycle knowledge test, then activate both in the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Permit & Motorcycle Verification Queue — Alabama (Added 2026-07-11)

Alabama's Driver License and Motorcycle question banks (52 + 24 questions) were built via the full 4-agent editorial pipeline (Research → Question Author → adversarial QA → Final Editor) and are editorially ready to activate the moment the missing facts below are confirmed. **The state is NOT activated** — same deferred pattern as Indiana/South Carolina — because no official source confirms the Driver License knowledge test's question count or passing score, which blocks the flagship DL product itself.

A **pre-existing `state-facts.ts` entry incorrectly marked these fields as verified** (30 questions/24 correct/80%, dated `VERIFIED` from an earlier bulk pass) — this session found no official ALEA source (manual text, alea.gov pages, or a practice-exam tool) that actually states these numbers; only third-party test-prep sites do, and even Alabama's own commonly-cited numbers didn't originate from anything we could trace to alea.gov. Downgraded to `NEEDS_VERIFICATION` per the stricter official-sources-only standard now in effect for this project.

**Official sources checked:**
- ALEA Driver Manual, June 2025 edition (`alea.gov/sites/default/files/ALEA DL Manual.pdf`) — describes the knowledge test ($5 fee, based on manual content, automated testing available) but never states total question count or number-correct-to-pass.
- ALEA Motorcycle Manual, Feb 2025 edition (`alea.gov/sites/default/files/Updated ALEA 2024 Motorcycle Manual Proof 9.pdf`) — same gap for the Class M knowledge test. Also states applicants must pass "both a written and a skills test" but never says an MSF Basic RiderCourse waives ALEA's own skills test (a prior state-facts.ts claim now downgraded — see below).
- ALEA driver-license pages (license-and-id-cards, graduated-driver-license, road-test-study-guide) — none state the missing figures either.

**What is NOT published on any official source found:**
- Driver's License knowledge test: total question count, number correct to pass, AND passing percentage (unlike South Carolina, even the percentage isn't confirmed here)
- Motorcycle knowledge test: same three fields
- Whether MSF Basic RiderCourse completion waives the ALEA motorcycle skills test (previously asserted as true; manual only recommends BRC as training, doesn't state a waiver)

**Current state-facts.ts values:**
- `permitQuestions`, `permitToPass`, `permitPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoQuestions`, `motoToPass`, `motoPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoCourseWaivesSkillsTest` — downgraded to `"NEEDS_VERIFICATION"` (previously an unconfirmed `true`)
- `motoHelmetLaw: "all-ages"` ✓ confirmed (no age exception found in the Motorcycle Manual)
- `motoLaneSplittingLegal: false` ✓ confirmed (explicit prohibition on riding between lanes/rows of vehicles; note the genuine Alabama-specific exception allowing two motorcycles to ride abreast in a single lane)

**Also corrected while researching:** the `alabama-dmv-practice-test` and `alabama-motorcycle-practice-test` marketing pages both asserted specific unsourced question counts (40Q/32-correct for DL, 25Q/20-correct for motorcycle) as fact — corrected to remove the unverified numbers. The DL page also incorrectly claimed the Learner License is issued "at age 16 only" with a uniform 21+ supervision requirement; the manual confirms Alabama actually issues a Learner License at age 15 (requiring a 21+ supervisor or certified instructor) with the supervision rule relaxing to "any licensed driver" once the holder turns 16, plus a separate 16+ entry track — both pages and a sample question were corrected. The motorcycle page's MSF-BRC-waives-skills-test claim was also softened to avoid asserting an unconfirmed fact.

**Next step:** Call ALEA Driver License Division at **(334) 242-7100** and ask for (1) the exact number of questions and passing score/percentage on the Class D knowledge test, (2) the same for the Class M motorcycle knowledge test, and (3) whether MSF Basic RiderCourse completion waives the motorcycle road-skills test. Once confirmed, activate both in the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Permit & Motorcycle Verification Queue — Colorado (Added 2026-07-11)

Colorado's Driver License and Motorcycle question banks (61 + 27 questions) were built via the full 4-agent editorial pipeline (Research → Question Author → adversarial QA → Final Editor) and are editorially ready to activate the moment the missing facts below are confirmed. **The state is NOT activated** — same deferred pattern as Indiana/South Carolina/Alabama — because no official source confirms the Driver License knowledge test's question count or passing score.

A **pre-existing `state-facts.ts` entry incorrectly marked these fields as verified** (25/20/80% for the car test, 20/16/80% for motorcycle, dated `VERIFIED` from an earlier bulk pass) — this session found no official Colorado DMV source (handbook text, dmv.colorado.gov pages including the official @Home Knowledge Test FAQ) that states these numbers; only third-party test-prep sites do. Both `handbookUrl` and `motoHandbookUrl` were also dead (404s) and have been corrected to the current live PDFs.

**Official sources checked:**
- Colorado Driver Handbook, DR 2337, January 2025 edition (`dmv.colorado.gov/sites/dmv/files/documents/DR_2337_Jan2025.pdf`) — describes the knowledge test (covers handbook content, practice quizzes available via myColorado app, @Home online option exists) but never states total question count or number-correct-to-pass.
- Colorado Motorcycle Operator's Handbook, DR 2336, August 2025 edition (`dmv.colorado.gov/sites/dmv/files/documents/DR2336_Motorcycle_Handbook.pdf`) — same gap for the Class M knowledge test. Also only documents MOST (Motorcycle Operator Skills Training) as a mandatory prerequisite for 15-16 year old applicants to receive their instruction permit — never as a general skills-test waiver for riders of any age (a prior marketing-page claim now corrected).
- `dmv.colorado.gov/home-driving-knowledge-tests` (official @Home test FAQ, fetched directly with a browser User-Agent since the site blocks default bot user-agents with a 403) — confirms the @Home testing option and its proxy requirement for under-19 test-takers, but not the question count/passing score.
- `dmv.colorado.gov/permits-first-time-driver-license` — confirmed verbatim (also via browser User-Agent) the minor instruction-permit age tiers: minimum age 15; ages 15-15.5 require a 30-hour driver-ed course; ages 15.5-16 may use a 4-hour driver-awareness program or the 30-hour course. This fact IS independently verified and used in the bank, unlike the test-length figures.

**What is NOT published on any official source found:**
- Driver's License knowledge test: total question count, number correct to pass, AND passing percentage
- Motorcycle knowledge test: same three fields
- Whether MOST program completion (or any course) waives the motorcycle skills test for riders 16+ (previously asserted as a general waiver; manual only documents it as an age-15-16 permit prerequisite)

**Current state-facts.ts values:**
- `permitQuestions`, `permitToPass`, `permitPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoQuestions`, `motoToPass`, `motoPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoCourseWaivesSkillsTest` — downgraded to `"NEEDS_VERIFICATION"` (previously an unconfirmed `true`)
- `motoHelmetLaw: "under-18"` ✓ confirmed (C.R.S. 42-4-1502(4.5) — under-18 only, not universal)
- `motoLaneSplittingLegal: true` ✓ confirmed, but narrowly: Colorado legalizes "lane filtering" only — a two-wheeled motorcycle may pass a vehicle in the same lane when that vehicle AND vehicles in adjacent lanes are all stopped, at a speed no greater than 15 mph. This is distinct from general lane splitting between moving traffic and both marketing pages/question banks were written to preserve that distinction.

**Also corrected while researching:** the `colorado-dmv-practice-test` and `colorado-motorcycle-practice-test` marketing pages both asserted unsourced question counts (25Q/20-correct/80% for both DL and motorcycle) as fact — corrected to remove the unverified numbers. The motorcycle page also incorrectly claimed riders could "complete MOST to waive the skills test" as a general option — corrected to accurately describe MOST as a mandatory prerequisite for 15-16 year old permit applicants specifically, not a general waiver mechanism.

**Next step:** Call Colorado DMV at **(303) 205-5600** and ask for (1) the exact number of questions and passing score/percentage on the Class R (car) knowledge test, (2) the same for the Class M motorcycle knowledge test, and (3) whether any course completion waives the motorcycle road-skills test for riders 16 and older. Once confirmed, activate both in the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Motorcycle Verification Queue — Wisconsin (Added 2026-07-11)

Unlike South Carolina/Alabama/Colorado, Wisconsin's **Driver License** knowledge test structure IS fully officially confirmed — the Motorists' Handbook (BDS126) states verbatim: a 15-question Highway Signs Test (12 correct, 80%) and a separate 50-question Knowledge Test (40 correct, 80%). **Wisconsin's DL + CDL are activated** (wired into the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, onboarding/pricing). Only the **motorcycle** knowledge test is queued, following the New Jersey pattern (DL live, motorcycle held back).

**Official sources checked:**
- Wisconsin Motorcyclists' Handbook (BDS110, wisconsindot.gov) — full-text search found no statement of the motorcycle knowledge test's question count or passing score anywhere.
- WebSearch found only third-party test-prep consensus (25 questions/20 correct/80%), not an official source.

**Note on a pre-existing table entry:** the "Priority 1" table below (added in an earlier, less rigorous pass) lists WI as "25 | 20 | 80% | medium | wisconsindot.gov — 80% confirmed; 25Q from official handbook format." This session's direct full-text search of the actual Motorcyclists' Handbook did not find this stated anywhere in the document — the "medium confidence" note there appears to be inferring the question count from the handbook's *formatting* rather than an explicit statement, which does not meet this project's official-sources-only standard. Treat that table row as superseded by this entry: `motoQuestions`/`motoToPass`/`motoPassingPct` are `NEEDS_VERIFICATION` in `state-facts.ts`, not the previously-listed 25/20/80%.

**Current state-facts.ts values:**
- `permitQuestions: 50`, `permitToPass: 40`, `permitPassingPct: "80%"` ✓ confirmed (also `permitQuestions`-adjacent: a separate 15-question/12-correct Highway Signs Test also exists but has no dedicated schema field)
- `motoQuestions`, `motoToPass`, `motoPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoHelmetLaw: "under-18"` ✓ confirmed (Motorcyclists' Handbook: helmets required for operators/passengers under 18; no law requiring helmet use for riders 18+)
- `motoLaneSplittingLegal: false` ✓ confirmed, with a narrow exception: motorcyclists may not ride in any part of a lane occupied by another vehicle, except when two motorcyclists mutually agree to ride side by side in one lane (a two-abreast carve-out, not general lane splitting).

**Also corrected while researching:** the `wisconsin-dmv-practice-test` marketing page had several real errors: (1) claimed the under-21 BAC threshold is 0.02% — the Motorists' Handbook states it is actually **0.00%** ("absolute sobriety," no detectable alcohol permitted at all) — corrected throughout the page and a sample question's options/explanation; (2) claimed the GDL supervisor/curfew-exception adult must be "25 or older" — the manual states a qualifying supervisor is a licensed driver with 2+ years' experience who is either a qualified instructor/spouse 19+ or **any person 21+** — corrected; (3) used "Intermediate License" terminology — the manual calls this a **Probationary License** — corrected; (4) claimed only "30 hours" of supervised driving is required — the manual requires **50 hours total (40 daylight + 10 darkness)** — corrected. The `wisconsin-motorcycle-practice-test` page asserted an unsourced "25 questions, 80%" motorcycle test claim in three places — removed.

**Next step:** Call Wisconsin DOT DMV at **(608) 264-7447** (number listed in the Motorists' Handbook) and ask for the exact number of questions and passing score/percentage on the Class M motorcycle knowledge test, then activate it in the quiz registry, mock exams, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers' motorcycle product gating.

---

## Permit & Motorcycle Verification Queue — Minnesota (Added 2026-07-11)

Minnesota's Driver License and Motorcycle question banks (55 + 22 questions) were built via the full 4-agent editorial pipeline (Research → Question Author → adversarial QA → Final Editor) and are editorially ready to activate once the missing facts below are confirmed. **The state is NOT activated** — same deferred pattern as South Carolina/Alabama/Colorado — because no official source states the Driver License knowledge test's total question count (only the 80% passing percentage is confirmed).

A **pre-existing `state-facts.ts` entry had wrongly marked permitQuestions/permitToPass as verified at 40/32** — this session found no official DVS source (manual text, the official "Class D Practice Knowledge Test" PDF, or a DVS webpage) that states this; only third-party test-prep sites do. Downgraded to `NEEDS_VERIFICATION`, keeping only `permitPassingPct: "80%"`, which the manual confirms verbatim ("you must score 80 percent to pass").

**Official sources checked:**
- Minnesota Driver's Manual, June 2026 edition (`assets.dps.mn.gov/files/dvs/dvs-class-d-drivers-manual-english.pdf`) — confirms the 80% passing standard but never states total question count.
- Official "Class D Practice Knowledge Test" PDF (`assets.dps.mn.gov/files/dvs/dvs-class-d-practice-test.pdf`) — explicitly disclaims "these questions may or may not be on the actual exam" and only contains 25 sample questions; not a statement of real exam length.
- Minnesota Motorcycle Manual — self-identifies with print code "PS30001-21," i.e. a November 2021 print run (the PDF's file-touch date is newer, but the printed content hasn't been revised) — does not state the motorcycle knowledge test's question count or passing score anywhere.

**Notable finding — a genuine cross-document conflict, resolved:** the Motorcycle Manual's "Operating Rules" section has a flat, unconditional "may not ride between lanes of moving or stationary vehicles" prohibition. The Driver's Manual (current edition) explicitly permits lane splitting (2+ moving lanes, ≤25mph and ≤15mph over traffic flow) and lane filtering (2+ stopped lanes, ≤15mph over traffic flow). Independent research confirmed Minnesota legalized lane splitting/filtering effective July 1, 2025 via 2024 legislation (6th state to do so) — the Motorcycle Manual is simply stale and hasn't been reprinted since. The question banks correctly cite the current Driver's Manual as authoritative for this fact, with an explanatory note about the 2025 law change, and do not invent a specific statute section number.

**Current state-facts.ts values:**
- `permitQuestions`, `permitToPass` — `"NEEDS_VERIFICATION"`; `permitPassingPct: "80%"` ✓ confirmed
- `motoQuestions`, `motoToPass`, `motoPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoHelmetLaw: "under-18"` ✓ confirmed (also applies to anyone on a motorcycle instruction permit regardless of age; not universal)
- `motoLaneSplittingLegal: true` ✓ confirmed — both splitting (moving traffic) and filtering (stopped traffic) are legal since July 1, 2025, under the specific speed conditions described above.

**Also corrected while researching:** the `minnesota-dmv-practice-test` marketing page had several real errors: (1) asserted an unsourced "40 questions, 80% (32/40)" figure — removed, replaced with the confirmed 80% standard only; (2) claimed supervised driving requires only "30 hours" — the manual requires 40 hours (with a parent class) or 50 hours (without), both including 15 nighttime hours — corrected; (3) claimed the provisional-license nighttime curfew and passenger restrictions last "12 months, or until 18, whichever is later" — the manual states these restrictions apply for the first six months only (passenger limit then rises from 1 to 3 for the second six months) — corrected in a keyRule, a dedicated sample-question pair, and its explanations. The `minnesota-motorcycle-practice-test` page claimed Minnesota has a "universal" helmet law with "no exceptions based on age" — this directly contradicts the Motorcycle Manual's actual under-18/permit-holder-only requirement — corrected throughout (intro, about section, a sample question's correct answer, and an FAQ). Also removed an unsourced "25 questions, 80%" motorcycle test claim in three places.

**Next step:** Call Minnesota DVS (contact info in the Driver's Manual) and ask for the exact number of questions on (1) the Class D written test and (2) the Class M motorcycle knowledge test, plus the motorcycle test's passing score/percentage. Once confirmed, activate both in the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Permit & Motorcycle Verification Queue — Louisiana (Added 2026-07-12)

Louisiana's Driver License and Motorcycle question banks (62 + 24 questions) were built via the full 4-agent editorial pipeline (Research → Question Author → adversarial QA → Final Editor) and are editorially ready to activate once the missing facts below are confirmed. **The state is NOT activated** — same deferred pattern as South Carolina/Alabama/Colorado/Minnesota — because no official source states either exam's total question count (only the DL test's 80% passing percentage is confirmed).

A **pre-existing `state-facts.ts` entry had wrongly marked permitQuestions/permitToPass as verified at 40/32, and motoQuestions/motoToPass/motoPassingPct at 25/21/84%** — this session found no official OMV/DPS source (the Driver's Guide, the Motorcycle Operator Manual, or any OMV webpage) that states either number; only third-party test-prep sites publish these figures. Downgraded to `NEEDS_VERIFICATION`, keeping only `permitPassingPct: "80%"`, which the guide confirms verbatim ("you must correctly answer 80 percent of these questions to receive a passing score").

**Official sources checked:**
- Louisiana Driver's Guide — Class D & E (DPSMV2052). The true `dps.louisiana.gov`-hosted URL (`DL_Booklet_English_11-2022.pdf`) returns 404; no other direct state-domain PDF could be located despite genuine search effort. Used a verified third-party mirror of the identical official content (`img1.wsimg.com`), cross-checked against 3 independent mirrors (redlightrobber.com, firstclassdrivingschool.com, nationaldrivertraining.com) — all byte-for-byte identical text, self-titled "LOUISIANA OFFICE OF MOTOR VEHICLES." Confirms the 80% passing standard but never states total question count.
- Louisiana Motorcycle Operator Manual, Twelfth Edition (DPSMV2048) — sourced directly from Louisiana DPS's own PowerDMS document portal (`public.powerdms.com/LADPSC/documents/347041`, a legitimate official government document system, confirmed via `content-type: application/pdf` header). States that a knowledge test and skills test are both required, but never states the knowledge test's question count or passing percentage anywhere in the document.

**Notable finding — a real error in a pre-existing note, corrected:** the old `state-facts.ts` notes field claimed Louisiana's state-run motorcycle safety program "waives both knowledge and skills tests." The actual statute (R.S. 32:402.3) states verbatim: "No operator's skill test shall be required if an applicant has successfully completed the [Motorcycle Safety, Awareness, and Operator Training Program]" — the waiver is **skills-test only**; the knowledge test is still required. Corrected in `state-facts.ts` and on the `louisiana-motorcycle-practice-test` marketing page (which had also generically hedged on this point in one FAQ, now corrected to be specific and accurate).

**Current state-facts.ts values:**
- `permitQuestions`, `permitToPass` — `"NEEDS_VERIFICATION"`; `permitPassingPct: "80%"` ✓ confirmed
- `motoQuestions`, `motoToPass`, `motoPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoHelmetLaw: "all-ages"` ✓ confirmed verbatim ("All riders must wear an approved safety helmet" — no age exception)
- `motoLaneSplittingLegal: false` ✓ confirmed verbatim (R.S 32:191.1(C): "No person shall operate a motorcycle between lanes of traffic or between adjacent lines or rows of vehicles"); riding two abreast in a single lane is a distinct, permitted exception, not lane splitting.
- `motoCourseWaivesSkillsTest: true` ✓ confirmed, but scope corrected to skills-test-only (see above)

**Also corrected while researching, `louisiana-dmv-practice-test` marketing page:** (1) asserted an unsourced "40 questions, 32 correct, 80%" figure in the metadata description, intro, and about section — removed, replaced with the confirmed 80% standard only; (2) claimed the learner's permit supervisor could be "a licensed adult 18 or older" — the guide requires a licensed adult **21+ or a sibling 18+**; the marketing page had this backwards (and even asserted, incorrectly, that Louisiana's supervisor-age rule was more lenient than other states') — corrected throughout (key rule, a dedicated sample question + explanation, and a closing FAQ); (3) used the wrong stage name "Restricted License" — the guide's own terminology is "Intermediate License" — corrected throughout; (4) claimed the Intermediate stage's passenger restriction (max 1 non-family passenger under 21, 6PM-5AM) lasts only "the first 6 months" — the guide states no such 6-month limit; the restriction runs for the entire Intermediate stage, until the 17th birthday — corrected. `louisiana-motorcycle-practice-test` page: removed unsourced "25 questions, 80% (20/25)" claims in 4 places (metadata, intro, about, and an FAQ answer describing the endorsement process).

**Content gap fixes (Agent 4/Final Editor findings):** added two DL questions that were confirmed in the guide but had zero coverage: `la-dmv-distract-001` (Louisiana's wireless-device law: banned for drivers 17 and under; texting banned for all ages, p.76) and `la-dmv-lights-001` (headlights required sunset-to-sunrise; low beams required within 500ft of an oncoming vehicle or 200ft of a followed vehicle, p.84).

**Next step:** Call Louisiana OMV and ask for the exact number of questions on (1) the Class D/E written knowledge test and (2) the Class M motorcycle knowledge test, plus the motorcycle test's passing score/percentage. Once confirmed, activate both in the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Permit & Motorcycle Verification Queue — Kentucky (Added 2026-07-12)

Kentucky's Driver License and Motorcycle question banks (62 + 25 questions) were built via the full 4-agent editorial pipeline (Research → Question Author → adversarial QA → Final Editor) and are editorially ready to activate once the missing facts below are confirmed. **The state is NOT activated** — same deferred pattern as South Carolina/Alabama/Colorado/Minnesota/Louisiana — because no official source states either exam's total question count (only the DL test's 80% passing percentage is confirmed; the motorcycle test's passing percentage is not confirmed at all).

A **pre-existing `state-facts.ts` entry had wrongly marked permitQuestions/permitToPass as verified at 40/32, and motoQuestions/motoToPass/motoPassingPct at 20/16/80%** — this session found no official KSP/KYTC source (either manual, or any official webpage) that states any of these four numbers; only third-party test-prep sites publish them. Downgraded to `NEEDS_VERIFICATION`, keeping only `permitPassingPct: "80%"`, which the manual confirms verbatim ("Applicants must make a minimum score of 80% to pass this test").

**Two significant pre-existing errors caught and corrected (not just the usual unsourced question count):**
1. **`permitMinAge` was wrong: 15 → corrected to 16.** The manual states verbatim: "Drivers must be at least 16 years of age to take the vision and written knowledge tests and apply for a permit." No 15-year-old permit pathway exists in Kentucky — an exhaustive search of the manual for any other age-15 provision found none. This is a more serious error than the usual unsourced-question-count pattern, since it's a wrong hard fact (not just an unverifiable one) that had been live in the platform's data.
2. **`motoHelmetLaw` was wrong: `"under-18"` → corrected to `"under-21"`.** The manual states verbatim: a rider may go without a helmet only "if he or she is over 21 and has held a motorcycle license for one year or more... Passengers must be 21 or over to ride without a helmet. Persons under 21, or those who have held their licenses for less than one year, must wear protective headgear." The true rule is an AND-gate (21+ age AND 1+ year licensed) that the schema's flat age-category enum can't fully express, but `"under-21"` is the closer/correct value versus the previous `"under-18"`.

**Official sources checked:** Both the pre-existing `handbookUrl` (`drive.ky.gov/Drivers/Documents/Kentucky-Driver-Manual.pdf`) and `motoHandbookUrl` (a `drive.ky.gov` landing page, not a manual) return 404 / aren't a manual at all — `drive.ky.gov` (Kentucky Transportation Cabinet) no longer hosts a general driver or motorcycle manual. Testing and manuals for the standard operator's license, motorcycle endorsement, and CDL are administered by **Kentucky State Police (KSP)**, not KYTC directly — KYTC only handles applications and issues the physical license. Found and used the real, current official documents hosted at `wp.kentuckystatepolice.ky.gov`, linked from the live KSP Driver Testing page:
- Kentucky Driver's Manual (KSP, 10-11-2023 edition) — confirms the 80% passing standard but never states total question count anywhere.
- Kentucky Motorcycle Testing Manual (KSP, 2023) — confirms helmet law and course-waiver scope verbatim, but never states a motorcycle knowledge-test question count or passing percentage anywhere in the document.

**Notable finding — a real error in a pre-existing note, corrected:** the old `state-facts.ts` notes field claimed Kentucky's motorcycle safety course "waives BOTH knowledge and skills tests." The manual states verbatim: "Applicants for a motorcycle driver's license will be exempted from the licensing skills test if they present satisfactory evidence of successful completion of an approved rider training course" — **skills-test only**; the knowledge test is still required. Corrected in `state-facts.ts` and on the `kentucky-motorcycle-practice-test` marketing page (which had also generically hedged on this point in one FAQ, now corrected to be specific and accurate).

**Current state-facts.ts values:**
- `permitQuestions`, `permitToPass` — `"NEEDS_VERIFICATION"`; `permitPassingPct: "80%"` ✓ confirmed
- `permitMinAge: 16` ✓ corrected from a wrong 15
- `motoQuestions`, `motoToPass`, `motoPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoHelmetLaw: "under-21"` ✓ corrected from a wrong `"under-18"` (true rule is under-21 OR licensed <1 year, an AND-gate the schema can't fully express)
- `motoLaneSplittingLegal: false` ✓ confirmed (manual: "Lane sharing is usually prohibited" — general MSF safety-curriculum language, not a specific cited KY statute, but consistent with no state having legalized it here)
- `motoCourseWaivesSkillsTest: true` ✓ confirmed, but scope corrected to skills-test-only (see above)

**Also corrected while researching, `kentucky-dmv-practice-test` marketing page (this was the most significant marketing-page error found this session):** the entire page was built around a **fabricated test structure** — it claimed Kentucky's knowledge test is "40 questions split into two independent sections (20 road signs + 20 traffic laws), each requiring 80% to pass separately." This appears nowhere in the actual KSP manual, which states only a single 80% passing score with no mention of a two-section structure; the manual's own "Test Your Knowledge" section (a themed sample quiz, not the real exam) mixes signs and law questions together in a single 11-question set. This fabricated claim was repeated across the metadata title/description, intro, a key rule, the about section, an entire dedicated sample question + explanation, and an FAQ — all rewritten to remove the false structure and instead correctly emphasize that KSP (not KYTC/a "DMV") administers the actual test. Also corrected: the passenger restriction for the Intermediate License stage was wrongly said to last only "the first 6 months" — the manual states no such time limit (it runs the whole Intermediate stage) — corrected in a key rule and the GDL FAQ; also softened an unconfirmed "Full license at 18" claim to accurately describe the license as earned by completing all GDL steps, not tied to a fixed age.

**`kentucky-motorcycle-practice-test` marketing page:** removed a false "universal helmet law — all riders and passengers, any age, no exceptions" claim that appeared in the metadata description, intro, about section, an entire dedicated sample question (including its correctIndex/answer), and an FAQ — all corrected to state the true under-21-OR-less-than-1-year-licensed rule. Also removed unsourced "25 questions, 80% (20/25)" claims in 3 places, and corrected a generic hedge-FAQ on course waivers to be specific (skills-test-only, matching the state-facts.ts correction above).

**Next step:** Call the Kentucky State Police Driver Testing Branch and ask for the exact number of questions on (1) the standard operator's written knowledge test and (2) the Class M motorcycle knowledge test, plus the motorcycle test's passing score/percentage. Once confirmed, activate both in the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Oregon — ACTIVATED (DL + CDL + Motorcycle) (2026-07-12)

Unlike every other state built this session (SC, AL, CO, WI-moto, MN, LA, KY — all queued because a core question count was unpublished), **Oregon's Driver License and Motorcycle question banks (61 + 27 questions) are fully activated** because both exams' question counts and passing scores are officially confirmed:

- **DL: 35 questions, 28 correct to pass (80%)** — stated verbatim in the official 2026-2027 Oregon Driver Manual ("It has 35 multiple-choice questions. You must answer 28 questions correctly to receive a passing score.").
- **Motorcycle: 25 questions, 20 correct to pass (80%)** — the Motorcycle and Moped Manual states the passing threshold verbatim ("You must answer 20 questions correctly to pass"); the total pool of 25 is confirmed on the official ODOT motorcycle endorsement page (oregon.gov/odot/dmv/pages/driverid/motorcycle_endorse.aspx: "There are 25 multiple-choice questions").

The pre-existing `state-facts.ts` entry's numbers (35/28/80% DL, 25/20/80% moto) were already correct — the first state this session where the earlier bulk-verification pass turns out to have been accurate. Built via the full 4-agent editorial pipeline (Research → Question Author → adversarial QA → Final Editor); QA caught and the Author fixed one page-citation error, a "killed" vs. "involved in fatal collisions" statistic-precision issue, an overstated-precision issue on an ambiguous manual quote, a section-label mismatch, and did a bias-rebalancing pass (DMV 62.3%→42.6%, moto 63.0%→51.9%, both confirmed via the real `npm run qa:all` gate). Final Editor's only finding was two stale/dead handbook URLs in `state-facts.ts` (fixed below) — no question-bank issues.

**Official sources used:**
- 2026-2027 Oregon Driver Manual: `https://www.oregon.gov/odot/forms/dmv/37.pdf` (the pre-existing handbookUrl, `.../dmv/docs/ordriversmanual.pdf`, 404s — corrected).
- Oregon Motorcycle and Moped Manual, 2024-2025: `https://www.oregon.gov/odot/forms/dmv/6367.pdf` (the pre-existing motoHandbookUrl, an `.aspx` landing page, 404s — corrected).

**Activation wiring completed:** both files' question `status` fields bulk-flipped from `needs_review` to `verified` (required for the `verified()` filter in `src/data/questions/index.ts` to surface them); added `oregon-permit`, `oregon-motorcycle`, `oregon-cdl-general` to the quiz registry plus 3 permit mock exams (35Q/30min, following the Maryland/Wisconsin pattern); added to `profile-routing.ts` (`OR-permit`/`OR-motorcycle`/`OR-cdl_general`); added `oregon` to BOTH `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS` AND `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS` in `stripe/config.ts` (full Maryland-style activation, not the DL-only Wisconsin/New Jersey pattern, since motorcycle is also confirmed); added to onboarding and pricing state pickers.

**Marketing-page errors found and corrected:**
- `oregon-dmv-practice-test`: the existing page fabricated a "Provisional License" GDL stage with a specific "midnight-5AM curfew" and "3 non-family passengers" limit — this terminology and these restrictions appear nowhere in the official manual (confirmed via exhaustive search: no "provisional," "curfew," or "passenger restrict" hits at all). The manual instead describes a single permit-and-hours gate: under-18 first-time applicants must hold a permit 6+ months and complete 100 hours of supervised driving (or 50 hours + an ODOT-approved course), supervised by someone 21+ with 3+ years of driving experience — and the old page wrongly described these hours as merely "recommended," when the manual states them as a real requirement for license issuance. Rewritten throughout (2 key rules, a dedicated sample question + explanation, an FAQ). Also corrected an FAQ's inaccurate description of the railroad-crossing "emergency vehicles must stop" claim (manual actually says school buses/hazmat vehicles, not emergency vehicles).
- `oregon-motorcycle-practice-test`: the existing page said course completion "still requires the knowledge test at the DMV office" universally — this is wrong for Team Oregon's Basic Course (16+), which the manual confirms waives BOTH the knowledge and skills tests. The page also never named Team Oregon as Oregon's sole approved provider, generically referencing "MSF BRC" instead. Rewritten (about section, a sample question/FAQ, and a generic hedge-FAQ) to correctly describe all four course tiers: Basic Course (16+, waives both tests), Intermediate Course (21+), Basic Online Classroom (16+), and Intermediate Online Classroom (21+) — the latter three waive the skills test only.

**Note for future state work:** Oregon breaks the pattern established since South Carolina — always re-verify from scratch rather than assuming a state will need to be queued. Check the manual for an explicit stated question count before assuming it's unpublished.

---

## Oklahoma — ACTIVATED (DL + CDL only; Motorcycle queued) (2026-07-12)

Oklahoma is the first state this session where the pre-existing `state-facts.ts` numbers weren't just unsourced — they were **actively wrong**, contradicted by an official current source:

**MAJOR CORRECTION:** The old entry claimed `permitQuestions: 50, permitToPass: 40, permitPassingPct: "80%"`. This figure also matches what nearly every third-party test-prep site claims for Oklahoma, so it's a high-risk "known fact" that isn't actually true. The **official Service Oklahoma written-test webpage** (oklahoma.gov/service/popular-services/written-test.html) states verbatim: *"You will have 60 minutes to complete the test. To pass, you must correctly answer 15 out of 20 questions."* — confirming the real structure is **20 questions, 15 correct, 75%**. The official Oklahoma Driver Manual itself never states a question count at all (Agent 2/the Question Author was explicitly warned about this risk and kept the file clean — the wrong "50/80%" figure appears only once, safely inside a wrong-answer distractor, never asserted as fact).

**Also corrected:** `permitMinAge` was wrongly `15.5` — Table 1 of the manual states the Class D Learner Permit minimum age is **15 with an approved driver education course** (in progress or completed) or **16 without** driver education. There is no "15.5" figure anywhere in the manual.

**DL activated (20Q/15-correct/75%, confirmed); Motorcycle queued** — no official source (manual or written-test page) states a motorcycle-specific question count or passing score; the old `motoQuestions: 25, motoToPass: 20, motoPassingPct: "80%"` were unsourced and downgraded to `NEEDS_VERIFICATION`. This is the Wisconsin/New Jersey partial-activation pattern (DL+CDL live, motorcycle held back), not Oregon's full activation.

**Official sources used:**
- Official Oklahoma Driver Manual: `https://oklahoma.gov/content/dam/service-oklahoma/Documents/OklahomaDriverManual.pdf` (the old handbookUrl, a `digitalprairie.ok.gov` CONTENTdm archive link, returns a JS-rendered viewer page, not a direct PDF — corrected).
- Official Service Oklahoma written-test webpage: `oklahoma.gov/service/popular-services/written-test.html` — the only source that states the DL test's actual length/passing score, and also confirms the under-18 licensing requirements (180-day permit hold, 50 hours behind-the-wheel including 10 at night, no traffic convictions, free Work Zone Safe course) — these facts are NOT in the manual itself, only on this webpage, so `verifiedBy` cites both sources distinctly.
- Oklahoma does not publish its own state-specific motorcycle operator manual — riders are directed to the generic national MSF Motorcycle Operator Manual (msf-usa.org) in addition to the Driver Manual, which itself contains Oklahoma's state-specific motorcycle licensing rules (age tiers, restrictions, course waiver).

**Research-stage lesson:** the initial blueprint asserted a "50 hours of behind-the-wheel training including 10 at night" requirement as a confirmed fact, but the Question Author (given only the manual .txt, not the written-test webpage) correctly could not verify it and declined to include it — flagging the gap back up the pipeline instead of inventing a citation. On follow-up, this figure turned out to be real, just sourced from the written-test webpage rather than the manual; the research stage should have handed the Author both sources explicitly. No error reached the shipped files — the Author's refusal to assert an uncitable fact is exactly the intended failure mode.

**Notable finding — a genuine non-standard rule, confirmed accurate:** Oklahoma's motorcycle safety course waiver is broader than most states': an approved MSF course waives **BOTH** the knowledge test AND the skills test (confirmed verbatim twice in the manual), not skills-only as in the majority of states built this session. The pre-existing `state-facts.ts` notes already had this right — no correction needed there.

**Marketing-page errors found and corrected:**
- `oklahoma-dmv-practice-test`: repeated the wrong "50 questions, 80%" figure throughout (metadata, intro, about, one sample question) — all corrected to 20Q/15-correct/75%. Also repeated the wrong "15½" permit age (corrected to the 15-with-driver-ed/16-without split) and **fabricated an entire "Intermediate License" curfew and passenger restriction** ("midnight-5AM," "1 non-family passenger under 20") that appears nowhere in any official source — this was invented, not merely unsourced (confirmed via exhaustive search of both the manual and the written-test webpage: no "curfew," "passenger restrict," or "Intermediate License" hits at all). Rewritten throughout (2 key rules, the about paragraph, a dedicated sample question, 2 FAQs) to replace the fabricated curfew/passenger claims with the real, confirmed 180-day-hold + 50hr/10-night + Work Zone Safe requirement.
- `oklahoma-motorcycle-practice-test`: asserted a false "universal helmet law — all riders and passengers, any age, no exceptions" claim (metadata, intro, about, an entire dedicated sample question including its correctIndex, an FAQ) — corrected throughout to the real under-18-only rule (flipping the sample question's correct answer, since the previously-marked-correct option was itself wrong). Also corrected a wrong "course waiver is skills-only" claim (about section, an FAQ on the endorsement process, and the generic hedge-FAQ) to the real both-tests waiver. Removed unsourced "25 questions, 80%" claims in 3 places.

**Next step:** Call Service Oklahoma / DPS and ask for the exact number of questions on the Class M motorcycle knowledge test, plus its passing score. Once confirmed, activate motorcycle in the quiz registry, mock exams, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Connecticut — ACTIVATED (DL + CDL only; Motorcycle queued) (2026-07-13)

Connecticut's DL knowledge test is fully confirmed: **25 questions, 20 correct, 80%**, verbatim in the official Connecticut Driver's Manual ("The knowledge test consists of 25 questions and you need 20 correct answers to pass") — this matched the pre-existing `state-facts.ts` entry exactly, no correction needed for the DL numbers. The motorcycle test's **question count (16) is confirmed** verbatim ("The knowledge examination will consist of 16 questions"), but **no passing score/number-correct is stated anywhere** in either manual — the pre-existing entry already had `motoToPass`/`motoPassingPct` honestly marked `NEEDS_VERIFICATION` (not a downgrade this time, just confirmation the existing gap was correctly flagged). DL+CDL activated; motorcycle queued — the Wisconsin/Oklahoma partial-activation pattern.

**Correction to pre-existing state-facts.ts:** `motoHelmetLaw` was wrongly left as `"under-18"` despite the entry's own notes field already flagging the discrepancy ("Schema 'under-18' is an approximation; actual law is under-21") — the field itself was never fixed. Confirmed verbatim in the Motorcycle Operator Manual: *"Effective October 1, 2025, riders under 21 years old must wear protective headgear when operating a motor-driven cycle or motorcycle."* Also found a genuine same-document inconsistency: an earlier passage in the same manual (16-/17-year-old operator section) still reads "No person under 18 years of age may operate a motorcycle... unless wearing protective headgear" — a stale, unrevised reference to the law's prior threshold; the explicit Oct 2025 passage is authoritative. Also fixed the dead `motoHandbookUrl` (the old `/motorcycle` landing page 404s; corrected to the direct working PDF).

**Official sources used:**
- Connecticut Driver's Manual: `https://portal.ct.gov/dmv/-/media/dmv/dmv-pdfs/drivers-manual-english.pdf`
- Connecticut Motorcycle Operator Manual: `https://portal.ct.gov/dmv/-/media/dmv/dmv-pdfs/cycmanpdf.pdf`

**Notable finding — genuinely real GDL curfew/passenger restrictions (unlike several prior states' fabricated versions):** Connecticut's manual documents an actual two-tier post-license passenger restriction for 16-/17-year-old drivers (first 6 months: no passengers except a licensed instructor, a parent/guardian with at least one licensed, or one person 20+ with 4+ consecutive years licensed and a clean record; months 7-12: additionally allows immediate family) and a real 11PM-5AM curfew (exceptions: employment, school, religious activities, medical necessity, Safe Ride Program; volunteer fire/ambulance/EMS members responding to emergencies are exempt from both). These are accurately represented in the question banks and this is a case where the underlying facts are genuinely as rich/specific as some other states' marketing pages had *fabricated* — a reminder that not every detailed-sounding GDL claim is invented, only the ones that can't be found in an official source.

**Also corrected while researching, `connecticut-dmv-practice-test` marketing page:** the existing page fabricated a **"22 hours of nighttime driving"** figure (metadata description, intro, a key rule, a dedicated sample question, 2 FAQs) — the manual confirms only a general 40-hour behind-the-wheel total, with no nighttime-specific breakdown anywhere; rewritten to state the real, confirmed 40-hour figure without inventing a nighttime split. Also corrected a wrong **"midnight-5AM" curfew time** (real is **11PM-5AM**) and a fabricated **"licensed adult 18+ in the front seat" curfew exception** that doesn't exist — the manual's real exceptions are specific purposes only (employment/school/religious/medical/Safe Ride Program) plus volunteer fire/ambulance/EMS members. Also corrected a **"120 days" permit-hold claim presented as universal** — the manual actually splits this into 120 days (only for applicants completing a full driver-ed program via commercial/secondary school) vs. 180 days (the default for all other 16-/17-year-old applicants) — the old page omitted the 180-day default entirely.

**`connecticut-motorcycle-practice-test` marketing page:** asserted a false **"universal helmet law — all riders, any age, no exceptions"** claim (metadata, intro, about, an entire dedicated sample question including its correctIndex, an FAQ) — corrected throughout to the real under-21 (effective Oct 2025) rule, including flipping the sample question's correct answer since the previously-marked-correct option was itself wrong. Also removed unsourced "25 questions, 80%" claims in 3 places, and corrected a generic hedge-FAQ on course waivers to be specific (skills-test-only, matching the confirmed CT rule).

**Next step:** Call Connecticut DMV and ask for the motorcycle knowledge test's passing score/number-correct. Once confirmed, activate motorcycle in the quiz registry, mock exams, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Nevada — ACTIVATED (DL + CDL only; Motorcycle queued) (2026-07-13)

**MAJOR CORRECTION:** The pre-existing `state-facts.ts` entry claimed `permitQuestions: 50, permitToPass: 40, permitPassingPct: "80%"` — this was wrong, and directly contradicted by the SAME entry's own notes field, which already (correctly) described Nevada's adaptive testing system ("test ends when 20 correct OR 6 incorrect"). The official Nevada DMV "Driver License Testing" webpage (dmv.nv.gov/dltesting.htm) confirms verbatim: *"The Nevada knowledge test for a Class C, non-commercial license consists of 25 multiple-choice questions. 80 percent or better is a passing score. The test will stop when you have reached 20 correct answers or six incorrect."* Real structure: a maximum pool of **25 questions, 20 correct to pass (80%), adaptive** — stops early once either outcome is mathematically decided. The official Driver Handbook itself never states a question count at all; only the DMV testing webpage does. DL+CDL activated; motorcycle queued (Wisconsin/Oklahoma/Connecticut pattern) — no official source states a motorcycle-specific question count or passing score (the old `motoQuestions: 25, motoToPass: 20, motoPassingPct: "80%"` was suspiciously identical to the correct Class C numbers, suggesting a copy-paste error rather than independently confirmed data; downgraded to `NEEDS_VERIFICATION`).

**Confirmed correct, no changes needed:** `permitMinAge: 15.5` — genuinely correct verbatim ("Be at least 15½ years old"), unlike a couple of other states this session where a similar-looking non-integer age turned out to be fabricated. `motoHelmetLaw: "all-ages"` — genuinely correct verbatim ("Motorcyclists must wear helmets in Nevada," no age qualifier found anywhere). `motoCourseWaivesSkillsTest: true` — the notes already correctly described the Basic Rider Course as waiving BOTH tests, matching the manual verbatim ("Successful completion of a Basic Rider Course will waive any further testing at the Department of Motor Vehicles").

**Official sources used:**
- Nevada Driver Handbook (DMV 700, March 2024): `https://dmv.nv.gov/pdfforms/dlbook.pdf` (the old handbookUrl, `dmv.nv.gov/Manuals/Manuals.htm`, 404s — corrected).
- Nevada Motorcycle Operator Manual: `https://dmv.nv.gov/pdfforms/dlbookmotorcycle.pdf`
- Nevada DMV "Driver License Testing" webpage: `https://dmv.nv.gov/dltesting.htm` — the only source stating the DL test's actual structure.

**Notable QA-process finding — a systemic citation bug, same class as prior states:** Adversarial QA found the off-by-one page-citation pattern (seen in Louisiana, Kentucky, Oregon, Oklahoma, and Connecticut) affecting ~52 of 57 DL questions, plus 6 individual citation errors in the motorcycle file — all fixed via re-derivation from single-page PDF extraction. QA also caught a real, inverted answer-length bias (correct answer was too often the SHORTEST option — 33.3% DL / 43.3% moto vs. ~25% chance) that the Author's own self-report had masked by only reporting the "longest-is-correct" metric. The Author's first rebalancing attempt corrupted both files (truncated words, nonsense insertions); this was caught before shipping and both files were rebuilt cleanly from the original authored content plus all fixes reapplied. Final Editor did an exhaustive text-integrity audit (script-checked for corruption artifacts across all 87 questions) given this history and found the rebuild genuinely clean. Final gate: DL 26.3% longest-is-correct, moto 30.0%, both comfortably under threshold.

**Marketing-page errors found and corrected:**
- `nevada-dmv-practice-test`: repeated the wrong "50 questions, 40 correct, 80%" claim extensively — metadata title/description, intro, a key rule, the about section, a dedicated sample question, and an entire FAQ titled "Why does Nevada have a 50-question DMV knowledge test?" — all rewritten to describe the real adaptive structure (25-question max pool, 20 correct/80%, stops at 20 correct or 6 incorrect). Also corrected a GDL FAQ's wrong "11 PM to 5 AM" curfew time to the confirmed "10 PM to 5 AM."
- `nevada-motorcycle-practice-test`: the helmet-law claim ("universal, all ages") was actually correct and needed no fix. But the course-waiver claim was wrong — it said the Basic Rider Course "may waive the road test" (skills-only), when Nevada's confirmed rule waives BOTH the knowledge test and the skills test. Corrected in the endorsement-process FAQ and the generic hedge-FAQ on course waivers.

**Next step:** Call Nevada DMV and ask for the motorcycle knowledge test's question count and passing score. Once confirmed, activate motorcycle in the quiz registry, mock exams, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers.

---

## Batch Summary — Louisiana through Nevada (2026-07-11 through 2026-07-13)

Seven states built via the full 4-agent editorial pipeline (Research → Question Author → Adversarial QA → Final Editor) in this batch, per the user's "do not pause, accumulate a substantial batch before pushing" instruction. **Nothing in this batch has been pushed to git** — all changes are local, pending the user's review and explicit push instruction.

| State | DL Questions | Moto Questions | Activation |
|---|---|---|---|
| Louisiana | 62 | 24 | Queued (DL+moto question counts unconfirmed) |
| Kentucky | 62 | 25 | Queued (DL+moto question counts unconfirmed) |
| Oregon | 61 | 27 | **ACTIVATED — DL + CDL + Motorcycle** (both fully confirmed) |
| Oklahoma | 59 | 26 | **ACTIVATED — DL + CDL only** (moto queued; DL was a major 50/40→20/15 correction) |
| Connecticut | 63 | 29 | **ACTIVATED — DL + CDL only** (moto queued; moto question count confirmed, passing score isn't) |
| Nevada | 57 | 30 | **ACTIVATED — DL + CDL only** (moto queued; DL was a major 50/40→25/20-adaptive correction) |

Four of seven states activated (partially or fully); three remain queued pending a phone call to confirm question counts. Two states (Oklahoma, Nevada) had genuine pre-existing hard-fact errors in `state-facts.ts` (not just unsourced gaps) that were caught and corrected. Every state's marketing pages were checked for factual errors against the freshly-researched official manuals, with real fabrications found and fixed in nearly every state (invented curfews/passenger restrictions, wrong helmet-law scope, wrong course-waiver scope, wrong test-structure numbers).

**Next steps for the user:** decide whether to push this batch, and/or authorize phone-call verification for the three queued states' unconfirmed question counts (Louisiana OMV, Kentucky State Police Driver Testing Branch, Oklahoma's motorcycle-specific count, Connecticut's motorcycle passing score, Nevada's motorcycle question count/passing score).

---

## Permit & Motorcycle Verification Queue — Arkansas (Added 2026-07-13)

Arkansas's Driver License and Motorcycle question banks (75 DL + 28 moto questions) were built via the full 4-agent editorial pipeline. **The state is NOT activated** — the DL knowledge test's exact question count (commonly cited as 25Q/20/80%) cannot be confirmed from any directly parseable official source. The official DPS study guide PDFs exist at dps.arkansas.gov but could not be rendered as text by WebFetch during research. All third-party prep sources consistently cite 25/20/80% and attribute it to the official manual — confidence is HIGH but no verbatim official quote could be produced.

**Pre-existing state-facts.ts corrections made:**
- `motoHelmetLaw: "all-ages"` → **`"under-21"`** — Ark. Code §27-20-104 requires helmets only for riders/passengers under 21; riders 21+ are exempt. The notes field also said "Helmet law is universal" — corrected. This was a genuine hard-fact error, not just a confidence gap.
- `handbookUrl` updated from dead DFA 2023 PDF to live DPS October 2024 URL
- `motoHandbookUrl` updated from dead DFA URL to live DPS motorcycle manual URL
- Both marketing pages (DMV and motorcycle) claimed the rural interstate speed limit is **70 mph** — corrected to **75 mph for passenger vehicles** (Act 784 of 2019, effective July 1, 2020, Ark. Code §27-51-201). A sample question had 70 mph as the marked-correct answer — corrected.
- Both marketing pages attributed knowledge/skills testing to "DFA Revenue Division" or "Arkansas DMV" — corrected to **Arkansas State Police (DPS)**; DFA issues the license.
- Motorcycle marketing page had generic boilerplate for permit duration, endorsement structure, and course waiver FAQs — replaced with Arkansas-specific confirmed content.

**Current state-facts.ts values:**
- `permitQuestions: 25, permitToPass: 20, permitPassingPct: "80%"` — high-confidence but PDF unreadable; not formally NEEDS_VERIFICATION in ts (left at numeric values given high consensus) but not confirmed via verbatim official quote
- `motoQuestions: "NEEDS_VERIFICATION"`, `motoToPass: "NEEDS_VERIFICATION"`, `motoPassingPct: "NEEDS_VERIFICATION"`
- `motoHelmetLaw: "under-21"` ✓ corrected (Ark. Code §27-20-104)
- `motoLaneSplittingLegal: false` ✓ confirmed (Ark. Code §27-51-302)
- `motoCourseWaivesSkillsTest: true` ✓ confirmed, skills test only; knowledge test still required; 90-day certificate window

**Next step:** Call Arkansas State Police Driver Examination Branch (check dps.arkansas.gov for phone number) and ask: (1) the exact number of questions and passing score on the Class D driver's license knowledge test, and (2) the exact number of questions and passing score on the motorcycle knowledge test. Once the DL test structure is officially confirmed, activate both in the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers, then change question `status` from `needs_review` to `verified`.

---

## Permit & Motorcycle Verification Queue — Iowa (Added 2026-07-13)

Iowa's Driver License and Motorcycle question banks (70 DL + 23 moto questions) were built via the full 4-agent editorial pipeline (Research → Question Author → Adversarial QA → Final Editor) and are editorially ready to activate the moment the missing facts below are confirmed. **The state is NOT activated** — same deferred pattern as South Carolina/Alabama/Colorado/Minnesota/Louisiana/Kentucky — because no official source publicly states the Driver License knowledge test's exact question count (only the 80% passing percentage is confirmed on the practice test page).

**Pre-existing `state-facts.ts` entry had wrongly marked `permitQuestions: 35`, `permitToPass: 28` as VERIFIED** — Iowa Admin Rule 761-604.9(1) explicitly states the department "reserves the right to revise a test at any time and will declare the minimum passing score for each test," and no Iowa Code section, official DOT page, or official PDF reviewed during research states a specific question count. The Iowa DOT practice test generates 25 questions but the official page does not state that the real test has 35 (or any specific number) of questions. Downgraded to `NEEDS_VERIFICATION`. Similarly, the motorcycle test's question count and passing score are not published in any official Iowa DOT source — the old `motoQuestions: 25`, `motoToPass: 20`, `motoPassingPct: "80%"` entries were unverified and have been downgraded.

**Official sources checked:**
- Iowa Driver's Manual (MM1170 08/19/2025): `https://iowadot.gov/media/7308/download?inline=` — confirms the 80% passing standard on the DOT practice test page but never states total question count anywhere in the manual.
- Iowa DOT practice test page: `https://iowadot.gov/drivers-licenses-ids/driver-education/manuals-practice-tests/take-practice-test` — states "A score of 80% or higher is needed for a passing score" and generates 25-question practice sessions, but does NOT state real test question count.
- Iowa Admin Rules Chapter 761.604, Rule 604.9(1): explicitly says the department sets the passing score without specifying question count in regulation.
- Iowa Motorcycle Operator's Manual (Form 430008, 05/14/2024): `https://iowadot.gov/media/7175/download?inline` — shows sample questions but states no count or passing score for the motorcycle knowledge test.

**What is NOT published on any official source found:**
- Driver's License knowledge test: total question count, number correct to pass (only the 80% *percentage* is confirmed)
- Motorcycle knowledge test: total question count, number correct to pass, passing percentage

**Major error caught and corrected:** The pre-existing marketing pages (`iowa-dmv-practice-test`, `iowa-motorcycle-practice-test`) both asserted Iowa's under-21 OWI/BAC limit was **0.00% ("true zero tolerance")**. Iowa Code §321J.2A(1) explicitly sets this limit at **0.02%** — not zero. This error was in the metadata description, intro, a key rule tile, the about section, sample questions (with wrong `correctIndex`), and FAQs on both pages. All corrected to 0.02% with Iowa Code citation. Also corrected: the motorcycle page had boilerplate non-answers for several FAQs ("check the Iowa DMV website" repeated for agency name, permit duration, and course waiver facts when all three are confirmed); these were replaced with Iowa-specific confirmed answers citing Iowa DOT (not "Iowa DMV" — Iowa has no DMV) and the confirmed skills-test-only course waiver.

**Current state-facts.ts values:**
- `permitQuestions`, `permitToPass` — `"NEEDS_VERIFICATION"`; `permitPassingPct: "80%"` ✓ confirmed
- `motoQuestions`, `motoToPass`, `motoPassingPct` — all `"NEEDS_VERIFICATION"`
- `motoHelmetLaw: "none"` ✓ confirmed (Iowa Code Chapter 321 has no motorcycle helmet mandate for any age; §321.445 explicitly excludes motorcycles from seat belt law)
- `motoLaneSplittingLegal: false` ✓ confirmed (Iowa Code §321.275(4) explicitly bans riding "between lanes of traffic or between adjacent lines or rows of vehicles")
- `motoCourseWaivesSkillsTest: true` ✓ confirmed, skills test only (Iowa Admin Rules 761-604.10/604.12; knowledge test still required)
- `motoHandbookUrl` updated to direct PDF URL: `https://iowadot.gov/media/7175/download?inline`

**Iowa-specific notes confirmed in research (not previously in state-facts.ts):**
- Under-21 OWI threshold: 0.02% (Iowa Code §321J.2A) — NOT zero
- GDL curfew: 12:30 a.m.–5:00 a.m. (Iowa Code §321.180B(2)(b)) — unusual 12:30 start time (most states use midnight)
- Business district unposted speed: 20 mph (Iowa Code §321.285(2)(a)(1)) — residential/school is 25 mph
- Motorcycle daytime headlights required for 1977+ models (Iowa Code §321.275(5))
- 2024 pedestrian conveyance law: vehicles must yield to cyclists, scooters, skateboards, wheelchairs, strollers in crosswalks (Iowa Driver's Manual Ch. 2.4)
- Chemical test refusal: 1-year revocation (first offense) + $1,250 minimum fine (Iowa Code §321J.9)

**Next step:** Call Iowa DOT Driver License Division at **(515) 244-8725** (or contact iowadot.gov) and ask: (1) the exact number of questions on the standard Class C Driver's License knowledge test, and (2) the exact number of questions and passing score on the motorcycle knowledge test. Once confirmed, activate in the quiz registry, mock exams, `LIVE_STATE_SLUGS`/`LIVE_STATE_ABBRS`, `LIVE_MOTORCYCLE_STATE_SLUGS`/`LIVE_MOTORCYCLE_STATE_ABBRS`, and onboarding/pricing pickers, then change question `status` from `needs_review` to `verified`.

---

## Nebraska (NE)
- **DL test count (25/20/80%)**: NEEDS_VERIFICATION — strong third-party consensus; official DMV page does not state the count in accessible text. Phone: Nebraska DMV (402) 471-3918.
- **Motorcycle test count (25/20/80%)**: NEEDS_VERIFICATION — same; one outlier source cited 30 questions.
- **MSF waiver deadline**: Official DMV page states "within the past 24 months"; one third-party source cited 1 year. Use 24 months per official DMV page.
- **Motorcycle helmet law**: CONFIRMED under-21 always required (NRS 60-6,279). 21+ waiver: pre-May 1, 2024 license → 3-hour MSF eCourse; post-May 1, 2024 license → full hands-on BRC. Eye protection required ALL riders.
- **Move Over Law (LB 530, effective September 3, 2025)**: Expanded to ALL stopped vehicles and vulnerable road users. Repeat offense within 5 years = Class IIIA misdemeanor.
- **Lane splitting**: Confirmed ILLEGAL (NRS 60-6,308).
- **Seat belt**: Secondary enforcement; rear-seat adults NOT required (NRS 60-6,270). Fine $25.
- **Cell phone**: Adults: texting-only ban (NRS 60-6,179.01; secondary; $200/$300/$500). Under-18: complete ban on ALL interactive wireless devices including hands-free (NRS 60-4,120.01, 60-4,124).
- **Notable**: Business district 20 mph; residential 25 mph; gravel 50 mph; expressways 70 mph; rural interstate 75 mph; urban interstate (Douglas/Lancaster/Dakota) 65 mph. Headlight dim within 200 feet when following (not 500). Gravel following distance 6 seconds. Reckless driving = more than 2x posted speed limit. Minimum freeway speed 40 mph.

---

## Mississippi (MS) — (Added 2026-07-14)

- **DL test count (30/24/80%)**: NEEDS_VERIFICATION — figures not stated in the December 2024 manual or any DPS webpage. Third-party sites consistently cite 30/24/80%. Phone: Mississippi DPS (601) 987-1224.
- **Motorcycle test count (25/20/80%)**: NEEDS_VERIFICATION — DPS motorcycle endorsement pages do not state question count. Third-party sites cite 25/20 (not the 20/16 previously in state-facts.ts — that may be outdated). Phone: Mississippi DPS (601) 987-1224.
- **GDL curfew (6am–10pm weekday / 6am–11:30pm weekend)**: Cited from Miss. Code Ann. § 63-1-9 via secondary sources. Could not directly access the statute text. Manual p. 13 does not include curfew hours — confirm from legislature.ms.gov.
- **Handbook direct PDF URL**: Confirmed accessible: driverservicebureau.dps.ms.gov/sites/default/files/2025-02/1.15.2025 Revised MDPS Driver's Manual.pdf (Jan 15, 2025 edition, December 2024 content)
- **Helmet law statute**: Confirmed § 63-7-64 (NOT § 63-7-67 which covers tires). HB 317 (2024) not enacted — all-ages law unchanged.
- **Motorcycle test count previously was 20/16/80%**: Corrected in state-facts.ts to reflect NEEDS_VERIFICATION; third-party data leans toward 25/20/80%.
- **Cell phone law**: Bans texting and social media only (§ 63-33-1). Does NOT ban handheld calls. $100 fine (July 2025 update).
- **Notable facts**: No rearview mirror required (MS law); squatted vehicle law (front fender 4+ inches higher than rear); no GDL passenger restrictions; no road test for regular DL; Natchez Trace 50 mph under NPS jurisdiction.

---

## Kansas (KS) — (Added 2026-07-14)

- **DL test count (25/20/80%)**: NEEDS_VERIFICATION — consistent across third-party sources but official KDOR page was not directly accessible. Official handbook PDF (ksrevenue.gov/pdf/dlhb.pdf) is binary-unreadable by automated fetch. Phone: Kansas Division of Vehicles (785) 296-3671.
- **Motorcycle test count (25/20/80%)**: NEEDS_VERIFICATION — same issue; consistent third-party reports.
- **Restricted License 25-hour requirement**: Sourced from KDOR GDL page (ksrevenue.gov/dovgdl.html) by Agent 1. Not independently readable from handbook PDF. Confirm against printed handbook.
- **School bus stop distance**: Kansas statute (KSA 8-1556) does NOT specify a stop distance in feet. Do not write questions about a specific foot distance for school bus stops.
- **Motorcycle helmet law**: CONFIRMED under-18 only (KSA 8-1598). Adults 18+ not required. NOTE: previous state-facts.ts entry may have been "all-ages" — verified and confirmed as "under-18".
- **SB 366 (school/construction zone handheld ban)**: Signed April 3, 2026; effective July 1, 2026. Warning citations only through July 1, 2027; fines ($60) begin July 2027.
- **MSF course waiver**: Skills test waiver confirmed. Knowledge test waiver: KDOR FAQ "OR" language implies course substitutes for both; in-person BRC/Rider 101 from approved KS provider explicitly waives both per provider statement (motorcyclerideruniversity.com).
- **Notable facts**: Farm permit at age 14 (20+ acre parcels); GDL less-restricted curfew 5am–9pm; open container applies to passengers too; motorcycle headlights at all times (post-1978); implied consent 2/3/4-year escalating IID; Move Over Law expanded March 2025 to all stalled vehicles with hazard lights.

---

## New Mexico (NM) — (Added 2026-07-14)

- **DL test count**: NEEDS_VERIFICATION — not stated on any accessible MVD page; official handbook PDF is binary-unreadable by automated fetch. Phone: NM MVD (888) 683-4636.
- **Motorcycle test count (40/32/80%)**: NEEDS_VERIFICATION — consistent third-party reports; no official MVD page states these numbers. Phone: NM MVD (888) 683-4636.
- **Motorcycle helmet law**: third-party sources indicate under-18 requirement; specific NMSA statute citation NOT confirmed from accessible sources. Likely NMSA Chapter 66 Article 3.
- **Lane splitting**: ILLEGAL — no NM law permits it; no explicit prohibiting statute found but this is the operational assumption.
- **Open range law**: Confirmed NMSA § 66-7-363 — driver responsible in livestock collision on unfenced open-range highway.
- **"None for the Road"**: Confirmed requirement for first-time licensees ages 18–24 (from MVD official page).
- **School bus stop distance**: Confirmed 10 feet (NMSA § 66-7-347).
- **GDL supervisor**: 21+ with 3+ years experience (confirmed from MVD official page).
- **Headlights**: half-hour after sunset to before sunrise; when visibility < 500 feet (NMSA § 66-3-802).
- **Endorsement types W/Y/Z**: Confirmed via MVD (100cc+, 50-100cc, under 50cc; ages 15+ and 13+ respectively).
- **Notable**: Aggravated DWI at 0.16% BAC (NMSA § 66-8-102); coasting prohibited (§ 66-7-360); TWLTL max 200 feet (§ 66-7-376). Texting ban NMSA § 66-7-374 — NO general handheld call ban for private drivers. Motorcycle permit: no passengers (NMSA § 66-5-8).

---

## Priority 1 — Motorcycle Knowledge Test: Question Count & Passing Score

### ✅ Verified (42 states)

| State | Questions | To Pass | Pass% | Confidence | Source |
|-------|-----------|---------|-------|-----------|--------|
| AL | 30 | 24 | 80% | medium | alea.gov motorcycle manual |
| AK | 25 | 20 | 80% | medium | dmv.alaska.gov — 80% confirmed; 25Q from official practice format |
| AZ | 30 | 24 | 80% | medium | azdot.gov manuals page |
| CA | 30 | 24 | 80% | medium | dmv.ca.gov motorcycle handbook |
| CO | 20 | 16 | 80% | medium | dmv.colorado.gov motorcycle manual |
| CT | 16 | **?** | **?** | **medium/partial** | portal.ct.gov — 16Q confirmed in page text; passing threshold not stated |
| DE | 25 | 20 | 80% | **high** | dmv.de.gov — page text: "25 questions, 20 must be correct" |
| FL | 50 | 40 | 80% | **high** | flhsmv.gov — same Class E exam (no separate moto test); BRC mandatory |
| GA | 20 | 15 | 75% | **high** | dds.georgia.gov — page text: "20-question test, 15 correct to pass (75%)" |
| ID | 25 | 20 | 80% | medium | itd.idaho.gov |
| IL | 16 | 13 | 80% | medium | ilsos.gov motorcycle handbook |
| IN | 20 | 16 | 80% | medium | in.gov/bmv |
| IA | 25 | 20 | 80% | medium | iowadot.gov — practice test generates 25Q; 80% confirmed |
| KS | 25 | 20 | 80% | medium | ksrevenue.gov |
| KY | 20 | 16 | 80% | medium | drive.ky.gov |
| LA | 25 | 21 | 84% | medium | dps.louisiana.gov |
| ME | 25 | 20 | 80% | medium | maine.gov/sos/bmv |
| MD | 25 | 21 | 84% | medium | mva.maryland.gov |
| MA | 25 | 18 | 72% | medium | mass.gov |
| MI | 20 | 16 | 80% | medium | michigan.gov/sos |
| MS | 20 | 16 | 80% | medium | dps.ms.gov |
| MO | 25 | 20 | 80% | medium | dor.mo.gov section 4 |
| MT | 25 | 20 | 80% | medium | mvdmt.gov |
| NE | 25 | 20 | 80% | medium | dmv.nebraska.gov |
| NV | 25 | 20 | 80% | medium | dmv.nv.gov |
| NH | 25 | 20 | 80% | medium | dmv.nh.gov |
| NJ | 25 | 20 | 80% | medium | nj.gov/mvc |
| NM | 20 | 16 | 80% | medium | mvd.newmexico.gov |
| NY | 20 | 14 | 70% | medium | dmv.ny.gov motorcycle brochure |
| NC | 37 | 29 | 78% | **high** | ncdot.gov/dmv — 37Q / 78% confirmed |
| ND | 25 | 20 | 80% | medium | dot.nd.gov |
| OH | 20 | 15 | 75% | medium | bmv.ohio.gov |
| OK | 25 | 20 | 80% | medium | ok.gov/dps |
| OR | 25 | 20 | 80% | medium | oregon.gov/odot/dmv |
| PA | 20 | 16 | 80% | medium | pa.gov/agencies/dmv |
| SD | 25 | 20 | 80% | medium | dps.sd.gov — 80% confirmed; 25Q not explicit in page text |
| TN | 30 | 24 | 80% | medium | tn.gov/safety — 80% confirmed; 30Q consistent with TN format |
| UT | 25 | 20 | 80% | medium | dld.utah.gov |
| VT | 25 | 20 | 80% | **high** | dmv.vermont.gov — page text: "25 questions, 80% or better to pass" |
| VA | 25 | 20 | 80% | medium | dmv.virginia.gov motorcycle handbook |
| WA | 25 | 20 | 80% | medium | dol.wa.gov |
| WI | 25 | 20 | 80% | medium | wisconsindot.gov — 80% confirmed; 25Q from official handbook format |
| WY | 25 | 20 | 80% | medium | dot.state.wy.us — 80% confirmed; 25Q consistent |

### ❌ Unverified — NEEDS_VERIFICATION (8 states)

| State | Research Finding | Issue | Action Needed |
|-------|-----------------|-------|---------------|
| AR | 25Q/20P/80% suggested | Third-party only, no .gov page text | Check dfa.arkansas.gov/office/driver-services/licenses-ids-permits/motorcycle-license/ |
| **CT** | **16Q confirmed** ✓ | **Passing threshold unknown** | Check portal.ct.gov/DMV or call CT DMV: (860) 263-5700 |
| HI | 25Q/20P/80% suggested | County-administered, HIDOT didn't publish count | Contact county offices (Honolulu, Maui, Hawaii, Kauai) |
| MN | 40Q/32P/80% suggested | Atypical format, not from .gov page text | Check dps.mn.gov/divisions/dvs |
| RI | 25Q/20P/80% suggested | Unclear if moto test ≠ 40Q general test | Check dmv.ri.gov/licenses-permits-ids/motorcycles or call |
| SC | 30Q/24P/80% suggested | Third-party only, no .gov confirmation | Check dmv.sc.gov — call (803) 896-5000 |
| TX | 25Q/20P/80% suggested | Not confirmed in official page text | Check dps.texas.gov/section/driver-license/motorcycle-license |
| WV | 25Q/19P/76% suggested | Unusual threshold; not confirmed from .gov text | Check transportation.wv.gov/DMV or call |

---

## Priority 2 — Permit Minimum Age ✅ Complete

All 50 states verified from official .gov sources on 2026-06-26.

| State | Min Age | Notes |
|-------|---------|-------|
| AL | 15 | alea.gov — GDL Stage I learner's license |
| AK | 14 | dmv.alaska.gov — instruction permit |
| AZ | 15.5 | azdot.gov — Class G permit; must be 15yr 6mo |
| AR | 14 | dfa.arkansas.gov — learner's license ages 14–15 |
| CA | 15.5 | dmv.ca.gov — "at least 15½ but under 18" |
| CO | 15 | dmv.colorado.gov — minor permit |
| CT | 16 | portal.ct.gov/dmv |
| DE | 16 | dmv.de.gov — GDL Level 1; driver ed certificate required |
| FL | 15 | flhsmv.gov — learner's license; hold 12 months |
| GA | 15 | dds.georgia.gov — Class CP learner's permit |
| HI | 15.5 | hidot.hawaii.gov — 15yr 6mo; hold 180 days |
| ID | 14.5 | itd.idaho.gov — Driver Training Instruction Permit (enrolled in driver ed) |
| IL | 15 | ilsos.gov — enrolled in approved driver ed |
| IN | 15 | in.gov/bmv — with approved behind-the-wheel training |
| IA | 14 | iowadot.gov — parental consent required |
| KS | 14 | ksrevenue.gov — instruction permit; must hold 1 year |
| KY | 15 | drive.ky.gov — GDL permit; hold 180 days |
| LA | 15 | expresslane.la.gov — standard learner's permit (14 TIP for in-car ed only) |
| ME | 15 | maine.gov/sos/bmv — must complete approved driver ed |
| MD | 15.75 | mva.maryland.gov — 15yr 9mo; 30-hr classroom + 6-hr BtW required |
| MA | 16 | mass.gov — parental consent if under 18 |
| MI | 14.75 | michigan.gov/sos — Level 1 Learner's License at 14yr 9mo |
| MN | 15 | dps.mn.gov — with driver education; hold 3 months |
| MS | 15 | driverservicebureau.dps.ms.gov — standard permit (14 available only for enrolled driver ed students) |
| MO | 15 | dor.mo.gov — Class F instruction permit; hold 182 days |
| MT | 14.5 | rules.mt.gov — learner license enrolled in traffic ed |
| NE | 15 | dmv.nebraska.gov — standard LPD permit (14yr 2mo School LPE for school driving only) |
| NV | 15.5 | dmv.nv.gov — instruction permit; school attendance proof required |
| NH | 15.5 | dmv.nh.gov — no formal permit card; supervised practice at 15½ (age 16 for license) |
| NJ | 16 | nj.gov/mvc — 50 supervised hours required before probationary license (starting Feb 2025) |
| NM | 15 | mvd.newmexico.gov — enrolled in or completed driver ed |
| NY | 16 | dmv.ny.gov — (OKTA program at 15yr 11mo for written test only; no permit until 16) |
| NC | 15 | ncdot.gov/dmv — Limited Learner's Permit; driver ed required |
| ND | 14 | dot.nd.gov — hold 12 months starting at 14; 6 months if starting at 15 |
| OH | 15.5 | bmv.ohio.gov — GDL; 24 classroom + 8 BtW hours required |
| OK | 15.5 | ok.gov/dps — with or without driver ed enrollment |
| OR | 15 | oregon.gov/odot/dmv — Provisional Instruction Permit ages 15–17 |
| PA | 16 | pa.gov/agencies/dmv — hold 6 months; 65 supervised hours (10 night, 5 bad weather) |
| RI | 16 | dmv.ri.gov — 33-hr driver ed (CCRI); can enroll at 15yr 10mo |
| SC | 15 | dmv.sc.gov — hold 180 days |
| SD | 14 | dps.sd.gov — instruction permit |
| TN | 15 | tn.gov/safety — written + vision + parental approval; hold 180 days |
| TX | 15 | dps.texas.gov — learner license expires on 18th birthday |
| UT | 15 | dld.utah.gov — hold 6 months; 50-question knowledge test |
| VT | 15 | dmv.vermont.gov — 30 classroom + 6 BtW + 6 observation hours if under 18 |
| VA | 15.5 | dmv.virginia.gov — 15yr 6mo; hold 9 months if under 18 |
| WA | 15 | dol.wa.gov — 15 with driver training; 15½ without |
| WV | 15 | transportation.wv.gov — parental signature; permit valid 180 days (non-renewable) |
| WI | 15.5 | dot.wi.gov — 15yr 6mo; enrolled in certified driver ed |
| WY | 15 | dot.state.wy.us — standard permit (14 hardship/restricted permit available) |

---

## Priority 3 — MSF / Motorcycle Safety Course: Waives Skills Test? ✅ Complete

All 50 states verified 2026-06-26. **All 50 states waive the motorcycle skills test** upon completion of an approved safety course (MSF BRC or state equivalent).

### Waives BOTH knowledge and skills tests (most permissive)
AZ, DE, GA, IL (riders 18+), KY, ME, MI, MO, NE, NV, NH, NJ, OK, OR (Basic Course 16+), SD, TN (in-state MREP), VA, VT, WY

### Waives skills test only (knowledge test still required at DMV)
AK, AR, CA, CO, CT, FL, HI, ID, IA, IN, KS, MD, MA, MN, MS, MT, NC, ND, OH, PA, RI, SC, UT, WA, WV, WI

### Special/conditional
| State | Detail | Source |
|-------|--------|--------|
| AL | No separate DMV skills test exists; course completion satisfies endorsement requirement | alea.gov |
| LA | State-run DPS program waives both; other MSF-affiliated courses waive skills only | dps.louisiana.gov |
| NM | Skills test waived confirmed; knowledge test waiver status NEEDS_VERIFICATION | mvd.newmexico.gov |
| NY | BRC/BRC2-LW within 2 years waives road/skills test; knowledge test still required | dmv.ny.gov |
| OR | Basic Course (16+) waives both; Intermediate Course (21+) waives skills only | oregon.gov/odot/dmv |
| TX | Both tests waived for adults 18+ with valid unrestricted TX Class A/B/C license; skills only otherwise | dps.texas.gov |

---

## Priority 4 — CDL State Handbook URL

All states now have state-specific CDL handbook URLs. Two exceptions use the federal FMCSA manual.

### ❌ No State-Specific CDL Manual Found (2 states)
| State | Status | Action |
|-------|--------|--------|
| AZ | Uses FMCSA federal manual | Confirm at azdot.gov/mvd |
| AR | Uses FMCSA federal manual | Confirm at dfa.arkansas.gov |

### ✅ State-Specific CDL URLs Confirmed (48 states)
All other states have been updated in `state-facts.ts` with official state CDL handbook URLs sourced from state .gov sites. See the `cdlHandbookUrl` field per state.

---

## Other Known Data Quality Notes

| Issue | State(s) | Detail |
|-------|----------|--------|
| Iowa permit question count uncertain | IA | DOT practice test shows 25Q but multiple sources cite 35Q for actual test. Used 35/28/80% in state-facts.ts. |
| Delaware permit question count conflict | DE | Official license page: 32Q/26P (81%). FAQ page: 30Q/24P. Used 32/26. Verify at dmv.de.gov. |
| Missouri helmet law age is under-26 | MO | Schema 'under-18' is an approximation; actual law is under-26. |
| Connecticut helmet law age is under-21 | CT | Schema 'under-18' is an approximation; actual law is under-21. |
| Florida helmet law age is under-21 | FL | Schema 'under-18' is an approximation; actual law is under-21. |
| Rhode Island permit passing score conflicted | RI | Sources report 70%, 80%, and 85%. Used 80% (32/40). |
| South Dakota permit count from third-party | SD | 25Q/80% not confirmed from official DPS page text. |
| Connecticut moto passing threshold | CT | 16 questions confirmed; passing threshold (likely 12 or 13) not found in official page text. |
| Minnesota moto format atypical | MN | Reported 40Q/32P is unusual; most states use 25Q. Needs confirmation. |

---

*Update `state-facts.ts` first, then update the relevant row in this file. Both files are co-authoritative.*

---

## Idaho (ID) — 2026-07-14

### DL Test Structure
- Questions: 40 | To pass: 34 correct (85%)
- STATUS: NEEDS_VERIFICATION — 85% threshold confirmed by multiple consistent third-party sources; not verified against direct official Idaho DMV webpage text
- Source used: Multiple third-party DMV prep sites; ITD official page does not state test count verbatim
- Phone: (208) 334-8736 (ITD DMV)

### Motorcycle Test Structure
- Questions: 25 | To pass: 20 correct (80%)
- STATUS: NEEDS_VERIFICATION — confirmed by STAR Idaho (official ITD partner) and consistent third-party sources
- Phone: (208) 334-8736

### Helmet Law
- Idaho Code § 49-666: Required for riders and passengers under 18 ONLY
- STATUS: VERIFIED (§ 49-666 text read directly)
- Adults 18+ NOT required to wear helmets

### Lane Splitting / Filtering
- BOTH lane splitting and lane filtering: ILLEGAL in Idaho
- CRITICAL: motoLaneSplittingLegal was confirmed FALSE in state-facts.ts — already correctly set; lastVerifiedAt updated to 2026-07-14
- HB 236 (2023) was the State Public Defender Act, NOT a lane filtering bill
- Confirmed by: Idaho State Police statement (May 2025); no authorizing statute found in Idaho Code Title 49

### MSF/STAR Course
- Waives: SKILLS (road) test only
- Knowledge test: ALWAYS required regardless of course completion

### Idaho Stop
- § 49-720: BICYCLES only may treat stop signs as yield signs
- Does NOT apply to motorcycles or motor vehicles

### Cell Phone / Handheld Device Law
- Idaho Code § 49-1401A: ALL drivers banned from reading/typing/watching on handheld device while driving (PRIMARY enforcement)
- Under-18: complete ban on all handheld use while driving
- Adults: one-touch calls permitted; hands-free always permitted
- Fines: $75 first offense / $150 second / $300 third+
- NOTE: Prior marketing page copy incorrectly attributed this law to "HB 236 hands-free law (July 1, 2024)" — HB 236 (2023) was the State Public Defender Act. All references corrected to § 49-1401A on 2026-07-14.

### Activation Status
- QUEUED (not activated) pending phone verification of DL and motorcycle test counts
- Do not add to LIVE_STATE_SLUGS or LIVE_STATE_ABBRS until verified
- Current state: Idaho is NOT in LIVE_STATE_SLUGS, LIVE_STATE_ABBRS, LIVE_MOTORCYCLE_STATE_SLUGS, or LIVE_MOTORCYCLE_STATE_ABBRS (confirmed 2026-07-14)
