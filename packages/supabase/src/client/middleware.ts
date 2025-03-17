import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "types/database.types";

// Array of route prefixes that don't require authentication
const PUBLIC_ROUTES = [
  "/auth/sign",
  "/auth/callback",
  "/shared/podcast",
  "/auth/forgot-password",
  "/privacy-policy",
  "/terms-of-use",
];

export async function updateSession(
  request: NextRequest,
): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    // biome-ignore lint/style/noNonNullAssertion: <To simplify monorepo setup>
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: <To simplify monorepo setup>
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // biome-ignore lint/complexity/noForEach: <Same as supabase documentation>
          cookiesToSet.forEach(({ name, value, options: _optionNotUsed }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          // biome-ignore lint/complexity/noForEach: <Same as supabase documentation>
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Get the current user from Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Special handling for callback route - always allow
  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  // Check if route is public or user is authenticated
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // Redirect to sign in if not a public route and user is not authenticated
  if (!(user || isPublicRoute)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users trying to access /auth/* paths
  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Default response if no conditions match
  return NextResponse.next();
}
