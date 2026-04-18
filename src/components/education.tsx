// "use client";
// import { DATA } from "@/data/resume";
// import BlurFade from "@/components/magicui/blur-fade";
// import BlurFadeText from "@/components/magicui/blur-fade-text";
// import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ArrowUpRight } from "lucide-react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// const BLUR_FADE_DELAY = 0.04;

// function Education() {
//   return (
//     <Accordion type="single" collapsible className="w-full grid gap-6">
//         <AccordionItem
//           key={work.company}
//           value={work.company}
//           className="w-full border-b-0 grid gap-2"
//         >
//     <div className="flex flex-col gap-8">
//       {DATA.education.map((education, index) => (
//         <BlurFade
//           key={education.school}
//           delay={BLUR_FADE_DELAY * 8 + index * 0.05}
//         >
//           <Link
//             href={education.href}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-x-3 justify-between group"
//           >
//             <div className="flex items-center gap-x-3 flex-1 min-w-0">
//               {education.logoUrl ? (
//                 <img
//                   src={education.logoUrl}
//                   alt={education.school}
//                   className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
//                 />
//               ) : (
//                 <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
//               )}
//               <div className="flex-1 min-w-0 flex flex-col gap-0.5">
//                 <div className="font-semibold leading-none flex items-center gap-2">
//                   {education.school}
//                   <ArrowUpRight
//                     className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
//                     aria-hidden
//                   />
//                 </div>
//                 <div className="font-sans text-sm text-muted-foreground">
//                   {education.degree}
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
//               <span>
//                 {education.start} - {education.end}
//               </span>
//             </div>
//           </Link>
//         </BlurFade>
//       ))}
//       <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
//             {DATA.education.description}
//           </AccordionContent>
//     </div>
//     </AccordionItem>
//     </Accordion>
//   );
// }

// export default Education;



/* eslint-disable @next/next/no-img-element */
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
function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      height={20}
      width={20}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
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
          className="w-full border-b-0 grid gap-2"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex items-center gap-x-3 justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <Link href={education.href} target="_blank"><LogoImage src={education.logoUrl} alt={education.school} /></Link>
                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-none flex items-center gap-2">
                    {education.school}
                    <span className="relative inline-flex items-center w-3.5 h-3.5">
                      <ChevronRight
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                          "translate-x-0 opacity-0",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                          "opacity-0 rotate-0",
                          "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />
                    </span>
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {education.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                <span>
                  {education.start} - {education.end ?? "Present"}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
            {education.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}


export default Education;