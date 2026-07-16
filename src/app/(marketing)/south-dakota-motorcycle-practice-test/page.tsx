import type { Metadata } from "next";
import PracticeTestPage, { type PracticeTestPageProps } from "@/components/PracticeTestPage";

export const metadata: Metadata = {
  title: "South Dakota Motorcycle Practice Test 2026 – Free SD Endorsement Exam Prep",
  description:
    "Prepare for your South Dakota motorcycle endorsement test. Covers helmet law (under-18 only, SDCL § 32-20-4), eye protection required all riders (§ 32-20-4.1), lane splitting illegal, headlights always on, MSF course waives both tests, DUI 0.08%/0.02%. Based on SDCL.",
  alternates: { canonical: "https://caredmvprep.com/south-dakota-motorcycle-practice-test" },
  openGraph: {
    url: "https://caredmvprep.com/south-dakota-motorcycle-practice-test",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const data: PracticeTestPageProps = {
  state: "South Dakota",
  stateAbbr: "SD",
  testLabel: "Motorcycle Practice Test",
  slug: "south-dakota-motorcycle-practice-test",
  headline: "South Dakota Motorcycle Practice Test 2026",
  intro:
    "South Dakota requires a motorcycle endorsement on your driver's license to legally operate any motorcycle on public roads. The endorsement knowledge test covers South Dakota-specific statutes under SDCL Title 32, including the partial helmet law (under-18 required, § 32-20-4), the universal eye protection requirement for all riders (§ 32-20-4.1), the lane splitting prohibition, the always-on headlight requirement, and DUI BAC limits. The MSF Basic RiderCourse waives BOTH the knowledge and skills tests.",
  basedOn: "South Dakota Codified Laws (SDCL) § 32-20 / South Dakota DPS Motorcycle Manual",
  keyRules: [
    {
      icon: "🪖",
      rule: "Helmet Law: Under-18 Required; Adults (18+) Exempt (SDCL § 32-20-4)",
      detail: "SDCL § 32-20-4 requires helmets for motorcycle operators and passengers who are under 18 years old. Adult riders and passengers (18 and older) are not legally required to wear a helmet — South Dakota has a partial (age-based) helmet law. The Motorcycle Safety Foundation and safety experts universally recommend helmets for all riders regardless of the legal requirement.",
    },
    {
      icon: "👓",
      rule: "Eye Protection: Required ALL Riders Unless Windscreen (§ 32-20-4.1)",
      detail: "Unlike the helmet law, SDCL § 32-20-4.1 requires eye protection for ALL motorcycle operators regardless of age — unless the motorcycle is equipped with a windscreen of sufficient height and design to provide adequate eye protection in the normal riding position. This applies to adult riders who are not required to wear a helmet. Additionally, tinted eye protection that reduces light transmittance below 35% is prohibited during headlight hours.",
    },
    {
      icon: "🚫",
      rule: "Lane Splitting: Illegal — Cannot Overtake in Same Lane (§ 32-20)",
      detail: "SDCL § 32-20 explicitly prohibits a motorcycle operator from overtaking and passing in the same lane occupied by the vehicle being overtaken. Lane splitting and lane filtering are not authorized in South Dakota. Exception: two motorcycles (or a motorcycle and a bicycle) may ride side by side (two abreast) in the same lane — a provision expressly stated in § 32-20.",
    },
    {
      icon: "💡",
      rule: "Headlights: Always On — Day and Night (§ 32-20)",
      detail: "South Dakota requires motorcycle headlights to be on at all times — day and night — whenever the motorcycle is operated on public roads. Daytime headlight use significantly increases motorcycle conspicuity to other drivers. This always-on requirement is one of the most important motorcycle safety rules in South Dakota law.",
    },
    {
      icon: "📚",
      rule: "MSF Course Waives BOTH Knowledge and Skills Tests",
      detail: "Completing an approved Motorcycle Safety Foundation (MSF) Basic RiderCourse in South Dakota waives both the motorcycle knowledge test AND the motorcycle skills test at the DPS. This is a significant benefit — applicants can obtain their endorsement without taking either DPS test by completing the MSF course. This waiver covers both tests, unlike some states that only waive the skills test.",
    },
    {
      icon: "👥",
      rule: "Two Abreast: Legal — Two Motorcycles May Share One Lane (§ 32-20)",
      detail: "SDCL § 32-20 expressly provides that the prohibition against overtaking in the same lane does not apply to motorcycles being operated two abreast in a single lane, or a motorcycle and a bicycle being operated two abreast in the same lane. Three or more motorcycles abreast in one lane is not permitted.",
    },
    {
      icon: "🚗",
      rule: "Interstate Speed: 80 mph Maximum (§ 32-25-4)",
      detail: "South Dakota's interstate maximum speed of 80 mph (§ 32-25-4) is one of the highest in the continental United States. For motorcyclists, the 80 mph interstate limit means increased wind exposure, faster stopping distances, and greater consequences from crashes. Protective gear and increased following distance are especially critical at interstate speeds.",
    },
    {
      icon: "🍺",
      rule: "DUI: Adult 0.08%; Under-21 Rider 0.02%; Enhanced at 0.17%",
      detail: "SDCL § 32-23-1 applies fully to motorcycle operators. The adult DUI threshold is 0.08% BAC. Under-21 motorcyclists face a 0.02% limit under § 32-23-21. South Dakota's enhancement threshold of 0.17% triggers a mandatory chemical dependency evaluation and 120-day administrative license revocation (§ 32-23-2.1). Alcohol impairs the balance and coordination essential for safe motorcycling.",
    },
  ],
  about: [
    "South Dakota's motorcycle endorsement law (SDCL § 32-20) contains several provisions that are distinctively tested on the endorsement exam. The helmet law (§ 32-20-4) is partial — requiring helmets only for riders and passengers under 18 years old. However, the eye protection requirement in § 32-20-4.1 applies to ALL operators regardless of age, unless the motorcycle has an adequate windscreen. The tinted eye protection restriction is specific: eye protection that reduces light transmittance below 35% is prohibited during the period when headlights must be lighted (nighttime and low-visibility conditions). This means dark tinted goggles or face shields are prohibited at night even if they might be used safely during daylight.",
    "Lane sharing rules in South Dakota have an important nuance. The general rule prohibits overtaking and passing in the same lane as another vehicle (§ 32-20). However, there is an explicit exception: two motorcycles may ride two abreast in a single lane, and a motorcycle and bicycle may also ride two abreast in the same lane. This makes group riding formations legal in South Dakota as long as no more than two motorcycles share a lane side by side. For larger groups, a staggered formation — alternating left and right thirds of the lane — provides each rider adequate stopping distance while maintaining a compact group appearance.",
    "South Dakota's MSF course waiver is broader than in many other states: completing an approved MSF Basic RiderCourse waives BOTH the knowledge test AND the skills test at the DPS. Applicants who complete the course can obtain their motorcycle endorsement without taking either DPS test. The motorcycle headlights-always-on requirement is mandatory for all motorcycles operating on public roads — this significantly improves daytime conspicuity and is among the most well-documented motorcycle safety measures. South Dakota's 80 mph interstate speed limit means motorcyclists face higher-speed riding conditions than in most states; proper protective gear, increased following distance, and awareness of wind effects at sustained high speeds are critical.",
  ],
  sampleQuestions: [
    {
      question: "Under SDCL § 32-20-4, who is legally required to wear a motorcycle helmet in South Dakota?",
      options: [
        "All riders and passengers of any age — universal helmet law",
        "Only motorcycle operators — passengers are exempt at all ages",
        "Operators and passengers who are under 18 years old",
        "No helmet requirement exists — South Dakota has no motorcycle helmet law",
      ],
      correctIndex: 2,
      explanation:
        "SDCL § 32-20-4 requires helmets for motorcycle operators and passengers who are under 18 years old. Adults (18 and older) are not legally required to wear a helmet. South Dakota has a partial (age-based) helmet law. Despite the adult exemption, safety organizations universally recommend helmets for all riders on every ride.",
    },
    {
      question: "Who must wear eye protection when operating a motorcycle in South Dakota under SDCL § 32-20-4.1?",
      options: [
        "Only riders under 18 who are also required to wear helmets",
        "All motorcycle operators regardless of age, unless the motorcycle has an adequate windscreen",
        "Only operators on highways posted above 55 mph",
        "No one — South Dakota has no eye protection requirement",
      ],
      correctIndex: 1,
      explanation:
        "SDCL § 32-20-4.1 requires ALL motorcycle operators — of any age — to wear an eye protective device, unless the motorcycle is equipped with a windscreen of sufficient height and design to provide adequate eye protection. Unlike the helmet law (which exempts adults), the eye protection requirement applies regardless of age. A 45-year-old adult who is not legally required to wear a helmet is still required to wear eye protection if the motorcycle lacks an adequate windscreen.",
    },
    {
      question: "Is lane splitting legal for motorcyclists in South Dakota?",
      options: [
        "Yes — permitted at speeds under 15 mph in stopped traffic",
        "No — SDCL § 32-20 prohibits overtaking and passing in the same lane as another vehicle",
        "Yes — only on interstates where the speed limit is 80 mph",
        "No — but lane filtering at stop signs is separately permitted",
      ],
      correctIndex: 1,
      explanation:
        "SDCL § 32-20 explicitly prohibits a motorcycle operator from overtaking and passing in the same lane occupied by the vehicle being overtaken. Lane splitting is illegal in South Dakota. There is no separate lane filtering exception. The only exception in § 32-20 is for two motorcycles (or a motorcycle and bicycle) riding two abreast in the same lane.",
    },
    {
      question: "How does completing a South Dakota-approved MSF Basic RiderCourse affect endorsement testing requirements?",
      options: [
        "It reduces the written test from 25 to 15 questions only",
        "It waives only the skills (riding) test — the knowledge test is still required at DPS",
        "It waives BOTH the knowledge test AND the skills test at the DPS",
        "It has no effect — both tests must still be taken at DPS",
      ],
      correctIndex: 2,
      explanation:
        "Completing an approved MSF Basic RiderCourse in South Dakota waives BOTH the motorcycle knowledge test AND the skills test at the DPS. This is broader than many states, which only waive the skills test. Applicants who complete the course can receive their motorcycle endorsement without taking either DPS test.",
    },
    {
      question: "Under SDCL § 32-20, how many motorcycles may legally ride side by side in a single lane in South Dakota?",
      options: [
        "One — each motorcycle must occupy its own full lane",
        "Two — two motorcycles may ride abreast in one lane",
        "Three — up to three motorcycles may share one lane",
        "No limit — the law permits any number of motorcycles abreast",
      ],
      correctIndex: 1,
      explanation:
        "SDCL § 32-20 provides that the prohibition against overtaking in the same lane does not apply to motorcycles being operated two abreast in a single lane. Two motorcycles may legally ride side by side in one lane. Three or more abreast is not permitted. A motorcycle and a bicycle may also ride two abreast in the same lane under the same exception.",
    },
    {
      question: "South Dakota requires motorcycle headlights to be on at what times?",
      options: [
        "Only from sunset to sunrise",
        "Only during rain or fog",
        "At all times — day and night — when operated on public roads",
        "Only at speeds above 35 mph",
      ],
      correctIndex: 2,
      explanation:
        "South Dakota requires motorcycle headlights to be on at all times — day and night — whenever the motorcycle is operated on public roads. Daytime headlight use is one of the most effective ways to increase motorcycle visibility to other drivers. The requirement has no weather or speed exceptions.",
    },
    {
      question: "SDCL § 32-20-4.1 prohibits tinted eye protection during headlight hours if it reduces light transmittance below what percentage?",
      options: ["50%", "25%", "35%", "15%"],
      correctIndex: 2,
      explanation:
        "SDCL § 32-20-4.1 prohibits operating a motorcycle during the period when headlights must be lighted while wearing eye protection tinted or shaded to reduce light transmittance to below 35%. Eye protection that blocks more than 65% of light is too dark for safe nighttime riding — it reduces the rider's ability to see road hazards in darkness.",
    },
    {
      question: "What is the DUI BAC limit for a motorcycle rider under 21 years old in South Dakota?",
      options: ["0.00% — zero tolerance", "0.04% or more", "0.02% or more", "0.08% or more"],
      correctIndex: 2,
      explanation:
        "SDCL § 32-23-21 sets a 0.02% BAC limit for all motor vehicle operators under 21, including motorcycle riders. This near-zero tolerance limit means even a small amount of alcohol can result in a DUI charge for an underage rider. Alcohol impairs the balance, coordination, and judgment that are especially critical for motorcycle operation.",
    },
    {
      question: "For a motorcyclist riding at highway speeds, what is the most important factor in preventing a collision when a car turns left across your path?",
      options: [
        "Maintaining maximum legal speed to reduce time in the intersection",
        "Covering the brake, managing speed to adjust to conditions, and being prepared to stop",
        "Switching to the left lane to go around the turning vehicle",
        "Sounding the horn loudly to alert the turning driver",
      ],
      correctIndex: 1,
      explanation:
        "A car turning left in front of an oncoming motorcycle is the most common type of motorcycle-vehicle crash. The best prevention is covering the brake (having your hand on the brake lever and foot on the rear brake so you can stop faster), adjusting speed at intersections, and scanning for any signs that a vehicle may turn. Motorcycles should reduce speed when approaching intersections where vehicles may turn.",
    },
  ],
  faqs: [
    {
      question: "Who must wear a motorcycle helmet in South Dakota?",
      answer:
        "SDCL § 32-20-4 requires helmets for motorcycle operators and passengers who are under 18 years old. Adult operators and passengers (18 and older) are not legally required to wear a helmet — South Dakota has a partial, age-based helmet law. Despite the legal exemption for adults, the Motorcycle Safety Foundation and trauma surgeons strongly recommend helmets for all riders on every ride. Head injuries are the leading cause of motorcycle fatality, and a DOT-approved helmet dramatically reduces this risk.",
    },
    {
      question: "Is eye protection required for all motorcycle riders in South Dakota?",
      answer:
        "Yes — SDCL § 32-20-4.1 requires ALL motorcycle operators, regardless of age, to wear an eye protective device when riding, UNLESS the motorcycle is equipped with a windscreen of sufficient height and design to provide adequate eye protection in the normal riding position. Unlike the helmet law (under-18 only), the eye protection requirement applies to adult riders too. Additionally, tinted eye protection that reduces light transmittance below 35% is prohibited during nighttime hours.",
    },
    {
      question: "Is lane splitting legal in South Dakota?",
      answer:
        "No. SDCL § 32-20 prohibits motorcycle operators from overtaking and passing in the same lane occupied by the vehicle being overtaken. Lane splitting and lane filtering are not authorized in South Dakota. The statute does provide one exception: two motorcycles (or a motorcycle and a bicycle) may ride side by side (two abreast) in the same lane — this is explicitly permitted. But passing between lanes of traffic is illegal.",
    },
    {
      question: "Does the MSF Basic RiderCourse waive the knowledge test in South Dakota?",
      answer:
        "Yes — completing an approved MSF Basic RiderCourse in South Dakota waives BOTH the motorcycle knowledge test AND the motorcycle skills test at the DPS. This is a more comprehensive waiver than in many states (which only waive the skills test). Applicants who complete the MSF course can obtain their motorcycle endorsement without taking either DPS test.",
    },
    {
      question: "What are the DUI BAC limits for motorcycle riders in South Dakota?",
      answer:
        "SDCL § 32-23-1 applies fully to motorcycle operators. Adult riders (21 and older): 0.08% BAC. Under-21 riders: 0.02% BAC (§ 32-23-21). Commercial vehicle operators: 0.04% (§ 32-12A-44). South Dakota's distinctive enhancement threshold is 0.17% BAC: at or above this level, § 32-23-2.1 mandates a chemical dependency evaluation and increases the administrative license revocation to 120 days. A work permit at this BAC level requires participation in the 24/7 Sobriety Program.",
    },
    {
      question: "Must motorcycle headlights be on during the day in South Dakota?",
      answer:
        "Yes. South Dakota requires motorcycle headlights to be on at all times — day and night — whenever operated on public roads. Daytime headlight use is mandatory and is one of the most effective motorcycle safety measures. Other drivers are significantly more likely to notice a motorcycle with its headlight on in daylight conditions.",
    },
    {
      question: "Can two motorcycles legally share a lane in South Dakota?",
      answer:
        "Yes. SDCL § 32-20 explicitly states that the prohibition against overtaking in the same lane does not apply to motorcycles being operated two abreast in a single lane, or a motorcycle and a bicycle being operated two abreast in the same lane. Two motorcycles may legally ride side by side in one lane. Three or more motorcycles abreast is not permitted. For group riding, a staggered formation (alternating left and right thirds of the lane) is recommended.",
    },
    {
      question: "What protective gear beyond helmets is recommended for South Dakota motorcycle riders?",
      answer:
        "Beyond the legally required helmet (for under-18) and eye protection (for all riders without windscreen), motorcycle safety experts recommend: a jacket with abrasion-resistant material and impact armor, gloves, over-the-ankle boots, and long pants. In a crash, an unprotected rider's skin contacts road surfaces traveling at highway speeds — road rash can be severe and permanently scarring. South Dakota's 80 mph interstate speed limit and long rural highway stretches make proper gear especially important.",
    },
  ],
  relatedTests: [
    { label: "South Dakota DMV Practice Test", href: "/south-dakota-dmv-practice-test" },
    { label: "South Dakota CDL Practice Test", href: "/south-dakota-cdl-practice-test" },
    { label: "Motorcycle Practice Test", href: "/motorcycle-practice-test" },
    { label: "All State Tests", href: "/states" },
  ],
};

export default function SouthDakotaMotorcyclePracticeTestPage() {
  return <PracticeTestPage {...data} />;
}
