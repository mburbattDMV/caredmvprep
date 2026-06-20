import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CDL Practice Test – Free Commercial Driver's License Exam Prep",
  description:
    "Free CDL practice tests covering General Knowledge, Air Brakes, Hazmat, Passenger, and School Bus endorsements. Based on official FMCSA guidelines.",
  alternates: { canonical: "https://caredmvprep.com/cdl-practice-test" },
};

const endorsements = [
  { id: "general", icon: "📋", title: "CDL General Knowledge", desc: "Core knowledge required for all CDL applicants: traffic laws, vehicle inspection, shifting, and cargo handling.", questions: 50, required: true },
  { id: "air-brakes", icon: "🛑", title: "Air Brakes", desc: "Covers air brake system components, inspection procedures, and safe operation — required if your vehicle has air brakes.", questions: 25, required: false },
  { id: "hazmat", icon: "☢️", title: "Hazardous Materials", desc: "Federal hazmat regulations, placarding, loading/unloading, and emergency response for transporting dangerous goods.", questions: 30, required: false },
  { id: "passenger", icon: "🚌", title: "Passenger Transport", desc: "Rules for transporting passengers safely, including loading, on-board procedures, and emergency exits.", questions: 20, required: false },
  { id: "school-bus", icon: "🚍", title: "School Bus", desc: "School bus-specific rules: student loading/unloading zones, railroad crossings, and emergency evacuation.", questions: 20, required: false },
];

export default function CDLPracticePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2240] to-[#1a3a5c] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🚛</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">CDL Practice Tests</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Free Commercial Driver&apos;s License practice tests for General Knowledge and all major endorsements.
            Based on official FMCSA guidelines.
          </p>
        </div>
      </section>

      {/* Endorsements */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Select a CDL Test</h2>
          <div className="space-y-4">
            {endorsements.map((e) => (
              <div key={e.id} id={e.id} className="rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition bg-white flex flex-col sm:flex-row gap-4 items-start">
                <div className="text-4xl">{e.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-gray-900">{e.title}</h3>
                    {e.required && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Required</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{e.desc}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">{e.questions} questions</span>
                    <div className="h-3 w-px bg-gray-200" />
                    <span className="text-xs text-orange-600 font-medium">Coming soon</span>
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className="shrink-0 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition"
                >
                  Get Early Access
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d2240] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Starting your CDL journey?</h2>
          <p className="text-gray-400 text-sm mb-6">Sign up to be notified when CDL practice tests go live.</p>
          <Link href="/pricing" className="px-7 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold text-white transition">
            View Pricing & Get Notified
          </Link>
        </div>
      </section>
    </div>
  );
}
