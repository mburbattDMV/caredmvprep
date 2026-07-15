import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Arkansas DMV Practice Test 2025 – Free AR Driver's License Exam Prep",
  description:
    "Free Arkansas DFA practice test covering Act 1018 hands-free law (Jan 2024), ACA § 27-51-1404 flash flood barrier law (Class A misdemeanor), feral hog collision hazards, permit age 14, DWI terminology, Buffalo National River road closures, and 75 mph rural interstate limits. 25 questions, 80% to pass.",
  alternates: { canonical: "https://caredmvprep.com/arkansas-dmv-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/arkansas-dmv-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "Arkansas",
  stateAbbr: "AR",
  testLabel: "DMV Practice Test",
  slug: "arkansas-dmv-practice-test",
  headline: "Arkansas DFA Practice Test – Driver's License Knowledge Exam",
  intro:
    "Arkansas has no DMV — driver licensing is administered by the Department of Finance and Administration (DFA), Revenue Division, within a tax and revenue agency, a nationally unusual placement. The Arkansas State Police administers the knowledge and skills tests, while DFA issues the license. This free practice test targets content specific to Arkansas: Act 1018 hands-free law effective January 1, 2024 (one of the last states to enact a statewide adult handheld ban), ACA § 27-51-1404 making it a Class A misdemeanor to drive around a flood barrier, feral hog road hazards (Arkansas has 2+ million feral swine), instruction permit eligibility at age 14 (one of the youngest in the U.S.), DWI terminology under ACA § 5-65-103, and the 75 mph rural interstate speed limit for passenger vehicles (70 mph for commercial vehicles).",
  basedOn: "Arkansas Department of Finance and Administration Driver's License Study Guide",
  keyRules: [
    { icon: "📱", rule: "Act 1018: Hands-Free Law (January 1, 2024) — one of the last states to enact it", detail: "Arkansas Act 1018 banned all drivers from holding a wireless device while driving, effective January 1, 2024. Before this law, Arkansas only restricted texting for novice drivers. First offense: $250. Subsequent: $500." },
    { icon: "🌊", rule: "ACA § 27-51-1404: Driving around a flood barrier is a Class A misdemeanor", detail: "Arkansas law prohibits driving around a 'Road Closed' or flood barrier. Crossing a barricaded flooded roadway is a Class A misdemeanor. This law targets the Buffalo National River corridor and Ozark/Ouachita river valleys." },
    { icon: "🐗", rule: "Feral hog hazard — Arkansas has 2+ million feral swine on rural roads", detail: "Feral hogs (Ozarks, Delta, River Valley) travel in groups of 10–30 animals weighing 200–400 lbs. Unlike deer, a collision may involve multiple animals simultaneously — catastrophic vehicle damage. Greatest risk after dark." },
    { icon: "👶", rule: "Instruction permit at 14 years old — one of the youngest in the U.S.", detail: "Arkansas issues instruction permits at age 14 — among the youngest in the nation. Permit holders must be accompanied by a licensed driver 21+ in the front seat. Restricted license available at 16; full license at 18." },
    { icon: "🍺", rule: "DWI terminology (ACA § 5-65-103) — 0.08% adult / 0.02% under-21", detail: "Arkansas uses DWI (Driving While Intoxicated), not DUI. Adult BAC: 0.08%. Under-21: 0.02%. Commercial drivers in a CMV: 0.04%. DWI penalties include mandatory suspension, fines, and possible IID for repeat offenders." },
    { icon: "⛰️", rule: "Ozark/Ouachita mountain roads — narrow lanes, no guardrails, switchbacks", detail: "AR-74, AR-21, AR-7 in the Buffalo National River corridor and other Ozark/Ouachita mountain roads have tight switchbacks, minimal shoulders, and no guardrails. Some sections are unpaved with seasonal closures." },
    { icon: "📋", rule: "DFA Revenue Division — not a DMV", detail: "Arkansas driver licensing sits within the Department of Finance and Administration (DFA), Revenue Division — a tax and revenue agency. There is no 'Arkansas DMV.' This is a common source of confusion for new Arkansas residents." },
    { icon: "🚀", rule: "75 mph rural interstate (cars) / 65 mph urban controlled-access", detail: "Arkansas raised the rural interstate speed limit to 75 mph for passenger vehicles effective July 1, 2020 (Act 784 of 2019). Commercial motor vehicles are limited to 70 mph on rural interstates. Urban controlled-access highways are 65 mph. Urban districts default to 30 mph, and school zones are 25 mph when children are present." },
  ],
  about: [
    "Arkansas driver licensing is administered by the Department of Finance and Administration (DFA), Revenue Division — not a DMV. The DFA is Arkansas's tax and revenue agency, and placing driver licensing functions within a revenue department is nationally unusual. Most states use a DMV, licensing division, or motor vehicle administration within a transportation or public safety department. DFA driver licensing offices are located throughout the state. The knowledge test consists of 25 multiple-choice questions requiring at least 20 correct answers (80%) to pass. Arkansas's instruction permit age of 14 makes it one of the youngest permit ages in the country.",
    "Arkansas Act 1018, effective January 1, 2024, established a comprehensive statewide hands-free law for all drivers. Before Act 1018, Arkansas only prohibited texting while driving for novice drivers — adult drivers faced no statewide prohibition on handheld phone use. This made Arkansas one of the last states in the U.S. to enact a statewide adult handheld ban. Act 1018 fines: $250 for a first offense; $500 for subsequent offenses. The law is primary enforcement — officers can stop a driver solely for holding a wireless device. ACA § 27-51-1404 makes it a Class A misdemeanor to drive around a 'Road Closed' sign or flood barrier in Arkansas — a criminal offense that is enforced particularly in the Ozark and Ouachita mountain regions where flash flooding can occur rapidly on the Arkansas River, White River, and Buffalo River systems.",
    "Arkansas has two distinctive wildlife and environmental road hazards that appear in its driver knowledge exam. Feral hogs (Sus scrofa) in Arkansas number approximately 2+ million animals statewide — one of the highest feral swine populations in the eastern United States. Unlike deer (which typically cross roads singly), feral hogs travel in family groups called sounders of 10–30 animals, each weighing 200–400 pounds. A driver encountering a sounder crossing a rural road at night may strike multiple large animals in rapid succession before stopping, causing catastrophic vehicle damage. The Arkansas River, White River, and Buffalo National River systems can produce flash flooding within minutes of heavy rainfall. The Buffalo National River corridor (AR-74, AR-21, AR-7) and numerous Ozark-region low-water bridges (low-water crossings) flood rapidly and are marked with barricades when impassable.",
  ],
  sampleQuestions: [
    {
      question: "Arkansas Act 1018, effective January 1, 2024, is significant because it:",
      options: [
        "Was one of the first statewide handheld bans in the U.S., enacted in 2001",
        "Established a statewide adult handheld ban — before this law, Arkansas only restricted texting for novice drivers, making Arkansas one of the last states to enact such a ban",
        "Reduced the fines for texting while driving to encourage voluntary compliance",
        "Applied only to commercial vehicle operators — passenger car drivers were exempt from Act 1018",
      ],
      correctIndex: 1,
      explanation:
        "Arkansas Act 1018 (effective January 1, 2024) established the state's first statewide ban on all drivers physically holding a wireless device while driving. Before Act 1018, Arkansas only prohibited texting while driving for novice (under-18) drivers — adult drivers faced no statewide restriction on handheld phone use. This made Arkansas one of the last states in the nation to enact a comprehensive adult hands-free law. First offense fine: $250. Subsequent offenses: $500. Primary enforcement.",
    },
    {
      question: "Under ACA § 27-51-1404, what happens to a driver who drives around a flood barricade on an Arkansas road?",
      options: [
        "The driver receives only a warning — flood barricade violations are advisory in Arkansas",
        "The driver receives a $50 civil fine mailed to the registered vehicle owner",
        "Driving around a 'Road Closed' or flood barrier is a Class A misdemeanor — a criminal offense",
        "The driver faces only a traffic citation for improper lane use, not a separate flood barrier charge",
      ],
      correctIndex: 2,
      explanation:
        "Arkansas Code § 27-51-1404 makes it a Class A misdemeanor to drive around a 'Road Closed' sign or flood barrier in Arkansas. This criminal charge — not merely a traffic infraction — was enacted to deter drivers from attempting to cross flooded roadways after barriers have been placed. Flash flooding in the Ozark and Ouachita mountain river valleys can occur within minutes of heavy rain. Even water that appears shallow on a road surface can be moving fast enough to sweep away a vehicle. The criminal charge means potential jail time, fines, and a permanent record.",
    },
    {
      question: "What makes feral hog collisions in Arkansas distinctively dangerous compared to single-animal deer collisions?",
      options: [
        "Feral hogs are protected wildlife in Arkansas — drivers are legally liable for any hog struck on the road",
        "Feral hogs are faster than deer and cannot be avoided with standard braking distances",
        "Feral hogs travel in sounders (groups) of 10–30 animals each weighing 200–400 pounds — a driver may strike multiple large animals before being able to stop",
        "Feral hogs only cross roads near water, so drivers outside the Delta region face no hog hazard",
      ],
      correctIndex: 2,
      explanation:
        "Feral hogs in Arkansas travel in family groups called sounders — typically 10 to 30 animals, each weighing 200 to 400 pounds. When a sounder crosses a rural road at night, a driver may collide with multiple large animals before stopping, causing catastrophic damage to the vehicle and serious risk to occupants. This group-crossing behavior is fundamentally different from single-animal deer encounters. Arkansas's approximately 2+ million feral swine population is one of the highest in the eastern U.S., with hogs present in the Ozarks, Delta, River Valley, and forested areas statewide.",
    },
    {
      question: "Which agency administers driver licensing in Arkansas, and why is its placement nationally unusual?",
      options: [
        "Arkansas Department of Motor Vehicles (DMV) — a standard placement similar to most states",
        "Arkansas Department of Safety (DAS) — similar to Tennessee's TDOSHS structure",
        "Arkansas Department of Finance and Administration (DFA), Revenue Division — a tax and revenue agency, unusual nationally for housing driver licensing",
        "Arkansas State Police (ASP) Driver Services — similar to Georgia's DDS placement",
      ],
      correctIndex: 2,
      explanation:
        "Arkansas driver licensing is administered by the Department of Finance and Administration (DFA), Revenue Division — a tax and revenue agency. Placing driver licensing within a revenue/finance department is nationally unusual; most states use a standalone DMV, licensing division, or a motor vehicle administration within a transportation or public safety agency. The DFA placement reflects Arkansas's historical approach to consolidating revenue-generating government functions. When searching for driver's license services in Arkansas, search for 'DFA Revenue Division' rather than 'Arkansas DMV.'",
    },
    {
      question: "At what age can an Arkansas resident apply for an instruction permit?",
      options: ["15 years old", "16 years old", "14 years old — one of the youngest permit ages in the nation", "13 years, 6 months old"],
      correctIndex: 2,
      explanation:
        "Arkansas issues instruction permits at age 14 — one of the youngest permit ages in the United States. Most states allow permits at 15 or 15½ years old. Permit holders in Arkansas must always be accompanied by a licensed driver who is at least 21 years old seated in the front passenger seat. A restricted license becomes available at age 16, and a full unrestricted license is available at age 18. The young permit age reflects Arkansas's rural character and the practical need for teen drivers in agricultural and spread-out communities.",
    },
    {
      question: "Arkansas uses DWI rather than DUI for impaired driving. The adult BAC threshold under ACA § 5-65-103 is:",
      options: [
        "0.10% — Arkansas retained its pre-federal-standard threshold",
        "0.08% — the federal standard, with under-21 at 0.02%",
        "0.04% — Arkansas applies the commercial vehicle standard to all drivers",
        "0.05% — Arkansas's DWAI threshold similar to Colorado",
      ],
      correctIndex: 1,
      explanation:
        "Arkansas uses DWI (Driving While Intoxicated) under ACA § 5-65-103 — not DUI. The adult BAC threshold is 0.08%, consistent with the federal standard. Drivers under 21 face a DWI charge at 0.02% BAC — effectively near-zero tolerance. Commercial vehicle operators face the federal 0.04% CDL standard. A first DWI in Arkansas carries a minimum 6-month license suspension, fines of $150–$1,000, and possible jail time. Repeat offenders may face mandatory ignition interlock device installation.",
    },
    {
      question: "What is the maximum speed limit for passenger vehicles on rural Arkansas interstates?",
      options: ["65 mph", "70 mph", "75 mph", "60 mph"],
      correctIndex: 2,
      explanation:
        "Arkansas Code § 27-51-201 sets the rural interstate speed limit at 75 mph for passenger vehicles (effective July 1, 2020 via Act 784 of 2019). Commercial motor vehicles are limited to 70 mph on these same rural interstates. Urban controlled-access highways have a 65 mph limit. This 75 mph limit is one of the higher rural interstate limits in the central United States.",
    },
    {
      question: "Low-water crossings (low-water bridges) in Arkansas's Ozark and Ouachita regions are specifically dangerous during flash floods because:",
      options: [
        "They are only found on unpaved roads and not a concern for drivers on paved state highways",
        "They are designed to be submerged and provide no visual indication of water depth from the driver's vantage point — moving water can be far deeper and faster than it appears",
        "They are clearly marked with permanent depth gauges that accurately show current water levels at all times",
        "They only flood during winter snowmelt — summer rainfall does not typically affect low-water crossings",
      ],
      correctIndex: 1,
      explanation:
        "Low-water crossings (also called low-water bridges or simply 'dips') are designed to be submerged during high water — they sit at or near road level and allow flood water to flow over them. When flooded, they provide no visual indication of water depth from the driver's perspective; the crossing can appear passable but may have 2–3 feet of fast-moving water over it. A driver who attempts to cross is at serious risk of being swept off the crossing. Barricades are placed at these crossings when impassable — driving around those barricades is a Class A misdemeanor under ACA § 27-51-1404.",
    },
    {
      question: "Arkansas's Buffalo National River corridor roads (AR-74, AR-21, AR-7) are characterized by what driving conditions that the DFA's study guide addresses?",
      options: [
        "High-speed divided highways with generous shoulders and modern guardrails throughout",
        "Narrow two-lane roads with minimal shoulders, tight switchbacks, no guardrails, some unpaved sections, and seasonal closure periods",
        "Smooth mountain parkways similar to the Blue Ridge Parkway with no commercial vehicle access",
        "Two-lane roads that are open year-round with no seasonal closures or unpaved sections",
      ],
      correctIndex: 1,
      explanation:
        "The roads in the Buffalo National River corridor — AR-74 (Arkansas Highway 74), AR-21, and AR-7 (the Scenic 7 Byway) — are narrow two-lane mountain roads with minimal shoulders, tight switchbacks, limited or no guardrails, and some unpaved sections. These roads have seasonal closure periods during winter storms or after flooding. The Buffalo National River itself experiences rapid flooding after heavy rain, which can close these low-elevation road crossings without warning. Drivers unfamiliar with these conditions should check NPS and ARDOT road status before travel.",
    },
    {
      question: "Under Arkansas's DWI law, what BAC level triggers a DWI charge for a driver under 21?",
      options: ["0.08% — same as adult drivers", "0.04% — half the adult standard", "0.02% — near-zero tolerance for underage drivers", "0.00% — any detectable alcohol is a crime"],
      correctIndex: 2,
      explanation:
        "Arkansas sets its underage DWI threshold at 0.02% BAC for drivers under 21 — a near-zero tolerance standard. This is consistent with the approach of most U.S. states, which use 0.02% as the measurable threshold while implementing a practical zero-tolerance policy for underage drinking and driving. A first underage DWI in Arkansas results in a license suspension and mandatory participation in an alcohol education program. The adult standard of 0.08% does not apply to drivers under 21.",
    },
  ],
  faqs: [
    {
      question: "Does Arkansas have a DMV, and where do I go for my driver's license?",
      answer:
        "Arkansas does not have a Department of Motor Vehicles. All driver licensing functions in Arkansas are handled by the Department of Finance and Administration (DFA), Revenue Division. DFA driver licensing offices are located in cities and counties throughout the state. When searching for where to get your Arkansas driver's license, look for 'DFA Revenue Division' or 'Arkansas driver's license office' — not 'DMV.' The DFA's unusual placement within a tax and revenue agency means it is often confused with tax offices, but driver licensing is a core DFA Revenue Division function.",
    },
    {
      question: "What does Arkansas Act 1018 prohibit and when did it take effect?",
      answer:
        "Arkansas Act 1018, effective January 1, 2024, prohibits all drivers from physically holding a wireless communications device while operating a motor vehicle. Hands-free use — via Bluetooth, a mounted holder, or speakerphone without touching the device — is permitted. The law is primary enforcement and applies to all drivers regardless of age. First offense fine: $250. Subsequent offenses: $500. Before Act 1018, Arkansas only prohibited texting while driving for novice (under-18) drivers — adult handheld phone use was unrestricted statewide.",
    },
    {
      question: "What is the Arkansas flash flood barrier law (ACA § 27-51-1404)?",
      answer:
        "ACA § 27-51-1404 makes it a Class A misdemeanor — a criminal offense — to drive around or past a 'Road Closed' sign or flood barrier in Arkansas. The law was enacted because drivers who ignore flood barriers frequently become flood fatalities. In the Ozark and Ouachita mountain regions, rivers and streams can rise dramatically within minutes of heavy rain, turning paved road crossings into deadly traps. The official safety guidance is 'Turn Around, Don't Drown.' Even water that appears shallow can be moving fast enough to sweep away a vehicle. Class A misdemeanor consequences include potential jail time and a criminal record.",
    },
    {
      question: "Why are feral hog collisions distinctively dangerous on Arkansas roads?",
      answer:
        "Arkansas has approximately 2+ million feral hogs — one of the highest concentrations in the eastern U.S. Feral hogs travel in family groups called sounders of 10 to 30 animals, each weighing 200 to 400 pounds. When a sounder crosses a rural road at night (when hogs are most active), a driver may collide with multiple large animals before being able to stop — causing catastrophic vehicle damage and serious injury risk. Standard deer-avoidance techniques (single braking event) are not adequate when multiple large animals block the road. Feral hog collisions are treated as wildlife collisions — not covered by standard livestock collision liability.",
    },
    {
      question: "What is Arkansas's permit age and GDL program?",
      answer:
        "Arkansas GDL stages: (1) Instruction permit at age 14 — must be accompanied by a licensed driver 21+ in the front seat at all times; (2) Restricted license at age 16 after holding the permit for at least 6 months and completing 30 hours of supervised driving (10 at night) — restricted driving hours and passenger limits apply; (3) Full unrestricted license at age 18. Arkansas's 14-year-old permit age is one of the youngest in the United States and reflects the rural character of much of the state.",
    },
    {
      question: "What is Arkansas's DWI terminology and how does it differ from DUI?",
      answer:
        "Arkansas uses DWI (Driving While Intoxicated) under ACA § 5-65-103 — not DUI. The distinction is purely terminological; the legal structure is similar to DUI laws in other states. Adult threshold: 0.08% BAC. Under-21: 0.02% BAC. CDL holders in a commercial vehicle: 0.04%. First-offense DWI penalties: 6-month license suspension, $150–$1,000 fine, and possible jail time. Second DWI within 5 years: harsher penalties including possible IID. The DWI terminology is tested on the Arkansas knowledge exam.",
    },
    {
      question: "What are the Buffalo National River corridor road hazards?",
      answer:
        "The Buffalo National River corridor includes AR-74, AR-21, AR-7 (Scenic 7 Byway), and other Ozark Mountain roads characterized by: narrow two-lane pavement with minimal shoulders; tight switchbacks and steep grades; minimal or no guardrails; some unpaved sections; seasonal closure periods; and high flood risk at low-water crossings during spring rainfall. The Buffalo National River itself floods rapidly after rain, closing adjacent road crossings without much warning. Check NPS.gov/buff and ARDOT for current road conditions before traveling in this area.",
    },
    {
      question: "What are Arkansas's maximum speed limits?",
      answer:
        "Arkansas maximum speed limits: 75 mph on rural interstates (passenger vehicles), 70 mph for commercial motor vehicles on those same rural interstates; 65 mph on urban controlled-access highways; 55 mph on most two-lane state highways; lower posted limits on mountain roads in the Ozarks and Ouachitas. School zones are 25 mph when children are present. Urban districts default to 30 mph when no sign is posted. Always observe posted signs, which take precedence over default limits.",
    },
    {
      question: "What is the fine for violating Arkansas's Act 1018 hands-free law?",
      answer:
        "Act 1018 fines: $250 for a first offense; $500 for subsequent offenses. The law is primary enforcement — officers can stop a driver solely for observing them holding a wireless device. There is no grace period or warning phase. The law applies to all drivers regardless of age, to all wireless devices, and while the vehicle is in motion. Before Act 1018 (effective January 1, 2024), Arkansas only prohibited texting for novice drivers — the statewide adult handheld ban is a significant recent change that is directly tested.",
    },
    {
      question: "What vision requirements does Arkansas impose for a driver's license?",
      answer:
        "Arkansas requires minimum visual acuity of at least 20/50 in the better eye (with or without corrective lenses) to obtain a standard driver's license. If corrective lenses are required to meet this standard, the license will carry a restriction requiring the driver to wear glasses or contacts while driving. Applicants who cannot meet the 20/50 standard with correction may be eligible for a restricted license or may be referred to a vision specialist for further evaluation. Vision is screened at the DFA office during the license application process.",
    },
  ],
  relatedTests: [
    { label: "Arkansas Motorcycle Practice Test", href: "/arkansas-motorcycle-practice-test" },
    { label: "Arkansas CDL Practice Test", href: "/arkansas-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function ArkansasDmvPracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
