import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

// Serve logo-header.png via the Next.js runtime.
// This makes /logo-header.png (via rewrite) and /api/logo both reliable,
// bypassing Vercel's static-asset layer which was returning 404.
export function GET() {
  try {
    const file = readFileSync(join(process.cwd(), "public", "logo-header.png"));
    return new NextResponse(file, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
