"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  question_id: string | null;
  repetitions: number;
  ease_factor: number;
  next_review: string;
}

interface Props {
  deckId: string;
  userId: string;
  initialCards: Flashcard[];
}

export default function DeckManagerClient({ deckId, userId, initialCards }: Props) {
  const [cards,   setCards]   = useState<Flashcard[]>(initialCards);
  const [front,   setFront]   = useState("");
  const [back,    setBack]    = useState("");
  const [adding,  setAdding]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleAddCard(e: React.FormEvent) {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: card, error: cardErr } = await (supabase.from("flashcards") as any)
      .insert({
        deck_id: deckId,
        front:   front.trim(),
        back:    back.trim(),
      })
      .select("id, front, back, question_id, repetitions, ease_factor, next_review")
      .single();

    if (cardErr || !card) {
      setError(cardErr?.message ?? "Failed to add card.");
      setLoading(false);
      return;
    }

    setCards((prev) => [...prev, card as Flashcard]);
    setFront("");
    setBack("");
    setAdding(false);
    setLoading(false);
  }

  async function handleDeleteCard(cardId: string) {
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("flashcards") as any).delete().eq("id", cardId);
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  }

  const today = new Date().toISOString();

  return (
    <div className="space-y-4">
      {/* Add card button / form */}
      {adding ? (
        <form onSubmit={handleAddCard} className="bg-white rounded-2xl border border-gray-200 px-5 py-5 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Add a Card</h3>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Front (question / term)</label>
            <textarea
              required
              rows={2}
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="e.g. What is the speed limit in a school zone?"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Back (answer)</label>
            <textarea
              required
              rows={2}
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="e.g. 25 mph"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition resize-none"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#1a7f3c" }}
            >
              {loading ? "Adding…" : "Add Card"}
            </button>
            <button
              type="button"
              onClick={() => { setAdding(false); setFront(""); setBack(""); setError(null); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full py-3 rounded-xl text-sm font-bold border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition"
        >
          + Add a Card
        </button>
      )}

      {/* Card list */}
      {cards.length === 0 && !adding ? (
        <div className="bg-white rounded-2xl border border-gray-200 px-6 py-10 text-center">
          <p className="text-sm text-gray-500">No cards yet. Add your first card above.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {cards.map((card) => {
            const isDue = card.next_review <= today;
            return (
              <div
                key={card.id}
                className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-start justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 leading-snug">{card.front}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{card.back}</p>
                  <p className="text-xs mt-1" style={{ color: isDue ? "#1a7f3c" : "#9ca3af" }}>
                    {isDue ? "Due now" : `Next review: ${card.next_review.slice(0, 10)}`}
                    {card.repetitions > 0 ? ` · ${card.repetitions} reps` : ""}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="shrink-0 text-gray-300 hover:text-red-400 transition text-lg leading-none"
                  title="Delete card"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
