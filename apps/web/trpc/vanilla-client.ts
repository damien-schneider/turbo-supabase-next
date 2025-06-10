import type { AppRouter } from "@/trpc/routers/_app";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") {
      return "";
    }
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (process.env.VERCEL_URL) {
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      return `https://${process.env.VERCEL_URL}`;
    }
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}

// Create a vanilla tRPC client that doesn't use React Query
export const vanillaTrpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});
