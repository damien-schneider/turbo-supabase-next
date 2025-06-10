"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { TRPCProvider } from "@/trpc/client";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
      enableColorScheme={true}
    >
      <TRPCProvider>{children}</TRPCProvider>
    </NextThemesProvider>
  );
}
