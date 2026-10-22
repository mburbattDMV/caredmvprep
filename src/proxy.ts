import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/quiz/',
  '/mock-exam',
  '/review',
  '/history',
  '/account',
  '/flashcards',
  '/onboarding',
  '/admin/',
  '/myadmin2026/',
];
const AUTH_PAGES = ['/login', '/signup', '/forgot-password', '/reset-password'];

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Refresh the session — required by @supabase/ssr
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  // The admin sign-in form itself must stay reachable while signed out. It lives under /myadmin2026/, which is
  // otherwise protected; without this exemption every visit to /myadmin2026/login was redirected to the student
  // /login page, so the admin could never reach the admin form. Access control for the rest of /myadmin2026 is
  // unchanged here and is still enforced again server-side by the admin layout (user + is_admin() check).
  const isAdminLogin = pathname === '/myadmin2026/login';
  const isProtected = !isAdminLogin && PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  // Unauthenticated user hitting a protected route → send to login
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // Authenticated user hitting auth pages → send to dashboard
  if (isAuthPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
