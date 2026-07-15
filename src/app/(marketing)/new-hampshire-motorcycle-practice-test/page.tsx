import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "New Hampshire Motorcycle Practice Test 2025 – Free DMV Endorsement Prep",
  description: "Study for the New Hampshire DMV motorcycle endorsement exam with state-specific questions on the no-helmet law for adults 18+ (RSA 265:122), lane splitting illegal (RSA 265:121), MSF course waives BOTH written and road tests (RSA 263:32), and Kancamagus Highway riding challenges.",
  alternates: { canonical: "https://caredmvprep.com/new-hampshire-motorcycle-practice-test" },
  openGraph: { url: "https://caredmvprep.com/new-hampshire-motorcycle-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "New Hampshire",
  stateAbbr: "NH",
  testLabel: "Motorcycle Practice Test",
  slug: "new-hampshire-motorcycle-practice-test",
  headline: "New Hampshire Motorcycle Endorsement Practice Test 2025",
  intro: "New Hampshire requires a motorcycle endorsement on your NH DMV driver's license. The endorsement knowledge exam is 25 questions — you must answer 20 correctly to pass (80%). New Hampshire has no mandatory helmet law for adult riders 18 and older (RSA 265:122), making it one of very few states where adults may legally ride without a helmet. Lane splitting is ILLEGAL in New Hampshire (RSA 265:121). Completing an approved MSF Basic RiderCourse waives BOTH the written knowledge test AND the road skills test (RSA 263:32) — a distinctive NH advantage.",
  basedOn: "New Hampshire Division of Motor Vehicles Motorcycle Operator Manual",
  about: [
    "New Hampshire motorcycle law has several features that distinguish it from most states. First, there is no mandatory helmet law for riders and passengers who are 18 or older (RSA 265:122) — adults may legally choose to ride without a helmet. Only riders under 18 must wear helmets. Eye protection is required when the motorcycle is not equipped with a windshield or windscreen (RSA 265:123). Second, OUI (Operating Under the Influence) under RSA 265-A:2 applies equally to motorcycle operators, with a 0.08% BAC adult threshold and 0.02% for riders under 21. The endorsement knowledge exam is 25 questions — 20 correct answers (80%) required to pass.",
    "Lane splitting — riding between lanes of traffic — is ILLEGAL in New Hampshire (RSA 265:121, II). However, two motorcycles may share one lane side-by-side (maximum 2 abreast) — this is permitted and different from lane splitting. If a rider fails the road skills test twice, completing an MSF Basic RiderCourse becomes mandatory. The motorcycle permit restricts riders to daylight hours only, prohibits carrying passengers, and is valid for 45 days with one 45-day renewal allowed. New Hampshire also prohibits using the fact that a person 'rides a motorcycle' as the sole basis for a traffic enforcement stop (RSA 265:1-c — motorcycle profiling ban).",
    "New Hampshire is one of the most popular motorcycle touring destinations in New England, with the White Mountains providing dramatic scenery on roads like the Kancamagus Highway (NH-112), NH-302 through Crawford Notch, and I-93 through Franconia Notch. The Kancamagus presents specific motorcycle hazards: no fuel for 34.5 miles, no cell service, deer and moose crossing zones, tight curves with gravel and leaf debris in fall, and seasonal closures in winter. Moose crossings on NH-16, NH-2, and NH-3 in the North Country are a seasonal life-threatening hazard for motorcyclists.",
  ],
  sampleQuestions: [
    {
      question: "New Hampshire's motorcycle helmet law requires helmets for which riders?",
      options: ["All riders regardless of age — NH has a universal helmet law", "Riders under age 21 only", "Riders and passengers under age 18 only", "Helmets are optional for all NH motorcycle riders"],
      correctIndex: 2,
      explanation: "New Hampshire requires motorcycle helmets only for riders and passengers under age 18 (RSA 265:122). Adults who are 18 or older are not legally required to wear a helmet when operating or riding as a motorcycle passenger in New Hampshire. This adult exemption, combined with New Hampshire's no-adult-seatbelt law, makes New Hampshire one of the most permissive states in the nation for personal protection choices. The NH DMV endorsement exam tests the 18-year-old helmet threshold specifically."
    },
    {
      question: "Is lane splitting legal for motorcyclists in New Hampshire?",
      options: ["Yes — lane splitting is permitted on roads with a speed limit above 45 mph", "No — lane splitting is explicitly illegal under RSA 265:121", "Yes — but only when traffic is stopped or moving under 10 mph", "Yes — the law is silent on lane splitting so it is implicitly permitted"],
      correctIndex: 1,
      explanation: "Lane splitting is explicitly ILLEGAL in New Hampshire. RSA 265:121, II prohibits operating a motorcycle between lanes of traffic or between adjacent lines or rows of vehicles. However, this is different from two motorcycles riding side-by-side — a maximum of 2 motorcycles may share a single lane (2 abreast), which IS permitted. Lane splitting and filtering are not permitted under any circumstances."
    },
    {
      question: "A New Hampshire motorcycle rider completes an approved MSF Basic RiderCourse. What tests at the DMV does this waive?",
      options: ["Only the road skills test — the written knowledge test must still be passed at the DMV", "Neither test — DMV tests are still required regardless of course completion", "Both the written knowledge test AND the road skills test", "Only the written knowledge test — the road skills test is always required"],
      correctIndex: 2,
      explanation: "Under RSA 263:32, completing an approved MSF Basic RiderCourse or state-equivalent rider education program waives BOTH the written knowledge test AND the road skills test at the NH DMV. This is distinctive — most states only waive the skills test. NH waives both. This makes completing the MSF course particularly valuable in New Hampshire, as it eliminates both DMV testing requirements. If a rider fails the road skills test twice without having taken the course, the MSF course becomes mandatory."
    },
    {
      question: "A motorcycle rider on the Kancamagus Highway (NH-112) is 12 miles from the Conway end of the road and realizes the fuel gauge is near empty. There is no cell service. What is the safest response?",
      options: ["Continue at speed to reach Conway before running out of fuel", "Coast with the engine off to conserve fuel, and if the bike runs dry, stop and wait for the next passing vehicle since there are no services anywhere on NH-112", "Pull over and attempt to call 911 — NH-112 has emergency cell towers every 5 miles", "Turn around and head back toward the Lincoln end — the town of Woodstock is just a few miles back"],
      correctIndex: 1,
      explanation: "The Kancamagus Highway has absolutely no services — no gas stations, no emergency call boxes, no cell towers — for its entire 34.5-mile length. A rider running out of fuel 12 miles from Conway has to either continue hoping to reach Conway, or stop and wait for another vehicle to notify emergency services at either end of the road. There is no cell service to call for help anywhere on NH-112. This is exactly why the NH DMV exam emphasizes entering the Kancamagus with a full tank."
    },
    {
      question: "What is the OUI BAC threshold for a motorcycle rider who is 23 years old under New Hampshire RSA 265-A:2?",
      options: ["0.10%", "0.08%", "0.04%", "0.02%"],
      correctIndex: 1,
      explanation: "New Hampshire's OUI statute (RSA 265-A:2) sets a 0.08% BAC threshold for motorcycle operators (and all motor vehicle operators) who are 21 or older. New Hampshire uses OUI (Operating Under the Influence) rather than DUI terminology. The same statute sets a 0.02% threshold for operators under 21. OUI applies equally to motorcycle operators — being on a motorcycle rather than a car does not change the legal standard."
    },
    {
      question: "A 25-year-old New Hampshire motorcycle rider who does not wear a helmet is stopped by a NH State Trooper during a routine traffic stop. Can the trooper issue a citation for helmet non-use?",
      options: ["Yes — NH law requires helmets at all speeds above 35 mph", "No — NH law does not require helmets for riders 18 and older, so no citation is possible for this adult rider's helmet choice", "Yes, but only if the rider is on an interstate highway", "Only if the rider does not have a motorcycle endorsement"],
      correctIndex: 1,
      explanation: "New Hampshire does not require motorcycle helmets for riders and passengers who are 18 or older (RSA 265:122). A 25-year-old rider without a helmet is operating legally under NH law, and no citation can be issued solely for helmet non-use. This is a direct and testable aspect of New Hampshire motorcycle law — riders from states with universal helmet laws must understand that NH law is different."
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
      question: "Does New Hampshire require helmets for adult motorcycle riders?",
      answer: "No. New Hampshire does not require motorcycle helmets for riders or passengers who are 18 years of age or older (RSA 265:122). The NH helmet law requires helmets only for riders and passengers under 18. This adult exemption makes New Hampshire one of a small number of states where adults have a legal choice about helmet use. The NH DMV motorcycle manual strongly recommends helmet use for all riders regardless of the legal exemption."
    },
    {
      question: "Is lane splitting legal in New Hampshire?",
      answer: "No. Lane splitting is explicitly ILLEGAL in New Hampshire under RSA 265:121, II, which prohibits operating a motorcycle between lanes of traffic or between adjacent lines or rows of vehicles. However, two motorcycles may share one lane side-by-side (maximum 2 abreast) — this is permitted and is different from lane splitting. Riders visiting from California or other states where lane splitting is legal should note that NH law is more restrictive."
    },
    {
      question: "Does completing an MSF course waive the DMV tests in New Hampshire?",
      answer: "Yes — and unusually, NH waives BOTH tests. Under RSA 263:32, completing an approved MSF Basic RiderCourse or equivalent rider education program waives both the written knowledge test AND the road skills test at the NH DMV. Most states only waive the skills test; NH waives both. If a rider fails the road skills test twice without the course, the MSF course then becomes mandatory. The permit restricts riders to daylight only, no passengers, and is valid 45 days with one 45-day renewal."
    },
    {
      question: "What are the unique motorcycle riding challenges on the Kancamagus Highway?",
      answer: "The Kancamagus Highway (NH-112) is one of New England's most scenic motorcycle roads, but it presents specific hazards. There are no gas stations, restaurants, rest areas with services, cell phone towers, or emergency call boxes anywhere along the 34.5-mile route — riders must enter with a full tank and be self-sufficient. The road has active moose and deer crossing zones, particularly at dawn and dusk. Fall foliage season (late September to mid-October) brings wet leaves and reduced traction in curves. The road may be closed in winter."
    },
    {
      question: "What is the motorcycle endorsement process in New Hampshire?",
      answer: "New Hampshire motorcycle endorsement (Class M) is added to an existing NH driver's license by passing the NH DMV motorcycle knowledge exam (25 questions, 20 correct, 80%) and a skills road test. Alternatively, completing an approved MSF Basic RiderCourse waives BOTH the written knowledge test AND the road skills test (RSA 263:32). If a rider fails the road test twice, the MSF course becomes mandatory. The motorcycle permit restricts riders to daylight hours only, no passengers, and is valid for 45 days with one 45-day renewal."
    },
    {
      question: "What OUI rules apply to motorcycle operators in New Hampshire?",
      answer: "New Hampshire's OUI statute (RSA 265-A:2) applies equally to motorcycle operators. The BAC threshold is 0.08% for operators 21 and older and 0.02% for operators under 21. New Hampshire uses OUI (Operating Under the Influence) terminology — not DUI. New Hampshire's Implied Consent law (RSA 265-A:14) requires motorcycle operators who are lawfully arrested for OUI to submit to chemical testing — a first refusal triggers a 180-day administrative suspension; a prior conviction or refusal triggers a 2-year suspension."
    },
    {
      question: "What is the motorcycle profiling ban in New Hampshire?",
      answer: "RSA 265:1-c prohibits law enforcement officers from using the fact that a person rides a motorcycle as the sole basis for initiating a traffic enforcement stop. This motorcycle profiling ban is a distinctive New Hampshire law. An officer may still stop a motorcyclist for observable traffic violations or other legitimate reasons — the ban only applies when riding a motorcycle is the sole justification for the stop."
    },
    {
      question: "What makes Franconia Notch significant for New Hampshire motorcycle riders?",
      answer: "Franconia Notch is the only section of the U.S. Interstate Highway System where a standard interstate has been permanently reduced to 2 lanes. I-93 through Franconia Notch State Park operates as NH Route 18 in this section — motorcycles are permitted. For motorcycle riders, Franconia Notch's significance includes: the narrower lane profile compared to a standard interstate; scenic cut sections through the notch's rock walls where traction can be affected by moisture and debris; and the fact that the notch compresses tourist traffic onto a 2-lane road, requiring more conservative technique than standard multi-lane highway riding."
    },
    {
      question: "What is the NH motorcycle permit and what are its restrictions?",
      answer: "The New Hampshire motorcycle learner's permit restricts riders to daylight hours only (no nighttime riding), prohibits carrying passengers, and is valid for 45 days. One 45-day renewal is allowed, giving a maximum of 90 days on a permit before a full endorsement must be obtained or the permit lapses. Permit holders may ride on public roads but must observe all permit restrictions."
    },
  ],
  relatedTests: [
    { label: "New Hampshire DMV Practice Test", href: "/new-hampshire-dmv-practice-test" },
    { label: "New Hampshire CDL Practice Test", href: "/new-hampshire-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function NewHampshireMotorcyclePage() {
  return <PracticeTestPage {...data} />;
}
