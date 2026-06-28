import Link from "next/link";
import type { SubscriptionProduct } from "@/types/database";
import { PRODUCT_CONFIG, formatCents } from "@/lib/stripe/config";
import CheckoutButton from "./CheckoutButton";

interface Props {
  product: SubscriptionProduct;
}

export default function SubscriptionGate({ product }: Props) {
  const config = PRODUCT_CONFIG[product];
  const monthlyPrice = formatCents(config.priceCentsMonthly);
  const annualPrice  = formatCents(config.priceCentsAnnual);

  return (
    <div className="max-w-lg mx-auto mt-12 text-center">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-10">
        {/* Lock icon */}
        <div
          className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#f0fdf4" }}
        >
          <svg
            className="w-7 h-7"
            style={{ color: "#1a7f3c" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-bold mb-2" style={{ color: "#0f1e3c" }}>
          {config.label} — Premium
        </h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          {config.description}
        </p>

        {/* Pricing options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border border-gray-200 px-4 py-3">
            <p className="text-xs text-gray-500 mb-1">Monthly</p>
            <p className="text-xl font-extrabold" style={{ color: "#0f1e3c" }}>
              {monthlyPrice}
            </p>
            <p className="text-xs text-gray-400">per month</p>
          </div>
          <div
            className="rounded-xl border px-4 py-3 relative"
            style={{ borderColor: "#1a7f3c", backgroundColor: "#f0fdf4" }}
          >
            <span
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: "#1a7f3c" }}
            >
              Best value
            </span>
            <p className="text-xs text-gray-500 mb-1">Annual</p>
            <p className="text-xl font-extrabold" style={{ color: "#0f1e3c" }}>
              {annualPrice}
            </p>
            <p className="text-xs text-gray-400">per year</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="space-y-2">
          <CheckoutButton
            product={product}
            interval="annual"
            label={`Subscribe Annual — ${annualPrice}/yr →`}
            className="block w-full py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#1a7f3c" }}
          />
          <CheckoutButton
            product={product}
            interval="monthly"
            label={`Subscribe Monthly — ${monthlyPrice}/mo`}
            className="block w-full py-3 rounded-xl text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          />
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Cancel anytime. Charged in USD.{" "}
          <Link href="/pricing" className="underline hover:text-gray-600">
            See all plans
          </Link>
        </p>
      </div>
    </div>
  );
}
