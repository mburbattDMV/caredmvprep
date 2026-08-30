-- CRITICAL DATA-INTEGRITY FIX — confirmed live-exploitable via a throwaway
-- account, 2026-08-30 (see the audit report). Applied manually to
-- production via the Supabase SQL Editor (mburbatt@yahoo.com) the same
-- day; this file was updated afterward to add the TRUNCATE/DELETE revokes
-- found and applied during that manual verification pass (see sections 1
-- and 2 below) so the migration history matches production exactly — it
-- does not just describe what was originally drafted. A real authenticated student
-- could, via a direct PostgREST call bypassing the app entirely:
--   (a) PATCH their own quiz_sessions row to set score=<anything>,
--       passed=true, with zero real answers ever submitted;
--   (b) INSERT a user_answers row with is_correct=true regardless of
--       whether selected_index actually equals the real correct_index.
-- Root cause: per-question grading already happens correctly, server-side,
-- against the authoritative question bank (src/lib/quizGrading.ts +
-- /api/grade-answer, using encrypted per-question tokens so the answer key
-- never reaches the client) — but the FINAL PERSISTENCE of that graded
-- data was a direct, client-driven Supabase write
-- (src/components/quiz/QuizResults.tsx), protected only by ownership RLS.
-- Ownership RLS answers "is this your row," never "are these values true."
--
-- Fix shape: the authoritative pass/fail threshold per test only exists in
-- TypeScript (src/data/questions/index.ts — ~150 tests, each with its own
-- passingScore, varying 0.70-0.85 by jurisdiction) — Postgres cannot
-- independently regrade a submission the way it can, say, verify a Stripe
-- amount against a stored price. So this fix routes ALL grading-data
-- persistence through one new trusted server route
-- (src/app/api/quiz/complete-session/route.ts) that re-grades every answer
-- server-side via the exact same gradeSubmission() primitive
-- /api/grade-answer already uses (never trusting a client-claimed
-- correctness), using the service-role client — and closes the direct
-- PostgREST path at the database layer so a client cannot reach these
-- tables' grading columns at all, through any route, not just the one the
-- app happens to use today.

-- ─── 1. user_answers: only a trusted server path may write these rows ───────
-- Previously INSERT/UPDATE/DELETE were all granted to `authenticated`
-- (005_grants.sql:32-40) — a student's own browser could insert or modify
-- their own graded-answer rows directly, which is exactly what let
-- is_correct be set independent of selected_index/correct_index. SELECT
-- stays open (the review/history pages need to read a student's own
-- answers). TRUNCATE was never legitimately needed by `authenticated` on
-- any table in this project and is revoked here too, alongside
-- INSERT/UPDATE/DELETE, for the same reason: a broad grant nobody
-- actually uses is exactly the dormant-privilege shape that caused this
-- and every other RPC/grant defect found in the 2026-08-30 cross-site
-- audit. No application code anywhere calls .delete()/truncates on this
-- table (confirmed by search) — removing it breaks nothing.
revoke insert, update, delete, truncate on public.user_answers from authenticated;

-- Defense in depth, cheap and unconditional: even the trusted server path
-- above cannot insert a row where is_correct disagrees with
-- selected_index = correct_index. selected_index = -1 is the "skipped /
-- grading unavailable" sentinel (see finalizeAnswers() in
-- src/store/quiz.ts) and must always be is_correct = false.
alter table public.user_answers
  add constraint user_answers_is_correct_matches_indices
  check (
    (selected_index = -1 and is_correct = false)
    or (selected_index >= 0 and is_correct = (selected_index = correct_index))
  );

-- Prevents a replayed/duplicate submission for the same question from
-- silently inserting a second row and skewing score/weak-topic
-- aggregation (checklist item E). The trusted route also checks this
-- itself before inserting, but the constraint is the real, unconditional
-- floor.
alter table public.user_answers
  add constraint user_answers_one_row_per_question_per_session
  unique (session_id, question_id);

-- ─── 2. quiz_sessions: score/passed become database-computed, never client-set ───
-- Previously UPDATE (all columns) was granted to `authenticated`
-- (008_fix_grants_and_bookmarks.sql:27-28,79) — a student's own browser
-- could PATCH completed_at/score/passed directly to any value. INSERT
-- stays open (session creation — test_id/state/license_type/
-- total_questions carry no grading authority and were never part of this
-- exploit) and SELECT stays open (dashboard/history need it). DELETE and
-- TRUNCATE are revoked too, same reasoning as user_answers above — no
-- application code deletes a session directly (confirmed by search; there
-- is no "delete my history" feature), so neither privilege was ever
-- legitimately needed.
revoke update, delete, truncate on public.quiz_sessions from authenticated;

-- The one new column the trusted route sets at completion time — the real
-- passing threshold for this session's test, resolved server-side from
-- src/data/questions/index.ts (getQuizConfig/getMockExamConfig), never
-- from client input. Only reachable via the same revoked-from-
-- authenticated UPDATE grant above, so a direct client write can't set
-- this either.
alter table public.quiz_sessions
  add column if not exists passing_score numeric;

-- Recomputes score/passed from the REAL, already-locked-down user_answers
-- rows every time a session transitions to completed — unconditionally,
-- regardless of what score/passed the caller's UPDATE statement itself
-- attempted to set. This means even a future bug in the trusted route's
-- own arithmetic can't persist a wrong score: the database is the actual
-- final authority, not just a passive recipient of a value computed
-- elsewhere. BEFORE UPDATE (unlike the existing AFTER UPDATE
-- quiz_session_completed trigger, which only reacts to the row after it's
-- written) is required to actually change what gets stored.
create or replace function public.enforce_quiz_session_completion_integrity()
returns trigger language plpgsql security definer as $$
declare
  v_correct_count int;
  v_answer_count  int;
begin
  if NEW.completed_at is not null and OLD.completed_at is null then
    select count(*) filter (where is_correct), count(*)
      into v_correct_count, v_answer_count
      from public.user_answers
      where session_id = NEW.id;

    NEW.score  := v_correct_count;
    NEW.passed := v_answer_count > 0
      and NEW.passing_score is not null
      and (v_correct_count::numeric / v_answer_count) >= NEW.passing_score;
  end if;
  return NEW;
end;
$$;

create or replace trigger quiz_session_completion_integrity
  before update on public.quiz_sessions
  for each row execute function public.enforce_quiz_session_completion_integrity();

-- ─── 3. update_streak / refresh_weak_topics: trust service_role too ─────────
-- Migration 010 correctly closed the anon/cross-user exploit (auth.uid()
-- must equal p_user_id) but that also blocks the ONE legitimate caller
-- this fix now needs: the new trusted completion route uses the
-- service-role client for the entire completion write (both the
-- user_answers inserts and the quiz_sessions UPDATE that fires the
-- existing quiz_session_completed AFTER trigger, which PERFORMs these two
-- functions internally) — and service-role connections have no JWT, so
-- auth.uid() is null in that context, same as an anonymous caller from
-- the database's point of view. service_role is never client-reachable
-- (it requires the service-role key, held only by trusted server code),
-- so trusting it unconditionally here is the same standard trust
-- boundary every other service-role-only RPC in this project already
-- relies on — not a reopening of the anon/cross-user hole migration 010
-- closed. Ownership itself is independently re-verified by the trusted
-- route before it ever reaches this point (it checks the session's
-- user_id against the caller's real authenticated session).
create or replace function public.update_streak(p_user_id uuid)
returns void language plpgsql security definer as $$
declare
  v_last  date;
  v_today date := current_date;
  v_cur   int;
  v_best  int;
begin
  if auth.role() <> 'service_role' and (auth.uid() is null or auth.uid() <> p_user_id) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  select streak_current, streak_best, streak_updated
  into v_cur, v_best, v_last
  from public.profiles where id = p_user_id;

  if v_last = v_today then
    return;
  elsif v_last = v_today - interval '1 day' then
    v_cur := coalesce(v_cur, 0) + 1;
  else
    v_cur := 1;
  end if;

  v_best := greatest(coalesce(v_best, 0), v_cur);

  update public.profiles
  set streak_current = v_cur,
      streak_best    = v_best,
      streak_updated = v_today,
      updated_at     = now()
  where id = p_user_id;
end;
$$;

create or replace function public.refresh_weak_topics(p_user_id uuid)
returns void language plpgsql security definer as $$
begin
  if auth.role() <> 'service_role' and (auth.uid() is null or auth.uid() <> p_user_id) then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  insert into public.weak_topics (
    user_id, category_slug, license_type, correct, total, last_seen_at, updated_at
  )
  select
    qs.user_id,
    ua.category,
    qs.license_type,
    count(*) filter (where ua.is_correct)::int,
    count(*)::int,
    max(ua.created_at),
    now()
  from public.user_answers ua
  join public.quiz_sessions qs on qs.id = ua.session_id
  where qs.user_id = p_user_id
    and qs.completed_at is not null
  group by qs.user_id, ua.category, qs.license_type
  on conflict (user_id, category_slug, license_type) do update
    set correct      = excluded.correct,
        total        = excluded.total,
        last_seen_at = excluded.last_seen_at,
        updated_at   = now();
end;
$$;

-- ─── VERIFY AFTER APPLYING ───────────────────────────────────────────────────
-- Don't assume any revoke above worked as written — this project's grants
-- were all issued directly to named roles (never `to public`, confirmed by
-- the earlier audit), so a plain `revoke ... from authenticated` should be
-- correct and complete here too, but confirm:
--   select grantee, privilege_type, table_name from information_schema.role_table_grants
--   where table_schema='public' and table_name in ('user_answers','quiz_sessions')
--   order by table_name, privilege_type;
--
-- CONFIRMED against production 2026-08-30 (final applied state — matches
-- this file exactly):
--   quiz_sessions authenticated: INSERT, SELECT, REFERENCES, TRIGGER only
--     (no UPDATE, no DELETE, no TRUNCATE)
--   user_answers  authenticated: SELECT, REFERENCES, TRIGGER only
--     (no INSERT, no UPDATE, no DELETE, no TRUNCATE)
-- REFERENCES/TRIGGER were never granted or revoked by any migration in
-- this project — they're PostgreSQL's own default grant to the table
-- owner's role family and carry no exploitable capability on their own
-- (REFERENCES only permits being the target of a foreign key from a table
-- you separately have privileges to create; TRIGGER only permits defining
-- a trigger, not invoking one). service_role should still show full
-- privileges on both tables (unaffected — it was never touched).
