import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Montana Motorcycle Practice Test 2025 – Free MVD Endorsement Prep",
  description: "Study for the Montana MVD motorcycle endorsement exam. Covers helmet law (under-18 only, MCA 61-9-417), lane filtering (legal under MCA 61-8-392), always-on headlights, DUI thresholds, MSF course waiver, and insurance rules.",
  alternates: { canonical: "https://caredmvprep.com/montana-motorcycle-practice-test" },
  openGraph: { url: "https://caredmvprep.com/montana-motorcycle-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Montana",
  stateAbbr: "MT",
  testLabel: "Motorcycle Practice Test",
  slug: "montana-motorcycle-practice-test",
  headline: "Montana Motorcycle Endorsement Practice Test 2025",
  intro: "Montana requires a motorcycle endorsement (Class M) added to your driver's license through the Montana MVD. Montana has several distinctive motorcycle laws: only riders under 18 must wear helmets (MCA 61-9-417), lane filtering is legal (MCA 61-8-392), and motorcycle headlights must be on at all times. This practice test covers these Montana-specific rules alongside DUI law, implied consent, and safe riding fundamentals.",
  basedOn: "Montana Driver Manual, Montana Code Annotated Title 61, and Montana MSF Motorcycle Manual",
  about: [
    "Montana's motorcycle helmet law (MCA 61-9-417) requires helmets only for riders and passengers under age 18. Adults 18 and older are not required by Montana law to wear a helmet. Montana is one of a small number of states without a universal adult helmet requirement. While the law does not mandate helmet use for adults, DOT-approved helmets substantially reduce head injury severity and fatality rates, and their use is strongly recommended.",
    "Montana enacted lane filtering legislation (MCA 61-8-392), which permits motorcyclists to pass vehicles that are stopped or traveling at 10 mph or less, provided the motorcycle is traveling at 20 mph or less while filtering. This is distinct from lane splitting — filtering applies only when target vehicles are stopped or very slow (at or below 10 mph). Lane splitting between moving traffic lanes at normal speeds remains illegal in Montana.",
    "Montana requires motorcycle headlights to be on at all times when the motorcycle is in operation (MCA 61-8-359) — both day and night. Up to two motorcycles may ride side-by-side (abreast) in a single lane. Completing an approved MSF Basic RiderCourse waives the skills (road) test; however, the knowledge test at the MVD is still required. Importantly, motorcycle liability insurance is NOT required by Montana law — Montana does not mandate motorcycle-specific insurance coverage.",
    "Montana's DUI law applies equally to motorcycle operators. The BAC threshold is 0.08% for riders 21 and older and 0.02% for riders under 21. Montana's implied consent law requires operators lawfully arrested for DUI to submit to chemical testing — a first refusal triggers an administrative license suspension of up to one year.",
  ],
  sampleQuestions: [
    {
      question: "Montana's motorcycle helmet law (MCA 61-9-417) requires helmets for which riders?",
      options: ["All riders and passengers regardless of age", "Riders and passengers under age 21", "Riders and passengers under age 18 only", "Helmets are completely optional for all riders in Montana"],
      correctIndex: 2,
      explanation: "Montana law (MCA 61-9-417) requires motorcycle helmets only for riders and passengers under age 18. Adults 18 and older are not legally required to wear a helmet. Montana is one of a small number of U.S. states without an adult helmet law. The MVD motorcycle manual strongly recommends DOT-approved helmets for all riders, as they substantially reduce head injury severity."
    },
    {
      question: "Under Montana's lane filtering law (MCA 61-8-392), when may a motorcyclist legally filter past other vehicles?",
      options: ["At any time when traffic is slow-moving", "When passing vehicles stopped or traveling at 10 mph or less, while the motorcycle travels at 20 mph or less", "Only on interstates with speed limits of 65 mph or higher", "Lane filtering is illegal in Montana — only lane splitting is permitted"],
      correctIndex: 1,
      explanation: "Montana's lane filtering law (MCA 61-8-392) permits a motorcyclist to pass vehicles that are stopped or traveling at 10 mph or less, provided the motorcycle travels at 20 mph or less while filtering. This is not the same as lane splitting — filtering applies only when the target vehicles are stopped or very slow. Lane splitting between normal moving traffic lanes remains illegal in Montana."
    },
    {
      question: "When must a motorcycle's headlight be turned on in Montana?",
      options: ["At all times when the motorcycle is in operation — both day and night", "Only between sunset and sunrise", "Only when visibility is less than 500 feet", "Only on roads with speed limits above 45 mph"],
      correctIndex: 0,
      explanation: "Montana law (MCA 61-8-359) requires motorcycle headlights to be on at ALL times when the motorcycle is operating — day or night. Motorcycles are harder for other drivers to see than cars, and daytime headlight use significantly increases a motorcycle's visibility and reduces the risk of other drivers failing to detect an oncoming motorcycle."
    },
    {
      question: "How many motorcycles may legally ride side by side (abreast) in a single lane in Montana?",
      options: ["One — only one motorcycle per lane at all times", "Up to two motorcycles may ride abreast in a single lane", "Up to three motorcycles abreast", "No limit as long as all riders are visible to traffic"],
      correctIndex: 1,
      explanation: "Montana law permits up to two motorcycles to ride side by side (abreast) in a single lane. More than two motorcycles abreast in a single lane is not permitted. Lane splitting or riding between lanes of cars is separately prohibited under Montana law."
    },
    {
      question: "A Montana rider completes an approved MSF Basic RiderCourse. Which test requirement does this waive?",
      options: ["Both the knowledge test and the skills (road) test", "The knowledge test only", "The skills (road) test only", "MSF course completion provides no test waivers in Montana"],
      correctIndex: 2,
      explanation: "In Montana, completing an approved MSF Basic RiderCourse waives the skills (road) test requirement. However, the written motorcycle knowledge test at the MVD is still required — MSF course completion does not waive the knowledge exam. The knowledge test covers Montana-specific laws, DUI rules, and motorcycle safety techniques."
    },
    {
      question: "Is motorcycle liability insurance required in Montana?",
      options: ["Yes — all motorcycle riders must carry liability insurance", "No — Montana does not require motorcycle-specific liability insurance", "Only for riders under 21", "Only for motorcycles with engine displacement above 250cc"],
      correctIndex: 1,
      explanation: "Montana does not require motorcycle liability insurance by law. Montana is one of a small number of states that does not mandate motorcycle insurance coverage. However, riders remain personally financially responsible for any damages or injuries they cause in a crash, and carrying insurance is strongly recommended to protect against those costs."
    },
    {
      question: "What is the DUI BAC threshold for a Montana motorcycle rider who is 25 years old?",
      options: ["0.10%", "0.08%", "0.04%", "0.02%"],
      correctIndex: 1,
      explanation: "For motorcycle operators 21 and older in Montana, the DUI BAC threshold is 0.08% — the same standard that applies to car and truck drivers. Montana uses DUI terminology. For riders under 21, the threshold is 0.02%. Montana's implied consent law applies to motorcycle operators — refusing a chemical test triggers an administrative license suspension of up to one year for a first refusal."
    },
    {
      question: "Under Montana's implied consent law, what can happen if a motorcycle rider refuses a chemical test when lawfully arrested for DUI?",
      options: ["Nothing — refusal carries no legal consequence", "The rider receives a fine but no license action", "An administrative license suspension of up to one year for a first refusal", "The rider's motorcycle registration is revoked"],
      correctIndex: 2,
      explanation: "Montana's implied consent law means that by riding on Montana roads, all operators (including motorcyclists) consent to chemical testing if lawfully arrested for DUI. A first refusal triggers an administrative license suspension of up to one year — a civil penalty separate from any criminal DUI charges."
    },
    {
      question: "Alcohol affects a motorcycle rider's ability primarily by:",
      options: ["Improving focus and reducing reaction time", "Reducing balance, coordination, and judgment", "Increasing grip strength on the handlebars", "Having no effect at speeds under 25 mph"],
      correctIndex: 1,
      explanation: "Alcohol impairs balance, reduces coordination, slows reaction time, and impairs judgment — all critical skills for motorcycle operation. Even one or two drinks can significantly increase the risk of a crash. Riding under the influence of alcohol is illegal in all 50 states and is a leading cause of fatal motorcycle crashes."
    },
    {
      question: "When making a turn on a motorcycle, you should:",
      options: ["Slow down after you enter the turn", "Apply the brakes throughout the turn", "Look through the turn toward your exit point", "Lean opposite to the direction of the turn"],
      correctIndex: 2,
      explanation: "Look through the turn toward where you want to go — your exit point. Your motorcycle will naturally follow your vision. Slow down before entering the turn (not during), lean in the direction of the turn, and roll on the throttle smoothly as you exit. Never brake hard while leaning in a turn."
    },
  ],
  faqs: [
    {
      question: "Does Montana require motorcycle helmets for adult riders?",
      answer: "No. Montana law (MCA 61-9-417) requires helmets only for motorcycle riders and passengers under age 18. Adults 18 and older are not legally required to wear a helmet. Montana is one of a small number of states without a universal adult helmet law. DOT-approved helmets substantially reduce head injury severity and fatality rates, and the MVD motorcycle manual strongly recommends their use regardless of the legal requirement."
    },
    {
      question: "Is lane filtering legal in Montana?",
      answer: "Yes. Montana's lane filtering law (MCA 61-8-392) permits motorcyclists to filter past vehicles that are stopped or traveling at 10 mph or less, provided the motorcyclist is traveling at 20 mph or less while filtering. This applies only when target vehicles are very slow or stopped. Lane splitting — riding between moving traffic lanes at normal speeds — remains illegal in Montana. Filtering and splitting are legally distinct under Montana law."
    },
    {
      question: "When must motorcycle headlights be on in Montana?",
      answer: "Montana law (MCA 61-8-359) requires motorcycle headlights to be on at all times when the motorcycle is in operation — both day and night. Daytime headlight use makes motorcycles more visible to other drivers. This is a strict always-on requirement, not just a sunset-to-sunrise rule."
    },
    {
      question: "Does Montana require motorcycle insurance?",
      answer: "No. Montana does not require motorcycle liability insurance by law. This distinguishes Montana from most states, which mandate minimum liability coverage for motorcycle operation. However, motorcyclists remain personally financially responsible for any damages or injuries they cause in a crash. Riding without insurance exposes the rider to potentially unlimited out-of-pocket liability. Carrying insurance is strongly recommended even though it is not legally required."
    },
    {
      question: "Does the MSF course waive the Montana motorcycle knowledge test?",
      answer: "No. In Montana, completing an approved MSF Basic RiderCourse waives the skills (road) test only. The written motorcycle knowledge test at the MVD is still required regardless of MSF course completion. The knowledge test covers Montana-specific motorcycle laws, DUI rules, lane filtering, helmet law, and safe riding techniques."
    },
    {
      question: "What is the BAC limit for Montana motorcycle riders?",
      answer: "Montana's DUI law applies to motorcycle operators. The BAC limit is 0.08% for riders 21 and older and 0.02% for riders under 21. Montana uses DUI terminology. Montana's implied consent law requires all operators (including motorcyclists) to submit to chemical testing if lawfully arrested for DUI — a first refusal triggers an administrative license suspension of up to one year."
    },
    {
      question: "How many motorcycles can ride side by side in a single lane in Montana?",
      answer: "Montana permits up to two motorcycles to ride side by side (abreast) in a single lane. Three or more motorcycles abreast in one lane is not permitted. Lane splitting — riding between lanes of traffic — is separately prohibited (though lane filtering past stopped/very slow vehicles is now legal under MCA 61-8-392)."
    },
    {
      question: "What is the Montana motorcycle endorsement process?",
      answer: "To obtain a Class M motorcycle endorsement on a Montana driver's license, applicants must pass the MVD motorcycle knowledge test and a skills (road) test, or complete an approved MSF Basic RiderCourse which waives the road test (knowledge test still required). The endorsement is added to the existing Montana driver's license. Montana recommends all new riders complete the MSF course for the structured safety training it provides."
    },
    {
      question: "What BAC limit applies to riders under 21 in Montana?",
      answer: "Montana's under-21 DUI BAC limit is 0.02%. Any BAC at or above 0.02% constitutes a per se DUI violation for motorcycle riders under 21 — significantly stricter than the adult 0.08% standard. Given that motorcycles require precise balance and coordination, even small amounts of alcohol pose serious risks for young riders."
    },
  ],
  relatedTests: [
    { label: "Montana DMV Practice Test", href: "/montana-dmv-practice-test" },
    { label: "Montana CDL Practice Test", href: "/montana-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function MontanaMotorcyclePage() {
  return <PracticeTestPage {...data} />;
}
