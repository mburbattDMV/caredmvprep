import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why CARE",
  description:
    "Why CAREDMVPrep exists, how our practice tests are built from official state driver's manuals, and what we verify before publishing a claim.",
  alternates: { canonical: "https://caredmvprep.com/about" },
  openGraph: { url: "https://caredmvprep.com/about", images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }] },
};

/**
 * "Why CARE" — rebuilt 2026-09-08 to bring CARE DMV to the same structural/
 * visual quality as CARE Nursing's /why-care, named the CARE-wide benchmark
 * for this page. Concept reused, not literal code: this file keeps CARE
 * DMV's own navy/green identity — only the SHAPE (hero -> emphasized proof
 * statement -> differentiator cards -> accuracy section -> philosophy ->
 * free practice -> CARE family -> final CTA) is shared with the benchmark.
 *
 * Also drops the gradient hero background and the emoji-icon "What We Stand
 * For" cards the prior version used — both explicit anti-patterns for this
 * page family.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * CORRECTED CLAIM (2026-09-08)
 * ─────────────────────────────────────────────────────────────────────────
 * The prior version of this page said "Full practice tests... live today
 * for 15 states." Verified against src/lib/stripe/config.ts's
 * LIVE_STATE_ABBRS / LIVE_MOTORCYCLE_STATE_ABBRS — the only authoritative
 * source for commercial live status per this repo's own AGENTS.md — both
 * sets now have exactly 50 entries: full Driver's License AND Motorcycle
 * practice tests are commercially live in all 50 states, not 15. That is a
 * materially STRONGER true claim than the page previously made, corrected
 * here rather than left understating the real product. The homepage
 * ((marketing)/page.tsx) already says "all 50 states" and was not
 * contradicted by this change.
 *
 * Total question count (16,000+) is a real floor: getAllTestIds() +
 * getQuizConfig() sum to 16,532 across all 157 real test configs (DL,
 * motorcycle, and CDL endorsements combined) as of this pass.
 */

/**
 * THE CARE FAMILY — canonical across every CARE product's Why CARE page.
 *
 * Corrected 2026-09-08: this section previously showed only 4 LIVE sibling
 * sites, not the complete 10-brand family CARE Nursing's /why-care (the
 * named CARE-wide reference) displays. Same list, same order, same names
 * and blurbs as that page's own CARE_FAMILY — only `CURRENT_SITE` differs
 * per product. CARE Securities is intentionally NOT its own entry: it is a
 * product housed under CARE Insurance, folded into that entry's own blurb.
 *
 * `href: null` means "no live public destination yet" — Contractor/Electrician/
 * ACE Prep have no assigned domain to show. A future-product card is a
 * normal card (real border, real background) with no action — never
 * styled as disabled or broken.
 */
const CURRENT_SITE = "CARE DMV Prep";

interface CareFamilyEntry {
  name: string;
  blurb: string;
  href: string | null;
  isUmbrella?: boolean;
}

const CARE_FAMILY: CareFamilyEntry[] = [
  { name: "CARE Exam Prep", blurb: "The home of the CARE family. Find licensing exams, explore our preparation platforms, and access career and licensing resources.", href: "https://careexamprep.com", isUmbrella: true },
  { name: "CARE Real Estate", blurb: "State real estate licensing exam preparation.", href: "https://carealestate.com" },
  { name: "CARE DMV Prep", blurb: "Driver's license, motorcycle and CDL knowledge tests.", href: "https://caredmvprep.com" },
  { name: "CARE Insurance", blurb: "State insurance licensing — life, health, property and casualty — plus the SIE and Series 6, 7, 63, 65 and 66 exams.", href: "https://careinsuranceprep.com" },
  { name: "CARE CPA Prep", blurb: "Certified Public Accountant exam preparation.", href: "https://carecpaprep.com" },
  { name: "CARE Bar", blurb: "State bar examination preparation.", href: "https://carebarprep.com" },
  { name: "CARE Nursing", blurb: "NCLEX-RN, NCLEX-PN/LVN, CNA and Medication Aide.", href: "https://carenursingprep.com" },
  { name: "CARE Contractor Prep", blurb: "Licensing exam preparation for the construction trades.", href: null },
  { name: "CARE Electrician Prep", blurb: "Licensing exam preparation for electricians.", href: null },
  { name: "CARE ASE", blurb: "ASE automotive technician certification preparation.", href: null },
  { name: "CARE Fitness", blurb: "Fitness certification preparation, planned for the future.", href: null },
];

const DIFFERENTIATORS = [
  {
    title: "All 50 states, live today",
    body: "Full practice tests, timed mock exams, and progress tracking for the Driver's License AND Motorcycle knowledge tests — commercially live in every state, not a handful with the rest \"coming soon.\"",
  },
  {
    title: "Built from your state's own manual",
    body: "Every question is written from that state's official driver's manual — not a generic national question bank relabeled 50 times.",
  },
  {
    title: "CDL, covered separately and completely",
    body: "General Knowledge, Air Brakes, Hazmat, Passenger, School Bus, Tanker, and Doubles & Triples — each endorsement its own real question bank, not a single combined quiz.",
  },
  {
    title: "Free sample questions, every state",
    body: "Try real practice questions for your state before creating an account — a genuine sample of the same bank, not a cut-down teaser.",
  },
  {
    title: "Timed mock exams that feel like the real test",
    body: "Full-length, timed practice exams that mirror the format and pass/fail threshold of your state's actual knowledge test.",
  },
  {
    title: "Progress tracking that's honest",
    body: "Your dashboard shows what you've actually answered and where you're weakest — no fabricated readiness score, no guaranteed-to-pass claim.",
  },
] as const;

const ACCURACY_PRINCIPLES = [
  {
    title: "Sourced from the manual, not made up",
    body: "Questions are written independently from publicly available state driver's manuals. We don't fabricate pass rates or student counts to sound more established than we are.",
  },
  {
    title: "Independent, and we say so",
    body: "CAREDMVPrep is an independent study tool. We are not affiliated with, endorsed by, or connected to any state DMV, DHSMV, DPS, or other government agency.",
  },
] as const;

export default function WhyCarePage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-white py-20 px-6 text-center" style={{ backgroundColor: "var(--dmv-navy)" }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--dmv-green-light)" }}>
          Why CARE
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-balance">
          Built to help you pass the test you actually have to take.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Helping drivers across the U.S. prepare for their knowledge tests — one question at a time, built from the
          manual your state actually tests from.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-14 sm:py-16">
        {/* What makes CARE different */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center" style={{ color: "var(--dmv-navy)" }}>
            What makes CARE different
          </h2>
          <p className="mt-5 text-center text-2xl sm:text-3xl font-extrabold leading-tight text-balance">
            <span style={{ color: "var(--dmv-green)" }}>16,000+ Questions</span>{" "}
            <span style={{ color: "var(--dmv-navy)" }}>&middot; All 50 States &middot; DL, CDL &amp; Motorcycle</span>
          </p>
          <p className="mt-3 mb-10 text-center text-sm max-w-xl mx-auto text-gray-500">
            Built from official state driver&apos;s manuals, one state at a time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="care-card-static rounded-2xl border border-gray-100 bg-white p-5">
                <h3 className="text-base font-extrabold leading-snug tracking-tight" style={{ color: "var(--dmv-navy)" }}>
                  {d.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-500">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accuracy without made-up certainty */}
        <section className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center" style={{ color: "var(--dmv-navy)" }}>
            Accuracy without made-up certainty
          </h2>
          <p className="mt-2 mb-10 text-center text-sm max-w-xl mx-auto text-gray-500">
            The useful version of honesty is being specific about what we check, and about what we will not pretend
            to know.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {ACCURACY_PRINCIPLES.map((p) => (
              <div key={p.title} className="care-card-static rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="text-base font-extrabold tracking-tight" style={{ color: "var(--dmv-navy)" }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why we built CARE */}
        <section className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--dmv-navy)" }}>
            Why we built CARE
          </h2>
          <p className="mt-5 text-lg leading-relaxed font-bold" style={{ color: "var(--dmv-navy)" }}>
            Failing your knowledge test is frustrating — and often avoidable with the right material.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            CAREDMVPrep was built to make DMV test preparation simple, affordable, and effective. Our practice
            questions are based on each state&apos;s official driver&apos;s manual, so you can study with confidence
            knowing the material reflects what your state actually tests — not a generic quiz written for nobody in
            particular.
          </p>
        </section>

        {/* See CARE for yourself */}
        <section className="mt-20">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--dmv-navy)" }}>
              See CARE for yourself
            </h2>
            <p className="mt-2 text-sm max-w-lg mx-auto text-gray-500">
              Pick your state and try real practice questions before creating an account — the same bank our paying
              students use.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/states"
                className="care-card-interactive rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold"
                style={{ color: "var(--dmv-navy)" }}
              >
                Choose your state →
              </Link>
            </div>
          </div>
        </section>

        {/* The CARE family */}
        <section className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center" style={{ color: "var(--dmv-navy)" }}>
            The CARE family
          </h2>
          <p className="mt-3 mb-10 mx-auto text-center text-base leading-[1.7] max-w-[62ch] text-balance text-gray-700">
            CARE DMV Prep is one of several sibling exam-prep products built around the same approach: build
            questions from official, documented sources, explain the material clearly, and report your actual
            progress instead of pretending to predict whether you&rsquo;ll pass.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch max-w-5xl mx-auto">
            {CARE_FAMILY.map((f) => {
              const isCurrent = f.name === CURRENT_SITE;
              const title = (
                <h3
                  className={f.isUmbrella ? "text-lg font-extrabold tracking-tight" : "text-base font-extrabold tracking-tight"}
                  style={{ color: "var(--dmv-navy)" }}
                >
                  {f.name}
                </h3>
              );

              // CURRENT — this site, highlighted, no action.
              if (isCurrent) {
                return (
                  <div
                    key={f.name}
                    aria-current="page"
                    className="flex h-full flex-col rounded-2xl border p-5"
                    style={{ borderColor: "var(--dmv-green)", backgroundColor: "rgba(26,127,60,0.06)" }}
                  >
                    {title}
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--dmv-navy)" }}>
                      {f.blurb}
                    </p>
                    <span
                      className="mt-auto pt-5 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-white"
                      style={{ color: "var(--dmv-navy)", border: "1px solid var(--dmv-green)" }}
                    >
                      You are here
                    </span>
                  </div>
                );
              }

              // LIVE — a real destination, other than this site.
              if (f.href) {
                return (
                  <a
                    key={f.name}
                    href={f.href}
                    className="care-card-interactive flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5"
                  >
                    {title}
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.blurb}</p>
                    <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-bold" style={{ color: "var(--dmv-green)" }}>
                      Visit →
                    </span>
                  </a>
                );
              }

              // UMBRELLA — the family brand itself, no action, no status label.
              if (f.isUmbrella) {
                return (
                  <div key={f.name} className="flex h-full flex-col rounded-2xl border bg-white p-5" style={{ borderColor: "var(--dmv-green)" }}>
                    {title}
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.blurb}</p>
                  </div>
                );
              }

              // FUTURE — a real, named CARE product with no live destination yet.
              return (
                <div key={f.name} className="flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  {title}
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.blurb}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-20 rounded-2xl border border-amber-100 bg-amber-50 p-6 sm:p-8 max-w-3xl mx-auto">
          <h2 className="text-base font-extrabold text-amber-800 mb-2">Important disclaimer</h2>
          <p className="text-amber-700 text-sm leading-relaxed">
            CAREDMVPrep is an independent study tool. We are not affiliated with, endorsed by, or connected to any
            state DMV, DHSMV, DPS, or other government agency. The practice questions on this site are written
            independently based on publicly available state driver&apos;s manuals. They are for educational purposes
            only and may not reflect the exact questions on your actual knowledge test.
          </p>
        </section>

        {/* Final CTA */}
        <section className="mt-20 border-t border-gray-100 pt-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--dmv-navy)" }}>
            Ready to start practicing?
          </h2>
          <p className="mt-2 text-sm text-gray-500">Free sample questions available for all 50 states.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/states"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-base text-white shadow-lg"
              style={{ backgroundColor: "var(--dmv-green)" }}
            >
              Choose Your State →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border px-8 py-3.5 font-bold text-base"
              style={{ borderColor: "var(--dmv-navy)", color: "var(--dmv-navy)" }}
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
