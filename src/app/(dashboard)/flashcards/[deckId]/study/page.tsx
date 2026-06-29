import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StudySession from "./StudySession";
import Link from "next/link";

export const metadata = {
  title: "Study — CAREDMVPrep",
  robots: { index: false, follow: false },
};

interface Flashcard {
  id: string;
  front: string;
  back: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review: string;
}

export default async function StudyPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = await params;
  const supabase   = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: deck } = await (supabase.from("flashcard_decks") as any)
    .select("id, name")
    .eq("id", deckId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!deck) notFound();

  const today = new Date().toISOString();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: dueRaw } = await (supabase.from("flashcards") as any)
    .select("id, front, back, ease_factor, interval_days, repetitions, next_review")
    .eq("deck_id", deckId)
    .lte("next_review", today)
    .order("next_review", { ascending: true });

  const dueCards: Flashcard[] = (dueRaw ?? []) as Flashcard[];

  if (dueCards.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h1 className="text-xl font-bold mb-2" style={{ color: "#0f1e3c" }}>All caught up!</h1>
        <p className="text-sm text-gray-500 mb-6">No cards are due right now. Come back later to keep your streak going.</p>
        <Link
          href={`/flashcards/${deckId}`}
          className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#1a7f3c" }}
        >
          Back to Deck
        </Link>
      </div>
    );
  }

  return <StudySession deckId={deckId} deckName={deck.name} cards={dueCards} />;
}
