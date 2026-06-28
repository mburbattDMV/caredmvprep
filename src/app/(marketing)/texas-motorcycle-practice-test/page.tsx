import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Texas Motorcycle Practice Test 2025 – Free TX Class M License Exam Prep",
  description:
    "Free Texas motorcycle practice test based on the official Texas Motorcycle Operator Manual. 25 questions, detailed explanations, and real test format. Pass your TX Class M test.",
  alternates: { canonical: "https://caredmvprep.com/texas-motorcycle-practice-test" },
  openGraph: { url: 'https://caredmvprep.com/texas-motorcycle-practice-test', images: [{ url: 'https://caredmvprep.com/opengraph-image', width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Texas",
  stateAbbr: "TX",
  testLabel: "Motorcycle Practice Test",
  slug: "texas-motorcycle-practice-test",
  headline: "Texas Motorcycle License Practice Test (Class M)",
  intro:
    "Prepare for your Texas DPS motorcycle knowledge test with free practice questions based on the official Texas Motorcycle Operator Manual. Covers safe riding techniques, protective gear, Texas motorcycle laws, and hazard awareness.",
  numToPass: "20 correct (80%)",
  basedOn: "Texas Motorcycle Operator Manual (2025)",
  about: [
    "The Texas DPS motorcycle knowledge test consists of 25 questions drawn from the Texas Motorcycle Operator Manual. To pass, you must answer at least 20 questions correctly — an 80% passing score. The test is required to add a Class M endorsement to your Texas driver's license.",
    "Texas helmet requirements depend on age and training. Riders under 21 must always wear a DOT-approved helmet. Riders 21 and older may be exempt from the helmet requirement if they have completed a motorcycle operator training course approved by the Texas Department of Licensing and Regulation (TDLR) and carry health insurance coverage.",
    "The Texas Motorcycle Safety Course (MSC) offered by the TDLR is strongly recommended for all new riders. Completing an approved course may waive the DPS skills test. Our practice tests help you master the knowledge portion so you can focus your attention on building riding skills.",
  ],
  sampleQuestions: [
    {
      question: "What is Texas law regarding helmet use for motorcycle riders?",
      options: [
        "Always optional for riders over 21",
        "Required for all riders unless an exemption applies",
        "Only required for riders under 18",
        "Only required on highways and expressways",
      ],
      correctIndex: 1,
      explanation:
        "Texas requires all motorcycle operators and passengers to wear a DOT-approved helmet unless they qualify for an exemption. Riders 21 and older may be exempt if they have completed an approved motorcycle safety course AND carry adequate health insurance. Riders under 21 must always wear a helmet — no exceptions.",
    },
    {
      question: "Which lane position is best for a motorcyclist traveling on a straight section of highway?",
      options: [
        "Always in the center of the lane",
        "Always hugging the right edge",
        "Always hugging the left edge",
        "It varies by situation — adjust position for visibility and hazards",
      ],
      correctIndex: 3,
      explanation:
        "There is no single 'best' lane position for all situations. Motorcyclists should adjust their position within the lane to maximize visibility, avoid road hazards (oil strips, debris), and be seen by other drivers. The left third of the lane is often best for visibility at intersections; the center is often best on open roads.",
    },
    {
      question: "What is the minimum following distance a motorcyclist should maintain behind another vehicle?",
      options: ["At least 2 seconds", "At least 1 second", "At least 4 seconds", "At least 3 seconds"],
      correctIndex: 0,
      explanation:
        "The Texas Motorcycle Operator Manual recommends maintaining at least a 2-second following distance from the vehicle ahead. In rain, low visibility, or heavy traffic, increase this to 3–4 seconds or more. A longer following distance gives you more time to see and react to road hazards.",
    },
    {
      question: "In Texas, are two motorcycles permitted to ride side by side in the same lane?",
      options: [
        "No, it is always illegal",
        "Yes, but only on highways",
        "Yes, two motorcycles may legally share a lane",
        "Only if both have been licensed for 2 or more years",
      ],
      correctIndex: 2,
      explanation:
        "Under Texas Transportation Code §545.060(b), two motorcycles may legally ride side by side within a single lane. More than two abreast in a single lane is prohibited. Riding two abreast does not allow motorcycles to pass other vehicles sharing the same lane.",
    },
    {
      question: "What is the correct approach when a motorcyclist encounters a curve?",
      options: [
        "Speed up to exit the curve as quickly as possible",
        "Apply the brakes within the curve",
        "Maintain the exact same speed from entry to exit",
        "Slow down before the curve, then accelerate gently through it",
      ],
      correctIndex: 3,
      explanation:
        "The correct technique for negotiating a curve is to reduce speed before entering (using braking on the straight approach), look through the curve toward where you want to go, lean smoothly, and then gently accelerate as you exit. Braking sharply while leaning in a curve can cause a skid.",
    },
    {
      question: "What is the maximum BAC for a motorcyclist aged 21 or older to operate legally in Texas?",
      options: ["0.04%", "0.08%", "0.06%", "0.10%"],
      correctIndex: 1,
      explanation:
        "The legal BAC limit for operators 21 and older — including motorcyclists — is 0.08% in Texas. Even below that threshold, a rider can be charged with DWI if their ability to safely operate the motorcycle is impaired by alcohol or any other substance. Riders under 21 face a zero-tolerance standard.",
    },
    {
      question: "Alcohol affects a motorcycle rider's ability primarily by:",
      options: ["Improving focus and reducing reaction time", "Reducing balance, coordination, and judgment", "Increasing grip strength on the handlebars", "Having no effect at speeds under 25 mph"],
      correctIndex: 1,
      explanation:
        "Alcohol impairs balance, reduces coordination, slows reaction time, and impairs judgment — all critical skills for motorcycle operation. Even one or two drinks can significantly increase the risk of a crash. Riding under the influence of alcohol is illegal in all 50 states and is a leading cause of fatal motorcycle crashes.",
    },
    {
      question: "When making a turn on a motorcycle, you should:",
      options: ["Slow down after you enter the turn", "Apply the brakes throughout the turn", "Look through the turn toward your exit point", "Lean opposite to the direction of the turn"],
      correctIndex: 2,
      explanation:
        "Look through the turn toward where you want to go — your exit point. Your motorcycle will naturally follow your vision. Slow down before entering the turn (not during), lean in the direction of the turn, and roll on the throttle smoothly as you exit. Never brake hard while leaning in a turn.",
    },
    {
      question: "Which part of the body is injured in the greatest percentage of fatal motorcycle crashes?",
      options: ["Arms and hands", "Legs and feet", "Chest and torso", "Head and neck"],
      correctIndex: 3,
      explanation:
        "Head and neck injuries account for the greatest percentage of fatalities in motorcycle crashes. This is why wearing a DOT-approved helmet is the single most effective protection a rider can use. Full-face helmets provide the most coverage, protecting the chin and face in addition to the skull and brain.",
    },
    {
      question: "When riding at night, which of the following is most important?",
      options: ["Increasing your speed to reduce time on the road", "Using high beams at all times", "Reducing speed and increasing following distance", "Wearing darker clothing to blend with traffic"],
      correctIndex: 2,
      explanation:
        "At night, reduce your speed and increase your following distance to compensate for reduced visibility. Your headlight only illuminates a limited distance ahead, and road hazards — potholes, debris, animals — are much harder to see. Use your high beams when no oncoming traffic is present, and wear reflective gear to improve your visibility to other drivers.",
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Texas motorcycle knowledge test?",
      answer:
        "The Texas DPS motorcycle knowledge test has 25 questions. You must answer at least 20 correctly — a passing score of 80% — to pass and qualify for a Class M endorsement.",
    },
    {
      question: "Does completing a motorcycle safety course waive the Texas skills test?",
      answer:
        "Yes. Completing a TDLR-approved Motorcycle Safety Course (MSC) may waive the DPS road skills test. You will still need to pass the written knowledge test at the DPS. Contact the TDLR or your local DPS office for current course offerings and waiver eligibility.",
    },
    {
      question: "Do I need a separate license to ride a motorcycle in Texas?",
      answer:
        "You need a Class M endorsement on your existing Texas driver's license to legally operate a motorcycle. If you do not have a Texas license, you must apply for a Class M license. Both require passing a motorcycle-specific knowledge test and a skills test (unless waived by an approved safety course).",
    },
    {
      question: "What topics are covered on the Texas motorcycle knowledge test?",
      answer:
        "The test covers riding posture and balance, lane positioning, protective gear, pre-ride inspection (T-CLOCS), braking techniques, hazard awareness, riding in groups, alcohol and drug impairment, and Texas motorcycle laws such as helmet requirements and lane sharing rules.",
    },
    {
      question: "Is lane splitting legal in Texas?",
      answer:
        "No. Lane splitting — riding between lanes of traffic — is currently illegal in Texas. Texas Transportation Code does not permit motorcyclists to split lanes. Two motorcycles may ride side by side within a single lane, but a motorcycle may not pass between moving or stationary traffic.",
    },
    {
      question: "What documents do I need to bring to the Texas DPS for my motorcycle knowledge test?",
      answer:
        "For the Texas motorcycle knowledge test at a DPS driver's license office, you need a valid form of ID, proof of Texas residency (two documents such as utility bills or bank statements), your Social Security number, and the application fee. If you are under 18, a parent or guardian must sign the application. Visit dps.texas.gov to confirm current document requirements and schedule an appointment before your visit.",
    },
    {
      question: "How long is the Texas motorcycle learner's permit valid, and can I ride alone with it?",
      answer:
        "A Texas motorcycle learner's permit (instruction permit) is valid for 1 year. With a Texas motorcycle permit, you may not ride at night, on controlled-access highways, or carry passengers. You must ride only when accompanied — not necessarily side-by-side, but within visual distance — by a licensed motorcycle operator. Texas DPS encourages completing the TDLR Motorcycle Safety Course during the permit period.",
    },
    {
      question: "Is a motorcycle endorsement required in Texas, or is it a separate license?",
      answer:
        "Texas adds a Class M endorsement to your existing driver's license rather than issuing a separate document. You must pass a 25-question motorcycle knowledge test at a Texas DPS driver's license office and either pass a DPS skills test or complete a TDLR-approved Motorcycle Safety Course (which may waive the skills test for eligible riders). The endorsement appears on your standard Texas driver's license.",
    },
    {
      question: "What types of vehicles require a Class M endorsement in Texas?",
      answer:
        "A Texas Class M endorsement is required to operate any motorcycle — defined as a vehicle with a seat or saddle and designed to travel on not more than three wheels in contact with the ground. This includes standard motorcycles, sport bikes, cruisers, and three-wheelers. Motor-driven cycles with engines under 250cc may fall under Class M as well. Mopeds (under 50cc, motor-assisted only, max 30 mph) are exempt. Check the Texas DPS website for current definitions of motor-driven cycles.",
    },
    {
      question: "Does completing a motorcycle safety course waive the skills test in Texas?",
      answer:
        "Yes. Completing a TDLR-approved Motorcycle Safety Course (MSC) may waive the DPS road skills test for eligible riders — generally adults 18 and older who hold a valid unrestricted Texas Class A, B, or C driver's license. The TDLR course does NOT waive the DPS written knowledge test; you must still pass the 25-question knowledge exam at a DPS office. Riders under 18 still need to complete the full process including the skills test at DPS.",
    },
  ],
  relatedTests: [
    { label: "TX Permit Test", href: "/texas-dmv-practice-test" },
    { label: "TX CDL Test", href: "/texas-cdl-practice-test" },
    { label: "CA Motorcycle Test", href: "/california-motorcycle-practice-test" },
    { label: "FL Motorcycle Test", href: "/florida-motorcycle-practice-test" },
    { label: "NY Motorcycle Test", href: "/new-york-motorcycle-practice-test" },
    { label: "View All States", href: "/" },
  ],
};

export default function TexasMotorcyclePage() {
  return <PracticeTestPage {...data} />;
}
