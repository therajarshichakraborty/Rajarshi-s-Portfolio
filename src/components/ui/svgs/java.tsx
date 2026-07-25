/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";

const Java = ({ className }: { className?: string }) => (
  <img
    src="/svgs/java.svg"
    alt="Java"
    className={cn("inline-block shrink-0 size-4 object-contain", className)}
  />
);

export { Java };
