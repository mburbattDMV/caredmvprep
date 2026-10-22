import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Password-setup link target for admin-created accounts (and any recovery link we generate ourselves).
 * The link carries a Supabase one-time token hash: it expires and works once. Only the `recovery` type is
 * accepted here, and the destination is fixed, so this cannot be used as an open redirect or to mint other
 * kinds of session.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (!tokenHash || type !== "recovery") {
    return NextResponse.redirect(new URL("/forgot-password?error=link_invalid", origin));
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  );

  const { error } = await supabase.auth.verifyOtp({ type: "recovery", token_hash: tokenHash });
  if (error) {
    console.error("[auth/confirm] verifyOtp failed:", error.message);
    return NextResponse.redirect(new URL("/forgot-password?error=link_expired", origin));
  }
  return NextResponse.redirect(new URL("/reset-password", origin));
}
