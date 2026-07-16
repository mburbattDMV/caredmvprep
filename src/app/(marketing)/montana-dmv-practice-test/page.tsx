import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Montana DMV Practice Test 2025 – Free MVD Knowledge Exam Prep",
  description: "Prepare for the Montana MVD driver knowledge test. Covers Montana GDL (3-step, age 15 with driver ed), DUI law (0.08% adult, 0.02% under-21), implied consent, speed limits (80 mph interstate), seat belt rules, child restraint law, school bus rules, and headlight requirements.",
  alternates: { canonical: "https://caredmvprep.com/montana-dmv-practice-test" },
  openGraph: { url: "https://caredmvprep.com/montana-dmv-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Montana",
  stateAbbr: "MT",
  testLabel: "DMV Practice Test",
  slug: "montana-dmv-practice-test",
  headline: "Montana DMV Practice Test 2025",
  intro: "The Montana Motor Vehicle Division (MVD), under the Department of Justice, administers the driver knowledge test required for a learner license. This practice test covers Montana-specific laws including DUI statutes, implied consent, the 3-step Graduated Driver Licensing (GDL) program, speed limits, seat belt law, child restraint requirements, school bus rules, and headlight regulations.",
  basedOn: "Montana Driver Manual and Montana Code Annotated Title 61",
  keyRules: [
    { icon: "🍺", rule: "DUI – Adult BAC 0.08%", detail: "Montana uses DUI (Driving Under the Influence) terminology. A blood alcohol concentration (BAC) of 0.08% or higher is per se DUI for adult drivers 21 and older under MCA 61-8-1002. Drivers under 21 face a stricter 0.02% BAC limit. CDL holders are held to 0.04% BAC while operating commercial vehicles." },
    { icon: "📋", rule: "Implied Consent – Up to 1-Year Suspension for Refusal", detail: "By driving on Montana roads, you consent to a chemical test if arrested for DUI. Refusing a chemical test triggers an administrative license suspension of up to one year for a first refusal. The suspension is separate from any criminal DUI penalty." },
    { icon: "🧑‍🎓", rule: "GDL Step 1: Learner License (Age 15 with Driver Ed / 16 Standard)", detail: "Montana's GDL program begins with a Learner License. Applicants may obtain it at age 15 with driver education enrollment, or at 16 without driver ed. Step 1 requires 50 hours of supervised driving practice (10 must be at night) and a minimum 6-month hold before advancing to the next step." },
    { icon: "🎓", rule: "GDL Step 2: Restricted License – Curfew and Passenger Limits", detail: "The Restricted License (Step 2) imposes a nighttime curfew: no driving between 11 PM and 5 AM. Passenger restrictions also apply — during the first 6 months, only one unrelated passenger under 18 is permitted. During the second 6 months, up to three unrelated passengers under 18 are allowed. Exceptions apply for employment, school activities, and emergencies." },
    { icon: "🏎️", rule: "Speed Limits", detail: "Montana's speed limits: Interstate highways — 80 mph daytime, 75 mph nighttime for passenger cars; Two-lane highways — 70 mph daytime, 65 mph nighttime for passenger cars. School zones: as low as 15 mph when children are present, with doubled fines for violations." },
    { icon: "🪑", rule: "Seat Belts – Front Seat Required; $20 Fine", detail: "Montana law requires the driver and all front-seat passengers to wear seat belts. GDL drivers must also ensure all occupants anywhere in the vehicle are buckled while they are driving. The fine for a seat belt violation is $20." },
    { icon: "👶", rule: "Child Restraint – Dual Condition: Under 6 AND Under 60 lbs", detail: "Montana's child restraint law uses a dual condition: a child must be secured in an approved child restraint system when the child is BOTH under age 6 AND weighs under 60 pounds. A child who has reached either threshold — turned 6 or reached 60 lbs — transitions to a regular seat belt." },
    { icon: "🚌", rule: "School Bus – Stop at Least 30 Feet Away", detail: "When a school bus is stopped with lights flashing, you must stop at least 30 feet from the bus and wait until the red lights stop flashing and the stop arm is retracted before proceeding. On divided highways with a physical median barrier, only vehicles behind the bus must stop." },
    { icon: "💡", rule: "Headlights – Evening Use and Visibility Rules", detail: "Montana requires headlights beginning one-half hour after sunset and ending one-half hour before sunrise. Headlights are also required when visibility is less than 500 feet due to weather. High beams must be dimmed for oncoming traffic within 1,000 feet and when following another vehicle within 500 feet." },
    { icon: "🚨", rule: "Move-Over Law", detail: "When passing a stopped emergency vehicle, Montana law requires drivers to move over one lane when safe to do so. If a lane change is not possible, slow to at least 20 mph below the posted speed limit when passing the stopped emergency vehicle." },
  ],
  about: [
    "The Montana Motor Vehicle Division (MVD), operating under the Montana Department of Justice, administers the driver knowledge test required for a learner license. Montana uses a three-step Graduated Driver Licensing (GDL) system: Learner License → Restricted License → Full License. The knowledge test must be passed before receiving the Learner License. Montana uses DUI (Driving Under the Influence) terminology — adults 21 and older face a per se DUI at 0.08% BAC, drivers under 21 face a 0.02% limit, and CDL holders face 0.04%.",
    "Montana's implied consent law means that by driving on state roads, every driver automatically consents to a chemical test if lawfully arrested for DUI. Refusing the test triggers an administrative license suspension of up to one year for a first refusal, independent of the criminal DUI case. Montana's GDL Step 1 (Learner License) requires 50 hours of supervised practice driving, including at least 10 hours at night, and a 6-month minimum hold before advancing. Applicants may start at age 15 with driver education, or 16 without. Step 2 (Restricted License) imposes an 11 PM to 5 AM curfew and passenger restrictions — one unrelated passenger under 18 for the first 6 months, up to three for the second 6 months.",
    "Montana's speed limits are among the higher ones in the country: 80 mph daytime on interstates (75 mph at night), and 70 mph on two-lane highways during the day (65 mph at night). School zones can reduce the limit to as low as 15 mph, with fines doubled for violations. Montana's seat belt law requires the driver and all front-seat passengers to buckle up, with a $20 fine for violations. Montana's child restraint law is a dual-condition rule: a child must be in an approved restraint when under age 6 AND under 60 pounds. When approaching a stopped school bus, Montana requires stopping at least 30 feet away and waiting until the red lights stop flashing.",
  ],
  sampleQuestions: [
    {
      question: "At what blood alcohol concentration (BAC) does Montana law consider an adult driver (21+) to be legally impaired per se?",
      options: ["0.04%", "0.06%", "0.08%", "0.10%"],
      correctIndex: 2,
      explanation: "Under MCA 61-8-1002, a BAC of 0.08% or higher creates a per se DUI for adult drivers 21 and older in Montana. This means the driver is legally impaired regardless of any other evidence of impairment. Montana uses DUI terminology rather than DWI or OUI."
    },
    {
      question: "What is the maximum BAC allowed for a Montana driver under age 21 before a per se DUI violation applies?",
      options: ["0.00%", "0.02%", "0.04%", "0.08%"],
      correctIndex: 1,
      explanation: "Montana imposes a 0.02% BAC limit for drivers under 21. A BAC at or above 0.02% constitutes a per se DUI violation for underage drivers — significantly lower than the adult 0.08% limit."
    },
    {
      question: "Under Montana's implied consent law, what can happen if you refuse a chemical test when lawfully arrested for DUI?",
      options: ["Nothing — you have the right to refuse with no penalty", "A warning is issued but no suspension", "Your license can be suspended for up to one year for a first refusal", "You must pay a fine but keep your license"],
      correctIndex: 2,
      explanation: "Montana's implied consent law provides that by driving on state roads, you consent to chemical testing if lawfully arrested for DUI. Refusing the test triggers an administrative license suspension of up to one year for a first refusal. This is a civil penalty separate from any criminal DUI charges."
    },
    {
      question: "In Montana's GDL program, what is the minimum age to obtain a Learner License with driver education enrollment?",
      options: ["14", "15", "16", "17"],
      correctIndex: 1,
      explanation: "Montana's GDL program allows applicants to obtain a Learner License at age 15 if they are enrolled in driver education. Without driver education, the minimum age is 16. The Learner License is Step 1 of Montana's three-step GDL system."
    },
    {
      question: "What are the minimum supervised driving hours required for the Montana GDL Learner License?",
      options: ["30 hours total, 5 at night", "40 hours total, 10 at night", "50 hours total, 10 at night", "60 hours total, 15 at night"],
      correctIndex: 2,
      explanation: "Montana GDL Step 1 requires 50 hours of supervised driving practice, of which at least 10 hours must be completed at night. The learner must also hold the permit for a minimum of 6 months before advancing to the Restricted License (Step 2)."
    },
    {
      question: "During the first 6 months of Montana's Restricted License (GDL Step 2), how many unrelated passengers under 18 are permitted?",
      options: ["None", "One", "Three", "No limit"],
      correctIndex: 1,
      explanation: "During the first 6 months of the Restricted License phase, Montana GDL drivers may carry only one unrelated passenger under age 18. During the second 6 months, up to three unrelated passengers under 18 are allowed. Exceptions exist for employment, school activities, and emergencies."
    },
    {
      question: "What is the daytime speed limit on Montana interstate highways for passenger cars?",
      options: ["70 mph", "75 mph", "80 mph", "85 mph"],
      correctIndex: 2,
      explanation: "Montana's daytime interstate speed limit for passenger cars is 80 mph — one of the highest in the United States. The nighttime interstate limit is 75 mph. Two-lane highways have lower limits: 70 mph daytime and 65 mph at night for passenger cars."
    },
    {
      question: "When a child is required to be in a child restraint system in Montana, which conditions must BOTH be true?",
      options: ["Under age 6 AND under 40 lbs", "Under age 8 AND under 60 lbs", "Under age 6 AND under 60 lbs", "Under age 4 regardless of weight"],
      correctIndex: 2,
      explanation: "Montana's child restraint law requires BOTH conditions to be met simultaneously: the child must be under age 6 AND weigh under 60 pounds. Once either threshold is crossed — the child turns 6 OR reaches 60 lbs — the child may use a regular seat belt rather than a restraint system."
    },
    {
      question: "How far must you stop from a school bus with flashing red lights in Montana?",
      options: ["At least 10 feet", "At least 20 feet", "At least 30 feet", "At least 50 feet"],
      correctIndex: 2,
      explanation: "Montana law requires drivers to stop at least 30 feet away from a stopped school bus displaying flashing red lights. You must remain stopped until the red lights stop flashing and the stop arm is retracted."
    },
    {
      question: "When must Montana drivers turn on headlights after sunset?",
      options: ["Exactly at sunset", "One-half hour after sunset", "One hour after sunset", "Only when it becomes fully dark"],
      correctIndex: 1,
      explanation: "Montana requires headlights to be on beginning one-half hour after sunset and until one-half hour before sunrise. Headlights are also required when visibility is less than 500 feet due to weather or other conditions, regardless of the time of day."
    },
  ],
  faqs: [
    {
      question: "What does the Montana MVD driver knowledge test cover?",
      answer: "The Montana MVD knowledge test covers material from the Montana Driver Manual, including traffic laws, road signs, speed limits, DUI law, implied consent, the GDL program, seat belt and child restraint requirements, school bus laws, headlight rules, and right-of-way rules. The test is required before receiving a Learner License."
    },
    {
      question: "What is the BAC limit for Montana drivers?",
      answer: "Montana sets the following BAC limits: 0.08% for adult drivers 21 and older (per se DUI under MCA 61-8-1002); 0.02% for drivers under 21; and 0.04% for CDL holders operating commercial vehicles. Montana uses DUI terminology rather than DWI or OUI."
    },
    {
      question: "What are Montana's GDL requirements?",
      answer: "Montana uses a three-step GDL system. Step 1 (Learner License): minimum age 15 with driver ed or 16 without; requires 50 supervised hours (10 at night) and a 6-month hold. Step 2 (Restricted License): 11 PM to 5 AM curfew; during the first 6 months, only one unrelated passenger under 18 is permitted; during the second 6 months, up to three. Step 3: Full License with no passenger or curfew restrictions."
    },
    {
      question: "What happens if I refuse a chemical test in Montana?",
      answer: "Under Montana's implied consent law, refusing a chemical test when lawfully arrested for DUI can result in an administrative license suspension of up to one year for a first refusal. This suspension is separate from any criminal DUI penalties and takes effect even if you are not ultimately convicted of DUI."
    },
    {
      question: "What are Montana's speed limits?",
      answer: "Montana's statutory speed limits: Interstate highways — 80 mph daytime, 75 mph nighttime for passenger cars; Two-lane highways — 70 mph daytime, 65 mph nighttime; School zones — as low as 15 mph when children are present (fines doubled). Always obey posted signs, which may set lower limits on specific roads."
    },
    {
      question: "What is Montana's child restraint law?",
      answer: "Montana requires a child to be secured in an approved child restraint system when the child is BOTH under age 6 AND weighs under 60 pounds. Both conditions must be true simultaneously — if the child has turned 6 or has reached 60 lbs, a regular seat belt may be used instead. This dual-condition rule is commonly tested on the Montana knowledge exam."
    },
    {
      question: "What is Montana's seat belt law?",
      answer: "Montana law requires the driver and all front-seat passengers to wear seat belts. GDL drivers must ensure all occupants anywhere in the vehicle are buckled. The fine for a seat belt violation is $20."
    },
    {
      question: "What are Montana's school bus stopping rules?",
      answer: "When a school bus is stopped with red lights flashing, Montana drivers must stop at least 30 feet from the bus and wait until the red lights stop flashing and the stop arm is retracted before proceeding. On a divided highway with a physical median barrier, only vehicles in lanes directly behind the bus must stop."
    },
    {
      question: "When does Montana require headlights to be turned on?",
      answer: "Montana requires headlights from one-half hour after sunset to one-half hour before sunrise, and whenever visibility is less than 500 feet due to weather or other conditions. High beams must be dimmed when within 1,000 feet of oncoming traffic or when following another vehicle within 500 feet."
    },
    {
      question: "What is Montana's move-over law?",
      answer: "Montana's move-over law requires drivers to move over one lane away from a stopped emergency vehicle when safe to do so on a multi-lane road. If moving over is not possible, you must slow to at least 20 mph below the posted speed limit while passing the stopped emergency vehicle."
    },
  ],
  relatedTests: [
    { label: "Montana Motorcycle Practice Test", href: "/montana-motorcycle-practice-test" },
    { label: "Montana CDL Practice Test", href: "/montana-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function MontanaDMVPage() {
  return <PracticeTestPage {...data} />;
}
