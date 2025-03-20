import { createServerClient as creacteClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "types/database.types";

export async function createServerClient() {
  const cookieStore = await cookies();

  return creacteClient<Database>(
    // biome-ignore lint/style/noNonNullAssertion: <To simplify monorepo setup>
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: <To simplify monorepo setup>
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            // biome-ignore lint/complexity/noForEach: <Same as supabase documentation>
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
