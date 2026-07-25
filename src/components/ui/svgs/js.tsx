/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";

const JavaScript = ({ className }: { className?: string }) => (
  <img
    src="/svgs/javascript.svg"
    alt="JavaScript"
    className={cn("inline-block shrink-0 size-4 object-contain", className)}
  />
);

export { JavaScript };
