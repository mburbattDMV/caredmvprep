#!/usr/bin/env npx tsx
/**
 * Permanent regression protection for the quiz-grading-integrity fix,
 * 2026-08-30 (supabase/migrations/011_lock_down_quiz_grading_integrity.sql
 * + src/app/api/quiz/complete-session/route.ts). A real throwaway account
 * was confirmed able to forge quiz_sessions.score/passed and
 * user_answers.is_correct via direct authenticated PostgREST writes before
 * this fix — see that migration's header comment for the full incident.
 *
 * Two halves:
 *   1. Attacks A-D — pure database-grant-level checks against production
 *      Supabase directly (no app server needed). These must ALWAYS return
 *      a flat permission-denied error, regardless of what the application
 *      code does — the whole point of this fix is that the database
 *      itself refuses these writes, not just that the UI doesn't offer
 *      them.
 *   2. Attack E + the legitimate flow (real session, real grading, mock
 *      exam, retry) — exercises the actual /api/quiz/complete-session
 *      route, which requires a running app server (the fix here is
 *      application-layer re-grading, which the database alone cannot
 *      verify — Postgres has no access to the TypeScript question bank).
 *      Skips this half cleanly if no server is reachable at --base-url
 *      (default http://localhost:3000) rather than failing — run
 *      `npm run build && npm run start` (or `npm run dev`) first to
 *      exercise it locally against production data, matching how this fix
 *      was originally verified.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
 * SUPABASE_SERVICE_ROLE_KEY. Skips cleanly if these aren't set.
 *
 * Run: npx tsx scripts/test-quiz-grading-integrity-regression.ts [--base-url http://localhost:3000]
 */
import fs from "node:fs";
import { signAnswerToken } from "../src/lib/quizGrading";
import { getQuizConfig, getMockExamConfig } from "../src/data/questions/index";

function loadEnvLocal(): Record<string, string> {
  const env: Record<string, string> = {};
  try {
    const text = fs.readFileSync(".env.local", "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) env[m[1]] = m[2].replace(/^"|"$/g, "").trim();
    }
  } catch {
    /* fall through to process.env */
  }
  return { ...env, ...process.env } as Record<string, string>;
}
const env = loadEnvLocal();
const SUPA = env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

const baseUrlFlagIndex = process.argv.indexOf("--base-url");
const APP = baseUrlFlagIndex !== -1 ? process.argv[baseUrlFlagIndex + 1] : "http://localhost:3000";

let failures = 0;
function pass(label: string) { console.log(`PASS — ${label}`); }
function fail(label: string, detail: string) { failures++; console.error(`FAIL — ${label}\n  ${detail}`); }

async function rest(key: string, token: string, path: string, init: RequestInit = {}) {
  return fetch(`${SUPA}${path}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers as Record<string, string> | undefined) } });
}
const serviceRest = (path: string, init?: RequestInit) => rest(SERVICE_KEY, SERVICE_KEY, path, init);
const authRest = (token: string, path: string, init?: RequestInit) => rest(ANON_KEY, token, path, init);

function base64url(str: string): string {
  return Buffer.from(str, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createUser(email: string, password: string): Promise<string> {
  const res = await serviceRest("/auth/v1/admin/users", { method: "POST", body: JSON.stringify({ email, password, email_confirm: true }) });
  const body = await res.json();
  if (!body.id) throw new Error(`createUser failed: ${JSON.stringify(body)}`);
  return body.id as string;
}
async function signInToken(email: string, password: string): Promise<{ accessToken: string; cookie: string }> {
  const res = await fetch(`${SUPA}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const session = await res.json();
  if (!session.access_token) throw new Error(`signIn failed: ${JSON.stringify(session)}`);
  const projectRef = new URL(SUPA).hostname.split(".")[0];
  const cookieValue = "base64-" + base64url(JSON.stringify(session));
  return { accessToken: session.access_token, cookie: `sb-${projectRef}-auth-token=${cookieValue}` };
}
async function appFetch(cookie: string, path: string, init: RequestInit = {}) {
  return fetch(`${APP}${path}`, { ...init, headers: { Cookie: cookie, "Content-Type": "application/json", ...(init.headers as Record<string, string> | undefined) } });
}
function realAnswersForTest(testId: string, correctCount: number) {
  const config = getQuizConfig(testId) ?? getMockExamConfig(testId);
  if (!config) throw new Error(`Unknown test ${testId}`);
  const questions = config.questions.slice(0, 10);
  return {
    config,
    answers: questions.map((q, i) => {
      const token = signAnswerToken({ id: q.id, exp: Date.now() + 60_000 });
      const selectedIndex = i < correctCount ? q.correctIndex : (q.correctIndex + 1) % 4;
      return { questionId: q.id, token, selectedIndex, timeSpentMs: 1000 };
    }),
  };
}

const cleanupUserIds: string[] = [];

async function testDirectAttacks() {
  console.log("=== A-D: direct database-grant-level attacks (no app server needed) ===");
  const ts = Date.now();
  const pw = `Regr-${ts}-Pw!9x`;
  const userAId = await createUser(`dmv-regr-attack-a-${ts}@example.com`, pw);
  const userBId = await createUser(`dmv-regr-attack-b-${ts}@example.com`, pw);
  cleanupUserIds.push(userAId, userBId);
  const { accessToken: tokenA } = await signInToken(`dmv-regr-attack-a-${ts}@example.com`, pw);

  const sessRes = await authRest(tokenA, "/rest/v1/quiz_sessions", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ user_id: userAId, test_id: "california-permit", state: "california", license_type: "permit", total_questions: 10 }) });
  const sess = (await sessRes.json())[0];

  const isDenied = (status: number, body: string) => (status === 401 || status === 403) && body.includes("42501");

  {
    const res = await authRest(tokenA, `/rest/v1/quiz_sessions?id=eq.${sess.id}`, { method: "PATCH", body: JSON.stringify({ score: 10, passed: true, completed_at: new Date().toISOString() }) });
    const body = await res.text();
    if (isDenied(res.status, body)) pass("A. Direct authenticated PATCH of quiz_sessions.score/passed/completed_at rejected");
    else fail("A. Direct PATCH of quiz_sessions grading fields", `HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  {
    const res = await authRest(tokenA, "/rest/v1/user_answers", { method: "POST", body: JSON.stringify({ session_id: sess.id, user_id: userAId, question_id: "attack-q1", selected_index: 1, correct_index: 0, is_correct: true, category: "signs" }) });
    const body = await res.text();
    if (isDenied(res.status, body)) pass("B. Direct authenticated INSERT of user_answers with forged is_correct rejected");
    else fail("B. Direct INSERT of user_answers", `HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  {
    const res = await authRest(tokenA, "/rest/v1/user_answers", { method: "POST", body: JSON.stringify({ session_id: sess.id, user_id: userAId, question_id: "attack-q2", selected_index: 2, correct_index: 2, is_correct: true, category: "signs" }) });
    const body = await res.text();
    if (isDenied(res.status, body)) pass("C. Direct authenticated INSERT with manipulated correct_index rejected");
    else fail("C. Manipulated correct_index", `HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  {
    const sessBRes = await serviceRest("/rest/v1/quiz_sessions", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ user_id: userBId, test_id: "california-permit", state: "california", license_type: "permit", total_questions: 10 }) });
    const sessB = (await sessBRes.json())[0];
    const patchRes = await authRest(tokenA, `/rest/v1/quiz_sessions?id=eq.${sessB.id}`, { method: "PATCH", body: JSON.stringify({ score: 10, passed: true, completed_at: new Date().toISOString() }) });
    const patchBody = await patchRes.text();
    const insRes = await authRest(tokenA, "/rest/v1/user_answers", { method: "POST", body: JSON.stringify({ session_id: sessB.id, user_id: userBId, question_id: "attack-q3", selected_index: 0, correct_index: 0, is_correct: true, category: "signs" }) });
    const insBody = await insRes.text();
    if (isDenied(patchRes.status, patchBody) && isDenied(insRes.status, insBody)) pass("D. Cross-user writes (PATCH and INSERT against another user's session) both rejected");
    else fail("D. Cross-user writes", `PATCH: HTTP ${patchRes.status} ${patchBody.slice(0, 150)} | INSERT: HTTP ${insRes.status} ${insBody.slice(0, 150)}`);
  }
}

async function testAppLevelFlow() {
  const reachable = await fetch(APP).then((r) => r.ok).catch(() => false);
  if (!reachable) {
    console.log(`\nSKIP — no app server reachable at ${APP}. Run "npm run build && npm run start" (or "npm run dev") first to exercise E and the legitimate flow.`);
    return;
  }

  console.log(`\n=== E + legitimate flow (against app server at ${APP}) ===`);
  const ts = Date.now();
  const pw = `Regr-${ts}-Pw!9x`;

  // E. Replay
  {
    const email = `dmv-regr-replay-${ts}@example.com`;
    const userId = await createUser(email, pw);
    cleanupUserIds.push(userId);
    const { accessToken, cookie } = await signInToken(email, pw);
    const sessRes = await authRest(accessToken, "/rest/v1/quiz_sessions", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ user_id: userId, test_id: "california-permit", state: "california", license_type: "permit", total_questions: 10 }) });
    const sess = (await sessRes.json())[0];
    const { answers } = realAnswersForTest("california-permit", 8);

    const res1 = await appFetch(cookie, "/api/quiz/complete-session", { method: "POST", body: JSON.stringify({ sessionId: sess.id, testId: "california-permit", answers }) });
    const body1 = await res1.json();
    const res2 = await appFetch(cookie, "/api/quiz/complete-session", { method: "POST", body: JSON.stringify({ sessionId: sess.id, testId: "california-permit", answers }) });
    const body2 = await res2.json();
    const countRes = await serviceRest(`/rest/v1/user_answers?session_id=eq.${sess.id}&select=id`, { headers: { Prefer: "count=exact" } });
    const count = countRes.headers.get("content-range")?.split("/")[1];

    if (res1.status === 200 && body1.score === 8 && res2.status === 200 && body2.alreadyCompleted === true && body2.score === 8 && count === "10") {
      pass("E. Replayed completion is a safe no-op, no duplicate user_answers rows");
    } else {
      fail("E. Duplicate/replay submission", `first=${JSON.stringify(body1)} replay=${JSON.stringify(body2)} row_count=${count}`);
    }
  }

  // Legitimate flow
  {
    const email = `dmv-regr-legit-${ts}@example.com`;
    const userId = await createUser(email, pw);
    cleanupUserIds.push(userId);
    const { accessToken, cookie } = await signInToken(email, pw);
    const { config, answers } = realAnswersForTest("california-permit", 8);
    const sessRes = await authRest(accessToken, "/rest/v1/quiz_sessions", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ user_id: userId, test_id: "california-permit", state: "california", license_type: "permit", total_questions: answers.length }) });
    const sess = (await sessRes.json())[0];

    const completeRes = await appFetch(cookie, "/api/quiz/complete-session", { method: "POST", body: JSON.stringify({ sessionId: sess.id, testId: "california-permit", answers }) });
    const completeBody = await completeRes.json();
    const expectedPassed = 8 / 10 >= config.passingScore;
    if (completeRes.status === 200 && completeBody.score === 8 && completeBody.passed === expectedPassed) {
      pass(`Legitimate flow: server-computed score=8, passed=${completeBody.passed} matches real threshold ${config.passingScore}`);
    } else {
      fail("Legitimate flow correctness", JSON.stringify(completeBody));
    }

    const uaRes = await serviceRest(`/rest/v1/user_answers?session_id=eq.${sess.id}&select=selected_index,correct_index,is_correct`);
    const uaRows = await uaRes.json();
    const consistent = uaRows.every((r: { selected_index: number; correct_index: number; is_correct: boolean }) => r.is_correct === (r.selected_index === r.correct_index));
    if (consistent && uaRows.length === 10) pass("Persisted user_answers rows are internally consistent");
    else fail("user_answers consistency", JSON.stringify(uaRows));
  }

  // Mock exam
  {
    const email = `dmv-regr-mock-${ts}@example.com`;
    const userId = await createUser(email, pw);
    cleanupUserIds.push(userId);
    const { accessToken, cookie } = await signInToken(email, pw);
    const mockExamId = "california-permit-mock-1";
    const { config, answers } = realAnswersForTest(mockExamId, 10);
    const sessRes = await authRest(accessToken, "/rest/v1/quiz_sessions", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ user_id: userId, test_id: mockExamId, state: "california", license_type: "permit", total_questions: answers.length }) });
    const sess = (await sessRes.json())[0];
    const completeRes = await appFetch(cookie, "/api/quiz/complete-session", { method: "POST", body: JSON.stringify({ sessionId: sess.id, testId: mockExamId, answers }) });
    const completeBody = await completeRes.json();
    if (completeRes.status === 200 && completeBody.score === 10 && completeBody.passed === true) {
      pass(`Mock exam flow resolves its base test's real passing threshold (${config.passingScore}) correctly`);
    } else {
      fail("Mock exam flow", JSON.stringify(completeBody));
    }
  }
}

async function main() {
  if (!SUPA || !ANON_KEY || !SERVICE_KEY) {
    console.log("SKIP — NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / SUPABASE_SERVICE_ROLE_KEY not all set.");
    return;
  }
  await testDirectAttacks();
  await testAppLevelFlow();
}

main()
  .catch((e) => {
    console.error("SCRIPT ERROR:", e);
    failures++;
  })
  .finally(async () => {
    console.log("\n=== Cleanup ===");
    for (const uid of cleanupUserIds) {
      await serviceRest(`/rest/v1/user_answers?user_id=eq.${uid}`, { method: "DELETE" });
      await serviceRest(`/rest/v1/weak_topics?user_id=eq.${uid}`, { method: "DELETE" });
      await serviceRest(`/rest/v1/quiz_sessions?user_id=eq.${uid}`, { method: "DELETE" });
      await serviceRest(`/auth/v1/admin/users/${uid}`, { method: "DELETE" });
    }
    console.log(`Cleaned up ${cleanupUserIds.length} throwaway account(s).`);
    console.log("");
    if (failures > 0) {
      console.error(`${failures} check(s) FAILED.`);
      process.exit(1);
    } else {
      console.log("All checks passed.");
    }
  });
