/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

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

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
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
        "flex flex-col h-full border border-border rounded-xl overflow-hidden cursor-pointer hover:ring-muted transition-all duration-200",
        className
      )}
    >
      <div className="relative shrink-0">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="w-full h-48 bg-muted" />
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{title}</h3>
              {isBuilding && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] tracking-wider uppercase font-semibold rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)] select-none">
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
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => {
              const Icon = tagIconMap[tag.toLowerCase()];
              return (
                <Badge
                  key={tag}
                  className="text-[11px] font-medium h-6 w-fit px-2 flex items-center gap-1 transition-all duration-300 ease-out hover:scale-[1.05] hover:-translate-y-0.5 cursor-pointer active:scale-[0.96]"
                  variant="outline"
                >
                  {Icon && (
                    <div className="flex items-center justify-center shrink-0 scale-75 origin-center w-4 h-4">
                      <Icon />
                    </div>
                  )}
                  <span>{tag}</span>
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
