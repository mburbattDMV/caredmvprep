import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProfile, getUserSubscriptions } from "@/lib/supabase/queries";
import SubscriptionPoller from "@/components/account/SubscriptionPoller";
import EditProfileForm from "@/components/account/EditProfileForm";

// ── Label maps ────────────────────────────────────────────────────────────────

const PRODUCT_BASE_LABELS: Record<string, string> = {
  dmv:                 "DMV Permit",
  motorcycle:          "Motorcycle",
  cdl:                 "CDL General Knowledge",
  cdl_hazmat:          "CDL HazMat Endorsement",
  cdl_tanker:          "CDL Tanker Endorsement",
  cdl_doubles_triples: "CDL Doubles & Triples",
  cdl_school_bus:      "CDL School Bus",
  cdl_passenger:       "CDL Passenger Transport",
};

// Products that get state prefix in their display name
const STATE_PREFIXED = new Set(["dmv", "motorcycle"]);

function getProductLabel(product: string, state: string | null): string {
  const base      = PRODUCT_BASE_LABELS[product] ?? product;
  const stateName = state ? (STATE_LABELS[state] ?? state) : null;
  if (stateName && STATE_PREFIXED.has(product)) return `${stateName} ${base}`;
  return base;
}

// Kept for the checkout success banner (uses product key directly)
const PRODUCT_LABELS = PRODUCT_BASE_LABELS;

const STATE_LABELS: Record<string, string> = {
  CA: "California",
  TX: "Texas",
  FL: "Florida",
  NY: "New York",
  PA: "Pennsylvania",
  IL: "Illinois",
};

const LICENSE_LABELS: Record<string, string> = {
  permit:      "Driver's License",
  motorcycle:  "Motorcycle",
  cdl_general: "CDL (Commercial)",
};

// Derives study path from product when profile fields are null
const PRODUCT_TO_STUDY: Record<string, { state: string; license: string }> = {
  dmv:        { state: "CA", license: "permit" },
  motorcycle: { state: "CA", license: "motorcycle" },
  cdl:        { state: "CA", license: "cdl_general" },
};

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  searchParams: Promise<{ checkout?: string; product?: string }>;
}

export default async function AccountPage({ searchParams }: Props) {
  const { checkout, product: checkoutProduct } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [profile, subscriptions] = await Promise.all([
    getProfile(supabase, user.id),
    getUserSubscriptions(supabase, user.id),
  ]);

  // Backfill display_name from auth metadata for users created before the trigger
  const metaName =
    (user.user_metadata?.full_name    as string | undefined) ??
    (user.user_metadata?.display_name as string | undefined) ??
    null;
  if (!profile?.display_name && metaName) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("profiles")
      .update({ display_name: metaName })
      .eq("id", user.id);
  }

  const displayName = profile?.display_name ?? metaName ?? "—";
  const isActivating = checkout === "success" && subscriptions.length === 0;
  const hasAnyPro    = subscriptions.length > 0;

  // Derive state / license for display (profile → subscription fallback)
  const coreProduct  = subscriptions.find((s) => PRODUCT_TO_STUDY[s.product]);
  const studyState   = profile?.target_state   ?? (coreProduct ? PRODUCT_TO_STUDY[coreProduct.product].state   : null);
  const studyLicense = profile?.target_license ?? (coreProduct ? PRODUCT_TO_STUDY[coreProduct.product].license : null);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#0f1e3c" }}>Account</h1>
      </div>

      {/* Post-checkout success banner */}
      {checkout === "success" && (
        <>
          <div
            className="mb-6 rounded-2xl px-6 py-4 text-white flex items-start justify-between gap-4"
            style={{ backgroundColor: "#1a7f3c" }}
          >
            <div>
              <p className="font-bold text-sm">
                {checkoutProduct && PRODUCT_LABELS[checkoutProduct]
                  ? `${PRODUCT_LABELS[checkoutProduct]} activated!`
                  : "Purchase successful!"}
              </p>
              <p className="text-xs mt-0.5 opacity-80">
                {isActivating
                  ? "Activating your subscription — this usually takes a few seconds…"
                  : "Your subscription is now active and shown below."}
              </p>
            </div>
            {isActivating && (
              <div className="shrink-0 w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mt-0.5" />
            )}
          </div>
          {isActivating && <SubscriptionPoller product={checkoutProduct} />}
        </>
      )}

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900">Profile</h2>
          {profile && <EditProfileForm profile={profile} userEmail={user.email ?? ""} />}
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Name</dt>
            <dd className="font-medium text-gray-900">{displayName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900">{user.email}</dd>
          </div>
          {profile?.phone && (
            <div className="flex justify-between">
              <dt className="text-gray-500">Phone</dt>
              <dd className="font-medium text-gray-900">{profile.phone}</dd>
            </div>
          )}
          {(profile?.address_line1 || profile?.city) && (
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500 shrink-0">Address</dt>
              <dd className="font-medium text-gray-900 text-right">
                {[profile.address_line1, profile.address_line2].filter(Boolean).join(", ")}
                {profile.city && (
                  <span className="block">
                    {[profile.city, profile.address_state, profile.postal_code].filter(Boolean).join(" ")}
                  </span>
                )}
              </dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-gray-500">Member since</dt>
            <dd className="font-medium text-gray-900">
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                : "—"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Study streak</dt>
            <dd className="font-medium text-gray-900">
              {profile?.streak_current ?? 0} days
              {(profile?.streak_best ?? 0) > 0 && (
                <span className="text-gray-400 font-normal ml-1">
                  (best: {profile?.streak_best})
                </span>
              )}
            </dd>
          </div>
          {studyState && (
            <div className="flex justify-between">
              <dt className="text-gray-500">Study state</dt>
              <dd className="font-medium text-gray-900">{STATE_LABELS[studyState] ?? studyState}</dd>
            </div>
          )}
          {studyLicense && (
            <div className="flex justify-between">
              <dt className="text-gray-500">License type</dt>
              <dd className="font-medium text-gray-900">{LICENSE_LABELS[studyLicense] ?? studyLicense}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Subscriptions */}
      <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900">Subscriptions</h2>
          {!hasAnyPro && !isActivating && (
            <Link
              href="/pricing"
              className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition hover:opacity-90"
              style={{ backgroundColor: "#1a7f3c" }}
            >
              Upgrade →
            </Link>
          )}
        </div>

        {isActivating ? (
          <div className="flex items-center gap-3 py-3">
            <div className="w-4 h-4 rounded-full border-2 border-green-600 border-t-transparent animate-spin shrink-0" />
            <p className="text-sm text-gray-500">Activating access… this usually takes under 10 seconds.</p>
          </div>
        ) : hasAnyPro ? (
          <div className="space-y-4">
            {subscriptions.map((sub) => {
              const subState   = studyState;
              const subLicense = studyLicense;
              return (
                <div
                  key={sub.id}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <p className="text-sm font-bold text-gray-900">
                      {getProductLabel(sub.product, studyState)}
                    </p>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={
                        sub.status === "active"
                          ? { backgroundColor: "#f0fdf4", color: "#1a7f3c" }
                          : { backgroundColor: "#fef2f2", color: "#b91c1c" }
                      }
                    >
                      {sub.status}
                    </span>
                  </div>
                  <dl className="space-y-1.5 text-xs">
                    {subState && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">State</dt>
                        <dd className="font-medium text-gray-800">{STATE_LABELS[subState] ?? subState}</dd>
                      </div>
                    )}
                    {subLicense && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">License</dt>
                        <dd className="font-medium text-gray-800">{LICENSE_LABELS[subLicense] ?? subLicense}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Plan</dt>
                      <dd className="font-medium text-gray-800">
                        {sub.payment_type === "one_time" ? "3-Month Pass" : "Monthly"}
                      </dd>
                    </div>
                    {sub.payment_type === "recurring" && sub.current_period_end && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">
                          {sub.cancel_at_period_end ? "Cancels" : "Renews"}
                        </dt>
                        <dd className="font-medium text-gray-800">
                          {new Date(sub.current_period_end).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </dd>
                      </div>
                    )}
                    {sub.payment_type === "one_time" && sub.access_expires_at && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Access until</dt>
                        <dd className="font-medium text-gray-800">
                          {new Date(sub.access_expires_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-3">
              You are on the free plan. Upgrade to unlock full test banks and dashboard analytics.
            </p>
            <div className="space-y-2 text-sm">
              {[
                { label: "Sample questions (6 per test)",           included: true  },
                { label: "Full question banks (30–500+ questions)", included: false },
                { label: "Progress dashboard & stats",              included: false },
                { label: "Weak-topic tracking",                     included: false },
                { label: "Timed exam mode",                         included: false },
                { label: "Study streak & readiness score",          included: false },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <span
                    className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    style={
                      f.included
                        ? { backgroundColor: "#f0fdf4", color: "#1a7f3c" }
                        : { backgroundColor: "#f3f4f6", color: "#9ca3af" }
                    }
                  >
                    {f.included ? "✓" : "—"}
                  </span>
                  <span className={f.included ? "text-gray-800" : "text-gray-400"}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Security</h2>
        <Link
          href="/forgot-password"
          className="text-sm font-medium hover:underline"
          style={{ color: "#1a7f3c" }}
        >
          Change password →
        </Link>
      </div>
    </div>
  );
}
