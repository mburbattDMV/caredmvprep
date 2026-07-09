import type { Metadata } from "next";
import PricingCards from "@/components/pricing/PricingCards";

export const metadata: Metadata = {
  title: "DMV Practice Test Pricing | CAREDMVPrep",
  description:
    "No subscriptions required. Buy a 3- or 6-month pass for your Driver's License, Motorcycle, or CDL prep — or subscribe monthly and cancel anytime.",
  alternates: { canonical: "https://caredmvprep.com/pricing" },
  openGraph: {
    url: "https://caredmvprep.com/pricing",
    images: [{ url: "https://caredmvprep.com/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2240] to-[#122d52] text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Simple, Honest Pricing
          </h1>
          <p className="text-gray-300 text-lg">
            Pay once for 3–6 months of access, or subscribe monthly and cancel anytime.
            No hidden fees.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-gray-200">
            <span className="flex items-center gap-1.5">
              <span className="text-[#4ade80] font-bold">✓</span> Secure checkout via Stripe
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#4ade80] font-bold">✓</span> Instant access after purchase
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#4ade80] font-bold">✓</span> Cancel monthly plans anytime
            </span>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingCards />
          <p className="text-center text-xs text-gray-400 mt-6">
            Prices in USD. One-time purchases are non-refundable after access is granted.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Common Questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "What's the difference between the monthly plan and the pass?",
                a: "The monthly plan charges your card each month and you can cancel anytime. The one-time pass is a single charge that gives you 3 or 6 months of access with no recurring billing.",
              },
              {
                q: "Can I switch from monthly to a one-time pass?",
                a: "Cancel your monthly plan first through your Account settings, then purchase the pass. The system prevents overwriting an active subscription with a one-time purchase.",
              },
              {
                q: "Are these the actual DMV questions?",
                a: "No. Our questions are based on each state's official driver's manual but are written independently. We are not affiliated with any DMV or government agency.",
              },
              {
                q: "Can I cancel my monthly plan?",
                a: "Yes. Cancel from your Account settings at any time. Access continues until the end of the current billing period.",
              },
              {
                q: "Do CDL endorsements require CDL Core?",
                a: "The endorsement question banks are standalone, but you need to pass the CDL General Knowledge test before taking any endorsement test at the DMV. We recommend starting with CDL Core.",
              },
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
