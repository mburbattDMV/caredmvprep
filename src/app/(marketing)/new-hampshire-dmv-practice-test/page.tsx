import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "New Hampshire DMV Practice Test 2025 – Free NH DMV Knowledge Exam Prep",
  description: "Prepare for the New Hampshire DMV 40-question knowledge test with 80% passing score (32 correct). Covers the no-adult-seatbelt law, no adult helmet law for 18+, OUI statute (RSA 265-A:2), Franconia Notch 2-lane interstate, Kancamagus Highway hazards, and NH toll road rules.",
  alternates: { canonical: "https://caredmvprep.com/new-hampshire-dmv-practice-test" },
  openGraph: { url: "https://caredmvprep.com/new-hampshire-dmv-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "New Hampshire",
  stateAbbr: "NH",
  testLabel: "DMV Practice Test",
  slug: "new-hampshire-dmv-practice-test",
  headline: "New Hampshire DMV Practice Test 2025",
  intro: "The New Hampshire Division of Motor Vehicles administers a 40-question knowledge exam requiring 32 correct answers to pass (80%). This practice test covers New Hampshire's most distinctive laws: no mandatory adult seatbelt, no mandatory adult motorcycle helmet, OUI terminology under RSA 265-A:2, the unique 2-lane Franconia Notch Interstate (I-93/NH 18), Kancamagus Highway hazards, and NH toll road procedures.",
  basedOn: "New Hampshire Division of Motor Vehicles Driver's Manual",
  keyRules: [
    { icon: "🪑", rule: "No Adult Seatbelt Law", detail: "New Hampshire is one of only about two states in the United States with no mandatory seatbelt law for adults. Adults are not required by law to wear a seatbelt. This reflects New Hampshire's 'Live Free or Die' philosophy. Drivers and passengers under 18 are required to be buckled (RSA 265:107-a). This law is directly tested on the NH knowledge exam." },
    { icon: "🪖", rule: "No Adult Helmet Law", detail: "New Hampshire has no mandatory helmet law for motorcycle riders and passengers 18 and older. Adults may legally operate a motorcycle without a helmet in New Hampshire. Riders under 18 must wear helmets (RSA 265:122). Combined with the no-adult-seatbelt law, New Hampshire has among the most permissive personal protection requirements in the nation." },
    { icon: "🍺", rule: "OUI – RSA 265-A:2", detail: "New Hampshire uses OUI (Operating Under the Influence) under RSA 265-A:2 — not DUI. The legal BAC limit is 0.08% for adults 21+. Drivers under 21 face a 0.02% BAC threshold. CDL holders face 0.04%. Aggravated DWI triggers at 0.16%+ BAC (RSA 265-A:3). NH's Implied Consent law is codified in RSA 265-A." },
    { icon: "🏔️", rule: "Franconia Notch – 2-Lane Interstate", detail: "I-93 through Franconia Notch State Park narrows to 2 lanes and is designated NH Route 18 — the only section of the U.S. Interstate Highway System that was permanently reduced to 2 lanes due to environmental constraints protecting Franconia Notch State Park. Normal interstate passing rules still apply, but the narrow design requires extra caution." },
    { icon: "🌲", rule: "Kancamagus Highway (NH-112)", detail: "The Kancamagus Highway (NH-112) is a 34.5-mile scenic road through the White Mountains with no gas stations, no food services, no cell service, and is sometimes closed in winter. It crosses several mountain passes with deer and moose crossing zones. Drivers must enter with adequate fuel and be prepared for no services." },
    { icon: "📱", rule: "Cell Phone: Handheld Ban (RSA 265:79-c)", detail: "All handheld device use while driving is banned in New Hampshire (RSA 265:79-c). Hands-free use is permitted for adults 18 and older. Drivers under 18 face a complete ban — no handheld or hands-free use while driving except to call 911. Fines: $100 first offense, $250 second, $500 third and subsequent." },
    { icon: "🪪", rule: "Permit Age: 16 (Youth Operator's License)", detail: "New Hampshire residents may apply for a Youth Operator's License (learner's permit) at age 16. Under-18 applicants must complete driver education and have parental consent. GDL requirements include 40 hours of supervised driving (10 at night), a nighttime driving curfew of 1 a.m. to 4 a.m., and for the first 6 months after licensure a maximum of 1 non-family passenger under 25." },
    { icon: "🫎", rule: "Moose and Wildlife Crossings", detail: "New Hampshire, like Maine, has significant moose-vehicle collision risks on rural roads. NH-112 (Kancamagus), NH-16 (Conway to Gorham), and US-3 through the North Country are active moose corridors. Moose legs are tall enough that the body clears headlights — the animal may be invisible until directly in front of the vehicle." },
  ],
  about: [
    "The New Hampshire Division of Motor Vehicles administers a 40-question knowledge exam requiring 32 correct answers to pass — an 80% passing threshold. New Hampshire is one of the most distinctive states for traffic law: it is one of only about two U.S. states without a mandatory seatbelt law for adults (RSA 265:107-a). This law directly reflects the state motto 'Live Free or Die' and is one of the most frequently tested facts on the NH DMV exam.",
    "New Hampshire also has no mandatory helmet law for motorcycle riders and passengers age 18 and older (RSA 265:122). OUI (Operating Under the Influence) under RSA 265-A:2 is the terminology New Hampshire uses — not DUI. The adult BAC limit is 0.08% and the under-21 threshold is 0.02%. CDL holders face a 0.04% threshold. Aggravated DWI applies at 0.16%+ BAC. Youth Operator's License (permit) applicants must be at least 16 years old. Under-18 applicants must complete driver education and have parental consent. GDL requires 40 hours of supervised driving (10 at night).",
    "New Hampshire's White Mountains create unique driving conditions tested on the DMV exam. Franconia Notch on I-93 has the only permanently narrowed section of the U.S. Interstate Highway System — reduced to 2 lanes and designated NH Route 18 because the park's environmental constraints prevented standard interstate construction. The Kancamagus Highway (NH-112) is a 34.5-mile mountain road with no services, no cell service, and seasonal closures — entering without adequate fuel is a significant driving hazard. Speed limits vary: 30 mph in business/urban areas, 35 mph in rural residential areas, 55 mph general, 65 mph on interstates, and 70 mph on I-93 from mile marker 45 to the Vermont border. School zones are 10 mph below the posted limit (RSA 265:60).",
  ],
  sampleQuestions: [
    {
      question: "New Hampshire's adult seatbelt law is unique. Which statement is correct?",
      options: ["Adults in any seating position are not required to wear a seatbelt in New Hampshire", "Only drivers over age 65 are exempt from the seatbelt requirement", "Adults in front seats only must wear seatbelts", "Children under age 8 only are required to wear seatbelts"],
      correctIndex: 0,
      explanation: "New Hampshire is one of only about two states that do not require adults to wear seatbelts (RSA 265:107-a). Adults in any seating position in the vehicle are not required by law to buckle up. Drivers and passengers under 18 are required to be properly restrained. Despite the legal exemption, seatbelts reduce the risk of death in a crash by approximately 45%. This law is one of the most commonly tested facts on the New Hampshire DMV knowledge exam."
    },
    {
      question: "New Hampshire uses OUI rather than DUI for impaired driving. Under which statute is OUI defined?",
      options: ["RSA 265-A:2", "RSA 259:55", "RSA 265:79", "RSA 21-J:1"],
      correctIndex: 0,
      explanation: "New Hampshire's OUI (Operating Under the Influence) offense is defined under RSA 265-A:2. This statute sets the 0.08% BAC threshold for adults and establishes the 0.02% standard for drivers under 21. OUI in New Hampshire covers impairment from alcohol, drugs, or any combination of substances. Understanding the OUI designation (as opposed to DUI or DWI) and the RSA 265-A statute reference is directly tested on the New Hampshire knowledge exam."
    },
    {
      question: "The Franconia Notch section of I-93 in New Hampshire is unique in the U.S. Interstate Highway System because:",
      options: ["It is the only toll section of I-93 in New Hampshire", "It is the only section of the U.S. Interstate System permanently reduced to 2 lanes, designated NH Route 18, due to environmental constraints protecting Franconia Notch State Park", "It has no posted speed limit in the park section", "It is closed to commercial vehicles year-round"],
      correctIndex: 1,
      explanation: "I-93 through Franconia Notch State Park narrows from its standard multi-lane interstate configuration to 2 lanes — making it the only section of the U.S. Interstate Highway System that was permanently reduced to 2 lanes. This was required by federal and state environmental agreements to protect the resources of Franconia Notch State Park. The road is designated NH Route 18 through this section."
    },
    {
      question: "The Kancamagus Highway (NH-112) runs 34.5 miles through the White Mountains. What critical preparation must drivers make before entering the Kancamagus from either end?",
      options: ["Obtain a White Mountains National Forest vehicle permit for the Kancamagus", "Ensure the vehicle has adequate fuel, as there are no gas stations, restaurants, or cell phone service anywhere along NH-112", "Reduce tire pressure to improve traction on the mountain grades", "Check for active construction closures on the NH DOT website"],
      correctIndex: 1,
      explanation: "The Kancamagus Highway (NH-112) has no gas stations, no food services, no cell phone service, and no emergency call boxes along its entire 34.5-mile length through the White Mountain National Forest. A vehicle that runs out of fuel on the Kancamagus faces a serious situation — the nearest fuel is at Conway (eastern end) or Lincoln (western end). Drivers should enter with a full tank of fuel."
    },
    {
      question: "New Hampshire's motorcycle helmet law requires helmets for which riders?",
      options: ["All riders regardless of age", "Riders under age 21 only", "Riders under age 18 only", "Helmets are optional for all NH motorcycle riders"],
      correctIndex: 2,
      explanation: "New Hampshire requires motorcycle helmets only for riders and passengers under age 18 (RSA 265:122). Adults 18 and older are not legally required to wear a helmet while operating or riding as a passenger on a motorcycle in New Hampshire. The NH DMV exam tests the helmet law's 18-year-old threshold specifically, as it is one of the most distinctive aspects of New Hampshire traffic law."
    },
    {
      question: "Under New Hampshire's handheld device ban (RSA 265:79-c), what is the fine for a first offense?",
      options: ["$50", "$100", "$250", "$500"],
      correctIndex: 1,
      explanation: "RSA 265:79-c prohibits all handheld device use while driving in New Hampshire. The fine structure is: $100 for a first offense, $250 for a second offense, and $500 for a third or subsequent offense. Hands-free use is permitted for adults 18 and older. Drivers under 18 face a complete ban — no handheld or hands-free device use while driving except to call 911."
    },
    {
      question: "A New Hampshire driver approaches the F.E. Everett Turnpike toll at an all-electronic tolling (AET) plaza without E-ZPass. What will happen?",
      options: ["The driver must stop and pay cash to a toll collector", "The vehicle's license plate will be photographed and the driver will receive a bill-by-mail invoice for the toll amount", "The driver may proceed without paying — AET plazas have no enforcement mechanism", "The driver must pull to a designated cash lane to pay"],
      correctIndex: 1,
      explanation: "New Hampshire's toll road system includes all-electronic tolling (AET) plazas where no cash option exists. Vehicles without E-ZPass transponders pass through at highway speed, and overhead cameras photograph the license plate. The registered owner then receives a bill-by-mail (Pay-by-Plate) invoice for the toll amount. Unpaid toll invoices can eventually result in collections action or registration renewal issues."
    },
    {
      question: "What is the BAC limit for adult drivers (21 and older) under New Hampshire's OUI law (RSA 265-A:2)?",
      options: ["0.10%", "0.08%", "0.06%", "0.04%"],
      correctIndex: 1,
      explanation: "New Hampshire's OUI statute (RSA 265-A:2) sets the BAC limit at 0.08% for adult drivers 21 and older. New Hampshire's Implied Consent law (RSA 265-A:14) requires drivers who are lawfully arrested for OUI to submit to chemical testing. A first refusal of chemical testing results in a 180-day administrative suspension (RSA 265-A:14). The exam tests both the OUI terminology and the 0.08% threshold."
    },
    {
      question: "Why is the moose crossing hazard on New Hampshire's NH-112 (Kancamagus) particularly serious?",
      options: ["Moose always cross the road in groups, making avoidance impossible", "Moose legs are tall enough that the body sits above headlight beams, making the animal nearly invisible in darkness until it is directly in front of the vehicle", "Moose are protected species and drivers cannot swerve to avoid them", "The Kancamagus has a 45 mph speed limit that makes stopping for moose impossible"],
      correctIndex: 1,
      explanation: "Moose are uniquely dangerous on NH-112 and other White Mountain roads because their long legs position the body above the typical headlight beam. Unlike deer, whose eyes reflect headlight beams at significant distance, moose may not catch the light — and the dark body blends into the night. The combination of the Kancamagus Highway's curves, complete absence of cell service, and active moose population creates a high-risk corridor."
    },
    {
      question: "What is the minimum age to apply for a New Hampshire Youth Operator's License (learner's permit)?",
      options: ["14 years old", "15½ years old", "16 years old", "17 years old"],
      correctIndex: 2,
      explanation: "New Hampshire allows residents to apply for a Youth Operator's License (learner's permit) at age 16. Under-18 applicants must complete driver education and have parental consent. GDL requirements include 40 hours of supervised driving (10 at night), a nighttime curfew of 1 a.m. to 4 a.m., and for the first 6 months after licensure a maximum of 1 non-family passenger under 25."
    },
  ],
  faqs: [
    {
      question: "Is New Hampshire one of the only states with no seatbelt law for adults?",
      answer: "Yes. New Hampshire is one of only about two states that does not require adults to wear seatbelts (RSA 265:107-a). Adults in both front and rear seats are not legally required to buckle up. Drivers and passengers under 18 are required to be properly restrained. Despite the legal exemption, safety data shows that seatbelts reduce the risk of death in a crash by approximately 45% for front-seat occupants. The New Hampshire DMV exam tests this fact directly as a key state-specific law."
    },
    {
      question: "What passing score does the New Hampshire DMV knowledge test require?",
      answer: "New Hampshire's DMV knowledge exam consists of 40 questions, and applicants must answer at least 32 correctly to pass — an 80% passing threshold. The exam covers New Hampshire traffic laws, road signs, OUI statutes (RSA 265-A:2), the no-adult-seatbelt law, the no-adult-helmet law for adults 18+, the Franconia Notch interstate situation, White Mountain driving hazards, and New Hampshire's toll road system."
    },
    {
      question: "What does OUI mean in New Hampshire and how is it different from DUI?",
      answer: "New Hampshire uses OUI — Operating Under the Influence — under RSA 265-A:2. The actual conduct and penalties are essentially the same as DUI in other states — the difference is terminology. OUI applies to impairment from alcohol, drugs, or any combination of substances. The adult BAC threshold is 0.08%; the under-21 threshold is 0.02%; CDL holders face 0.04%; and aggravated DWI triggers at 0.16%+ BAC (RSA 265-A:3). New Hampshire's Implied Consent law (RSA 265-A:14) requires submission to chemical testing when lawfully arrested for OUI."
    },
    {
      question: "What is the Franconia Notch 2-lane interstate and why is it unique?",
      answer: "Franconia Notch on I-93 is the only section of the entire U.S. Interstate Highway System that was permanently reduced to 2 lanes rather than the minimum 4-lane divided highway standard. When I-93 was being extended through Franconia Notch, federal and state environmental negotiations determined that a standard 4-lane interstate would be too environmentally destructive to Franconia Notch State Park. The compromise was a 2-lane parkway designated as both I-93 and NH Route 18."
    },
    {
      question: "What should drivers know before entering the Kancamagus Highway?",
      answer: "The Kancamagus Highway (NH-112) runs 34.5 miles from Lincoln to Conway through the White Mountain National Forest. There are no gas stations, restaurants, rest stops with services, cell phone towers, or emergency call boxes anywhere along the road. Enter with a full tank of fuel — the nearest stations are at Lincoln (west end) and Conway (east end). In winter, the Kancamagus is sometimes closed entirely. Active moose and deer crossing zones exist throughout the road."
    },
    {
      question: "Does New Hampshire have a mandatory helmet law for adult motorcycle riders?",
      answer: "No. New Hampshire does not require motorcycle helmets for riders or passengers who are 18 or older (RSA 265:122). The law requires helmets only for riders and passengers under 18. Combined with the no-adult-seatbelt law, New Hampshire has among the most permissive personal protection requirements in the United States for vehicle occupants. The New Hampshire DMV exam tests the helmet law's 18-year threshold explicitly."
    },
    {
      question: "What are New Hampshire's toll roads and how do they work?",
      answer: "New Hampshire's toll road system includes the F.E. Everett Turnpike (I-293 and NH-101 in the southern tier), I-93, and toll plazas at several highway entry points. E-ZPass electronic transponders allow contactless payment. Some New Hampshire toll plazas have converted to all-electronic tolling (AET), where vehicles without E-ZPass are photographed by license plate cameras and billed by mail (Pay-by-Plate). Unpaid toll bills accumulate fees and can eventually result in registration renewal issues."
    },
    {
      question: "What moose crossing hazards exist on New Hampshire roads?",
      answer: "New Hampshire has a significant moose population concentrated in the White Mountain and North Country regions. The most active moose crossing roads include NH-112 (Kancamagus Highway), NH-16 (from Conway north to Gorham and Berlin), US-3 through the North Country, and NH-302 through the Crawford Notch area. Moose are most active at dawn, dusk, and nighttime. Their legs are tall enough that the body sits above standard headlight beams, making them nearly invisible at night until directly in front of a vehicle."
    },
    {
      question: "What are New Hampshire's GDL requirements for new drivers?",
      answer: "New Hampshire's GDL (graduated driver license) program applies to drivers under 18. Applicants must be at least 16, complete driver education, and have parental consent. The learner phase requires 40 hours of supervised driving (10 at night). After receiving a license, under-18 drivers must observe a nighttime curfew (no driving 1 a.m. to 4 a.m.) and for the first 6 months are limited to 1 non-family passenger under 25. These restrictions are designed to reduce crash risk during the highest-risk period for new drivers."
    },
    {
      question: "What are New Hampshire's implied consent suspension periods for test refusal?",
      answer: "Under New Hampshire's implied consent law (RSA 265-A:14), refusing a chemical test results in a 180-day (6-month) administrative license suspension for a first refusal with no prior conviction or prior refusal. If the driver has a prior DWI conviction or prior refusal on record, the suspension period increases to 2 years. Drivers have 30 days to request a hearing to contest the suspension."
    },
  ],
  relatedTests: [
    { label: "New Hampshire Motorcycle Practice Test", href: "/new-hampshire-motorcycle-practice-test" },
    { label: "New Hampshire CDL Practice Test", href: "/new-hampshire-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function NewHampshireDMVPage() {
  return <PracticeTestPage {...data} />;
}
