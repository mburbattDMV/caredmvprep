import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About – CAREDMVPrep",
  description:
    "CAREDMVPrep is a DMV practice test platform helping drivers prepare for their state knowledge tests using questions based on official driver's manuals.",
  alternates: { canonical: "https://caredmvprep.com/about" },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2240] to-[#122d52] text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About CAREDMVPrep</h1>
          <p className="text-gray-300 text-lg">
            Helping drivers across the U.S. prepare for their knowledge tests — one question at a time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            CAREDMVPrep was built to make DMV test preparation simple, affordable, and effective.
            We know that failing your knowledge test is frustrating — and often avoidable with the
            right practice material.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our practice questions are based on each state&apos;s official driver&apos;s manual, so you can
            study with confidence knowing the material reflects what your state actually tests.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We cover all 50 states, plus CDL and motorcycle endorsement tests — all in one place.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-amber-800 mb-3">Important Disclaimer</h2>
          <p className="text-amber-700 text-sm leading-relaxed">
            CAREDMVPrep is an independent study tool. We are not affiliated with, endorsed by,
            or connected to any state DMV, DHSMV, DPS, or other government agency. The practice
            questions on this site are written independently based on publicly available state
            driver&apos;s manuals. They are for educational purposes only and may not reflect the
            exact questions on your actual knowledge test.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What We Stand For</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Accuracy", desc: "Questions sourced from official state driver's manuals, not made-up content." },
              { icon: "🔍", title: "Transparency", desc: "We don't make fake claims about pass rates or student counts. We're just getting started." },
              { icon: "🆓", title: "Accessibility", desc: "Free practice for everyone. No one should fail their DMV test because they couldn't afford prep material." },
            ].map((v) => (
              <div key={v.title} className="text-center bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a7f3c] text-white py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">Ready to start practicing?</h2>
          <p className="text-green-100 text-sm mb-6">Free tests available for all 50 states.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-7 py-3 bg-white text-[#1a7f3c] font-bold rounded-lg hover:bg-gray-100 transition">
              Choose Your State
            </Link>
            <Link href="/contact" className="px-7 py-3 border border-white/40 rounded-lg font-semibold text-white hover:bg-white/10 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
