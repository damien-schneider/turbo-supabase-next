"use client";
import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <section className="max-w-2xl mx-auto mt-[20dvh] px-4">
      <div className="prose dark:prose-invert">{children}</div>
    </section>
  );
}
