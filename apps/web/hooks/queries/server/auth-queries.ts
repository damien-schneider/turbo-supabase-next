import type { SupabaseClient } from "@supabase/supabase-js";

export const getUser = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return { user: data.user, error, idUser: data.user?.id };
};

export const getSession = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return { session: data.session, error, idUser: data.session?.user.id };
};
