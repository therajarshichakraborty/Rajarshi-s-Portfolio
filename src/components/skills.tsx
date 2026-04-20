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

        <div className="flex flex-wrap gap-3">
          {DATA.skills.map((skill, id) => (
            <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <div
                className="
              border bg-transparent
              rounded-xl h-9 w-fit px-4 flex items-center gap-2
              transition-all duration-300 ease-out
              hover:scale-[1.06] hover:-translate-y-1
              hover:shadow-lg hover:shadow-primary/20
              dark:hover:shadow-white/10
              hover:ring-primary/40 dark:hover:ring-white/20
              cursor-pointer
              active:scale-[0.96]
            "
              >
                {skill.icon && (
                  <skill.icon className="size-4 transition-transform duration-300 group-hover:rotate-6" />
                )}

                <span className="text-foreground text-sm font-medium">
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
