# CARE DMV Prep — Agent/Contributor Instructions

## Read this first — CARE Universal Standards

Before any substantive work in this repo, read `CARE_UNIVERSAL_STANDARDS.md` (in this repo's root) — the small set of permanent rules every CARE product must follow (git safety, mock-exam/blueprint certification, server-side answer protection, scored-vs-delivered question counts, shared-foundation-first fixes, the five independent CONTENT/REGISTERED/LIVE/CHECKOUT-READY/CERTIFIED gates, and the cross-product admin standard).

Also required reading, before doing anything else in this repo:
- [`STATE_PROGRESS.md`](STATE_PROGRESS.md) — per-state activation status; read this first in every new session before touching any state's content or activation flags, per that file's own instruction.
- [`docs/ANSWER_KEY_SECURITY.md`](docs/ANSWER_KEY_SECURITY.md) — required reading before touching any quiz/grading/mock-exam code. Documents two real, independent answer-key-leak incidents in this codebase and the standing pre-ship checklist for any graded surface.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
