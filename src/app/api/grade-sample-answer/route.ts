import { NextRequest, NextResponse } from "next/server";
import { gradeSampleSubmission } from "@/lib/quizGrading";

/**
 * Server-side grading endpoint for the free public "sample questions"
 * widget (SampleQuestions.tsx, embedded via PracticeTestPage.tsx across the
 * ~170 static practice-test landing pages). No login required — this is
 * public marketing content.
 *
 * The client sends the question text, its options, the encrypted token it
 * was issued alongside them (see sanitizeSampleQuestion in
 * src/lib/quizGrading.ts), and which option index the student clicked. The
 * server decrypts the token to recover the answer key — the client never
 * has the key needed to read the token itself, so the correct answer is
 * never present in the page's HTML, RSC payload, or JS bundle before this
 * response.
 */

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 60; // a sample widget has at most ~10 questions per page

declare global {
  // eslint-disable-next-line no-var
  var __gradeSampleRateLimit: Map<string, { count: number; resetAt: number }> | undefined;
}

function getIP(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string) {
  if (!globalThis.__gradeSampleRateLimit) globalThis.__gradeSampleRateLimit = new Map();
  const now = Date.now();
  const entry = globalThis.__gradeSampleRateLimit.get(ip);
  if (!entry || entry.resetAt <= now) {
    globalThis.__gradeSampleRateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true as const };
  }
  if (entry.count >= RATE_MAX) {
    return { allowed: false as const, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  globalThis.__gradeSampleRateLimit.set(ip, entry);
  return { allowed: true as const };
}

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

    const question = typeof body?.question === "string" ? body.question : null;
    const options = Array.isArray(body?.options) ? (body.options as unknown[]) : null;
    const token = body?.token;
    const selected = typeof body?.selected === "number" ? body.selected : null;

    if (
      question === null ||
      options === null ||
      !options.every((o) => typeof o === "string") ||
      selected === null ||
      !token
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const result = gradeSampleSubmission(token, question, options as string[], selected);
    if (!result) {
      return NextResponse.json({ error: "Invalid or expired answer token" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("grade-sample-answer error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
