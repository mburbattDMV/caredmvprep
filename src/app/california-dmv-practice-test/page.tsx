import type { Metadata } from "next";
import StatePracticePage from "@/components/StatePracticePage";

export const metadata: Metadata = {
  title: "California DMV Practice Test 2024 – Free CA Driver's License Exam Prep",
  description:
    "Take free California DMV practice tests based on the official CA Driver Handbook. Prepare for your Class C driver's license knowledge test.",
  alternates: { canonical: "https://caredmvprep.com/california-dmv-practice-test" },
};

const topics = [
  "Traffic signs, signals, and pavement markings",
  "Right-of-way rules",
  "Speed limits and safe following distance",
  "DUI laws and consequences",
  "Lane changing and merging",
  "Pedestrian and bicycle laws",
  "Parking rules and regulations",
  "Sharing the road with large vehicles",
  "Freeway driving techniques",
  "Emergency vehicle rules",
  "Cell phone and distracted driving laws",
  "California-specific traffic laws",
];

export default function CaliforniaDMVPage() {
  return (
    <StatePracticePage
      state="California"
      abbreviation="CA"
      emoji="🌉"
      slug="california-dmv-practice-test"
      description="Prepare for the California DMV knowledge test with free practice questions based on the official 2024 California Driver Handbook. Covers signs, laws, and safe driving rules."
      topics={topics}
    />
  );
}
