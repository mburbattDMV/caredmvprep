import { notFound } from "next/navigation";
import { getMockExamConfig, MOCK_EXAM_DEFS } from "@/data/questions/index";
import QuizEngine from "@/components/quiz/QuizEngine";

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

  return (
    <div className="max-w-2xl mx-auto">
      <QuizEngine config={config} />
    </div>
  );
}

export async function generateStaticParams() {
  return MOCK_EXAM_DEFS.map((d) => ({ examId: d.examId }));
}
