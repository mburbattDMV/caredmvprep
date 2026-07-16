import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Rhode Island DMV Practice Test 2026 – Free RI Knowledge Exam Prep",
  description: "Prepare for the Rhode Island DMV 40-question knowledge test. Covers RI-specific laws: 0.02% under-21 BAC civil offense, 0.15% enhanced DUI tier, GDL 1–5 AM curfew, all-handheld cell phone ban, high-beam dimming at 500/200 ft, and school bus rules.",
  alternates: { canonical: "https://caredmvprep.com/rhode-island-dmv-practice-test" },
  openGraph: { url: "https://caredmvprep.com/rhode-island-dmv-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Rhode Island",
  stateAbbr: "RI",
  testLabel: "DMV Practice Test",
  slug: "rhode-island-dmv-practice-test",
  headline: "Rhode Island DMV Practice Test 2026",
  intro: "The Rhode Island Division of Motor Vehicles (DMV) administers a 40-question knowledge exam. This practice test covers the Rhode Island-specific laws you need to know: the two-tier impaired driving system (civil § 31-27-2.7 vs. criminal DUI), GDL requirements, cell phone ban, the unique high-beam dimming distances, and more.",
  basedOn: "Rhode Island General Laws Title 31; Rhode Island DMV Driver's Manual",
  keyRules: [
    { icon: "🍺", rule: "Under-21 BAC: 0.02% Civil Offense — Not Criminal DUI", detail: "Rhode Island § 31-27-2.7 creates a civil 'Driving While Impaired' offense for drivers under 21 with a BAC at or above 0.02% but below 0.08%. This is NOT a criminal DUI — it is a civil penalty with license consequences. At 0.08% or higher, criminal DUI (§ 31-27-2) applies to any driver regardless of age." },
    { icon: "🔒", rule: "Enhanced DUI at 0.15%+ BAC", detail: "Rhode Island imposes an enhanced DUI penalty tier at 0.15% BAC or higher (§ 31-27-2). This triggers mandatory ignition interlock device installation, extended suspension, and significantly higher fines — in addition to base DUI penalties." },
    { icon: "📋", rule: "Implied Consent — Escalating Refusal Penalties", detail: "Refusing a chemical test (§ 31-27-2.1) carries: 1st refusal = 6–12 months suspension + $200–$500 fine; 2nd refusal = 1–2 years + up to 6 months jail; 3rd or more = 2–5 years. Refusal is also admissible as evidence at trial." },
    { icon: "🧑‍🎓", rule: "GDL: 16+, 33-Hour In-Person Driver Ed Required", detail: "Rhode Island requires a 33-hour in-person driver education course certified by CCRI before teens can get a Stage 1 permit at age 16. Online courses are not accepted (banned since 2022). Teens must hold the permit 6 months, complete 50 supervised hours (10 at night), and submit a signed affidavit." },
    { icon: "🕐", rule: "GDL Curfew: 1:00 AM–5:00 AM", detail: "Stage 2 Limited Provisional License holders may not drive unsupervised between 1:00 AM and 5:00 AM. Exceptions: driving to/from work and school athletic events. In the first 12 months, Stage 2 drivers are limited to a maximum of 1 unrelated passenger under 21 (family members are exempt)." },
    { icon: "📱", rule: "Cell Phones: All-Handheld Ban; Absolute Ban Under 18", detail: "Rhode Island § 31-22-30 bans ALL handheld device use for every driver — calling, texting, navigation, and music. Adults 18+ may use hands-free devices. Drivers under 18 face an absolute ban including hands-free, with the only exception being a genuine 911 emergency call." },
    { icon: "🪑", rule: "Seat Belt: Primary Enforcement, $40 Fine", detail: "Rhode Island has primary enforcement — officers can stop a vehicle solely for a seat belt violation. The base fine is $40 per violation. Children must use an approved restraint when under 8 years old AND under 57 inches tall AND under 80 lbs — all three conditions must apply together." },
    { icon: "💡", rule: "High Beams: 500 ft Oncoming / 200 ft Following", detail: "Rhode Island § 31-24-23 requires dimming high beams within 500 feet of oncoming traffic and within 200 feet of a vehicle being followed. The 200-foot following distance is shorter than most states' 300-foot standard — a commonly tested Rhode Island distinction." },
    { icon: "🌙", rule: "Interior Dome Light at Police Stops (Night)", detail: "Rhode Island § 31-22-24 uniquely requires drivers to turn on the vehicle's interior dome light when stopped by law enforcement before dawn or after dusk. This RI-distinctive law is directly tested on the exam." },
    { icon: "🚌", rule: "School Bus: All Directions + 50-ft Following Distance", detail: "All traffic in both directions must stop for a school bus with red lights flashing (divided highway exception applies). Drivers must maintain at least a 50-foot following distance behind a school bus in the same lane. First-offense fine: up to $300." },
  ],
  about: [
    "Rhode Island's knowledge exam consists of 40 questions drawn from the Rhode Island Driver's Manual and General Laws Title 31. The test covers traffic laws, road signs, GDL requirements, alcohol and drug statutes, and safe driving practices. Contact the RI DMV directly to confirm the current passing threshold — sources have varied on this figure, and the official number should be verified before your test.",
    "Rhode Island has a distinctive two-tier impaired driving system for underage drivers. Under § 31-27-2.7, a driver under 21 with a BAC of 0.02% to 0.07% faces a civil 'Driving While Impaired' offense — not the criminal DUI label — with penalties including license suspension and fines. A BAC at or above 0.08% triggers criminal DUI (§ 31-27-2) for any driver regardless of age. An enhanced penalty tier at 0.15%+ BAC imposes mandatory ignition interlock requirements. Implied consent refusals carry escalating suspensions from 6–12 months (first) up to 2–5 years (third or more).",
    "Rhode Island's Graduated Driver Licensing (GDL) program begins at age 16 with a Stage 1 Limited Instruction Permit. Applicants must first complete a 33-hour in-person CCRI-certified driver education course — online courses have not been accepted since 2022. Stage 1 requires a 6-month holding period and 50 supervised driving hours (10 at night), documented by an affidavit. Stage 2 provisional drivers face a 1:00 AM–5:00 AM curfew and a limit of one unrelated passenger under 21 during the first 12 months. Rhode Island also has a distinctive law requiring drivers to turn on their interior dome light when stopped by law enforcement at night (§ 31-22-24).",
  ],
  sampleQuestions: [
    {
      question: "A 19-year-old Rhode Island driver tests at 0.05% BAC at a traffic stop. What is their legal situation?",
      options: ["No violation — 0.05% is below any limit for all drivers", "Civil 'Driving While Impaired' under § 31-27-2.7 because 0.05% is at or above the 0.02% under-21 threshold", "Criminal DUI under § 31-27-2 because they are under 21", "Federal impairment charge because they are under 21"],
      correctIndex: 1,
      explanation: "Rhode Island § 31-27-2.7 sets a 0.02% civil impairment threshold for drivers under 21. A 0.05% BAC exceeds that threshold, triggering the civil 'Driving While Impaired' offense — not the criminal DUI statute (§ 31-27-2), which requires 0.08%. The civil charge still carries serious consequences including license suspension."
    },
    {
      question: "At what BAC does Rhode Island impose its enhanced DUI penalty tier — including mandatory ignition interlock?",
      options: ["0.10% or higher", "0.12% or higher", "0.15% or higher", "0.18% or higher"],
      correctIndex: 2,
      explanation: "Rhode Island's DUI statute (§ 31-27-2) establishes an enhanced penalty tier when a driver's BAC reaches 0.15% or higher. This triggers mandatory ignition interlock device installation, extended suspension, and significantly higher fines than a standard 0.08% DUI."
    },
    {
      question: "Rhode Island law requires dimming high beams at what distance when following another vehicle?",
      options: ["300 feet", "100 feet", "500 feet", "200 feet"],
      correctIndex: 3,
      explanation: "Rhode Island § 31-24-23 requires drivers to dim high beams within 200 feet of a vehicle being followed. Most states use a 300-foot standard — Rhode Island's 200-foot threshold is shorter and is a commonly tested distinction on the knowledge exam."
    },
    {
      question: "Under Rhode Island law, what must a driver do when stopped by police before dawn or after dusk?",
      options: ["Turn on the interior dome light", "Turn off the engine and step outside immediately", "Activate hazard flashers", "Lower all windows and show hands on steering wheel"],
      correctIndex: 0,
      explanation: "Rhode Island § 31-22-24 uniquely requires drivers to turn on the vehicle's interior dome light whenever stopped by law enforcement before dawn or after dusk. This improves officer visibility into the vehicle during nighttime or pre-dawn stops and is a directly tested Rhode Island-distinctive rule."
    },
    {
      question: "A 17-year-old Rhode Island driver wants to use a Bluetooth earpiece to make a call while driving. Is this allowed?",
      options: ["No — drivers under 18 face an absolute ban on all device use, including hands-free, except to call 911", "Yes — hands-free is always legal for all drivers", "Yes — hands-free is permitted for drivers 16 and older", "Yes — but only on highways, not in school zones"],
      correctIndex: 0,
      explanation: "Rhode Island § 31-22-30 imposes an absolute ban on all device use — handheld AND hands-free — for drivers under 18. The only exception is calling 911 in a genuine emergency. A third or subsequent violation results in a $250 fine plus suspension of driving privileges until they turn 18."
    },
    {
      question: "Rhode Island requires a child restraint system when a child meets all three of which combined conditions?",
      options: ["Under 7 AND under 60 inches AND under 80 lbs", "Under 8 AND under 57 inches AND under 80 lbs", "Under 9 AND under 57 inches AND under 100 lbs", "Under 8 AND under 4 feet 9 inches AND under 60 lbs"],
      correctIndex: 1,
      explanation: "Rhode Island requires an approved child restraint when a child is under 8 years old AND under 57 inches tall AND under 80 pounds — all three conditions must apply together. A child who exceeds any single threshold may use a standard seat belt."
    },
    {
      question: "What is the default daytime speed limit on unposted Rhode Island roads outside residential and business areas?",
      options: ["55 mph", "45 mph", "50 mph", "60 mph"],
      correctIndex: 2,
      explanation: "Rhode Island § 31-14-2 sets the default daytime speed at 50 mph on unposted roads outside business and residential districts. This drops to 45 mph during nighttime hours on the same roads — one of the few states with a statutory day/night speed split for unposted roads."
    },
    {
      question: "A Rhode Island Stage 2 provisional driver needs to drive at 2:00 AM. Which two activities are recognized exceptions to the 1:00 AM–5:00 AM curfew?",
      options: ["Medical emergencies and religious activities", "Driving to work and attending school athletic events", "Any supervised driving and pre-approved school trips", "Driving with a parent and driving to a hospital"],
      correctIndex: 1,
      explanation: "Rhode Island's Stage 2 curfew (1:00 AM–5:00 AM) has two explicit exceptions: driving to or from work, and driving to or from school athletic events. These recognize legitimate late-night commitments beyond teens' control."
    },
    {
      question: "What is Rhode Island's speed limit within 300 feet of school entrances during school days?",
      options: ["15 mph", "25 mph", "20 mph", "10 mph"],
      correctIndex: 2,
      explanation: "RI Gen. Laws § 31-14-2 sets a 20 mph speed limit within 300 feet of school entrances and exits during school days. The 300-foot zone protects children in the school's immediate vicinity."
    },
    {
      question: "Under Rhode Island's implied consent law, what is the license suspension for a first-time refusal of a chemical test?",
      options: ["30 days", "3 months", "6 to 12 months", "1 to 2 years"],
      correctIndex: 2,
      explanation: "Rhode Island § 31-27-2.1 (implied consent) provides that a first refusal results in a 6- to 12-month license suspension, a $200–$500 fine, and 10–60 hours of community service. Refusal is also admissible as evidence in court."
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Rhode Island DMV knowledge test?",
      answer: "The Rhode Island DMV knowledge exam consists of 40 questions drawn from the Rhode Island Driver's Manual and General Laws Title 31. Contact the RI DMV directly to confirm the current passing score — figures of 70% and 80% have been reported by different sources, and the official threshold should be confirmed before your appointment."
    },
    {
      question: "What is Rhode Island's BAC limit for drivers under 21?",
      answer: "Rhode Island has a two-tier system for underage drivers. A BAC at or above 0.02% but below 0.08% triggers the civil 'Driving While Impaired' offense under § 31-27-2.7 — not a criminal DUI. At 0.08% or higher, criminal DUI (§ 31-27-2) applies to any driver regardless of age. The 0.02% threshold is not 'zero tolerance' — drivers below 0.02% do not face a civil impairment violation."
    },
    {
      question: "What does Rhode Island's enhanced DUI tier mean?",
      answer: "Rhode Island's DUI statute (§ 31-27-2) includes an enhanced penalty tier triggered at 0.15% BAC or higher. Penalties include mandatory ignition interlock device installation, extended license suspension, and significantly higher fines. This enhanced tier applies in addition to the base DUI penalties."
    },
    {
      question: "What are Rhode Island's GDL requirements?",
      answer: "Rhode Island's Graduated Driver Licensing program: Stage 1 permit requires age 16 plus completion of a 33-hour in-person CCRI-certified driver education course (online courses not accepted since 2022). Stage 1 requires a 6-month holding period and 50 supervised hours (10 at night), certified by an adult affidavit. Stage 2 provisional drivers face a 1:00 AM–5:00 AM curfew (exceptions for work and school athletics) and a maximum of 1 unrelated passenger under 21 in the first 12 months."
    },
    {
      question: "What are Rhode Island's cell phone rules for drivers?",
      answer: "Rhode Island § 31-22-30 bans ALL handheld device use for every driver — calling, texting, navigation, and music streaming. Adults 18 and older may use hands-free devices. Drivers under 18 face an absolute ban on ALL device use (handheld and hands-free), with the only exception being a genuine 911 emergency call. Fines: 1st offense $100, 2nd $150, 3rd or more $250."
    },
    {
      question: "What is Rhode Island's school bus law?",
      answer: "Rhode Island § 31-20-12 requires all approaching vehicles in both directions to stop when a school bus displays red warning lights. An exception applies for divided highways with a physical median barrier. Drivers must maintain at least a 50-foot following distance behind a school bus in the same lane. First-offense fine for failing to stop: up to $300."
    },
    {
      question: "What is Rhode Island's seat belt and child restraint law?",
      answer: "Rhode Island has primary seat belt enforcement (§ 31-22-22) — officers can stop a vehicle solely for a seat belt violation. The base fine is $40. Children must use an approved child restraint system if they are under 8 years old AND under 57 inches tall AND under 80 pounds — all three conditions must be present. Children under 2 years old or under 30 pounds must be in a rear-facing restraint."
    },
    {
      question: "What is the unique Rhode Island dome light rule?",
      answer: "Rhode Island § 31-22-24 requires drivers to turn on the vehicle's interior dome light whenever stopped by law enforcement before dawn or after dusk. This law — unusual among U.S. states — allows the officer to see inside the vehicle more easily during nighttime stops, improving safety for both the driver and the officer. It is directly tested on the Rhode Island DMV knowledge exam."
    },
  ],
  relatedTests: [
    { label: "Rhode Island Motorcycle Practice Test", href: "/rhode-island-motorcycle-practice-test" },
    { label: "Rhode Island CDL Practice Test", href: "/rhode-island-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function RhodeIslandDMVPage() {
  return <PracticeTestPage {...data} />;
}
