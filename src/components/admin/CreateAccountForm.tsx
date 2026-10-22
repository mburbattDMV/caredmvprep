"use client";

import { useActionState } from "react";
import { US_STATES } from "@/data/us-states";
import { createAccount, type CreateAccountState } from "@/app/myadmin2026/(protected)/create-account/actions";

const PRODUCTS: { value: string; label: string }[] = [
  { value: "dmv", label: "Driver's License (dmv)" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "cdl", label: "CDL Core" },
  { value: "cdl_hazmat", label: "CDL HazMat" },
  { value: "cdl_tanker", label: "CDL Tanker" },
  { value: "cdl_doubles_triples", label: "CDL Doubles & Triples" },
  { value: "cdl_school_bus", label: "CDL School Bus" },
  { value: "cdl_passenger", label: "CDL Passenger" },
];

export default function CreateAccountForm() {
  const [state, action, pending] = useActionState<CreateAccountState, FormData>(createAccount, null);
  return (
    <form action={action} className="space-y-4 max-w-xl bg-white rounded-xl border border-gray-200 p-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" required autoComplete="off" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="person@example.com" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">Name (optional)</label>
        <input id="name" name="name" type="text" maxLength={120} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="product">Grant access to</label>
          <select id="product" name="product" defaultValue="dmv" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            {PRODUCTS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="months">For</label>
          <select id="months" name="months" defaultValue="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="0">No paid access (account only)</option>
            <option value="1">1 month</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="state">State</label>
        <select id="state" name="state" defaultValue="" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="">Not set (they choose)</option>
          {US_STATES.map((s) => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name="sendEmail" defaultChecked /> Email them a link to set their password
      </label>
      <button type="submit" disabled={pending} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60" style={{ backgroundColor: "#0a1628" }}>
        {pending ? "Creating…" : "Create account"}
      </button>

      {state && (
        <div className={`rounded-lg border p-4 text-sm ${state.ok ? "border-green-200 bg-green-50 text-green-900" : "border-red-200 bg-red-50 text-red-900"}`} role="status">
          <p className="font-semibold">{state.message}</p>
          {state.ok && state.emailSent === true && <p className="mt-1">A password-setup email was requested.</p>}
          {state.ok && state.emailSent === false && <p className="mt-1">The email could not be sent. Share the link below instead.</p>}
          {state.ok && state.setupLink && (
            <div className="mt-3">
              <p className="font-semibold">Password-setup link (share privately, it signs the person in once):</p>
              <input readOnly value={state.setupLink} onFocus={(e) => e.currentTarget.select()} className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-xs bg-white" />
            </div>
          )}
        </div>
      )}
    </form>
  );
}
