"use client";

import React from "react";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import { PROJECTS } from "@/data/projects";
import { ProjectArchitectureDiagram } from "@/components/project-architecture-diagram";

// ── Icons mapping ───────────────────────────────────────────────────────────
import {
  Github,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  Layers,
  Database,
  Terminal,
  Code,
  Zap,
  Globe,
  CheckCircle,
  Hammer,
  Bug,
  LayoutDashboard,
  Brain,
  Link,
  Lock,
  CreditCard,
  Mail,
  Calendar,
  Bot,
  CheckSquare,
  GitPullRequest,
  Workflow,
  Bell,
  FolderPlus,
  KeyRound,
  Gauge,
  Copy,
  FileCode,
  Code2,
  Accessibility,
  Palette,
  Wifi,
  Users,
  Monitor,
  Sliders,
  Package,
  Puzzle,
  Rocket
} from "lucide-react";

// SVG Tech icons
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

const LUCIDE_ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code,
  Zap,
  GitPullRequest,
  Database,
  Lock,
  CreditCard,
  Brain,
  LayoutDashboard,
  Sparkles,
  Layers,
  Rocket,
  Mail,
  Calendar,
  Bot,
  CheckSquare,
  Workflow,
  Bell,
  Terminal,
  FolderPlus,
  KeyRound,
  Bug,
  Gauge,
  Copy,
  BookOpen,
  FileCode,
  Code2,
  Accessibility,
  Palette,
  Wifi,
  Users,
  Monitor,
  Link,
  Sliders,
  Package,
  Puzzle,
  Globe,
  Hammer,
  CheckCircle
};

function getTagIcon(tag: string) {
  const key = tag.toLowerCase();
  return tagIconMap[key] ?? tagIconMap[key.replace(/[.\s]/g, "")] ?? undefined;
}

function DynIcon({ name, className }: { name: string; className?: string }) {
  const Comp = LUCIDE_ICON_MAP[name];
  if (!Comp) return <Code className={className} />;
  return <Comp className={className} />;
}

const BLUR_FADE_DELAY = 0.05;

export default function ProjectsPage() {
  return (
    <section
      id="projects-page"
      className="w-full py-10 md:py-16 relative overflow-hidden"
    >
      <div className="flex flex-col gap-y-12 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col gap-y-4 items-center text-center">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-border/60 bg-muted/40 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              <Layers className="size-3.5" />
              System Architecture & Performance Metrics
            </span>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
              My Engineering Portfolio
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-muted-foreground md:text-lg max-w-2xl leading-relaxed text-balance">
              Explore the system designs, backend pipelines, and performance
              benchmarks behind my latest software engineering projects.
            </p>
          </BlurFade>
        </div>

        {/* Projects Feed */}
        <div className="flex flex-col gap-y-20 mt-8">
          {PROJECTS.map((project, index) => {
            return (
              <BlurFade key={project.id} delay={BLUR_FADE_DELAY * (4 + index)}>
                <div className="group relative flex flex-col gap-y-8 py-2 transition-all duration-300">
                  {/* 1. Header Info: Title, Duration, Category */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        {project.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="text-sm font-medium text-muted-foreground mt-1.5">
                        {project.tagline}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                      <span className="text-xs font-mono text-muted-foreground bg-muted/40 border border-border/40 px-2 py-0.5 rounded-md">
                        {project.duration}
                      </span>

                      {/* CTA Links */}
                      <div className="flex items-center gap-2 mt-2">
                        {project.links.map((link) => {
                          const isGithub = link.type === "GitHub";
                          return (
                            <a
                              key={link.type}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                                isGithub
                                  ? "bg-foreground text-background border-transparent hover:bg-foreground/90 hover:shadow-xs"
                                  : "bg-background text-foreground border-border hover:bg-muted"
                              }`}
                            >
                              {isGithub ? (
                                <Github className="size-3.5" />
                              ) : (
                                <ExternalLink className="size-3.5" />
                              )}
                              {link.type}
                              <ArrowUpRight className="size-3 opacity-50" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <hr className="border-border/30" />

                  {/* Project Image Banner */}
                  <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl border border-border/40 bg-muted/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority={index === 0}
                    />
                  </div>

                  <hr className="border-border/30" />

                  {/* 2. Main Grid: Overview & Features (Left) | Tech & Stats (Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
                    {/* Left side: Overview & Key Features */}
                    <div className="flex flex-col gap-y-5">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                          Project Overview
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                          Key Capabilities
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {project.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs text-muted-foreground"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary border border-primary/10">
                                <DynIcon
                                  name={feature.icon}
                                  className="size-3"
                                />
                              </span>
                              <span className="leading-normal mt-0.5">
                                {feature.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-6">
                    
                      {/* <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                          Quick Metrics
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {project.stats.map((stat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/10 p-3 hover:border-border transition-colors duration-200"
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground border border-border">
                                <DynIcon
                                  name={stat.icon}
                                  className="size-3.5"
                                />
                              </span>
                              <div className="min-w-0">
                                <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                                  {stat.label}
                                </p>
                                <p className="text-xs font-bold text-foreground truncate mt-0.5">
                                  {stat.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div> */}

                      {/* Tech badges */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                          Technologies Deployed
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => {
                            const Icon = getTagIcon(tech.name);
                            return (
                              <span
                                key={tech.name}
                                className="group/tech inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border/40 bg-muted/20 text-foreground cursor-pointer select-none transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-xs hover:shadow-primary/5 active:scale-[0.98]"
                              >
                                {Icon && (
                                  <Icon className="size-3.5 shrink-0 transition-transform duration-300 group-hover/tech:scale-110 group-hover/tech:rotate-6" />
                                )}
                                <span className="transition-colors duration-300 group-hover/tech:text-primary">
                                  {tech.name}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-border/30" />

                  {/* 3. System Architecture & Performance Grid */}
                  <div className="flex flex-col gap-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        System Architecture & Technical Specifications
                      </h4>
                      <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed bg-muted/30 border border-border/30 rounded-lg p-2.5">
                        {project.architecture}
                      </p>
                    </div>

                    {/* Custom system flow diagram */}
                    <div className="w-full mt-2">
                      <ProjectArchitectureDiagram projectId={project.id} />
                    </div>
                  </div>

                  {/* 4. Engineering Challenges section */}
                  {project.challenges && project.challenges.length > 0 && (
                    <>
                      <hr className="border-border/30" />
                      <div className="flex flex-col gap-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Key Technical Challenges & Solutions
                        </h4>
                        <div className="flex flex-col gap-y-3">
                          {project.challenges.map((challenge, idx) => (
                            <div
                              key={idx}
                              className="flex gap-3 text-xs leading-relaxed text-muted-foreground bg-muted/10 border border-border/20 rounded-xl p-3.5 hover:border-border transition-colors duration-200"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono font-bold text-[10px]">
                                {idx + 1}
                              </span>
                              <p className="mt-0.5">{challenge}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
