import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Kansas DMV Practice Test 2025 – Free KS Driver's License Exam Prep",
  description:
    "Prepare for your Kansas DOR knowledge test with free practice questions covering I-70 crosswinds, texting ban, tornado protocol, Kansas Turnpike, open range law, and Kansas DOR-specific licensing rules. 25 questions, 80% to pass.",
  alternates: { canonical: "https://caredmvprep.com/kansas-dmv-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/kansas-dmv-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "Kansas",
  stateAbbr: "KS",
  testLabel: "DMV Practice Test",
  slug: "kansas-dmv-practice-test",
  headline: "Kansas DMV Practice Test 2025",
  intro:
    "Kansas driver licensing is administered by the Kansas Department of Revenue (DOR), Division of Vehicles — not a DMV. The knowledge test has 25 questions and requires 80% (20/25) to pass. This free practice test covers Kansas-specific topics: the dangerous I-70 crosswind corridor, Kansas texting and cell phone laws, tornado protocol, Kansas Turnpike toll procedures, the open range law in western Kansas, and Kansas DUI rules.",
  basedOn: "Kansas Department of Revenue Driver's License Manual",
  keyRules: [
    {
      icon: "💨",
      rule: "I-70 Crosswind: 30–50 mph Regularly",
      detail:
        "Kansas I-70 experiences some of the highest consistent crosswind conditions of any U.S. interstate — sustained winds of 30–50 mph are common. High-profile vehicles (RVs, box trucks, enclosed trailers) can be blown off the road. KDOT issues crosswind advisories and specific vehicle restrictions.",
    },
    {
      icon: "📱",
      rule: "Cell Phone Laws: Texting Ban + School/Work Zone Handheld Ban",
      detail:
        "Kansas bans texting for ALL drivers under KSA 8-15,111 ($60 fine, primary enforcement). SB 366, effective July 1, 2026, adds a handheld device ban in school zones and construction/work zones (warning citations only through July 1, 2027; fines begin July 2027). Kansas does NOT have a general handheld call ban on open roads — only texting and school/construction zone use are prohibited. Permit and restricted license holders may NOT use any wireless device (except to report emergencies or illegal activity).",
    },
    {
      icon: "🌪️",
      rule: "Tornado Protocol: Do NOT Shelter Under Overpass",
      detail:
        "Kansas's flat terrain allows excellent tornado visibility but also means no natural barriers. Tornado shelter under a highway overpass is extremely dangerous — the overpass concentrates wind and debris. Exit the vehicle and lie flat in a low ditch away from the vehicle and trees.",
    },
    {
      icon: "🛣️",
      rule: "Kansas Turnpike (I-335): Toll Collection Procedures",
      detail:
        "The Kansas Turnpike (I-335) uses traditional toll plazas. Drivers must have exact change or use the K-TAG (Kansas electronic toll) transponder. Bypassing a toll plaza is a violation. CDL vehicles pay commercial rates. I-70 through Wichita is also a turnpike (KTA) section.",
    },
    {
      icon: "🐄",
      rule: "Open Range: Eastern vs. Western Kansas",
      detail:
        "Eastern Kansas is fenced range — ranchers are responsible for keeping livestock off roads. Western Kansas is largely open range — if you hit cattle on the road in open range territory, the driver may be responsible for damages. Watch for cattle crossing signs in western Kansas.",
    },
    {
      icon: "🧒",
      rule: "Permit Age: 14 Years Old",
      detail:
        "Kansas issues instruction permits at age 14 — one of the youngest in the nation. Permit holders must be accompanied by a licensed driver 21 or older. A restricted license is available at 15, and a full license at 17 with all GDL requirements met.",
    },
    {
      icon: "🍺",
      rule: "DUI Threshold: 0.08% / 0.02% Under-21",
      detail:
        "Kansas uses DUI terminology with an adult BAC limit of 0.08%. Drivers under 21 face DUI charges at 0.02% or higher. Kansas DUI penalties include mandatory license suspension, fines, and potential ignition interlock device requirements.",
    },
    {
      icon: "🏛️",
      rule: "Kansas DOR — Not a DMV",
      detail:
        "Kansas does not have a DMV. All driver licensing is administered by the Kansas Department of Revenue (DOR), Division of Vehicles. DOR offices are located in counties throughout Kansas. Search for 'Kansas DOR' or 'Kansas driver's license' rather than 'Kansas DMV' when looking for a licensing office.",
    },
  ],
  about: [
    "Kansas driver licensing is administered by the Kansas Department of Revenue (DOR), Division of Vehicles — not a traditional DMV. The DOR Division of Vehicles operates licensing offices throughout Kansas. The knowledge test consists of 25 multiple-choice questions from the Kansas Driver's License Manual, with 80% (20 out of 25 correct) required to pass. Kansas's permit age of 14 is among the youngest in the nation. Kansas bans texting for all drivers (KSA 8-15,111), and SB 366 (effective July 1, 2026) adds a school zone and construction zone handheld device ban. Kansas does not have a general handheld call ban on open roads.",
    "Kansas I-70 is infamous for crosswind conditions: sustained winds of 30–50 mph regularly cross the highway, and high-profile vehicles such as RVs, box trucks, and empty trailers have been blown off the road. KDOT issues crosswind advisories and specific restrictions for high-profile vehicles in extreme wind events. Kansas's flat terrain also creates significant tornado hazards — the state sits in the center of 'Tornado Alley' and experiences frequent tornado activity. Kansas drivers must know that sheltering under a highway overpass is dangerous and that lying flat in a low ditch is the correct protocol.",
    "Kansas has distinct open range rules depending on geography: eastern Kansas is generally fenced range (where ranchers are responsible for keeping livestock off roads), while western Kansas is largely open range (where livestock may legally be on roads and drivers may bear responsibility if they hit cattle). The Kansas Turnpike (I-335, also segments of I-70 through the Wichita area managed by the Kansas Turnpike Authority) uses toll collection that drivers must navigate with exact change or K-TAG electronic transponders.",
  ],
  sampleQuestions: [
    {
      question:
        "Kansas I-70 is known for crosswind conditions of what typical speed range?",
      options: [
        "5–15 mph — light breeze conditions",
        "15–25 mph — moderate wind conditions",
        "30–50 mph sustained crosswinds — among the highest on any U.S. interstate",
        "60+ mph — Kansas winds are always hurricane-strength",
      ],
      correctIndex: 2,
      explanation:
        "Kansas I-70 regularly experiences sustained crosswind conditions of 30–50 mph — among the highest consistent crosswind conditions of any U.S. interstate highway. The flat Kansas landscape provides no natural windbreaks, allowing wind to blow unobstructed across the road. High-profile vehicles including RVs, box trucks, enclosed trailers, and empty flatbeds are particularly vulnerable and have been blown off the road during extreme wind events. KDOT issues crosswind advisories and may restrict high-profile vehicles when winds are extreme.",
    },
    {
      question:
        "Which agency administers driver licensing in Kansas?",
      options: [
        "Kansas Department of Motor Vehicles (DMV)",
        "Kansas Department of Transportation (KDOT)",
        "Kansas Department of Revenue (DOR), Division of Vehicles",
        "Kansas Secretary of State Motor Vehicle Division",
      ],
      correctIndex: 2,
      explanation:
        "Kansas does not have a DMV. All driver licensing in Kansas is administered by the Kansas Department of Revenue (DOR), Division of Vehicles. DOR offices are located in counties throughout the state. When searching for a driver's license office in Kansas, residents should search for 'Kansas DOR' or 'Kansas Division of Vehicles' rather than 'Kansas DMV.' The DOR also handles vehicle registration and titling in Kansas.",
    },
    {
      question:
        "Which cell phone behavior is banned for ALL Kansas drivers on ALL roads at ALL times?",
      options: [
        "Talking hands-free on a Bluetooth earpiece",
        "Holding a phone to make a call on an open highway",
        "Texting or composing an electronic message while driving",
        "Using a GPS app on a phone mounted in a dashboard holder",
      ],
      correctIndex: 2,
      explanation:
        "Kansas bans texting and composing electronic messages for ALL drivers at ALL times under KSA 8-15,111 ($60 fine, primary enforcement). Kansas does NOT have a general ban on handheld calls on open roads — you can legally hold a phone to call on a rural highway. SB 366 (effective July 1, 2026) adds a handheld device ban specifically in school zones and construction/work zones, but that is separate from the universal texting ban. Permit and restricted license holders face a stricter rule: no wireless device use at all (except to report emergencies or illegal activity).",
    },
    {
      question:
        "What is the minimum age to apply for an instruction permit in Kansas?",
      options: ["15 years old", "15½ years old", "16 years old", "14 years old"],
      correctIndex: 3,
      explanation:
        "Kansas issues instruction permits at age 14, one of the youngest permit ages in the nation. Permit holders must be accompanied by a licensed driver 21 or older whenever they are driving. After meeting GDL requirements including supervised driving hours, a restricted (provisional) license is available at age 15. A full unrestricted license is available at age 17 after meeting all GDL requirements with a clean driving record.",
    },
    {
      question:
        "In western Kansas (open range territory), what is the legal situation if you hit cattle on the road?",
      options: [
        "The rancher is always responsible for damages when cattle are on public roads",
        "Neither party is liable — livestock collisions in Kansas are treated as unavoidable accidents",
        "In open range territory, the driver may be responsible for damages to the cattle if they are legally in the right-of-way",
        "Kansas state law requires ranchers to pay all damages regardless of whether it is open or fenced range",
      ],
      correctIndex: 2,
      explanation:
        "In western Kansas open range territory, livestock may legally be on public roads, and if a driver hits cattle, the driver may be liable for damages to the animals. This open range doctrine makes it the driver's responsibility to be alert for livestock on roads in these areas. Eastern Kansas is generally fenced range, where ranchers are legally responsible for keeping animals off roads. Cattle crossing signs on Kansas highways indicate areas where livestock regularly cross — reduce speed and watch carefully in these areas.",
    },
    {
      question:
        "You are driving on a Kansas rural road when a tornado warning is issued and a funnel cloud is visible approaching. What is the correct action?",
      options: [
        "Drive to the nearest highway overpass and shelter under it for structural protection",
        "Try to drive at right angles to the tornado's path to outrun it",
        "Exit the vehicle, move away from it, and lie flat in a low ditch away from trees and power poles",
        "Stay in the vehicle with seat belt fastened — the vehicle provides better protection than a ditch",
      ],
      correctIndex: 2,
      explanation:
        "If you cannot escape a tornado in a vehicle, exit immediately, move well away from the vehicle (which can be tossed by the tornado), and lie flat and face-down in the lowest available ditch or depression. Cover the back of your head and neck with your arms. Do NOT shelter under a highway overpass — overpasses create dangerous wind tunnels that concentrate debris and kill people seeking shelter there. Kansas is in the heart of Tornado Alley and tornado safety is a core topic in the Kansas Driver's License Manual.",
    },
    {
      question:
        "What payment method is required on the Kansas Turnpike (I-335)?",
      options: [
        "Cash only — credit cards are not accepted at toll plazas",
        "Exact change cash payment or K-TAG electronic transponder",
        "All lanes are free for Kansas-registered vehicles",
        "Monthly permit only — single-trip cash payment is not available",
      ],
      correctIndex: 1,
      explanation:
        "The Kansas Turnpike (I-335, also known as the Kansas Turnpike Authority sections of I-70 through Wichita) uses traditional toll collection. Drivers must either pay with exact change cash at toll plazas or use a K-TAG (Kansas electronic toll transponder) for automated payment. Bypassing a toll without payment is a toll violation. CDL drivers operating commercial vehicles pay commercial toll rates that differ from passenger car rates.",
    },
    {
      question:
        "What is the blood alcohol concentration (BAC) limit under Kansas DUI law for a driver who is 20 years old?",
      options: ["0.08%", "0.00%", "0.04%", "0.02%"],
      correctIndex: 3,
      explanation:
        "Kansas DUI law sets a BAC limit of 0.02% for drivers under 21 — a near-zero tolerance standard. Any detectable blood alcohol at or above 0.02% is a DUI violation for drivers under 21. For drivers 21 and older, the standard BAC limit is 0.08%. Kansas uses DUI (Driving Under the Influence) terminology. Penalties for underage DUI include mandatory license suspension and fines.",
    },
    {
      question:
        "I-70 through Kansas has a rural interstate speed limit of 75 mph. When might KDOT reduce or restrict speed on I-70?",
      options: [
        "KDOT never changes the 75 mph speed limit under any conditions",
        "Speed reductions are only used in construction zones, never for weather",
        "KDOT issues variable speed limits and crosswind restriction alerts during high-wind events, winter storms, or other hazardous conditions",
        "The 75 mph limit is advisory — Kansas drivers may exceed it at their discretion",
      ],
      correctIndex: 2,
      explanation:
        "While I-70 in rural Kansas has a 75 mph speed limit, KDOT monitors weather conditions and road hazards and can implement variable speed limits, crosswind restriction advisories for high-profile vehicles, and road closures during severe events. High winds, blizzards, ice events, and dust storms can all trigger KDOT alerts on I-70. Kansas has experienced dust storms (from agricultural fields) that reduce visibility to near zero and have caused multi-vehicle pileups on I-70. Drivers should monitor KDOT's 511 road conditions service before and during travel on I-70.",
    },
    {
      question:
        "What is the 75 mph rural interstate speed limit primarily applicable to in Kansas?",
      options: [
        "All Kansas roads including county roads and US highways",
        "Rural sections of I-70 and I-135 (and some other Kansas interstates)",
        "Only the Kansas Turnpike (I-335) during daylight hours",
        "Urban and suburban sections of I-70 near Wichita and Topeka",
      ],
      correctIndex: 1,
      explanation:
        "Kansas has a 75 mph speed limit on rural sections of its interstate highways, including I-70 and I-135. This higher speed limit applies on rural segments away from metropolitan areas. Within urban and suburban areas — such as near Wichita, Topeka, Kansas City, and other cities — speed limits on Kansas interstates are reduced to 65 or 70 mph. The 75 mph rural interstate limit is one of the higher rural interstate limits in the Great Plains region.",
    },
  ],
  faqs: [
    {
      question: "What is the Kansas knowledge test format?",
      answer:
        "The Kansas Department of Revenue (DOR), Division of Vehicles administers a 25-question multiple-choice knowledge test. You must correctly answer at least 20 questions — an 80% passing score — to pass. The test covers traffic laws, road signs, safe driving practices, and Kansas-specific topics including crosswind hazards on I-70, tornado protocol, open range law, and turnpike operations. The test is based on the Kansas Driver's License Manual.",
    },
    {
      question: "Which agency handles driver licensing in Kansas — is there a Kansas DMV?",
      answer:
        "Kansas does not have a Department of Motor Vehicles. All driver licensing in Kansas is handled by the Kansas Department of Revenue (DOR), Division of Vehicles. DOR Division of Vehicles offices are located throughout Kansas at the county level. When searching for a Kansas driver's license office, search for 'Kansas DOR' or 'Kansas Division of Vehicles' — not 'Kansas DMV.'",
    },
    {
      question: "What are Kansas's graduated licensing stages?",
      answer:
        "Kansas GDL has three stages. At age 14, teens can obtain an Instruction Permit after passing the knowledge test. Permit holders must be accompanied by a licensed driver 21 or older at all times. At age 15, after 1 year with the permit and 25 supervised driving hours (2 at night), a Restricted License is available after passing a driving test. The restricted license has nighttime and passenger limitations. At age 17, after 1 year on the restricted license with a clean record, a full unrestricted license is available.",
    },
    {
      question: "What are I-70 crosswind dangers in Kansas?",
      answer:
        "Kansas I-70 is notorious for sustained crosswinds of 30–50 mph — among the highest consistent crosswind conditions on any U.S. interstate. These crosswinds can push high-profile vehicles sideways, reducing traction and control. The flat Kansas terrain provides no natural windbreaks. KDOT monitors wind conditions and issues crosswind advisories for specific vehicle types (RVs, box trucks, enclosed trailers, empty flatbeds). Drivers of high-profile vehicles should monitor KDOT's 511 service before traveling I-70 during windy weather and may need to reduce speed significantly or wait for winds to subside.",
    },
    {
      question: "What are Kansas's cell phone and wireless device laws for drivers?",
      answer:
        "Kansas has two separate cell phone restrictions. First, texting is banned for ALL drivers at ALL times under KSA 8-15,111 — a $60 fine, primary enforcement (officers can stop you solely for texting). Second, SB 366, signed April 3, 2026, and effective July 1, 2026, bans handheld device use in school zones and construction/work zones. Warning citations only will be issued through July 1, 2027; fines ($60) begin July 2027. Kansas does NOT have a general ban on handheld calls on open roads — holding your phone to make a voice call on a rural highway is currently legal for most drivers. Exception: permit holders and restricted license holders may not use any wireless device at all while driving, except to report an emergency or illegal activity.",
    },
    {
      question: "What is the DUI BAC limit in Kansas?",
      answer:
        "Kansas DUI law uses DUI (Driving Under the Influence) terminology. The adult BAC limit is 0.08% or higher. For drivers under 21, the BAC limit is 0.02% — near-zero tolerance. Commercial vehicle operators face a 0.04% BAC limit when operating a CMV. Kansas DUI penalties include mandatory license suspension (30 days minimum for first offense), fines, possible jail time, and potential ignition interlock device requirements for license reinstatement.",
    },
    {
      question: "What is the open range rule in Kansas?",
      answer:
        "Kansas has different rules for different parts of the state. Eastern Kansas is generally fenced range: ranchers are legally responsible for keeping their livestock fenced off public roads, and a driver who hits cattle can seek damages from the rancher. Western Kansas is largely open range: livestock may legally be on public roads, and a driver who hits cattle in open range territory may be responsible for damages to the animals. Drivers in western Kansas should be especially alert on rural roads for cattle and watch for livestock crossing signs.",
    },
    {
      question: "What is the Kansas Turnpike and how are tolls collected?",
      answer:
        "The Kansas Turnpike Authority (KTA) operates tolled sections of Kansas interstate highways including I-335 (the main Kansas Turnpike between I-70 near Emporia and I-35 near Wichita) and portions of I-70 through the Wichita area. Tolls are collected at traditional toll plazas using either exact change cash payment or the K-TAG electronic transponder. Bypassing a toll plaza is a violation subject to fines. K-TAG transponders are available through the KTA and provide faster passage through toll plazas.",
    },
    {
      question: "What is the tornado safety protocol for Kansas drivers?",
      answer:
        "Kansas sits at the heart of Tornado Alley and experiences significant tornado activity. If a tornado warning is issued and a tornado threatens while you are driving, the safest actions are: drive at right angles to the tornado's path if you can safely escape it with time to spare; if you cannot escape, exit the vehicle immediately, move away from it, and lie flat and face-down in the lowest available ditch away from trees and power poles. Cover your head and neck with your arms. Never shelter under a highway overpass — the overpass creates a wind tunnel effect that concentrates and accelerates debris, which has caused fatalities in Kansas.",
    },
    {
      question: "What is Kansas's rural interstate speed limit?",
      answer:
        "Kansas has a 75 mph speed limit on rural sections of its interstate highways, including I-70 and I-135. This applies on rural segments away from urban and suburban areas. Near cities like Wichita, Topeka, and Kansas City, interstate speed limits drop to 65 or 70 mph. The 75 mph limit does not apply in construction zones (reduced limits are posted). Drivers should always obey posted speed limits and reduce speed below the posted limit when weather, traffic, or road conditions require it.",
    },
  ],
  relatedTests: [
    { label: "Kansas Motorcycle Practice Test", href: "/kansas-motorcycle-practice-test" },
    { label: "Kansas CDL Practice Test", href: "/kansas-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function KansasDmvPracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
