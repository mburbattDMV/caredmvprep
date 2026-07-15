import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Idaho Motorcycle Practice Test 2025 – Free ID Endorsement Exam Prep",
  description:
    "Prepare for your Idaho motorcycle endorsement test with free practice questions covering Idaho's partial helmet law, open range cattle crossing technique, Sawtooth mountain grades, dust devil hazards, and ITD DUI rules.",
  alternates: { canonical: "https://caredmvprep.com/idaho-motorcycle-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/idaho-motorcycle-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "Idaho",
  stateAbbr: "ID",
  testLabel: "Motorcycle Practice Test",
  slug: "idaho-motorcycle-practice-test",
  headline: "Idaho Motorcycle Practice Test 2025",
  intro:
    "Idaho requires a motorcycle endorsement on your driver's license to operate a motorcycle. The endorsement test is administered by the Idaho Transportation Department (ITD). Idaho requires helmets only for riders under 18 — adult riders may ride without a helmet. Idaho riders face unique hazards including open range cattle on roads, Sawtooth mountain descents, Snake River Plain dust devils, and agricultural equipment during harvest season.",
  basedOn: "Idaho Transportation Department Motorcycle Operator Manual",
  about: [
    "Idaho requires motorcycle helmets only for riders under 18 years old — adult riders 18 and older are not required by law to wear a helmet in Idaho. However, the ITD and Idaho State Police strongly recommend helmet use for all riders. The motorcycle endorsement is obtained through ITD by passing a knowledge test and skills test, or by completing an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse, which waives the skills test. Idaho's DUI law applies to motorcycle operators with a 0.02% BAC limit for riders under 21 and 0.08% for adults.",
    "Motorcycle riding in Idaho presents hazards unique to the state. Idaho's open range law means cattle can legally be on rural roads, and riders must scan for livestock on rural routes. Snake River Plain dust devils can appear suddenly and reduce visibility. Sawtooth Mountain roads (ID-75) have steep grades where brake fade is a risk on descents. Dust from potato and grain harvest operations in August through October can create sudden visibility reductions on adjacent roads in southern Idaho. Idaho Code § 49-1401A also applies to motorcycle operators — riders may not read, type, or watch on a handheld wireless device while operating a motorcycle (primary enforcement).",
  ],
  sampleQuestions: [
    {
      question:
        "Under Idaho law, who is required to wear a helmet while riding a motorcycle?",
      options: [
        "All motorcycle operators regardless of age",
        "Only riders under 21 years old",
        "Only riders under 18 years old",
        "Helmets are optional for all Idaho motorcycle riders",
      ],
      correctIndex: 2,
      explanation:
        "Idaho requires motorcycle helmets only for operators and passengers under 18 years old. Adult riders 18 and older are not required by Idaho law to wear a helmet. However, the ITD and safety organizations strongly recommend helmet use for all riders, as helmets significantly reduce the risk of fatal head injuries. Riders who choose not to wear a helmet at 18 or older ride without this protection at their own risk.",
    },
    {
      question:
        "You are riding through open range territory in southern Idaho and see cattle ahead on the road. Under Idaho's open range law, what is the legal situation?",
      options: [
        "The rancher must pay for any damage to your motorcycle if you hit their cattle",
        "You must stop and wait — cattle in open range territory have a legal right to be on the road, and hitting them makes you responsible for damages",
        "You have the right of way as the road user and can proceed at normal speed",
        "The cattle must be reported to the Idaho Transportation Department for removal",
      ],
      correctIndex: 1,
      explanation:
        "Idaho Code § 25-2118 establishes open range territory where livestock have a legal right to be on the road. If a motorcycle rider hits cattle in open range territory, the rider is legally responsible for damages to the animals — not the rancher. This is the opposite of fenced-range states. For motorcycle riders, a collision with a 1,000-pound cow at highway speed is almost certainly fatal. In open range territory, the legal and survival imperative is to scan continuously for livestock and stop well short of any animal on the road.",
    },
    {
      question:
        "You are riding on the Snake River Plain on a hot summer day and see a dust devil forming ahead on the road. What is the safest action?",
      options: [
        "Accelerate to pass through the dust devil before it crosses your lane",
        "Slow down, turn on your headlight, and prepare for sudden visibility reduction as the dust devil crosses",
        "Swerve into the opposite lane to avoid the dust devil",
        "Dust devils on motorcycles are harmless — maintain normal speed",
      ],
      correctIndex: 1,
      explanation:
        "Dust devils are rotating columns of dust and debris that can reduce visibility suddenly as they cross a road. On a motorcycle, the debris carried by a dust devil (including rocks and sand) can hit the rider and reduce visibility to near zero for several seconds. The safest response is to slow down significantly before encountering the dust devil, turn on your headlight so you are visible to other vehicles, and proceed slowly through the reduction in visibility. Do not swerve into opposing traffic.",
    },
    {
      question:
        "On a long descent on ID-75 (Sawtooth Scenic Byway) on your motorcycle, what technique reduces brake fade?",
      options: [
        "Apply both brakes continuously and firmly throughout the descent",
        "Use only the rear brake on descents to avoid front-wheel lockup",
        "Downshift to a lower gear before the descent and use engine braking, with brief brake applications as needed",
        "Increase speed at the top of the descent to carry momentum through",
      ],
      correctIndex: 2,
      explanation:
        "Brake fade occurs when motorcycle brakes overheat from continuous application on a long descent. On steep Sawtooth Mountain descents like Galena Summit on ID-75, the correct technique is to downshift to a lower gear before beginning the descent and use engine braking to control speed. Apply the brakes briefly and release them rather than holding them continuously. Proper motorcycle braking technique uses both front and rear brakes proportionally, with the front providing most stopping power when used correctly.",
    },
    {
      question:
        "What is the DUI blood alcohol concentration (BAC) limit for an Idaho motorcycle rider who is 20 years old?",
      options: ["0.08%", "0.00%", "0.04%", "0.02%"],
      correctIndex: 3,
      explanation:
        "Idaho's DUI law sets a BAC limit of 0.02% for riders under 21 — a near-zero tolerance standard. Any BAC at or above 0.02% is a DUI violation for an underage motorcycle rider in Idaho. For riders 21 and older, the standard 0.08% limit applies. DUI on a motorcycle is treated the same as DUI in a vehicle under Idaho law, including mandatory license suspension and fines. Alcohol impairs the balance and reaction time critical for motorcycle control.",
    },
    {
      question:
        "During Idaho's potato harvest season (August–October), what specific visibility hazard do motorcycle riders face on roads adjacent to harvest operations?",
      options: [
        "Potato trucks create wake turbulence that destabilizes motorcycles when passed",
        "Dust from harvest equipment and potato fields can create sudden visibility reductions on adjacent roads",
        "Harvest equipment creates heat mirages on road surfaces that confuse motorcycle riders",
        "Night harvest lights temporarily blind approaching motorcycle riders",
      ],
      correctIndex: 1,
      explanation:
        "Idaho's potato and grain harvest operations generate large dust plumes from fields and harvest equipment. Roads adjacent to harvesting fields in southern Idaho can experience sudden dramatic visibility reductions when wind carries dust across the road. Motorcycle riders in these areas during August through October should be especially alert for dust plumes, reduce speed when dust is visible, use their headlight for visibility, and maintain greater following distance behind agricultural equipment that may stop suddenly or turn into field driveways.",
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
      question: "Is a helmet required to ride a motorcycle in Idaho?",
      answer:
        "Idaho requires helmets only for motorcycle operators and passengers under 18 years old. Riders who are 18 or older are not required by Idaho law to wear a helmet. However, the Idaho Transportation Department and all major safety organizations strongly recommend helmet use for riders of all ages, as helmets are the single most effective protection against fatal head injuries in motorcycle crashes. Eye protection is required for all riders if the motorcycle does not have a windshield.",
    },
    {
      question: "How do I get a motorcycle endorsement in Idaho?",
      answer:
        "To obtain a motorcycle endorsement in Idaho, visit an Idaho Transportation Department (ITD) driver's license office and pass a motorcycle knowledge test. You must then either pass a motorcycle riding skills test at an ITD testing location, or complete an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse, which waives the skills test. The endorsement is added to your Idaho driver's license. Completing the MSF course may also qualify you for insurance discounts.",
    },
    {
      question: "How does Idaho's open range law affect motorcycle riders?",
      answer:
        "Idaho Code § 25-2118 (open range law) means that in open range territory — much of rural southern and central Idaho — livestock legally have the right to be on the road. If a motorcycle rider hits cattle in open range territory, the rider may be legally responsible for damages to the animals. More importantly from a safety perspective, a collision between a motorcycle and a 1,000-pound cow at speed is almost certainly fatal for the rider. Motorcycle riders should treat all rural roads in Idaho as potentially having livestock, scan continuously, and slow down when visibility is limited.",
    },
    {
      question: "What mountain riding hazards exist on Idaho's scenic byways?",
      answer:
        "Idaho's scenic mountain routes present serious motorcycle riding challenges. ID-75 (Sawtooth Scenic Byway) crosses Galena Summit at over 8,700 feet with steep grades, limited guardrails, and snowfall possible any month of year at elevation. US-95 through the Salmon River Canyon has rockfall hazards, sections with no guardrail, and single-lane passing zones. US-12 over Lolo Pass can have ice and avalanche conditions in winter. Riders should check weather conditions, not ride with bald or cold-temperature tires, and downshift before descending steep grades.",
    },
    {
      question: "What are the DUI rules for motorcycle riders in Idaho?",
      answer:
        "Idaho DUI law applies fully to motorcycle operators. A BAC of 0.08% or higher is a DUI for riders 21 and older. For riders under 21, the limit is 0.02%. Commercial motor vehicle operators face a 0.04% limit. Idaho DUI penalties include mandatory license suspension (minimum 90 days for first offense), fines, possible jail time, and potential ignition interlock device requirements. Refusing a chemical BAC test results in automatic license suspension. Alcohol significantly impairs the balance, coordination, and reaction time required for safe motorcycle operation.",
  },
    {
      question: "What documents do I need to bring to the Idaho DMV for my motorcycle knowledge test?",
      answer:
        "For the motorcycle knowledge test in Idaho, you typically need to bring a valid form of ID (driver's license or ID card), proof of residency (if not already on file), and the application fee. If you are under 18, you may also need a parent or guardian's signature on a minor consent form. Check the Idaho DMV website before your visit to confirm current requirements, as they can change.",
    },
    {
      question: "How long is the Idaho motorcycle permit valid, and can I ride alone with it?",
      answer:
        "Motorcycle learner's permit validity varies by state, typically ranging from 90 days to 2 years. With a permit in Idaho, you are generally restricted from riding at night, on highways, or carrying passengers. These restrictions ensure new riders gain experience safely before obtaining a full license. Check the Idaho DMV website for specific permit restrictions and validity periods in your state.",
    },
    {
      question: "Is a motorcycle endorsement required in Idaho, or is it a separate license?",
      answer:
        "The structure varies by state. Some states, including Idaho, add a motorcycle endorsement (typically marked as 'M') to your existing driver's license, while others issue a separate motorcycle license or permit. Either way, you must pass a motorcycle knowledge test and, in most cases, a riding skills test or approved safety course before you can legally operate a motorcycle on public roads.",
    },
    {
      question: "What types of motorcycles require a motorcycle license in Idaho?",
      answer:
        "In Idaho, a motorcycle license or endorsement is generally required to operate any two-wheeled, three-wheeled, or motor-driven cycle above a certain engine displacement or speed threshold. This includes standard motorcycles, sport bikes, cruisers, and most scooters above 50cc. Mopeds (typically under 50cc, max speed 30 mph) may have different requirements — check the Idaho DMV's specific definitions. Electric motorcycles and e-bikes are subject to separate regulations based on their maximum speed and motor output.",
    },
    {
      question: "Does completing a motorcycle safety course waive the skills test in Idaho?",
      answer:
        "In many states, completing an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse or an equivalent state-approved program waives the DMV riding skills test requirement. Some states also waive the knowledge test for course graduates. Idaho DMV policies on course waivers vary — check the DMV website or contact them directly to confirm which approved courses qualify for test waivers and whether any age restrictions apply.",
    },
  ],
  relatedTests: [
    { label: "Idaho DMV Practice Test", href: "/idaho-dmv-practice-test" },
    { label: "Idaho CDL Practice Test", href: "/idaho-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function IdahoMotorcyclePracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
