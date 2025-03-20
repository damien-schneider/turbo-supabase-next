// The client you created from the Server-Side Auth instructions
import { envClient } from "@/env/client";
import type { Session } from "@supabase/supabase-js";
import { createServerClient } from "@workspace/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  console.log("\n\nRequest:\n\n", request);
  console.log("\n\nCode:\n\n", code);
  console.log("\n\nNext:\n\n", next);

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createServerClient();
  const { error, data } = await supabase.auth.exchangeCodeForSession(code);
  console.log("\n\nData exchangeCodeForSession:\n\n", data);

  if (error) {
    console.error(error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const provider = identifyProvider(data.session);
  const providerToken = data.session.provider_token;
  if (provider && providerToken) {
    storeProviderToken({
      idUser: data.user.id,
      provider,
      providerToken,
    });
  }
  const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
  const isLocalEnv = envClient.NODE_ENV === "development";
  if (isLocalEnv) {
    // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
    return NextResponse.redirect(`${origin}${next}`);
  }
  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}

function identifyProvider(session: Session) {
  const userMetadata = session.user.user_metadata;

  switch (userMetadata.iss) {
    case "https://accounts.google.com":
      return "google";
    case "https://api.notion.com":
      return "notion";
    default:
      return null;
  }
}

async function storeProviderToken({
  idUser,
  provider,
  providerToken,
}: { idUser: string; provider: "google" | "notion"; providerToken: string }) {
  const _supabase = await createServerClient();

  const getProviderTokenColumns = (provider: "google" | "notion") => {
    switch (provider) {
      case "google":
        return "google_token";
      case "notion":
        return "notion_token";
      default:
        return null;
    }
  };

  const columnName = getProviderTokenColumns(provider);

  if (!columnName) {
    throw new Error("Invalid provider");
  }

  // const { data, error } = await supabase.from("provider_tokens").upsert({
  //   id_user: idUser,
  //   [columnName]: providerToken,
  // });
  // if (error) {
  //   console.error(error);
  //   return;
  // }
  // console.log("\n\nData storeProviderToken:\n\n", data);
}
