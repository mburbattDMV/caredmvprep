"use client";

import { useState, useEffect } from "react";
import CheckoutButton from "@/components/ui/CheckoutButton";
import { startCheckout } from "@/lib/stripe/client";
import { PRODUCT_CONFIG, formatCents } from "@/lib/stripe/config";
import { createClient } from "@/lib/supabase/client";
import type { SubscriptionProduct, PaymentType } from "@/types/database";

// Products shown on pricing page — School Bus and Passenger omitted until banks are ready
const CORE_PRODUCTS: SubscriptionProduct[] = ["dmv", "motorcycle", "cdl"];
const ENDORSEMENT_PRODUCTS: SubscriptionProduct[] = [
  "cdl_hazmat",
  "cdl_tanker",
  "cdl_doubles_triples",
];

const STATES = [
  { abbr: "CA", name: "California",   available: true  },
  { abbr: "TX", name: "Texas",        available: true  },
  { abbr: "FL", name: "Florida",      available: true  },
  { abbr: "NY", name: "New York",     available: true  },
  { abbr: "PA", name: "Pennsylvania", available: true  },
  { abbr: "IL", name: "Illinois",     available: true  },
  { abbr: "OH", name: "Ohio",         available: true  },
  { abbr: "GA", name: "Georgia",      available: true  },
  { abbr: "NC", name: "North Carolina", available: true },
  { abbr: "AZ", name: "Arizona",        available: true },
];

type AccessState =
  | { kind: "loading" }
  | { kind: "none" }
  | { kind: "recurring" }
  | { kind: "one_time"; expiresAt: string };

function useProductAccess(product: SubscriptionProduct): AccessState {
  const [state, setState] = useState<AccessState>({ kind: "loading" });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setState({ kind: "none" }); return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (supabase as any)
        .from("subscriptions")
        .select("payment_type, status, access_expires_at")
        .eq("user_id", user.id)
        .eq("product", product as string)
        .eq("status", "active")
        .maybeSingle() as {
          data: { payment_type: string; status: string; access_expires_at: string | null } | null
        };
      const data = result.data;

      if (!data) { setState({ kind: "none" }); return; }

      if (data.payment_type === "recurring") {
        setState({ kind: "recurring" });
      } else {
        const now = new Date().toISOString();
        if (data.access_expires_at && data.access_expires_at > now) {
          setState({ kind: "one_time", expiresAt: data.access_expires_at });
        } else {
          setState({ kind: "none" });
        }
      }
    });
  }, [product]);

  return state;
}

function formatExpiry(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

// ─── State picker modal ───────────────────────────────────────────────────────

function StatePicker({
  onConfirm,
  onCancel,
}: {
  onConfirm: (state: string) => void;
  onCancel:  () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-1" style={{ color: "#0f1e3c" }}>
          Where are you studying?
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Select your state to continue to checkout.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {STATES.map((s) => (
            <button
              key={s.abbr}
              disabled={!s.available}
              onClick={() => setSelected(s.abbr)}
              className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition ${
                !s.available
                  ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                  : selected === s.abbr
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                {!s.available && (
                  <p className="text-xs text-gray-400">Coming soon</p>
                )}
              </div>
              {selected === s.abbr && (
                <span className="absolute top-2 right-2 text-green-600 text-xs font-bold">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            disabled={!selected}
            onClick={() => selected && onConfirm(selected)}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#1a7f3c" }}
          >
            Continue to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Core product card (dmv / motorcycle / cdl) ───────────────────────────────

function CoreProductCard({
  product,
  onBuyClick,
  checkingOut,
}: {
  product:     SubscriptionProduct;
  onBuyClick:  (product: SubscriptionProduct, paymentType: PaymentType) => void;
  checkingOut: { product: SubscriptionProduct; paymentType: PaymentType } | null;
}) {
  const config = PRODUCT_CONFIG[product];
  const access = useProductAccess(product);

  const isLoading = (pt: PaymentType) =>
    checkingOut?.product === product && checkingOut.paymentType === pt;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
      <div className="mb-5">
        <h2 className="text-base font-bold text-gray-900 mb-1">{config.label}</h2>
        <p className="text-xs text-gray-500">{config.description}</p>
      </div>

      {/* Active-access states */}
      {access.kind === "recurring" && (
        <div className="flex-1 flex flex-col justify-end">
          <div
            className="rounded-xl px-4 py-3 text-center"
            style={{ backgroundColor: "#f0fdf4", border: "1px solid #1a7f3c" }}
          >
            <p className="text-sm font-semibold" style={{ color: "#1a7f3c" }}>
              ✓ Active Monthly Plan
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage in{" "}
              <a href="/account" className="underline">
                Account settings
              </a>
            </p>
          </div>
        </div>
      )}

      {access.kind === "one_time" && (
        <div className="flex-1 flex flex-col justify-end">
          <div
            className="rounded-xl px-4 py-3 text-center"
            style={{ backgroundColor: "#f0fdf4", border: "1px solid #1a7f3c" }}
          >
            <p className="text-sm font-semibold" style={{ color: "#1a7f3c" }}>
              ✓ Access Active
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Until {formatExpiry(access.expiresAt)}
            </p>
          </div>
        </div>
      )}

      {/* No access — show both options */}
      {(access.kind === "none" || access.kind === "loading") && (
        <div className="flex-1 flex flex-col justify-end space-y-3">
          {/* Best Value — one-time */}
          <div
            className="rounded-xl border px-4 py-3 relative"
            style={{ borderColor: "#1a7f3c", backgroundColor: "#f0fdf4" }}
          >
            <span
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white whitespace-nowrap"
              style={{ backgroundColor: "#1a7f3c" }}
            >
              Best Value
            </span>
            <div className="flex items-baseline justify-between mb-2 mt-1">
              <span className="text-xl font-extrabold text-gray-900">
                {formatCents(config.oneTime!.priceCents)}
              </span>
              <span className="text-xs text-gray-500">
                {config.oneTime!.durationMonths} months
              </span>
            </div>
            <button
              onClick={() => onBuyClick(product, "one_time")}
              disabled={checkingOut !== null}
              style={{
                width: "100%", padding: "8px", borderRadius: "8px",
                fontSize: "13px", fontWeight: 600,
                backgroundColor: "#1a7f3c", color: "#fff",
                opacity: checkingOut !== null ? 0.6 : 1,
                cursor: checkingOut !== null ? "not-allowed" : "pointer",
              }}
            >
              {isLoading("one_time")
                ? "Redirecting to checkout…"
                : `Buy ${config.oneTime!.durationMonths}-Month Pass`}
            </button>
          </div>

          {/* Monthly */}
          <div className="rounded-xl border border-gray-200 px-4 py-3">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xl font-extrabold text-gray-900">
                {formatCents(config.recurring!.priceCents)}
                <span className="text-xs font-normal text-gray-400">/mo</span>
              </span>
              <span className="text-xs text-gray-500">Cancel anytime</span>
            </div>
            <button
              onClick={() => onBuyClick(product, "recurring")}
              disabled={checkingOut !== null}
              className="w-full py-2 rounded-lg text-xs font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading("recurring") ? "Redirecting to checkout…" : "Subscribe Monthly"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Endorsement card (hazmat / tanker / doubles) — one-time only ─────────────

function EndorsementCard({
  product,
  cdlCoreActive,
}: {
  product:       SubscriptionProduct;
  cdlCoreActive: boolean;
}) {
  const config = PRODUCT_CONFIG[product];
  const access = useProductAccess(product);

  if (!cdlCoreActive) {
    return (
      <div className="border border-gray-100 rounded-xl bg-gray-50 p-4 flex flex-col gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-400">{config.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {config.description.split(" — ")[0]}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base font-extrabold text-gray-300">
            {formatCents(config.oneTime!.priceCents)}
            <span className="text-xs font-normal text-gray-300">
              {" "}/ {config.oneTime!.durationMonths} mo
            </span>
          </span>
          <button
            disabled
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed"
          >
            Requires CDL Core
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-100 rounded-xl bg-white p-4 flex flex-col gap-3">
      <div>
        <p className="text-sm font-semibold text-gray-900">{config.label}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {config.description.split(" — ")[0]}
        </p>
      </div>

      {access.kind === "recurring" || access.kind === "one_time" ? (
        <div className="text-xs font-semibold" style={{ color: "#1a7f3c" }}>
          {access.kind === "one_time"
            ? `✓ Access until ${formatExpiry(access.expiresAt)}`
            : "✓ Active"}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-base font-extrabold text-gray-900">
            {formatCents(config.oneTime!.priceCents)}
            <span className="text-xs font-normal text-gray-400">
              {" "}/ {config.oneTime!.durationMonths} mo
            </span>
          </span>
          <CheckoutButton
            product={product}
            paymentType="one_time"
            label="Buy"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          />
        </div>
      )}
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export default function PricingCards() {
  const cdlAccess    = useProductAccess("cdl");
  const hasCdlCore   = cdlAccess.kind === "recurring" || cdlAccess.kind === "one_time";
  const cdlCoreLoading = cdlAccess.kind === "loading";

  const [checkingOut, setCheckingOut] = useState<{
    product:     SubscriptionProduct;
    paymentType: PaymentType;
  } | null>(null);
  const [picker, setPicker] = useState<{
    product:     SubscriptionProduct;
    paymentType: PaymentType;
  } | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleBuyClick(product: SubscriptionProduct, paymentType: PaymentType) {
    setCheckingOut({ product, paymentType });
    setCheckoutError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: profileData } = await (supabase as any)
        .from("profiles")
        .select("target_state, target_license")
        .eq("id", user.id)
        .maybeSingle() as { data: { target_state: string | null; target_license: string | null } | null };

      const existingState   = profileData?.target_state   ?? null;
      const existingLicense = profileData?.target_license ?? null;

      if (existingState) {
        // State already set — pass both to checkout (server also falls back to profile)
        await startCheckout(product, paymentType, {
          target_state:   existingState,
          target_license: existingLicense ?? undefined,
        });
      } else {
        // No profile state — show picker
        setCheckingOut(null);
        setPicker({ product, paymentType });
      }
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed. Try again.");
      setCheckingOut(null);
    }
  }

  async function handlePickerConfirm(state: string) {
    if (!picker) return;
    const { product, paymentType } = picker;
    setPicker(null);
    setCheckingOut({ product, paymentType });
    setCheckoutError(null);

    try {
      await startCheckout(product, paymentType, { target_state: state });
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed. Try again.");
      setCheckingOut(null);
    }
  }

  return (
    <div>
      {/* State picker modal */}
      {picker && (
        <StatePicker
          onConfirm={handlePickerConfirm}
          onCancel={() => { setPicker(null); setCheckingOut(null); }}
        />
      )}

      {/* Checkout error */}
      {checkoutError && (
        <div className="mb-5 rounded-xl px-4 py-3 text-sm text-red-700 border border-red-200 bg-red-50">
          {checkoutError}
        </div>
      )}

      {/* Core products */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {CORE_PRODUCTS.map((p) => (
          <CoreProductCard
            key={p}
            product={p}
            onBuyClick={handleBuyClick}
            checkingOut={checkingOut}
          />
        ))}
      </div>

      {/* CDL Endorsements */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-900">CDL Endorsements</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            One-time purchase · 6 months access · Requires CDL Core
          </p>
          {!hasCdlCore && !cdlCoreLoading && (
            <p
              className="mt-2 text-xs rounded-lg px-3 py-2 border border-amber-100 text-amber-700"
              style={{ backgroundColor: "#fffbeb" }}
            >
              Purchase CDL Core above to unlock these endorsements.
            </p>
          )}
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {ENDORSEMENT_PRODUCTS.map((p) => (
            <EndorsementCard key={p} product={p} cdlCoreActive={hasCdlCore} />
          ))}
        </div>
      </div>
    </div>
  );
}
