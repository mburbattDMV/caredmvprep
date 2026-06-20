import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing – CAREDMVPrep",
  description:
    "Simple, affordable pricing for DMV practice test prep. Start free, upgrade for unlimited tests, progress tracking, and more.",
  alternates: { canonical: "https://caredmvprep.com/pricing" },
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "A great way to start preparing with no commitment.",
    features: [
      "10 practice questions per test",
      "All 50 states available",
      "Basic answer explanations",
      "Mobile friendly",
    ],
    cta: "Get Started Free",
    href: "/",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "per month",
    description: "Everything you need to pass with confidence.",
    features: [
      "Unlimited practice questions",
      "All 50 states + CDL + Motorcycle",
      "Detailed answer explanations",
      "Progress tracking dashboard",
      "Favorites & bookmarks",
      "Unlimited test retakes",
    ],
    cta: "Start Premium – Coming Soon",
    href: "/",
    highlight: true,
  },
  {
    name: "One-Time Pass",
    price: "$19.99",
    period: "one-time",
    description: "Full access for 60 days — pay once, no subscription.",
    features: [
      "Everything in Premium",
      "60-day full access",
      "No recurring charge",
      "All test categories",
    ],
    cta: "Buy One-Time – Coming Soon",
    href: "/",
    highlight: false,
  },
];

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 bg-white shadow-sm flex flex-col ${
                  plan.highlight ? "border-[#1a7f3c] ring-2 ring-[#1a7f3c] relative" : "border-gray-100"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a7f3c] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-400 mb-1">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-[#1a7f3c] font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-lg font-semibold text-sm transition ${
                    plan.highlight
                      ? "bg-[#1a7f3c] text-white hover:bg-[#158532]"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            Payments are not yet active. Pricing is subject to change before launch.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Common Questions</h2>
          <div className="space-y-5">
            {[
              { q: "Is the free version really free?", a: "Yes. You can take practice tests for free, with no credit card required. The free plan covers a limited number of questions per session." },
              { q: "When will Premium be available?", a: "We're actively building the platform. Sign up and we'll notify you when subscriptions open." },
              { q: "Are these the actual DMV test questions?", a: "No. Our questions are based on each state's official driver's manual but are written independently for practice purposes. We are not affiliated with any DMV or government agency." },
              { q: "Which states are covered?", a: "All 50 U.S. states are planned. We'll launch with the most-requested states first." },
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
