import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscriptions, hasActiveProduct } from "@/lib/supabase/queries";
import { getQuizConfig } from "@/data/questions/index";
import { QUIZ_PRODUCT_MAP } from "@/lib/stripe/config";
import QuizEngine from "@/components/quiz/QuizEngine";
import SubscriptionGate from "@/components/ui/SubscriptionGate";

interface Props {
  params:      Promise<{ testId: string }>;
  searchParams: Promise<{ focus?: string }>;
}

export default async function QuizPage({ params, searchParams }: Props) {
  const { testId } = await params;
  const { focus }  = await searchParams;

  const config = getQuizConfig(testId);
  if (!config || config.questions.length === 0) notFound();

  // Subscription gate — check if the user has access to this product
  const requiredProduct = QUIZ_PRODUCT_MAP[testId];
  if (requiredProduct) {
    const supabase      = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const subscriptions = await getUserSubscriptions(supabase, user.id);
      if (!hasActiveProduct(subscriptions, requiredProduct)) {
        return <SubscriptionGate product={requiredProduct} />;
      }
    }
  }

  // ?focus=traffic_signs,right_of_way  — filter questions by category
  // Falls back to full test if fewer than 5 matching questions (not enough for a useful session).
  let activeConfig = config;
  if (focus) {
    const categories = focus.split(',').map((s) => s.trim()).filter(Boolean);
    const filtered   = config.questions.filter((q) =>
      categories.includes((q as { category?: string }).category ?? '')
    );
    if (filtered.length >= 3) {
      activeConfig = {
        ...config,
        questions: filtered,
        label:     `${config.label} — Focused Review`,
      };
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <QuizEngine config={activeConfig} />
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllTestIds } = await import("@/data/questions/index");
  return getAllTestIds().map((testId) => ({ testId }));
}
