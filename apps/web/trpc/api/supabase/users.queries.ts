import { createServerClient } from "@workspace/supabase/server";
import { z } from "zod";

export const getUserByIdInput = z.object({
  userId: z.string().uuid(),
});

export const getUserByIdOutput = z.object({
  id: z.string(),
  full_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  billing_address: z.any().nullable(),
  payment_method: z.any().nullable(),
});

export type GetUserByIdInput = z.infer<typeof getUserByIdInput>;
export type GetUserByIdOutput = z.infer<typeof getUserByIdOutput>;

export const getUserById = async (
  input: GetUserByIdInput,
): Promise<GetUserByIdOutput> => {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", input.userId)
    .single();

  if (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

export const getCurrentUserOutput = z.object({
  id: z.string(),
  full_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  billing_address: z.any().nullable(),
  payment_method: z.any().nullable(),
});

export type GetCurrentUserOutput = z.infer<typeof getCurrentUserOutput>;

export const getCurrentUser = async (): Promise<GetCurrentUserOutput> => {
  const supabase = await createServerClient();

  // Get the current authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Authentication error: ${authError.message}`);
  }

  if (!user) {
    throw new Error("No authenticated user found");
  }

  // Get user profile from users table
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(`Failed to get user profile: ${error.message}`);
  }

  if (!data) {
    throw new Error("User profile not found");
  }

  return data;
};
