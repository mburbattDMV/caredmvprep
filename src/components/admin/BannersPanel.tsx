"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createBanner, setBannerActive, deleteBanner as deleteBannerAction, editBanner } from "@/lib/admin/content-actions";

interface Banner {
  id: string;
  content: string;
  color: string;
  active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
}

interface Props { initialBanners: Banner[] }

const COLORS = [
  { hex: "#ec4899", label: "Pink" },
  { hex: "#f59e0b", label: "Amber" },
  { hex: "#0f1e3c", label: "Navy" },
  { hex: "#1a7f3c", label: "Green" },
  { hex: "#7c3aed", label: "Purple" },
  { hex: "#ef4444", label: "Red" },
  { hex: "#f97316", label: "Orange" },
  { hex: "#14b8a6", label: "Teal" },
  { hex: "#111827", label: "Black" },
  { hex: "#0ea5e9", label: "Sky" },
];

export default function BannersPanel({ initialBanners }: Props) {
  const [banners,  setBanners]  = useState<Banner[]>(initialBanners);
  const [content,  setContent]  = useState("");
  const [color,    setColor]    = useState("#1a7f3c");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt,   setEndsAt]   = useState("");
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const supabase = createClient();

  async function refresh() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any).from("banners").select("*").order("created_at", { ascending: false });
    if (data) setBanners(data as Banner[]);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) { setError("Banner content is required."); return; }
    setSaving(true); setError(null);
    const { error: dbErr } = await createBanner({ content, color, startsAt, endsAt });
    setSaving(false);
    if (dbErr) { setError(dbErr); return; }
    setContent(""); setStartsAt(""); setEndsAt("");
    await refresh();
  }

  async function goLive(banner: Banner) {
    const r = await setBannerActive(banner.id, true);
    if (r.error) setError(r.error);
    await refresh();
  }

  async function deactivate(id: string) {
    const r = await setBannerActive(id, false);
    if (r.error) setError(r.error);
    await refresh();
  }

  async function deleteBanner(id: string) {
    const r = await deleteBannerAction(id);
    if (r.error) setError(r.error);
    await refresh();
  }

  async function saveEdit(id: string) {
    const r = await editBanner(id, editContent);
    if (r.error) setError(r.error);
    setEditId(null);
    await refresh();
  }

  const colorLabel = COLORS.find((c) => c.hex === color)?.label ?? "Custom";

  return (
    <div className="space-y-6">
      {/* Create form */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Create Announcement Banner</h2>
        <p className="text-xs text-gray-400 mb-4">Banner shows site-wide on all pages. Only one can be active at a time. Users can dismiss it.</p>
        <form onSubmit={handleCreate} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            placeholder={`e.g. Happy Mother's Day! Use code <strong>MOTHERS20</strong> for 20% off. <a href="/pricing" style="text-decoration:underline">Get started</a>`}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
          />
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Color:</span>
              {COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  title={c.label}
                  className="w-7 h-7 rounded-full border-2 transition"
                  style={{
                    backgroundColor: c.hex,
                    borderColor: color === c.hex ? "#0f1e3c" : "transparent",
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <span className="text-xs text-gray-500">Schedule (optional):</span>
              <span className="text-xs text-gray-400">Start</span>
              <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className="px-2 py-1 rounded border border-gray-300 text-xs" />
              <span className="text-xs text-gray-400">End</span>
              <input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className="px-2 py-1 rounded border border-gray-300 text-xs" />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-lg text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#0f1e3c" }}
            >
              {saving ? "…" : "Create"}
            </button>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </form>
      </div>

      {/* Banner list */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900">All Banners</h2>
          <button onClick={refresh} className="text-xs font-semibold" style={{ color: "#f59e0b" }}>Refresh</button>
        </div>
        <div className="space-y-3">
          {banners.map((b) => (
            <div key={b.id} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              {editId === b.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(b.id)} className="text-xs font-bold text-white px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#1a7f3c" }}>Save</button>
                    <button onClick={() => setEditId(null)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 leading-snug" dangerouslySetInnerHTML={{ __html: b.content }} />
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                      <span className="text-xs text-gray-400">{COLORS.find((c) => c.hex === b.color)?.label ?? b.color}</span>
                      {b.active && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">LIVE</span>}
                      {b.starts_at && <span className="text-xs text-gray-400">Starts {new Date(b.starts_at).toLocaleDateString()}</span>}
                      {b.ends_at && <span className="text-xs text-gray-400">Ends {new Date(b.ends_at).toLocaleDateString()}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => { setEditId(b.id); setEditContent(b.content); }} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Edit</button>
                    {b.active ? (
                      <button onClick={() => deactivate(b.id)} className="text-xs font-semibold text-gray-500 hover:text-gray-700">Deactivate</button>
                    ) : (
                      <button
                        onClick={() => goLive(b)}
                        className="text-xs font-bold text-white px-3 py-1.5 rounded-lg transition hover:opacity-90"
                        style={{ backgroundColor: "#1a7f3c" }}
                      >
                        Go Live
                      </button>
                    )}
                    <button onClick={() => deleteBanner(b.id)} className="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {banners.length === 0 && <p className="text-sm text-gray-400">No banners yet.</p>}
        </div>
      </div>
    </div>
  );
}
