import { NextRequest, NextResponse } from "next/server";
import { getQuestionById } from "@/data/questions/index";
import { gradeSubmission } from "@/lib/quizGrading";

/**
 * Single shared server-side grading endpoint for the quiz and mock-exam
 * engines. The client sends only: which question id, the encrypted token
 * it was issued when the question was fetched, and which option index the
 * student clicked. The server independently re-resolves the canonical
 * source question by id (via the same module-level index every quiz/exam
 * config is built from) and grades against it — the client never supplies
 * (or needs to supply) a correct answer or explanation.
 */

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 120; // a real session grades one question at a time, repeatedly

declare global {
  // eslint-disable-next-line no-var
  var __gradeRateLimit: Map<string, { count: number; resetAt: number }> | undefined;
}

function getIP(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string) {
  if (!globalThis.__gradeRateLimit) globalThis.__gradeRateLimit = new Map();
  const now = Date.now();
  const entry = globalThis.__gradeRateLimit.get(ip);
  if (!entry || entry.resetAt <= now) {
    globalThis.__gradeRateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true as const };
  }
  if (entry.count >= RATE_MAX) {
    return { allowed: false as const, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  globalThis.__gradeRateLimit.set(ip, entry);
  return { allowed: true as const };
}

interface SingleGradeRequest {
  id: string;
  token: string;
  selected: number;
}

const MAX_BATCH = 100; // covers the largest mock exam

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  const rl = rateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  try {
    const body = await req.json();

    // Batch mode — used to backfill correctIndex/explanation for
    // skipped/timed-out questions right before building the final result.
    if (Array.isArray(body?.answers)) {
      const answers = (body.answers as unknown[]).slice(0, MAX_BATCH) as SingleGradeRequest[];
      const results = answers.map((a) => {
        if (typeof a?.id !== "string" || typeof a?.selected !== "number" || !a?.token) {
          return { id: a?.id ?? null, error: "Invalid entry" };
        }
        const sourceQuestion = getQuestionById(a.id);
        if (!sourceQuestion) return { id: a.id, error: "Question not found" };
        const result = gradeSubmission(a.token, a.id, a.selected, sourceQuestion);
        if (!result) return { id: a.id, error: "Invalid or expired answer token" };
        return { id: a.id, ...result };
      });
      return NextResponse.json({ results });
    }

    // Single-question mode — used for live feedback as the student answers.
    const id = typeof body?.id === "string" ? body.id : null;
    const token = body?.token;
    const selected = typeof body?.selected === "number" ? body.selected : null;

    if (id === null || selected === null || !token) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const sourceQuestion = getQuestionById(id);
    if (!sourceQuestion) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const result = gradeSubmission(token, id, selected, sourceQuestion);
    if (!result) {
      return NextResponse.json({ error: "Invalid or expired answer token" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("grade-answer error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
