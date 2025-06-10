import { createServerClient } from "@workspace/supabase/server";
import { z } from "zod";

export const updateUserInput = z.object({
  userId: z.string().uuid(),
  full_name: z.string().optional(),
  avatar_url: z.string().optional(),
  billing_address: z.any().optional(),
  payment_method: z.any().optional(),
});

export const updateUserOutput = z.object({
  id: z.string(),
  full_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  billing_address: z.any().nullable(),
  payment_method: z.any().nullable(),
});

export type UpdateUserInput = z.infer<typeof updateUserInput>;
export type UpdateUserOutput = z.infer<typeof updateUserOutput>;

export const updateUser = async (
  input: UpdateUserInput,
): Promise<UpdateUserOutput> => {
  const supabase = await createServerClient();

  // Extract userId from input for the where clause
  const { userId, ...updateData } = input;

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }

  if (!data) {
    throw new Error("User not found or update failed");
  }

  return data;
};

export const updateCurrentUserInput = z.object({
  full_name: z.string().optional(),
  avatar_url: z.string().optional(),
  billing_address: z.any().optional(),
  payment_method: z.any().optional(),
});

export type UpdateCurrentUserInput = z.infer<typeof updateCurrentUserInput>;

export const updateCurrentUser = async (
  input: UpdateCurrentUserInput,
): Promise<UpdateUserOutput> => {
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

  const { data, error } = await supabase
    .from("users")
    .update(input)
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to update user profile: ${error.message}`);
  }

  if (!data) {
    throw new Error("User profile not found or update failed");
  }

  return data;
};
