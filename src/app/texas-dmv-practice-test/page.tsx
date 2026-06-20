import type { Metadata } from "next";
import StatePracticePage from "@/components/StatePracticePage";

export const metadata: Metadata = {
  title: "Texas DMV Practice Test 2024 – Free TX Driver's License Exam Prep",
  description:
    "Take free Texas DMV practice tests based on the official Texas Driver Handbook. Prepare for your TX driver's license knowledge test today.",
  alternates: { canonical: "https://caredmvprep.com/texas-dmv-practice-test" },
};

const topics = [
  "Traffic signs and signals",
  "Right-of-way rules in Texas",
  "Texas speed limits and school zones",
  "DWI laws and penalties",
  "Lane usage and changing lanes",
  "Texas open road and rural driving",
  "Parking regulations",
  "Sharing the road with farm equipment",
  "Railroad crossing rules",
  "Motorcycle awareness",
  "Texas seat belt and child safety laws",
  "Distracted driving laws",
];

export default function TexasDMVPage() {
  return (
    <StatePracticePage
      state="Texas"
      abbreviation="TX"
      emoji="⭐"
      slug="texas-dmv-practice-test"
      description="Prepare for the Texas DPS knowledge test with free practice questions based on the official Texas Driver Handbook. Covers Texas traffic laws, signs, and safe driving."
      topics={topics}
    />
  );
}
