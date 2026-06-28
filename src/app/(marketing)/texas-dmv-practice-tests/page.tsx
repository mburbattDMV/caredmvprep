import type { Metadata } from "next";
import StateIndexPage, { type StateIndexPageProps } from "@/components/StateIndexPage";

export const metadata: Metadata = {
  title: "Texas DMV Practice Tests 2025 – Free TX Driver's License, Motorcycle & CDL Prep",
  description:
    "Free Texas DMV practice tests for driver's license, motorcycle endorsement, and CDL General Knowledge. Based on the official Texas Driver Handbook and FMCSA CDL Manual.",
  alternates: { canonical: "https://caredmvprep.com/texas-dmv-practice-tests" },
  openGraph: { url: 'https://caredmvprep.com/texas-dmv-practice-tests', images: [{ url: 'https://caredmvprep.com/opengraph-image', width: 1200, height: 630 }] },
};

const data: StateIndexPageProps = {
  state: "Texas",
  stateAbbr: "TX",
  slug: "texas-dmv-practice-tests",
  intro:
    "Free practice tests for every Texas DPS license type — driver's license, motorcycle endorsement, and CDL General Knowledge. All content is based on the official Texas Driver Handbook and FMCSA CDL Manual.",
  tests: [
    {
      label: "Texas Driver's License Practice Test",
      href: "/texas-dmv-practice-test",
      description:
        "Practice for the Texas DPS Class C knowledge test. Covers traffic signs, speed limits, right-of-way rules, DWI laws, and Texas-specific regulations.",
    },
    {
      label: "Texas Motorcycle Practice Test",
      href: "/texas-motorcycle-practice-test",
      description:
        "Prepare for the Texas Class M motorcycle knowledge test. Covers riding techniques, helmet laws, lane sharing, and safe motorcycle operation.",
    },
    {
      label: "Texas CDL General Knowledge Test",
      href: "/texas-cdl-practice-test",
      description:
        "Study for the Texas CDL General Knowledge exam. Covers pre-trip inspection, braking, cargo securement, hours of service, and emergency procedures.",
    },
  ],
  faqs: [
    {
      question: "How many tests do I need to pass to get a Texas driver's license?",
      answer:
        "To get a standard Texas Class C driver's license, you must pass the DPS knowledge test (30 questions, 70% passing score) and a driving skills test. Drivers under 18 must also complete an approved driver education course.",
    },
    {
      question: "What is the passing score for the Texas DPS knowledge test?",
      answer:
        "The Texas DPS knowledge test requires a passing score of 70% — at least 21 correct answers out of 30 questions. The motorcycle knowledge test and CDL General Knowledge test both require 80%.",
    },
    {
      question: "Where can I take the Texas DPS knowledge test?",
      answer:
        "The Texas DPS knowledge test is administered at DPS driver's license offices throughout Texas. Some locations also offer online scheduling. Check the Texas DPS website for office locations and appointment availability.",
    },
    {
      question: "Do I need to take separate tests for a motorcycle and a regular driver's license in Texas?",
      answer:
        "Yes. You must hold (or obtain) a standard Texas driver's license and then add a Class M endorsement by passing a 25-question motorcycle knowledge test and a motorcycle skills test (or by completing an approved safety course).",
    },
  ],
};

export default function TexasDMVIndexPage() {
  return <StateIndexPage {...data} />;
}
