import type { Metadata } from "next";
import StatePracticePage from "@/components/StatePracticePage";

export const metadata: Metadata = {
  title: "New York DMV Practice Test 2024 – Free NY Driver's License Exam Prep",
  description:
    "Take free New York DMV practice tests based on the official NY Driver's Manual. Prepare for your NY Class D driver's license knowledge test.",
  alternates: { canonical: "https://caredmvprep.com/new-york-dmv-practice-test" },
};

const topics = [
  "New York traffic signs and meanings",
  "Right-of-way rules",
  "New York City traffic rules",
  "Speed limits and work zone rules",
  "DWI and DWAI laws",
  "Passing and overtaking vehicles",
  "Pedestrian crosswalk laws",
  "Parking on hills and at fire hydrants",
  "School bus laws",
  "Railroad and bridge crossing rules",
  "Point system and license penalties",
  "Cell phone use laws in New York",
];

export default function NewYorkDMVPage() {
  return (
    <StatePracticePage
      state="New York"
      abbreviation="NY"
      emoji="🗽"
      slug="new-york-dmv-practice-test"
      description="Prepare for the New York DMV knowledge test with free practice questions based on the official NY Driver's Manual. Covers NY traffic laws, signs, and road rules."
      topics={topics}
    />
  );
}
