import type { ReadinessResult } from '@/lib/readiness';
import type { WeakTopic } from '@/types/database';
import { CATEGORY_LABELS } from '@/lib/readiness';
import Link from 'next/link';

interface Props {
  readiness:  ReadinessResult;
  weakTopics: WeakTopic[];
  sessions:   number;
  quizHref:   string;
}

function buildMessage(
  readiness: ReadinessResult,
  weakTopics: WeakTopic[],
  sessions: number,
  quizHref: string,
): { text: string; cta: string; href: string } {
  if (sessions === 0) {
    return {
      text: "Let's find out where you stand. Your first practice test will map your strengths and weak spots.",
      cta:  'Start Practice Test →',
      href: quizHref,
    };
  }

  if (readiness.confidence === 'ready') {
    return {
      text: "You're consistently above the passing threshold. Take another test to confirm your readiness before test day.",
      cta:  'Take Practice Test →',
      href: quizHref,
    };
  }

  const weakest = weakTopics[0];
  if (!weakest) {
    return {
      text: `Keep practicing. You're at ${readiness.score}% — ${readiness.questionsToReady} more correct answers puts you at Exam Ready.`,
      cta:  'Continue Practicing →',
      href: quizHref,
    };
  }

  const topicName = CATEGORY_LABELS[weakest.category_slug] ?? weakest.category_slug;
  const pct       = Math.round(Number(weakest.accuracy_pct));

  return {
    text: `${topicName} is your weakest area at ${pct}% accuracy. Focused practice here will raise your overall readiness score the fastest.`,
    cta:  `Practice ${topicName} →`,
    href: `${quizHref}?focus=${weakest.category_slug}`,
  };
}

export default function CoachBanner({ readiness, weakTopics, sessions, quizHref }: Props) {
  const { text, cta, href } = buildMessage(readiness, weakTopics, sessions, quizHref);

  const isReady = readiness.confidence === 'ready';
  const bgColor = isReady ? '#f0fdf4' : '#fffbeb';
  const borderColor = isReady ? '#bbf7d0' : '#fde68a';
  const iconColor = isReady ? '#16a34a' : '#d97706';
  const icon = isReady ? '✓' : '→';

  return (
    <div
      className="rounded-xl border px-5 py-4 flex items-center gap-4"
      style={{ backgroundColor: bgColor, borderColor }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
        style={{ backgroundColor: iconColor, color: '#fff' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-700 mb-0.5 uppercase tracking-wide">
          Study Coach Recommendation
        </p>
        <p className="text-sm text-gray-700">{text}</p>
      </div>
      <Link
        href={href}
        className="shrink-0 px-4 py-2 text-xs font-bold rounded-lg text-white transition hover:opacity-90 whitespace-nowrap"
        style={{ backgroundColor: isReady ? '#16a34a' : '#d97706' }}
      >
        {cta}
      </Link>
    </div>
  );
}
