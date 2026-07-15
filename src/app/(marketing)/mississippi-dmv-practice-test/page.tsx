import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Mississippi DMV Practice Test 2025 – Free DPS Knowledge Exam Prep",
  description: "Prepare for the Mississippi DPS driver's license knowledge test with 30 state-specific questions covering Mississippi cell phone laws, DUI penalties, seatbelt rules, extreme heat driving, and Mississippi road conditions. Free 2025 practice test.",
  alternates: { canonical: "https://caredmvprep.com/mississippi-dmv-practice-test" },
  openGraph: { url: "https://caredmvprep.com/mississippi-dmv-practice-test", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

const data: PracticeTestPageProps = {
  state: "Mississippi",
  stateAbbr: "MS",
  testLabel: "DMV Practice Test",
  slug: "mississippi-dmv-practice-test",
  headline: "Mississippi DPS Practice Test 2025",
  intro: "The Mississippi Department of Public Safety (DPS), Driver Services administers a 30-question knowledge exam. You must answer 24 questions correctly (80%) to pass. This practice test covers Mississippi-specific laws including the texting and social media ban (Miss. Code Ann. § 63-33-1), DUI thresholds, Mississippi's all-occupant seatbelt requirement, extreme summer heat driving hazards, and Mississippi road conditions.",
  basedOn: "Mississippi Department of Public Safety Driver's License Study Guide",
  keyRules: [
    { icon: "📱", rule: "Cell Phone Law: Texting & Social Media Banned", detail: "Miss. Code Ann. § 63-33-1 bans texting and posting to social media while driving — a $100 fine applies. However, Mississippi does NOT ban handheld phone calls while driving; only texting and social media use are prohibited. Hands-free features and voice-to-text are permitted. There is no age exception — the ban applies to all drivers." },
    { icon: "🍺", rule: "DUI Limits", detail: "Mississippi uses DUI (Driving Under the Influence) terminology. The legal limit is 0.08% BAC for adults 21 and older. Drivers under 21 face a 0.02% BAC threshold. First-offense DUI penalties include fines of $250–$1,000, possible 48-hour jail time, and license suspension of up to 90 days." },
    { icon: "🪑", rule: "Seatbelt Law: All Occupants, All Seats", detail: "Mississippi requires ALL occupants in ALL seats to wear seatbelts — primary enforcement, meaning officers can stop you solely for this violation. Children under 4 require a car seat; ages 4–6 who are under 4'9\" or under 65 lbs must use a booster seat. Children under 13 should ride in the backseat for air bag safety." },
    { icon: "🌡️", rule: "Extreme Summer Heat", detail: "Mississippi summers regularly exceed 100°F with high humidity. Road surface temperatures can reach 150°F, dramatically increasing tire blowout risk. Drivers should check tire pressure before long drives (heat causes pressure to rise), monitor coolant levels, and avoid parking on soft asphalt that can cause tire deformation." },
    { icon: "🏍️", rule: "Permit Age: 15", detail: "Mississippi allows residents to apply for a learner's permit at age 15. Permit holders must pass the DPS written knowledge test and vision exam. The permit requires a licensed supervising driver age 21 or older in the front passenger seat during all driving." },
    { icon: "⛴️", rule: "Natchez-Vidalia Ferry", detail: "The Natchez-Vidalia Ferry crossing the Mississippi River between Natchez, MS and Vidalia, LA is one of the last operating toll-free vehicle ferries on the Mississippi River. Drivers boarding the ferry must follow crew directions, set the parking brake, turn off the engine, and remain in the vehicle or in designated passenger areas during the crossing." },
    { icon: "🌊", rule: "Flood-Prone Roads", detail: "The Mississippi Delta and Gulf Coast regions are prone to rapid flooding. Mississippi drivers must obey 'Road Closed' barriers at flood-prone crossings — attempting to drive through standing water is extremely dangerous as little as 12 inches of moving water can sweep a car off a road. 'Turn Around, Don't Drown' is a life-saving rule in Mississippi." },
    { icon: "🚧", rule: "Construction Zone Fines", detail: "Mississippi doubles traffic fines for violations occurring in active highway construction zones, including speeding, following too closely, and improper lane changes. Construction zones are common on I-20, I-55, and US-49 where MDOT conducts frequent infrastructure improvements. Fines are doubled whether or not construction workers are present." },
  ],
  about: [
    "The Mississippi Department of Public Safety (DPS), Driver Services division administers the state's driver licensing program — Mississippi uses DPS rather than a traditional DMV, similar to Oklahoma and Tennessee. The knowledge exam consists of 30 questions, and applicants must answer at least 24 correctly (80%) to pass. Mississippi's permit age is 15 years old. Mississippi's cell phone law (Miss. Code Ann. § 63-33-1) bans texting and posting to social media while driving, with a $100 fine. Notably, handheld phone calls are NOT banned in Mississippi — only texting and social media use are prohibited. Hands-free and voice-to-text options are permitted.",
    "Mississippi's seatbelt law requires ALL occupants in ALL seats to wear seatbelts — this is primary enforcement, meaning officers can stop you solely for a seatbelt violation without another reason. Children under 4 must ride in a car seat; children ages 4–6 who are under 4'9\" or under 65 pounds must use a booster seat; children under 13 should ride in the backseat. The DUI threshold in Mississippi is 0.08% BAC for adults and 0.02% for drivers under 21 (Zero Tolerance law). First-offense DUI penalties include fines of $250–$1,000, potential 48-hour jail time, and license suspension of up to 90 days.",
    "Mississippi's climate creates specific driving hazards that are tested on the DPS exam. Summer temperatures regularly exceed 100°F with high humidity, and road surfaces can reach 150°F — dramatically increasing tire blowout risk and making prolonged parking on asphalt potentially damaging to tires. The Mississippi Delta and Gulf Coast areas experience flooding that can inundate roads rapidly, especially during hurricane season (June–November). The Natchez-Vidalia Ferry operates across the Mississippi River as a toll-free vehicle crossing, and drivers must follow specific boarding and crossing procedures. I-20, I-55, and US-49 are the major corridors where DPS exam questions address highway driving, construction zone rules, and high-speed lane change procedures.",
  ],
  sampleQuestions: [
    {
      question: "Under Miss. Code Ann. § 63-33-1, which of the following is TRUE about Mississippi's cell phone law?",
      options: ["All handheld phone use — calls, texting, and social media — is banned while driving", "Texting and posting to social media are banned; handheld phone calls are NOT banned", "Only drivers under 18 are prohibited from texting while driving", "Mississippi has no cell phone restrictions — all handheld use is permitted"],
      correctIndex: 1,
      explanation: "Miss. Code Ann. § 63-33-1 specifically bans texting and posting to social media while driving, with a $100 fine (effective July 1, 2025). However, Mississippi does NOT ban handheld phone calls while driving — this is an important distinction. A driver may legally hold their phone and make or receive a call while driving in Mississippi. Hands-free options are encouraged for safety, but only texting and social media are legally prohibited. There is no age exception — the ban applies to all drivers."
    },
    {
      question: "Mississippi's seatbelt law requires which vehicle occupants to wear a seatbelt?",
      options: ["Drivers only — passengers are not legally required to wear seatbelts", "Drivers and front-seat passengers only", "All occupants in all seats — front and rear", "Only occupants under age 18"],
      correctIndex: 2,
      explanation: "Mississippi requires ALL occupants in ALL seats to wear seatbelts — this is a full-coverage seat belt law with primary enforcement. Mississippi's seatbelt requirement covers the driver, all front-seat passengers, and all rear-seat passengers. Additionally, children under 4 must be in a car seat; children ages 4–6 who are under 4'9\" tall or under 65 pounds must use a booster seat; and children under 13 should ride in the backseat. Mississippi DPS can stop you solely for a seatbelt violation without needing another reason (primary enforcement)."
    },
    {
      question: "The Mississippi DPS administers driver licensing in Mississippi. Which state agency handles driver services, and what is the exam structure?",
      options: ["Mississippi DMV; 25-question test with 80% passing", "Mississippi Department of Public Safety, Driver Services; 30-question test requiring 24 correct answers", "Mississippi Secretary of State; 35-question test with 75% passing", "Mississippi DOR; 28-question test with 80% passing"],
      correctIndex: 1,
      explanation: "Mississippi driver licensing is handled by the Department of Public Safety (DPS), Driver Services division — Mississippi does not have a traditional DMV. The knowledge exam consists of 30 questions, and applicants must answer at least 24 correctly to achieve the required 80% passing score. DPS operates driver license offices throughout the state, and the knowledge exam covers Mississippi traffic laws, road signs, and safe driving practices as outlined in the DPS Driver's License Study Guide."
    },
    {
      question: "During a Mississippi summer, road surface temperatures can reach 150°F. What specific tire hazard does this extreme heat create?",
      options: ["Tires become permanently flat from heat absorption", "Dramatically increased tire blowout risk due to heat expansion of air inside the tire and softening of tire rubber compounds", "Tires lose traction because asphalt melts and coats the tread", "High temperatures cause tire pressure to drop to unsafe levels"],
      correctIndex: 1,
      explanation: "When road surface temperatures reach 150°F — common in Mississippi summers with ambient temperatures exceeding 100°F — tires are subjected to extreme stress. Heat causes the air inside tires to expand, raising pressure beyond recommended levels. Simultaneously, the rubber compounds in tire sidewalls and tread soften under extreme heat, reducing structural integrity. This combination dramatically increases the risk of tire blowouts, especially at highway speed. Drivers should check tire pressure before long summer drives (in the cooler morning), inspect tires for wear and damage, and avoid overloading vehicles in summer heat."
    },
    {
      question: "A Mississippi driver encounters a flooded road crossing in the Delta region. The water covers the road to an unknown depth. What is the correct action?",
      options: ["Test the depth by driving through slowly with hazard lights on", "Turn around — 'Turn Around, Don't Drown' applies; never drive through standing water of unknown depth", "Accelerate to cross the water quickly before the vehicle stalls", "Wait 30 minutes and then proceed if water level has not risen"],
      correctIndex: 1,
      explanation: "The 'Turn Around, Don't Drown' principle is a life-saving rule in Mississippi, where the Delta region and Gulf Coast are highly prone to rapid flooding. As little as 12 inches of moving water can sweep a standard passenger car off a road, and 2 feet of moving water can carry away most SUVs and trucks. Road depth is impossible to determine visually — a road may drop away or the current may be far stronger than it appears. Mississippi drivers should never attempt to drive through flooded road crossings and must obey 'Road Closed' barriers even if the closure appears unnecessary."
    },
    {
      question: "What is the BAC limit for a Mississippi driver under age 21 under the state's DUI law?",
      options: ["0.08%", "0.04%", "0.02%", "0.00%"],
      correctIndex: 2,
      explanation: "Mississippi sets a 0.02% BAC threshold for drivers under 21 under the state's DUI law. This is consistent with the near-zero-tolerance approach used by most U.S. states for underage drivers, though it is not a complete zero-tolerance standard. For practical purposes, a 0.02% limit means any measurable alcohol intake before driving could constitute a DUI violation for a driver under 21. Penalties for underage DUI include license suspension, mandatory alcohol education programs, fines, and community service."
    },
    {
      question: "A driver is boarding the Natchez-Vidalia Ferry at Natchez for a Mississippi River crossing. What must the driver do once the vehicle is in position on the ferry?",
      options: ["Keep the engine running for quick departure", "Set the parking brake, turn off the engine, and remain in or near the vehicle as directed by ferry crew", "Move to the front of the ferry to maintain vehicle balance", "Keep the vehicle in drive gear to prevent rolling"],
      correctIndex: 1,
      explanation: "When boarding a vehicle ferry such as the Natchez-Vidalia Ferry, drivers must follow crew instructions, which typically require setting the parking brake firmly, turning off the engine (to reduce exhaust fumes and fire risk), and remaining in the vehicle or moving to designated passenger areas for the duration of the crossing. Ferry crews direct vehicles during loading and may secure vehicles with wheel chocks. Attempting to restart or move the vehicle during crossing without crew authorization is prohibited and dangerous. The Natchez-Vidalia Ferry is one of the last toll-free vehicle ferries operating on the Mississippi River."
    },
    {
      question: "Traffic fines for violations in Mississippi highway construction zones are set at what level compared to standard fines?",
      options: ["The same as standard fines", "50% higher than standard fines", "Double the standard fine amount", "Triple the standard fine amount"],
      correctIndex: 2,
      explanation: "Mississippi law doubles traffic fines for violations occurring in active highway construction zones. This doubled penalty applies to speeding, following too closely, improper lane changes, and other moving violations committed within the posted construction zone limits. Importantly, the doubled fines apply whether or not construction workers are actually present in the zone at the time of the violation. Construction zones are common on I-20, I-55, and US-49 where MDOT (Mississippi Department of Transportation) frequently conducts road improvement projects."
    },
    {
      question: "Under Mississippi DUI law, what is the maximum license suspension for a first-offense DUI conviction for an adult driver?",
      options: ["30 days", "60 days", "90 days", "180 days"],
      correctIndex: 2,
      explanation: "A first-offense adult DUI conviction in Mississippi can result in a license suspension of up to 90 days, in addition to fines of $250 to $1,000 and potential imprisonment of up to 48 hours. First offenders may be eligible for a hardship license for essential driving (work, school, medical appointments) during the suspension period. Mississippi's DUI law also requires completion of a Mississippi Alcohol Safety Education Program (MASEP) course as a condition of license reinstatement after a DUI suspension."
    },
    {
      question: "What is the minimum age to obtain a Mississippi learner's permit?",
      options: ["14 years old", "15 years old", "15½ years old", "16 years old"],
      correctIndex: 1,
      explanation: "Mississippi allows residents to apply for a learner's permit at age 15 after passing the DPS knowledge exam and vision test. Permit holders must be accompanied at all times by a licensed supervising driver who is at least 21 years old and seated in the front passenger seat. Mississippi's graduated driver license program includes mandatory permit holding periods and supervised driving hour requirements before permit holders can advance to a restricted license and eventually a full driver's license."
    },
  ],
  faqs: [
    {
      question: "What does Mississippi law say about cell phones and texting while driving?",
      answer: "Miss. Code Ann. § 63-33-1 bans texting and posting to social media while driving in Mississippi. The fine is $100 (effective July 1, 2025). Importantly, Mississippi does NOT ban handheld phone calls — a driver may legally hold their phone and talk while driving. Only texting and social media use are prohibited. Hands-free options (Bluetooth, speakerphone not held in hand, voice-to-text) are encouraged but not legally required. The ban applies to all drivers with no age exception. This is directly tested on the Mississippi DPS knowledge exam — know the scope: texting and social media = banned; handheld calls = not banned."
    },
    {
      question: "Does Mississippi require all passengers to wear seatbelts?",
      answer: "Yes — Mississippi requires ALL occupants in ALL seats to wear seatbelts. Mississippi's seatbelt law covers the driver, all front-seat passengers, and all rear-seat passengers. It is a primary enforcement law, meaning a DPS officer can stop you solely for a seatbelt violation. Children under 4 must be in a car seat; children ages 4–6 who are under 4'9\" tall or under 65 pounds must use a booster seat; children under 13 should ride in the backseat for air bag safety. This full-coverage seat belt requirement is a common exam topic."
    },
    {
      question: "What is Mississippi's DUI BAC threshold for adults and drivers under 21?",
      answer: "Mississippi uses DUI (Driving Under the Influence) terminology. For adults 21 and older, the legal BAC limit is 0.08%. For drivers under 21, the threshold is 0.02% — effectively a near-zero-tolerance standard. First-offense adult DUI penalties include fines of $250 to $1,000, potential imprisonment up to 48 hours, and license suspension up to 90 days. Mississippi also requires completion of the Alcohol Safety Education Program (MASEP) as a condition of reinstatement. Repeat DUI offenses carry progressively harsher penalties including mandatory ignition interlock device installation."
    },
    {
      question: "What should Mississippi drivers do to protect their vehicles from extreme summer heat?",
      answer: "Mississippi summers routinely bring ambient temperatures above 100°F and high humidity, with road surface temperatures reaching 150°F. To protect vehicles and avoid dangerous situations: check tire pressure in the morning before driving (heat increases pressure during the drive and underinflated tires are more susceptible to blowouts), inspect tires for cracks or wear that heat can worsen, maintain proper coolant levels and check the radiator cap and hoses before long trips, keep the gas tank at least half full (fuel evaporates faster in heat and a full tank prevents fuel pump damage), and avoid parking on soft asphalt for extended periods, as extreme heat can cause tire deformation."
    },
    {
      question: "What is the Natchez-Vidalia Ferry and what rules apply when crossing?",
      answer: "The Natchez-Vidalia Ferry is one of the last operating toll-free vehicle ferries crossing the Mississippi River, connecting Natchez, Mississippi with Vidalia, Louisiana. It provides an alternative to the Natchez-Vidalia Bridge (US-84) for shorter local trips. When boarding, drivers must follow crew instructions for vehicle placement on the ferry deck, set the parking brake, turn off the engine to reduce fumes and fire risk, and remain in or near the vehicle (or in designated passenger areas) during the crossing. Ferry boarding protocols are sometimes tested on the Mississippi DPS knowledge exam as an example of specialized vehicle operation rules."
    },
    {
      question: "What is the Mississippi DPS and how is it different from a typical DMV?",
      answer: "Mississippi's driver licensing is administered by the Department of Public Safety (MDPS), Driver Service Bureau. Mississippi does not have a department called the 'DMV' — instead, DPS handles both law enforcement (Highway Patrol) and driver licensing functions under one agency umbrella, similar to how Oklahoma and Tennessee organize driver services. The Driver Service Bureau (driverservicebureau.dps.ms.gov) processes applications for learner's permits, driver's licenses, CDLs, motorcycle endorsements, and ID cards. The knowledge exam consists of 30 questions with an 80% passing threshold (24 correct)."
    },
    {
      question: "What are the flooding risks Mississippi drivers should know about?",
      answer: "Mississippi is highly prone to flooding, particularly in the Mississippi Delta region (which lies below the floodplain of the Mississippi River and its tributaries) and along the Gulf Coast (which is subject to storm surge and tropical rainfall during hurricane season, June through November). Roads in the Delta frequently flood rapidly after heavy rainfall, and the depth of water on a road is impossible to determine visually. As little as 12 inches of moving water can sweep a passenger car off a roadway, and 2 feet can carry away most trucks and SUVs. Mississippi drivers must obey all 'Road Closed' barriers at flooded crossings and must never attempt to drive through water of unknown depth — this is the basis of the 'Turn Around, Don't Drown' safety message."
    },
    {
      question: "What is the permit age in Mississippi and what are the permit rules?",
      answer: "Mississippi residents may apply for a learner's permit at age 15 after passing the DPS written knowledge exam and vision test. Permit holders must be accompanied at all times by a licensed supervisor who is at least 21 years old and seated in the front passenger seat. Mississippi's graduated driver license (GDL) system requires permit holders to maintain the permit for a specified period and log supervised driving hours before advancing to a restricted license. The restricted license stage includes nighttime driving restrictions and limitations on the number of non-family passengers. Full license eligibility depends on age, time held in the GDL stages, and a clean driving record."
    },
    {
      question: "What are Mississippi's road signs that are unique or frequently tested?",
      answer: "The Mississippi DPS knowledge exam tests standard national sign shapes and colors as well as Mississippi-specific situations. Yellow diamond warning signs commonly tested in Mississippi include flood warning signs, wildlife crossing signs (white-tailed deer are common throughout the state), and construction zone signs on I-20, I-55, and US-49 corridors. Green guide signs for the interstate system are tested for understanding exit numbering, interchange types, and milepost systems. Mississippi also uses brown recreational area signs for the Natchez Trace Parkway — a federally operated scenic road with its own speed limit and passing rules distinct from state highways."
    },
    {
      question: "What penalties apply for speeding in a Mississippi construction zone?",
      answer: "Mississippi law doubles all traffic fines for moving violations committed in active highway construction zones. This means if the standard fine for speeding at a certain speed over the limit is $200, it becomes $400 in a construction zone. The doubled penalty applies whether or not workers are physically present in the zone at the time of the violation — the construction zone designation is determined by the posted signs, not by worker presence. Construction zones are common on major Mississippi highways undergoing MDOT improvement projects, particularly on I-20 (Jackson corridor), I-55 (north-south corridor), and US-49 (Delta to Gulf Coast route)."
    },
  ],
  relatedTests: [
    { label: "Mississippi Motorcycle Practice Test", href: "/mississippi-motorcycle-practice-test" },
    { label: "Mississippi CDL Practice Test", href: "/mississippi-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function MississippiDMVPage() {
  return <PracticeTestPage {...data} />;
}
