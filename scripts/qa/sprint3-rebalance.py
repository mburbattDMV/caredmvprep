#!/usr/bin/env python3
"""
Sprint 3: Difficulty rebalancing.
Applies only genuine difficulty corrections identified by per-question audit.
Each change is justified in the audit report at /tmp/difficulty-audit-report.txt.

Rules:
  1 = Easy  : basic recall / very common rule
  2 = Medium: normal application of a specific rule
  3 = Hard  : judgment, edge cases, calculations, specific thresholds, uncommon rules
"""

import re
import sys
import os
from typing import Dict, Tuple, List

BASE = os.path.join(os.path.dirname(__file__), '..', '..')

# --------------------------------------------------------------------------
# Change maps: { question_id: new_difficulty }
# --------------------------------------------------------------------------

DMV_CHANGES: Dict[str, int] = {
    # ── Medium → Easy (basic recall / universal rules) ─────────────────────
    'ca-dmv-row-001':   1,  # yield to oncoming when left on green — foundational rule
    'ca-dmv-row-002':   1,  # yield to right at uncontrolled intersection
    'ca-dmv-row-006':   1,  # yield to traffic already in roundabout
    'ca-dmv-row-007':   1,  # merging traffic yields to freeway traffic
    'ca-dmv-row-008':   1,  # right turn on red after complete stop
    'ca-dmv-row-009':   1,  # road-that-ends yields at T-intersection
    'ca-dmv-row-011':   1,  # yield exiting driveway/alley
    'ca-dmv-row-014':   1,  # 4-way stop tie: yield to right
    'ca-dmv-row-017':   1,  # yield to pedestrians exiting parking lot
    'ca-dmv-row-018':   1,  # yield sign: slow, stop if needed
    'ca-dmv-row-020':   1,  # yield entering public road from private road
    'ca-dmv-row-022':   1,  # green arrow = protected left turn
    'ca-dmv-row-024':   1,  # flashing yellow arrow = yield before turning left
    'ca-dmv-row-025':   1,  # flashing red = treat as stop sign
    'ca-dmv-row-026':   1,  # unprotected left on green = yield oncoming
    'ca-dmv-row-027':   1,  # yield exiting parking lot
    'ca-dmv-row-030':   1,  # T-intersection: road-ending yields
    'ca-dmv-row-031':   1,  # yield to pedestrians at unmarked crosswalk
    'ca-dmv-row-034':   1,  # 4-way stop: left-turner yields to straight vehicle
    'ca-dmv-row-035':   1,  # yield to all traffic when making U-turn
    'ca-dmv-sign-001':  1,  # solid yellow center = no passing
    'ca-dmv-sign-007':  1,  # solid white line = traffic may not cross
    'ca-dmv-sign-008':  1,  # blue signs = motorist services
    'ca-dmv-sign-010':  1,  # circular sign = railroad crossing advance warning
    'ca-dmv-sign-011':  1,  # pentagon = school zone
    'ca-dmv-sign-012':  1,  # white edge line = road boundary
    'ca-dmv-sign-015':  1,  # solid green arrow = protected left turn
    'ca-dmv-sign-016':  1,  # red X overhead = lane closed
    'ca-dmv-sign-018':  1,  # brown signs = parks/recreation
    'ca-dmv-sign-021':  1,  # WRONG WAY = stop and turn around
    'ca-dmv-sign-022':  1,  # crossbuck = yield at railroad crossing
    'ca-dmv-sign-024':  1,  # chevron signs = guide through curve
    'ca-dmv-sign-025':  1,  # FLAGGER AHEAD = person directing traffic
    'ca-dmv-sign-026':  1,  # diamond with bicycle = cyclists may cross
    'ca-dmv-sign-027':  1,  # KEEP RIGHT = pass to right of divider
    'ca-dmv-sign-028':  1,  # SIGNAL AHEAD = traffic signal coming
    'ca-dmv-sign-029':  1,  # DIVIDED HIGHWAY BEGINS = road splits
    'ca-dmv-sign-030':  1,  # livestock crossing sign
    'ca-dmv-sign-031':  1,  # DIP sign = low spot
    'ca-dmv-sign-032':  1,  # DIVIDED HIGHWAY ENDS
    'ca-dmv-sign-033':  1,  # No U-turn = no U-turns
    'ca-dmv-sign-034':  1,  # walking figure = pedestrian crossing ahead
    'ca-dmv-sign-035':  1,  # two opposing arrows = two-way traffic ahead
    'ca-dmv-speed-004': 1,  # basic speed law: drive no faster than safe
    'ca-dmv-speed-013': 1,  # 15 mph in alley
    'ca-dmv-speed-015': 1,  # basic speed law principle
    'ca-dmv-safe-003':  1,  # hands-free phone law basic recall
    'ca-dmv-safe-007':  1,  # before lane change: signal, mirror, blind spot
    'ca-dmv-safe-015':  1,  # handle drowsiness: pull off and rest
    'ca-dmv-safe-019':  1,  # tire blowout: grip, ease off gas, no sudden brake
    'ca-dmv-safe-020':  1,  # hydroplaning: ease off gas, no hard brake
    'ca-dmv-safe-021':  1,  # increase following distance in rain
    'ca-dmv-safe-022':  1,  # carbon monoxide danger in closed garage
    'ca-dmv-safe-023':  1,  # adjust mirrors before driving
    'ca-dmv-safe-024':  1,  # check intersection before entering on green
    'ca-dmv-safe-025':  1,  # rear wheel skid: steer into skid
    'ca-dmv-safe-032':  1,  # drowsy driving slows reaction time
    'ca-dmv-safe-033':  1,  # fog: use low beams not high
    'ca-dmv-safe-034':  1,  # pass on left on freeway
    'ca-dmv-safe-035':  1,  # space cushion = time/room to react
    'ca-dmv-alc-002':   1,  # refuse chemical test = 1-year suspension
    'ca-dmv-alc-003':   1,  # under-21 BAC limit = 0.01%
    'ca-dmv-alc-004':   1,  # drug DUI same as alcohol DUI
    'ca-dmv-alc-005':   1,  # only time eliminates alcohol
    'ca-dmv-alc-009':   1,  # DUI for marijuana even if legal
    'ca-dmv-alc-010':   1,  # prescription drug can still = DUI if impaired
    'ca-dmv-park-002':  1,  # uphill with curb: wheels away from curb
    'ca-dmv-park-005':  1,  # green curb = limited time parking
    'ca-dmv-park-006':  1,  # blue curb = disabled parking
    'ca-dmv-park-009':  1,  # one-way street: park on either side
    'ca-dmv-park-011':  1,  # double parking = illegal
    'ca-dmv-park-012':  1,  # downhill with curb: wheels toward curb
    'ca-dmv-share-001': 1,  # Three Feet for Safety Act: 3-ft min passing
    'ca-dmv-share-003': 1,  # stop for blind pedestrian with white cane
    'ca-dmv-share-004': 1,  # truck's largest blind spot = right side
    'ca-dmv-share-005': 1,  # don't pass truck on right when swinging left
    'ca-dmv-share-006': 1,  # motorcyclist entitled to full lane width
    'ca-dmv-share-009': 1,  # prepare to stop when children near school

    # ── Easy → Hard (specific threshold, surprising rule) ──────────────────
    'ca-dmv-sign-020':  3,  # insurance minimum 15/30/5 — 3 specific numbers

    # ── Medium → Hard (specific thresholds / edge cases / uncommon rules) ───
    'ca-dmv-speed-006': 3,  # 15 mph within 100 ft of railroad + sight distance condition
    'ca-dmv-speed-008': 3,  # 55 mph limit for towing vehicles
    'ca-dmv-speed-016': 3,  # advisory speed signs not legally enforceable
    'ca-dmv-row-010':   3,  # blind intersection 15 mph + cannot see 100 ft condition
    'ca-dmv-row-013':   3,  # right turn across bike lane: merge within 200 ft + yield
    'ca-dmv-row-015':   3,  # school bus exception: physical barrier (not painted median)
    'ca-dmv-row-019':   3,  # instruction permit supervisor: 25+ OR parent/guardian
    'ca-dmv-row-021':   3,  # permit: 6 months + 50 hrs (10 night)
    'ca-dmv-row-023':   3,  # provisional: no passengers under 20 without licensed 25+ adult
    'ca-dmv-row-028':   3,  # point system: reckless = 2 pts vs speeding = 1 pt
    'ca-dmv-row-033':   3,  # 26,000 lb exactly = Class C boundary
    'ca-dmv-sign-009':  3,  # pennant shape on LEFT side = no-passing zone start
    'ca-dmv-sign-013':  3,  # double solid white = no HOV entry here
    'ca-dmv-sign-014':  3,  # flashing yellow arrow = unprotected left, yield required
    'ca-dmv-sign-023':  3,  # SR-22: what it is, when required
    'ca-dmv-safe-008':  3,  # Move Over: lane change OR slow below limit if can't change
    'ca-dmv-safe-009':  3,  # U-turn prohibited: multiple specific condition list
    'ca-dmv-safe-010':  3,  # dim headlights: 500 ft oncoming / 300 ft ahead
    'ca-dmv-safe-016':  3,  # CVC §22400 minimum speed law
    'ca-dmv-safe-028':  3,  # signal 100 ft business/residential vs 200 ft elsewhere
    'ca-dmv-safe-030':  3,  # dim high beams within 500 ft of oncoming
    'ca-dmv-alc-006':   3,  # admin per se: 4-month failed / 1-year refusal
    'ca-dmv-alc-007':   3,  # 0.04% BAC limit for commercial drivers
    'ca-dmv-alc-008':   3,  # DUI possible below 0.08% under impairment standard
    'ca-dmv-alc-011':   3,  # DUI becomes felony: 3 priors in 10 yrs OR injury/death
    'ca-dmv-alc-012':   3,  # under-21: 0.05% BAC = 30-day impound
    'ca-dmv-park-007':  3,  # no parking within 20 ft of crosswalk at intersection
    'ca-dmv-park-010':  3,  # no parking within 5 ft of driveway
    'ca-dmv-share-002': 3,  # enter bike lane only within 200 ft before right turn
    'ca-dmv-share-007': 3,  # flagger signals supersede traffic signals
    'ca-dmv-share-008': 3,  # must yield to livestock
}

MOTO_CHANGES: Dict[str, int] = {
    # ── Medium → Easy (basic recall / foundational rules) ──────────────────
    'ca-moto-alc-001':   1,  # alcohol more dangerous for motorcyclists: balance
    'ca-moto-gear-002':  1,  # eye protection required unless windshield equipped
    'ca-moto-gear-006':  1,  # helmets must meet DOT FMVSS 218 standard
    'ca-moto-gear-007':  1,  # gloves protect hands extended instinctively in fall
    'ca-moto-gear-008':  1,  # motorcycle boots cover ankles
    'ca-moto-gear-010':  1,  # leather/textile with CE armor = best abrasion protection
    'ca-moto-gear-011':  1,  # all operators AND passengers must wear helmets
    'ca-moto-gear-013':  1,  # helmet fit: level, doesn't move, cheek pads touch
    'ca-moto-gear-014':  1,  # conspicuity: bright clothing + reflective materials
    'ca-moto-gear-015':  1,  # jacket protects primarily by abrasion resistance
    'ca-moto-gear-020':  1,  # footwear should cover and support ankles
    'ca-moto-haz-001':   1,  # center of lane most slippery (oil accumulation)
    'ca-moto-haz-003':   1,  # cross railroad tracks at 90-degree angle
    'ca-moto-haz-009':   1,  # first rain most dangerous: oil + dust = slippery film
    'ca-moto-lane-001':  1,  # best lane position = left third
    'ca-moto-lane-002':  1,  # motorcyclist entitled to full lane width
    'ca-moto-law-001':   1,  # required equipment list: headlight, taillight, etc.
    'ca-moto-law-002':   1,  # two motorcycles may ride abreast in one lane
    'ca-moto-law-004':   1,  # BAC limit for motorcyclists: 0.08%
    'ca-moto-law-007':   1,  # cannot use handheld cell phone while riding
    'ca-moto-law-009':   1,  # lane splitting legal in CA, CHP issues guidelines
    'ca-moto-pass-001':  1,  # passenger requires: seat, footrests, helmet
    'ca-moto-pass-002':  1,  # cargo: keep low and centered, balance saddlebags
    'ca-moto-tech-004':  1,  # front brake provides ~70% of stopping power
    'ca-moto-tech-005':  1,  # gravel, sand, wet leaves = dangerous conditions
    'ca-moto-tech-007':  1,  # signs of fatigue: missing turns, drifting
    'ca-moto-tech-008':  1,  # most crashes at intersections (car turning left)
    'ca-moto-tech-010':  1,  # look through the curve to exit
    'ca-moto-tech-011':  1,  # rain: reduce speed, avoid painted lines/grates
    'ca-moto-tech-015':  1,  # night riding: increase following distance
    'ca-moto-tech-017':  1,  # minimum following distance: 3 seconds
    'ca-moto-tech-020':  1,  # body in curve: look through exit, knees against tank
    'ca-moto-tech-022':  1,  # emergency brake without ABS: both brakes, ease if locks
    'ca-moto-tech-025':  1,  # passenger: hold waist/grab handles, feet on pegs
    'ca-moto-tech-030':  1,  # stopping on slippery surface: both brakes gradually
    'ca-moto-tech-039':  1,  # swerve first, then brake after straightening
    'ca-moto-tech-045':  1,  # emergency stop: both brakes simultaneously
    'ca-moto-tech-046':  1,  # cornering sequence: slow, look, press, roll

    # ── Easy → Hard (specific threshold, counter-intuitive rule) ───────────
    'ca-moto-tech-038': 3,  # min tire tread: 1/32 in (not 1/16 like cars — a trap)

    # ── Medium → Hard (judgment / edge cases / specific specs) ─────────────
    'ca-moto-tech-002':  3,  # 3-4 sec following distance: WHY motorcycles need more
    'ca-moto-tech-019':  3,  # M1 permit: specific restriction list (freeway, night, etc.)
    'ca-moto-tech-021':  3,  # entering curve too fast: avoid braking, lean more
    'ca-moto-tech-028':  3,  # sandwiched between trucks: judgment scenario
    'ca-moto-tech-029':  3,  # crosswind: lean into wind, ease throttle
    'ca-moto-tech-034':  3,  # downshift BEFORE curve (not during) — traction physics
    'ca-moto-tech-035':  3,  # flat tire at speed: counter-intuitive steps
    'ca-moto-tech-040':  3,  # chain slack: 1/2 to 1 inch — specific spec
    'ca-moto-haz-006':   3,  # car stops suddenly: brake first, swerve as last resort
    'ca-moto-gear-009':  3,  # mountain descent: engine braking supplements brakes
    'ca-moto-gear-016':  3,  # select lower gear BEFORE descent begins
    'ca-moto-gear-018':  3,  # gravel accumulates on outside of mountain curves
    'ca-moto-law-010':   3,  # waive skills test: must complete CMSP course
}

CDL_CHANGES: Dict[str, int] = {
    # ── Medium → Easy (core CDL knowledge / basic recall) ──────────────────
    'fed-cdl-hos-001':   1,  # 11 hours/day driving limit — most basic HOS rule
    'fed-cdl-hos-002':   1,  # 10 hours off duty required
    'fed-cdl-hos-006':   1,  # short-haul exemption: 150 air-mile radius, return in 14 hrs
    'fed-cdl-hos-007':   1,  # 34-hour restart resets weekly cycle
    'fed-cdl-hos-009':   1,  # 30-minute break after 8 hours driving
    'fed-cdl-hos-011':   1,  # co-driver can log sleeper time while vehicle moves
    'fed-cdl-weight-001':1,  # 80,000 lb max GVW on interstate
    'fed-cdl-cdl-002':   1,  # 0.04% BAC limit for CDL holders
    'fed-cdl-cargo-001': 1,  # check cargo within first 50 miles
    'fed-cdl-cargo-002': 1,  # load cargo evenly, against front wall, tie down
    'fed-cdl-cargo-004': 1,  # re-check cargo every 3 hours or 150 miles
    'fed-cdl-cargo-005': 1,  # cargo check timing combined rule
    'fed-cdl-rail-001':  1,  # which vehicles must stop at all railroad crossings
    'fed-cdl-rail-002':  1,  # never shift gears while crossing railroad tracks
    'fed-cdl-night-001': 1,  # don't overdrive headlights — stop within visible distance
    'fed-cdl-speed-001': 1,  # double following distance on wet roads
    'fed-cdl-speed-002': 1,  # CMVs higher rollover risk due to high CG
    'fed-cdl-speed-003': 1,  # use escape ramp at FIRST sign of brake problems
    'fed-cdl-emrg-002':  1,  # emergency triangles: 10 ft / 100 ft / 200 ft placement
    'fed-cdl-hazmat-001':1,  # HazMat endorsement: required when vehicle needs placard
    'fed-cdl-hazmat-002':1,  # HazMat vehicle stops 15-50 ft from railroad track
    'fed-cdl-couple-001':1,  # glad hand colors: service=blue, emergency=red
    'fed-cdl-insp-004':  1,  # fifth wheel tug test procedure
    'fed-cdl-insp-007':  1,  # brake fade = heat buildup from repeated braking
    'fed-cdl-insp-008':  1,  # windshield: no obstructions, no impairing cracks
    'fed-cdl-insp-009':  1,  # parking brake test: apply and try to move
    'fed-cdl-insp-010':  1,  # confirm fifth wheel locked: tug with trailer brakes
    'fed-cdl-insp-013':  1,  # required emergency equipment: 3 triangles, extinguisher
    'fed-cdl-insp-014':  1,  # out-of-adjustment brakes = longer stopping + fade risk
    'fed-cdl-insp-015':  1,  # all required lights must work and be correct color

    # ── Hard → Easy (flagged as Hard but is basic recall) ──────────────────
    'fed-cdl-grade-001': 1,  # select correct gear BEFORE descent — most basic downgrade rule

    # ── Hard → Medium (specific but standard CDL knowledge, not edge case) ──
    'fed-cdl-brake-001': 2,  # normal air pressure range: 100-125 psi (specific but standard)
    'fed-cdl-brake-002': 2,  # hydraulic brake failure: pump then downshift + parking brake
    'fed-cdl-brake-003': 2,  # stopping distance at 55 mph ≈ 360 ft
    'fed-cdl-brake-004': 2,  # brake fade caused by heat from continuous braking
    'fed-cdl-skid-001':  2,  # drive wheel skid: release brakes, steer direction you want
    'fed-cdl-skid-002':  2,  # jackknife: drive wheels lock under braking
    'fed-cdl-emrg-001':  2,  # front tire blowout: hold wheel, accelerate slightly
    'fed-cdl-hos-003':   2,  # 70-hour/8-day rule
    'fed-cdl-hos-004':   2,  # 14-hour on-duty window

    # ── Medium → Hard (calculations / specific thresholds / edge cases) ─────
    'fed-cdl-insp-006':  3,  # steer axle tread: 4/32 inch minimum
    'fed-cdl-insp-011':  3,  # air brake static leak: 3 psi/min single, 4 psi/min combo
    'fed-cdl-insp-012':  3,  # recap tires prohibited on steering axle
    'fed-cdl-hos-008':   3,  # sleeper berth split: 7+2 hrs, neither counts against 14-hr
    'fed-cdl-hos-010':   3,  # adverse driving: 2 extra hours (13 total) for unexpected conditions
    'fed-cdl-cargo-006': 3,  # aggregate WLL: 0.5g forward, 0.2g rearward, 0.2g lateral
    'fed-cdl-space-001': 3,  # following distance formula: 1 sec/10 ft + 1 extra over 40 mph
}

SB_CHANGES: Dict[str, int] = {
    # ── Medium → Hard (multi-condition judgment) ─────────────────────────────
    'fed-cdl-sb-009': 3,   # when to evacuate: trade-off judgment (fire/train/risk worse than leaving)
}

TANK_CHANGES: Dict[str, int] = {
    # ── Medium → Easy (fundamental tank safety rules) ─────────────────────
    'fed-cdl-tank-005': 1,  # slow before curve — most basic tank safety rule
    'fed-cdl-tank-013': 1,  # brake earlier / more gradually due to surge

    # ── Medium → Hard (counter-intuitive physics principle) ───────────────
    'fed-cdl-tank-012': 3,  # partial load surges MORE than full — counter-intuitive
}

# --------------------------------------------------------------------------
# Engine
# --------------------------------------------------------------------------

def apply_changes_to_file(filepath: str, changes: Dict[str, int]) -> List[str]:
    """
    Read file, change difficulty values for listed IDs, write back.
    Returns list of change records: "CHANGED id: 2->1" or "SKIPPED id (already 1)"
    """
    with open(filepath, 'r') as f:
        lines = f.readlines()

    log: List[str] = []
    target_id: str | None = None
    target_diff: int = 0

    new_lines = []
    for line in lines:
        # Detect question ID
        id_match = re.search(r"id:\s*'([^']+)'", line)
        if id_match:
            found = id_match.group(1)
            if found in changes:
                target_id = found
                target_diff = changes[found]

        # If inside a tracked block, look for difficulty field
        if target_id and re.search(r'\bdifficulty:', line):
            cur_match = re.search(r'difficulty:\s*(\d+)', line)
            if cur_match:
                cur_val = int(cur_match.group(1))
                if cur_val != target_diff:
                    line = re.sub(r'(difficulty:\s*)\d+', rf'\g<1>{target_diff}', line)
                    log.append(f"  CHANGED  {target_id}: {cur_val} → {target_diff}")
                else:
                    log.append(f"  SKIPPED  {target_id}: already {cur_val}")
            target_id = None

        new_lines.append(line)

    with open(filepath, 'w') as f:
        f.writelines(new_lines)

    return log

# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------

def main():
    banks = [
        ("CA DMV",          "src/data/questions/dmv/california.ts",        DMV_CHANGES),
        ("CA Motorcycle",   "src/data/questions/motorcycle/california.ts",  MOTO_CHANGES),
        ("CDL Federal GK",  "src/data/questions/cdl/federal.ts",           CDL_CHANGES),
        ("CDL School Bus",  "src/data/questions/cdl/school-bus.ts",        SB_CHANGES),
        ("CDL Tank Vehicle","src/data/questions/cdl/tank-vehicles.ts",     TANK_CHANGES),
    ]

    total_changed = 0
    total_skipped = 0

    for label, relpath, changes in banks:
        filepath = os.path.join(BASE, relpath)
        print(f"\n{'═'*60}")
        print(f"  {label}")
        print(f"{'═'*60}")
        log = apply_changes_to_file(filepath, changes)
        changed = sum(1 for l in log if 'CHANGED' in l)
        skipped = sum(1 for l in log if 'SKIPPED' in l)
        print(f"  Applied: {changed} changes,  Already-correct: {skipped}")
        for entry in log:
            print(entry)
        total_changed += changed
        total_skipped += skipped

    print(f"\n{'═'*60}")
    print(f"  TOTAL: {total_changed} difficulty values changed")
    print(f"         {total_skipped} already at target (no change needed)")
    print(f"{'═'*60}")

if __name__ == '__main__':
    main()
