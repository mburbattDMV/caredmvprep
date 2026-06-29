"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Props {
  userId: string;
  weakTopics: Array<{ category_slug: string; accuracy_pct: number; total: number }>;
}

function fmt(slug: string) {
  return slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function NewDeckForm({ userId, weakTopics }: Props) {
  const router = useRouter();
  const [name,    setName]    = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: deck, error: deckErr } = await (supabase.from("flashcard_decks") as any)
      .insert({ user_id: userId, name: name.trim() })
      .select("id")
      .single();

    if (deckErr || !deck?.id) {
      setError(deckErr?.message ?? "Failed to create deck.");
      setLoading(false);
      return;
    }

    router.push(`/flashcards/${deck.id}`);
  }

  async function createFromWeakTopic(slug: string) {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    // Create deck
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: deck, error: deckErr } = await (supabase.from("flashcard_decks") as any)
      .insert({ user_id: userId, name: `${fmt(slug)} Review` })
      .select("id")
      .single();

    if (deckErr || !deck?.id) {
      setError(deckErr?.message ?? "Failed to create deck.");
      setLoading(false);
      return;
    }

    // We'd need access to all questions filtered by category to populate the deck.
    // For now just create the empty deck and let the user add cards manually.
    // In a future sprint, import questions filtered by category_slug.
    router.push(`/flashcards/${deck.id}`);
  }

  return (
    <div className="space-y-6">
      {/* Manual deck creation */}
      <div className="bg-white rounded-2xl border border-gray-200 px-5 py-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Blank Deck</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Deck name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Speed Limits & Signs"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#1a7f3c" }}
          >
            {loading ? "Creating…" : "Create Deck"}
          </button>
        </form>
      </div>

      {/* From weak topics */}
      {weakTopics.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 px-5 py-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Create from Weak Topics</h2>
          <p className="text-xs text-gray-500 mb-4">Auto-creates a deck named after the topic for focused review.</p>
          <div className="space-y-2">
            {weakTopics.map((t) => (
              <button
                key={t.category_slug}
                onClick={() => createFromWeakTopic(t.category_slug)}
                disabled={loading}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 transition text-left disabled:opacity-50"
              >
                <span className="font-medium text-gray-900">{fmt(t.category_slug)}</span>
                <span className="text-xs text-gray-500">
                  {Math.round(t.accuracy_pct)}% · {t.total} seen
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
