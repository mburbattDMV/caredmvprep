// Type-safe data-fetching helpers for server components.
// All functions accept a Supabase server client created by createClient().

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, Profile, QuizSession, WeakTopic, Subscription, StudyPlan, Flashcard } from '@/types/database';

type Client = SupabaseClient<Database>;

// ─── PROFILE ─────────────────────────────────────────────────────────────────

export async function getProfile(supabase: Client, userId: string): Promise<Profile | null> {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

// ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────

export async function getUserSubscriptions(
  supabase: Client,
  userId: string
): Promise<Subscription[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: raw, error } = await (supabase as any)
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active') as { data: Subscription[] | null; error: { message: string; code: string } | null };

  if (error) {
    console.error('[getUserSubscriptions] query failed:', error.message, 'code:', error.code, 'user:', userId);
  }

  if (!raw) return [];

  // Filter client-side: recurring rows are valid by status alone;
  // one-time rows must also have an unexpired access_expires_at.
  const now = new Date().toISOString();
  return raw.filter((s) =>
    s.payment_type === 'recurring' ||
    (s.payment_type === 'one_time' && !!s.access_expires_at && s.access_expires_at > now)
  );
}

export function hasActiveProduct(
  subscriptions: Subscription[],
  product: string
): boolean {
  // getUserSubscriptions already filters for valid access — just check product
  return subscriptions.some((s) => s.product === product);
}

export function hasAnySubscription(subscriptions: Subscription[]): boolean {
  return subscriptions.length > 0;
}

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────

export interface DashboardStats {
  sessions:       QuizSession[];
  totalAnswered:  number;
  totalCorrect:   number;
  avgPct:         number;
  passCount:      number;
  totalTimeMs:    number;
}

export async function getDashboardStats(
  supabase: Client,
  userId: string
): Promise<DashboardStats> {
  const { data } = await supabase
    .from('quiz_sessions')
    .select('*')
    .eq('user_id', userId)
    .not('completed_at', 'is', null)
    .order('started_at', { ascending: false })
    .limit(100);

  const sessions: QuizSession[] = data ?? [];
  const totalAnswered = sessions.reduce((sum, s) => sum + (s.total_questions ?? 0), 0);
  const totalCorrect  = sessions.reduce((sum, s) => sum + (s.score ?? 0), 0);
  const avgPct        = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const passCount     = sessions.filter((s) => s.passed).length;

  const totalTimeMs = sessions.reduce((sum, s) => {
    if (!s.completed_at || !s.started_at) return sum;
    return sum + (new Date(s.completed_at).getTime() - new Date(s.started_at).getTime());
  }, 0);

  return { sessions, totalAnswered, totalCorrect, avgPct, passCount, totalTimeMs };
}

// ─── WEAK TOPICS ─────────────────────────────────────────────────────────────

export async function getWeakTopics(
  supabase: Client,
  userId: string,
  limit = 8
): Promise<WeakTopic[]> {
  const { data } = await supabase
    .from('weak_topics')
    .select('*')
    .eq('user_id', userId)
    .gte('total', 5)
    .lt('accuracy_pct', 80)
    .order('accuracy_pct', { ascending: true })
    .limit(limit);
  return data ?? [];
}

// ─── STUDY STREAK ────────────────────────────────────────────────────────────

export interface StreakData {
  current: number;
  best:    number;
}

export function getStreak(profile: Profile | null): StreakData {
  return {
    current: profile?.streak_current ?? 0,
    best:    profile?.streak_best ?? 0,
  };
}

// ─── RECENT SESSIONS (for history page) ──────────────────────────────────────

export async function getRecentSessions(
  supabase: Client,
  userId: string,
  limit = 20
): Promise<QuizSession[]> {
  const { data } = await supabase
    .from('quiz_sessions')
    .select('*')
    .eq('user_id', userId)
    .not('completed_at', 'is', null)
    .order('completed_at', { ascending: false })
    .limit(limit);
  return data ?? [];
}

// ─── STRONG TOPICS ────────────────────────────────────────────────────────────
// accuracy_pct >= 80 with at least 5 answers for statistical confidence

export async function getStrongTopics(
  supabase: Client,
  userId: string,
  limit = 5
): Promise<WeakTopic[]> {
  const { data } = await supabase
    .from('weak_topics')
    .select('*')
    .eq('user_id', userId)
    .gte('accuracy_pct', 80)
    .gte('total', 10)
    .order('accuracy_pct', { ascending: false })
    .limit(limit);
  return data ?? [];
}

// ─── RECENTLY MISSED QUESTIONS ────────────────────────────────────────────────

export interface MissedQuestion {
  question_id: string;
  category:    string;
  created_at:  string;
}

export async function getRecentlyMissed(
  supabase: Client,
  userId: string,
  limit = 20
): Promise<MissedQuestion[]> {
  const { data } = await supabase
    .from('user_answers')
    .select('question_id, category, created_at')
    .eq('user_id', userId)
    .eq('is_correct', false)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []) as MissedQuestion[];
}

// ─── FLASHCARD STATS ──────────────────────────────────────────────────────────

export interface FlashcardStats {
  dueToday: number;
  mastered: number;
  learning: number;
  total:    number;
}

export async function getFlashcardStats(
  supabase: Client,
  userId: string
): Promise<FlashcardStats> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: decksRaw } = await (supabase.from('flashcard_decks') as any)
    .select('id')
    .eq('user_id', userId);

  const decks = (decksRaw ?? []) as Array<{ id: string }>;
  const deckIds = decks.map((d) => d.id);
  if (deckIds.length === 0) return { dueToday: 0, mastered: 0, learning: 0, total: 0 };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: cardsRaw } = await (supabase.from('flashcards') as any)
    .select('next_review, repetitions, ease_factor')
    .in('deck_id', deckIds);

  const today = new Date().toISOString().slice(0, 10);
  const all = (cardsRaw ?? []) as Pick<Flashcard, 'next_review' | 'repetitions' | 'ease_factor'>[];

  return {
    dueToday: all.filter((c) => c.next_review <= today).length,
    mastered: all.filter((c) => c.repetitions >= 4 && Number(c.ease_factor) >= 2.5).length,
    learning: all.filter((c) => c.repetitions < 4 || Number(c.ease_factor) < 2.5).length,
    total:    all.length,
  };
}

// ─── STUDY PLAN ───────────────────────────────────────────────────────────────

export async function getStudyPlan(
  supabase: Client,
  userId: string
): Promise<StudyPlan | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from('study_plans') as any)
    .select('*')
    .eq('user_id', userId)
    .limit(1)
    .maybeSingle();
  return (data ?? null) as StudyPlan | null;
}

// ─── BOOKMARK COUNT ───────────────────────────────────────────────────────────

export async function getBookmarkCount(
  supabase: Client,
  userId: string
): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count } = await (supabase.from('bookmarks') as any)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  return (count as number | null) ?? 0;
}

// ─── BOOKMARKS (full rows for Review Center) ──────────────────────────────────

import type { Bookmark } from '@/types/database';

export async function getBookmarks(
  supabase: Client,
  userId: string,
  limit = 50
): Promise<Bookmark[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from('bookmarks') as any)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []) as Bookmark[];
}
