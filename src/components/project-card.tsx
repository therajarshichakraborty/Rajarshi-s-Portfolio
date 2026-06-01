/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";

const getSkill = (tag: string) => {
  const normalizedTag = tag.toLowerCase().replace(/[^a-z0-9+]/g, ""); // keep + for C++

  if (normalizedTag === "postgresql" || normalizedTag === "postgres") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "postgres");
  }
  if (normalizedTag === "tailwindcss" || normalizedTag === "tailwind") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "tailwind");
  }
  if (normalizedTag === "expressjs" || normalizedTag === "express") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "express");
  }
  if (normalizedTag === "reactjs" || normalizedTag === "react") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "react");
  }
  if (normalizedTag === "nodejs" || normalizedTag === "node") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "node.js");
  }
  if (normalizedTag === "javascript" || normalizedTag === "js") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "javascript");
  }
  if (normalizedTag === "typescript" || normalizedTag === "ts") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "typescript");
  }
  if (normalizedTag === "openai") {
    return { name: "OpenAI", icon: Icons.openai };
  }
  if (normalizedTag === "golang" || normalizedTag === "go") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "go");
  }
  if (normalizedTag === "scikitlearn" || normalizedTag === "sklearn") {
    return DATA.skills.find((s) => s.name.toLowerCase() === "scikit learn");
  }

  // Fallback case-insensitive match
  return (
    DATA.skills.find(
      (s) => s.name.toLowerCase().replace(/[^a-z0-9+]/g, "") === normalizedTag
    ) || null
  );
};

const BLUR_FADE_DELAY = 0.04;

import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { React } from "@/components/ui/svgs/react";
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
  react: React,
  "react.js": React,
  reactjs: React,
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

function ProjectImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
        No image
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("w-full h-full object-cover", className)}
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  isBuilding?: boolean;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  isBuilding
}: Props) {
  return (
    <div
      className={cn(
        "group flex flex-col h-full border border-neutral-200/80 dark:border-neutral-800/60 rounded-xl overflow-hidden cursor-pointer bg-white/40 dark:bg-neutral-900/20 backdrop-blur-md hover:shadow-2xl hover:shadow-primary/[0.04] dark:hover:shadow-white/[0.02] hover:-translate-y-1.5 hover:scale-[1.01] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500",
        className
      )}
    >
      <div className="relative shrink-0 aspect-video w-full overflow-hidden bg-muted/20 border-b border-border/40">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : image ? (
            <ProjectImage
              src={image}
              alt={title}
              className="transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
              No Preview
            </div>
          )}
        </Link>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              {isBuilding && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] tracking-wider uppercase font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 select-none">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Building
                </span>
              )}
            </div>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs sm:text-[13px] flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag, id) => {
              const skill = getSkill(tag);
              const Icon = skill?.icon;
              return (
                <BlurFade key={tag} delay={BLUR_FADE_DELAY * 10 + id * 0.03}>
                  <div
                    className="
                      group/tag border border-neutral-200/60 dark:border-neutral-800/60
                      bg-neutral-50/50 dark:bg-neutral-900/40
                      hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80
                      rounded-full h-6 w-fit px-2.5 flex items-center gap-1.5
                      transition-all duration-300 ease-out
                      hover:scale-[1.03] hover:-translate-y-0.5
                      hover:shadow-xs hover:shadow-primary/5
                      cursor-pointer
                      active:scale-[0.98]
                    "
                  >
                    {Icon && (
                      <Icon className="size-3 transition-transform duration-300 group-hover/tag:rotate-6" />
                    )}
                    <span className="text-muted-foreground group-hover/tag:text-foreground text-[10px] font-medium transition-colors duration-200">
                      {tag}
                    </span>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-900/60">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-background text-foreground shadow-xs hover:bg-muted transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97]"
              >
                {link.icon}
                <span>{link.type}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
