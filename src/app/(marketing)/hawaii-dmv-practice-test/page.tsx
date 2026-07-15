import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "Hawaii DMV Practice Test 2025 – Free HI Driver's License Exam Prep",
  description:
    "Prepare for your Hawaii DOT knowledge test with free practice questions covering lava flow road closures, vog visibility, tsunami evacuation routes, OUI laws, and Hawaii-specific traffic rules. 30 questions, 80% to pass.",
  alternates: { canonical: "https://caredmvprep.com/hawaii-dmv-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/hawaii-dmv-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "Hawaii",
  stateAbbr: "HI",
  testLabel: "DMV Practice Test",
  slug: "hawaii-dmv-practice-test",
  headline: "Hawaii DMV Practice Test 2025",
  intro:
    "Hawaii driver licensing is administered by the Hawaii Department of Transportation (DOT) through county offices on Oahu (City and County of Honolulu), Maui, Hawaii Island, and Kauai. The knowledge test has 30 questions and requires 80% (24/30) to pass. This free practice test covers Hawaii-specific topics: lava flow road closures, volcanic haze (vog), tsunami evacuation routes, Hawaii's unique OVUII impaired-driving law, and island-specific driving conditions.",
  basedOn: "Hawaii Department of Transportation Driver's Manual",
  keyRules: [
    {
      icon: "🌋",
      rule: "Lava Flows Can Close Roads Permanently",
      detail:
        "Active lava flows on Hawaii Island (Big Island) have permanently destroyed roads — including Highway 137 (Lower Puna Road) in the 2018 Kilauea eruption. Lava can cross and close roads with no warning at any time during an active eruption. Hawaii County Civil Defense issues road closure alerts that all drivers must heed.",
    },
    {
      icon: "🌫️",
      rule: "Vog: Volcanic Smog Reduces Visibility",
      detail:
        "Vog (volcanic smog) is created when sulfur dioxide from Kilauea mixes with moisture in the air, forming a visible haze. Vog reduces visibility on Big Island roads and can drift to other islands. It also irritates eyes and lungs. Vog advisories from the Hawaii Emergency Management Agency affect driving conditions.",
    },
    {
      icon: "🌊",
      rule: "Tsunami Evacuation Routes: Blue Signs, Go High",
      detail:
        "Blue signs with a wave symbol mark Hawaii's official tsunami evacuation routes. When a tsunami warning is issued, drivers must immediately move away from coastal areas toward higher elevation using marked evacuation routes. Do not wait to see the wave — by then it is too late to evacuate.",
    },
    {
      icon: "🛣️",
      rule: "Interstate Highways That Do Not Connect to Mainland",
      detail:
        "Hawaii's H-1, H-2, and H-3 are federally funded 'Interstate' highways but do not connect to the continental U.S. highway system or to other islands. Each island's road network is entirely self-contained. Vehicle transport between islands requires cargo ship (Matson Navigation, Young Brothers) or roll-on/roll-off ferry.",
    },
    {
      icon: "🌧️",
      rule: "Volcanic Rock Roads: Slippery When Wet",
      detail:
        "Dark basalt road surfaces on Hawaii Island (and in some areas on other islands) become extremely slippery when wet. Hilo receives over 120 inches of rain per year — one of the wettest cities in the US — and sudden rain on basalt pavement dramatically reduces traction. Reduce speed immediately when rain begins.",
    },
    {
      icon: "⛰️",
      rule: "Pali Highway: Steep Grades and Funneled Winds",
      detail:
        "Oahu's Pali Highway (Route 61) climbs over the Nuuanu Pali, a steep volcanic cliff with dramatic grades and sharp turns. Strong winds are channeled through the Pali gap and can affect vehicle control. Motorcycles and high-profile vehicles are particularly vulnerable to sudden gusts at the summit.",
    },
    {
      icon: "🧒",
      rule: "Permit Age: 15½ Years Old",
      detail:
        "Hawaii issues instruction permits at age 15½. Permit holders must be accompanied by a licensed driver 21 or older at all times. A provisional license is available at 16 after meeting supervised driving hour requirements. Full unrestricted license is available at 17 with additional requirements.",
    },
    {
      icon: "🍺",
      rule: "OVUII: Hawaii's Unique Term for Impaired Driving",
      detail:
        "Hawaii uses OVUII (Operating a Vehicle Under the Influence of an Intoxicant) — a term no other U.S. state uses. The adult BAC limit is 0.08% under HRS § 291E-61. For drivers under 21, a BAC of 0.02% or above is an OVUII violation. Implied consent refusals carry administrative revocations of 2 years (1st), 4 years (2nd), and 8 years (3rd) — among the longest in the country.",
    },
  ],
  about: [
    "Hawaii driver licensing is administered by the Hawaii Department of Transportation (DOT), Highways Division, through county-level offices: the City and County of Honolulu on Oahu, Maui County, Hawaii County (Big Island), and Kauai County. The knowledge test consists of 30 multiple-choice questions, and a passing score of 80% (24 out of 30 correct) is required. Hawaii uses the unique term OVUII (Operating a Vehicle Under the Influence of an Intoxicant, HRS § 291E-61) for impaired driving — no other U.S. state uses this designation. The permit age in Hawaii is 15½ years old.",
    "Hawaii drivers face hazards found nowhere else in the United States. On Hawaii Island (the Big Island), active volcanic eruptions from Kilauea have permanently destroyed roads — the 2018 eruption destroyed Highway 137 (Lower Puna Road) and permanently closed portions of the road network in lower Puna district. Volcanic haze (vog) — created when sulfur dioxide from Kilauea mixes with moisture — reduces visibility and affects air quality on the Big Island and sometimes other islands. Tsunami evacuation routes are marked with blue signs throughout coastal areas of all Hawaiian islands, and all Hawaii drivers must know to immediately move to higher ground when a tsunami warning is issued.",
    "Hawaii's geography presents unique road network facts: the H-1, H-2, and H-3 highways are federally designated Interstate highways but they exist entirely on Oahu and do not connect to the mainland or other islands. There is no road connection between islands — vehicle transport requires cargo ship or ferry service. Hilo, on Hawaii Island, receives over 120 inches of rain annually, making it one of the wettest cities in the U.S., and sudden rainfall on volcanic basalt road surfaces creates extremely slippery conditions requiring immediate speed reduction.",
  ],
  sampleQuestions: [
    {
      question:
        "What happened to Highway 137 (Lower Puna Road) on Hawaii Island during the 2018 Kilauea eruption?",
      options: [
        "It was temporarily closed but has since been fully reopened",
        "It was destroyed by lava flows and permanently closed in affected sections",
        "It was rerouted around the lava flows without permanent closure",
        "It was only flooded by lava tube water, not by surface lava",
      ],
      correctIndex: 1,
      explanation:
        "The 2018 Kilauea eruption in the East Rift Zone destroyed portions of Highway 137 (Lower Puna Road) along with over 700 homes and significant infrastructure in the lower Puna district of Hawaii Island. Lava flows buried sections of the road permanently under hardened lava. This is a real-world example of how active volcanic activity in Hawaii can permanently alter the road network with little or no warning. Hawaii County Civil Defense issues road closure alerts during volcanic activity.",
    },
    {
      question:
        "What are the blue wave signs along Hawaii's coastal roads used to mark?",
      options: [
        "Scenic ocean viewpoints",
        "Beach access parking areas",
        "Official tsunami evacuation routes leading to higher elevation",
        "Areas where wave activity can overtop the road during storms",
      ],
      correctIndex: 2,
      explanation:
        "Blue signs displaying a wave symbol mark Hawaii's official tsunami evacuation routes. These routes lead inland or to higher elevation and are designed to provide an escape path when a tsunami warning is issued. When a tsunami warning is issued by the Pacific Tsunami Warning Center, all Hawaii drivers must immediately move away from coastal areas via marked evacuation routes. Do not wait to see the wave before evacuating — by that point, escape may be impossible.",
    },
    {
      question:
        "What is 'vog' and how does it affect driving in Hawaii?",
      options: [
        "Vog is ocean fog unique to Hawaii's windward coasts and reduces morning visibility",
        "Vog is volcanic smog created by sulfur dioxide emissions from Kilauea that reduces visibility and irritates eyes",
        "Vog is a Hawaiian term for heavy tropical rain that reduces road traction",
        "Vog is condensation that forms on vehicle windows in Hawaii's humid climate",
      ],
      correctIndex: 1,
      explanation:
        "Vog (volcanic smog) forms when sulfur dioxide (SO2) from active Kilauea vents reacts with moisture and oxygen in the atmosphere. It appears as a brownish-gray haze, reduces visibility on roadways — particularly on the Big Island — and can irritate the eyes, nose, and throat of sensitive individuals. Vog can drift to other Hawaiian islands depending on wind direction. Hawaii Emergency Management Agency issues vog advisories. Drivers should use headlights in heavy vog and reduce speed when visibility is reduced.",
    },
    {
      question:
        "Hawaii's H-1, H-2, and H-3 are designated as Interstate highways. What is unique about these highways?",
      options: [
        "They connect all Hawaiian islands via underwater tunnels",
        "They are the only toll highways in the United States",
        "They are federally funded Interstates but exist entirely on Oahu and do not connect to the mainland or other islands",
        "They are operated by the federal government, not the state of Hawaii",
      ],
      correctIndex: 2,
      explanation:
        "Hawaii's H-1, H-2, and H-3 are federally funded Interstate highways — built using the Federal Aid Highway Act — but they exist entirely on the island of Oahu and have no road connection to the continental U.S. highway system or to any other Hawaiian island. Each island's road network is completely independent. Transporting a vehicle between islands requires a cargo ship or roll-on/roll-off ferry service. This makes Hawaii's Interstate highways unique in the entire U.S. highway system.",
    },
    {
      question:
        "Why do Hawaii Island (Big Island) roads become especially dangerous immediately after rain begins?",
      options: [
        "Rain causes volcanic ash to fall on roads, creating a slippery layer",
        "Dark volcanic basalt road surfaces become extremely slippery when first wet",
        "Hawaii roads are not designed to drain rain quickly due to volcanic topography",
        "Rain causes lava tubes beneath roads to collapse",
      ],
      correctIndex: 1,
      explanation:
        "Dark basalt road surfaces, common on Hawaii Island and in some areas of other Hawaiian islands, become extremely slippery when first wetted by rain. The smooth, dark volcanic rock pavement provides significantly less traction than asphalt or concrete when wet. Hilo on Hawaii Island receives over 120 inches of rain per year — making it one of the wettest U.S. cities — and the combination of frequent rain and basalt surfaces creates a serious traction hazard. Drivers should reduce speed immediately when rain begins on basalt-surfaced roads.",
    },
    {
      question:
        "Hawaii uses which specific term for impaired driving offenses?",
      options: [
        "DUI (Driving Under the Influence)",
        "DWI (Driving While Intoxicated)",
        "OUI (Operating Under the Influence)",
        "OVUII (Operating a Vehicle Under the Influence of an Intoxicant)",
      ],
      correctIndex: 3,
      explanation:
        "Hawaii uses the specific legal term OVUII — Operating a Vehicle Under the Influence of an Intoxicant — for impaired driving offenses under Hawaii Revised Statutes § 291E-61. The adult BAC threshold is 0.08%. For drivers under 21, a BAC of 0.02% or higher constitutes an OVUII violation. No other U.S. state uses this exact designation — all official Hawaii court documents, statutes, and law enforcement records use OVUII, not DUI or OUI.",
    },
    {
      question:
        "What is the minimum age to obtain an instruction permit in Hawaii?",
      options: ["15 years old", "16 years old", "15½ years old", "14 years old"],
      correctIndex: 2,
      explanation:
        "Hawaii issues instruction permits to residents at age 15½. Hawaii's permit process is administered through county licensing offices (City and County of Honolulu on Oahu, Maui County, Hawaii County on the Big Island, and Kauai County). Permit holders must be accompanied by a licensed driver 21 or older at all times while driving. After meeting supervised hour requirements, a provisional license is available at 16.",
    },
    {
      question:
        "What specific wind hazard do drivers experience on Oahu's Pali Highway (Route 61) at the Nuuanu Pali summit?",
      options: [
        "The Pali is sheltered from wind by the Ko'olau Mountains and presents no wind hazard",
        "Strong winds are channeled through the Pali gap in the Ko'olau Mountains and can significantly affect vehicle control",
        "Trade winds at the Pali summit blow in the same direction as traffic flow, aiding vehicles going uphill",
        "The Pali wind hazard applies only to the eastbound direction",
      ],
      correctIndex: 1,
      explanation:
        "The Nuuanu Pali is a dramatic gap in the Ko'olau Mountain range on Oahu. Strong trade winds are channeled and accelerated through this gap, creating very strong gusts at the summit area of the Pali Highway (Route 61). Motorcycles, convertibles, and high-profile vehicles are particularly vulnerable. Drivers should grip the wheel firmly, reduce speed, and anticipate sudden strong gusts when driving near the summit. The Pali Lookout (a scenic viewpoint near the tunnel) is famous for winds strong enough to prevent people from standing normally.",
    },
    {
      question:
        "How are vehicles transported between Hawaiian islands?",
      options: [
        "Via the Hawaii Inter-Island Highway, which runs through underwater tunnels",
        "Only by air — no vehicle ferry service exists between Hawaiian islands",
        "By cargo ship companies such as Matson Navigation and Young Brothers, or roll-on/roll-off ferry",
        "Via the State of Hawaii Inter-Island Bridge, which connects Oahu and Maui",
      ],
      correctIndex: 2,
      explanation:
        "There are no roads connecting Hawaii's islands — each island's road network is completely independent. Vehicles are transported between islands by cargo ship companies (Matson Navigation handles most of the inter-island cargo, including vehicles, between the major islands) or by Young Brothers, which serves smaller island communities. Roll-on/roll-off ferry service has also operated between some islands. Vehicle transport between islands takes planning and typically requires scheduling in advance.",
    },
    {
      question:
        "When a tsunami warning is issued for Hawaii, what must drivers do immediately?",
      options: [
        "Drive to the nearest beach to observe the wave's approach",
        "Stop in place and wait for further instructions from the radio",
        "Immediately move away from coastal areas toward higher elevation using marked tsunami evacuation routes",
        "Call 911 to confirm the warning before taking action",
      ],
      correctIndex: 2,
      explanation:
        "When a tsunami warning is issued in Hawaii, drivers must immediately move away from all coastal areas and low-lying ground toward higher elevation. Blue wave signs mark the official tsunami evacuation routes, and drivers should follow these routes. Do not drive toward the coast to observe the ocean. Do not wait for confirmation — by the time a wave is visible, evacuation may be impossible. Pacific tsunamis can travel at the speed of a jet aircraft and arrive with little warning once a warning is issued.",
    },
  ],
  faqs: [
    {
      question: "What agency administers driver licensing in Hawaii?",
      answer:
        "Hawaii driver licensing is administered by the Hawaii Department of Transportation (DOT), Highways Division, but the actual licensing offices are operated at the county level: the City and County of Honolulu on Oahu, Maui County (serving Maui, Molokai, and Lanai), Hawaii County (serving the Big Island), and Kauai County. Each county has its own licensing office locations. This county-based system means that residents on different islands obtain their licenses from different county offices, all under state DOT authority.",
    },
    {
      question: "What is the knowledge test format in Hawaii?",
      answer:
        "The Hawaii driver's license knowledge test consists of 30 multiple-choice questions. You must correctly answer at least 24 questions — an 80% passing score — to pass. The test is based on the Hawaii Driver's Manual and covers traffic laws, road signs, safe driving practices, and Hawaii-specific hazards including volcanic activity, tsunami evacuation, and vog conditions. The test is available at county licensing offices on each island.",
    },
    {
      question: "What is OVUII and what are the BAC limits in Hawaii?",
      answer:
        "OVUII stands for Operating a Vehicle Under the Influence of an Intoxicant — Hawaii's legal term for impaired driving (what most states call DUI or DWI). The adult BAC threshold is 0.08% under Hawaii Revised Statutes § 291E-61. For drivers under 21, the limit is 0.02% — any measurable BAC at or above this level is an OVUII violation. A BAC of 0.15% or higher triggers enhanced aggravated OVUII penalties, including mandatory ignition interlock on a first conviction. Hawaii OVUII penalties include mandatory license revocation, fines, possible jail time, and mandatory substance abuse assessment. OVUII is the official legal designation — no other U.S. state uses this specific term.",
    },
    {
      question: "What should drivers do if a lava flow approaches a road on Hawaii Island?",
      answer:
        "If a lava flow threatens a road, Hawaii County Civil Defense issues road closure orders and evacuation orders. Drivers must comply with all closure signs and barricades — driving into a lava flow area is extremely dangerous and may be illegal under an active civil defense emergency order. Roads may be closed with no warning when a flow crosses or threatens the roadway. Drivers should monitor Hawaii County Civil Defense alerts and Hawaii Emergency Management Agency (HI-EMA) notifications when traveling on Hawaii Island during active eruption periods.",
    },
    {
      question: "How do tsunami evacuation routes work in Hawaii?",
      answer:
        "Hawaii's tsunami evacuation routes are marked by distinctive blue signs with a wave symbol, located throughout coastal areas on all major Hawaiian islands. These routes lead away from the coast and toward higher elevation. When a tsunami warning is issued by the Pacific Tsunami Warning Center (PTWC), drivers should immediately use these marked routes to move away from all coastal and low-lying areas. The Pacific Ocean is capable of generating tsunamis that arrive in Hawaii with relatively short warning times, so immediate action when a warning is issued is critical.",
    },
    {
      question: "Are there specific driving conditions on each Hawaiian island?",
      answer:
        "Yes. Oahu has the most urban traffic with significant congestion on H-1 in the Honolulu metro area and on the Pali Highway near the Ko'olau summit. Hawaii Island (Big Island) has volcanic hazards including lava flow road closures and vog, as well as basalt road surfaces that become slippery when wet. Maui has the Hana Highway — a narrow, winding road with over 600 curves and numerous one-lane bridges. Kauai has Na Pali Coast roads that end at trailheads requiring turning around. Each island's road network is completely separate with no connections between islands.",
    },
    {
      question: "What are the graduated licensing stages in Hawaii?",
      answer:
        "Hawaii's Graduated Driver License (GDL) system has three stages. Phase 1 (Learner's Permit): available at age 15½; requires a licensed supervisor 21+ at all times (parent/guardian only between 11 p.m. and 5 a.m.); requires 50 supervised hours (at least 10 at night). Phase 2 (Provisional License): available at age 16 after holding Phase 1 for at least 180 days; restricts passengers (max 1 under-18 unless parent/guardian present) and nighttime driving (11 p.m.–5 a.m., with exceptions for documented work or school). Phase 3 (Full License): available at age 17 after holding Phase 2 for at least 6 months.",
    },
    {
      question: "What is vog and when should Hawaii drivers be concerned about it?",
      answer:
        "Vog (volcanic smog) is a type of air pollution created when sulfur dioxide emissions from Kilauea's active vents react with oxygen and moisture in the air. It appears as a brownish or grayish haze and can significantly reduce visibility, particularly on Hawaii Island. Vog is most concentrated in areas downwind of Kilauea and can be worse in the Kona district (on the leeward side of the Big Island) during Kona wind conditions. Hawaii Emergency Management Agency issues vog advisories. In heavy vog, drivers should use headlights, reduce speed, and increase following distance.",
    },
    {
      question: "Can vehicles be driven between Hawaiian islands?",
      answer:
        "No. There are no roads or bridges connecting the Hawaiian islands to each other or to the continental United States. Each island's road network is completely self-contained. To transport a vehicle between islands, you must use a cargo ship service. Matson Navigation handles most inter-island vehicle shipping, and Young Brothers handles cargo to smaller ports. Roll-on/roll-off ferry options have also been available between some islands. Vehicle transport between islands requires scheduling in advance and incurs shipping costs.",
    },
    {
      question: "What is the permit age in Hawaii?",
      answer:
        "Hawaii issues driver's instruction permits at age 15½ years old (HRS § 286-102.6). The permit is obtained through the county licensing office serving the island where the applicant resides. After obtaining the permit, the holder must complete at least 50 supervised hours (minimum 10 at night) and hold the permit for at least 180 days before being eligible for a Phase 2 Provisional License at age 16. If you fail the knowledge test, Hawaii requires a 30-day wait before retesting — one of the strictest retest policies in the U.S.",
    },
  ],
  relatedTests: [
    { label: "Hawaii Motorcycle Practice Test", href: "/hawaii-motorcycle-practice-test" },
    { label: "Hawaii CDL Practice Test", href: "/hawaii-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "CDL Practice Test", href: "/cdl-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function HawaiiDmvPracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
