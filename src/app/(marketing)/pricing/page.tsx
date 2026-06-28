import type { Metadata } from "next";
import PricingCards from "@/components/pricing/PricingCards";

export const metadata: Metadata = {
  title: "DMV Practice Test Pricing – Free & Premium Plans | CAREDMVPrep",
  description:
    "Start free with unlimited state DMV practice tests. Upgrade for full question banks, progress tracking, and timed exam mode across all 50 states.",
  alternates: { canonical: "https://caredmvprep.com/pricing" },
  openGraph: { url: 'https://caredmvprep.com/pricing', images: [{ url: 'https://caredmvprep.com/opengraph-image', width: 1200, height: 630 }] },
};

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2240] to-[#122d52] text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Simple, Honest Pricing</h1>
          <p className="text-gray-300 text-lg">
            Start free. Upgrade when you&apos;re ready. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingCards />
          <p className="text-center text-xs text-gray-400 mt-6">
            Prices are in USD. Cancel anytime. No long-term contracts.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Common Questions</h2>
          <div className="space-y-5">
            {[
              { q: "Is the free version really free?", a: "Yes. You can take practice tests for free, with no credit card required. The free plan covers a sample set of questions per session." },
              { q: "Can I try before I subscribe?", a: "Yes. The free plan gives you access to practice questions with no credit card required. Upgrade anytime for the full question bank and progress tracking." },
              { q: "Are these the actual DMV test questions?", a: "No. Our questions are based on each state's official driver's manual but are written independently for practice purposes. We are not affiliated with any DMV or government agency." },
              { q: "Can I cancel anytime?", a: "Yes. Cancel from your account settings with one click. Your subscription stays active until the end of the billing period." },
              { q: "What's the difference between monthly and annual billing?", a: "Annual billing saves approximately 33% compared to paying month-to-month. The full annual amount is charged upfront." },
            ].map((item) => (
              <div key={item.q} className="border border-gray-100 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
