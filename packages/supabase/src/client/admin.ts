import { createClient } from "@supabase/supabase-js";
import type { Database } from "types/database.types";

/**
 * Creates a Supabase admin client with full access to the database
 * This should only be used in trusted server environments, never in the browser
 */
export function createAdminClient() {
  // Make sure we have the required environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY;

  if (!(supabaseUrl && supabaseServiceKey)) {
    throw new Error(
      "Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  // Create a Supabase client with the service role key for full admin access
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
