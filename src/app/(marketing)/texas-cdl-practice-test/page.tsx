import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Texas CDL General Knowledge Practice Test 2025 – Free TX Commercial License Prep",
  description:
    "Free Texas CDL General Knowledge practice test based on the FMCSA CDL Manual. 50 questions covering pre-trip inspection, braking, cargo, and HOS. Pass your TX CDL test.",
  alternates: { canonical: "https://caredmvprep.com/texas-cdl-practice-test" },
  openGraph: { url: 'https://caredmvprep.com/texas-cdl-practice-test', images: [{ url: 'https://caredmvprep.com/opengraph-image', width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Texas",
  stateAbbr: "TX",
  testLabel: "CDL General Knowledge Test",
  slug: "texas-cdl-practice-test",
  headline: "Texas CDL General Knowledge Practice Test",
  intro:
    "Prepare for the Texas CDL General Knowledge exam with free practice questions based on the FMCSA Commercial Driver's License Manual and Texas Commercial Driver Handbook. All Texas CDL applicants must pass this test before taking any endorsement exams.",
  numToPass: "40 correct (80%)",
  basedOn: "FMCSA CDL Manual & Texas Commercial Driver Handbook",
  about: [
    "The Texas CDL General Knowledge test consists of 50 multiple-choice questions based on the Federal Motor Carrier Safety Administration (FMCSA) CDL Manual and the Texas Commercial Driver Handbook. You must answer at least 40 questions correctly — an 80% passing score — to pass.",
    "The General Knowledge test is required for all CDL applicants regardless of vehicle class (Class A, B, or C) or endorsements. Topics include pre-trip vehicle inspection, basic vehicle control, shifting, cargo securement, hours-of-service regulations, emergency procedures, and safety rules.",
    "Texas is a major freight hub with extensive highway miles, making CDL knowledge especially important for safe commercial driving. Our Texas CDL practice tests help you master the knowledge foundation before your skills test.",
  ],
  sampleQuestions: [
    {
      question: "Under federal hours-of-service rules for property-carrying CMV drivers, how many hours may you drive after 10 consecutive hours off duty?",
      options: [
        "50 hours in any 7-day period",
        "Unlimited hours with mandatory rest breaks",
        "60 hours in 7 days, or 70 hours in 8 days",
        "80 hours in any 8-day period",
      ],
      correctIndex: 2,
      explanation:
        "Federal HOS regulations limit property-carrying CMV drivers to a maximum of 60 hours on duty in any 7 consecutive days, OR 70 hours in any 8 consecutive days, depending on which schedule the motor carrier uses. This is the weekly on-duty limit — separate from the 11-hour daily driving limit.",
    },
    {
      question: "What is the 'air brake lag distance' when testing a CMV's air brake system?",
      options: [
        "The distance traveled from the moment you apply brakes to when they begin to work",
        "The distance a CMV skids before coming to a full stop",
        "The gap distance between axles on a tandem axle set",
        "The space between a tractor and its trailer",
      ],
      correctIndex: 0,
      explanation:
        "Air brake lag is the time (and resulting distance traveled) between pushing the brake pedal and when the brakes actually begin to apply pressure. At 55 mph, air brake lag adds about 32 feet to your stopping distance before braking force even begins. This is why CMVs require far more stopping distance than passenger cars.",
    },
    {
      question: "What is the proper method to test the low air pressure warning signal on a CMV's air brake system?",
      options: [
        "Drive the vehicle until the warning sounds on its own",
        "Release the parking brake while the engine is idling",
        "Pump the brake pedal with the engine running",
        "With the engine off, fan the service brake pedal until the warning activates",
      ],
      correctIndex: 3,
      explanation:
        "To test the low air pressure warning: with the engine off, release the parking brake, then repeatedly pump (fan) the service brake pedal to reduce air pressure. The warning light and buzzer must activate before pressure drops below 60 psi. This confirms the warning system is working correctly.",
    },
    {
      question: "What should you do if you experience brake fade on a long downgrade?",
      options: [
        "Pump the brakes repeatedly to cool them down",
        "Select a lower gear and rely on engine braking",
        "Shift to neutral and allow the vehicle to coast",
        "Increase speed to move through the grade faster",
      ],
      correctIndex: 1,
      explanation:
        "Brake fade occurs when brakes overheat from excessive use on long downgrades. The correct technique is to select a low gear before beginning the descent and use engine braking (compression) as the primary means of speed control, supplemented by controlled brake application. Never shift to neutral and coast — this eliminates engine braking.",
    },
    {
      question: "When must you inspect cargo and cargo securement devices on a long haul?",
      options: [
        "Once per day regardless of distance",
        "Every 5 hours or 250 miles",
        "Within the first 50 miles, then every 3 hours or 150 miles",
        "Only at the start and end of the trip",
      ],
      correctIndex: 2,
      explanation:
        "Under 49 CFR 392.9, you must inspect your cargo and securement devices: (1) within the first 50 miles of departure, (2) after every 3 hours or 150 miles of driving — whichever comes first, and (3) after any change in your duty status. Loose or shifting cargo is a major cause of highway fatalities.",
    },
    {
      question: "What is the maximum allowable gross vehicle weight on the Interstate Highway System without a special permit?",
      options: ["80,000 pounds", "90,000 pounds", "70,000 pounds", "100,000 pounds"],
      correctIndex: 0,
      explanation:
        "The federal limit for gross vehicle weight (GVW) on the Interstate Highway System is 80,000 pounds without a special overweight permit. This limit includes the weight of the vehicle, fuel, cargo, and all passengers. Individual axle weight limits also apply — 20,000 lbs for a single axle and 34,000 lbs for a tandem axle set.",
    },
    {
      question: "Under FMCSA hours-of-service rules, how many hours may a property-carrying driver drive after 10 consecutive hours off duty?",
      options: ["8 hours", "10 hours", "11 hours", "14 hours"],
      correctIndex: 2,
      explanation:
        "Property-carrying drivers may drive a maximum of 11 hours after taking 10 consecutive hours off duty. This is the 11-Hour Driving Limit. You must stop driving at the earlier of: after 11 hours of driving, or after the 14th hour since coming on duty.",
    },
    {
      question: "At 55 mph, how much distance does a fully loaded 80,000-lb tractor-trailer need to stop compared to a car?",
      options: ["About the same", "About 25% more", "Nearly twice as much", "Three to four times as much"],
      correctIndex: 2,
      explanation:
        "A fully loaded tractor-trailer traveling at 55 mph needs approximately 400 feet to stop — nearly twice the stopping distance of a passenger car at the same speed. Wet roads, worn brakes, or improper brake adjustment can dramatically increase this distance. Always maintain a large following distance.",
    },
    {
      question: "When must a vehicle display hazardous materials placards?",
      options: ["Only when carrying more than 1,000 lbs of hazmat", "Whenever any amount of a placard-required material is being transported", "Only on interstate highways", "Only when the material is in liquid form"],
      correctIndex: 1,
      explanation:
        "Hazardous materials placards must be displayed whenever you are transporting any quantity of a material that requires placarding under 49 CFR Part 172. There is no minimum weight threshold for placards — even small amounts of certain hazmat categories require placarding.",
    },
    {
      question: "Before backing under a trailer to couple, you should check that the trailer kingpin is:",
      options: ["Greased and at a 45-degree angle", "Straight and at the correct height for the fifth wheel", "Retracted into the trailer frame", "Centered over the rear axle"],
      correctIndex: 1,
      explanation:
        "Before coupling, ensure the trailer kingpin is straight (not bent or damaged) and that the trailer is at the correct height — low enough that the fifth wheel will contact the trailer plate and ride under the kingpin, but not so low that the tractor frame hits the trailer. Always check the kingpin and fifth wheel visually before coupling.",
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Texas CDL General Knowledge test?",
      answer:
        "The Texas CDL General Knowledge test has 50 questions. You must answer at least 40 correctly — a passing score of 80% — to pass.",
    },
    {
      question: "What CDL classes are available in Texas?",
      answer:
        "Texas issues three CDL classes: Class A (combination vehicles over 26,001 lbs GVWR towing a unit over 10,000 lbs), Class B (single vehicle over 26,001 lbs, or towing a vehicle under 10,001 lbs), and Class C (vehicles carrying 16+ passengers including the driver, or transporting hazardous materials requiring placards).",
    },
    {
      question: "Do I need to pass additional tests beyond General Knowledge?",
      answer:
        "Yes. Depending on your CDL class and endorsements, you must also pass skills tests (pre-trip inspection, basic vehicle control, and road test) and endorsement-specific knowledge tests for Passenger (P), School Bus (S), Tank Vehicle (N), Hazardous Materials (H), Doubles/Triples (T), or Air Brakes.",
    },
    {
      question: "How long is a Texas CDL valid?",
      answer:
        "A Texas CDL is valid for 8 years for most drivers. However, if you hold a HazMat endorsement, you must complete a TSA security threat assessment every 5 years. You must also keep your DOT medical certificate current throughout the CDL validity period.",
    },
    {
      question: "What is the difference between a Texas CDL and a Texas commercial driver's license permit?",
      answer:
        "A Texas CDL learner's permit (CLP) allows you to practice driving a commercial vehicle under the supervision of a licensed CDL holder. You must hold a CLP for at least 14 days before taking the CDL skills test. The full CDL is issued after passing all required knowledge and skills tests.",
    },
    {
      question: "What is the difference between a Class A, Class B, and Class C CDL in Texas?",
      answer:
        "A Class A CDL allows you to operate any combination of vehicles with a Gross Vehicle Weight Rating (GVWR) of 26,001 lbs or more, provided the towed unit exceeds 10,000 lbs — this includes tractor-trailers and double/triple trailer rigs. A Class B CDL covers single vehicles with a GVWR of 26,001 lbs or more, or any such vehicle towing a unit not exceeding 10,000 lbs — this includes straight trucks and large buses. A Class C CDL is required for vehicles designed to carry 16 or more passengers (including the driver) or for vehicles transporting hazardous materials that require placarding, when those vehicles do not qualify for Class A or B.",
    },
    {
      question: "How much does it cost to get a CDL in Texas?",
      answer:
        "Texas CDL fees are set by the Texas DPS. As of 2025: the Commercial Learner's Permit (CLP) is $16 for 1 year; the CDL license itself costs approximately $97 for an 8-year license. Each knowledge test attempt costs $11. The HazMat endorsement requires an additional TSA security threat assessment fee of approximately $86 charged separately by the federal government. Skills test fees vary by the third-party testing site used. Check the Texas DPS website (dps.texas.gov) for the current fee schedule before your visit.",
    },
    {
      question: "Can I take the Texas CDL knowledge test in a language other than English?",
      answer:
        "Federal regulations (49 CFR 383.133) require that CDL applicants demonstrate sufficient English proficiency to understand highway signs and respond to official inquiries. Texas DPS offers the CDL General Knowledge test in Spanish in addition to English. Other endorsement tests (HazMat, Passenger, etc.) may be English-only. Contact your local Texas DPS driver's license office to confirm language options for the specific test you need before scheduling.",
    },
    {
      question: "How long is a Texas CDL valid and how do I renew it?",
      answer:
        "A Texas CDL is valid for 8 years. To renew, you must visit a Texas DPS driver's license office, pass a vision test, pay the renewal fee, and provide a current DOT medical certificate. If you hold a HazMat endorsement, your TSA background check must also be current (renewed every 5 years). Texas CDL renewals cannot be done online — federal law requires in-person verification of medical certification. You may renew up to 2 years before expiration.",
    },
    {
      question: "What happens if I fail the Texas CDL knowledge test?",
      answer:
        "If you fail a Texas CDL knowledge test at a DPS office, you must wait at least 1 day before retesting. There is no limit on total attempts, but each attempt costs $11. Texas DPS will provide a score sheet showing which topic areas you missed — study those sections of the Texas CDL Handbook before retesting. If you fail the skills test at a third-party testing site, the retest fee is set by the testing site and you must again wait at least 1 day.",
    },
  ],
  relatedTests: [
    { label: "TX Permit Test", href: "/texas-dmv-practice-test" },
    { label: "TX Motorcycle Test", href: "/texas-motorcycle-practice-test" },
    { label: "CA CDL Test", href: "/california-cdl-practice-test" },
    { label: "FL CDL Test", href: "/florida-cdl-practice-test" },
    { label: "NY CDL Test", href: "/new-york-cdl-practice-test" },
    { label: "View All States", href: "/" },
  ],
};

export default function TexasCDLPage() {
  return <PracticeTestPage {...data} />;
}
