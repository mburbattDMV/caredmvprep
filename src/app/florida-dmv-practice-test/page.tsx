import type { Metadata } from "next";
import StatePracticePage from "@/components/StatePracticePage";

export const metadata: Metadata = {
  title: "Florida DMV Practice Test 2024 – Free FL Driver's License Exam Prep",
  description:
    "Take free Florida DMV practice tests based on the official Florida Driver Handbook. Prepare for your FL Class E driver's license knowledge test.",
  alternates: { canonical: "https://caredmvprep.com/florida-dmv-practice-test" },
};

const topics = [
  "Florida traffic signs and signals",
  "Right-of-way and intersection rules",
  "Florida speed limits",
  "DUI laws and implied consent",
  "Expressway driving in Florida",
  "Pedestrian and bicycle safety",
  "Florida no-fault insurance laws",
  "Parking and stopping rules",
  "School bus stop laws",
  "Railroad crossing procedures",
  "Sharing roads with golf carts (Florida-specific)",
  "Distracted driving and hands-free laws",
];

export default function FloridaDMVPage() {
  return (
    <StatePracticePage
      state="Florida"
      abbreviation="FL"
      emoji="🌴"
      slug="florida-dmv-practice-test"
      description="Prepare for the Florida DHSMV knowledge test with free practice questions based on the official Florida Driver Handbook. Covers Florida traffic laws, signs, and road rules."
      topics={topics}
    />
  );
}
