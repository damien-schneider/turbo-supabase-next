"use server";
import { envClient } from "@/env/client";
import { createClient } from "@workspace/supabase/server";
import type { Provider } from "@workspace/supabase/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const signInWithPassword = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    return error.message;
  }

  return redirect("/");
};

const signInWithOAuth = async (provider: Provider) => {
  const baseUrl = envClient.NEXT_PUBLIC_BASE_URL;
  const redirectTo = `${baseUrl}/auth/callback`;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      scopes:
        provider === "google"
          ? "https://www.googleapis.com/auth/drive.file"
          : undefined,
      redirectTo,
      queryParams:
        provider === "google"
          ? {
              access_type: "offline",
              prompt: "consent",
            }
          : undefined,
    },
  });

  if (error) {
    console.error(error);
    redirect("/auth/signup");
  }

  if (data?.url) {
    return redirect(data.url);
  }

  return redirect("/");
};

const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  return redirect("/auth/signin");
};

const signUpWithPassword = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  return redirect("/");
};

export { signInWithPassword, signInWithOAuth, signUpWithPassword, signOut };
