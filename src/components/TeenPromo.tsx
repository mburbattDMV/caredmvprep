import Link from "next/link";

// Promo settings. Keep PROMO_CODE in sync with the Stripe promotion code; the section hides itself after PROMO_END.
export const PROMO_CODE = "TEENFREE";
const PROMO_END = new Date("2026-11-30T23:59:59-08:00");

export default function TeenPromo() {
  if (Date.now() > PROMO_END.getTime()) return null;
  return (
    <section className="py-10" style={{ backgroundColor: "#0d2240" }} aria-labelledby="teen-promo-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-6 sm:p-10 text-center" style={{ background: "linear-gradient(135deg,#1a7f3c 0%,#0f5c2a 100%)" }}>
          <p className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/15 text-white mb-4">
            Limited-time offer for teens
          </p>
          <h2 id="teen-promo-heading" className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Getting your permit? Study free.
          </h2>
          <p className="mt-3 text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
            Teen drivers get <strong>3 months of Driver&apos;s License practice for $0</strong>: the full state permit
            question bank plus timed mock exams. Free for the first 100 teens.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-white font-bold text-base"
              style={{ color: "#0f5c2a" }}
            >
              Claim free access
            </Link>
            <p className="text-white text-sm">
              Use code <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">{PROMO_CODE}</span> at checkout
            </p>
          </div>
          <p className="mt-4 text-white/70 text-xs">
            For teen drivers preparing for a learner&apos;s permit. Driver&apos;s License plan only, one per person, while codes last.
          </p>
        </div>
      </div>
    </section>
  );
}
