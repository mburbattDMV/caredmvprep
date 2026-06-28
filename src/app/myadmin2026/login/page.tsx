"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password });
    if (authErr) { setError("Invalid email or password. Admin access only."); setLoading(false); return; }

    router.push("/myadmin2026");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0a1628" }}>
      {/* Left panel - branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 px-12 py-14"
        style={{ backgroundColor: "#0f1e3c", borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <Image src="/logo.png" alt="CAREDMVPrep" width={220} height={88} className="w-[200px] h-auto mb-12" />
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Admin<br />Control Center
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Manage users, subscriptions, revenue, question banks, coupons, and site-wide announcements.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: "Real-time analytics", sub: "Users, revenue, and conversion data" },
            { label: "Question bank health", sub: "Coverage tracking and verification status" },
            { label: "Subscription management", sub: "Active, past-due, and canceled plans" },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center" style={{ backgroundColor: "#1a7f3c" }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{f.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          © {new Date().getFullYear()} CAREDMVPrep · Restricted access
        </p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Image src="/logo.png" alt="CAREDMVPrep" width={200} height={80} className="w-[180px] h-auto" />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1.5">Sign in</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Admin accounts only. Unauthorized access is prohibited.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                Email address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                  placeholder="admin@caredmvprep.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                  placeholder="••••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl" style={{ backgroundColor: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 mt-2"
              style={{ backgroundColor: "#1a7f3c" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : "Sign in to admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
