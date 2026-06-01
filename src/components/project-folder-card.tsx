/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { AnimatedFolder } from "@/components/3d-folder";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { React as ReactIcon } from "@/components/ui/svgs/react";
import { Postgres } from "@/components/ui/svgs/postgresql";
import { CPP } from "@/components/ui/svgs/c++";
import { Express } from "@/components/ui/svgs/express";
import { MongoDB } from "@/components/ui/svgs/mongodb";
import { NumPy } from "@/components/ui/svgs/numpy";
import { Pandas } from "@/components/ui/svgs/pandas";
import { SkLearn } from "@/components/ui/svgs/sk-learn";
import { Pytorch } from "@/components/ui/svgs/pytorch";
import { Tailwind } from "@/components/ui/svgs/tailwind";
import { Git } from "@/components/ui/svgs/git";
import { Prisma } from "@/components/ui/svgs/prisma";
import { JavaScript } from "@/components/ui/svgs/js";
import { NextJs } from "@/components/ui/svgs/nextjs";
import { Csharp } from "@/components/ui/svgs/csharp";

const tagIconMap: Record<string, React.ComponentType<any>> = {
  typescript: Typescript,
  "node.js": Nodejs,
  nodejs: Nodejs,
  python: Python,
  go: Golang,
  golang: Golang,
  docker: Docker,
  kubernetes: Kubernetes,
  java: Java,
  react: ReactIcon,
  "react.js": ReactIcon,
  reactjs: ReactIcon,
  postgres: Postgres,
  postgresql: Postgres,
  "c++": CPP,
  cpp: CPP,
  express: Express,
  "express.js": Express,
  expressjs: Express,
  mongodb: MongoDB,
  mongo: MongoDB,
  numpy: NumPy,
  pandas: Pandas,
  "scikit learn": SkLearn,
  "sk-learn": SkLearn,
  pytorch: Pytorch,
  tailwind: Tailwind,
  tailwindcss: Tailwind,
  git: Git,
  prisma: Prisma,
  javascript: JavaScript,
  js: JavaScript,
  "next.js": NextJs,
  nextjs: NextJs,
  "c#": Csharp,
  csharp: Csharp
};

const getSkill = (tag: string) => {
  const normalizedTag = tag.toLowerCase().replace(/[^a-z0-9+]/g, "");
  if (normalizedTag === "postgresql" || normalizedTag === "postgres")
    return DATA.skills.find((s) => s.name.toLowerCase() === "postgres");
  if (normalizedTag === "tailwindcss" || normalizedTag === "tailwind")
    return DATA.skills.find((s) => s.name.toLowerCase() === "tailwind");
  if (normalizedTag === "expressjs" || normalizedTag === "express")
    return DATA.skills.find((s) => s.name.toLowerCase() === "express");
  if (normalizedTag === "reactjs" || normalizedTag === "react")
    return DATA.skills.find((s) => s.name.toLowerCase() === "react");
  if (normalizedTag === "nodejs" || normalizedTag === "node")
    return DATA.skills.find((s) => s.name.toLowerCase() === "node.js");
  if (normalizedTag === "javascript" || normalizedTag === "js")
    return DATA.skills.find((s) => s.name.toLowerCase() === "javascript");
  if (normalizedTag === "typescript" || normalizedTag === "ts")
    return DATA.skills.find((s) => s.name.toLowerCase() === "typescript");
  if (normalizedTag === "openai") return { name: "OpenAI", icon: Icons.openai };
  if (normalizedTag === "golang" || normalizedTag === "go")
    return DATA.skills.find((s) => s.name.toLowerCase() === "go");
  if (normalizedTag === "scikitlearn" || normalizedTag === "sklearn")
    return DATA.skills.find((s) => s.name.toLowerCase() === "scikit learn");
  return (
    DATA.skills.find(
      (s) => s.name.toLowerCase().replace(/[^a-z0-9+]/g, "") === normalizedTag
    ) || null
  );
};

const BLUR_FADE_DELAY = 0.04;

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  extraImages?: string[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  isBuilding?: boolean;
  index?: number;
}

export function ProjectFolderCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  extraImages = [],
  links,
  className,
  isBuilding,
  index = 0
}: Props) {
  const fallback = image || "/placeholder.svg";

  // Build 3 images for the folder fan-out animation
  const folderProjects = [
    { id: "1", image: fallback, title },
    { id: "2", image: extraImages[0] ?? fallback, title: `${title} preview` },
    { id: "3", image: extraImages[1] ?? fallback, title: `${title} detail` }
  ];

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 12 + index * 0.06} className="h-full">
      {/*
        The outer wrapper is a subtle glass panel.
        The AnimatedFolder sits on top with its own `bg-card` look — we let it
        keep that so it doesn't fight our backdrop-blur layer. The description
        panel below is clearly separated by a top border.
      */}
      <div
        className={cn(
          "group flex flex-col h-full rounded-2xl overflow-hidden relative",
          "border border-neutral-200/80 dark:border-neutral-800/60",
          "hover:border-neutral-300 dark:hover:border-neutral-700",
          "hover:shadow-2xl hover:shadow-primary/[0.04] dark:hover:shadow-white/[0.02]",
          "hover:-translate-y-1.5 hover:scale-[1.01]",
          "transition-all duration-500 ease-out",
          className
        )}
      >
        {isBuilding && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] tracking-wider uppercase font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 select-none z-50">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Building
          </span>
        )}

        {/* ── AnimatedFolder (provides the 3-D folder + lightbox) ──────── */}
        <AnimatedFolder
          title={title}
          projects={folderProjects}
          className="!rounded-b-none !border-b-0 !shadow-none hover:!shadow-none !rounded-t-2xl"
        />

        {/* ── Info panel ───────────────────────────────────────────────── */}
        <div className="px-5 pb-5 pt-4 flex flex-col gap-3 flex-1 bg-card dark:bg-card">
          {/* Title + link */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-base tracking-tight text-foreground hover:text-primary group-hover:text-primary transition-colors duration-300 hover:underline underline-offset-4"
                >
                  {title}
                </Link>
              ) : (
                <span className="font-semibold text-base tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {title}
                </span>
              )}
              <time className="text-[11px] text-muted-foreground">{dates}</time>
            </div>
            {href && (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-0.5"
                aria-label={`Open ${title}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Description */}
          <p className="text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>

          {/* Skill badge pills */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, id) => {
                const skill = getSkill(tag);
                const IconFromSkill = skill?.icon;
                const IconFromMap =
                  tagIconMap[tag.toLowerCase()] ||
                  tagIconMap[tag.toLowerCase().replace(/[.\s]/g, "")] ||
                  null;
                const FinalIcon = IconFromSkill || IconFromMap;
                return (
                  <BlurFade key={tag} delay={BLUR_FADE_DELAY * 10 + id * 0.025}>
                    <div
                      className="
                        group/tag border border-neutral-200/60 dark:border-neutral-800/60
                        bg-neutral-50/60 dark:bg-neutral-900/50
                        hover:bg-neutral-100/90 dark:hover:bg-neutral-800/80
                        rounded-full h-[22px] w-fit px-2.5 flex items-center gap-1.5
                        transition-all duration-300 ease-out
                        hover:scale-[1.04] hover:-translate-y-0.5
                        cursor-pointer active:scale-[0.97] select-none
                      "
                    >
                      {FinalIcon && (
                        <FinalIcon className="size-3 shrink-0 transition-transform duration-300 group-hover/tag:rotate-6" />
                      )}
                      <span className="text-muted-foreground group-hover/tag:text-foreground text-[10px] font-medium transition-colors duration-200 whitespace-nowrap">
                        {tag}
                      </span>
                    </div>
                  </BlurFade>
                );
              })}
            </div>
          )}

          {/* Action link buttons */}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-1">
              {links.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-border bg-background text-foreground shadow-xs hover:bg-muted transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  {link.icon}
                  <span>{link.type}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </BlurFade>
  );
}
