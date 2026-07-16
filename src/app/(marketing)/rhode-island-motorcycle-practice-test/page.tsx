import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Rhode Island Motorcycle Practice Test 2026 – Free RI Endorsement Exam Prep",
  description: "Study for the Rhode Island motorcycle endorsement test. Covers helmet law (under-21 AND first-year riders), eye protection required for ALL riders, lane splitting illegal since 2026, CCRI MSF course pathway, child passenger rules, and 0.02% under-21 BAC civil offense.",
  alternates: { canonical: "https://caredmvprep.com/rhode-island-motorcycle-practice-test" },
  openGraph: { url: "https://caredmvprep.com/rhode-island-motorcycle-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Rhode Island",
  stateAbbr: "RI",
  testLabel: "Motorcycle Practice Test",
  slug: "rhode-island-motorcycle-practice-test",
  headline: "Rhode Island Motorcycle Endorsement Practice Test 2026",
  intro: "Rhode Island requires a motorcycle ('M') endorsement on your driver's license. Rhode Island does not use a separate motorcycle learner permit — instead, applicants complete a CCRI-approved Motorcycle Safety Foundation course that leads directly to the endorsement. Rhode Island has distinctive motorcycle laws: eye protection is required for ALL riders regardless of helmet status, the helmet law has both age and experience triggers, and lane splitting became illegal after a pilot program expired January 31, 2026.",
  basedOn: "Rhode Island General Laws Title 31; Rhode Island DMV Motorcycle Information; CCRI Motorcycle Safety Program",
  about: [
    "Rhode Island's motorcycle endorsement pathway is distinctive: there is no separate motorcycle learner permit. Applicants complete a CCRI-approved (Community College of Rhode Island) Motorcycle Safety Foundation course, which grants a direct 'M' endorsement upon successful completion. This course-to-endorsement pathway bypasses the traditional permit-and-test route used in most other states.",
    "Rhode Island § 31-10.1-4 creates two independent triggers for the helmet requirement: (1) all riders and passengers under 21 years old, and (2) any operator — regardless of age — during their first year after receiving a motorcycle endorsement. A 40-year-old new rider who just received their 'M' endorsement is required to wear a helmet during that first 12 months, even though they are over 21. Riders who are exempt from the helmet requirement (adults 21+ with more than one year of endorsement) must still wear approved eye protection — the eye protection mandate is independent of helmet status and applies to ALL operators and passengers.",
    "Lane splitting and lane filtering are illegal in Rhode Island as of February 1, 2026. A limited pilot program (H 5658) that authorized a form of lane filtering expired January 31, 2026, and the Rhode Island legislature did not extend or make it permanent. Rhode Island § 31-15-11 requires each motorcycle to remain fully within its lane — there is no interstate exception and no 'stopped traffic' exception under current law.",
  ],
  sampleQuestions: [
    {
      question: "Rhode Island's helmet law has two separate triggers. Who is required to wear a helmet while operating or riding a motorcycle?",
      options: ["All riders under 21 years old, AND any operator in their first year after endorsement issuance regardless of age", "All motorcycle riders regardless of age — Rhode Island is an all-ages helmet state", "Only riders under 18", "All operators but not passengers"],
      correctIndex: 0,
      explanation: "Rhode Island § 31-10.1-4 requires helmet use for: (1) all riders under 21 years old, AND (2) any operator — at any age — during their first year after motorcycle endorsement issuance. A 25-year-old who received their 'M' endorsement 6 months ago must still wear a helmet. Only adults 21+ who have held the endorsement for more than one year may ride without a helmet."
    },
    {
      question: "A 24-year-old Rhode Island motorcyclist has held their endorsement for 3 years. They are legally permitted to ride without a helmet. Which of the following is still required?",
      options: ["Nothing additional — helmet exemption removes all gear requirements", "A windshield or fairing rated for highway speeds", "Approved eye protection per § 31-10.1-4", "A reflective vest when riding after dark"],
      correctIndex: 2,
      explanation: "Rhode Island § 31-10.1-4 mandates approved eye protection for ALL motorcycle operators and passengers, completely independent of helmet status. This rider qualifies for the helmet exemption (age 21+ with more than one year of endorsement) but must still wear eye protection. Wind at highway speeds, road debris, and insects all pose serious vision hazards — the eye protection requirement exists regardless of whether a helmet is worn."
    },
    {
      question: "How does a Rhode Island resident obtain a motorcycle ('M') endorsement on their driver license?",
      options: ["Apply for a separate motorcycle learner permit, hold it for 6 months, then take the road skills test", "Complete the CCRI-approved motorcycle safety course, which leads directly to an 'M' endorsement without a separate learner permit", "Pass only a written knowledge test at the DMV — no riding course is required", "Complete a 2-hour online course and schedule a DMV road skills test"],
      correctIndex: 1,
      explanation: "Rhode Island does not issue a separate motorcycle learner permit. Instead, applicants complete a CCRI-approved (Community College of Rhode Island) motorcycle safety course, which grants a direct 'M' endorsement upon successful completion. This course-to-endorsement pathway bypasses the traditional permit-and-test route used in many other states."
    },
    {
      question: "Is lane splitting — riding between lanes of stopped or slow-moving traffic — legal for motorcycle riders in Rhode Island?",
      options: ["Yes — it is legal in Rhode Island as in California", "Yes — but only on roads with posted speed limits under 35 mph", "No — lane splitting is illegal in Rhode Island; a pilot program expired January 31, 2026", "Only in emergency situations when traffic is completely stopped"],
      correctIndex: 2,
      explanation: "Lane splitting is illegal in Rhode Island. A limited pilot program allowing lane filtering expired on January 31, 2026, and was not made permanent. Rhode Island § 31-15-11 governs lane use, and motorcycle operators must follow the same lane rules as all other vehicles. Each motorcycle is entitled to full use of its lane."
    },
    {
      question: "A Rhode Island motorcyclist is observed riding between two lanes of stopped traffic on I-95. What does this violation represent?",
      options: ["Legal lane filtering — permitted when traffic is completely stopped", "A traffic violation — lane splitting is illegal under § 31-15-11 and the 2025 pilot program has expired", "Permitted on interstate highways only when traffic is stopped", "Legal since H 5658 made the pilot program permanent"],
      correctIndex: 1,
      explanation: "Riding between lanes of traffic — whether moving or stopped — is a traffic violation in Rhode Island. A limited pilot program (H 5658) that authorized lane filtering expired January 31, 2026 and was not renewed or made permanent. Rhode Island § 31-15-11 requires each motorcycle to remain within a single lane. There is no interstate exception and no 'stopped traffic' exception under current law."
    },
    {
      question: "Rhode Island § 31-10.1-6 addresses child passengers on motorcycles. What requirement applies to children under 12?",
      options: ["Children under 12 are prohibited from riding as motorcycle passengers", "Children under 12 need a proper backrest and their feet must reach the foot pegs or proper foot position", "Children under 12 must wear a full-face helmet only — no half-helmets are permitted", "Children under 12 may ride only as sidecar passengers, not on the main seat"],
      correctIndex: 1,
      explanation: "Rhode Island § 31-10.1-6 requires that child passengers under 12 years old have a proper backrest and maintain proper foot positioning (able to reach foot pegs or foot rests). This ensures young passengers are physically secure on the motorcycle and cannot slip off during normal operation. Eye protection and helmet requirements also apply to child passengers."
    },
    {
      question: "A 30-year-old Rhode Island motorcycle operator received their 'M' endorsement 8 months ago. Must they wear a helmet?",
      options: ["Yes — they are within their first year after license issuance, so helmet use is mandatory regardless of age", "No — they are over 21, so helmet use is optional", "Only on highways, not on city streets", "Only if riding at night"],
      correctIndex: 0,
      explanation: "Rhode Island § 31-10.1-4 mandates helmet use for any operator during their first year after receiving a motorcycle endorsement, regardless of the operator's age. At 8 months post-endorsement, this 30-year-old is still within the first-year mandatory period. The age trigger (under 21) and the experience trigger (first year) are independent — either one alone requires a helmet."
    },
    {
      question: "Under Rhode Island's implied consent law, does it apply to motorcycle operators stopped on suspicion of impaired riding?",
      options: ["Yes — motorcycle operators are subject to implied consent and face the same refusal penalties as car drivers", "No — implied consent applies only to operators of motor vehicles with four or more wheels", "Only if the rider caused an accident", "Only for riders under 21"],
      correctIndex: 0,
      explanation: "Rhode Island § 31-27-2.1 (implied consent) applies to any operator of a motor vehicle on a public road — including motorcycles. A first refusal results in a 6- to 12-month suspension, $200–$500 fine, and 10–60 hours of community service, identical to what car drivers face. Refusal is also admissible as evidence."
    },
    {
      question: "What makes Rhode Island's motorcycle helmet law distinctive compared to most states with age-based helmet exemptions?",
      options: ["Rhode Island requires all riders to wear helmets regardless of age or experience", "Rhode Island adds an experience trigger: operators in their first year of endorsement must wear a helmet regardless of age", "Rhode Island requires helmets only for passengers, not operators", "Rhode Island requires helmets only on state highways, not local roads"],
      correctIndex: 1,
      explanation: "Most states with partial helmet laws exempt riders based only on age (e.g., 18+ or 21+). Rhode Island adds a separate experience-based trigger under § 31-10.1-4: any operator in their first year after receiving an 'M' endorsement must wear a helmet, regardless of age. A 40-year-old new rider must wear a helmet during their first 12 months — a requirement not found in most other states."
    },
    {
      question: "At what BAC does Rhode Island's enhanced DUI tier — including mandatory ignition interlock — apply to a motorcycle operator?",
      options: ["0.10% or higher", "0.12% or higher", "0.15% or higher", "0.18% or higher"],
      correctIndex: 2,
      explanation: "Rhode Island § 31-27-2's enhanced penalty tier at 0.15% BAC applies to motorcycle operators just as it does to any other driver. This tier triggers mandatory ignition interlock requirements, extended suspension, and higher fines. Note that ignition interlock applies to any vehicle the operator is licensed to drive."
    },
  ],
  faqs: [
    {
      question: "Does Rhode Island require a helmet for all motorcycle riders?",
      answer: "No — Rhode Island's helmet law (§ 31-10.1-4) has two triggers, not a universal requirement. Helmets are required for: (1) all riders and passengers under 21 years old, and (2) any operator during their first year after receiving a motorcycle endorsement, regardless of age. Adults 21 and older who have held their endorsement for more than one year are not required to wear a helmet. However, ALL riders regardless of age or helmet status must wear approved eye protection."
    },
    {
      question: "Is eye protection required even if I'm not required to wear a helmet?",
      answer: "Yes. Rhode Island § 31-10.1-4 independently requires approved eye protection for ALL motorcycle operators and passengers, regardless of whether they are required to wear a helmet or choose to wear one. Even if you qualify for the helmet exemption (adult 21+ with 1+ year endorsement), you must still wear eye protection. This is one of Rhode Island's distinctive motorcycle safety requirements."
    },
    {
      question: "How do I get a motorcycle endorsement in Rhode Island?",
      answer: "Rhode Island does not use a separate motorcycle learner permit system. Applicants complete a CCRI-approved (Community College of Rhode Island) Motorcycle Safety Foundation course, which leads directly to an 'M' endorsement on their driver's license upon successful completion. This course-to-endorsement pathway is Rhode Island's distinctive approach — visit the RI DMV website or CCRI for current course schedules and locations."
    },
    {
      question: "Is lane splitting or lane filtering legal in Rhode Island?",
      answer: "No. As of February 1, 2026, lane splitting and lane filtering are illegal in Rhode Island. A limited pilot program (H 5658) that authorized a form of lane filtering expired January 31, 2026. The Rhode Island legislature did not extend or make the pilot permanent. Rhode Island § 31-15-11 requires each motorcycle to remain fully within its lane — there is no interstate exception and no 'stopped traffic' exception under current law."
    },
    {
      question: "What BAC limit applies to motorcycle riders in Rhode Island?",
      answer: "Rhode Island's DUI law (§ 31-27-2) applies equally to motorcycle operators. The BAC threshold is 0.08% for riders 21 and older. Riders under 21 face a separate civil 'Driving While Impaired' offense (§ 31-27-2.7) at BAC of 0.02% to 0.07% — this is a civil penalty, not criminal DUI. An enhanced DUI penalty tier triggers at 0.15%+ BAC for any driver including motorcycle operators, adding mandatory ignition interlock requirements."
    },
    {
      question: "Can children ride as motorcycle passengers in Rhode Island?",
      answer: "Yes, with specific requirements. Rhode Island § 31-10.1-6 requires that child passengers under 12 years old have a proper backrest and maintain proper foot positioning (able to reach foot pegs or foot rests). Children under 12 must be physically secure on the motorcycle and cannot be carried if they cannot properly reach the foot pegs. Eye protection and helmet requirements also apply to child passengers according to their age."
    },
    {
      question: "Does a motorcycle safety course waive any tests in Rhode Island?",
      answer: "Rhode Island uses a course-to-endorsement system through CCRI-approved Motorcycle Safety Foundation courses. Completing the approved MSF course leads directly to an 'M' endorsement — there is no separate learner permit period or DMV skills test required when following this pathway. Contact the RI DMV or CCRI for current course availability and the exact endorsement process, as procedures may be updated."
    },
    {
      question: "What is the first-year endorsement helmet rule?",
      answer: "Rhode Island § 31-10.1-4 requires any motorcycle operator — regardless of age — to wear a helmet during their first year after receiving an 'M' endorsement. This experience-based trigger is independent of the age-based trigger (under 21). A 45-year-old who just received their endorsement last month must wear a helmet for the next 12 months, even though they are well over 21. After the first year, adults 21+ are no longer required to wear a helmet, though all must continue to wear eye protection."
    },
  ],
  relatedTests: [
    { label: "Rhode Island DMV Practice Test", href: "/rhode-island-dmv-practice-test" },
    { label: "Rhode Island CDL Practice Test", href: "/rhode-island-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function RhodeIslandMotorcyclePage() {
  return <PracticeTestPage {...data} />;
}
