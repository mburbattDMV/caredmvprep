import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "South Dakota DMV Practice Test 2026 – Free SD Driver's License Exam Prep",
  description:
    "Free South Dakota DMV practice test. Covers DUI (0.08% adult, 0.02% under-21, enhanced at 0.17%), implied consent (1-yr/2-yr refusal), GDL permit at 14, 80 mph interstate, 15 mph school zone, secondary seat belt enforcement, and cell phone ban. Based on SDCL.",
  alternates: { canonical: "https://caredmvprep.com/south-dakota-dmv-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/south-dakota-dmv-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "South Dakota",
  stateAbbr: "SD",
  testLabel: "DMV Practice Test",
  slug: "south-dakota-dmv-practice-test",
  headline: "South Dakota DMV Practice Test 2026",
  intro:
    "The South Dakota Department of Public Safety administers the driver knowledge test for all license applicants. This free practice test is based on verified South Dakota Codified Laws (SDCL), covering DUI law, the graduated driver licensing (GDL) program, speed limits, seat belt and cell phone law, headlight requirements, and right-of-way rules. South Dakota's minimum permit age of 14, the 80 mph interstate speed limit, and the 0.17% BAC enhancement threshold are among the state's distinctive laws covered here.",
  basedOn: "South Dakota Codified Laws (SDCL) / South Dakota DPS Driver Manual",
  keyRules: [
    {
      icon: "🍺",
      rule: "DUI — Adult 0.08%; Under-21 0.02%; Enhanced at 0.17%",
      detail: "SDCL § 32-23-1 sets 0.08% BAC as the adult DUI per se threshold. Under-21 drivers face a 0.02% limit under § 32-23-21. Commercial drivers face 0.04% under § 32-12A-44. South Dakota's notable enhancement threshold is 0.17%: at that level, § 32-23-2.1 mandates a chemical dependency evaluation and increases the administrative license revocation from 30 to 120 days. A third DUI within 10 years is a Class 6 felony (§ 32-23-4).",
    },
    {
      icon: "🚫",
      rule: "Implied Consent — 1-Year Revocation (1st Refusal), 2 Years (2nd)",
      detail: "SDCL § 32-23-10 deems all South Dakota drivers to have consented to chemical testing. Refusing a test triggers license revocation: 1st refusal = 1 year; 2nd refusal within 10 years = 2 years (§ 32-23-11). Under § 32-23-10.1, the refusal itself is admissible as evidence in any DUI proceeding — refusing does not prevent prosecution.",
    },
    {
      icon: "📋",
      rule: "GDL Permit at Age 14 — 180-Day Hold (90 Days With Driver's Ed)",
      detail: "South Dakota allows instruction permits at age 14 — one of the youngest ages in the US (SDCL § 32-12-6). The standard hold period before applying for a restricted minor's permit is 180 days, reduced to 90 days with a completed state-approved driver's education course. The supervising adult must be seated in the front passenger seat at all times during the permit stage.",
    },
    {
      icon: "🌙",
      rule: "GDL Curfew: 10 PM to 6 AM",
      detail: "South Dakota restricted permit holders cannot drive without a parent or legal guardian in the front seat between 10 PM and 6 AM. During permissible hours, passenger restrictions apply: first 6 months = immediate family only; after 6 months = 1 non-family passenger. All restrictions are removed when a parent or legal guardian is in the front seat.",
    },
    {
      icon: "🚗",
      rule: "Speed Limits: Interstate 80 mph / Urban 25 mph / School Zone 15 mph",
      detail: "SDCL § 32-25-4 sets 80 mph as the maximum interstate speed — one of the highest in the US. The minimum interstate speed is 40 mph (§ 32-25-5). Urban unposted areas default to 25 mph (§ 32-25-12). School zones are 15 mph when children are present (§ 32-25-14). Rural divided highways may be posted up to 70 mph by the Transportation Commission (§ 32-25-7.1). Township roads default to 55 mph (§ 32-25-9.2).",
    },
    {
      icon: "🪑",
      rule: "Seat Belt: SECONDARY Enforcement — $25 Adult Minimum Fine",
      detail: "South Dakota has secondary enforcement for adult seat belts — police must have another reason to stop a vehicle before citing a seat belt violation. The minimum adult fine is $25 with no points assessed. Operators must ensure passengers ages 5–18 are buckled (§ 32-37-1.1). Children under 5 require an approved child restraint system. Booster seats recommended until 8 years old or 4'9\" tall.",
    },
    {
      icon: "📱",
      rule: "Cell Phone: Mobile Electronic Device Ban — Class 2 Misdemeanor",
      detail: "SDCL § 32-26-47.1 prohibits operating a motor vehicle while using a mobile electronic device. Violations are classified as Class 2 misdemeanors carrying fines up to $500. This is stronger than a simple traffic infraction — it is a criminal misdemeanor. South Dakota does not have a separate texting-only ban; the law addresses mobile electronic device use broadly.",
    },
    {
      icon: "💡",
      rule: "Headlights: Dim When Road Reveals Person at 200 Feet (§ 32-17-7)",
      detail: "SDCL § 32-17-7 requires tilting headlamp beams downward in two situations: (1) when the highway is sufficiently lit to reveal a person 200 feet ahead, and (2) whenever meeting or overtaking any other vehicle. The 200-foot trigger distance applies to both the well-lit road scenario and the vehicle-meeting scenario.",
    },
  ],
  about: [
    "South Dakota's driver licensing program stands out for several state-specific rules. The minimum permit age of 14 (SDCL § 32-12-6) is one of the youngest in the country, reflecting the state's large rural and agricultural geography where young people have long needed to operate vehicles. The GDL hold period is 180 days standard, or 90 days with a state-approved driver's ed course. During the restricted minor's permit stage, a 10 PM to 6 AM curfew requires a parent or legal guardian in the front seat. Passenger restrictions begin strictly: no non-family passengers in the first 6 months; only 1 non-family passenger allowed after 6 months. Both the curfew and passenger restrictions are waived entirely when a parent or guardian is in the front seat.",
    "South Dakota's DUI law (SDCL § 32-23) covers all motor vehicle operators. The adult threshold is 0.08% BAC. Under-21 drivers face a 0.02% limit (§ 32-23-21). South Dakota's notable enhancement threshold is 0.17% BAC: above this level, § 32-23-2.1 mandates a chemical dependency evaluation AND increases the administrative license revocation from the standard 30 days to 120 days. A work permit at this BAC level requires participation in the 24/7 Sobriety Program (§ 32-23-23). A third DUI within 10 years is elevated to a Class 6 felony carrying up to 2 years in prison (§ 32-23-4). Implied consent refusal penalties are 1 year (first refusal) or 2 years (second within 10 years), and the refusal itself is admissible as evidence in DUI proceedings (§ 32-23-10.1).",
    "South Dakota's speed limits reflect its vast open landscape: the interstate maximum is 80 mph (§ 32-25-4) with a 40 mph minimum (§ 32-25-5), making South Dakota's interstates among the fastest-posted in the continental United States. By contrast, school zones require a reduction to just 15 mph (§ 32-25-14) — lower than the 20 mph school zone found in many other states. Urban areas unposted default to 25 mph (§ 32-25-12). The seat belt law is secondary enforcement for adults — a distinctive feature as roughly half of states have primary enforcement. South Dakota's cell phone law (§ 32-26-47.1) classifies mobile electronic device use while driving as a Class 2 misdemeanor, which is more serious than a simple traffic ticket. Headlight dimming under § 32-17-7 is triggered when the road is lit well enough to reveal a person at 200 feet or when meeting or overtaking any vehicle.",
  ],
  sampleQuestions: [
    {
      question: "Under SDCL § 32-23-1, what is the adult DUI per se BAC threshold in South Dakota?",
      options: ["0.10% or more", "0.08% or more", "0.06% or more", "0.05% or more"],
      correctIndex: 1,
      explanation:
        "SDCL § 32-23-1 establishes 0.08% BAC as the per se adult DUI threshold — a driver at or above this level is guilty of DUI regardless of apparent impairment. South Dakota uses 'DUI' (Driving Under the Influence) terminology throughout Chapter 32-23.",
    },
    {
      question: "South Dakota imposes enhanced DUI penalties when a driver's BAC reaches what level?",
      options: ["0.10% or more", "0.15% or more", "0.17% or more", "0.20% or more"],
      correctIndex: 2,
      explanation:
        "SDCL § 32-23-2.1 triggers enhanced consequences at 0.17% BAC: a mandatory chemical dependency evaluation and an administrative license revocation of 120 days (versus 30 days for standard first-offense DUI). A work permit at this level requires participation in the 24/7 Sobriety Program under § 32-23-23. This 0.17% threshold is distinctive to South Dakota.",
    },
    {
      question: "How long is a South Dakota driver's license revoked for a FIRST refusal to submit to chemical testing?",
      options: ["90 days", "6 months", "1 year", "2 years"],
      correctIndex: 2,
      explanation:
        "SDCL § 32-23-11 imposes a 1-year license revocation for a first refusal to submit to chemical testing under the implied consent law. A second refusal within 10 years carries a 2-year revocation. Under § 32-23-10.1, the fact of refusal is admissible as evidence in any DUI proceeding.",
    },
    {
      question: "What is the minimum age to obtain an instruction permit in South Dakota?",
      options: ["15 years old", "15½ years old", "14 years old", "16 years old"],
      correctIndex: 2,
      explanation:
        "SDCL § 32-12-6 allows applicants to obtain an instruction permit at age 14 — one of the youngest minimum ages in the United States. South Dakota's large rural agricultural areas, where young people have historically needed to drive, contribute to this young permit age.",
    },
    {
      question: "What is the maximum speed limit on South Dakota interstate highways under SDCL § 32-25-4?",
      options: ["70 mph", "75 mph", "65 mph", "80 mph"],
      correctIndex: 3,
      explanation:
        "SDCL § 32-25-4 sets the maximum speed limit on South Dakota's interstate highways at 80 mph — one of the highest posted speed limits in the continental United States. The statute also establishes a minimum speed of 40 mph on interstate highways (§ 32-25-5).",
    },
    {
      question: "South Dakota's adult seat belt law is classified as what type of enforcement?",
      options: ["Primary — police may stop solely for a seat belt violation", "Secondary — requires another reason to make a traffic stop", "Advisory — tickets issued with a written warning only", "There is no seat belt law for adults in South Dakota"],
      correctIndex: 1,
      explanation:
        "South Dakota has secondary enforcement for the adult seat belt law — police must have a separate, primary reason to stop a vehicle before issuing a seat belt citation for adult occupants. The minimum adult fine is $25 with no points assessed. Under § 32-37-1.1, operators must ensure passengers ages 5–18 are buckled.",
    },
    {
      question: "What is the maximum speed limit in a South Dakota school zone when children are going to or leaving school?",
      options: ["25 mph", "20 mph", "15 mph", "10 mph"],
      correctIndex: 2,
      explanation:
        "SDCL § 32-25-14 limits speed to 15 mph when passing a school during recess or while children are going to or leaving school during opening or closing hours. South Dakota's 15 mph school zone limit is lower than the 20 mph school zone found in many other states.",
    },
    {
      question: "Under SDCL § 32-26-47.1, using a mobile electronic device while driving is classified as:",
      options: ["A petty infraction with a $50 maximum fine", "A Class 1 misdemeanor with mandatory jail time", "A Class 2 misdemeanor with fines up to $500", "A civil violation with a $100 fine"],
      correctIndex: 2,
      explanation:
        "SDCL § 32-26-47.1 classifies mobile electronic device use while driving as a Class 2 misdemeanor, carrying fines up to $500 and potential jail time. This makes South Dakota's distracted driving law more serious than a simple traffic infraction — it is a criminal misdemeanor.",
    },
    {
      question: "During the first 6 months of a South Dakota restricted minor's permit, what passengers are permitted without a parent/guardian present?",
      options: ["Up to 2 passengers of any kind", "Up to 1 non-family passenger", "No non-family passengers — immediate family only", "Any number of passengers are permitted"],
      correctIndex: 2,
      explanation:
        "During the first 6 months of a South Dakota restricted minor's permit, the holder may only transport immediate family members — no non-family passengers — unless a parent or legal guardian is in the front seat. After 6 months, 1 non-family passenger is permitted. All restrictions are waived when a parent or guardian rides in the front seat.",
    },
    {
      question: "SDCL § 32-17-7 requires South Dakota drivers to dim headlights under what condition?",
      options: ["Only when entering city limits", "When the road is lit to reveal a person 200 feet ahead, or when meeting/overtaking another vehicle", "Only when a vehicle within 500 feet is approaching", "Only during the period between 10 PM and 6 AM"],
      correctIndex: 1,
      explanation:
        "SDCL § 32-17-7 requires tilting headlamps downward in two scenarios: (1) when the highway is sufficiently lighted to reveal a person on the highway at a distance of 200 feet ahead, and (2) whenever meeting or overtaking another vehicle on any highway. Both conditions — well-lit roads and the presence of other vehicles — trigger the low-beam requirement.",
    },
  ],
  faqs: [
    {
      question: "What are South Dakota's DUI BAC limits?",
      answer:
        "SDCL § 32-23-1 sets the adult DUI per se threshold at 0.08% BAC. Under-21 drivers face a 0.02% limit under § 32-23-21. Commercial vehicle operators face 0.04% under § 32-12A-44. South Dakota's distinctive enhancement threshold is 0.17% BAC: at this level, a mandatory chemical dependency evaluation is required and the administrative license revocation increases from 30 to 120 days (§ 32-23-2.1). A third DUI within 10 years is a Class 6 felony (§ 32-23-4).",
    },
    {
      question: "What are South Dakota's implied consent refusal penalties?",
      answer:
        "Under SDCL § 32-23-10, operating a vehicle in South Dakota constitutes consent to chemical testing. Refusing a test results in license revocation: 1st refusal = 1 year; 2nd refusal within 10 years = 2 years (§ 32-23-11). Under § 32-23-10.1, the refusal is admissible as evidence in any DUI proceeding. Refusal does not prevent prosecution — police may seek a warrant for a blood draw.",
    },
    {
      question: "What are South Dakota's GDL requirements?",
      answer:
        "South Dakota allows instruction permits at age 14 (SDCL § 32-12-6). The instruction permit hold period is 180 days (reduced to 90 days with a state-approved driver's ed course). During the restricted minor's permit stage, a 10 PM to 6 AM curfew applies (parent/guardian must be in front seat during curfew hours). Passenger restrictions: first 6 months = immediate family only; after 6 months = 1 non-family passenger. All restrictions removed when parent/guardian is in the front seat.",
    },
    {
      question: "What are South Dakota's speed limits?",
      answer:
        "SDCL establishes: interstate maximum 80 mph (§ 32-25-4); interstate minimum 40 mph (§ 32-25-5); urban unposted areas 25 mph (§ 32-25-12); school zone 15 mph when children present (§ 32-25-14); rural divided highways up to 70 mph where authorized by Transportation Commission (§ 32-25-7.1); township roads 55 mph (§ 32-25-9.2).",
    },
    {
      question: "Is South Dakota's seat belt law primary or secondary enforcement?",
      answer:
        "South Dakota has secondary enforcement for the adult seat belt law — police must have another reason to make a traffic stop before issuing a seat belt citation for adult occupants. The minimum adult fine is $25 with no points assessed. However, operators must ensure passengers between ages 5 and 18 are properly buckled (§ 32-37-1.1). Children under 5 must be secured in an approved child passenger restraint system.",
    },
    {
      question: "What is South Dakota's cell phone driving law?",
      answer:
        "SDCL § 32-26-47.1 prohibits operating a motor vehicle while using a mobile electronic device. Violations are Class 2 misdemeanors — not just traffic infractions — carrying fines up to $500 and potential jail time. South Dakota does not have a separate texting-only prohibition; the statute applies to mobile electronic device use broadly. Emergency calls to 911 are typically exempt.",
    },
    {
      question: "When must South Dakota drivers use headlights?",
      answer:
        "South Dakota requires headlights from sunset to sunrise and during periods of low visibility such as rain, snow, or fog. Under SDCL § 32-17-7, drivers must dim headlamps to low beam when: (1) the highway is sufficiently lit to reveal a person 200 feet ahead, and (2) whenever meeting or overtaking another vehicle. The 200-foot trigger applies in both scenarios.",
    },
    {
      question: "What are South Dakota's child restraint requirements?",
      answer:
        "Children under 5 must be secured in an approved child passenger restraint system under SDCL § 32-37. Children ages 5 through 18 must wear a properly adjusted seat belt (§ 32-37-1.1). Booster seats are recommended until a child is at least 8 years old or 4'9\" (57 inches) tall. Children should remain rear-facing as long as possible, then in a forward-facing harness, then a booster seat, and finally a seat belt.",
    },
    {
      question: "How does completing driver's education affect South Dakota GDL requirements?",
      answer:
        "Completing a state-approved driver's education course in South Dakota reduces the instruction permit hold period from 180 days (6 months) to 90 days (3 months). This is the primary benefit of driver's ed within South Dakota's GDL structure. After completing the reduced hold period, the applicant may apply for a restricted minor's permit.",
    },
  ],
  relatedTests: [
    { label: "South Dakota Motorcycle Practice Test", href: "/south-dakota-motorcycle-practice-test" },
    { label: "South Dakota CDL Practice Test", href: "/south-dakota-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function SouthDakotaDmvPracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
