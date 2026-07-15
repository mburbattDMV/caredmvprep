import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Nebraska Motorcycle Practice Test 2025 – Free DMV Endorsement Prep",
  description: "Study for the Nebraska DMV motorcycle endorsement exam with state-specific questions on helmet requirements for under-21 riders, Nebraska's two-tier cell phone law for riders, hail emergency protocol for riders, Nebraska Sandhills remote riding hazards, and DUI thresholds.",
  alternates: { canonical: "https://caredmvprep.com/nebraska-motorcycle-practice-test" },
  openGraph: { url: "https://caredmvprep.com/nebraska-motorcycle-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Nebraska",
  stateAbbr: "NE",
  testLabel: "Motorcycle Practice Test",
  slug: "nebraska-motorcycle-practice-test",
  headline: "Nebraska Motorcycle Endorsement Practice Test 2025",
  intro: "Nebraska requires a motorcycle endorsement (Class M) on your driver's license through the Nebraska DMV. Nebraska's helmet law requires helmets for riders under age 21 only — adults 21 and older may waive the helmet requirement by completing a qualifying MSF course. The endorsement exam tests Nebraska-specific rules including Nebraska's cell phone law for riders, DUI thresholds, hail emergency protocol for motorcyclists, Sandhills remote riding hazards, and open range livestock awareness.",
  basedOn: "Nebraska DMV Motorcycle Operator Manual",
  about: [
    "Nebraska requires a motorcycle endorsement (Class M) on the driver's license, obtained by passing the Nebraska DMV motorcycle knowledge exam and skills road test. Alternatively, completing an approved Motorcycle Safety Foundation (MSF) course waives BOTH the knowledge test and the skills road test (within 24 months of completion). Nebraska's helmet law requires helmets for operators and passengers under age 21. Riders and passengers 21 and older may waive the helmet requirement by completing a qualifying MSF course — riders licensed before May 1, 2024 may use the 3-hour MSF eCourse; riders licensed on or after May 1, 2024 must complete the full hands-on MSF Basic RiderCourse (BRC). Eye protection is required for ALL riders regardless of age. Nebraska's DUI law applies equally to motorcycle operators (0.08% BAC for adults, 0.02% for riders under 21). Nebraska's cell phone law for adult riders is a texting-only ban (secondary enforcement, NRS 60-6,179.01); hands-free calling while riding is legal for adults. Teen riders on a Learner's Permit or Provisional Operator's Permit face a complete ban on all interactive wireless devices, including hands-free.",
    "Nebraska presents unique hazards for motorcycle riders that are tested on the endorsement exam. The most dangerous weather threat unique to Nebraska is hail — Nebraska ranks among the states with the highest annual hail event totals, and motorcycle riders caught in a hail storm without shelter face serious injury risk from hailstones at speed. Hailstones that are quarter-sized (1 inch diameter) or larger strike an exposed rider with significant force, and at highway speed the impact energy multiplies. Nebraska riders must monitor weather forecasts and be prepared to immediately seek shelter when hail is imminent. The Nebraska Sandhills — accessible from US-83 and county roads — present remote riding conditions where breakdowns leave riders without cell service or nearby assistance for hours. Open range livestock in western Nebraska is an additional hazard for motorcyclists on rural routes.",
  ],
  sampleQuestions: [
    {
      question: "Nebraska's motorcycle helmet law requires helmets for which riders?",
      options: ["All riders regardless of age", "Riders under age 21 only", "Riders under age 18 only", "Helmets are optional for all Nebraska motorcycle riders"],
      correctIndex: 1,
      explanation: "Nebraska requires motorcycle helmets for riders and passengers who are under age 21. Riders and passengers who are 21 or older are not legally required to wear a helmet under Nebraska law. This partial helmet law is consistent with the approach of many states that set the helmet requirement at the age of legal adulthood (21 for alcohol-related laws). The Nebraska DMV motorcycle manual recommends helmet use for all riders regardless of the legal requirement, noting the significant reduction in head injury severity and fatality risk that DOT-approved helmets provide."
    },
    {
      question: "Under Nebraska's cell phone law, an adult motorcycle rider is holding a phone to their ear to make a voice call while riding on a Nebraska highway. What does Nebraska law say about this?",
      options: ["It is a primary offense — officers can stop the rider solely for this violation", "It is a secondary offense — only citable if already stopped for another violation, and hands-free calling is legal for adult riders", "It is prohibited only if the rider is in a school zone", "All phone use including voice calls is completely banned for all motorcycle riders regardless of age"],
      correctIndex: 1,
      explanation: "Nebraska's adult cell phone restriction (NRS 60-6,179.01) is a texting-only ban. Holding a phone to make a voice call is not prohibited for adult riders under Nebraska law — hands-free and handheld voice calling remain legal for adults. The texting ban is also secondary enforcement, meaning police cannot stop a rider solely for a cell phone violation. What IS banned for adults is reading, typing, or sending written messages while riding. Teen riders on a Learner's Permit or Provisional Operator's Permit face a stricter complete ban on all interactive wireless devices, including hands-free, under NRS 60-4,120.01."
    },
    {
      question: "A Nebraska motorcycle rider is riding on I-80 when a severe thunderstorm warning is issued with a hail forecast. What is the safest immediate action?",
      options: ["Increase speed to exit the storm area before hail begins", "Immediately seek covered shelter — a gas station canopy, overpass with solid walls, or parking structure — before hail begins", "Pull to the right shoulder and lie under the motorcycle for protection", "Put on rain gear and continue at reduced speed"],
      correctIndex: 1,
      explanation: "For a motorcycle rider, hail is an immediate emergency — exposed riders struck by quarter-inch or larger hailstones at highway speed risk serious injury. The only effective protection is solid shelter before hail begins. A gas station canopy, parking structure, or solid-wall overpass provides protection. Standard rain gear offers no meaningful protection against hail impact. The motorcycle itself provides no shelter — lying under it still exposes the rider to hailstones. Nebraska riders should check weather forecasts before riding and identify potential shelter points on their route in advance during storm season (April through September)."
    },
    {
      question: "A motorcycle rider is riding US-83 through the Nebraska Sandhills with 30 miles of fuel remaining and no gas station in sight. According to Nebraska DMV guidance for Sandhills riding, what should the rider do?",
      options: ["Continue at highway speed — services are typically within 15 miles on US-83", "Reduce speed to conserve fuel and proceed to the next service point, noting that the next station may be 80+ miles away — a fuel planning failure in the Sandhills requires waiting for help", "Turn around and backtrack to the last fuel stop", "Flag down the next passing vehicle for assistance"],
      correctIndex: 1,
      explanation: "The Nebraska Sandhills is one of the most remote riding environments in the continental United States. On some sections of US-83 and adjacent Sandhills roads, gas stations may be 80–100 miles apart. A rider with 30 miles of range remaining in remote territory faces a serious situation. Reducing speed reduces fuel consumption and extends range. The best practice is to have never reached this situation — riders entering the Sandhills should start with a full tank and be aware of the exact location of the next fuel stop. Running out of fuel in the Sandhills means waiting potentially hours for another vehicle to assist, with no cell service available in many areas."
    },
    {
      question: "In western Nebraska's open range territory, a motorcycle rider encounters a cattle herd crossing a rural highway at night. What is the most dangerous characteristic of cattle on a dark road for a motorcyclist?",
      options: ["Cattle make no noise and approach the road silently", "Cattle, especially black or dark-colored breeds, are nearly invisible in darkness — a rider may not detect the herd until already within stopping distance", "Cattle have reflective ear tags that may confuse the rider about road alignment", "Cattle always travel with a rancher who controls their movement"],
      correctIndex: 1,
      explanation: "Open range cattle on rural Nebraska roads at night are one of the most serious hazards for motorcycle riders. Dark-colored cattle (Black Angus are common in Nebraska) are virtually invisible in darkness until they are directly in the motorcycle's headlight beam — often at a distance far shorter than stopping distance at rural road speeds. A motorcycle-cattle collision is typically fatal or causes severe injury. Nebraska motorcyclists on rural western roads must reduce speed significantly at night, use high beams when legally appropriate, and treat every rural road margin as a potential location for unseen livestock."
    },
    {
      question: "What is the DUI BAC limit for a Nebraska motorcycle rider who is 19 years old?",
      options: ["0.08%", "0.04%", "0.02%", "0.00%"],
      correctIndex: 2,
      explanation: "Nebraska's DUI law sets a 0.02% BAC threshold for motorcycle operators (and all drivers) who are under 21. For practical purposes, 0.02% is a near-zero-tolerance standard — any meaningful alcohol consumption before riding can trigger a DUI violation for a rider under 21. Nebraska uses DUI terminology. Consequences for underage DUI on a motorcycle include license suspension (affecting the motorcycle endorsement), fines, and mandatory alcohol assessment and education programs. The Nebraska Implied Consent law requires submission to chemical testing when lawfully arrested for DUI."
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
      question: "Does Nebraska require helmets for adult motorcycle riders?",
      answer: "Nebraska requires helmets only for motorcycle operators and passengers who are under age 21. Riders and passengers 21 and older are not legally required to wear a helmet under Nebraska's motorcycle helmet law. However, the Nebraska DMV motorcycle manual strongly recommends helmet use for all riders regardless of age, noting that DOT-approved helmets reduce the risk of fatal head injury by approximately 37% and reduce the risk of brain injury significantly. Riders who choose not to wear a helmet should understand that many insurance policies may limit or exclude coverage for head injuries sustained without a helmet."
    },
    {
      question: "Why is hail the most unique severe weather threat for Nebraska motorcyclists?",
      answer: "Nebraska ranks among the states with the highest average annual hail event totals, due to the convergence of warm, moist Gulf of Mexico air with cool, dry Rocky Mountain air over the Great Plains. For motorcycle riders specifically, hail is uniquely dangerous because there is no protective shell between the rider and falling hailstones. Quarter-sized hailstones (1 inch) striking at 60 mph highway speed carry the equivalent impact energy of thrown projectiles and can cause head, neck, and arm injuries. Hail storms typically develop rapidly and can reach baseball-sized (2.75 inch) hailstones in severe supercell thunderstorms. Nebraska riders must watch weather forecasts carefully during riding season (April–September) and plan routes near potential shelter points."
    },
    {
      question: "What is the Nebraska motorcycle endorsement process?",
      answer: "Nebraska motorcycle endorsement (Class M) is obtained by holding a valid Nebraska driver's license and passing both the DMV motorcycle knowledge exam and a motorcycle skills road test. Alternatively, completion of an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse within the past 24 months waives BOTH the knowledge test and the skills road test — making the MSF course the most efficient path for most new riders. The knowledge exam covers Nebraska motorcycle-specific laws (helmet law for under-21, DUI thresholds, Nebraska's cell phone law for riders, open range hazards, eye protection requirement, lane splitting prohibition, and hail/tornado protocols), motorcycle operation techniques, and hazard identification. The endorsement is added to the existing license. Nebraska strongly recommends the MSF course for all new riders as structured safety training regardless of any test waiver benefit."
    },
    {
      question: "What are the remote riding risks in the Nebraska Sandhills?",
      answer: "The Nebraska Sandhills cover approximately 19,000 square miles of grass-stabilized sand dunes in north-central Nebraska, accessible from US-83 north of North Platte and various county roads. For motorcycle riders, the primary risks are fuel depletion (gas stations may be 80–100 miles apart), cell phone outage (coverage is sparse or nonexistent throughout much of the region), and weather isolation (winter blizzards can strand riders without access to shelter for extended periods). Spring sandhill riding also brings loose sand in road margins after wind events, which creates traction hazards for motorcycle tires. Riders planning Sandhills routes should carry extra fuel in an approved container, emergency supplies, and inform someone of their planned route and estimated arrival time."
    },
    {
      question: "Does Nebraska's cell phone law apply to motorcycle riders, and what does it say?",
      answer: "Yes, Nebraska's cell phone law applies to motorcycle riders, but it is narrower than some riders expect. Adult riders (18 and older) face only a texting ban under NRS 60-6,179.01 — reading, typing, or sending written messages while riding is prohibited, but hands-free calling, voice-activated navigation, and Bluetooth helmet speakers remain legal for adults. The adult texting ban is secondary enforcement, meaning an officer cannot stop a rider solely for a cell phone violation; it can only be cited if the rider is already stopped for another reason. Teen riders on a Learner's Permit (LPD) or Provisional Operator's Permit (POP) face a stricter, completely different rule under NRS 60-4,120.01: a total ban on ALL interactive wireless devices, including hands-free earpieces and voice-activated calls. For practical safety, even when legal, using a hand-held device while riding reduces motorcycle control and reaction capability significantly."
    },
    {
      question: "What documents do I need to bring to the Nebraska DMV for my motorcycle knowledge test?",
      answer: "To take the motorcycle knowledge test at the Nebraska DMV, you must hold a valid Nebraska driver's license (Class O or higher). Bring your current license, the test application fee, and any course completion certificates if you completed an approved MSF course. If you are under 18, parental or guardian consent is required. Applicants who have completed an approved MSF Basic RiderCourse within the past 24 months should bring the course completion card, which waives both the knowledge test and the skills road test — contact your local Nebraska DMV office to confirm current fee and documentation requirements.",
    },
    {
      question: "Is lane splitting legal for motorcycle riders in Nebraska?",
      answer: "No. Lane splitting — riding a motorcycle between lanes of traffic or between adjacent rows of vehicles — is explicitly illegal in Nebraska under NRS 60-6,308. Nebraska does not have a lane filtering exception (unlike a small number of states such as California, Utah, and Montana). Motorcycle riders in Nebraska must stay within a single lane and may not pass between lanes of slow or stopped traffic. Two motorcycles may ride side-by-side in a single lane by mutual agreement, but neither may cross into the space of an adjacent lane to pass other vehicles.",
    },
    {
      question: "Does completing a motorcycle safety course waive the skills test in Nebraska?",
      answer: "Yes — and Nebraska's MSF course waiver is more comprehensive than most states. Completing an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse within the past 24 months waives BOTH the DMV motorcycle knowledge test AND the skills road test, not just the skills test. This means an adult who completes the MSF BRC from an approved Nebraska provider can obtain the Class M endorsement without taking either DMV-administered test. Nebraska DMV strongly recommends the MSF course for all new riders as structured safety training regardless of any test waiver benefit. Contact the Nebraska DMV or visit dmv.nebraska.gov/dl/motorcycle-license-class-m to confirm currently approved providers.",
    },
  ],
  relatedTests: [
    { label: "Nebraska DMV Practice Test", href: "/nebraska-dmv-practice-test" },
    { label: "Nebraska CDL Practice Test", href: "/nebraska-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function NebraskaMotorcyclePage() {
  return <PracticeTestPage {...data} />;
}
