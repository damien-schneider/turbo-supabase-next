import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className=" max-w-2xl mx-auto mt-[20dvh] px-4">{children}</section>
  );
}
