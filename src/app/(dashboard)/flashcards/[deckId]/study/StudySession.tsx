"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review: string;
}

// SM-2 spaced repetition algorithm
function sm2(card: Flashcard, quality: 0 | 1 | 2 | 3): { ease_factor: number; interval_days: number; repetitions: number; next_review: string } {
  const q = quality;
  let ef    = Math.max(1.3, Number(card.ease_factor) + (0.1 - (3 - q) * (0.08 + (3 - q) * 0.02)));
  let reps  = card.repetitions;
  let inter = card.interval_days;

  if (q < 2) {
    reps  = 0;
    inter = 1;
  } else {
    reps += 1;
    if (reps === 1)      inter = 1;
    else if (reps === 2) inter = 6;
    else                 inter = Math.round(inter * ef);
  }

  const next = new Date();
  next.setDate(next.getDate() + inter);

  return { ease_factor: ef, interval_days: inter, repetitions: reps, next_review: next.toISOString() };
}

interface Props {
  deckId: string;
  deckName: string;
  cards: Flashcard[];
}

const QUALITY_LABELS: [0 | 1 | 2 | 3, string, string][] = [
  [0, "Again",  "#ef4444"],
  [1, "Hard",   "#f59e0b"],
  [2, "Good",   "#3b82f6"],
  [3, "Easy",   "#1a7f3c"],
];

export default function StudySession({ deckId, deckName, cards }: Props) {
  const [queue,   setQueue]   = useState<Flashcard[]>(cards);
  const [index,   setIndex]   = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done,    setDone]    = useState(false);
  const [stats,   setStats]   = useState({ correct: 0, again: 0 });

  const card = queue[index];

  async function handleRate(quality: 0 | 1 | 2 | 3) {
    if (!card) return;
    const update = sm2(card, quality);

    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("flashcards") as any)
      .update(update)
      .eq("id", card.id);

    setStats((s) => ({
      correct: quality >= 2 ? s.correct + 1 : s.correct,
      again:   quality < 2  ? s.again  + 1  : s.again,
    }));

    if (index + 1 >= queue.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h1 className="text-xl font-bold mb-2" style={{ color: "#0f1e3c" }}>Session Complete!</h1>
        <p className="text-sm text-gray-500 mb-1">
          {queue.length} cards reviewed · {stats.correct} good · {stats.again} needs review
        </p>
        <p className="text-xs text-gray-400 mb-6">Your next review is scheduled automatically.</p>
        <div className="flex gap-3 justify-center">
          <Link
            href={`/flashcards/${deckId}`}
            className="px-5 py-2.5 rounded-xl text-sm font-bold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Back to Deck
          </Link>
          <Link
            href="/flashcards"
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#1a7f3c" }}
          >
            All Decks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href={`/flashcards/${deckId}`} className="text-xs text-gray-500 hover:text-gray-700 transition">
          ← {deckName}
        </Link>
        <span className="text-xs text-gray-400">{index + 1} / {queue.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${((index) / queue.length) * 100}%`, backgroundColor: "#1a7f3c" }}
        />
      </div>

      {/* Card */}
      <div
        onClick={() => !flipped && setFlipped(true)}
        className="bg-white rounded-2xl border border-gray-200 min-h-[240px] flex flex-col items-center justify-center px-8 py-10 text-center mb-6 cursor-pointer select-none transition hover:shadow-md"
      >
        {!flipped ? (
          <>
            <p className="text-lg font-semibold text-gray-900 leading-snug mb-4">{card.front}</p>
            <p className="text-xs text-gray-400">Tap to reveal answer</p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-3 uppercase tracking-wide font-semibold">Answer</p>
            <p className="text-lg font-semibold text-gray-900 leading-snug">{card.back}</p>
          </>
        )}
      </div>

      {/* Rating buttons — only show after flip */}
      {flipped ? (
        <div className="grid grid-cols-4 gap-2">
          {QUALITY_LABELS.map(([q, label, color]) => (
            <button
              key={q}
              onClick={() => handleRate(q)}
              className="py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              {label}
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setFlipped(true)}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#0f1e3c" }}
        >
          Show Answer
        </button>
      )}

      {/* Rating guide */}
      {flipped && (
        <p className="text-center text-xs text-gray-400 mt-3">
          Again = forgot · Hard = struggled · Good = recalled · Easy = effortless
        </p>
      )}
    </div>
  );
}
