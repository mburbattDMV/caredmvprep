import type { Metadata } from "next";
import Link from "next/link";
import { LIVE_STATE_ABBRS, LIVE_MOTORCYCLE_STATE_ABBRS } from "@/lib/stripe/config";
import USStateMap from "@/components/USStateMap";
import { US_STATES } from "@/data/us-states";

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

const FULLY_LIVE_ABBRS = LIVE_STATE_ABBRS;

const states = US_STATES.map((s) => ({
  ...s,
  license:    `/${s.slug}-dmv-practice-test`,
  motorcycle: `/${s.slug}-motorcycle-practice-test`,
  cdl:        `/${s.slug}-cdl-practice-test`,
}));

const available  = states.filter((s) => FULLY_LIVE_ABBRS.has(s.abbr));
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

      {/* Interactive Map */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#0d2240' }}>Select Your State</h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>Choose a state on the map or browse all 50 states below.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <USStateMap
              urlPattern="/{slug}-dmv-practice-test"
              highlightedAbbrs={LIVE_STATE_ABBRS}
            />
          </div>
        </div>
      </section>

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
