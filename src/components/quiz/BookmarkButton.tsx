"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  questionId: string;
}

export default function BookmarkButton({ questionId }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [userId,     setUserId]     = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      // Check if this question is already bookmarked
      (supabase.from('bookmarks') as any)
        .select('id')
        .eq('user_id', user.id)
        .eq('question_id', questionId)
        .maybeSingle()
        .then(({ data }: { data: { id: string } | null }) => {
          setBookmarked(!!data);
        });
    });
  }, [questionId]);

  // Not shown for unauthenticated users
  if (!userId) return null;

  async function toggleBookmark() {
    if (loading || !userId) return;
    setLoading(true);
    const supabase = createClient();

    if (bookmarked) {
      await (supabase.from('bookmarks') as any)
        .delete()
        .eq('user_id', userId)
        .eq('question_id', questionId);
      setBookmarked(false);
    } else {
      await (supabase.from('bookmarks') as any)
        .insert({ user_id: userId, question_id: questionId });
      setBookmarked(true);
    }

    setLoading(false);
  }

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      title={bookmarked ? "Remove bookmark" : "Bookmark this question"}
      className={`flex items-center gap-1.5 text-xs font-medium transition-colors rounded px-2 py-1 ${
        bookmarked
          ? "text-amber-600 hover:text-amber-700"
          : "text-gray-400 hover:text-amber-500"
      }`}
    >
      <svg
        className="w-4 h-4"
        fill={bookmarked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
