import type { Metadata } from "next";
import Link from "next/link";
import { LIVE_STATE_ABBRS, LIVE_MOTORCYCLE_STATE_ABBRS } from "@/lib/stripe/config";

export const metadata: Metadata = {
  title: "DMV Practice Tests for All 50 States – Free State-by-State Test Prep",
  description:
    "Find free DMV practice tests for all 50 U.S. states. Select your state to start practicing for your driver's license, motorcycle endorsement, or CDL knowledge test.",
  alternates: { canonical: "https://caredmvprep.com/states" },
  openGraph: {
    url: "https://caredmvprep.com/states",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const faqs = [
  {
    q: "How many states are available right now?",
    a: "Free sample questions are available for all 50 U.S. states. Full practice tests, timed mock exams, and progress tracking after signup are live today for 15 states, with more added regularly — each tailored to that state's official driver handbook, agency terminology, and unique traffic laws.",
  },
  {
    q: "Are the questions state-specific?",
    a: "Yes. Each state's practice test is based on that state's official DMV driver handbook. Traffic laws, speed limits, road sign rules, and right-of-way regulations vary by state, so we tailor every question to the correct state-specific rules.",
  },
  {
    q: "Do you have motorcycle and CDL tests for each state?",
    a: "CDL General Knowledge is federally standardized, so it's available for every state with a live Driver's License test. Motorcycle question banks are rolling out state by state — check the state picker at checkout to see current motorcycle availability.",
  },
  {
    q: "Which states have the most unique driving laws tested?",
    a: "Every state has at least one law that distinguishes it from all others. A few standouts: Utah is the only state with a 0.05% DUI BAC threshold (all others use 0.08%); Vermont is the only state that bans all roadside billboards; New Hampshire is the only state with no mandatory adult seatbelt law; Wyoming's I-80 wind restriction system closes the highway to high-profile vehicles multiple times per year; and South Dakota's Needles Highway has tunnels too narrow for most RVs and CDL vehicles.",
  },
];

type StateEntry = {
  name: string;
  abbr: string;
  emoji: string;
  license?: string;
  motorcycle?: string;
  cdl?: string;
};

// States with a full practice test bank, timed mock exams, and progress
// tracking after signup. Sourced from the single live-state list in
// src/lib/stripe/config.ts so this page can't drift out of sync with what's
// actually purchasable. Every state has free sample questions on its own
// landing page regardless of this list.
const FULLY_LIVE_ABBRS = LIVE_STATE_ABBRS;

const states: StateEntry[] = [
  {
    name: "Alabama", abbr: "AL", emoji: "🌲",
    license: "/alabama-dmv-practice-test",
    motorcycle: "/alabama-motorcycle-practice-test",
    cdl: "/alabama-cdl-practice-test",
  },
  {
    name: "Alaska", abbr: "AK", emoji: "🏔️",
    license: "/alaska-dmv-practice-test",
    motorcycle: "/alaska-motorcycle-practice-test",
    cdl: "/alaska-cdl-practice-test",
  },
  {
    name: "Arizona", abbr: "AZ", emoji: "🌵",
    license: "/arizona-dmv-practice-test",
    motorcycle: "/arizona-motorcycle-practice-test",
    cdl: "/arizona-cdl-practice-test",
  },
  {
    name: "Arkansas", abbr: "AR", emoji: "💎",
    license: "/arkansas-dmv-practice-test",
    motorcycle: "/arkansas-motorcycle-practice-test",
    cdl: "/arkansas-cdl-practice-test",
  },
  {
    name: "California", abbr: "CA", emoji: "🌊",
    license: "/california-dmv-practice-test",
    motorcycle: "/california-motorcycle-practice-test",
    cdl: "/california-cdl-practice-test",
  },
  {
    name: "Colorado", abbr: "CO", emoji: "⛷️",
    license: "/colorado-dmv-practice-test",
    motorcycle: "/colorado-motorcycle-practice-test",
    cdl: "/colorado-cdl-practice-test",
  },
  {
    name: "Connecticut", abbr: "CT", emoji: "🏛️",
    license: "/connecticut-dmv-practice-test",
    motorcycle: "/connecticut-motorcycle-practice-test",
    cdl: "/connecticut-cdl-practice-test",
  },
  {
    name: "Delaware", abbr: "DE", emoji: "🦅",
    license: "/delaware-dmv-practice-test",
    motorcycle: "/delaware-motorcycle-practice-test",
    cdl: "/delaware-cdl-practice-test",
  },
  {
    name: "Florida", abbr: "FL", emoji: "🌴",
    license: "/florida-dmv-practice-test",
    motorcycle: "/florida-motorcycle-practice-test",
    cdl: "/florida-cdl-practice-test",
  },
  {
    name: "Georgia", abbr: "GA", emoji: "🍑",
    license: "/georgia-dmv-practice-test",
    motorcycle: "/georgia-motorcycle-practice-test",
    cdl: "/georgia-cdl-practice-test",
  },
  {
    name: "Hawaii", abbr: "HI", emoji: "🌺",
    license: "/hawaii-dmv-practice-test",
    motorcycle: "/hawaii-motorcycle-practice-test",
    cdl: "/hawaii-cdl-practice-test",
  },
  {
    name: "Idaho", abbr: "ID", emoji: "🥔",
    license: "/idaho-dmv-practice-test",
    motorcycle: "/idaho-motorcycle-practice-test",
    cdl: "/idaho-cdl-practice-test",
  },
  {
    name: "Illinois", abbr: "IL", emoji: "🌆",
    license: "/illinois-dmv-practice-test",
    motorcycle: "/illinois-motorcycle-practice-test",
    cdl: "/illinois-cdl-practice-test",
  },
  {
    name: "Indiana", abbr: "IN", emoji: "🏎️",
    license: "/indiana-dmv-practice-test",
    motorcycle: "/indiana-motorcycle-practice-test",
    cdl: "/indiana-cdl-practice-test",
  },
  {
    name: "Iowa", abbr: "IA", emoji: "🌽",
    license: "/iowa-dmv-practice-test",
    motorcycle: "/iowa-motorcycle-practice-test",
    cdl: "/iowa-cdl-practice-test",
  },
  {
    name: "Kansas", abbr: "KS", emoji: "🌾",
    license: "/kansas-dmv-practice-test",
    motorcycle: "/kansas-motorcycle-practice-test",
    cdl: "/kansas-cdl-practice-test",
  },
  {
    name: "Kentucky", abbr: "KY", emoji: "🏇",
    license: "/kentucky-dmv-practice-test",
    motorcycle: "/kentucky-motorcycle-practice-test",
    cdl: "/kentucky-cdl-practice-test",
  },
  {
    name: "Louisiana", abbr: "LA", emoji: "🎷",
    license: "/louisiana-dmv-practice-test",
    motorcycle: "/louisiana-motorcycle-practice-test",
    cdl: "/louisiana-cdl-practice-test",
  },
  {
    name: "Maine", abbr: "ME", emoji: "🦞",
    license: "/maine-dmv-practice-test",
    motorcycle: "/maine-motorcycle-practice-test",
    cdl: "/maine-cdl-practice-test",
  },
  {
    name: "Maryland", abbr: "MD", emoji: "🦀",
    license: "/maryland-dmv-practice-test",
    motorcycle: "/maryland-motorcycle-practice-test",
    cdl: "/maryland-cdl-practice-test",
  },
  {
    name: "Massachusetts", abbr: "MA", emoji: "🦃",
    license: "/massachusetts-dmv-practice-test",
    motorcycle: "/massachusetts-motorcycle-practice-test",
    cdl: "/massachusetts-cdl-practice-test",
  },
  {
    name: "Michigan", abbr: "MI", emoji: "🏭",
    license: "/michigan-dmv-practice-test",
    motorcycle: "/michigan-motorcycle-practice-test",
    cdl: "/michigan-cdl-practice-test",
  },
  {
    name: "Minnesota", abbr: "MN", emoji: "🌊",
    license: "/minnesota-dmv-practice-test",
    motorcycle: "/minnesota-motorcycle-practice-test",
    cdl: "/minnesota-cdl-practice-test",
  },
  {
    name: "Mississippi", abbr: "MS", emoji: "🎸",
    license: "/mississippi-dmv-practice-test",
    motorcycle: "/mississippi-motorcycle-practice-test",
    cdl: "/mississippi-cdl-practice-test",
  },
  {
    name: "Missouri", abbr: "MO", emoji: "🌉",
    license: "/missouri-dmv-practice-test",
    motorcycle: "/missouri-motorcycle-practice-test",
    cdl: "/missouri-cdl-practice-test",
  },
  {
    name: "Montana", abbr: "MT", emoji: "🏔️",
    license: "/montana-dmv-practice-test",
    motorcycle: "/montana-motorcycle-practice-test",
    cdl: "/montana-cdl-practice-test",
  },
  {
    name: "Nebraska", abbr: "NE", emoji: "🌽",
    license: "/nebraska-dmv-practice-test",
    motorcycle: "/nebraska-motorcycle-practice-test",
    cdl: "/nebraska-cdl-practice-test",
  },
  {
    name: "Nevada", abbr: "NV", emoji: "🎰",
    license: "/nevada-dmv-practice-test",
    motorcycle: "/nevada-motorcycle-practice-test",
    cdl: "/nevada-cdl-practice-test",
  },
  {
    name: "New Hampshire", abbr: "NH", emoji: "🍁",
    license: "/new-hampshire-dmv-practice-test",
    motorcycle: "/new-hampshire-motorcycle-practice-test",
    cdl: "/new-hampshire-cdl-practice-test",
  },
  {
    name: "New Jersey", abbr: "NJ", emoji: "🏖️",
    license: "/new-jersey-dmv-practice-test",
    motorcycle: "/new-jersey-motorcycle-practice-test",
    cdl: "/new-jersey-cdl-practice-test",
  },
  {
    name: "New Mexico", abbr: "NM", emoji: "🌵",
    license: "/new-mexico-dmv-practice-test",
    motorcycle: "/new-mexico-motorcycle-practice-test",
    cdl: "/new-mexico-cdl-practice-test",
  },
  {
    name: "New York", abbr: "NY", emoji: "🗽",
    license: "/new-york-dmv-practice-test",
    motorcycle: "/new-york-motorcycle-practice-test",
    cdl: "/new-york-cdl-practice-test",
  },
  {
    name: "North Carolina", abbr: "NC", emoji: "🏔️",
    license: "/north-carolina-dmv-practice-test",
    motorcycle: "/north-carolina-motorcycle-practice-test",
    cdl: "/north-carolina-cdl-practice-test",
  },
  {
    name: "North Dakota", abbr: "ND", emoji: "🌾",
    license: "/north-dakota-dmv-practice-test",
    motorcycle: "/north-dakota-motorcycle-practice-test",
    cdl: "/north-dakota-cdl-practice-test",
  },
  {
    name: "Ohio", abbr: "OH", emoji: "🎡",
    license: "/ohio-dmv-practice-test",
    motorcycle: "/ohio-motorcycle-practice-test",
    cdl: "/ohio-cdl-practice-test",
  },
  {
    name: "Oklahoma", abbr: "OK", emoji: "🌾",
    license: "/oklahoma-dmv-practice-test",
    motorcycle: "/oklahoma-motorcycle-practice-test",
    cdl: "/oklahoma-cdl-practice-test",
  },
  {
    name: "Oregon", abbr: "OR", emoji: "🌲",
    license: "/oregon-dmv-practice-test",
    motorcycle: "/oregon-motorcycle-practice-test",
    cdl: "/oregon-cdl-practice-test",
  },
  {
    name: "Pennsylvania", abbr: "PA", emoji: "🔔",
    license: "/pennsylvania-dmv-practice-test",
    motorcycle: "/pennsylvania-motorcycle-practice-test",
    cdl: "/pennsylvania-cdl-practice-test",
  },
  {
    name: "Rhode Island", abbr: "RI", emoji: "⚓",
    license: "/rhode-island-dmv-practice-test",
    motorcycle: "/rhode-island-motorcycle-practice-test",
    cdl: "/rhode-island-cdl-practice-test",
  },
  {
    name: "South Carolina", abbr: "SC", emoji: "🌴",
    license: "/south-carolina-dmv-practice-test",
    motorcycle: "/south-carolina-motorcycle-practice-test",
    cdl: "/south-carolina-cdl-practice-test",
  },
  {
    name: "South Dakota", abbr: "SD", emoji: "🦅",
    license: "/south-dakota-dmv-practice-test",
    motorcycle: "/south-dakota-motorcycle-practice-test",
    cdl: "/south-dakota-cdl-practice-test",
  },
  {
    name: "Tennessee", abbr: "TN", emoji: "🎸",
    license: "/tennessee-dmv-practice-test",
    motorcycle: "/tennessee-motorcycle-practice-test",
    cdl: "/tennessee-cdl-practice-test",
  },
  {
    name: "Texas", abbr: "TX", emoji: "⭐",
    license: "/texas-dmv-practice-test",
    motorcycle: "/texas-motorcycle-practice-test",
    cdl: "/texas-cdl-practice-test",
  },
  {
    name: "Utah", abbr: "UT", emoji: "🏜️",
    license: "/utah-dmv-practice-test",
    motorcycle: "/utah-motorcycle-practice-test",
    cdl: "/utah-cdl-practice-test",
  },
  {
    name: "Vermont", abbr: "VT", emoji: "🍁",
    license: "/vermont-dmv-practice-test",
    motorcycle: "/vermont-motorcycle-practice-test",
    cdl: "/vermont-cdl-practice-test",
  },
  {
    name: "Virginia", abbr: "VA", emoji: "🏛️",
    license: "/virginia-dmv-practice-test",
    motorcycle: "/virginia-motorcycle-practice-test",
    cdl: "/virginia-cdl-practice-test",
  },
  {
    name: "Washington", abbr: "WA", emoji: "☕",
    license: "/washington-dmv-practice-test",
    motorcycle: "/washington-motorcycle-practice-test",
    cdl: "/washington-cdl-practice-test",
  },
  {
    name: "West Virginia", abbr: "WV", emoji: "⛏️",
    license: "/west-virginia-dmv-practice-test",
    motorcycle: "/west-virginia-motorcycle-practice-test",
    cdl: "/west-virginia-cdl-practice-test",
  },
  {
    name: "Wisconsin", abbr: "WI", emoji: "🧀",
    license: "/wisconsin-dmv-practice-test",
    motorcycle: "/wisconsin-motorcycle-practice-test",
    cdl: "/wisconsin-cdl-practice-test",
  },
  {
    name: "Wyoming", abbr: "WY", emoji: "🤠",
    license: "/wyoming-dmv-practice-test",
    motorcycle: "/wyoming-motorcycle-practice-test",
    cdl: "/wyoming-cdl-practice-test",
  },
];

const available = states.filter((s) => FULLY_LIVE_ABBRS.has(s.abbr));
const sampleOnly = states.filter((s) => !FULLY_LIVE_ABBRS.has(s.abbr));

export default function StatesPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://caredmvprep.com" },
              { "@type": "ListItem", position: 2, name: "All States", item: "https://caredmvprep.com/states" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2240] to-[#1a3a5c] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Practice Tests for All 50 States</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            State-specific questions for your driver&apos;s license, motorcycle endorsement, and CDL — based on your official state DMV handbook.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">{available.length} states with full tests & mock exams</span>
            <span className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">Free sample questions in all 50</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-[#1a7f3c]">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-800 font-medium">All States</li>
          </ol>
        </div>
      </nav>

      {/* Available Now */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Now</h2>
          <p className="text-gray-500 text-sm mb-8">Full practice tests, mock exams, and progress tracking — Driver&apos;s License and CDL for every state below; Motorcycle where noted.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {available.map((state) => {
              const hasMoto = LIVE_MOTORCYCLE_STATE_ABBRS.has(state.abbr);
              return (
              <div key={state.abbr} className="rounded-2xl border-2 border-[#1a7f3c] bg-green-50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{state.emoji}</span>
                  <div>
                    <div className="font-extrabold text-gray-900 text-lg">{state.name}</div>
                    <div className="text-xs text-gray-500">{state.abbr}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link
                    href={state.license!}
                    className="flex items-center justify-between px-4 py-2.5 bg-white rounded-lg border border-[#1a7f3c] hover:bg-green-50 transition group"
                  >
                    <div>
                      <span className="text-xs text-gray-500 block">Driver&apos;s License</span>
                      <span className="text-sm font-semibold text-gray-900">Permit Practice Test</span>
                    </div>
                    <span className="text-[#1a7f3c] font-bold text-sm group-hover:underline">Start →</span>
                  </Link>
                  <Link
                    href={state.motorcycle!}
                    className="flex items-center justify-between px-4 py-2.5 bg-white rounded-lg border border-gray-200 hover:border-[#1a7f3c] hover:bg-green-50 transition group"
                  >
                    <div>
                      <span className="text-xs text-gray-500 block">Motorcycle</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {hasMoto ? "Motorcycle Practice Test" : "Sample Questions (full test coming soon)"}
                      </span>
                    </div>
                    <span className="text-[#1a7f3c] font-bold text-sm group-hover:underline">Start →</span>
                  </Link>
                  <Link
                    href={state.cdl!}
                    className="flex items-center justify-between px-4 py-2.5 bg-white rounded-lg border border-gray-200 hover:border-[#1a7f3c] hover:bg-green-50 transition group"
                  >
                    <div>
                      <span className="text-xs text-gray-500 block">CDL</span>
                      <span className="text-sm font-semibold text-gray-900">CDL Practice Test</span>
                    </div>
                    <span className="text-[#1a7f3c] font-bold text-sm group-hover:underline">Start →</span>
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* More states — free sample questions, full test coming soon */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">More States</h2>
          <p className="text-gray-500 text-sm mb-8">Free sample questions are available now. Full practice tests, mock exams, and progress tracking are rolling out to these states next — sign up to be notified.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {sampleOnly.map((state) => (
              <Link
                key={state.abbr}
                href={state.license!}
                className="block rounded-xl border border-gray-200 bg-white p-4 text-center hover:border-[#1a7f3c] transition"
              >
                <div className="text-2xl mb-1">{state.emoji}</div>
                <div className="font-medium text-gray-700 text-sm">{state.name}</div>
                <div className="text-xs text-gray-400">{state.abbr}</div>
                <div className="mt-2">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Sample questions</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore by Test Type</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/cdl-practice-test", label: "CDL Practice Tests" },
              { href: "/motorcycle-practice-test", label: "Motorcycle Practice Tests" },
              { href: "/cdl-general-knowledge", label: "CDL General Knowledge" },
              { href: "/motorcycle-permit-test", label: "Motorcycle Permit Test" },
              { href: "/resources", label: "Study Resources" },
              { href: "/pricing", label: "View Pricing" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#1a7f3c] hover:text-[#1a7f3c] transition">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-sm text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d2240] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Start Practicing Today — It&apos;s Free</h2>
          <p className="text-gray-400 text-sm mb-6">Create a free account to access practice tests, track your progress, and get notified when your state is added.</p>
          <Link href="/signup" className="px-7 py-3 bg-[#1a7f3c] hover:bg-green-700 rounded-lg font-semibold text-white transition">
            Start Practicing Free
          </Link>
        </div>
      </section>
    </div>
  );
}
