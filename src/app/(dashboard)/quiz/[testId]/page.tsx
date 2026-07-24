import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscriptions, hasActiveProduct, getWeakTopics } from "@/lib/supabase/queries";
import { getQuizConfig } from "@/data/questions/index";
import { QUIZ_PRODUCT_MAP } from "@/lib/stripe/config";
import { sanitizeQuizConfig } from "@/lib/quizGrading";
import QuizEngine from "@/components/quiz/QuizEngine";
import SubscriptionGate from "@/components/ui/SubscriptionGate";
import type { QuizConfig, Question } from "@/types/question";

interface Props {
  params:       Promise<{ testId: string }>;
  searchParams: Promise<{ focus?: string; count?: string; autostart?: string; practiceAll?: string }>;
}

export default async function QuizPage({ params, searchParams }: Props) {
  const { testId }                               = await params;
  const { focus, count, autostart, practiceAll } = await searchParams;

  const config = getQuizConfig(testId);
  if (!config || config.questions.length === 0) notFound();

  // Any quiz not yet commercially activated is treated as non-existent.
  // This prevents registered-but-not-live quizzes from bypassing the gate.
  const requiredProduct = QUIZ_PRODUCT_MAP[testId];
  if (!requiredProduct) notFound();

  // Always resolve the user — needed for gating and practiceAll
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Subscription gate — layout guarantees auth, but enforce product entitlement.
  if (user) {
    const subscriptions = await getUserSubscriptions(supabase, user.id);
    if (!hasActiveProduct(subscriptions, requiredProduct)) {
      return <SubscriptionGate product={requiredProduct} />;
    }
  }

  let activeConfig: QuizConfig = config;

  // ── practiceAll=1: weighted 25q personalized session ────────────────────────
  if (practiceAll === '1' && user) {
    const weakTopics = await getWeakTopics(supabase, user.id, 20, config.licenseType);

    if (weakTopics.length > 0) {
      const TARGET = 25;
      const weights = weakTopics.map((t) => Math.max(1, 100 - Number(t.accuracy_pct)));
      const totalWeight = weights.reduce((s, w) => s + w, 0);

      const selected: Question[] = [];
      for (let i = 0; i < weakTopics.length; i++) {
        const topic = weakTopics[i];
        const slots = Math.max(1, Math.round((weights[i] / totalWeight) * TARGET));
        const pool  = config.questions.filter(
          (q) => (q as { category?: string }).category === topic.category_slug
        );
        // Fisher-Yates shuffle then slice
        const shuffled = [...pool];
        for (let j = shuffled.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]];
        }
        selected.push(...shuffled.slice(0, slots));
      }

      // Shuffle the combined pool and cap to TARGET
      for (let i = selected.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selected[i], selected[j]] = [selected[j], selected[i]];
      }
      const finalQuestions = selected.slice(0, TARGET);

      if (finalQuestions.length > 0) {
        activeConfig = {
          ...config,
          questions: finalQuestions,
          label:     `${config.label} — Personalized Practice`,
          autoStart: true,
        };
      }
    }
  }

  // ── ?focus=cat1,cat2: filter to specific categories ─────────────────────────
  if (!practiceAll && focus) {
    const categories = focus.split(',').map((s) => s.trim()).filter(Boolean);
    const filtered   = config.questions.filter((q) =>
      categories.includes((q as { category?: string }).category ?? '')
    );
    if (filtered.length >= 3) {
      // Respect ?count=N if provided
      const maxCount = count ? parseInt(count, 10) : undefined;
      const questions = (maxCount && !isNaN(maxCount) && maxCount > 0)
        ? filtered.slice(0, maxCount)
        : filtered;

      activeConfig = {
        ...config,
        questions,
        label:     `${config.label} — Focused Review`,
        autoStart: autostart === '1' || !!count,
      };
    } else {
      // Not enough questions match the requested topic(s) to build a focused
      // session — fall back to the full test, but tell the user why instead
      // of silently swapping out what they clicked for.
      activeConfig = {
        ...config,
        notice: "We couldn't find enough questions for that specific topic, so here's the full practice test instead.",
      };
    }
  }

  // A fresh key per distinct session request forces QuizEngine to remount
  // (instead of re-rendering in place) whenever the user asks for a new
  // session on the same test — e.g. clicking "Practice All" or a per-topic
  // "Practice" link from a just-finished results screen, where testId is
  // unchanged but the question set/autostart flag differ. Without this,
  // React preserves the existing component instance across the navigation
  // (only the search params changed) and the quiz store is left stuck on
  // the prior session's "complete" phase, silently no-oping the click.
  const sessionKey = `${testId}:${focus ?? ''}:${count ?? ''}:${autostart ?? ''}:${practiceAll ?? ''}`;

  return (
    <div className="max-w-2xl mx-auto">
      <QuizEngine key={sessionKey} sessionKey={sessionKey} config={sanitizeQuizConfig(activeConfig)} />
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllTestIds } = await import("@/data/questions/index");
  return getAllTestIds().map((testId) => ({ testId }));
}
