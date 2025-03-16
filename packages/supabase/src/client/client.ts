import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "types/database.types";

export function createClient() {
  return createBrowserClient<Database>(
    // biome-ignore lint/style/noNonNullAssertion: <To simplify monorepo setup>
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: <To simplify monorepo setup>
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
