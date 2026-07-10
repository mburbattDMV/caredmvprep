"use server";

import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/queries";
import { getDefaultTestId } from "@/lib/profile-routing";
import { quizRegistry } from "@/data/questions/index";

interface CreateFromWeakTopicResult {
  deckId?: string;
  error?: string;
}

/**
 * Creates a flashcard deck pre-populated with cards for every question in the
 * user's own state/license question bank that belongs to the given category.
 * Runs server-side so the full question bank never has to ship to the client.
 */
export async function createDeckFromWeakTopic(
  categorySlug: string,
): Promise<CreateFromWeakTopicResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in." };

  const profile = await getProfile(supabase, user.id);
  const testId = getDefaultTestId(profile?.target_state ?? null, profile?.target_license ?? null);
  const config = quizRegistry[testId];

  const matches = config
    ? config.questions.filter((q) => q.category === categorySlug)
    : [];

  const deckName = categorySlug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: deck, error: deckErr } = await (supabase.from("flashcard_decks") as any)
    .insert({ user_id: user.id, name: `${deckName} Review` })
    .select("id")
    .single();

  if (deckErr || !deck?.id) {
    return { error: deckErr?.message ?? "Failed to create deck." };
  }

  if (matches.length > 0) {
    const cards = matches.map((q) => ({
      deck_id:     deck.id,
      question_id: q.id,
      front:       q.question,
      back:        `${q.options[q.correctIndex]}\n\n${q.explanation}`,
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: cardsErr } = await (supabase.from("flashcards") as any).insert(cards);
    if (cardsErr) {
      // Deck exists but cards failed — surface it rather than silently returning an empty deck.
      return { deckId: deck.id, error: `Deck created, but cards failed to populate: ${cardsErr.message}` };
    }
  }

  return { deckId: deck.id };
}
