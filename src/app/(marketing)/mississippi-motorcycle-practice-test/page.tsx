import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Mississippi Motorcycle Practice Test 2025 – Free DPS Endorsement Prep",
  description: "Study for the Mississippi DPS motorcycle endorsement exam with state-specific questions on Mississippi's all-ages helmet law (§ 63-7-64), cell phone rules, extreme summer heat riding hazards, and Mississippi River bridge crossings.",
  alternates: { canonical: "https://caredmvprep.com/mississippi-motorcycle-practice-test" },
  openGraph: { url: "https://caredmvprep.com/mississippi-motorcycle-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Mississippi",
  stateAbbr: "MS",
  testLabel: "Motorcycle Practice Test",
  slug: "mississippi-motorcycle-practice-test",
  headline: "Mississippi Motorcycle Endorsement Practice Test 2025",
  intro: "Mississippi requires a motorcycle endorsement on your DPS driver's license. The endorsement knowledge exam tests Mississippi-specific motorcycle laws: Mississippi's all-ages helmet requirement (Miss. Code Ann. § 63-7-64), cell phone laws, DUI laws, extreme summer heat riding hazards, and specific considerations for Mississippi River bridge crossings on US-90 and I-20.",
  basedOn: "Mississippi DPS Motorcycle Operator Manual",
  about: [
    "Mississippi requires a motorcycle endorsement (Class R) added to your driver's license through the Department of Public Safety (MDPS), Driver Service Bureau. Mississippi's motorcycle helmet law (Miss. Code Ann. § 63-7-64) is an all-ages requirement — ALL riders and passengers must wear a FMVSS No. 218-compliant helmet regardless of age. There is a narrow exception: riders 18 or older participating in a parade at 30 mph or less. Mississippi's DUI law applies equally to motorcycle operators, with a 0.08% BAC threshold for adults and a 0.02% threshold for riders under 21. Mississippi's cell phone law (Miss. Code Ann. § 63-33-1) bans texting and social media while riding; handheld phone calls are not banned, but hands-free options are strongly recommended for safety.",
    "Mississippi's summer climate creates specific hazards for motorcycle riders that are tested on the DPS endorsement exam. Ambient temperatures exceeding 100°F combined with high humidity create dehydration risk, heat exhaustion, and reduced concentration during extended rides. Road surface temperatures reaching 150°F soften asphalt at intersections and on roads with heavy truck traffic — a condition known as 'rutting' or 'surface deformation' that creates unpredictable handling for motorcycle tires. Mississippi River crossings on bridges such as US-90 at Bay St. Louis–Ocean Springs (now replaced by the newer Biloxi Bay Bridge) and I-20 at Vicksburg require motorcyclists to be aware of bridge expansion joints, metal grating sections, and crosswinds that can occur over open river spans.",
  ],
  sampleQuestions: [
    {
      question: "Mississippi's motorcycle helmet law (Miss. Code Ann. § 63-7-64) requires helmets for which riders?",
      options: ["All riders and passengers of all ages", "Riders under age 21 only", "Riders under age 18 only", "Helmets are optional for all Mississippi motorcyclists"],
      correctIndex: 0,
      explanation: "Mississippi's motorcycle helmet law (Miss. Code Ann. § 63-7-64) is an all-ages requirement — ALL riders and passengers must wear a FMVSS No. 218-compliant helmet when operating or riding on a motorcycle, regardless of age. This makes Mississippi one of the stricter helmet-law states. There is one narrow exception: riders 18 or older participating in a parade at 30 mph or less may ride without a helmet. Outside of that specific circumstance, the all-ages requirement applies."
    },
    {
      question: "Under Mississippi's cell phone law (Miss. Code Ann. § 63-33-1), which activity is BANNED for motorcycle operators while riding?",
      options: ["Making or receiving a handheld phone call", "Texting or posting to social media", "Using a Bluetooth headset paired to a phone", "Using voice-to-text navigation"],
      correctIndex: 1,
      explanation: "Miss. Code Ann. § 63-33-1 bans texting and posting to social media while operating any motor vehicle, including motorcycles. The $100 fine applies equally to motorcyclists. However, Mississippi does NOT ban handheld phone calls for motorcyclists — only texting and social media use are prohibited. Hands-free options like Bluetooth helmet speakers are permitted, and voice-to-text navigation is also allowed since it avoids manual input while riding."
    },
    {
      question: "A Mississippi motorcyclist is riding on an asphalt road during a summer afternoon when temperatures reach 105°F. What road surface hazard should the rider watch for at intersections?",
      options: ["Black ice from shaded pavement", "Surface deformation (rutting) in the asphalt, caused by heat softening the road material under heavy traffic", "Painted lane markings that become slippery in heat", "Gravel accumulation from adjacent construction"],
      correctIndex: 1,
      explanation: "When Mississippi summer temperatures rise above 100°F, road surface temperatures can reach 150°F. Asphalt contains bitumen (tar), which softens significantly at these temperatures. Under repeated heavy vehicle loads, softened asphalt deforms into ruts — longitudinal channels in the pavement surface. For motorcycle riders, these ruts can grab the front tire and cause steering instability, particularly when changing lanes or making turns at intersections. Riders should cross ruts at an angle where possible and maintain firm grip on handlebars when traversing deformed pavement."
    },
    {
      question: "What is the DUI BAC limit for a motorcycle operator under 21 in Mississippi?",
      options: ["0.08%", "0.04%", "0.02%", "0.00%"],
      correctIndex: 2,
      explanation: "Mississippi sets a 0.02% BAC threshold for motorcycle operators (and all drivers) under age 21. For practical purposes, this is a near-zero-tolerance standard — any meaningful alcohol intake before riding can trigger a DUI violation for a rider under 21. Mississippi uses DUI (Driving Under the Influence) terminology. A DUI on a motorcycle carries the same legal consequences as a DUI in a car, including license suspension, fines, and potential imprisonment for repeat offenses."
    },
    {
      question: "When crossing a Mississippi River bridge on a motorcycle, such as the I-20 bridge at Vicksburg, what specific hazards should a rider anticipate?",
      options: ["Reduced speed limits that are lower than rural roads", "Bridge expansion joints, possible metal grating sections, and crosswinds over the open river span", "Stop signs at the center of the bridge span", "Lane closures for river traffic"],
      correctIndex: 1,
      explanation: "Long river bridges like the I-20 crossing at Vicksburg present several motorcycle-specific hazards. Bridge expansion joints create abrupt surface changes that can startle riders or cause momentary loss of traction. Some bridge sections use open metal grating for the road surface, which can cause motorcycle tires to track unpredictably (especially in wet conditions). Open bridge spans funnel wind, and crosswinds above the Mississippi River can be significantly stronger and more variable than wind on adjacent land roads. Riders should maintain a firm grip, reduce speed if conditions are gusty, and avoid sudden steering corrections."
    },
    {
      question: "A Mississippi motorcycle rider is experiencing symptoms of heat exhaustion during a summer ride including dizziness and heavy sweating. What is the immediate correct action?",
      options: ["Continue riding at reduced speed to create airflow and cool down", "Stop riding immediately, move to shade, drink water, and rest until symptoms resolve", "Accelerate to highway speed to maximize cooling airflow", "Remove riding jacket and helmet to allow faster cooling"],
      correctIndex: 1,
      explanation: "Heat exhaustion is a medical emergency in progress. A motorcyclist experiencing dizziness, heavy sweating, nausea, or weakness must stop riding immediately — these symptoms impair judgment and reaction time, creating a crash risk independent of the heat illness itself. The rider should move to shade (a gas station canopy, rest area shelter, or tree shade), remove the helmet to facilitate cooling, drink cool water slowly, and rest until fully recovered. If symptoms worsen or heat stroke symptoms appear (hot dry skin, confusion, loss of consciousness), call 911. Mississippi's combination of extreme heat and high humidity makes heat illness a genuine motorcycle riding hazard."
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
      question: "Does Mississippi require helmets for all motorcycle riders?",
      answer: "Yes — Mississippi's motorcycle helmet law (Miss. Code Ann. § 63-7-64) requires ALL riders and passengers to wear a FMVSS No. 218-compliant (DOT-labeled) helmet, regardless of age. This is an all-ages requirement, making Mississippi one of the stricter helmet-law states. The only exception is a narrow one: riders 18 or older who are participating in a parade while traveling at 30 mph or less may legally ride without a helmet. Outside of that specific circumstance, no age exemption exists — a 22-year-old rider is just as legally required to wear a helmet as a 17-year-old."
    },
    {
      question: "What does Mississippi's cell phone law say about motorcyclists?",
      answer: "Miss. Code Ann. § 63-33-1 bans texting and posting to social media while riding — the $100 fine applies to motorcyclists just as it does to other drivers. However, Mississippi does NOT ban handheld phone calls for motorcyclists. A rider may legally hold their phone and make or receive a call while riding in Mississippi. Compliant and safer options include Bluetooth helmet speakers paired to a phone, tank-bag mounted devices with voice control, or pulling over to use a device. The texting/social media ban applies on all Mississippi public roads regardless of speed limit."
    },
    {
      question: "What are the unique summer heat hazards for Mississippi motorcycle riders?",
      answer: "Mississippi summers are characterized by ambient temperatures above 100°F and high relative humidity — a combination that is more dangerous for motorcycle riders than dry-heat states because high humidity inhibits sweat evaporation and accelerates heat exhaustion. Road surfaces reach 150°F, softening asphalt and creating rutting at intersections and in heavy truck lanes. Dehydration impairs judgment and reaction time before the rider feels thirsty. Gear choices become difficult: full riding gear provides crash protection but traps heat, while reducing gear lowers protection. Mesh riding jackets with armor provide a compromise. Riders should plan summer routes around early morning or evening hours when temperatures are lowest."
    },
    {
      question: "What is the motorcycle endorsement process in Mississippi?",
      answer: "To obtain a motorcycle endorsement (Class R) in Mississippi, applicants must hold a valid Mississippi driver's license and pass the DPS motorcycle knowledge exam and a motorcycle skills road test. Alternatively, completion of an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse waives the road test requirement (the knowledge test is still required). The knowledge exam tests Mississippi-specific laws (all-ages helmet requirement § 63-7-64, cell phone texting/social media ban § 63-33-1, DUI thresholds, riding techniques, and hazard identification). The endorsement is then added to the existing Mississippi driver's license."
    },
    {
      question: "What DUI penalties apply specifically to motorcycle operators in Mississippi?",
      answer: "Mississippi DUI law applies equally to motorcycle operators and car drivers. A first adult DUI offense (0.08% BAC or higher) carries fines of $250 to $1,000, potential imprisonment up to 48 hours, and license suspension up to 90 days. Completion of the Mississippi Alcohol Safety Education Program (MASEP) is required for reinstatement. For riders under 21, the threshold is 0.02% BAC. Repeat DUI offenses carry progressively harsher penalties including longer suspensions, higher fines, mandatory ignition interlock requirements (which do not apply to motorcycles, so the suspension typically cannot be served with a motorcycle hardship license), and potential felony charges for third or subsequent convictions."
    },
    {
      question: "What documents do I need to bring to the Mississippi DPS Driver Service Bureau for my motorcycle knowledge test?",
      answer:
        "For the motorcycle knowledge test in Mississippi, you typically need to bring a valid form of ID (driver's license or ID card), proof of residency (if not already on file), and the application fee. If you are under 18, you may also need a parent or guardian's signature on a minor consent form. Check the Mississippi Driver Service Bureau website (driverservicebureau.dps.ms.gov) before your visit to confirm current requirements, as they can change.",
    },
    {
      question: "How long is the Mississippi motorcycle permit valid, and can I ride alone with it?",
      answer:
        "Motorcycle learner's permit validity varies by state, typically ranging from 90 days to 2 years. With a permit in Mississippi, you are generally restricted from riding at night, on highways, or carrying passengers. These restrictions ensure new riders gain experience safely before obtaining a full license. Check the Mississippi Driver Service Bureau website (driverservicebureau.dps.ms.gov) for specific permit restrictions and validity periods.",
    },
    {
      question: "Is a motorcycle endorsement required in Mississippi, or is it a separate license?",
      answer:
        "The structure varies by state. Some states, including Mississippi, add a motorcycle endorsement (typically marked as 'M') to your existing driver's license, while others issue a separate motorcycle license or permit. Either way, you must pass a motorcycle knowledge test and, in most cases, a riding skills test or approved safety course before you can legally operate a motorcycle on public roads.",
    },
    {
      question: "What types of motorcycles require a motorcycle license in Mississippi?",
      answer:
        "In Mississippi, a motorcycle endorsement (Class R) is generally required to operate any two-wheeled, three-wheeled, or motor-driven cycle above a certain engine displacement or speed threshold. This includes standard motorcycles, sport bikes, cruisers, and most scooters above 50cc. Mopeds (typically under 50cc, max speed 30 mph) may have different requirements — check the Mississippi Driver Service Bureau's specific definitions at driverservicebureau.dps.ms.gov. Electric motorcycles and e-bikes are subject to separate regulations based on their maximum speed and motor output.",
    },
    {
      question: "Does completing a motorcycle safety course waive the skills test in Mississippi?",
      answer:
        "Yes — completing an approved MSF (Motorcycle Safety Foundation) Basic RiderCourse in Mississippi waives the motorcycle skills (road) test only. The knowledge test is still required and must be passed at a Mississippi DPS Driver Service Bureau office. The MSF course demonstrates riding ability and replaces the hands-on skills evaluation, but it does not exempt you from the written knowledge examination. Contact the Mississippi Driver Service Bureau (driverservicebureau.dps.ms.gov) to confirm current approved courses.",
    },
  ],
  relatedTests: [
    { label: "Mississippi DMV Practice Test", href: "/mississippi-dmv-practice-test" },
    { label: "Mississippi CDL Practice Test", href: "/mississippi-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function MississippiMotorcyclePage() {
  return <PracticeTestPage {...data} />;
}
