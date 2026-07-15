import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Nebraska DMV Practice Test 2025 – Free DMV Knowledge Exam Prep",
  description: "Prepare for the Nebraska DMV knowledge test with 25 state-specific questions covering LB 918 hands-free law, tornado/blizzard/hail triple weather threat, I-80 corridor rules, DUI thresholds, open range livestock hazards, and Nebraska Sandhills driving conditions. Free 2025 practice test.",
  alternates: { canonical: "https://caredmvprep.com/nebraska-dmv-practice-test" },
  openGraph: { url: "https://caredmvprep.com/nebraska-dmv-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Nebraska",
  stateAbbr: "NE",
  testLabel: "DMV Practice Test",
  slug: "nebraska-dmv-practice-test",
  headline: "Nebraska DMV Practice Test 2025",
  intro: "The Nebraska Department of Motor Vehicles administers a 25-question knowledge exam. You must answer 20 questions correctly (80%) to pass. This practice test covers Nebraska-specific laws including Nebraska's two-tier cell phone law (texting ban for adults; complete device ban for teen permit holders), Nebraska's triple weather threat (tornadoes, blizzards, and hail), DUI statutes, 75 mph I-80 operations, open range livestock rules, and driving in the remote Nebraska Sandhills.",
  basedOn: "Nebraska Department of Motor Vehicles Driver's Manual",
  keyRules: [
    { icon: "📱", rule: "Nebraska Two-Tier Cell Phone Law", detail: "Nebraska uses a two-tier cell phone law. Adult drivers face a texting-only ban (NRS 60-6,179.01): reading, typing, or sending written messages is prohibited; hands-free calling remains legal. The adult ban is secondary enforcement — police cannot stop a vehicle solely for a texting violation. Teen drivers on a Learner's Permit (LPD) or Provisional Operator's Permit (POP) face a COMPLETE ban on all interactive wireless devices, including hands-free earpieces and voice-activated calls (NRS 60-4,120.01). Adult texting fines are $200 (first offense), $300 (second), and $500 (third or subsequent)." },
    { icon: "🌪️", rule: "Triple Weather Threat", detail: "Nebraska sits at the intersection of all three major severe weather threats in the continental U.S.: Tornado Alley extends through eastern Nebraska (peak season May–June), Alberta Clipper blizzards bring extreme snow from Canada in winter, and Nebraska averages among the highest hail days per year in the nation — with hailstones capable of shattering windshields and injuring exposed occupants." },
    { icon: "🏎️", rule: "75 MPH on I-80 / I-76", detail: "Nebraska's rural interstate speed limit on I-80 (which crosses Nebraska east-west from Omaha to Cheyenne) and I-76 is 75 mph. This major transcontinental freight and travel corridor crosses Nebraska's flat, open terrain where wind, blowing snow, and fog are common hazards that can make the posted 75 mph limit dangerous in adverse conditions." },
    { icon: "🍺", rule: "DUI – 0.08% / 0.02% Under-21", detail: "Nebraska uses DUI (Driving Under the Influence) terminology. The legal BAC limit is 0.08% for adults 21 and older. Drivers under 21 face a 0.02% BAC threshold. Nebraska's Implied Consent law requires submission to chemical testing when lawfully arrested for DUI." },
    { icon: "🚗", rule: "Permit Age: 15", detail: "Nebraska allows residents to apply for a learner's permit at age 15. The permit requires a licensed supervising driver age 21 or older in the front seat. Nebraska's GDL system progresses through permit, provisional license, and full license stages with specific hour and restriction requirements." },
    { icon: "🐄", rule: "Open Range – Western Nebraska", detail: "Western Nebraska operates under open range livestock laws, meaning ranchers are not required to fence cattle off public roads. Drivers who hit livestock on open range roads bear legal responsibility. Cattle and horses on rural Nebraska roads are most common at dawn and dusk when visibility is low." },
    { icon: "⛈️", rule: "Hail Emergency Protocol", detail: "Nebraska averages among the most hail events per year of any state. When hail is imminent or occurring, drivers should pull to a protected area (gas station canopy, overpass, or parking structure) immediately. On open I-80, pull to the shoulder and angle the vehicle so hail strikes the front (windshield) rather than the side glass and roof. Do not park under trees, which can be struck by lightning or lose limbs in the storm." },
    { icon: "🏜️", rule: "Sandhills Remote Driving", detail: "The Nebraska Sandhills along US-83 and surrounding roads are among the most remote regions in the continental United States. Drivers may travel hundreds of miles between services. Always check fuel levels before entering the Sandhills, carry emergency supplies (water, blankets, jumper cables), and inform someone of your planned route if traveling in winter." },
  ],
  about: [
    "The Nebraska Department of Motor Vehicles administers the state's driver licensing program. The knowledge exam consists of 25 questions and requires at least 20 correct answers (80%) to pass. The minimum permit age in Nebraska is 15 years old. Nebraska uses a two-tier cell phone law: adult drivers are prohibited from reading, typing, or sending text messages while driving (NRS 60-6,179.01, secondary enforcement, fines of $200/$300/$500 for repeat offenses), but hands-free calling remains legal for adults. Teen drivers on a Learner's Permit or Provisional Operator's Permit face a stricter complete ban on all interactive wireless devices, including hands-free earpieces and voice-activated calling (NRS 60-4,120.01). The Nebraska DMV knowledge exam tests awareness of both tiers.",
    "Nebraska's geography places it at the crossroads of three of the most dangerous weather phenomena in the continental United States. Tornado Alley extends through eastern Nebraska, with peak tornado season from May through June — drivers who encounter a tornado while on the road must understand correct shelter procedures. Alberta Clipper winter storms blow south from Canada with little warning, bringing extreme snowfall, blowing snow, and near-zero visibility on I-80 and US-30. Hail is the third major threat: Nebraska ranks among states with the highest average annual hail days, and large hailstones (inch-diameter or larger) can shatter windshields, dent vehicles, and injure exposed passengers. Knowing the correct response to each of these weather threats is tested on the Nebraska DMV knowledge exam.",
    "Nebraska's I-80 corridor is one of the most important transcontinental freight and travel routes in the United States, running from Omaha through Lincoln, Grand Island, North Platte, and into Wyoming. The posted speed limit is 75 mph. Nebraska's flat, open terrain means wind shear, blowing snow in winter, and dust from agricultural fields can rapidly reduce visibility on I-80 to near zero. The Nebraska Sandhills along US-83 north of North Platte represent one of the most remote driving environments in the lower 48 states — hundreds of miles between services — and drivers in this region must plan accordingly for fuel, water, and emergency preparedness.",
  ],
  sampleQuestions: [
    {
      question: "Under Nebraska's two-tier cell phone law, what device activity is specifically banned for ADULT drivers?",
      options: ["All cell phone use, including hands-free calling", "Reading, typing, or sending written text messages (texting only)", "Voice-activated navigation and phone calls", "Any wireless device use within 500 feet of a school zone"],
      correctIndex: 1,
      explanation: "Nebraska's adult cell phone law (NRS 60-6,179.01) is a texting-only ban. Adult drivers may not read, type, or send written text messages while driving, but hands-free calling, voice-activated navigation, and Bluetooth remain legal. The ban is secondary enforcement — officers cannot stop a vehicle solely for texting; a citation can only be added if the vehicle is stopped for another violation. Fines escalate: $200 (first offense), $300 (second), $500 (third and beyond). This contrasts with teen permit and POP holders, who face a complete ban on ALL interactive wireless devices, including hands-free."
    },
    {
      question: "A Nebraska driver on I-80 near Grand Island sees a tornado forming approximately 2 miles away and moving toward the highway. What is the correct action?",
      options: ["Stay in the vehicle and drive away from the tornado at highway speed", "Pull under the nearest overpass for protection from flying debris", "If no shelter is available, exit the vehicle, move away from it, lie flat in a low ditch, and cover your head", "Park on the shoulder with hazard lights on and wait for the tornado to pass"],
      correctIndex: 2,
      explanation: "When a tornado approaches and no shelter (building, gas station, underpass with solid walls) is immediately available, Nebraska drivers should exit the vehicle and seek the lowest available ground — a roadside ditch or depression. Lie flat, face down, and cover your head with hands and arms. Overpasses are dangerous shelter because wind speeds accelerate under the bridge span, and flying debris is channeled along the overpass corridor. The vehicle itself provides minimal protection against tornado-force winds and can be rolled or hurled, adding danger. The Nebraska DMV manual addresses tornado protocol because I-80 and other highways run through active tornado corridors."
    },
    {
      question: "Nebraska averages among the highest annual hail event totals in the nation. When large hail begins while you are driving on I-80 with no immediate shelter available, what is the recommended action?",
      options: ["Accelerate to exit the hail storm area as quickly as possible", "Pull to the shoulder, stop, and angle the vehicle so hail strikes the windshield (front) rather than side windows, then stay inside", "Pull under a tree for cover from the hail", "Maintain speed — vehicles are designed to withstand hail damage"],
      correctIndex: 1,
      explanation: "When hail begins and no covered shelter (gas station canopy, parking structure, overpass) is immediately reachable, pull safely off the road and stop. Angling the vehicle so the front faces the direction the hail is coming from is important because windshields are made of laminated safety glass and are much more resistant to hail than tempered side and rear windows. Do not park under trees, which can be struck by lightning or drop branches in high winds accompanying hail storms. Remain in the vehicle for protection from the hail itself, which can cause serious injury to exposed individuals."
    },
    {
      question: "What is the posted speed limit on Nebraska's rural sections of I-80?",
      options: ["65 mph", "70 mph", "75 mph", "80 mph"],
      correctIndex: 2,
      explanation: "Nebraska's rural interstate speed limit on I-80 is 75 mph. I-80 is the primary transcontinental corridor through Nebraska, running from Omaha to the Wyoming border through flat, open terrain. The 75 mph limit requires Nebraska drivers to calculate significantly longer following distances and braking distances than at lower speeds. Nebraska's flat topography means wind, blowing snow (in winter), and blowing dust (in dry conditions) can rapidly reduce visibility on I-80 — conditions under which the 75 mph limit may be dangerous even though it is legal."
    },
    {
      question: "The Nebraska Sandhills region along US-83 is known for being extremely remote. What should a driver prioritize before entering this region?",
      options: ["Check for active construction zones on US-83", "Ensure the vehicle has adequate fuel and carry emergency supplies (water, blankets, first aid) because services may be 100+ miles apart", "Obtain a permit from the Nebraska DOT for remote road travel", "Verify cell phone coverage for the entire US-83 route"],
      correctIndex: 1,
      explanation: "The Nebraska Sandhills is one of the most remote driving environments in the continental United States. On some sections of US-83 and related Sandhills roads, gas stations, food services, and cell phone coverage may be absent for 100 miles or more. Before entering the Sandhills, drivers should top off the fuel tank, carry emergency water and food supplies, bring warm clothing and blankets (especially in winter), have a basic vehicle emergency kit, and inform someone of the planned route and expected arrival time. Cell phone outages mean that a breakdown may require waiting several hours for another vehicle to pass and summon help."
    },
    {
      question: "In western Nebraska's open range territory, a driver strikes a horse standing on a rural highway at dusk. Who bears legal responsibility under Nebraska's open range law?",
      options: ["The horse's owner, for failing to fence the horse away from the road", "The driver, because open range law does not require ranchers to fence livestock off public roads", "Liability is split equally between the driver and rancher", "No one is legally responsible — open range collisions are classified as unavoidable accidents"],
      correctIndex: 1,
      explanation: "In open range areas of western Nebraska, ranchers and livestock owners are not legally required to fence their animals off public roads. When a driver strikes livestock (horses, cattle, or other animals) on an open range road, the driver typically bears legal responsibility for damage to the animal and for any resulting claims. This reverses the expectation of drivers from states with 'fence in' livestock laws. Nebraska drivers on rural western roads must monitor road margins for livestock, especially at dawn and dusk when animals are most active and visibility is reduced."
    },
    {
      question: "An Alberta Clipper winter storm on I-80 in Nebraska creates near-zero visibility from blowing snow. What is the safest action for a driver caught in these conditions on the interstate?",
      options: ["Maintain highway speed to exit the storm quickly", "Reduce speed significantly, increase following distance, and exit to find shelter if conditions become dangerous", "Turn on hazard lights and stop in the right lane", "Follow the taillights of the vehicle ahead at a close following distance to maintain lane position"],
      correctIndex: 1,
      explanation: "When an Alberta Clipper blizzard reduces visibility on I-80 to near zero, reducing speed dramatically and increasing following distance are essential — stopping distance increases on snow-covered roads, and visibility limitations prevent seeing obstacles until they are very close. If conditions become too dangerous to continue safely, exit the interstate and seek shelter at a motel, truck stop, or other facility rather than pulling to the shoulder (where vehicles are frequently struck by traffic using the shoulder as a reference in zero-visibility conditions). Following another vehicle's taillights in zero-visibility conditions risks driving into the back of a stopped vehicle."
    },
    {
      question: "What is the minimum age to apply for a learner's permit in Nebraska?",
      options: ["14 years old", "14½ years old", "15 years old", "15½ years old"],
      correctIndex: 2,
      explanation: "Nebraska allows residents to apply for a learner's permit at age 15. To obtain the permit, applicants must pass the Nebraska DMV written knowledge exam and vision test. Permit holders must drive exclusively with a licensed adult supervisor age 21 or older in the front passenger seat. Nebraska's graduated driver license (GDL) program requires a minimum permit holding period before the permit holder can advance to a provisional license with specific time and passenger restrictions, followed by full license eligibility."
    },
    {
      question: "Nebraska uses DUI terminology for impaired driving. What is the BAC limit for adult drivers 21 and older?",
      options: ["0.06%", "0.08%", "0.10%", "0.04%"],
      correctIndex: 1,
      explanation: "Nebraska's DUI (Driving Under the Influence) BAC threshold for adults 21 and older is 0.08%. Nebraska uses DUI terminology, not OUI or DWI. Nebraska's Implied Consent law means that any driver on Nebraska roads has implicitly agreed to chemical testing when lawfully arrested for DUI — refusal triggers automatic license revocation. Drivers under 21 face a 0.02% BAC threshold under Nebraska's minor in possession of alcohol and driving laws."
    },
    {
      question: "Nebraska drivers commonly carry comprehensive auto insurance specifically for hail damage. Why is hail particularly damaging in Nebraska compared to most other states?",
      options: ["Nebraska's flat terrain means hail falls straight down with maximum force, unlike states with hills and trees that deflect hail", "Nebraska ranks among the states with the highest average annual hail event totals, with large stones capable of shattering glass and denting vehicle bodies", "Nebraska law requires comprehensive coverage for all vehicles because of high hail frequency", "Nebraska hail is made of larger ice crystals because of the state's cold winters"],
      correctIndex: 1,
      explanation: "Nebraska ranks among the states with the highest average annual hail event frequency in the nation, due to the convergence of warm, moist Gulf air and cold, dry air from the Rockies over the Great Plains. Large hailstones — quarter-sized (1 inch) and larger — can shatter side and rear windows, dent sheet metal, crack windshields, and injure exposed individuals. Nebraska drivers learn to take hail warnings seriously as a practical matter of vehicle preservation and personal safety. Comprehensive auto insurance, which covers hail damage, is common among Nebraska vehicle owners for this reason."
    },
  ],
  faqs: [
    {
      question: "What is Nebraska's cell phone law for drivers?",
      answer: "Nebraska uses a two-tier cell phone law. Adult drivers (21 and older) are prohibited from reading, typing, or sending written text messages while driving under NRS 60-6,179.01. This is a texting-only ban — hands-free calling, Bluetooth, and voice-activated navigation remain legal for adult drivers. The adult texting ban is secondary enforcement, meaning officers cannot stop a driver solely for texting; it can only be cited if the vehicle is already stopped for another infraction. Fines escalate: $200 for a first offense, $300 for a second, and $500 for a third or subsequent offense. Each violation also adds 3 demerit points. Teen drivers on a Learner's Permit (LPD) or Provisional Operator's Permit (POP) face a completely different, stricter rule under NRS 60-4,120.01: a total ban on ALL interactive wireless communication devices, including hands-free earpieces, speakerphone, and voice-activated calls. The teen ban applies regardless of whether the device is hand-held. The Nebraska DMV knowledge exam tests awareness of both tiers of this law."
    },
    {
      question: "What is Nebraska's triple weather threat and what should drivers know?",
      answer: "Nebraska sits at the convergence zone for three distinct severe weather systems that each create dangerous driving conditions. First, Tornado Alley extends through eastern Nebraska — drivers who encounter a tornado on I-80 or US-77 should exit their vehicle and seek the lowest ground available (a roadside ditch), covering their head, rather than staying in the vehicle or sheltering under an overpass. Second, Alberta Clipper blizzards from Canada sweep into Nebraska in winter with extreme snowfall and blowing snow that reduces I-80 visibility to near zero in minutes. Third, Nebraska averages some of the highest hail event totals in the nation — large hailstones can shatter windows and injure exposed persons. Nebraska DMV exam questions test awareness of correct responses to all three threats."
    },
    {
      question: "What is the Nebraska DMV test structure — how many questions and what passing score?",
      answer: "The Nebraska Department of Motor Vehicles administers a 25-question knowledge exam. Applicants must answer at least 20 questions correctly to achieve the required 80% passing score. The exam is administered at Nebraska DMV offices and covers Nebraska traffic laws, road signs, DUI statutes, LB 918 hands-free requirements, emergency weather procedures, and safe driving practices drawn from the Nebraska Driver's Manual. First-time applicants who fail may retake the exam after a waiting period specified by the DMV."
    },
    {
      question: "How remote is US-83 through the Nebraska Sandhills?",
      answer: "US-83 through the Nebraska Sandhills — particularly the stretch north of North Platte through Valentine and toward the South Dakota border — passes through one of the most remote and least-populated regions in the continental United States. The Sandhills cover approximately 19,000 square miles of grass-stabilized sand dunes and are home to ranching operations but almost no commercial services outside of small towns. Gas stations may be 80–100 miles apart, cell phone coverage is often nonexistent, and in winter, blizzard conditions can strand vehicles for extended periods. Nebraska DMV guidance for Sandhills driving emphasizes fuel planning, emergency supply carrying, and informing others of planned routes."
    },
    {
      question: "What is the speed limit on I-80 in Nebraska?",
      answer: "Nebraska's rural sections of I-80 have a 75 mph speed limit. I-80 is one of the most important transcontinental routes in the United States, running across Nebraska from Omaha to the Wyoming border through flat, open prairie and farmland. The open terrain on I-80 means that wind, blowing snow in winter, and agricultural dust in dry conditions can reduce visibility rapidly. Nebraska's reasonable and prudent driving standard requires speed reduction when conditions make the posted limit unsafe. Speed limits in the Omaha and Lincoln metro areas are lower than 75 mph."
    },
    {
      question: "What is Nebraska's DUI law?",
      answer: "Nebraska uses DUI (Driving Under the Influence) terminology. The adult BAC threshold (21 and older) is 0.08%. Drivers under 21 face a 0.02% BAC threshold. Nebraska's Implied Consent law means that any driver on Nebraska roads has implicitly consented to chemical testing (breath, blood, or urine) when lawfully arrested for DUI — refusal triggers automatic license revocation. First-offense DUI penalties in Nebraska include license revocation, fines, mandatory alcohol assessment and treatment, and possible jail time. Nebraska also offers an ignition interlock limited license program that allows some first offenders to maintain limited driving privileges during revocation."
    },
    {
      question: "What open range livestock rules apply in Nebraska?",
      answer: "Western Nebraska operates under open range livestock laws, which means ranchers and livestock owners are not required by law to fence their cattle, horses, or other livestock away from public roads. When a driver strikes livestock on an open range road in western Nebraska, the driver typically bears legal responsibility for damage to the animal. This is the opposite of what drivers from eastern states may expect. Nebraska drivers on rural western routes — particularly on US-83, US-385, and secondary county roads in Cherry, Sheridan, Dawes, and neighboring counties — must watch for livestock on or near the road, especially at dawn and dusk when animals are most active."
    },
    {
      question: "What should Nebraska drivers do when a tornado warning is issued while driving?",
      answer: "If a tornado warning is issued and a tornado is imminent or visible while driving in Nebraska, the safest options are: first, seek a sturdy building (gas station, restaurant, or motel) and shelter in the lowest floor away from windows. If no building is immediately available, exit the vehicle and lie flat in the lowest available ground nearby (a roadside ditch or depression), covering your head. Do not shelter under an overpass — wind speeds accelerate under bridge spans and flying debris is channeled along the overpass corridor. Tornadoes on I-80 and other Nebraska highways are a real possibility during spring and early summer storm season. The Nebraska DMV exam tests tornado response because it is a genuine driving emergency for Nebraska residents."
    },
    {
      question: "What hail precautions should Nebraska drivers take?",
      answer: "Nebraska drivers can prepare for and respond to hail in several ways. Before driving during storm season, check weather forecasts (the Storm Prediction Center issues daily outlooks for severe weather including hail) and consider parking in a covered structure when hail is forecast. If caught driving when hail begins, immediately seek a covered parking structure, gas station canopy, or solid overpass (with walls, not just a bridge span). If no shelter is available, pull safely off the road and angle your vehicle so the front (windshield, which uses laminated safety glass) faces the hail direction rather than exposing side windows (tempered glass, which shatters). Do not park under trees. Stay inside the vehicle to avoid being struck by hailstones, which at large sizes can cause serious injury."
    },
    {
      question: "What is Nebraska's permit age and GDL program structure?",
      answer: "Nebraska residents may apply for a learner's permit at age 15 after passing the DMV knowledge exam and vision test. Permit holders must drive with a licensed supervising adult (21 or older) in the front seat. After holding the permit for a minimum period and meeting supervised hours requirements, permit holders can advance to a School Permit (limited to driving to school and school activities) and then a Provisional Operator's Permit (POP). The POP has nighttime restrictions (no driving between midnight and 6 AM) and passenger restrictions (no more than one non-family passenger under 19 for the first six months). Full license eligibility is available at 17 after completing all GDL stages with a clean driving record."
    },
  ],
  relatedTests: [
    { label: "Nebraska Motorcycle Practice Test", href: "/nebraska-motorcycle-practice-test" },
    { label: "Nebraska CDL Practice Test", href: "/nebraska-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function NebraskaDMVPage() {
  return <PracticeTestPage {...data} />;
}
