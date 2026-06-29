import Link from "next/link";
import { MOCK_EXAM_DEFS } from "@/data/questions/index";

export const metadata = {
  title: "Mock Exams — CAREDMVPrep",
  robots: { index: false, follow: false },
};

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function MockExamPage() {
  const exams = MOCK_EXAM_DEFS;

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#0f1e3c' }}>
          Mock Exams
        </h1>
        <p className="text-sm text-gray-500">
          Full-length simulations that match the real CA DMV permit test. Each exam uses a unique question set.
        </p>
      </div>

      {/* What to expect */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 mb-8">
        <h2 className="text-sm font-semibold text-blue-900 mb-2">What to expect</h2>
        <ul className="text-sm text-blue-800 space-y-1">
          <li className="flex items-start gap-2"><CheckIcon /><span>46 questions — same length as the real CA DMV permit test</span></li>
          <li className="flex items-start gap-2"><CheckIcon /><span>Passing score: 80% (37 of 46 correct)</span></li>
          <li className="flex items-start gap-2"><CheckIcon /><span>Timed mode: 50 minutes (choose below). Untimed mode available for self-study.</span></li>
          <li className="flex items-start gap-2"><CheckIcon /><span>Full question review with explanations after you finish</span></li>
        </ul>
      </div>

      {/* Exam cards */}
      <div className="space-y-4">
        {exams.map((exam, i) => {
          const mins = Math.round(exam.timeLimitSecs / 60);
          return (
            <div
              key={exam.examId}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: '#0f1e3c' }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold" style={{ color: '#0f1e3c' }}>
                      {exam.shortLabel}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{exam.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{exam.questionCount} questions</span>
                    <span className="flex items-center gap-1"><ClockIcon />{mins} min timed</span>
                    <span>Passing: 80%</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-5 flex gap-3">
                <Link
                  href={`/mock-exam/${exam.examId}?timed=1`}
                  className="flex-1 py-2.5 rounded-xl text-center text-sm font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: '#1a7f3c' }}
                >
                  Start Timed
                </Link>
                <Link
                  href={`/mock-exam/${exam.examId}?timed=0`}
                  className="flex-1 py-2.5 rounded-xl text-center text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Start Untimed
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Study tip */}
      <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 px-5 py-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">Study tip:</strong> Take each mock exam in timed mode to simulate real test conditions. Use untimed mode to review without pressure. After each exam, study your missed questions in the{' '}
          <Link href="/review" className="underline text-gray-700 hover:text-gray-900">Review Center</Link>.
        </p>
      </div>
    </div>
  );
}
