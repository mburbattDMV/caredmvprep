import type { Metadata } from "next";
import Image from "next/image";
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
    photo: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=80",
    alt: "Golden Gate Bridge, San Francisco, California",
  },
  {
    state: "Texas",
    slug: "texas-dmv-practice-test",
    photo: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=600&q=80",
    alt: "Dallas, Texas skyline",
  },
  {
    state: "Florida",
    slug: "florida-dmv-practice-test",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    alt: "Florida beach and palm trees",
  },
  {
    state: "New York",
    slug: "new-york-dmv-practice-test",
    photo: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
    alt: "Statue of Liberty, New York",
  },
];

const features = [
  { icon: "📋", title: "Practice Tests", desc: "Unlimited practice tests with questions just like the real exam." },
  { icon: "📖", title: "Detailed Explanations", desc: "Learn from your mistakes with clear, easy-to-understand explanations." },
  { icon: "📊", title: "Track Progress", desc: "Monitor your progress and see your scores improve over time." },
  { icon: "⭐", title: "Favorites", desc: "Bookmark difficult questions and review them later." },
  { icon: "📱", title: "Mobile Friendly", desc: "Study on your phone, tablet, or computer anytime, anywhere." },
];

const testimonials = [
  {
    quote: "CAREDMVPrep made studying so easy. I passed my test on the first try!",
    name: "Jessica R.",
    location: "California",
    initials: "JR",
    color: "bg-rose-400",
  },
  {
    quote: "The questions are exactly like the real DMV test. Highly recommend!",
    name: "Michael T.",
    location: "Texas",
    initials: "MT",
    color: "bg-blue-400",
  },
  {
    quote: "Great explanations and easy to use. Worth every penny!",
    name: "Samantha L.",
    location: "Florida",
    initials: "SL",
    color: "bg-emerald-400",
  },
];

const trustBadges = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#1a7f3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity={0.15} />
      </svg>
    ),
    label: "Most Accurate",
    sub: "Questions",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#1a7f3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: "Based on Official",
    sub: "DMV Manuals",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#1a7f3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "Track Your",
    sub: "Progress",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#1a7f3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path strokeLinecap="round" d="M12 18h.01" />
      </svg>
    ),
    label: "Study Anywhere,",
    sub: "Anytime",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: 380 }}>
        {/* Full-bleed coastal road photo */}
        <Image
          src="/bc.png"
          alt="Car driving down a scenic coastal highway with success sign"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Mobile: full white overlay. Desktop: left gradient only */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{ background: "rgba(255,255,255,0.88)" }}
        />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 30%, rgba(255,255,255,0.55) 52%, rgba(255,255,255,0) 68%)",
          }}
        />

        {/* Content row */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-14 flex items-center justify-between gap-8">
          {/* Left: text */}
          <div className="max-w-md">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0d1a2d] leading-tight">
              Pass Your DMV Test
            </h1>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a7f3c] leading-tight mb-4">
              The First Time
            </h2>
            <p className="text-gray-700 text-sm sm:text-base mb-7 leading-relaxed max-w-sm">
              CAREDMVPrep offers the most accurate DMV practice tests for all 50
              states. Study smarter, pass with confidence, and get on the road.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#choose-state"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a7f3c] hover:bg-[#15702f] text-white font-bold text-sm rounded transition"
              >
                CHOOSE YOUR STATE
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-400 text-gray-800 font-semibold text-sm rounded hover:bg-white/60 transition bg-white/40"
              >
                VIEW PRICING
              </Link>
            </div>
          </div>

        </div>

        {/* Trust badge strip pinned to bottom of hero */}
        <div className="relative bg-white/90 backdrop-blur-sm border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-3 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-2.5">
                {b.icon}
                <span className="text-xs text-gray-700 font-medium leading-tight">
                  {b.label}
                  <br />
                  {b.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHOOSE YOUR STATE ─────────────────────────────────── */}
      <section id="choose-state" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Choose Your State</h2>
            <p className="text-gray-500 text-sm">Select your state to start your DMV practice test</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stateCards.map((card) => (
              <Link
                key={card.slug}
                href={`/${card.slug}`}
                className="group rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={card.photo}
                    alt={card.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="font-semibold text-gray-900 text-sm">{card.state}</p>
                  <p className="text-xs text-gray-500 mt-0.5">DMV Practice Test</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#1a7f3c] group-hover:underline">
                    Start Practice →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center border border-[#1a7f3c] text-[#1a7f3c] px-6 py-2.5 rounded text-sm font-semibold hover:bg-green-50 transition"
            >
              VIEW ALL 50 STATES
            </Link>
          </div>
        </div>
      </section>

      {/* ── EVERYTHING YOU NEED ───────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Everything You Need to Pass
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
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

      {/* ── STATS BANNER ──────────────────────────────────────── */}
      <section className="bg-[#0d2240] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: "👥", value: "All 50", label: "States Covered" },
              { icon: "✅", value: "Free", label: "To Get Started" },
              { icon: "📋", value: "1,000+", label: "Practice Questions" },
              { icon: "⭐", value: "24/7", label: "Available Anytime" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{s.icon}</span>
                <p className="text-3xl font-extrabold text-[#22a050]">{s.value}</p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Trusted by Students Across the Country
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-xl border border-gray-100 p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/about"
              className="inline-flex items-center border border-[#1a7f3c] text-[#1a7f3c] px-6 py-2.5 rounded text-sm font-semibold hover:bg-green-50 transition"
            >
              READ MORE REVIEWS
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="bg-[#1a7f3c] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl shrink-0">
              🛞
            </div>
            <div>
              <h2 className="text-xl font-bold">Start Your Journey Today</h2>
              <p className="text-green-100 text-sm mt-0.5">
                Join the students who passed their DMV test with CAREDMVPrep.
              </p>
            </div>
          </div>
          <Link
            href="#choose-state"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1a7f3c] font-bold rounded hover:bg-gray-100 transition whitespace-nowrap"
          >
            GET STARTED NOW →
          </Link>
        </div>
      </section>
    </>
  );
}
