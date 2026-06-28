"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

const PRODUCT_LABELS: Record<string, string> = {
  dmv: "DMV", motorcycle: "Moto", cdl: "CDL", cdl_hazmat: "HazMat",
  cdl_tanker: "Tanker", cdl_doubles_triples: "D&T", cdl_school_bus: "S.Bus", cdl_passenger: "Pass",
};
const STATE_LABELS: Record<string, string> = {
  CA: "California", TX: "Texas", FL: "Florida", NY: "New York", PA: "Pennsylvania", IL: "Illinois",
};

export interface UserRow {
  id: string; email: string; name: string; phone: string;
  state: string | null; license: string | null; city: string | null;
  address_state: string | null; plans: string[];
  joined: string; lastSeen: string | undefined | null;
}

interface Props { rows: UserRow[]; totalUsers: number; proUsers: number; freeUsers: number }

export default function UsersTable({ rows, totalUsers, proUsers, freeUsers }: Props) {
  const [query,      setQuery]      = useState("");
  const [filterPlan, setFilterPlan] = useState<"all" | "pro" | "free">("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter((r) => {
      const matchQuery = !q
        || r.email.toLowerCase().includes(q)
        || r.name.toLowerCase().includes(q)
        || r.phone.toLowerCase().includes(q)
        || (r.state ?? "").toLowerCase().includes(q)
        || (r.city ?? "").toLowerCase().includes(q);
      const matchPlan =
        filterPlan === "all" ||
        (filterPlan === "pro"  && r.plans.length > 0) ||
        (filterPlan === "free" && r.plans.length === 0);
      return matchQuery && matchPlan;
    });
  }, [rows, query, filterPlan]);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Users",  value: totalUsers, accent: "#0f172a" },
          { label: "Subscribers",  value: proUsers,   accent: "#1a7f3c" },
          { label: "Free / Trial", value: freeUsers,  accent: "#6b7280" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400 mb-1">{c.label}</p>
            <p className="text-2xl font-bold" style={{ color: c.accent }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, phone, city…"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
          {(["all", "pro", "free"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterPlan(f)}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize"
              style={filterPlan === f
                ? { backgroundColor: "#0f1e3c", color: "#fff" }
                : { color: "#6b7280" }
              }
            >
              {f === "pro" ? "Subscribers" : f === "free" ? "Free" : "All"} {f === "all" ? `(${totalUsers})` : f === "pro" ? `(${proUsers})` : `(${freeUsers})`}
            </button>
          ))}
        </div>
        <div className="ml-auto text-xs text-gray-400">
          {filtered.length} of {rows.length} users
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead style={{ backgroundColor: "#f8fafc" }}>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold">User</th>
                <th className="text-left px-4 py-3 font-semibold">Contact</th>
                <th className="text-left px-4 py-3 font-semibold">State / License</th>
                <th className="text-left px-4 py-3 font-semibold">Plans</th>
                <th className="text-left px-4 py-3 font-semibold">Joined</th>
                <th className="text-left px-4 py-3 font-semibold">Last Seen</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition last:border-0 group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                        style={{ backgroundColor: r.plans.length > 0 ? "#1a7f3c" : "#94a3b8" }}>
                        {r.name !== "—" ? r.name[0].toUpperCase() : (r.email[0] ?? "?").toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{r.name !== "—" ? r.name : r.email.split("@")[0]}</p>
                        <p className="text-xs text-gray-400 truncate">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    <div>{r.phone !== "—" ? r.phone : <span className="text-gray-300">—</span>}</div>
                    {r.city && <div className="text-gray-400">{r.city}{r.address_state ? `, ${r.address_state}` : ""}</div>}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {r.state ? <span className="font-medium text-gray-700">{STATE_LABELS[r.state] ?? r.state}</span> : <span className="text-gray-300">—</span>}
                    {r.license && <div className="text-gray-400 mt-0.5">{r.license}</div>}
                  </td>
                  <td className="px-4 py-3">
                    {r.plans.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {r.plans.map((p) => (
                          <span key={p} className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: "#f0fdf4", color: "#1a7f3c" }}>
                            {PRODUCT_LABELS[p] ?? p}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">Free</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(r.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {r.lastSeen ? new Date(r.lastSeen).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Never"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/myadmin2026/users/${r.id}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">
                    {query ? `No users matching "${query}"` : "No users yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
