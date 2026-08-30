import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getQuestionById, getQuizConfig, getMockExamConfig } from "@/data/questions/index";
import { gradeSubmission } from "@/lib/quizGrading";

/**
 * The ONLY path allowed to persist a completed quiz session's grading data
 * (see supabase/migrations/011_lock_down_quiz_grading_integrity.sql, which
 * revokes direct client INSERT/UPDATE on user_answers/quiz_sessions for
 * exactly this reason). Every answer is re-graded here, server-side,
 * against the authoritative question bank via the same gradeSubmission()
 * primitive /api/grade-answer already uses — the client's own claimed
 * correctness (if it sends any) is never read. score/passed are not even
 * sent to the database by this route; the BEFORE UPDATE trigger added in
 * that migration recomputes them unconditionally from the real
 * user_answers rows this route just wrote, so this route being buggy
 * can't persist a wrong score either — the database is the actual final
 * authority.
 *
 * Client input trusted only as "the student's answer" (selectedIndex) and
 * "which question, using the same encrypted token grade-answer already
 * validated." Nothing else from the request body reaches the database.
 */

interface SubmittedAnswer {
  questionId: string;
  token: string;
  selectedIndex: number;
  timeSpentMs?: number;
}

interface CompleteSessionRequest {
  sessionId: string;
  testId: string;
  answers: SubmittedAnswer[];
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let body: CompleteSessionRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { sessionId, testId, answers } = body;
  if (typeof sessionId !== "string" || typeof testId !== "string" || !Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (answers.length > 200) {
    return NextResponse.json({ error: "Too many answers" }, { status: 400 });
  }

  // Ownership + idempotency: re-verified explicitly (not just trusted from
  // RLS) because the writes below use the service-role client, which
  // bypasses RLS entirely.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session, error: sessionError } = await (supabase as any)
    .from("quiz_sessions")
    .select("id, user_id, test_id, completed_at")
    .eq("id", sessionId)
    .maybeSingle();

  if (sessionError || !session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  if (session.user_id !== user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }
  if (session.test_id !== testId) {
    return NextResponse.json({ error: "Session/test mismatch" }, { status: 400 });
  }
  if (session.completed_at !== null) {
    // Replay/duplicate submission — not an error, just a no-op. Returning
    // the already-persisted truth (rather than re-grading and re-inserting)
    // is what actually makes this idempotent; user_answers' own unique
    // constraint would reject a second insert attempt anyway, but a plain
    // "already completed" response is cleaner than surfacing that as an
    // error to the client.
    const admin = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: completedSession } = await (admin as any)
      .from("quiz_sessions")
      .select("score, passed, total_questions")
      .eq("id", sessionId)
      .single();
    return NextResponse.json({
      alreadyCompleted: true,
      score: completedSession?.score ?? null,
      passed: completedSession?.passed ?? null,
      totalQuestions: completedSession?.total_questions ?? null,
    });
  }

  const config = getQuizConfig(testId) ?? getMockExamConfig(testId);
  if (!config) {
    return NextResponse.json({ error: "Unknown test" }, { status: 400 });
  }

  // Re-grade every answer independently — the client's own selectedIndex is
  // the only thing trusted from the request; correctIndex/isCorrect/
  // category all come from the authoritative source question, looked up
  // fresh by id, exactly like /api/grade-answer does per-question during
  // the quiz itself.
  const gradedRows: {
    session_id: string;
    user_id: string;
    question_id: string;
    selected_index: number;
    correct_index: number;
    is_correct: boolean;
    category: string;
    time_spent_ms: number | null;
  }[] = [];

  const seenQuestionIds = new Set<string>();
  for (const a of answers) {
    if (typeof a?.questionId !== "string" || typeof a?.selectedIndex !== "number" || !a?.token) {
      return NextResponse.json({ error: "Invalid answer entry" }, { status: 400 });
    }
    if (seenQuestionIds.has(a.questionId)) {
      // Duplicate question within the same submission — reject outright
      // rather than silently deduping, since it indicates either a client
      // bug or an attempt to skew the per-category count.
      return NextResponse.json({ error: "Duplicate question in submission" }, { status: 400 });
    }
    seenQuestionIds.add(a.questionId);

    const sourceQuestion = getQuestionById(a.questionId);
    if (!sourceQuestion) {
      return NextResponse.json({ error: `Unknown question: ${a.questionId}` }, { status: 400 });
    }

    const selectedIndex = a.selectedIndex;
    if (selectedIndex === -1) {
      // Skipped / timed out — never graded as correct, matching the
      // client's own skip semantics (src/store/quiz.ts skipQuestion).
      gradedRows.push({
        session_id: sessionId,
        user_id: user.id,
        question_id: a.questionId,
        selected_index: -1,
        correct_index: sourceQuestion.correctIndex,
        is_correct: false,
        category: sourceQuestion.category,
        time_spent_ms: a.timeSpentMs ?? null,
      });
      continue;
    }

    const graded = gradeSubmission(a.token, a.questionId, selectedIndex, sourceQuestion);
    if (!graded) {
      // Invalid/expired/tampered token — recorded as ungraded-wrong, same
      // fallback the client itself already uses when grading is
      // unavailable (correctIndex sentinel -1; the is_correct-matches-
      // indices CHECK constraint is satisfied automatically since
      // selected_index >= 0 <> -1 is always false).
      gradedRows.push({
        session_id: sessionId,
        user_id: user.id,
        question_id: a.questionId,
        selected_index: selectedIndex,
        correct_index: -1,
        is_correct: false,
        category: sourceQuestion.category,
        time_spent_ms: a.timeSpentMs ?? null,
      });
      continue;
    }

    gradedRows.push({
      session_id: sessionId,
      user_id: user.id,
      question_id: a.questionId,
      selected_index: selectedIndex,
      correct_index: graded.correctIndex,
      is_correct: graded.correct,
      category: sourceQuestion.category,
      time_spent_ms: a.timeSpentMs ?? null,
    });
  }

  const admin = createAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: insertError } = await (admin as any).from("user_answers").insert(gradedRows);
  if (insertError) {
    console.error("[complete-session] user_answers insert failed:", insertError.message);
    return NextResponse.json({ error: "Could not record answers" }, { status: 500 });
  }

  // score/passed are intentionally NOT set here — the BEFORE UPDATE
  // trigger (enforce_quiz_session_completion_integrity) recomputes them
  // unconditionally from the user_answers rows just inserted above.
  // passing_score is the one value this route is trusted to set, resolved
  // from the authoritative TypeScript question registry.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: updatedSession, error: updateError } = await (admin as any)
    .from("quiz_sessions")
    .update({ completed_at: new Date().toISOString(), passing_score: config.passingScore })
    .eq("id", sessionId)
    .select("score, passed, total_questions")
    .single();

  if (updateError || !updatedSession) {
    console.error("[complete-session] quiz_sessions completion update failed:", updateError?.message);
    return NextResponse.json({ error: "Answers recorded, but completion could not be saved" }, { status: 500 });
  }

  return NextResponse.json({
    alreadyCompleted: false,
    score: updatedSession.score,
    passed: updatedSession.passed,
    totalQuestions: updatedSession.total_questions,
  });
}
