import { notFound } from "next/navigation";
import { getMockExamConfig, MOCK_EXAM_DEFS } from "@/data/questions/index";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscriptions, hasActiveProduct } from "@/lib/supabase/queries";
import { QUIZ_PRODUCT_MAP } from "@/lib/stripe/config";
import { sanitizeQuizConfig } from "@/lib/quizGrading";
import QuizEngine from "@/components/quiz/QuizEngine";
import SubscriptionGate from "@/components/ui/SubscriptionGate";

interface Props {
  params:      Promise<{ examId: string }>;
  searchParams: Promise<{ timed?: string }>;
}

export default async function MockExamRunnerPage({ params, searchParams }: Props) {
  const { examId }  = await params;
  const { timed }   = await searchParams;
  const isTimedMode = timed !== '0';

  const config = getMockExamConfig(examId, isTimedMode);
  if (!config || config.questions.length === 0) notFound();

  // Any exam not yet commercially activated is treated as non-existent.
  const requiredProduct = QUIZ_PRODUCT_MAP[examId];
  if (!requiredProduct) notFound();

  // Subscription gate — mock exams require the same product as their base test.
  const supabase           = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const subscriptions = await getUserSubscriptions(supabase, user.id);
    if (!hasActiveProduct(subscriptions, requiredProduct)) {
      return <SubscriptionGate product={requiredProduct} />;
    }
  }

  const sessionKey = `${examId}:${isTimedMode ? '1' : '0'}`;

  return (
    <div className="max-w-2xl mx-auto">
      <QuizEngine key={sessionKey} sessionKey={sessionKey} config={sanitizeQuizConfig(config)} />
    </div>
  );
}

export async function generateStaticParams() {
  return MOCK_EXAM_DEFS.map((d) => ({ examId: d.examId }));
}
