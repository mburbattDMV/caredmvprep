"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, User, Phone, MapPin, CreditCard, Calendar, ExternalLink } from "lucide-react";

interface Plan { product: string; label: string; status: string; id: string }
interface Customer {
  id: string; email: string; name: string; phone: string; state: string;
  city: string; joined: string; lastSeen: string | null;
  plans: Plan[]; stripeCustomerId: string | null;
}

interface Props { customers: Customer[] }

export default function SupportSearch({ customers }: Props) {
  const [query,    setQuery]    = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return customers.filter((c) =>
      c.email.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [customers, query]);

  return (
    <div className="space-y-5">
      {/* Search box */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
        <label className="block text-xs font-semibold text-gray-500 mb-2">Search customers</label>
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
            placeholder="Email, name, phone, city, or state…"
            className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {query && results.length === 0 && (
          <p className="text-sm text-gray-400 mt-3">No customers found matching &ldquo;{query}&rdquo;</p>
        )}
        {results.length > 0 && !selected && (
          <div className="mt-3 space-y-1 max-h-72 overflow-y-auto">
            {results.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white" style={{ backgroundColor: c.plans.filter(p => p.status === "active").length > 0 ? "#1a7f3c" : "#94a3b8" }}>
                  {c.name !== "—" ? c.name[0].toUpperCase() : c.email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{c.name !== "—" ? c.name : c.email.split("@")[0]}</p>
                  <p className="text-xs text-gray-400">{c.email}</p>
                </div>
                <div className="text-right shrink-0">
                  {c.plans.filter(p => p.status === "active").length > 0 ? (
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Premium</span>
                  ) : (
                    <span className="text-xs text-gray-400">Free</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Customer detail card */}
      {selected && (
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5 space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: "#0f1e3c" }}>
                {selected.name !== "—" ? selected.name[0].toUpperCase() : selected.email[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">{selected.name !== "—" ? selected.name : selected.email.split("@")[0]}</h2>
                <p className="text-sm text-gray-400">{selected.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/myadmin2026/users/${selected.id}`}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                <ExternalLink size={12} /> Full Profile
              </Link>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Phone, label: "Phone", value: selected.phone !== "—" ? selected.phone : "Not set" },
              { icon: MapPin, label: "Location", value: [selected.city, selected.state].filter(Boolean).join(", ") || "Not set" },
              { icon: Calendar, label: "Joined", value: new Date(selected.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
              { icon: Calendar, label: "Last Login", value: selected.lastSeen ? new Date(selected.lastSeen).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Never" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-lg px-3 py-3" style={{ backgroundColor: "#f8fafc" }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon size={12} className="text-gray-400" />
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{value}</p>
              </div>
            ))}
          </div>

          {/* Plans */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Subscriptions</h3>
            {selected.plans.length === 0 ? (
              <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-400">No subscriptions — Free plan</p>
                <a href="/pricing" target="_blank" className="text-xs font-semibold text-green-700 hover:underline">View pricing →</a>
              </div>
            ) : (
              <div className="space-y-2">
                {selected.plans.map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between py-2.5 px-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{plan.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      plan.status === "active"   ? "bg-green-50 text-green-700" :
                      plan.status === "past_due" ? "bg-red-50 text-red-700"    : "bg-gray-100 text-gray-500"
                    }`}>{plan.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${selected.email}`}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                <User size={12} /> Email customer
              </a>
              <Link
                href={`/myadmin2026/users/${selected.id}`}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                <ExternalLink size={12} /> View full profile
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              For refunds, password resets, and subscription changes, use the Stripe and Supabase dashboards directly.
              Full in-app actions coming in a future update.
            </p>
          </div>
        </div>
      )}

      {/* Recent customers when no search */}
      {!query && (
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Recent Customers</h2>
          <div className="space-y-2">
            {customers.slice(0, 15).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white" style={{ backgroundColor: c.plans.filter(p => p.status === "active").length > 0 ? "#1a7f3c" : "#94a3b8" }}>
                  {c.email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{c.email}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(c.joined).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
