"use client";

import { useState } from "react";
import CheckoutButton from "@/components/ui/CheckoutButton";
import { PRODUCT_CONFIG, formatCents } from "@/lib/stripe/config";
import type { SubscriptionProduct } from "@/types/database";

const FEATURED_PRODUCTS: { product: SubscriptionProduct; badge?: string }[] = [
  { product: "dmv",       badge: "Most Popular" },
  { product: "motorcycle" },
  { product: "cdl",       badge: "Commercial" },
];

const ADDON_PRODUCTS: SubscriptionProduct[] = [
  "cdl_hazmat",
  "cdl_tanker",
  "cdl_doubles_triples",
  "cdl_school_bus",
  "cdl_passenger",
];

export default function PricingCards() {
  const [interval, setInterval] = useState<"monthly" | "annual">("monthly");

  return (
    <div>
      {/* Interval toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 gap-1">
          <button
            onClick={() => setInterval("monthly")}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition ${
              interval === "monthly"
                ? "bg-[#0f1e3c] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval("annual")}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition ${
              interval === "annual"
                ? "bg-[#0f1e3c] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Annual
            <span className="ml-1.5 text-[10px] font-bold bg-[#1a7f3c] text-white rounded px-1.5 py-0.5 align-middle">
              SAVE 33%
            </span>
          </button>
        </div>
      </div>

      {/* Free + featured product cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {/* Free card */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col">
          <div className="mb-5">
            <h2 className="text-base font-bold text-gray-900 mb-1">Free</h2>
            <p className="text-xs text-gray-500 mb-4">Start preparing with no commitment.</p>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-extrabold text-gray-900">$0</span>
              <span className="text-xs text-gray-400 mb-1">/forever</span>
            </div>
          </div>
          <ul className="space-y-2 flex-1 mb-6 text-xs text-gray-700">
            {[
              "Sample practice questions",
              "All available states",
              "Instant feedback",
              "Detailed explanations",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-[#1a7f3c] font-bold">✓</span> {f}
              </li>
            ))}
          </ul>
          <a
            href="/signup"
            className="block text-center py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Get Started Free
          </a>
        </div>

        {/* Per-product cards */}
        {FEATURED_PRODUCTS.map(({ product, badge }) => {
          const cfg = PRODUCT_CONFIG[product];
          const price = interval === "monthly" ? cfg.priceCentsMonthly : cfg.priceCentsAnnual;
          const perUnit = interval === "annual"
            ? `${formatCents(Math.round(price / 12))}/mo — billed annually`
            : `${formatCents(price)}/mo`;
          return (
            <div
              key={product}
              className={`rounded-2xl border bg-white shadow-sm p-6 flex flex-col relative ${
                badge === "Most Popular"
                  ? "border-[#1a7f3c] ring-2 ring-[#1a7f3c]"
                  : "border-gray-100"
              }`}
            >
              {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a7f3c] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {badge}
                </div>
              )}
              <div className="mb-5">
                <h2 className="text-base font-bold text-gray-900 mb-1">{cfg.label}</h2>
                <p className="text-xs text-gray-500 mb-4">{cfg.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {formatCents(interval === "annual" ? Math.round(price / 12) : price)}
                  </span>
                  <span className="text-xs text-gray-400 mb-1">/mo</span>
                </div>
                {interval === "annual" && (
                  <p className="text-[10px] text-gray-400 mt-0.5">{perUnit}</p>
                )}
              </div>
              <ul className="space-y-2 flex-1 mb-6 text-xs text-gray-700">
                {[
                  "Full question bank",
                  "Progress tracking",
                  "Weak-topic identification",
                  "Timed exam mode",
                  "Unlimited retakes",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#1a7f3c] font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                product={product}
                interval={interval}
                label={`Subscribe — ${formatCents(price)}/${interval === "monthly" ? "mo" : "yr"}`}
                variant={badge === "Most Popular" ? "primary" : "secondary"}
              />
            </div>
          );
        })}
      </div>

      {/* CDL Add-on section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-1">CDL Endorsement Add-ons</h3>
        <p className="text-xs text-gray-500 mb-5">Each endorsement bank is sold separately. Requires an active CDL Core subscription.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADDON_PRODUCTS.map((product) => {
            const cfg = PRODUCT_CONFIG[product];
            const price = interval === "monthly" ? cfg.priceCentsMonthly : cfg.priceCentsAnnual;
            return (
              <div key={product} className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{cfg.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{cfg.description.split(" — ")[0]}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-gray-900">
                    {formatCents(price)}
                    <span className="text-xs font-normal text-gray-400">/{interval === "monthly" ? "mo" : "yr"}</span>
                  </span>
                  <CheckoutButton
                    product={product}
                    interval={interval}
                    label="Add"
                    variant="secondary"
                    className="text-xs px-3 py-1.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
