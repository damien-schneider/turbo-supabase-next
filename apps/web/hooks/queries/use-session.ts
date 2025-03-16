"use client";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@workspace/supabase/client";

import { sessionKey, userKey } from "@/lib/query-key-factory";
import type { Session, User } from "@supabase/supabase-js";

export const useSession = (): {
  session: Session | undefined | null;
  isLoading: boolean;
  error: Error | null;
  idUser: string | undefined;
} => {
  const supabase = createClient();
  const { data, isLoading, error } = useQuery({
    queryKey: sessionKey.all,
    queryFn: async () => await supabase.auth.getSession(),
  });

  // Adjust according to your actual API structure
  const session = data?.data?.session;
  const idUser = session?.user?.id;

  return { session, isLoading, error, idUser };
};

export const useAuthUser = (): {
  user: User | undefined | null;
  isLoading: boolean;
  error: Error | null;
} => {
  const supabase = createClient();

  const { data, isLoading, error } = useQuery({
    queryKey: userKey.auth(),
    queryFn: async () => await supabase.auth.getUser(),
  });

  // Adjust according to your actual API structure
  const user = data?.data?.user;

  return { user, isLoading, error };
};
