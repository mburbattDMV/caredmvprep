import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Kansas Motorcycle Practice Test 2025 – Free KS Endorsement Exam Prep",
  description:
    "Prepare for your Kansas motorcycle endorsement test with free practice questions covering Kansas's adult helmet choice law, extreme I-70 crosswind riding techniques, harvest dust plume hazards, and Kansas DUI rules for riders.",
  alternates: { canonical: "https://caredmvprep.com/kansas-motorcycle-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/kansas-motorcycle-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "Kansas",
  stateAbbr: "KS",
  testLabel: "Motorcycle Practice Test",
  slug: "kansas-motorcycle-practice-test",
  headline: "Kansas Motorcycle Practice Test 2025",
  intro:
    "Kansas requires a motorcycle endorsement on your driver's license to operate a motorcycle. The endorsement test is administered by the Kansas Department of Revenue (DOR), Division of Vehicles. Kansas allows adult riders to choose whether to wear a helmet. Kansas motorcycle riders face extreme crosswind conditions on I-70, harvest-season dust plumes from wheat and grain operations, tornado protocol on flat terrain, and the open range cattle hazard in western Kansas.",
  basedOn: "Kansas DOR Division of Vehicles Motorcycle Operator Manual",
  about: [
    "Kansas does not require helmets for motorcycle operators 18 and older — adult riders may legally choose whether to wear a helmet. The Kansas DOR strongly recommends helmet use for all riders, but it is not legally required for adults. The motorcycle endorsement is obtained through Kansas DOR by passing a knowledge test and skills test, or by completing an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse which waives the skills test. Kansas DUI law applies to motorcycle operators with a 0.02% BAC limit for riders under 21 and 0.08% for adults.",
    "Motorcycle riding in Kansas presents unique challenges. I-70's sustained crosswinds of 30–50 mph make it one of the most demanding interstate rides in the country for motorcyclists — crosswind technique is essential knowledge for Kansas riders. Wheat harvest in June and corn/soybean harvest in October create dust plumes from combines adjacent to rural roads that can suddenly reduce visibility to near zero. Tornado protocol on a motorcycle in Kansas's flat terrain is critical. In western Kansas, the open range law means cattle may be on rural roads — for a motorcycle rider, this is an acute danger requiring constant scanning.",
  ],
  sampleQuestions: [
    {
      question:
        "Under Kansas law, who is required to wear a helmet while riding a motorcycle?",
      options: [
        "All motorcycle operators regardless of age",
        "Only riders under 21 years old",
        "Only riders under 18 years old",
        "Kansas does not require helmets for motorcycle operators 18 and older",
      ],
      correctIndex: 3,
      explanation:
        "Kansas does not require motorcycle helmets for operators 18 years of age or older. Adult riders in Kansas may legally choose whether to wear a helmet. The Kansas DOR and safety organizations strongly recommend helmet use for all riders, as helmets significantly reduce the risk of fatal head injuries. Eye protection is required for all riders whose motorcycle does not have a windscreen. Riders under 18 are required to wear a helmet.",
    },
    {
      question:
        "You are riding a motorcycle on Kansas I-70 in a sustained 40 mph crosswind from the south. What is the correct technique?",
      options: [
        "Increase speed to reduce the time spent in crosswind exposure",
        "Lean the motorcycle into the wind, reduce speed, and grip the handlebars firmly while monitoring lane position",
        "Move to the far right edge of the lane to use the shoulder as a buffer zone",
        "Stop on the shoulder and wait for the wind to die down",
      ],
      correctIndex: 1,
      explanation:
        "In sustained crosswind conditions on Kansas I-70, the correct motorcycle technique is to lean slightly into the wind to counteract its push, reduce speed to improve stability and control, grip the handlebars firmly, and be alert to sudden changes in wind intensity (gusts can be much stronger than sustained wind). Lane position should be adjusted away from the direction of the crosswind to give yourself room if a gust pushes you. Be especially cautious when passing large trucks or when emerging from behind a windbreak (overpass, hill, or stand of trees) where protected air suddenly gives way to full crosswind.",
    },
    {
      question:
        "During Kansas wheat harvest (typically in June), what visibility hazard do motorcycle riders face on rural roads?",
      options: [
        "Straw bales stacked on road shoulders that narrow the usable lane",
        "Dust plumes from combines and grain equipment operating in adjacent fields can suddenly reduce road visibility to near zero",
        "Wheat chaff accumulates on road surfaces and acts like a slippery coating",
        "Combines park on road shoulders while waiting for grain carts and block the lane",
      ],
      correctIndex: 1,
      explanation:
        "During Kansas wheat harvest, combines operating in fields adjacent to rural roads throw up enormous dust plumes. When wind carries this dust across a road, visibility can drop from clear to near-zero within seconds. For a motorcycle rider, this sudden visibility reduction is extremely dangerous. The correct response is to reduce speed significantly when dust is visible near the road, turn on your headlight to increase visibility to other drivers, and avoid riding near active harvest fields on windy days. Grain chaff and dust can also accumulate on road surfaces, reducing tire traction.",
    },
    {
      question:
        "In western Kansas open range territory, you are riding a motorcycle when cattle appear on the road ahead. What is the correct action?",
      options: [
        "Honk your horn and maintain speed — cattle will move when they hear traffic",
        "Slow to a stop as far from the cattle as possible and wait for them to clear the road",
        "Weave through the cattle carefully at low speed",
        "Use your right of way as a road user and proceed past the cattle",
      ],
      correctIndex: 1,
      explanation:
        "In Kansas open range territory (western Kansas), cattle have a legal right to be on the road. On a motorcycle, hitting a 1,000-pound cow at any speed is likely fatal for the rider. Slow to a complete stop as far from the cattle as possible. Do not weave through the herd — cattle are unpredictable and may move suddenly. Wait for the cattle to completely clear the road before proceeding slowly. Honking may cause cattle to bolt unpredictably. Scan for additional cattle on the roadsides as more animals may follow.",
    },
    {
      question:
        "What is the Kansas DUI BAC limit for a motorcycle rider who is 19 years old?",
      options: ["0.08%", "0.00%", "0.04%", "0.02%"],
      correctIndex: 3,
      explanation:
        "Kansas DUI law sets a BAC limit of 0.02% for motorcycle riders under 21 — a near-zero tolerance standard. Any detectable blood alcohol at or above 0.02% is a DUI violation for an underage rider. For riders 21 and older, the standard 0.08% BAC limit applies. Alcohol impairs the balance, coordination, and reaction time essential for safe motorcycle operation, and even small amounts can significantly degrade riding ability.",
    },
    {
      question:
        "You are riding a motorcycle on a rural Kansas road when a tornado warning is issued and a funnel cloud is visible. What is the safest action for a motorcycle rider?",
      options: [
        "Ride at maximum speed at right angles to the tornado path",
        "Shelter under the nearest highway overpass with the motorcycle beside you",
        "Dismount immediately, leave the motorcycle, and lie flat in a low ditch away from the bike and all trees",
        "Lay the motorcycle down on its side and shelter behind it for protection",
      ],
      correctIndex: 2,
      explanation:
        "A motorcycle provides zero protection against a tornado. If a tornado is approaching and escape is not possible, dismount immediately, move well away from the motorcycle (it will be tossed and can injure you), get away from trees and power poles, and lie flat face-down in the lowest available ditch or depression with arms over your head protecting your neck. Never shelter under an overpass — the overpass creates a deadly wind tunnel that concentrates debris. Kansas's flat terrain makes this scenario a real possibility for motorcycle riders.",
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
      question: "Is a helmet required to ride a motorcycle in Kansas?",
      answer:
        "Kansas does not require motorcycle helmets for operators 18 years old and older. Adult riders may legally choose whether to wear a helmet. Riders under 18 are required to wear a helmet. However, the Kansas DOR and all major safety organizations strongly recommend helmet use for riders of all ages, as helmets are proven to dramatically reduce the risk of fatal head injury in crashes. Eye protection is required if the motorcycle does not have a windscreen.",
    },
    {
      question: "How do I get a motorcycle endorsement in Kansas?",
      answer:
        "To obtain a motorcycle endorsement in Kansas, visit a Kansas Department of Revenue (DOR), Division of Vehicles office and pass a motorcycle knowledge test. You must then either pass a motorcycle riding skills test at a DOR testing site or complete an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse, which waives the skills test. The endorsement is added to your existing Kansas driver's license. Completing the MSF course may qualify you for insurance discounts.",
    },
    {
      question: "What crosswind hazards do Kansas motorcycle riders face on I-70?",
      answer:
        "Kansas I-70 regularly experiences sustained crosswinds of 30–50 mph — among the highest consistent crosswind conditions on any U.S. interstate. For motorcycle riders, these conditions require leaning into the wind to counteract lateral push, reducing speed significantly, and gripping the handlebars firmly. Sudden gusts when emerging from behind an overpass, windbreak, or large truck can be particularly dangerous. KDOT issues crosswind advisories, and riders should check conditions before traveling I-70 during windy weather. Some riders choose to avoid I-70 entirely in extreme wind events.",
    },
    {
      question: "What DUI rules apply to motorcycle riders in Kansas?",
      answer:
        "Kansas DUI law applies fully to motorcycle operators. A BAC of 0.08% or higher is DUI for riders 21 and older. For riders under 21, the BAC limit is 0.02%. Penalties include mandatory license suspension (30 days minimum for first offense), fines, possible jail time, and potential ignition interlock device requirements. Refusing a chemical BAC test results in automatic license suspension under Kansas implied consent law. Alcohol significantly impairs the balance, coordination, and reaction time required for safe motorcycle operation.",
    },
    {
      question: "What agricultural hazards should Kansas motorcycle riders be aware of?",
      answer:
        "Kansas's extensive wheat, corn, and soybean agricultural operations create specific motorcycle riding hazards. During wheat harvest (typically June) and corn/soybean harvest (October), combine operations adjacent to rural roads generate large dust plumes that can reduce visibility to near zero. Grain trucks on rural roads create loose gravel and dust in their wake. In open range western Kansas, cattle may be on rural roads. Riders should check conditions before riding near active harvest operations, use headlights for visibility in dusty conditions, and reduce speed significantly when dust plumes are visible near roads.",
    },
    {
      question: "What documents do I need to bring to the Kansas DOR for my motorcycle knowledge test?",
      answer:
        "For the motorcycle knowledge test in Kansas, bring your current Kansas driver's license (or ID card if you do not yet have a license), and the applicable application fee. If you are under 18, a parent or guardian's signature on the minor consent form is required. Visit a Kansas Department of Revenue (DOR), Division of Vehicles office — not a 'Kansas DMV,' which does not exist. Find your nearest office at ksrevenue.gov/dovindex.html.",
    },
    {
      question: "How does the Kansas motorcycle endorsement process work?",
      answer:
        "Kansas adds a motorcycle endorsement (Class M) to your existing driver's license. You must visit a Kansas DOR Division of Vehicles office, pass the motorcycle knowledge test (25 questions, 80% to pass), and then either pass the DOR riding skills test at a DOR facility or present a completion certificate from an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse (BRC) or Rider 101 course from a Kansas-approved provider — which waives the riding skills test. Your DOR endorsement fee will be collected at that visit. You cannot ride a motorcycle on public roads until the endorsement appears on your license.",
    },
    {
      question: "Is a motorcycle endorsement required in Kansas, or is it a separate license?",
      answer:
        "Kansas adds a motorcycle endorsement (marked as 'M') to your existing driver's license — it is not a separate license. To ride legally on Kansas public roads you must hold either a valid Kansas driver's license with the M endorsement, or a separate motorcycle-only license (available if you do not have a standard driver's license). The endorsement requires passing the motorcycle knowledge test and either the DOR riding skills test or completing an approved MSF Basic RiderCourse (which waives the skills test).",
    },
    {
      question: "What types of vehicles require a motorcycle endorsement in Kansas?",
      answer:
        "In Kansas, a motorcycle endorsement is required for any motorized two-wheeled vehicle (motorcycle) or motor-driven cycle. Standard motorcycles, sport bikes, cruisers, and scooters above 50cc generally require the endorsement. Mopeds (typically 50cc or under, max 30 mph by design) may be operated without a motorcycle endorsement but do require a valid driver's license. Electric motorcycles and larger electric two-wheeled vehicles are treated as motorcycles — check the Kansas DOR for current definitions on newer vehicle classes.",
    },
    {
      question: "Does completing a motorcycle safety course waive the skills test in Kansas?",
      answer:
        "Yes — in Kansas, completing an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse (BRC) or an approved Rider 101/BRC course from a Kansas-approved provider waives the DOR riding skills test. You still must pass the motorcycle knowledge test at a DOR Division of Vehicles office. In-person approved courses from some providers (such as Motorcycle Rider University's Kansas-approved BRC) may also waive the knowledge test — check with the course provider and the Kansas DOR to confirm current waiver scope. The completion certificate must be presented to the DOR when you apply for the endorsement.",
    },
  ],
  relatedTests: [
    { label: "Kansas DMV Practice Test", href: "/kansas-dmv-practice-test" },
    { label: "Kansas CDL Practice Test", href: "/kansas-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function KansasMotorcyclePracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
