// import { Geist, Geist_Mono } from "next/font/google";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { envClient } from "@/env/client";
import { cn } from "@workspace/ui/lib/utils";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

// const fontSans = Geist({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// const fontMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// });

const fontSatoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  // display: "auto",
  variable: "--font-satoshi",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {envClient.NODE_ENV === "development" && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
        {/* rest of your scripts go under */}
      </head>

      <body
        className={cn(
          "bg-background",
          // fontSans.variable,
          // fontMono.variable,
          fontSatoshi.variable,
          "font-satoshi antialiased",
        )}
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
