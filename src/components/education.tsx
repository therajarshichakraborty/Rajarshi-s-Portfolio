"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function LogoImage({ src, alt }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none " />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      height={24}
      width={24}
      className="size-10 p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none "
      onError={() => setImageError(true)}
    />
  );
}

export function Education() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.education.map((education) => (
        <AccordionItem
          key={education.school}
          value={education.school}
          className="w-full border-b-0 grid gap-2 "
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex items-center gap-x-4 justify-between w-full text-left">
              <div className="flex items-center gap-x-4 flex-1 min-w-0">
                <Link href={education.href} target="_blank">
                  <LogoImage
                    src={education.logoUrl}
                    alt={education.school}
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="font-semibold text-lg md:text-xl leading-none flex items-center gap-2">
                    {education.school}

                    <span className="relative inline-flex items-center w-4 h-4">
                      <ChevronRight
                        className={cn(
                          "absolute h-4 w-4 text-muted-foreground transition-all duration-300",
                          "opacity-0 group-hover:opacity-100 group-hover:translate-x-1",
                          "group-data-[state=open]:opacity-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-4 w-4 text-muted-foreground transition-all duration-200",
                          "opacity-0 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />
                    </span>
                  </div>

                  <div className="text-base md:text-lg text-muted-foreground">
                    {education.title}
                  </div>
                </div>
              </div>

              <div className="text-sm md:text-base text-muted-foreground text-right">
                {education.start} - {education.end ?? "Present"}
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="ml-14 mt-2 text-sm md:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
            {education.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Education;