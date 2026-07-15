import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Hawaii Motorcycle Practice Test 2025 – Free HI Endorsement Exam Prep",
  description:
    "Prepare for your Hawaii motorcycle endorsement test with free practice questions covering Hawaii's under-18 helmet law, lane splitting ban, MSF course requirement, vog visibility hazards, volcanic road surfaces, Pali Highway crosswinds, and HI OVUII rules.",
  alternates: { canonical: "https://caredmvprep.com/hawaii-motorcycle-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/hawaii-motorcycle-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "Hawaii",
  stateAbbr: "HI",
  testLabel: "Motorcycle Practice Test",
  slug: "hawaii-motorcycle-practice-test",
  headline: "Hawaii Motorcycle Practice Test 2025",
  intro:
    "Hawaii requires a motorcycle endorsement on your driver's license to operate a motorcycle. The endorsement test has 25 questions and requires 80% (20/25) to pass. Under Act 66 (December 2025), the MSF Basic RiderCourse must be completed BEFORE applying for a motorcycle permit; completing it may also waive the skills test. Under HRS § 286-81, helmet use is required for operators and passengers under 18 — adults 18+ are not legally required to wear one (though strongly recommended). Lane splitting is illegal under HRS § 291C-153(c). Hawaii motorcycle riders also face unique hazards: volcanic basalt road surfaces, vog visibility reduction, Pali Highway crosswinds, and the reality that motorcycles must be shipped between islands via cargo vessel.",
  basedOn: "Hawaii Department of Transportation Motorcycle Operator Manual",
  about: [
    "Hawaii's motorcycle helmet law (HRS § 286-81) requires operators and passengers under 18 to wear a DOT-approved helmet. Adults 18 and older are not legally required to wear a helmet on motorcycles. Moped operators of ALL ages must wear a helmet under Act 222 (effective June 2025). The motorcycle endorsement is obtained through county licensing offices (Honolulu, Maui, Hawaii County, Kauai). Under Act 66 (December 2025), the MSF Basic RiderCourse must be completed before applying for a motorcycle permit; completing it may waive the skills test, but the written knowledge test is always required. Lane splitting is illegal under HRS § 291C-153(c); two motorcycles riding side-by-side in the same lane is also illegal under HRS § 291C-153(d). Hawaii's OVUII law (Operating a Vehicle Under the Influence of an Intoxicant, HRS § 291E-61) applies fully to motorcycle operators, with a 0.08% BAC limit for adults and 0.02% for riders under 21.",
    "Riding motorcycles in Hawaii presents challenges unique to the state. Volcanic basalt road surfaces — particularly on Hawaii Island — become dangerously slippery when wet, and Hilo's annual rainfall of over 120 inches means wet-road riding is common. Vog from Kilauea reduces visibility and can irritate a rider's eyes and respiratory system. The Pali Highway on Oahu features strong channeled winds through the Ko'olau Mountains that can affect motorcycle stability. Motorcycles cannot be ridden between islands — they must be shipped via cargo vessel (Matson Navigation or Young Brothers). Each island has completely separate road networks.",
  ],
  sampleQuestions: [
    {
      question:
        "Under Hawaii Revised Statutes § 286-81, who is REQUIRED to wear a helmet while riding a motorcycle in Hawaii?",
      options: [
        "All motorcycle operators and passengers, regardless of age",
        "Only riders who have been licensed for less than 2 years",
        "Only riders under 21 years old",
        "Operators and passengers under 18 years of age only",
      ],
      correctIndex: 3,
      explanation:
        "HRS § 286-81 requires helmet use only for motorcycle operators and passengers under 18 years of age. Adult riders (18 and older) are NOT legally required to wear a helmet in Hawaii, making it a partial-helmet state. However, safety experts strongly recommend helmets for all riders — in a crash, a DOT-approved helmet reduces fatality risk by approximately 37%. Note that moped operators of ALL ages must wear a helmet under Act 222 (June 2025), which is stricter than the motorcycle rule.",
    },
    {
      question:
        "You are riding a motorcycle on Hawaii Island in heavy vog conditions. What is the correct riding adjustment?",
      options: [
        "Switch to high beams to maximize visibility through the vog haze",
        "Use low beams, reduce speed, increase following distance, and consider wearing eye protection",
        "Maintain normal speed since vog does not significantly affect visibility",
        "Stop riding immediately and call for a vehicle transport",
      ],
      correctIndex: 1,
      explanation:
        "Vog (volcanic smog from Kilauea emissions) reduces visibility and contains sulfur compounds that irritate eyes and the respiratory system. In heavy vog, use low-beam headlights (high beams reflect off the haze and reduce forward visibility), reduce speed to match conditions, increase following distance, and wear wrap-around eye protection or a full-face helmet with visor. Riders with respiratory sensitivities should avoid riding in heavy vog. Check Hawaii Emergency Management Agency vog advisories before riding on Hawaii Island.",
    },
    {
      question:
        "You are approaching the Nuuanu Pali summit on Oahu's Pali Highway on your motorcycle. What riding hazard is most significant here?",
      options: [
        "The road surface at the summit is made of rough lava rock with poor traction",
        "Strong winds channeled through the Ko'olau Mountain gap can affect motorcycle stability",
        "The Pali Highway has no guardrails on the windward descent",
        "Heavy rainfall at the summit makes the road surface permanently slippery",
      ],
      correctIndex: 1,
      explanation:
        "The Nuuanu Pali gap in the Ko'olau Mountains channels and accelerates trade winds, creating strong and sometimes sudden gusts at the Pali Highway summit on Oahu. Motorcycle riders should anticipate strong crosswinds, grip the handlebars firmly, reduce speed, and be prepared for the wind to shift in direction as they pass through the gap. The Pali Lookout area is famous for winds strong enough to blow objects out of hands. Emerging from the tunnel section onto the open summit area can bring a sudden burst of crosswind.",
    },
    {
      question:
        "What is the OVUII BAC limit for a motorcycle rider under 21 years old in Hawaii?",
      options: ["0.08%", "0.04%", "0.00%", "0.02%"],
      correctIndex: 3,
      explanation:
        "Hawaii's OVUII law (HRS § 291E-61) sets a BAC limit of 0.02% for riders under 21 — a near-zero tolerance standard. Any BAC at or above 0.02% is an OVUII violation for underage riders. For riders 21 and older, the standard 0.08% limit applies. OVUII penalties for motorcycle riders are the same as for car drivers, including mandatory license revocation and fines. Alcohol impairs the balance and coordination essential for safe motorcycle operation.",
    },
    {
      question:
        "Why are basalt road surfaces on Hawaii Island especially dangerous for motorcycle riders when it begins to rain?",
      options: [
        "Basalt absorbs water and becomes soft, destabilizing the road foundation",
        "Basalt surfaces become extremely slippery when first wetted because the dark stone has smooth texture and oil residue accumulates on dry surfaces",
        "Basalt roads have drainage channels that create tire traps for motorcycles",
        "Basalt roads are only found on trails and are not part of the public road network",
      ],
      correctIndex: 1,
      explanation:
        "Dark volcanic basalt road surfaces become very slippery when they first get wet because the smooth stone texture provides less grip than asphalt aggregate, and oil and rubber residue from dry periods create a slick layer when wetted. For motorcycle riders, this dramatically reduces both front and rear tire traction. On Hawaii Island, which receives extremely heavy rainfall in windward areas, the transition from dry to wet basalt roads requires immediate speed reduction and smooth, gradual braking and turning inputs.",
    },
    {
      question:
        "How is a motorcycle transported between Hawaiian islands?",
      options: [
        "Via the Hawaii Inter-Island Highway underwater tunnel",
        "By riding the motorcycle onto a passenger ferry at no cost",
        "Via cargo ship companies such as Matson Navigation or Young Brothers",
        "Hawaii prohibits motorcycle transport between islands",
      ],
      correctIndex: 2,
      explanation:
        "There are no roads or bridges between Hawaiian islands. Motorcycles must be transported by cargo ship between islands. Matson Navigation handles most inter-island cargo including vehicles and motorcycles, and Young Brothers serves smaller island ports. Riders planning to ride on multiple Hawaiian islands must ship their motorcycle in advance via these cargo services. The cost and scheduling requirements make spontaneous inter-island motorcycle travel impossible in Hawaii.",
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
      question: "Is a helmet required to ride a motorcycle in Hawaii?",
      answer:
        "It depends on age. Under HRS § 286-81, motorcycle operators and passengers under 18 years old are required to wear a DOT-approved helmet. Adults 18 and older are NOT legally required to wear a motorcycle helmet in Hawaii. However, moped operators of ALL ages must wear a helmet under Act 222 (effective June 2025). Safety experts strongly recommend helmets for all riders regardless of the law — a DOT-approved helmet reduces fatality risk by approximately 37% in a crash.",
    },
    {
      question: "How do I get a motorcycle endorsement in Hawaii?",
      answer:
        "Under Act 66 (December 2025), you must complete the MSF Basic RiderCourse (BRC) BEFORE applying for a motorcycle instruction permit. After completing the BRC, visit the county licensing office for your island (City and County of Honolulu for Oahu; Maui County for Maui, Molokai, and Lanai; Hawaii County for the Big Island; Kauai County). You must pass the motorcycle knowledge test — this is always required and cannot be waived. Completing the BRC may waive the riding skills test. The endorsement is added to your Hawaii driver's license. Under a motorcycle instruction permit, you may not carry passengers and may not ride at night.",
    },
    {
      question: "What is OVUII and how does it apply to motorcycle riders in Hawaii?",
      answer:
        "OVUII stands for Operating a Vehicle Under the Influence of an Intoxicant — Hawaii's legal term for impaired driving. It applies fully to motorcycle operators under HRS § 291E-61. The adult BAC threshold is 0.08%, and the under-21 limit is 0.02%. Penalties for motorcycle OVUII include mandatory license revocation, fines, possible jail time, and mandatory substance abuse assessment. Alcohol significantly impairs the balance, coordination, and reaction time required for safe motorcycle operation.",
    },
    {
      question: "What volcanic hazards should Hawaii motorcycle riders be aware of?",
      answer:
        "On Hawaii Island (Big Island), volcanic hazards include: vog (volcanic smog) from Kilauea that reduces visibility and irritates eyes and lungs; lava flow road closures that can occur with little warning when active lava crosses a road; and volcanic basalt road surfaces that become extremely slippery when wet. Riders on Hawaii Island should monitor Hawaii County Civil Defense and Hawaii Emergency Management Agency alerts for road closure and vog advisories. On other islands, vog can drift depending on wind direction but is less common.",
    },
    {
      question: "Can I ride my motorcycle between Hawaiian islands?",
      answer:
        "No. There are no roads or bridges between Hawaiian islands. Motorcycles must be transported by cargo ship. Matson Navigation and Young Brothers are the main cargo carriers for inter-island vehicle and motorcycle transport. Riders who want to ride on a different island must ship their motorcycle via cargo service in advance. The cost and scheduling process typically takes several days to a week. Each Hawaiian island has a completely self-contained road network.",
    },
    {
      question: "What documents do I need to bring to the Hawaii DMV for my motorcycle knowledge test?",
      answer:
        "For the motorcycle knowledge test in Hawaii, you typically need to bring a valid form of ID (driver's license or ID card), proof of residency (if not already on file), and the application fee. If you are under 18, you may also need a parent or guardian's signature on a minor consent form. Check the Hawaii DMV website before your visit to confirm current requirements, as they can change.",
    },
    {
      question: "What restrictions apply to a Hawaii motorcycle instruction permit?",
      answer:
        "A Hawaii motorcycle instruction permit holder may NOT carry passengers and may NOT ride at night. These restrictions apply until you pass the skills test (or have it waived via the MSF BRC) and receive your full motorcycle endorsement. Under Act 66 (December 2025), the MSF Basic RiderCourse must be completed before you can even apply for the instruction permit. The written knowledge test is always required regardless of BRC completion. Children under 7 years old are prohibited from riding as motorcycle passengers under any circumstances (HRS § 291-11).",
    },
    {
      question: "Is a motorcycle endorsement required in Hawaii, or is it a separate license?",
      answer:
        "Hawaii adds a motorcycle endorsement (marked 'M') to your existing driver's license — it is not a separate license document. To obtain the endorsement you must: (1) complete the MSF Basic RiderCourse before applying for a permit (Act 66, December 2025); (2) pass the written motorcycle knowledge test (25 questions, 80% to pass); and (3) either pass the riding skills test at a county site or have it waived via the BRC. Lane splitting is illegal in Hawaii (HRS § 291C-153(c)), so riding between lanes of traffic is never permitted.",
    },
    {
      question: "What types of motorcycles require a motorcycle endorsement in Hawaii?",
      answer:
        "A motorcycle endorsement is required for motorcycles (engine displacement above 50cc or capable of speeds above 30 mph). Mopeds — defined in Hawaii as motorized cycles with 50cc or less and a maximum speed of 30 mph — do not require a motorcycle endorsement but do require a driver's license. Under Act 222 (June 2025), ALL moped operators regardless of age must wear a helmet. Children under 7 are prohibited from riding as passengers on any motorcycle (HRS § 291-11). Motorcycles may not be operated in bicycle lanes (HRS § 291C-153).",
    },
    {
      question: "Does completing the MSF Basic RiderCourse waive the skills test in Hawaii?",
      answer:
        "Yes — completing the MSF Basic RiderCourse (BRC) may waive the riding skills test in Hawaii. However, under Act 66 (December 2025), the BRC must be completed BEFORE applying for the motorcycle permit (not just before the skills test). The written knowledge test is ALWAYS required and cannot be waived by the BRC or any other course. The BRC waives the skills test only — every applicant must still pass the 25-question written knowledge test at a county licensing office. This sequence — BRC first, then permit application, then knowledge test — is Hawaii-specific and differs from most states.",
    },
  ],
  relatedTests: [
    { label: "Hawaii DMV Practice Test", href: "/hawaii-dmv-practice-test" },
    { label: "Hawaii CDL Practice Test", href: "/hawaii-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function HawaiiMotorcyclePracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
