import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "New Mexico Motorcycle Practice Test 2025 – Free MVD Endorsement Prep",
  description: "Study for the New Mexico MVD motorcycle endorsement exam with state-specific questions on helmet requirements for under-18 riders, haboob protocol for motorcyclists, arroyo flash flooding, DWI laws, high-altitude mountain pass riding, and HB 11 hands-free rules.",
  alternates: { canonical: "https://caredmvprep.com/new-mexico-motorcycle-practice-test" },
  openGraph: { url: "https://caredmvprep.com/new-mexico-motorcycle-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "New Mexico",
  stateAbbr: "NM",
  testLabel: "Motorcycle Practice Test",
  slug: "new-mexico-motorcycle-practice-test",
  headline: "New Mexico Motorcycle Endorsement Practice Test 2025",
  intro: "New Mexico requires a motorcycle endorsement on your MVD driver's license. New Mexico's helmet law requires helmets only for riders under age 18 — adults 18 and older may legally ride without a helmet. The endorsement exam tests haboob (dust storm) protocol for motorcyclists (pull off the road and get away from the motorcycle), arroyo flash flooding hazards, DWI laws under the New Mexico Motor Vehicle Code, the texting ban (NMSA § 66-7-374), and high-altitude mountain pass riding conditions.",
  basedOn: "New Mexico Taxation & Revenue MVD Motorcycle Operator Manual",
  about: [
    "New Mexico's motorcycle helmet law requires helmets for riders and passengers under age 18 only — adults 18 and older are not legally required to wear a helmet when riding in New Mexico. This places New Mexico among the states with a partial adult helmet exemption. New Mexico uses DWI (Driving While Intoxicated) terminology for impaired riding — the 0.08% BAC adult threshold applies, with 0.02% for riders under 21. New Mexico law (NMSA § 66-7-374) prohibits texting while riding for all motorcycle operators. Note: New Mexico does not have a general handheld call ban for private vehicle operators — the prohibition is specific to texting and electronic messaging. Hands-free communication systems (Bluetooth helmet speakers) are the recommended alternative for motorcycle communication needs.",
    "New Mexico presents motorcycle hazards that are unique among the contiguous states. Haboobs — massive dust storms driven by thunderstorm outflows — can reduce visibility to zero on I-40, I-25, and New Mexico's desert highways in seconds. For motorcyclists, the haboob protocol has an additional step beyond the car protocol: pull completely off the road AND move away from the motorcycle and the roadway to avoid being struck by vehicles that may be following lights or drifting in the zero-visibility dust. Arroyo flash flooding is a second critical hazard — motorcycles attempting to cross water-covered arroyo roads are at extreme risk because the moving water can immediately topple the motorcycle and sweep the rider downstream. High-altitude mountain passes in northern New Mexico — including the roads to Taos, Santa Fe, and through the Sangre de Cristo Mountains — present summer afternoon thunderstorm hazards and significant temperature drops that require layered gear for riders.",
  ],
  sampleQuestions: [
    {
      question: "New Mexico's motorcycle helmet law requires helmets for which riders?",
      options: ["All riders regardless of age", "Riders under age 21 only", "Riders and passengers under age 18 only", "Helmets are optional for all New Mexico motorcycle riders"],
      correctIndex: 2,
      explanation: "New Mexico requires motorcycle helmets for riders and passengers who are under age 18. Adults who are 18 or older are not legally required to wear a helmet under New Mexico law. This partial helmet law is similar to Nebraska's — the threshold is age 18 rather than the more common 21. The New Mexico MVD motorcycle manual strongly recommends helmet use for all riders despite the adult legal exemption, noting that DOT-approved helmets reduce head injury severity and fatality rates substantially."
    },
    {
      question: "A motorcyclist on I-40 in New Mexico sees a haboob wall approaching from ahead. Visibility is dropping rapidly. What is the correct motorcycle-specific response?",
      options: ["Pull to the right shoulder with hazard lights on and stay on the motorcycle", "Pull completely off the road, turn off all lights, and also move away from the motorcycle — get as far from the roadway as safely possible", "Accelerate to the nearest exit before visibility drops to zero", "Continue at 25 mph with hazard lights on"],
      correctIndex: 1,
      explanation: "The motorcycle-specific haboob protocol adds an important step to the standard protocol: after pulling completely off the road and turning off all lights (so your vehicle doesn't attract other drivers lost in the dust), a motorcycle rider should also move away from the motorcycle. A motorcyclist who stays on or near the bike risks being struck by a vehicle that drifts off the road in the zero-visibility dust. Getting well clear of the road and the motorcycle — lying flat in a depression or behind a substantial barrier — provides the most protection. This is a direct extension of the standard haboob protocol that is specifically adapted for motorcycle riders and tested on the NM endorsement exam."
    },
    {
      question: "During New Mexico's monsoon season, a motorcyclist approaches an arroyo crossing where water is flowing across the road. The water appears to be moving quickly but looks only ankle-deep. What must the rider do?",
      options: ["Proceed slowly with both feet down for stability if the water is ankle-deep or less", "Turn around immediately — moving water in an arroyo can immediately topple a motorcycle, and the current can sweep the rider downstream even in shallow water", "Dismount and walk through to test depth, then ride through if safe", "Wait 5 minutes and proceed if the water has not deepened"],
      correctIndex: 1,
      explanation: "For motorcycle riders, arroyo flooding is even more dangerous than for car drivers. A motorcycle's two-wheel configuration is inherently unstable in moving water — even relatively shallow (8–12 inch) fast-moving water can immediately topple the motorcycle, trapping or pinning the rider under the bike in the current. The current in an arroyo is much stronger than it appears visually. Additionally, the road surface under the water may have washed out, creating a sudden drop that would cause both the motorcycle and rider to be submerged. Never attempt to cross arroyo water on a motorcycle — turn around without exception."
    },
    {
      question: "What is the DWI BAC limit for a New Mexico motorcycle operator who is 22 years old?",
      options: ["0.10%", "0.08%", "0.04%", "0.02%"],
      correctIndex: 1,
      explanation: "New Mexico's DWI (Driving While Intoxicated) law sets a 0.08% BAC threshold for motorcycle operators (and all motor vehicle operators) who are 21 or older. New Mexico uses DWI rather than DUI terminology. DWI applies equally to motorcycle riders — operating a motorcycle while intoxicated is both illegal and uniquely dangerous because motorcycle control requires fine motor skills and balance that are significantly impaired by alcohol even at low BAC levels below 0.08%. The under-21 threshold is 0.02%."
    },
    {
      question: "A New Mexico motorcyclist is planning a summer afternoon ride from Albuquerque to Taos (approximately 1.5–2 hours). What should the rider prepare for specifically due to Taos's elevation (7,000 feet) and summer monsoon season?",
      options: ["The ride to Taos requires a special mountain motorcycle endorsement", "The rider should bring layered gear for temperature drops at altitude, monitor weather forecasts for afternoon thunderstorm development, and have a plan for shelter if a haboob or flash flood blocks the route", "Summer afternoon rides to Taos are prohibited due to monsoon restrictions", "Altitude does not affect motorcycle performance or rider comfort below 8,000 feet"],
      correctIndex: 1,
      explanation: "The Albuquerque-to-Taos route climbs from 5,300 feet to 7,000 feet through high-desert terrain and mountain passes. Summer afternoons in New Mexico's monsoon season (July–September) bring rapid thunderstorm development over the Sangre de Cristo Mountains, with potential for haboobs on lower desert sections and flash flooding in arroyos along the route. Temperature at 7,000 feet can be 15–20°F cooler than Albuquerque, requiring layered gear even in summer. Riders should check weather forecasts, plan for potential shelter needs, carry rain gear, and be prepared to turn back if weather deteriorates. The route near Taos also has high-altitude mountain passes where afternoon conditions can change rapidly."
    },
    {
      question: "Under New Mexico law (NMSA § 66-7-374), a motorcycle rider is prohibited from doing which of the following while operating their motorcycle?",
      options: ["Using a GPS unit mounted on the handlebars", "Sending or reading a text message on a mobile device", "Talking on a phone through a Bluetooth helmet headset", "Listening to music through earbuds or helmet speakers"],
      correctIndex: 1,
      explanation: "New Mexico law (NMSA § 66-7-374) prohibits sending or reading text messages while operating a motor vehicle, including motorcycles. New Mexico does not have a general handheld call ban for private vehicle operators — the statute specifically targets texting and electronic messaging. For motorcycle riders, using hands-free communication (Bluetooth helmet headsets) is both legal and strongly recommended for safety, as taking a hand off the handlebars significantly reduces control of the motorcycle."
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
      question: "Does New Mexico require helmets for all motorcycle riders?",
      answer: "No. New Mexico requires motorcycle helmets only for riders and passengers who are under age 18. Adults 18 and older are not legally required to wear a helmet when riding in New Mexico. This partial helmet law makes New Mexico similar to Nebraska in having an age-18 threshold rather than the 21-threshold used by some other partial-helmet states. The New Mexico MVD motorcycle manual strongly recommends helmet use for all riders regardless of legal requirements, noting that DOT-approved helmets significantly reduce the risk of fatal head injury. Riders choosing not to wear a helmet should also consider that unhelmeted crashes may affect insurance coverage for head injury treatment."
    },
    {
      question: "What is the haboob protocol specifically for motorcycle riders in New Mexico?",
      answer: "When a haboob (dust storm) approaches while a motorcyclist is riding in New Mexico, the protocol is more urgent and more specific than for car drivers. The motorcycle-specific steps are: (1) Pull completely off the road — off the shoulder and as far from traffic lanes as possible; (2) Turn off all lights on the motorcycle, including hazard lights — this prevents other vehicles lost in the dust from steering toward the bike and striking it; (3) Move away from the motorcycle and the road as far as safely possible — motorcyclists who stay near the bike can be struck by vehicles drifting off the road in zero-visibility conditions; (4) If possible, get behind or below a substantial barrier (a ditch, embankment, or building); (5) Wait until the dust passes and visibility returns before resuming riding. Zero-visibility dust conditions can persist for 15–30 minutes or longer."
    },
    {
      question: "What DWI rules apply to New Mexico motorcycle operators?",
      answer: "New Mexico's DWI (Driving While Intoxicated) law applies equally to motorcycle operators. The BAC threshold is 0.08% for riders 21 and older and 0.02% for riders under 21. New Mexico uses DWI rather than DUI terminology. The Implied Consent Act requires motorcycle operators who are lawfully arrested for DWI to submit to chemical testing — refusal triggers automatic license revocation. DWI on a motorcycle is particularly dangerous because motorcycle balance requires fine motor coordination that alcohol impairs at relatively low BAC levels — a rider at 0.05% BAC may feel relatively normal but have meaningfully impaired balance and reaction time. DWI penalties include license revocation, fines, mandatory DWI offender education program, and possible jail time for repeat offenses."
    },
    {
      question: "What are the high-altitude riding conditions in northern New Mexico?",
      answer: "Northern New Mexico's mountains and high-altitude communities create specific motorcycle riding conditions. Santa Fe sits at 7,200 feet, Taos at 7,000 feet, and the passes connecting these communities reach 8,000–10,000 feet. Key high-altitude riding considerations: (1) Temperature drops 3–5°F for every 1,000 feet of elevation gain — what is warm in Albuquerque can be cold in Taos, requiring layered gear; (2) Afternoon thunderstorms in monsoon season (July–September) develop rapidly over mountain ridges and can bring lightning, hail, and flash flooding with little warning; (3) Engine performance is slightly reduced at high altitude due to thinner air, which can affect acceleration on steep grades; (4) Tire pressure changes with temperature swings between morning valley departure and afternoon mountain riding; (5) Mountain passes may have sharp curves with reduced sight distances and late-season (or early-season) ice or snow."
    },
    {
      question: "What is the New Mexico motorcycle endorsement process?",
      answer: "New Mexico motorcycle endorsement is added to an existing MVD driver's license by passing the motorcycle knowledge exam and a motorcycle skills road test. New Mexico MVD endorsement types differ by engine size: Endorsement W (motorcycles 100cc and over, minimum age 15), Endorsement Y (50–100cc, minimum age 13), and Endorsement Z (under 50cc, minimum age 13). Completing an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse waives the skills road test — and is also mandatory for riders under 18. The knowledge exam tests New Mexico-specific motorcycle laws (helmet law for under-18, DWI, texting prohibition, haboob protocol, arroyo flooding hazards, high-altitude riding considerations), motorcycle operation techniques, and hazard identification. The MVD (under the Taxation & Revenue Department) administers the endorsement process at MVD offices throughout New Mexico."
    },
    {
      question: "What documents do I need to bring to the New Mexico MVD for my motorcycle knowledge test?",
      answer:
        "For the motorcycle knowledge test in New Mexico, you typically need to bring a valid form of ID (driver's license or ID card), proof of residency (if not already on file), and the application fee. If you are under 18, you may also need a parent or guardian's signature on a minor consent form. Riders under 18 must also complete an approved Motorcycle Safety Foundation (MSF) course before receiving a motorcycle endorsement. Contact the New Mexico MVD at (888) 683-4636 or visit mvd.newmexico.gov to confirm current requirements.",
    },
    {
      question: "Can I carry a passenger with a New Mexico motorcycle learner's permit?",
      answer:
        "No. New Mexico motorcycle permit holders are prohibited from carrying passengers under NMSA § 66-5-8. This restriction applies until you receive your full motorcycle endorsement. Permit holders are also generally restricted from riding at night and on highways. Riders under 18 must complete an MSF Basic RiderCourse before full endorsement. Contact the New Mexico MVD at (888) 683-4636 or visit mvd.newmexico.gov for specific permit restrictions and validity periods.",
    },
    {
      question: "Is a motorcycle endorsement required in New Mexico, or is it a separate license?",
      answer:
        "New Mexico adds a motorcycle endorsement to your existing MVD driver's license rather than issuing a separate motorcycle-only license. The endorsement type depends on engine size: Endorsement W (100cc and over), Endorsement Y (50–100cc), or Endorsement Z (under 50cc). You must pass a motorcycle knowledge test and either pass the MVD skills road test or complete an approved MSF Basic RiderCourse (which waives the skills test). The minimum age is 15 for Endorsement W and 13 for Endorsements Y and Z.",
    },
    {
      question: "What types of motorcycles require a motorcycle endorsement in New Mexico?",
      answer:
        "New Mexico uses a tiered endorsement system based on engine displacement. Endorsement W is required for motorcycles with engines of 100cc or larger (minimum age 15). Endorsement Y covers motorcycles with engines between 50cc and 100cc (minimum age 13). Endorsement Z covers motorcycles under 50cc, including most mopeds and small scooters (minimum age 13). Electric motorcycles and e-bikes are categorized based on their maximum speed and motor output — contact the New Mexico MVD at (888) 683-4636 for current definitions.",
    },
    {
      question: "Does completing a motorcycle safety course waive the skills test in New Mexico?",
      answer:
        "Yes. Completing an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse waives the MVD motorcycle skills (road) test in New Mexico. This is confirmed by the MVD. Additionally, riders under 18 are required to complete the MSF Basic RiderCourse before they can receive a motorcycle endorsement. Whether the MSF course also waives the written knowledge test is not confirmed from official MVD sources — contact the MVD at (888) 683-4636 to confirm current policy.",
    },
  ],
  relatedTests: [
    { label: "New Mexico DMV Practice Test", href: "/new-mexico-dmv-practice-test" },
    { label: "New Mexico CDL Practice Test", href: "/new-mexico-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function NewMexicoMotorcyclePage() {
  return <PracticeTestPage {...data} />;
}
