/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";

const Typescript = ({ className }: { className?: string }) => (
  <img
    src="/svgs/ts.svg"
    alt="TypeScript"
    className={cn("inline-block shrink-0 size-4 object-contain", className)}
  />
);

export { Typescript };
