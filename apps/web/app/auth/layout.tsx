import { BackgroundGradient } from "@/ui/gradient";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className=" max-w-2xl mx-auto mt-[20dvh] px-4">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <BackgroundGradient />
      </div>
      {children}
    </section>
  );
}
