import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NewDeckForm from "./NewDeckForm";

export const metadata = {
  title: "New Flashcard Deck — CAREDMVPrep",
  robots: { index: false, follow: false },
};

export default async function NewDeckPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Load weak topics to offer "create from weak topics" option
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: weakRaw } = await (supabase.from("weak_topics") as any)
    .select("category_slug, accuracy_pct, total")
    .eq("user_id", user.id)
    .order("accuracy_pct", { ascending: true })
    .limit(10);

  const weakTopics = (weakRaw ?? []) as Array<{ category_slug: string; accuracy_pct: number; total: number }>;

  return (
    <div className="max-w-lg mx-auto pb-12">
      <div className="mb-8">
        <Link href="/flashcards" className="text-xs text-gray-500 hover:text-gray-700 transition mb-3 inline-block">
          ← Back to Flashcards
        </Link>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f1e3c" }}>Create a Deck</h1>
        <p className="text-sm text-gray-500">Give your deck a name and add cards to start studying.</p>
      </div>

      <NewDeckForm userId={user.id} weakTopics={weakTopics} />
    </div>
  );
}
