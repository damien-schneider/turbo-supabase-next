"use client";

import { BackgroundGradient } from "@/ui/gradient";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="flex min-h-svh flex-col items-center relative justify-center gap-6 p-6 md:p-10 overflow-hidden">
        <div className="absolute -z-1 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <BackgroundGradient />
        </div>
        <div className="w-full max-w-sm z-2 pb-12">
          <h1 className="text-center text-3xl font-bold">
            Turborepo, NextJS, Supabase, Tailwind Boiler plate
          </h1>
          <p className="text-center text-lg">Made by Damien Schneider</p>
        </div>
        <Button asChild={true}>
          <Link href="/account">Go to Account Page</Link>
        </Button>
      </div>
    </div>
  );
}
