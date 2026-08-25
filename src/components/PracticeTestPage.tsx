import Link from "next/link";
import SampleQuestions from "./SampleQuestions";
import NearbyStates from "./NearbyStates";
import { sanitizeSampleQuestion } from "@/lib/quizGrading";
import {
  getStateFactsByAbbr,
  getTestTypeFromSlug,
  getQuestionCount,
  getPassCount,
  getPassingPct,
  getHandbookUrl,
  buildBasedOn,
  formatAge,
  formatHelmetLaw,
  formatLaneSplitting,
} from "@/lib/state-facts-lookup";

export interface SampleQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Client-safe shape — deliberately omits `correctIndex` and `explanation`.
// This is what actually reaches SampleQuestions (a "use client" component);
// the answer key is encrypted into `token` server-side by
// sanitizeSampleQuestion() and only recoverable inside the
// /api/grade-sample-answer route. See src/lib/quizGrading.ts.
export interface ClientSampleQuestion {
  question: string;
  options: string[];
  token: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RelatedTest {
  label: string;
  href: string;
}

export interface KeyRule {
  icon: string;
  rule: string;
  detail: string;
}

/** One row in a multi-format test card (age-split or section-split tests). */
export interface SplitTest {
  label: string;
  questions: number;
  toPass: number;
  /** Per-section passing % — omit when all sections share the same overall passing score. */
  passingPct?: string;
}

export interface PracticeTestPageProps {
  state: string;
  stateAbbr: string;
  testLabel: string;
  slug: string;
  headline: string;
  intro: string;
  /** String editorial override only (e.g. "36 (18+) / 46 (under 18)"). Numeric values are superseded by state-facts.ts. */
  numQuestions?: number | string;
  /** String editorial override only. Numeric values are superseded by state-facts.ts. */
  numToPass?: number | string;
  /** Superseded by state-facts.ts when available. */
  passingScore?: string;
  /** Superseded by state-facts.ts when available. */
  basedOn?: string;
  about: string[];
  sampleQuestions: SampleQuestion[];
  faqs: FAQ[];
  relatedTests: RelatedTest[];
  keyRules?: KeyRule[];
  /**
   * Use for states with age-split or section-split tests (CA, PA).
   * When provided, replaces the generic Total Questions / Questions to Pass rows
   * with one clean row per format. Passing Score row is omitted when every
   * SplitTest entry supplies its own passingPct.
   */
  splitTests?: SplitTest[];
}

export default function PracticeTestPage({
  state,
  stateAbbr,
  testLabel,
  slug,
  headline,
  intro,
  numQuestions,
  numToPass,
  passingScore,
  basedOn,
  about,
  sampleQuestions,
  faqs,
  relatedTests,
  keyRules,
  splitTests,
}: PracticeTestPageProps) {
  const canonical = `https://caredmvprep.com/${slug}`;

  // Single source of truth: look up authoritative state facts by stateAbbr
  const sf = getStateFactsByAbbr(stateAbbr);
  const testType = getTestTypeFromSlug(slug);

  // Structural data always comes from state-facts.ts; string editorial overrides (e.g. CA age-split) are preserved
  const sfQuestions = sf ? getQuestionCount(sf, testType) : undefined;
  const sfToPass = sf ? getPassCount(sf, testType) : undefined;
  const sfPassingPct = sf ? getPassingPct(sf, testType) : undefined;
  const sfBasedOn = sf ? buildBasedOn(sf, testType) : undefined;

  const effectiveQuestions =
    typeof numQuestions === "string" ? numQuestions : (sfQuestions ?? numQuestions ?? "—");
  const effectiveToPass =
    typeof numToPass === "string" ? numToPass : (sfToPass ?? numToPass ?? "—");
  const effectivePassingPct = sfPassingPct ?? passingScore ?? "—";
  const effectiveBasedOn = sfBasedOn ?? basedOn ?? `${state} Driver Handbook`;

  // Supplemental info sourced from state-facts.ts
  const handbookUrl = sf ? getHandbookUrl(sf, testType) : null;
  const agencyName = sf?.agencyName ?? null;
  const agencyUrl = sf?.agencyUrl ?? null;
  const permitMinAgeDisplay =
    testType === "dmv" && sf && sf.permitMinAge !== "NEEDS_VERIFICATION"
      ? formatAge(sf.permitMinAge)
      : null;
  const helmetLaw = testType === "motorcycle" && sf ? formatHelmetLaw(sf) : null;
  const laneSplitting =
    testType === "motorcycle" && sf ? formatLaneSplitting(sf) : null;

  // Sanitize sample questions server-side before they ever reach the client
  // component — the answer key (correctIndex/explanation) is encrypted into
  // an opaque token here and only decrypted inside /api/grade-sample-answer
  // once the student submits an answer. See src/lib/quizGrading.ts.
  const clientSampleQuestions: ClientSampleQuestion[] = sampleQuestions.map((q) =>
    sanitizeSampleQuestion(q)
  );

  // When every splitTest has its own passingPct, hide the shared Passing Score row
  const hasSplitPassingPcts =
    splitTests != null &&
    splitTests.length > 0 &&
    splitTests.every((st) => st.passingPct != null);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://caredmvprep.com" },
      { "@type": "ListItem", position: 2, name: "All States", item: "https://caredmvprep.com/states" },
      { "@type": "ListItem", position: 3, name: headline, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: headline,
    description: `Free ${state} ${testLabel} practice test with ${effectiveQuestions} questions based on the official ${effectiveBasedOn}. Pass with ${effectivePassingPct}.`,
    url: canonical,
    educationalLevel: "beginner",
    learningResourceType: "Practice Problem",
    teaches: `${state} DMV written knowledge test`,
    // Deliberately omits `acceptedAnswer`/`comment` — including the correct
    // answer here would embed the answer key in the page's raw HTML source
    // (readable before any JS runs, and before the visitor answers), which
    // is exactly the leak this component was fixed to close. `hasPart`
    // without `acceptedAnswer` is still valid schema.org Quiz/Question
    // markup; it just doesn't advertise the correct answer to crawlers.
    hasPart: sampleQuestions.map((q, i) => ({
      "@type": "Question",
      position: i + 1,
      name: q.question,
    })),
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      {/* ── BREADCRUMBS ──────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-100" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
            <li><Link href="/" className="hover:text-gray-800 transition">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href="/states" className="hover:text-gray-800 transition">All States</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href={`/${slug}`} className="hover:text-gray-800 transition">{state}</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium truncate">{headline}</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="text-white py-14 lg:py-20" style={{ backgroundColor: '#0f1e3c' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: title + intro + CTA */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-5" style={{ backgroundColor: 'rgba(26,127,60,0.25)', color: '#4ade80' }}>
                {state} · {testLabel}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                {headline}
              </h1>
              <p className="text-gray-300 text-base lg:text-lg mb-8 max-w-2xl leading-relaxed">
                {intro}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#practice-questions"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-lg transition text-white"
                  style={{ backgroundColor: '#1a7f3c', fontSize: '15px' }}
                >
                  Try Sample Questions
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-3 3 3 3M5 12h14" />
                  </svg>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-7 py-3.5 border border-white/30 font-semibold rounded-lg hover:bg-white/10 transition text-white"
                  style={{ fontSize: '15px' }}
                >
                  Full Practice Exam →
                </Link>
              </div>
            </div>

            {/* Right: stats card — data sourced from state-facts.ts */}
            <div className="w-full lg:w-72 shrink-0 rounded-2xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Test at a Glance</h2>
              <dl className="space-y-4">
                {splitTests && splitTests.length > 0 ? (
                  /* Age-split or section-split test (e.g. CA 18+ vs under-18, PA signs vs road rules) */
                  <>
                    {splitTests.map((st, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-white/10 pb-4">
                        <dt className="text-sm text-gray-400 shrink-0 pr-2">{st.label}</dt>
                        <dd className="text-sm font-semibold text-white text-right leading-snug">
                          {st.questions} questions · {st.toPass} to pass
                          {st.passingPct && (
                            <span className="block text-xs font-normal" style={{ color: '#4ade80' }}>{st.passingPct}</span>
                          )}
                        </dd>
                      </div>
                    ))}
                    {!hasSplitPassingPcts && (
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <dt className="text-sm text-gray-400">Passing Score</dt>
                        <dd className="text-lg font-bold" style={{ color: '#4ade80' }}>{effectivePassingPct}</dd>
                      </div>
                    )}
                  </>
                ) : (
                  /* Standard single-format test */
                  <>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <dt className="text-sm text-gray-400">Total Questions</dt>
                      <dd className="text-lg font-bold text-white">{effectiveQuestions}</dd>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <dt className="text-sm text-gray-400">Questions to Pass</dt>
                      <dd className="text-lg font-bold text-white">{effectiveToPass}</dd>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <dt className="text-sm text-gray-400">Passing Score</dt>
                      <dd className="text-lg font-bold" style={{ color: '#4ade80' }}>{effectivePassingPct}</dd>
                    </div>
                  </>
                )}
                {permitMinAgeDisplay !== null && (
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <dt className="text-sm text-gray-400">Min Permit Age</dt>
                    <dd className="text-sm font-semibold text-white">{permitMinAgeDisplay}</dd>
                  </div>
                )}
                {helmetLaw !== null && (
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <dt className="text-sm text-gray-400">Helmet Law</dt>
                    <dd className="text-sm font-semibold text-white text-right max-w-[140px] leading-snug">{helmetLaw}</dd>
                  </div>
                )}
                {laneSplitting !== null && (
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <dt className="text-sm text-gray-400">Lane Splitting</dt>
                    <dd className="text-sm font-semibold text-white">{laneSplitting}</dd>
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <dt className="text-sm text-gray-400">Based On</dt>
                  <dd className="text-sm font-semibold text-white text-right max-w-[140px] leading-snug">{effectiveBasedOn}</dd>
                </div>
              </dl>

              {/* Official handbook link — sourced from state-facts.ts */}
              {handbookUrl && (
                <a
                  href={handbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold border border-white/20 hover:bg-white/10 transition text-gray-300"
                >
                  Official Handbook
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              <Link
                href="/pricing"
                className="mt-3 block w-full text-center py-3 rounded-lg font-bold text-sm transition"
                style={{ backgroundColor: '#1a7f3c', color: '#fff' }}
              >
                Start Full Practice Test
              </Link>

              {/* Official agency attribution — sourced from state-facts.ts */}
              {agencyName && agencyUrl && (
                <p className="mt-3 text-center text-xs text-gray-500 leading-snug">
                  Official source:{" "}
                  <a
                    href={agencyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 underline hover:text-white transition"
                  >
                    {agencyName}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0d1a2d' }}>
            About the {state} {testLabel}
          </h2>
          <div className="space-y-4">
            {about.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY STATE LAWS ────────────────────────────────────── */}
      {keyRules && keyRules.length > 0 && (
        <section className="py-14" style={{ backgroundColor: '#f0f4f8' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0d1a2d' }}>
              Key {state} Traffic Laws You Must Know
            </h2>
            <p className="text-gray-500 text-sm mb-8">These rules appear frequently on the {state} knowledge test.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyRules.map((r, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4 items-start">
                  <span className="text-2xl shrink-0">{r.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">{r.rule}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRACTICE QUESTIONS ────────────────────────────────── */}
      <section id="practice-questions" className="py-14" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#0d1a2d' }}>
              {state} {testLabel} — Sample Questions
            </h2>
            <p className="text-sm text-gray-500">Select an answer to see instant feedback and explanation.</p>
          </div>
          <SampleQuestions
            questions={clientSampleQuestions}
            state={state}
            testLabel={testLabel}
          />

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 mb-6 italic">
              CAREDMVPrep.com is not affiliated with any government agency. Practice materials are for educational purposes only.
            </p>
            <p className="text-sm text-gray-500 mb-4">These are a sample of questions from our full test bank.</p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-lg transition"
              style={{ backgroundColor: '#1a7f3c', fontSize: '15px' }}
            >
              Take the Full {state} {testLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0d1a2d' }}>
            Frequently Asked Questions — {state} {testLabel}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer select-none list-none bg-white hover:bg-gray-50 transition">
                  <span className="font-semibold text-gray-900 text-sm">{faq.question}</span>
                  <svg
                    className="shrink-0 w-4 h-4 text-gray-400 transition-transform group-open:rotate-180"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                  <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED TESTS ─────────────────────────────────────── */}
      <section className="py-12" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#0d1a2d' }}>Related Practice Tests</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {relatedTests.map((t) => (
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

      {/* ── NEARBY STATES ─────────────────────────────────────── */}
      <NearbyStates slug={slug} />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="text-white py-12" style={{ backgroundColor: '#1a7f3c' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Ready to ace your {stateAbbr} {testLabel}?</h2>
            <p className="text-green-100 text-sm">
              Full practice tests, progress tracking, and detailed explanations — all in one place.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded hover:bg-gray-100 transition whitespace-nowrap"
              style={{ backgroundColor: '#fff', color: '#1a7f3c' }}
            >
              START FULL TEST →
            </Link>
            <Link
              href="/states"
              className="inline-flex items-center px-6 py-3 border border-white/40 font-semibold rounded hover:bg-white/10 transition whitespace-nowrap text-white"
            >
              ← All States
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
