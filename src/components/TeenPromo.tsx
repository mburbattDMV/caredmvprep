import Link from "next/link";

// Promo settings. Keep PROMO_CODE in sync with the Stripe promotion code; the section hides itself after PROMO_END.
export const PROMO_CODE = "TEENFREE";
const PROMO_END = new Date("2026-11-30T23:59:59-08:00");

export default function TeenPromo() {
  if (Date.now() > PROMO_END.getTime()) return null;
  return (
    <section className="py-10" style={{ backgroundColor: "#0d2240" }} aria-labelledby="teen-promo-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-3 sm:p-4" style={{ backgroundColor: "#0f2540" }}>
          <div className="rounded-xl px-4 py-8 sm:px-10 sm:py-10 text-center text-white" style={{ backgroundColor: "#006633" }}>
            <p className="inline-block px-4 py-1.5 rounded-full bg-white text-xs sm:text-sm font-extrabold uppercase tracking-wide" style={{ color: "#006633" }}>
              Exclusive teen driver offer
            </p>
            <h2 id="teen-promo-heading" className="mt-5 text-2xl sm:text-3xl font-bold">
              Your Permit Prep.
              <span className="block mt-4 text-3xl sm:text-4xl font-extrabold">100% FREE.</span>
            </h2>
            <h3 className="mt-4 text-2xl sm:text-3xl font-bold">3 Full Months of FREE Access</h3>
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
              Practice questions, full state question bank and timed mock exams. Free for the first 100 eligible teen drivers.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white font-extrabold uppercase text-sm sm:text-base"
              style={{ color: "#006633" }}
            >
              Claim my free access <span aria-hidden="true">&rarr;</span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-white/85">
              Use code <strong>{PROMO_CODE}</strong> at checkout &middot; Driver&apos;s License prep only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
