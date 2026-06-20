import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CAREDMVPrep – Free DMV Practice Tests for All 50 States",
  description:
    "Study for your driver's license written test with free, state-specific DMV practice questions based on official state manuals. Car, CDL, and motorcycle tests available.",
  alternates: { canonical: "https://caredmvprep.com" },
};

const stateCards = [
  {
    state: "California",
    slug: "california-dmv-practice-test",
    emoji: "🌉",
    color: "from-yellow-400 to-orange-500",
  },
  {
    state: "Texas",
    slug: "texas-dmv-practice-test",
    emoji: "⭐",
    color: "from-blue-400 to-blue-600",
  },
  {
    state: "Florida",
    slug: "florida-dmv-practice-test",
    emoji: "🌴",
    color: "from-teal-400 to-cyan-600",
  },
  {
    state: "New York",
    slug: "new-york-dmv-practice-test",
    emoji: "🗽",
    color: "from-purple-400 to-indigo-600",
  },
];

const features = [
  {
    icon: "📋",
    title: "Practice Tests",
    desc: "Questions modeled after your state's official DMV knowledge exam.",
  },
  {
    icon: "📖",
    title: "Detailed Explanations",
    desc: "Every answer explained so you learn the reason, not just the answer.",
  },
  {
    icon: "📊",
    title: "Track Progress",
    desc: "See which topics you've mastered and where to focus next.",
  },
  {
    icon: "⭐",
    title: "Favorites",
    desc: "Bookmark tricky questions to review them before test day.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    desc: "Study from your phone, tablet, or computer — anywhere, anytime.",
  },
];

const testCategories = [
  {
    title: "DMV Practice Tests",
    description:
      "State-specific knowledge tests for your standard driver's license. Questions are based on each state's official driver manual.",
    href: "/california-dmv-practice-test",
    icon: "🚗",
    cta: "Start a DMV Test",
    bg: "bg-blue-50 border-blue-100",
    btnColor: "bg-[#1a7f3c] hover:bg-[#158532]",
  },
  {
    title: "CDL Practice Tests",
    description:
      "Commercial driver's license test prep including General Knowledge, Air Brakes, Hazmat, Passenger, and School Bus endorsements.",
    href: "/cdl-practice-test",
    icon: "🚛",
    cta: "Start a CDL Test",
    bg: "bg-orange-50 border-orange-100",
    btnColor: "bg-orange-600 hover:bg-orange-700",
  },
  {
    title: "Motorcycle Tests",
    description:
      "Motorcycle knowledge tests covering safe riding techniques, road rules, and gear — based on state-specific motorcycle manuals.",
    href: "/motorcycle-practice-test",
    icon: "🏍️",
    cta: "Start a Motorcycle Test",
    bg: "bg-red-50 border-red-100",
    btnColor: "bg-red-600 hover:bg-red-700",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0d2240] via-[#122d52] to-[#0a1c34] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#1a7f3c] blur-3xl" />
          <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-blue-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                Pass Your DMV Test
                <br />
                <span className="text-[#22a050]">The First Time</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Free DMV practice tests based on your state&apos;s official driver
                manual. Study smarter, feel confident on test day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#choose-state"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1a7f3c] hover:bg-[#158532] rounded-lg font-semibold text-white transition text-base"
                >
                  Choose Your State
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-white/40 rounded-lg font-semibold text-white hover:bg-white/10 transition text-base"
                >
                  View Pricing
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: "🎯", label: "Most Accurate Questions" },
                  { icon: "📚", label: "Based on Official Manuals" },
                  { icon: "📈", label: "Track Your Progress" },
                  { icon: "📱", label: "Study Anywhere, Anytime" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center text-center gap-1">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs text-gray-400 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1a7f3c] to-[#0d5c2a] flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white px-6">
                    <div className="text-6xl mb-3">🛣️</div>
                    <p className="text-xl font-bold uppercase tracking-wide">Your</p>
                    <p className="text-3xl font-extrabold text-[#7deba1]">Success</p>
                    <p className="text-xl font-bold uppercase tracking-wide">Starts Here</p>
                    <div className="mt-4 w-12 h-1 bg-white/40 mx-auto rounded" />
                    <p className="text-sm mt-3 text-green-200 font-semibold">→</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your State */}
      <section id="choose-state" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your State</h2>
            <p className="text-gray-500">Select your state to start a free DMV practice test</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stateCards.map((card) => (
              <Link
                key={card.slug}
                href={`/${card.slug}`}
                className="group rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className={`bg-gradient-to-br ${card.color} h-36 flex items-center justify-center text-5xl`}>
                  {card.emoji}
                </div>
                <div className="p-4 bg-white">
                  <p className="font-semibold text-gray-900 text-sm">{card.state}</p>
                  <p className="text-xs text-gray-500 mt-0.5">DMV Practice Test</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[#1a7f3c] group-hover:underline">
                    Start Practice →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[#1a7f3c] text-[#1a7f3c] px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition"
            >
              View All 50 States
            </Link>
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Everything You Need to Pass</h2>
            <p className="text-gray-500">Pick the test type that matches your license goal</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testCategories.map((cat) => (
              <div key={cat.title} className={`rounded-xl border p-6 ${cat.bg}`}>
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">{cat.description}</p>
                <Link
                  href={cat.href}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 ${cat.btnColor} text-white text-sm font-semibold rounded-lg transition`}
                >
                  {cat.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Built for Real Results</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-[#0d2240] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "50", label: "States Covered" },
              { value: "1,000+", label: "Practice Questions" },
              { value: "Free", label: "To Get Started" },
              { value: "24/7", label: "Available Anytime" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-[#22a050]">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-gray-500">Get test-ready in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Pick Your State", desc: "Select your state to get questions from that state's official driver manual." },
              { step: "2", title: "Take Practice Tests", desc: "Answer real-style DMV questions and read explanations for every answer." },
              { step: "3", title: "Track & Review", desc: "See your progress over time and focus on the areas where you need more practice." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#1a7f3c] text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#1a7f3c] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Start Your Journey Today</h2>
            <p className="text-green-100 text-sm">Free practice tests for every state — no account required to begin.</p>
          </div>
          <Link
            href="#choose-state"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1a7f3c] font-bold rounded-lg hover:bg-gray-100 transition whitespace-nowrap"
          >
            Get Started Now →
          </Link>
        </div>
      </section>
    </>
  );
}
