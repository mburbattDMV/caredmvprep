import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "New Mexico DMV Practice Test 2025 – Free MVD Knowledge Exam Prep",
  description: "Prepare for the New Mexico MVD knowledge test with state-specific questions covering haboob dust storm protocol, arroyo flash flooding, DWI laws, texting ban, Border Patrol checkpoints, high-altitude driving, and MVD under Taxation & Revenue.",
  alternates: { canonical: "https://caredmvprep.com/new-mexico-dmv-practice-test" },
  openGraph: { url: "https://caredmvprep.com/new-mexico-dmv-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "New Mexico",
  stateAbbr: "NM",
  testLabel: "DMV Practice Test",
  slug: "new-mexico-dmv-practice-test",
  headline: "New Mexico MVD Practice Test 2025",
  intro: "The New Mexico Motor Vehicle Division (MVD) — part of the Taxation & Revenue Department — administers the knowledge exam for driver's licenses. This practice test covers New Mexico-specific laws including haboob (dust storm) protocol, arroyo flash flooding, DWI statutes, New Mexico's texting ban (NMSA § 66-7-374), Border Patrol checkpoint procedures, high-altitude driving conditions, and the unusual administrative structure of New Mexico's MVD.",
  basedOn: "New Mexico Taxation & Revenue Motor Vehicle Division Driver's Manual",
  keyRules: [
    { icon: "🌫️", rule: "Haboob Protocol – Dust Storms", detail: "New Mexico's Chihuahuan Desert generates haboobs — massive dust storms that reduce visibility to zero in seconds. The correct response is to pull completely OFF the road (not just to the shoulder), turn OFF all lights (not hazard lights — other drivers follow lights into dust and may hit your parked vehicle), set the parking brake, and wait. Turning lights off is counterintuitive but prevents your vehicle from being a target." },
    { icon: "🌊", rule: "Arroyo Flash Flooding", detail: "New Mexico's arroyos (dry desert streambeds) cross roads throughout the state and can fill with fast-moving water in minutes during monsoon season (July–September). 'Turn Around, Don't Drown' — never attempt to drive through water in an arroyo crossing even if the road appears clear. Water can be deeper and faster than it looks, and roads through arroyos can wash out." },
    { icon: "🍺", rule: "DWI – Not DUI", detail: "New Mexico uses DWI (Driving While Intoxicated) terminology — not DUI. The legal BAC limit is 0.08% for adults. Drivers under 21 face a 0.02% BAC threshold. New Mexico's DWI law is governed by the Implied Consent Act and the Motor Vehicle Code. Understanding DWI (not DUI) terminology is tested on the NM exam." },
    { icon: "📱", rule: "Texting While Driving – Banned (NMSA § 66-7-374)", detail: "New Mexico law (NMSA § 66-7-374) bans texting while driving for all drivers. Private passenger-vehicle drivers may not send or read text messages while operating a vehicle. Commercial motor vehicle (CMV) operators face a full handheld device ban under federal rules. Note: New Mexico does not have a general handheld call ban for private drivers — the statute specifically targets texting and electronic messaging." },
    { icon: "🛂", rule: "Border Patrol Checkpoints", detail: "All vehicles on US-70, US-54, US-180, and other highways near the US-Mexico border pass through Border Patrol interior checkpoints. Drivers must stop and may be questioned. New Mexico drivers should expect checkpoint stops on these routes. Refusing to stop or attempting to evade a checkpoint is a federal crime." },
    { icon: "⛰️", rule: "High-Altitude Driving", detail: "Taos (7,000 ft), Santa Fe (7,200 ft), and Albuquerque (5,300 ft) are among the highest-elevation cities in the U.S. High altitude affects engine performance (reduced power), braking distance (air is less dense, requiring longer distances), and tire conditions. Altitude also means rapid weather changes, including afternoon thunderstorms in summer." },
    { icon: "🪪", rule: "Permit Age: 15", detail: "New Mexico allows residents to apply for a learner's permit at age 15. Permit holders must pass the MVD knowledge exam and vision test. The permit requires a licensed supervising driver who is age 21 or older AND has at least 3 years of driving experience in the front seat. New Mexico's GDL program progresses through permit and provisional license stages." },
    { icon: "🏛️", rule: "MVD Under Taxation & Revenue", detail: "New Mexico's Motor Vehicle Division (MVD) is administered under the New Mexico Taxation & Revenue Department — an unusual arrangement where the tax collection agency also handles driver licensing. This is different from most states where DMV/MVD is a standalone department. MVD offices may be separate from Taxation & Revenue offices." },
  ],
  about: [
    "New Mexico's Motor Vehicle Division (MVD) operates under the Taxation & Revenue Department — an unusual administrative structure that makes New Mexico similar to Missouri (which uses the Department of Revenue) in placing driver licensing under the tax collection agency. The minimum permit age is 15 years old. New Mexico law (NMSA § 66-7-374) bans texting while driving for all drivers — note that New Mexico does not have a general handheld call ban for private passenger-vehicle drivers; the prohibition applies specifically to texting and electronic messaging. New Mexico uses DWI (Driving While Intoxicated) terminology rather than DUI, with a 0.08% adult threshold and 0.02% for drivers under 21.",
    "The most unique and life-critical driving knowledge tested on the New Mexico MVD exam involves haboob (dust storm) protocol. New Mexico's Chihuahuan Desert and the Rio Grande valley generate severe dust storms — haboobs — that are driven by powerful thunderstorm outflows and can reduce visibility to absolute zero in seconds. The correct response is the New Mexico/Arizona rule: pull completely off the road surface (not just to the shoulder), turn OFF all lights including hazard lights (counterintuitively, because other drivers lost in the dust may steer toward lights and drive into parked vehicles), set the parking brake, and wait for the storm to pass. This pull-off-and-lights-off protocol is one of the most tested and most counterintuitive safety rules in New Mexico's driving curriculum.",
    "New Mexico's monsoon season (July through September) brings arroyo flooding — a hazard specific to the desert Southwest. Arroyos are normally dry desert streambeds that cross roads throughout New Mexico, particularly in rural areas and in communities between Albuquerque and El Paso. During monsoon thunderstorms, arroyos can fill with fast-moving, debris-laden water within minutes of a storm upstream — even if the sky is clear at the crossing. The depth and current of arroyo water is impossible to assess visually, and roads through arroyos can wash out below the waterline. 'Turn Around, Don't Drown' is not just a slogan in New Mexico — it is the primary response to any flooded arroyo crossing. The MVD exam tests arroyo flooding awareness because it is the leading cause of flood-related driving deaths in New Mexico.",
  ],
  sampleQuestions: [
    {
      question: "A haboob (dust storm) is approaching your vehicle on I-40 near Albuquerque and visibility is dropping rapidly. What is the correct New Mexico dust storm protocol?",
      options: ["Pull to the right shoulder with hazard lights on and wait for the dust to pass", "Reduce speed to 25 mph and proceed slowly with all lights on", "Pull completely off the road, turn OFF all lights (including hazard lights), set the parking brake, and wait", "Speed up to exit the dust storm before visibility drops to zero"],
      correctIndex: 2,
      explanation: "New Mexico's haboob protocol requires pulling completely off the road surface — beyond the shoulder and onto a turnout or adjacent safe area if possible — turning OFF all lights (including hazard lights), setting the parking brake, and waiting for the storm to pass. Turning lights off is counterintuitive but is correct: drivers lost in the dust storm tend to steer toward visible lights, which means your parked vehicle with lights on becomes a target. Multiple fatal multi-vehicle crashes in New Mexico and Arizona have involved drivers plowing into parked vehicles whose hazard lights attracted them in zero-visibility dust. This pull-off-and-lights-off protocol is directly and frequently tested on the New Mexico MVD exam."
    },
    {
      question: "During New Mexico's monsoon season (July–September), you approach an arroyo road crossing and see brown water moving across the road surface. The water appears to be only a few inches deep. What should you do?",
      options: ["Proceed slowly — a few inches of water is safe to cross in most vehicles", "Turn around — 'Turn Around, Don't Drown' applies because arroyo water depth and current are impossible to assess visually, and the road itself may have washed out below the waterline", "Test the depth by walking through first, then drive through if safe", "Only proceed if another vehicle has already crossed ahead of you"],
      correctIndex: 1,
      explanation: "Arroyo flooding in New Mexico is extremely deceptive. What appears to be a few inches of water on the road surface may conceal a road that has washed out below the waterline — the vehicle would drop into the void. Even if the road is intact, arroyo current is far stronger than it appears, and as little as 12 inches of moving water can sweep a standard passenger car off the road surface. Arroyo water is also debris-laden, which can obscure the actual road surface and current speed. The 'Turn Around, Don't Drown' protocol is the correct response to any arroyo flooding. New Mexico's MVD exam tests this rule because arroyo flooding is the leading cause of flood-related driving fatalities in the state."
    },
    {
      question: "New Mexico uses a specific term for impaired driving. What is the correct term and statute framework?",
      options: ["DUI — under the New Mexico Motor Vehicle Code Section 66-8-102", "OUI — under the New Mexico Implied Consent Act", "DWI — Driving While Intoxicated, under the New Mexico Motor Vehicle Code and Implied Consent Act", "DWAI — under the New Mexico Traffic Safety Act"],
      correctIndex: 2,
      explanation: "New Mexico uses DWI (Driving While Intoxicated) terminology — not DUI or OUI. New Mexico's DWI law falls under the Motor Vehicle Code and is enforced through the Implied Consent Act, which requires drivers to submit to chemical testing when lawfully arrested for DWI. The adult BAC threshold is 0.08%; the under-21 threshold is 0.02%. New Mexico's use of DWI rather than DUI is directly tested on the MVD exam because understanding the correct state-specific terminology is part of understanding New Mexico traffic law."
    },
    {
      question: "Under New Mexico law (NMSA § 66-7-374), which of the following is prohibited for all drivers while operating a vehicle?",
      options: ["Talking on a handheld cell phone", "Using a GPS device mounted on the dashboard", "Sending or reading text messages on a mobile device", "Listening to music through a Bluetooth speaker"],
      correctIndex: 2,
      explanation: "New Mexico law (NMSA § 66-7-374) prohibits sending or reading text messages while driving. The law applies to all drivers on New Mexico public roads. Importantly, New Mexico does NOT have a general ban on handheld phone calls for private passenger-vehicle drivers — the statute specifically targets texting and electronic messaging. Commercial motor vehicle (CMV) operators are subject to a broader federal handheld device ban. Hands-free GPS and audio devices are legal for private drivers."
    },
    {
      question: "What is the administrative structure of New Mexico's Motor Vehicle Division (MVD)?",
      options: ["The MVD is a standalone state agency reporting directly to the Governor", "The MVD is part of the New Mexico Department of Transportation", "The MVD operates under the New Mexico Taxation & Revenue Department", "The MVD is jointly operated by the New Mexico State Police and the Department of Public Safety"],
      correctIndex: 2,
      explanation: "New Mexico's Motor Vehicle Division (MVD) is administered under the Taxation & Revenue Department. This is an unusual structure — in most states, driver licensing and vehicle registration are handled by a standalone DMV or a transportation/public safety department. New Mexico places these functions under its tax collection agency, similar to Missouri's use of the Department of Revenue for driver licensing. This means MVD offices may be co-located with or separate from state tax offices, and MVD's administrative appeals process goes through Taxation & Revenue Department procedures."
    },
    {
      question: "A New Mexico driver on US-70 east of Las Cruces encounters a Border Patrol interior checkpoint. What must the driver do?",
      options: ["Border Patrol checkpoints are optional — drivers may proceed without stopping", "Stop at the checkpoint, comply with officer instructions, and answer questions as required", "Only commercial vehicles must stop at Border Patrol interior checkpoints", "Slow to 15 mph and proceed through the checkpoint without stopping unless directed otherwise"],
      correctIndex: 1,
      explanation: "Border Patrol interior checkpoints on New Mexico highways (US-70, US-54, US-180, and others near the US-Mexico border) require all vehicles — including passenger cars with U.S. license plates — to stop. Drivers must comply with Border Patrol officer instructions and may be questioned about citizenship and travel purpose. These checkpoints are authorized under federal law and have been upheld by the U.S. Supreme Court. Refusing to stop or attempting to evade a checkpoint is a federal crime. New Mexico MVD drivers' manual covers checkpoint procedures because many New Mexico residents routinely encounter these checkpoints on common travel routes."
    },
    {
      question: "Driving in Santa Fe, New Mexico (elevation 7,200 feet) compared to sea level, what physical change affects braking distance?",
      options: ["Braking distance is shorter at altitude because thinner air reduces vehicle weight", "Braking distance is longer at altitude because the less-dense air provides less aerodynamic drag, so the vehicle loses speed more slowly when braking", "Altitude has no effect on braking distance", "Braking distance is shorter because tires grip better in cool mountain air"],
      correctIndex: 1,
      explanation: "At high altitude, the air is less dense than at sea level. This reduced air density means there is less aerodynamic drag acting on the vehicle — the vehicle loses speed more slowly during braking than at sea level under otherwise identical conditions. Combined with the fact that engine power is also reduced at altitude (less oxygen for combustion), vehicles at high-altitude cities like Santa Fe (7,200 ft) and Taos (7,000 ft) may require slightly longer braking distances. This effect is minor in normal passenger vehicles at typical speeds, but becomes more noticeable for heavy vehicles and in emergency braking situations."
    },
    {
      question: "What is the minimum age to apply for a learner's permit in New Mexico?",
      options: ["14 years old", "14½ years old", "15 years old", "15½ years old"],
      correctIndex: 2,
      explanation: "New Mexico allows residents to apply for a learner's permit at age 15. The applicant must pass the MVD knowledge exam and vision test. A parent or guardian must provide consent for minor applicants. Permit holders must drive with a licensed adult supervising driver who is at least 21 years old AND has at least 3 years of driving experience, seated in the front passenger seat. New Mexico's GDL program progresses through permit and provisional stages with specific restrictions before full license eligibility."
    },
    {
      question: "New Mexico's monsoon season runs from July through September. Why are afternoon thunderstorms a specific driving hazard during this period?",
      options: ["Monsoon storms only affect the southern part of New Mexico near the Mexican border", "Monsoon thunderstorms develop rapidly over New Mexico mountains and generate arroyo flooding, haboob dust storms, flash flooding on roads, and reduced visibility — all within short notice periods", "Monsoon thunderstorms affect only unpaved roads and do not create paved highway hazards", "Monsoon rain improves road traction by washing away summer road dust"],
      correctIndex: 1,
      explanation: "New Mexico's monsoon season (July–September) brings daily afternoon thunderstorms that develop rapidly over the state's mountains and desert terrain. These storms generate multiple concurrent driving hazards: flash flooding in arroyos that cross roads throughout the state; haboob dust storms driven by thunderstorm outflows that reduce highway visibility to zero; localized flash flooding on roadways from drainage exceeding culvert capacity; hail; and lightning strikes. The storms typically develop in the early to mid-afternoon and can reach full intensity within 30–45 minutes of first visible cloud formation. New Mexico drivers should check weather forecasts before afternoon travel in summer and be alert to rapidly developing storm conditions."
    },
    {
      question: "What is the BAC threshold for New Mexico drivers under 21 under the state's DWI law?",
      options: ["0.08%", "0.04%", "0.02%", "0.00%"],
      correctIndex: 2,
      explanation: "New Mexico's DWI law sets a 0.02% BAC threshold for drivers under 21 — a near-zero-tolerance standard. Any meaningful alcohol consumption before driving can constitute a DWI violation for a driver under 21 in New Mexico. New Mexico uses DWI terminology. The Implied Consent Act requires submission to chemical testing when lawfully arrested for DWI. Under-21 DWI consequences include license suspension, fines, and mandatory completion of a DWI offender education program. Under-21 DWI violations can affect participation in New Mexico's GDL program."
    },
  ],
  faqs: [
    {
      question: "What is a haboob and what is the correct New Mexico protocol when one approaches?",
      answer: "A haboob is a massive wall of dust driven by powerful outflows from thunderstorms — the leading edge of the storm's downdraft picks up loose desert soil and carries it forward at speeds of 30–60 mph, creating a wall of dust that can be 5,000 feet high and completely opaque. Haboobs are common in New Mexico's Chihuahuan Desert and the Rio Grande valley from late spring through early fall. When a haboob approaches while you are driving, the New Mexico MVD protocol is: pull completely off the road surface (onto a turnout or completely clear of the travel lanes), turn OFF all lights — including hazard lights — set the parking brake, and wait. Turning lights off is counterintuitive but essential: drivers lost in the dust may steer toward visible lights, causing them to drive into parked vehicles. Multiple fatal crashes have resulted from drivers parking with hazard lights on during dust storms and being struck by passing vehicles following the lights."
    },
    {
      question: "Why does New Mexico use DWI instead of DUI?",
      answer: "New Mexico's impaired driving offense is called DWI — Driving While Intoxicated — under the New Mexico Motor Vehicle Code and Implied Consent Act. This is a terminology difference from the DUI (Driving Under the Influence) term used by most states. The substantive rules are similar: the BAC threshold is 0.08% for adults 21 and older and 0.02% for drivers under 21. The Implied Consent Act requires submission to chemical testing when lawfully arrested for DWI. Refusal to submit triggers automatic license revocation. The MVD knowledge exam uses DWI terminology throughout, and understanding the correct term matters for answering exam questions accurately. New Mexico also has 'aggravated DWI' provisions for BAC of 0.16% or higher or for certain behaviors (e.g., refusing ignition interlock)."
    },
    {
      question: "What does New Mexico's texting-while-driving law prohibit?",
      answer: "New Mexico law (NMSA § 66-7-374) prohibits sending and reading text messages while driving for all drivers on New Mexico public roads. An important nuance: New Mexico does NOT have a general handheld call ban for private passenger-vehicle drivers. Unlike some states, holding a phone to make a voice call is not independently prohibited for private drivers under state law. However, commercial motor vehicle (CMV) operators are subject to a full federal handheld device ban that prohibits holding a phone for any reason while driving. The practical advice remains the same — hands-free technology is always safer and may be legally required for CMV operators. The MVD knowledge exam tests awareness of New Mexico's texting prohibition."
    },
    {
      question: "What are arroyos and why are they dangerous for New Mexico drivers?",
      answer: "Arroyos are naturally occurring dry desert streambeds — channels carved through desert terrain by seasonal and historical water flow. They typically have no water in them, and many roads cross arroyos with simple paved crossings or small culverts that handle normal (non-monsoon) drainage. During New Mexico's monsoon season, intense localized thunderstorms upstream can fill an arroyo with fast-moving, debris-laden water within minutes — even when the sky at the road crossing is clear. The approaching water may make a roaring sound as it comes, but drivers often don't hear it until the water is already on the road. As little as 12 inches of moving water can sweep a car off the road; 2 feet can carry away most trucks. The road under the water may have washed out, creating a hidden void. Never drive through water in an arroyo crossing — always turn around."
    },
    {
      question: "What Border Patrol checkpoints should New Mexico drivers expect?",
      answer: "New Mexico has multiple Border Patrol interior checkpoints on highways running roughly parallel to or away from the US-Mexico border, typically within 60–100 miles of the border. Major checkpoint locations include US-70 east of Las Cruces (a heavily traveled route between Las Cruces and El Paso–area communities), US-54 north of Orogrande, US-180 north of Silver City, and I-10 east of Las Cruces in some configurations. All vehicles — including passenger cars and vehicles with U.S. license plates — must stop at these checkpoints. Drivers may be questioned about citizenship and travel destination. Agricultural secondary inspection may also occur at some checkpoints. Checkpoint locations occasionally change based on operational needs. These checkpoints are authorized federal law enforcement operations and compliance is legally required."
    },
    {
      question: "How does high altitude affect driving in New Mexico cities like Santa Fe and Taos?",
      answer: "Santa Fe (7,200 feet), Taos (7,000 feet), and Albuquerque (5,300 feet) are among the highest-elevation cities in the United States. High altitude affects driving in several ways: engine power is reduced (thinner air means less oxygen for combustion), which affects acceleration and ability to maintain speed on grades; aerodynamic drag is slightly reduced, which marginally increases braking distance; rapid afternoon thunderstorms are common in summer as warming air rises above the mountains; and tire pressure is affected by temperature swings between cool mountain mornings and warm afternoons. Altitude sickness (rare in drivers, but possible for visitors from sea level arriving at 7,000+ feet) can affect concentration and reaction time. High-altitude roads in northern New Mexico also present winter ice and snow hazards at lower temperatures than expected by sea-level residents."
    },
    {
      question: "What is the New Mexico MVD and how is it different from a typical state DMV?",
      answer: "New Mexico's Motor Vehicle Division (MVD) is administered under the Taxation & Revenue Department — not a standalone transportation or public safety agency. This is unusual: in most states, driver licensing and vehicle registration are handled by a DMV, BMV, or similar agency. In New Mexico, these functions fall under the same government department that handles income tax, gross receipts tax, and vehicle excise tax. The practical implication for drivers is that MVD offices may share space with or be distinct from Taxation & Revenue offices, and that administrative appeals of MVD decisions go through Taxation & Revenue Department processes. For the MVD knowledge exam, the key facts are the agency name (Motor Vehicle Division, not DMV) and its position under Taxation & Revenue."
    },
    {
      question: "What is the New Mexico MVD knowledge test structure?",
      answer: "The New Mexico MVD knowledge exam is administered at MVD offices across New Mexico and covers New Mexico-specific traffic laws (DWI, texting prohibition, haboob protocol, arroyo flooding, Border Patrol checkpoint procedures, high-altitude driving), road signs, and safe driving practices as outlined in the New Mexico Driver's Manual. The minimum permit age is 15 years old. Applicants who fail may retake the exam after a waiting period. Contact the MVD directly at (888) 683-4636 or visit mvd.newmexico.gov for the most current information on question count and passing threshold."
    },
    {
      question: "What are the high-altitude and monsoon driving conditions that New Mexico's MVD exam covers?",
      answer: "The New Mexico MVD exam tests awareness of conditions specific to the state's geography and climate. High-altitude driving topics include: reduced engine power at elevation, slightly longer braking distances due to reduced aerodynamic drag, rapid afternoon thunderstorm development over mountains, and temperature swings requiring adaptive speed management. Monsoon season (July–September) topics include: arroyo flash flooding protocol (Turn Around, Don't Drown), haboob (dust storm) response protocol (pull completely off the road, turn off ALL lights including hazard lights, set parking brake and wait), increased road debris and runoff from monsoon precipitation, and reduced visibility from heavy rain in mountain thunderstorms. These topics are tested because they represent genuine and frequent driving hazards in New Mexico that drivers from other states or new residents may not be aware of."
    },
  ],
  relatedTests: [
    { label: "New Mexico Motorcycle Practice Test", href: "/new-mexico-motorcycle-practice-test" },
    { label: "New Mexico CDL Practice Test", href: "/new-mexico-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function NewMexicoDMVPage() {
  return <PracticeTestPage {...data} />;
}
