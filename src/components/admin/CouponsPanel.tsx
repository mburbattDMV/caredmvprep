"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createCoupon, updateCoupon } from "@/lib/admin/content-actions";

interface Coupon {
  id: string;
  code: string;
  label: string | null;
  discount_pct: number;
  active: boolean;
  expires_at: string | null;
  created_at: string;
}

interface Props { initialCoupons: Coupon[] }

export default function CouponsPanel({ initialCoupons }: Props) {
  const [coupons, setCoupons]   = useState<Coupon[]>(initialCoupons);
  const [code,    setCode]      = useState("");
  const [pct,     setPct]       = useState("");
  const [label,   setLabel]     = useState("");
  const [expires, setExpires]   = useState("");
  const [saving,  setSaving]    = useState(false);
  const [error,   setError]     = useState<string | null>(null);

  const supabase = createClient();

  async function refresh() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any).from("coupons").select("*").order("created_at", { ascending: false });
    if (data) setCoupons(data as Coupon[]);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || !pct) { setError("Code and % off are required."); return; }
    setSaving(true); setError(null);
    const { error: dbErr } = await createCoupon({ code, pct: parseInt(pct), label, expires });
    setSaving(false);
    if (dbErr) { setError(dbErr); return; }
    setCode(""); setPct(""); setLabel(""); setExpires("");
    await refresh();
  }

  async function toggleActive(coupon: Coupon) {
    const r = await updateCoupon(coupon.id, { active: !coupon.active });
    if (r.error) setError(r.error);
    await refresh();
  }

  async function updateExpiry(coupon: Coupon, newExpiry: string) {
    const r = await updateCoupon(coupon.id, { expires: newExpiry || null });
    if (r.error) setError(r.error);
    await refresh();
  }

  const inputCls = "px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600";

  return (
    <div className="space-y-6">
      {/* Create form */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Coupon Tracker (does not apply discounts)</h2>
        <p className="text-xs text-gray-400 mb-4">
          This log is for internal tracking only — creating a row here does <strong>not</strong> create a
          working discount code. Customers redeem codes via Stripe&apos;s checkout promo field, so any code
          you want customers to actually use must also be created as a Promotion Code in the{" "}
          <a
            href="https://dashboard.stripe.com/coupons"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Stripe Dashboard
          </a>{" "}
          with the identical code.
        </p>
        <form onSubmit={handleCreate} className="flex flex-wrap gap-3 items-end">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="CODE (e.g. SUMMER30)" className={`${inputCls} w-44`} />
          <input value={pct} onChange={(e) => setPct(e.target.value)} type="number" min={1} max={100} placeholder="% off" className={`${inputCls} w-20`} />
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (optional)" className={`${inputCls} w-48`} />
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 shrink-0">Expires</label>
            <input value={expires} onChange={(e) => setExpires(e.target.value)} type="date" className={inputCls} />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#0f1e3c" }}
          >
            {saving ? "…" : "Create"}
          </button>
        </form>
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      </div>

      {/* Coupon list */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900">All Coupon Codes</h2>
          <button onClick={refresh} className="text-xs font-semibold" style={{ color: "#f59e0b" }}>Refresh</button>
        </div>
        <div className="space-y-2">
          {coupons.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl border"
              style={{ borderColor: c.active ? "#e5e7eb" : "#fee2e2", backgroundColor: c.active ? "#fff" : "#fff5f5" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono font-bold text-sm text-gray-900">{c.code}</span>
                {c.label && <span className="text-sm text-gray-500">{c.label}</span>}
                {!c.active && <span className="text-xs font-bold text-red-500 uppercase">Disabled</span>}
              </div>
              <div className="flex items-center gap-4 shrink-0 ml-4">
                <span className="text-sm font-bold" style={{ color: c.active ? "#1a7f3c" : "#9ca3af" }}>{c.discount_pct}% off</span>
                <button
                  onClick={() => toggleActive(c)}
                  className="text-xs font-semibold"
                  style={{ color: c.active ? "#b91c1c" : "#1a7f3c" }}
                >
                  {c.active ? "Disable" : "Enable"}
                </button>
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <span>Expiry:</span>
                  <input
                    type="date"
                    defaultValue={c.expires_at ? c.expires_at.slice(0, 10) : ""}
                    onBlur={(e) => updateExpiry(c, e.target.value)}
                    className="border-b border-blue-300 bg-transparent focus:outline-none text-xs w-28"
                  />
                </div>
              </div>
            </div>
          ))}
          {coupons.length === 0 && <p className="text-sm text-gray-400">No coupons yet.</p>}
        </div>
      </div>
    </div>
  );
}
