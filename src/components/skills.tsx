"use client";
import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

function Skills() {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>

        <div className="flex flex-wrap gap-2.5">
          {DATA.skills.map((skill, id) => (
            <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.03}>
              <div
                className="
                  group border-none bg-neutral-200/50 dark:bg-neutral-800/60
                  hover:bg-neutral-300/80 dark:hover:bg-neutral-700/80
                  rounded-xl h-10 w-fit px-4 flex items-center gap-2.5
                  transition-all duration-300 ease-out
                  hover:scale-[1.07] hover:-translate-y-1
                  hover:shadow-md hover:shadow-primary/10
                  cursor-pointer select-none
                  active:scale-[0.96]
                "
              >
                {skill.icon && (
                  <skill.icon className="size-5 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                )}

                <span className="text-foreground text-sm font-semibold">
                  {skill.name}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
