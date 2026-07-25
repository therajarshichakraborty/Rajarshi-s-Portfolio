"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Java = ({ className }: { className?: string }) => (
  <div className={cn("inline-flex items-center justify-center shrink-0 size-4", className)}>
    <Image src="/svgs/java.svg" alt="Java" width={20} height={20} className="w-full h-full object-contain" />
  </div>
);

export { Java };
