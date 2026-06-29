import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import FlashcardsClient from "./FlashcardsClient";

export const metadata = {
  title: "Flashcards — CAREDMVPrep",
  robots: { index: false, follow: false },
};

interface Deck {
  id: string;
  name: string;
  license_type: string | null;
  state_abbr: string | null;
  created_at: string;
  card_count: number;
  due_count: number;
}

export default async function FlashcardsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Load decks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: decksRaw } = await (supabase.from("flashcard_decks") as any)
    .select("id, name, license_type, state_abbr, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const deckList: Array<{ id: string; name: string; license_type: string | null; state_abbr: string | null; created_at: string }> =
    decksRaw ?? [];

  // For each deck, get card counts and due counts
  const today = new Date().toISOString();
  const decks: Deck[] = await Promise.all(
    deckList.map(async (deck) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: cards } = await (supabase.from("flashcards") as any)
        .select("next_review, repetitions")
        .eq("deck_id", deck.id);

      const all = (cards ?? []) as Array<{ next_review: string; repetitions: number }>;
      return {
        ...deck,
        card_count: all.length,
        due_count:  all.filter((c) => c.next_review <= today).length,
      };
    })
  );

  const totalCards = decks.reduce((s, d) => s + d.card_count, 0);
  const totalDue   = decks.reduce((s, d) => s + d.due_count, 0);

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f1e3c" }}>
            Flashcards
          </h1>
          <p className="text-sm text-gray-500">
            Spaced repetition — review cards when they're due for maximum retention.
          </p>
        </div>
        {decks.length > 0 && (
          <Link
            href="/flashcards/new"
            className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#1a7f3c" }}
          >
            + New Deck
          </Link>
        )}
      </div>

      {/* Stats row */}
      {decks.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Decks",      value: decks.length },
            { label: "Cards",      value: totalCards },
            { label: "Due Today",  value: totalDue },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 px-5 py-4 text-center">
              <div className="text-2xl font-extrabold mb-0.5" style={{ color: "#0f1e3c" }}>
                {s.value}
              </div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Deck list or empty state */}
      {decks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 px-8 py-14 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#1a7f3c" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-2">No flashcard decks yet</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Create a deck from your weak topics or build one from scratch to start memorizing with spaced repetition.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/flashcards/new"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#1a7f3c" }}
            >
              Create a Deck
            </Link>
            <Link
              href="/review"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              View Weak Topics →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="bg-white rounded-2xl border border-gray-200 px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{deck.name}</h3>
                  {deck.due_count > 0 && (
                    <span
                      className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: "#1a7f3c" }}
                    >
                      {deck.due_count} due
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {deck.card_count} {deck.card_count === 1 ? "card" : "cards"}
                  {deck.state_abbr ? ` · ${deck.state_abbr}` : ""}
                  {deck.license_type ? ` · ${deck.license_type}` : ""}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                {deck.card_count > 0 && (
                  <Link
                    href={`/flashcards/${deck.id}/study`}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition hover:opacity-90"
                    style={{ backgroundColor: deck.due_count > 0 ? "#1a7f3c" : "#6b7280" }}
                  >
                    {deck.due_count > 0 ? "Study Now" : "Review"}
                  </Link>
                )}
                <Link
                  href={`/flashcards/${deck.id}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* How it works */}
      <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 px-5 py-4">
        <h3 className="text-xs font-bold text-gray-700 mb-2">How flashcards work</h3>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• Cards use spaced repetition — you see difficult cards more often, mastered cards less.</li>
          <li>• Rate each card Easy, Good, or Hard. The algorithm schedules the next review automatically.</li>
          <li>• Study a little each day. 10 minutes of spaced repetition beats cramming the night before.</li>
        </ul>
      </div>

      {/* Client component for interactivity (create deck from weak topics) */}
      <FlashcardsClient />
    </div>
  );
}
