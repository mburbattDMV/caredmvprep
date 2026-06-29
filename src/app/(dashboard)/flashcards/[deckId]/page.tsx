import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeckManagerClient from "./DeckManagerClient";

export const metadata = {
  title: "Flashcard Deck — CAREDMVPrep",
  robots: { index: false, follow: false },
};

interface Flashcard {
  id: string;
  front: string;
  back: string;
  question_id: string | null;
  repetitions: number;
  ease_factor: number;
  next_review: string;
}

export default async function DeckPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = await params;
  const supabase   = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: deck } = await (supabase.from("flashcard_decks") as any)
    .select("*")
    .eq("id", deckId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!deck) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: cardsRaw } = await (supabase.from("flashcards") as any)
    .select("id, front, back, question_id, repetitions, ease_factor, next_review")
    .eq("deck_id", deckId)
    .order("created_at", { ascending: true });

  const cards: Flashcard[] = (cardsRaw ?? []) as Flashcard[];
  const today   = new Date().toISOString();
  const dueCount = cards.filter((c) => c.next_review <= today).length;

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-6">
        <Link href="/flashcards" className="text-xs text-gray-500 hover:text-gray-700 transition mb-3 inline-block">
          ← Back to Flashcards
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f1e3c" }}>{deck.name}</h1>
            <p className="text-sm text-gray-500">
              {cards.length} {cards.length === 1 ? "card" : "cards"}
              {dueCount > 0 ? ` · ${dueCount} due today` : ""}
            </p>
          </div>
          {cards.length > 0 && (
            <Link
              href={`/flashcards/${deckId}/study`}
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#1a7f3c" }}
            >
              Study Now
            </Link>
          )}
        </div>
      </div>

      <DeckManagerClient deckId={deckId} userId={user.id} initialCards={cards} />
    </div>
  );
}
