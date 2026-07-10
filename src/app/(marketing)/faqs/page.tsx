import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DMV Practice Test FAQs – Common Questions Answered",
  description:
    "Answers to the most common DMV practice test questions: are these real DMV questions, which states are covered, how many questions on the real test, CDL endorsements, motorcycle permits, and more.",
  alternates: { canonical: "https://caredmvprep.com/faqs" },
  openGraph: {
    url: "https://caredmvprep.com/faqs",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

const faqCategories = [
  {
    category: "About CAREDMVPrep",
    faqs: [
      {
        q: "Are these the actual DMV questions?",
        a: "No. Our practice questions are written independently based on official state DMV handbooks and FMCSA regulations. The actual DMV questions are not publicly released. Our questions cover the same topics, concepts, and rules that the real test covers — so practicing with them prepares you effectively for the real exam.",
      },
      {
        q: "Will these practice tests help me pass?",
        a: "Yes. Research on the testing effect shows that active recall through practice testing significantly improves retention and test performance compared to passive studying. People who regularly take practice tests consistently score higher on real exams. Our practice tests are designed to mirror the format and difficulty of actual DMV knowledge tests.",
      },
      {
        q: "Is CAREDMVPrep free to use?",
        a: "We offer a free tier that includes access to a set of practice questions at no cost. A premium subscription unlocks the full question bank, unlimited practice tests, detailed explanations, performance tracking, and more. You can start practicing for free with no credit card required.",
      },
      {
        q: "Which states are covered?",
        a: "Free sample questions are available for all 50 states. Full practice tests, timed mock exams, and progress tracking are currently live for 15 states, with more added regularly — see the current list on our All States page. Sign up to be notified when your state gets full coverage.",
      },
      {
        q: "How often are questions updated?",
        a: "Our question bank is reviewed regularly against current official state handbooks and FMCSA regulations. When states update their handbooks or traffic laws change, we update our questions accordingly. We recommend also reading your state&apos;s current official handbook to catch any very recent changes.",
      },
    ],
  },
  {
    category: "Test Format & Scoring",
    faqs: [
      {
        q: "How many questions are on the real DMV test?",
        a: "The number of questions varies by state. Examples: New York has 20 questions, Texas has 30, California has 36-46 depending on the test type, and Florida has 50. The number can also vary based on whether you are testing for a standard license, CDL, or motorcycle endorsement.",
      },
      {
        q: "What is the passing score on the DMV written test?",
        a: "Passing scores vary by state, typically ranging from 70% to 80%. Most states require 70-80% to pass the standard knowledge test. CDL tests (General Knowledge, endorsements) require 80% in all states. California requires 83% (30/36 correct) for the standard test and 71% (15/21) for the motorcycle test.",
      },
      {
        q: "How many times can I fail the DMV test?",
        a: "The number of allowed attempts and waiting periods vary by state. Many states allow 3 attempts before requiring you to reapply with the full application and fees. Some states allow immediate retakes; others require a 24-hour or one-week waiting period. After multiple failures, some states may require you to complete a driver education course before retesting.",
      },
      {
        q: "Can I take the DMV written test online?",
        a: "Most states require the knowledge test to be taken in-person at a DMV office. However, some states have expanded online testing for certain purposes, including license renewals and select out-of-state transfers. Check your specific state&apos;s DMV website for current in-person vs. online testing availability.",
      },
      {
        q: "How long does the DMV written test take?",
        a: "The time to complete the DMV knowledge test varies, but most applicants finish within 20 to 45 minutes. There is generally no time limit on the written test — you can take as long as you need. CDL knowledge tests also typically have no time limit.",
      },
    ],
  },
  {
    category: "CDL Specific",
    faqs: [
      {
        q: "What CDL practice tests are available?",
        a: "We offer practice tests for CDL General Knowledge, Air Brakes, Hazardous Materials (Hazmat), Passenger, School Bus, Tanker, and Doubles & Triples. We also cover the Combination Vehicles section (Section 6) which is required for all Class A applicants.",
      },
      {
        q: "Do CDL tests vary by state?",
        a: "CDL knowledge tests are primarily based on FMCSA (Federal Motor Carrier Safety Administration) regulations, which are federal standards. As a result, the core content of CDL tests is largely consistent across all states. Some states add state-specific questions, but the FMCSA-based material is the same everywhere.",
      },
      {
        q: "What CDL endorsements do I need?",
        a: "The endorsements you need depend entirely on what vehicles you plan to operate. H (Hazmat) is required to transport hazardous materials requiring placards. N (Tanker) is required for tank vehicles over 1,000 gallons. P (Passenger) is required for vehicles with 16 or more passengers. S (School Bus) is required for school buses (plus P). T (Doubles/Triples) is required for double or triple trailer combinations.",
      },
    ],
  },
  {
    category: "Motorcycle",
    faqs: [
      {
        q: "What is on the motorcycle permit test?",
        a: "The motorcycle permit written knowledge test covers: basic motorcycle controls (throttle, clutch, gears, front and rear brakes), protective gear requirements (DOT helmet, riding jacket, gloves, boots), pre-ride inspection using T-CLOCS, fundamental riding techniques (turning, braking, lane positioning), and traffic laws specific to motorcyclists.",
      },
      {
        q: "Do I need to take an MSF course?",
        a: "The MSF (Motorcycle Safety Foundation) Basic RiderCourse is not required by law in most states, but it is highly recommended. In most states, completing the course earns you a completion card that waives the DMV motorcycle skills test entirely. The course teaches real riding skills, reduces crash risk, and often earns you an insurance discount.",
      },
      {
        q: "What is the difference between a motorcycle endorsement and a motorcycle license?",
        a: "Most states add an M endorsement to your existing driver&apos;s license rather than issuing a separate motorcycle license. States like California issue a separate Class M license (M1 or M2). Both authorize you to ride legally — the difference is procedural: endorsement states add a code to your existing license, while license states issue a new document.",
      },
      {
        q: "Can I ride on the highway with a motorcycle permit?",
        a: "No. In most states, motorcycle permit holders are prohibited from riding on highways or freeways. Permit restrictions typically also include no riding at night and no carrying passengers. These restrictions are lifted when you obtain your full motorcycle license or endorsement.",
      },
      {
        q: "Is a motorcycle helmet required?",
        a: "Helmet laws vary significantly by state. Some states (like California and New York) require helmets for all motorcycle riders and passengers regardless of age. Other states require helmets only for riders under a certain age (often 21). A few states (like Illinois and Iowa) have no mandatory helmet law for adults. Always check your state&apos;s current law — and wear a helmet regardless, as it is the single most effective safety measure for motorcyclists.",
      },
    ],
  },
];

export default function FAQsPage() {
  const allFaqs = faqCategories.flatMap((c) => c.faqs);

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
              { "@type": "ListItem", position: 2, name: "Resources", item: "https://caredmvprep.com/resources" },
              { "@type": "ListItem", position: 3, name: "FAQs", item: "https://caredmvprep.com/faqs" },
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
            mainEntity: allFaqs.map((f) => ({
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
          <div className="text-5xl mb-4">❓</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">DMV Practice Test FAQs</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Answers to the most common questions about DMV knowledge tests, CDL exams, and motorcycle licensing — all in one place.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-[#1a7f3c]">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href="/resources" className="hover:text-[#1a7f3c]">Resources</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-800 font-medium">FAQs</li>
          </ol>
        </div>
      </nav>

      {/* FAQ Sections */}
      {faqCategories.map((cat) => (
        <section key={cat.category} className="py-12 border-b border-gray-100 last:border-b-0 odd:bg-white even:bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{cat.category}</h2>
            <div className="space-y-4">
              {cat.faqs.map((f) => (
                <div key={f.q} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                  <p className="text-sm text-gray-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      {/* Related Links */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { href: "/dmv-study-tips", label: "DMV Study Tips" },
              { href: "/drivers-license-guide", label: "Driver's License Guide" },
              { href: "/cdl-guide", label: "CDL Guide" },
              { href: "/motorcycle-guide", label: "Motorcycle Guide" },
              { href: "/resources", label: "All Resources" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#1a7f3c] hover:text-[#1a7f3c] transition">
                {l.label}
              </Link>
            ))}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Practice Tests</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/states", label: "All 50 States" },
              { href: "/cdl-practice-test", label: "CDL Tests" },
              { href: "/motorcycle-practice-test", label: "Motorcycle Tests" },
              { href: "/california-dmv-practice-test", label: "California Test" },
              { href: "/pricing", label: "View Pricing" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#1a7f3c] hover:text-[#1a7f3c] transition">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d2240] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Start Practicing?</h2>
          <p className="text-gray-400 text-sm mb-6">Free practice tests for your driver&apos;s license, CDL, or motorcycle exam.</p>
          <Link href="/signup" className="px-7 py-3 bg-[#1a7f3c] hover:bg-green-700 rounded-lg font-semibold text-white transition">
            Start Practicing Free
          </Link>
        </div>
      </section>
    </div>
  );
}
