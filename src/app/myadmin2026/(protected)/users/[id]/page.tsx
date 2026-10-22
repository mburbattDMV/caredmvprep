import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, User, Mail, Phone, MapPin, Calendar, CreditCard,
  Activity, BookOpen, Star,
} from "lucide-react";

export const metadata: Metadata = { title: "Customer Profile | Admin", robots: { index: false, follow: false } };

const PRODUCT_LABELS: Record<string, string> = {
  dmv: "Driver's License", motorcycle: "Motorcycle", cdl: "CDL Core",
  cdl_hazmat: "HazMat", cdl_tanker: "Tanker", cdl_doubles_triples: "Doubles/Triples",
  cdl_school_bus: "School Bus", cdl_passenger: "Passenger",
};
const STATE_LABELS: Record<string, string> = {
  CA: "California", TX: "Texas", FL: "Florida", NY: "New York", PA: "Pennsylvania", IL: "Illinois",
};

interface Props { params: Promise<{ id: string }> }

export default async function CustomerProfilePage({ params }: Props) {
  const { id } = await params;
  const admin = createAdminClient();

  const { data: { user: authUser }, error: userErr } = await admin.auth.admin.getUserById(id);
  if (userErr || !authUser) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (admin as any).from("profiles").select("*").eq("id", id).maybeSingle() as { data: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: subs = [] } = await (admin as any).from("subscriptions").select("*, subscription_plans(price_cents, interval, label)").eq("user_id", id).order("created_at", { ascending: false }) as { data: any[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: quizSessions = [] } = await (admin as any)
    .from("quiz_sessions")
    .select("*")
    .eq("user_id", id)
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false })
    .limit(20) as { data: any[] };

  const activeSubs   = subs.filter((s: any) => s.status === "active");
  const totalRevCents = subs.reduce((sum: number, s: any) => sum + (s.subscription_plans?.price_cents ?? 0), 0);
  const completions  = quizSessions.length;
  const avgScore     = completions > 0
    ? Math.round(quizSessions.reduce((s: number, q: any) => s + (q.total_questions > 0 ? (q.score / q.total_questions) * 100 : 0), 0) / completions)
    : 0;

  const displayName = profile?.display_name ?? authUser.user_metadata?.full_name ?? authUser.email?.split("@")[0] ?? "Unknown";
  const studyState  = profile?.target_state ? (STATE_LABELS[profile.target_state] ?? profile.target_state) : null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/myadmin2026/users"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft size={16} /> Users
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">{displayName}</span>
      </div>

      {/* Hero card */}
      <div className="bg-white rounded-xl border border-gray-100 px-6 py-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold text-white shrink-0" style={{ backgroundColor: "#0f1e3c" }}>
              {displayName[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{authUser.email}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {activeSubs.length > 0 ? (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#f0fdf4", color: "#1a7f3c" }}>
                    Premium
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">Free</span>
                )}
                {studyState && (
                  <span className="text-xs text-gray-500 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200">{studyState}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`mailto:${authUser.email}`}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              <Mail size={12} /> Email
            </a>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Plans",    value: activeSubs.length,              icon: CreditCard, accent: activeSubs.length > 0 ? "#1a7f3c" : "#94a3b8" },
          { label: "Total Revenue",   value: `$${(totalRevCents / 100).toFixed(0)}`, icon: Star,     accent: "#0f1e3c" },
          { label: "Quiz Sessions",   value: completions,                    icon: Activity,   accent: "#0f1e3c" },
          { label: "Avg Quiz Score",  value: `${avgScore}%`,                 icon: BookOpen,   accent: avgScore >= 70 ? "#1a7f3c" : avgScore > 0 ? "#f59e0b" : "#94a3b8" },
        ].map(({ label, value, icon: Icon, accent }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={13} className="text-gray-400" />
              <p className="text-xs text-gray-400">{label}</p>
            </div>
            <p className="text-2xl font-bold" style={{ color: accent }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal info */}
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Personal Info</h2>
          <div className="space-y-3">
            {[
              { icon: User,     label: "Name",         value: displayName },
              { icon: Mail,     label: "Email",        value: authUser.email ?? "—" },
              { icon: Phone,    label: "Phone",        value: profile?.phone ?? "—" },
              { icon: MapPin,   label: "Address",      value: [profile?.address_line1, profile?.city, profile?.address_state, profile?.postal_code].filter(Boolean).join(", ") || "—" },
              { icon: Calendar, label: "Joined",       value: new Date(authUser.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
              { icon: Calendar, label: "Last Login",   value: authUser.last_sign_in_at ? new Date(authUser.last_sign_in_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Never" },
              { icon: BookOpen, label: "Study State",  value: studyState ?? "—" },
              { icon: BookOpen, label: "License Type", value: profile?.target_license ?? "—" },
              { icon: Star,     label: "Streak",       value: profile?.streak_current != null ? `${profile.streak_current} days (best: ${profile?.streak_best ?? 0})` : "—" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 py-1.5 border-b border-gray-50 last:border-0">
                <Icon size={13} className="text-gray-300 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-400 w-24 shrink-0">{label}</span>
                <span className="text-sm text-gray-700 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscriptions */}
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Subscriptions</h2>
          {subs.length === 0 ? (
            <p className="text-sm text-gray-400">No subscriptions on record.</p>
          ) : (
            <div className="space-y-3">
              {subs.map((s: any) => (
                <div key={s.id} className="rounded-lg border border-gray-100 px-4 py-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-800">{PRODUCT_LABELS[s.product] ?? s.product}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      s.status === "active"   ? "bg-green-50 text-green-700" :
                      s.status === "past_due" ? "bg-red-50 text-red-700"    : "bg-gray-100 text-gray-500"
                    }`}>{s.status}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>{s.payment_type === "recurring" ? "Monthly" : "One-time"}</span>
                    {s.subscription_plans?.price_cents && <span>${(s.subscription_plans.price_cents / 100).toFixed(2)}</span>}
                    <span>Since {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                  </div>
                  {s.current_period_end && (
                    <p className="text-xs text-gray-400 mt-1">
                      {s.cancel_at_period_end ? "Cancels" : "Renews"}: {new Date(s.current_period_end).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quiz history */}
      {quizSessions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Quiz History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead style={{ backgroundColor: "#f8fafc" }}>
                <tr className="text-xs text-gray-400 border-b border-gray-100">
                  <th className="text-left px-3 py-2.5 font-semibold">Product</th>
                  <th className="text-left px-3 py-2.5 font-semibold">Score</th>
                  <th className="text-left px-3 py-2.5 font-semibold">Result</th>
                  <th className="text-left px-3 py-2.5 font-semibold">Completed</th>
                </tr>
              </thead>
              <tbody>
                {quizSessions.map((s: any) => {
                  const pct    = s.total_questions > 0 ? Math.round((s.score / s.total_questions) * 100) : 0;
                  const passed = pct >= 70;
                  return (
                    <tr key={s.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-3 py-2.5 text-gray-700 font-medium">{PRODUCT_LABELS[s.product] ?? (s.product ?? "Quiz")}</td>
                      <td className="px-3 py-2.5 text-gray-700">
                        {s.score}/{s.total_questions}
                        <span className="text-gray-400 ml-1">({pct}%)</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                          {passed ? "Pass" : "Fail"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-gray-400">
                        {new Date(s.completed_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
