-- ================================================================
-- CAREDMVPrep — Migration 008
-- Fix two data-persistence bugs that caused the dashboard to stay
-- at zero after completing practice sessions, and bookmarks to fail.
--
-- Bug 1: quiz_sessions missing GRANT for authenticated
-- ─────────────────────────────────────────────────────
-- Migration 005 added GRANTs for tables created in migrations 002/003
-- but missed quiz_sessions and the initial user_answers table created
-- in migration 001 via raw SQL. Without object-level GRANTs, Postgres
-- rejects all queries (INSERT, SELECT, UPDATE) before RLS is evaluated.
-- The QuizResults 3-step persist flow silently returned null at Step 1
-- (INSERT quiz_sessions), causing Steps 2 and 3 to be skipped.
--
-- Bug 2: bookmarks.question_id and flashcards.question_id are UUID FKs
-- ──────────────────────────────────────────────────────────────────────
-- The bookmarks and flashcards tables were designed assuming questions
-- would live in the Supabase questions table. Instead, all questions are
-- stored in TypeScript source files with text IDs like 'ca-dmv-speed-001'.
-- These are not valid UUIDs and do not exist in the questions table.
-- Every bookmark insert failed with "invalid input syntax for type uuid".
-- Fix: drop the FK constraints and change the columns to TEXT so they
-- match the in-memory question bank IDs.
-- ================================================================

-- ── Fix 1: GRANT quiz_sessions (missed in migration 005) ────────────────────
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_sessions TO service_role;

-- ── Fix 2a: bookmarks.question_id UUID FK → TEXT ────────────────────────────
ALTER TABLE public.bookmarks
  DROP CONSTRAINT IF EXISTS bookmarks_question_id_fkey;

ALTER TABLE public.bookmarks
  ALTER COLUMN question_id TYPE TEXT USING question_id::TEXT;

-- ── Fix 2b: flashcards.question_id UUID FK → TEXT ───────────────────────────
-- flashcards.question_id was nullable UUID FK; changing to TEXT preserves
-- the ability to store TypeScript question IDs for SRS linking.
ALTER TABLE public.flashcards
  DROP CONSTRAINT IF EXISTS flashcards_question_id_fkey;

ALTER TABLE public.flashcards
  ALTER COLUMN question_id TYPE TEXT USING question_id::TEXT;

-- ── Ensure RLS policies are correct for quiz_sessions ───────────────────────
-- The policies from migration 001 are fine. Re-confirm they exist.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'quiz_sessions'
      AND policyname = 'sessions_insert_own'
  ) THEN
    CREATE POLICY "sessions_insert_own" ON public.quiz_sessions
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'quiz_sessions'
      AND policyname = 'sessions_select_own'
  ) THEN
    CREATE POLICY "sessions_select_own" ON public.quiz_sessions
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'quiz_sessions'
      AND policyname = 'sessions_update_own'
  ) THEN
    CREATE POLICY "sessions_update_own" ON public.quiz_sessions
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- Also grant to service_role for admin/webhook operations
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_sessions TO service_role;
