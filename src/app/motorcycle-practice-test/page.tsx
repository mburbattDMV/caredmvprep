import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Motorcycle Practice Test – Free M1/M2 License Exam Prep",
  description:
    "Free motorcycle knowledge practice tests to prepare for your state's motorcycle endorsement or M1/M2 license. Covers safe riding, road rules, and gear.",
  alternates: { canonical: "https://caredmvprep.com/motorcycle-practice-test" },
};

const topics = [
  "Protective gear and riding attire",
  "Pre-ride inspection checklist",
  "Braking distance and stopping techniques",
  "Lane positioning and cornering",
  "Riding in groups",
  "Crossing railroad tracks safely",
  "Handling road hazards (gravel, wet surfaces)",
  "Highway and freeway riding",
  "Carrying passengers and cargo",
  "Alcohol and riding impairment",
  "Sharing the road with vehicles",
  "State-specific motorcycle endorsement rules",
];

export default function MotorcyclePracticePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2240] to-[#3a0a0a] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🏍️</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Motorcycle Practice Tests</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Prepare for your state motorcycle knowledge test. Questions cover safe riding,
            road rules, and the skills needed to earn your endorsement.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white text-lg transition"
          >
            Get Early Access
          </Link>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Motorcycle Tests Coming Soon</h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              State-specific motorcycle endorsement practice tests are in development.
              Sign up to be notified at launch.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition text-sm"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Topics Covered</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 px-4 py-3 shadow-sm">
                <span className="text-red-600 font-bold text-lg">✓</span>
                <span className="text-sm text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
