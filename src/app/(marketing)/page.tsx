import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StateSearch from "@/components/StateSearch";

export const metadata: Metadata = {
  title: "CAREDMVPrep – Free DMV Practice Tests for All 50 States",
  description:
    "Study for your driver's license written test with free, state-specific DMV practice questions based on official state manuals. Car, CDL, and motorcycle tests available.",
  alternates: { canonical: "https://caredmvprep.com" },
  openGraph: { url: 'https://caredmvprep.com', images: [{ url: 'https://caredmvprep.com/opengraph-image', width: 1200, height: 630 }] },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://caredmvprep.com/#website",
      "url": "https://caredmvprep.com",
      "name": "CAREDMVPrep",
      "description": "Free DMV practice tests for all 50 states — Driver's License, CDL, and Motorcycle. State-specific questions based on official DMV handbooks.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://caredmvprep.com/states?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://caredmvprep.com/#organization",
      "name": "CAREDMVPrep",
      "url": "https://caredmvprep.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://caredmvprep.com/logo-header.png",
        "width": 700,
        "height": 140
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@caredmvprep.com",
        "contactType": "customer support"
      },
      "sameAs": []
    }
  ]
};

const features = [
  { icon: "📋", title: "Practice Tests", desc: "Unlimited practice tests with questions just like the real exam." },
  { icon: "📖", title: "Detailed Explanations", desc: "Learn from your mistakes with clear, easy-to-understand explanations." },
  { icon: "📊", title: "Track Progress", desc: "Monitor your progress and see your scores improve over time." },
  { icon: "⭐", title: "Favorites", desc: "Bookmark difficult questions and review them later." },
  { icon: "📱", title: "Mobile Friendly", desc: "Study on your phone, tablet, or computer anytime, anywhere." },
];

const trustBadges = [
  {
    icon: (
      <svg className="w-6 h-6" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
      <svg className="w-6 h-6" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: "Based on Official",
    sub: "DMV Manuals",
  },
  {
    icon: (
      <svg className="w-6 h-6" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "Track Your",
    sub: "Progress",
  },
  {
    icon: (
      <svg className="w-6 h-6" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path strokeLinecap="round" d="M12 18h.01" />
      </svg>
    ),
    label: "Study Anywhere,",
    sub: "Anytime",
  },
];

const whyItems = [
  {
    icon: (
      <svg className="w-7 h-7" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Questions Based on Official State Manuals",
    desc: "Every practice question is sourced directly from your state's official driver handbook — no guesswork.",
  },
  {
    icon: (
      <svg className="w-7 h-7" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Detailed Answer Explanations",
    desc: "Understand exactly why each answer is right or wrong with clear, easy-to-read explanations after every question.",
  },
  {
    icon: (
      <svg className="w-7 h-7" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "Driver's License, Motorcycle & CDL Tests",
    desc: "One platform for every license type — car, motorcycle, and commercial. No need to jump between sites.",
  },
  {
    icon: (
      <svg className="w-7 h-7" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Progress Tracking",
    desc: "See your scores improve over time. Know exactly when you're ready to walk into the DMV with confidence.",
  },
  {
    icon: (
      <svg className="w-7 h-7" style={{ color: "#1a7f3c" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "All 50 States Covered",
    desc: "Full practice tests, mock exams, and progress tracking — Driver's License, Motorcycle, and CDL — for all 50 states.",
  },
];

const popularTests = [
  { label: "California Permit Test", href: "/california-dmv-practice-test" },
  { label: "Texas Permit Test", href: "/texas-dmv-practice-test" },
  { label: "Florida Permit Test", href: "/florida-dmv-practice-test" },
  { label: "New York Permit Test", href: "/new-york-dmv-practice-test" },
  { label: "California Motorcycle Test", href: "/motorcycle-practice-test" },
  { label: "CDL General Knowledge Test", href: "/cdl-practice-test" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: '650px' }}>
        <Image
          src="/bc.png"
          alt="Car driving down a scenic coastal highway with success sign"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          priority
        />

        <div className="absolute inset-0">
          {/* Mobile overlay */}
          <div
            className="absolute inset-0 sm:hidden"
            style={{ background: "rgba(255,255,255,0.43)" }}
          />
          {/* Desktop left-fade gradient */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.58) 28%, rgba(255,255,255,0.24) 50%, rgba(255,255,255,0) 65%)",
            }}
          />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-start pt-14 gap-8">
            <div className="max-w-md">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight" style={{ color: '#0d1a2d' }}>
                Pass Your DMV Test
              </h1>
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-1" style={{ color: '#1a7f3c' }}>
                The First Time
              </h2>
              <p className="text-base font-semibold mb-5" style={{ color: '#374151' }}>
                Practice Tests for All 50 States
              </p>
              <p className="text-gray-700 text-sm sm:text-base mb-7 leading-relaxed max-w-sm">
                Practice questions, detailed explanations, and study tools based on official state DMV manuals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#choose-state"
                  className="inline-flex items-center gap-2 px-9 py-4 text-white font-bold rounded-lg transition shadow-lg"
                  style={{ backgroundColor: '#1a7f3c', fontSize: '17px', letterSpacing: '0.03em' }}
                >
                  CHOOSE YOUR STATE
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-7 py-4 border-2 border-gray-500 font-semibold rounded-lg hover:bg-white/60 transition"
                  style={{ color: '#1a2d1a', backgroundColor: 'rgba(255,255,255,0.55)', fontSize: '15px' }}
                >
                  VIEW PRICING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ──────────────────────────────────────── */}
      <div className="bg-white border-t border-b border-gray-200">
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

      {/* ── TEST TYPES ─────────────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#0d1a2d' }}>What Are You Studying For?</h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>Select your test type to begin practicing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Driver's License */}
            <Link
              href="#choose-state"
              className="rounded-2xl p-8 border-2 border-gray-200 bg-white text-center flex flex-col items-center hover:shadow-xl transition"
            >
              <div className="rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#e8f5ee', width: '72px', height: '72px' }}>
                <svg width="38" height="38" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} style={{ color: '#1a7f3c' }}>
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <circle cx="8" cy="12" r="2.5" />
                  <path strokeLinecap="round" d="M13 10h5M13 13h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0d1a2d' }}>Driver&apos;s License Tests</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#6b7280' }}>
                Practice for your state&apos;s written knowledge test. Full practice tests, timed mock exams, and progress tracking for all 50 states.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: '#1a7f3c' }}>
                Start Practicing →
              </span>
            </Link>

            {/* Motorcycle */}
            <Link
              href="/motorcycle-practice-test"
              className="rounded-2xl p-8 border-2 border-gray-200 bg-white text-center flex flex-col items-center hover:shadow-xl transition"
            >
              <div className="rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#e8f5ee', width: '72px', height: '72px' }}>
                <svg width="38" height="38" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} style={{ color: '#1a7f3c' }}>
                  <circle cx="5" cy="17" r="3" />
                  <circle cx="19" cy="17" r="3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3.5L6 10h6l4 4.5H19M10 10l1.5 7M16 14.5L14 11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0d1a2d' }}>Motorcycle Tests</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#6b7280' }}>
                Prepare for your motorcycle endorsement exam with practice questions covering rules of the road, safety, and more.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: '#1a7f3c' }}>
                Start Practicing →
              </span>
            </Link>

            {/* CDL */}
            <Link
              href="/cdl-practice-test"
              className="rounded-2xl p-8 border-2 border-gray-200 bg-white text-center flex flex-col items-center hover:shadow-xl transition"
            >
              <div className="rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#e8f5ee', width: '72px', height: '72px' }}>
                <svg width="38" height="38" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} style={{ color: '#1a7f3c' }}>
                  <rect x="1" y="6" width="13" height="10" rx="1" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 9h4.5L21 12v4h-7V9z" />
                  <circle cx="5" cy="18" r="2" />
                  <circle cx="18" cy="18" r="2" />
                  <path strokeLinecap="round" d="M7 18h9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0d1a2d' }}>CDL Tests</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#6b7280' }}>
                Study for your Commercial Driver&apos;s License with general knowledge, air brakes, hazmat, and specialty endorsement tests.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: '#1a7f3c' }}>
                Start Practicing →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CHOOSE YOUR STATE ─────────────────────────────────── */}
      <section id="choose-state" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-1" style={{ color: '#111827' }}>Choose Your State</h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>Select your state to start your DMV practice test.</p>
          </div>

          <StateSearch />
        </div>
      </section>

      {/* ── POPULAR DMV TESTS ─────────────────────────────────── */}
      <section className="py-12" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#0d1a2d' }}>Popular DMV Tests</h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>Jump straight to the most-requested practice tests</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularTests.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center justify-center px-3 py-4 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-center leading-snug hover:shadow-md transition"
                style={{ color: '#0d1a2d' }}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY STUDENTS CHOOSE ───────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#0d1a2d' }}>Why Students Choose CAREDMVPrep</h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>Built to help you pass — not just practice</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 rounded-xl border border-gray-100 bg-gray-50 hover:shadow-md transition"
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#e8f5ee' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#0d1a2d' }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVERYTHING YOU NEED ───────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#111827' }}>
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
      <section className="text-white py-12" style={{ backgroundColor: '#0d2240' }}>
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
                <p className="text-3xl font-extrabold" style={{ color: '#22a050' }}>{s.value}</p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#0d1a2d' }}>
              Built for First-Time Passers
            </h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              Three things that make CAREDMVPrep different from generic quiz apps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: '#e8f5ee' }}>
                <svg className="w-6 h-6" style={{ color: '#1a7f3c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#0d1a2d' }}>State-Specific, Not Generic</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                Questions are written for your state — covering your state&apos;s actual speed limits, BAC thresholds, GDL rules, and agency names. A California question won&apos;t appear in your Texas test.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: '#e8f5ee' }}>
                <svg className="w-6 h-6" style={{ color: '#1a7f3c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#0d1a2d' }}>From Official Manuals</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                Every question maps to your state&apos;s current driver handbook. No outdated rules, no invented scenarios — just the material the DMV actually tests.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: '#e8f5ee' }}>
                <svg className="w-6 h-6" style={{ color: '#1a7f3c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#0d1a2d' }}>Explanations That Teach</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                Wrong answers come with an explanation of why — not just the correct choice. You learn the rule, not just the answer, so you&apos;re ready for questions you haven&apos;t seen before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="text-white py-12" style={{ backgroundColor: '#1a7f3c' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl shrink-0">
              🛞
            </div>
            <div>
              <h2 className="text-xl font-bold">Start Your Journey Today</h2>
              <p className="text-green-100 text-sm mt-0.5">
                Free sample questions for all 50 states — full practice tests, CDL, and motorcycle where available.
              </p>
            </div>
          </div>
          <Link
            href="#choose-state"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded hover:bg-gray-100 transition whitespace-nowrap"
            style={{ backgroundColor: '#fff', color: '#1a7f3c' }}
          >
            GET STARTED NOW →
          </Link>
        </div>
      </section>
    </>
  );
}
