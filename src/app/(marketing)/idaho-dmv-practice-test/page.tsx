import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Idaho DMV Practice Test 2025 – Free ID Driver's License Exam Prep",
  description:
    "Prepare for your Idaho ITD knowledge test with free practice questions covering open range law, § 49-1401A handheld device law, Sawtooth mountain driving, Snake River Plain dust hazards, and Idaho-specific traffic laws. 40 questions, 85% to pass.",
  alternates: { canonical: "https://caredmvprep.com/idaho-dmv-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/idaho-dmv-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "Idaho",
  stateAbbr: "ID",
  testLabel: "DMV Practice Test",
  slug: "idaho-dmv-practice-test",
  headline: "Idaho DMV Practice Test 2025",
  intro:
    "The Idaho Transportation Department (ITD), Division of Motor Vehicles administers a 40-question knowledge test — one of the longest in the nation. You must answer at least 34 questions correctly (85%) to pass — one of the highest passing thresholds in the country. This free practice test covers Idaho-specific laws including the open range livestock rule, Idaho Code § 49-1401A handheld device restrictions, Sawtooth Scenic Byway mountain grades, Snake River Plain dust devil hazards, and Idaho's agricultural equipment season.",
  basedOn: "Idaho Transportation Department Driver's Manual",
  keyRules: [
    {
      icon: "🐄",
      rule: "Open Range Law: You Are Responsible for Hitting Cattle",
      detail:
        "Under Idaho Code § 25-2118, in open range areas, if you hit cattle on the road, YOU (the driver) are legally responsible for damages to the cattle — not the rancher. The driver must prove the animal was not lawfully in the right-of-way. This is the OPPOSITE of most states. Watch for livestock on rural roads.",
    },
    {
      icon: "📱",
      rule: "Idaho Code § 49-1401A: Handheld Device Restrictions",
      detail:
        "Idaho Code § 49-1401A bans all drivers from reading, typing, or watching on a handheld wireless device while driving — primary enforcement, meaning officers can stop drivers solely for this violation. Adults may make one-touch calls; under-18 drivers face a complete ban on all handheld use while driving. Fines: $75 first offense, $150 second, $300 third and subsequent. Hands-free (mounted dashboard/windshield) use is permitted.",
    },
    {
      icon: "⛰️",
      rule: "Sawtooth Mountains: Snow Any Month Above 7,000 ft",
      detail:
        "ID-75 (Sawtooth Scenic Byway) through the Sawtooth Mountains has steep grades, no-passing zones, and snowfall possible at any time of year above 7,000 feet elevation. Summer weather can change to snow within hours above Galena Summit. Plan accordingly and carry chains or traction devices.",
    },
    {
      icon: "🌪️",
      rule: "Snake River Plain: Dust Devil Hazard",
      detail:
        "Dust devils — small but powerful whirlwinds of dust and debris — form regularly on the dry Snake River Plain in southern Idaho on warm, sunny days. They can reduce visibility suddenly and without warning. Slow down and turn on headlights if a dust devil crosses your path.",
    },
    {
      icon: "🧒",
      rule: "Permit Age: 14½ Years Old",
      detail:
        "Idaho issues instruction permits at age 14½. Permit holders must be accompanied by a licensed driver 21 or older whenever driving. A provisional license is available at 15, and a full unrestricted license at 17 after meeting all GDL requirements.",
    },
    {
      icon: "🍺",
      rule: "DUI Threshold: 0.08% / 0.02% Under-21",
      detail:
        "Idaho uses DUI terminology with a 0.08% BAC limit for adults and a 0.02% limit for drivers under 21. DUI penalties in Idaho include mandatory license suspension, fines, possible ignition interlock device requirement, and potential jail time for repeat offenders.",
    },
    {
      icon: "🚜",
      rule: "Agricultural Equipment: Harvest Season Aug–Oct",
      detail:
        "Southern Idaho's potato and grain harvest runs from August through October, bringing heavy, wide, and slow-moving farm equipment onto rural roads. Drivers must slow down and only pass when safe. Agricultural equipment displaying an orange SMV triangle travels at 25 mph or less.",
    },
    {
      icon: "🏔️",
      rule: "Salmon River Canyon: Rockfall and Single-Lane Zones",
      detail:
        "US-95 through the Salmon River Canyon has sections with no guardrail, single-lane passing zones, and documented rockfall hazards. Drive at reduced speed, watch for falling rocks, and yield to oncoming vehicles on single-lane sections as required by posted signs.",
    },
  ],
  about: [
    "The Idaho Transportation Department (ITD), Division of Motor Vehicles, administers driver licensing for Idaho residents. Unlike most states, Idaho's knowledge test consists of 40 questions — one of the longest knowledge tests in the nation — requiring 34 correct answers (85%) to pass — one of the highest passing thresholds in the nation. The test covers Idaho's Driver's Manual including traffic laws, road signs, and Idaho-specific hazards. Idaho's permit age of 14½ allows young residents to begin learning to drive earlier than most states.",
    "Idaho's open range law (Idaho Code § 25-2118) is one of the most important laws for Idaho drivers to understand, and it is the opposite of what most people expect. In open range areas of Idaho, if a driver hits cattle on the road, the driver bears legal responsibility for damages to the animals — not the rancher. The rancher is not required to fence livestock out of the right-of-way in open range territory. This open range doctrine applies throughout much of rural southern and central Idaho and makes watching for livestock on roadways a legal — not merely a safety — obligation for Idaho drivers.",
    "Idaho Code § 49-1401A restricts handheld device use while driving — it bans reading, typing, and watching on a handheld device (primary enforcement), with a complete ban for drivers under 18. Adults may make one-touch calls with a handheld device; hands-free use is always permitted. Southern Idaho's Snake River Plain presents dust devil hazards on hot days, while the Sawtooth Mountains (ID-75) and Salmon River Canyon (US-95) present mountain driving challenges including steep grades, rockfall, and possible snowfall at elevation at any time of year. August through October brings heavy agricultural equipment traffic for potato and grain harvest in southern Idaho.",
  ],
  sampleQuestions: [
    {
      question:
        "Under Idaho Code § 25-2118 (open range law), if a driver hits cattle on a rural Idaho road, who is legally responsible for damages?",
      options: [
        "The rancher who owns the cattle, because ranchers are required to fence all livestock",
        "The driver, because in open range areas the driver must prove the animal was not lawfully in the right-of-way",
        "Neither party — livestock collisions are considered accidents with no liability",
        "The Idaho Transportation Department, because they manage public roads",
      ],
      correctIndex: 1,
      explanation:
        "Idaho's open range law is counterintuitive: in open range territory, livestock have a legal right to be on the road, and the driver who hits them is responsible for damages to the animals — not the rancher. The driver must prove the livestock were NOT lawfully in the right-of-way to avoid liability. This is the opposite of how liability works in fenced-range states, where ranchers are responsible for keeping animals off public roads. Open range territory covers much of rural southern and central Idaho.",
    },
    {
      question:
        "Idaho Code § 49-1401A restricts handheld device use while driving. Which of the following is prohibited for ALL drivers, including adults?",
      options: [
        "Using a GPS app on a phone mounted on the dashboard",
        "Talking through a Bluetooth headset",
        "Reading, typing, or watching on a handheld wireless device while driving",
        "Listening to music via a phone connected by aux cable",
      ],
      correctIndex: 2,
      explanation:
        "Idaho Code § 49-1401A prohibits ALL drivers from reading, typing, or watching content on a handheld wireless device while driving — this is primary enforcement, meaning an officer can stop a driver solely for this violation. Hands-free use (GPS app on a dashboard mount, Bluetooth calling) is permitted. Adults may make one-touch calls; drivers under 18 face a complete ban on all handheld use. Fines are $75 for a first offense, $150 for a second, and $300 for a third or subsequent violation.",
    },
    {
      question:
        "What is the minimum age to obtain an instruction permit in Idaho?",
      options: ["15 years old", "16 years old", "14½ years old", "14 years old"],
      correctIndex: 2,
      explanation:
        "Idaho issues instruction permits at age 14½ — among the youngest in the nation. Permit holders must be accompanied by a licensed driver who is at least 21 years old whenever they are operating a vehicle. A provisional license is available at age 15, and a full unrestricted license is available at age 17 after meeting all Graduated Driver License (GDL) requirements including supervised hours and a clean driving record.",
    },
    {
      question:
        "You are driving through southern Idaho's Snake River Plain on a sunny day and see a dust devil crossing the road ahead. What should you do?",
      options: [
        "Accelerate to pass through it quickly before it reaches your lane",
        "Slow down and turn on your headlights — dust devils can suddenly reduce visibility",
        "Swerve to avoid the dust devil even if it requires crossing the center line",
        "Dust devils pose no road hazard and require no driving adjustment",
      ],
      correctIndex: 1,
      explanation:
        "Dust devils on the Snake River Plain form when hot air near the ground rises rapidly, creating a rotating column of dust, debris, and sometimes small rocks. They can appear suddenly and reduce visibility to near zero for a few seconds as they cross a road. The correct response is to slow down and turn on headlights to make your vehicle more visible to others. Do not swerve into other lanes. Dust devils are generally short-lived but can carry enough debris to cause windshield chips and distract drivers.",
    },
    {
      question:
        "On ID-75 (Sawtooth Scenic Byway) above 7,000 feet elevation, what weather hazard can occur at any month of the year?",
      options: [
        "Flooding from snowmelt that overflows onto the road",
        "Lightning strikes that can disable vehicle electrical systems",
        "Snow or blizzard conditions that can close the road or create icy surfaces",
        "Flash floods from summer thunderstorms are the only elevation hazard",
      ],
      correctIndex: 2,
      explanation:
        "The Sawtooth Mountains in central Idaho reach elevations above 7,000 feet on ID-75, and snowfall is possible at any time of year at these elevations — including July and August. A summer afternoon that began clear can produce a snowstorm by evening at high elevation. Drivers crossing Galena Summit on ID-75 should check weather forecasts, carry chains or traction devices in any season, and be prepared for rapidly changing conditions. The road is also steep with no-passing zones.",
    },
    {
      question:
        "What is the BAC limit under Idaho DUI law for a driver under 21 years old?",
      options: ["0.08%", "0.00%", "0.04%", "0.02%"],
      correctIndex: 3,
      explanation:
        "Idaho's DUI law sets a BAC limit of 0.02% for drivers under 21 — a near-zero tolerance policy. For drivers 21 and older, the standard 0.08% BAC limit applies. Idaho DUI penalties include mandatory license suspension, fines, and potential ignition interlock device requirements. Even small amounts of alcohol impair driving ability, and the 0.02% threshold reflects the state's policy that underage drivers should have virtually no alcohol in their system when operating a vehicle.",
    },
    {
      question:
        "During potato harvest season in southern Idaho (August through October), what type of vehicle will frequently share rural roads with passenger vehicles?",
      options: [
        "Military convoy vehicles with right-of-way priority",
        "Heavy, wide, and slow-moving agricultural equipment traveling at 25 mph or less",
        "Oversized load transports that block all traffic behind them",
        "Potato trucks traveling at high speeds to reach processing facilities quickly",
      ],
      correctIndex: 1,
      explanation:
        "Southern Idaho's potato and grain harvest season from August through October brings heavy agricultural equipment onto rural roads — tractors, combines, potato harvesters, and oversize farm implements. These vehicles display an orange slow-moving vehicle (SMV) triangle on the rear and travel at 25 mph or less. Drivers must reduce speed when following agricultural equipment, maintain safe following distance to see ahead, and only pass when there is sufficient sight distance and it is legal to do so.",
    },
    {
      question:
        "US-95 through the Salmon River Canyon in Idaho presents which combination of hazards?",
      options: [
        "High-speed limits and smooth pavement with no documented hazards",
        "Sections with no guardrail, single-lane passing zones, and documented rockfall hazards",
        "Annual flooding from the Salmon River that closes the road for weeks",
        "Dense conifer forests that block GPS signals, making navigation impossible",
      ],
      correctIndex: 1,
      explanation:
        "US-95 through the Salmon River Canyon in central Idaho has documented rockfall hazards from the steep canyon walls above, road sections carved into cliffsides with no guardrail, and single-lane passing zones at certain narrow canyon sections where drivers must yield according to posted signs. Drivers should reduce speed from posted limits when conditions warrant, watch for rock debris on the road surface, and pay attention to single-lane zone signage. The canyon route is scenic but requires attentive, conservative driving.",
    },
    {
      question:
        "What is the total number of questions on Idaho's driver's license knowledge test?",
      options: ["20 questions", "25 questions", "35 questions", "40 questions"],
      correctIndex: 3,
      explanation:
        "Idaho's driver's license knowledge test consists of 40 questions — one of the longest knowledge tests of any U.S. state. You must correctly answer at least 34 questions (85%) to pass — one of the highest thresholds in the country. The test covers Idaho's Driver's Manual including traffic laws, road signs, safe driving practices, and Idaho-specific topics such as the open range law, mountain driving, and agricultural equipment sharing roads. If you fail, you may retake the test after a waiting period.",
    },
    {
      question:
        "Which organization administers driver licensing in Idaho?",
      options: [
        "Idaho Department of Motor Vehicles (DMV)",
        "Idaho Department of Transportation (ITD), Division of Motor Vehicles",
        "Idaho State Police Driver Services",
        "Idaho Secretary of State Driver Registry",
      ],
      correctIndex: 1,
      explanation:
        "Driver licensing in Idaho is administered by the Idaho Transportation Department (ITD), Division of Motor Vehicles. Idaho does not have a standalone DMV department — the licensing function is part of the transportation department. ITD driver's license offices are located throughout Idaho in cities and counties. When searching for where to get an Idaho driver's license, look for 'ITD' or 'Idaho Transportation Department' rather than 'Idaho DMV.'",
    },
  ],
  faqs: [
    {
      question: "What is the Idaho driver's license knowledge test format?",
      answer:
        "The Idaho Transportation Department (ITD) administers a 40-question multiple-choice knowledge test — one of the longest in the nation. You must correctly answer at least 34 questions (85%) to pass. The test covers traffic laws, road signs, safe driving practices, and Idaho-specific topics including the open range law, mountain driving, and seasonal hazards. The test is based on the Idaho Driver's Manual. If you fail, a waiting period applies before retaking.",
    },
    {
      question: "What is Idaho's open range law and how does it affect drivers?",
      answer:
        "Idaho Code § 25-2118 establishes open range territory in much of rural Idaho. In open range areas, livestock have a legal right to be on the road, and if a driver hits cattle, the driver is legally responsible for any damages to the animals — not the rancher. Ranchers are not required to fence livestock out of public roads in open range territory. Drivers must prove that the livestock were not lawfully in the right-of-way to avoid liability. This is the opposite of how liability works in fenced-range states and is critical knowledge for Idaho drivers on rural roads.",
    },
    {
      question: "What are Idaho's graduated licensing stages?",
      answer:
        "Idaho's GDL has three stages. At age 14½, teens may obtain an instruction permit after passing the knowledge test. The permit holder must be accompanied by a licensed driver 21 or older at all times. At age 15, after at least 6 months with the permit and completing required supervised driving hours, a Supervised Instruction Permit (restricted license) is available after passing a road skills test. At age 17, after meeting all GDL requirements with a clean record, a full unrestricted license is available.",
    },
    {
      question: "What does Idaho Code § 49-1401A prohibit for drivers?",
      answer:
        "Idaho Code § 49-1401A prohibits ALL drivers from reading, typing, or watching on a handheld wireless device while driving — primary enforcement, meaning an officer can stop a driver solely for this violation. Adults may make a one-touch call using a handheld device, but drivers under 18 face a complete ban on all handheld device use while driving. Hands-free use — a phone in a dashboard or windshield mount, Bluetooth calling, or earpiece — is permitted for all drivers. Fines are $75 (first offense), $150 (second), and $300 (third or subsequent).",
    },
    {
      question: "What mountain driving hazards should Idaho drivers be aware of?",
      answer:
        "Idaho has significant mountain driving hazards on several routes. ID-75 (Sawtooth Scenic Byway) crosses Galena Summit at over 8,700 feet with steep grades and snowfall possible any month of year at elevation. US-95 through the Salmon River Canyon has documented rockfall, sections with no guardrail, and single-lane passing zones. US-12 over Lolo Pass along the Clearwater River can have avalanche and ice hazards in winter. Drivers should carry emergency supplies, check weather and road conditions before mountain travel, and be prepared for rapid weather changes at elevation.",
    },
    {
      question: "What is the BAC limit for Idaho DUI?",
      answer:
        "Idaho DUI law sets a BAC limit of 0.08% for adult drivers 21 and older and a limit of 0.02% for drivers under 21. Commercial drivers operating a CMV face a 0.04% limit. DUI penalties in Idaho include mandatory license suspension (90 days minimum for a first offense), fines, possible jail time, and potential ignition interlock device requirements. Idaho uses 'DUI' (Driving Under the Influence) terminology.",
    },
    {
      question: "What agricultural driving hazards are specific to southern Idaho?",
      answer:
        "Southern Idaho's agricultural industry — primarily potatoes, grain, and dairy — creates specific road hazards from August through October during harvest season. Heavy, wide, and slow-moving farm equipment (potato harvesters, combines, grain wagons) travels on rural roads at 25 mph or less. Drivers must slow down, maintain safe following distance, and pass only when safe. On dry days in the Snake River Plain, potato and grain harvest also creates dust plumes that can reduce visibility on adjacent roads. Dust devils are common on hot, sunny days.",
    },
    {
      question: "What is Idaho's permit age and who can supervise a permit holder?",
      answer:
        "Idaho's instruction permit is available at age 14½. The permit holder must be accompanied at all times by a licensed driver who is at least 21 years old and seated in the front seat. Idaho law requires the supervising driver to hold a valid Idaho driver's license. Permit holders may not drive after midnight or carry passengers outside the immediate family without the supervising driver present. After meeting all GDL requirements, a provisional license is available at age 15.",
    },
    {
      question: "What are dust devils and why are they a hazard on Idaho roads?",
      answer:
        "Dust devils are small but intense whirlwinds that form when ground-level hot air rises rapidly, creating a rotating column of dust, dry soil, and debris. They are common on the Snake River Plain in southern Idaho on hot, sunny days. Dust devils can appear suddenly on or near roads and momentarily reduce visibility to near zero. They can also carry rocks and debris that can chip windshields. Drivers should slow down and turn on headlights when a dust devil is near their path, but should not swerve suddenly into other lanes to avoid them.",
    },
    {
      question: "Does Idaho have a vehicle safety inspection requirement?",
      answer:
        "Idaho does not require periodic vehicle safety inspections for most passenger vehicles. Vehicles must meet safety equipment standards (lights, brakes, etc.) to operate legally on Idaho roads, but Idaho does not have a mandatory annual or biennial inspection program. Some commercial vehicles are subject to FMCSA inspection requirements. New residents registering vehicles in Idaho from states with inspection requirements should still ensure their vehicles are in safe operating condition, as defective equipment violations can result in traffic citations.",
    },
  ],
  relatedTests: [
    { label: "Idaho Motorcycle Practice Test", href: "/idaho-motorcycle-practice-test" },
    { label: "Idaho CDL Practice Test", href: "/idaho-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function IdahoDmvPracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
