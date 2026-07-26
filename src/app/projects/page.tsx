"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import { PROJECTS, ProjectData } from "@/data/projects";
import { ProjectArchitectureDiagram } from "@/components/project-architecture-diagram";
import { motion, AnimatePresence } from "motion/react";
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
  Rocket,
  Search,
  X,
  ChevronRight,
  Activity,
  ShieldCheck,
  Cpu,
  Server,
  Filter
} from "lucide-react";

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
import { Redis } from "@/components/ui/svgs/redis";
import { NestJs } from "@/components/ui/svgs/nestjs";
import { TRPC } from "@/components/ui/svgs/trpc";
import { Drizzle } from "@/components/ui/svgs/drizzle";
import { LangChain } from "@/components/ui/svgs/langchain";

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
  redis: Redis,
  nestjs: NestJs,
  "nest.js": NestJs,
  nest: NestJs,
  drizzle: Drizzle,
  trpc: TRPC,
  langchain: LangChain,
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
  "tailwind css": Tailwind,
  git: Git,
  prisma: Prisma,
  prismaorm: Prisma,
  "prisma orm": Prisma,
  javascript: JavaScript,
  js: JavaScript,
  "next.js": NextJs,
  nextjs: NextJs,
  "c#": Csharp,
  csharp: Csharp,
  turborepo: Layers,
  monorepo: Layers,
  bullmq: Layers,
  websockets: Zap,
  "monaco editor": Code,
  monacoeditor: Code,
  nextauth: Lock,
  betterauth: Lock,
  "better auth": Lock,
  pinecone: Database,
  inngest: Zap,
  openrouter: Brain,
  "shadcn/ui": Layers,
  shadcnui: Layers
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
  const keyClean = key.replace(/[^a-z0-9]/g, "");
  return (
    tagIconMap[key] ?? tagIconMap[keyClean] ?? LUCIDE_ICON_MAP[tag] ?? undefined
  );
}

function DynIcon({ name, className }: { name: string; className?: string }) {
  const Comp = LUCIDE_ICON_MAP[name];
  if (!Comp) return <Code className={className} />;
  return <Comp className={className} />;
}

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabs, setActiveTabs] = useState<
    Record<string, "overview" | "capabilities" | "architecture" | "challenges">
  >({});

  const getActiveTab = (projectId: string) =>
    activeTabs[projectId] ?? "overview";
  const setProjectTab = (
    projectId: string,
    tab: "overview" | "capabilities" | "architecture" | "challenges"
  ) => {
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return PROJECTS;
    const q = searchQuery.toLowerCase();
    return PROJECTS.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(q);
      const taglineMatch = project.tagline.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const techMatch = project.technologies.some((t) =>
        t.name.toLowerCase().includes(q)
      );
      return titleMatch || taglineMatch || descMatch || techMatch;
    });
  }, [searchQuery]);

  return (
    <section id="projects-page" className="w-full py-6 md:py-10 relative">
      <div className="flex flex-col gap-y-10 max-w-5xl mx-auto px-4">
        {/* ── 1. Hero Header ── */}
        <div className="flex flex-col gap-y-3 items-center text-center">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Engineering Portfolio
            </h1>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <p className="text-muted-foreground md:text-lg max-w-2xl leading-relaxed text-balance">
              Deep dive into system architectures, real-time backend pipelines,
              AI workflows, and performance metrics across my software
              engineering projects.
            </p>
          </BlurFade>
        </div>

        {/* ── 2. Search & Quick Jump Bar (Visible on All Screens) ── */}
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between p-3.5 sm:p-4 rounded-2xl border border-border/50 bg-muted/15 backdrop-blur-md shadow-xs">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search technology, feature, title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9.5 pl-9.5 pr-8 text-xs rounded-xl border border-border/60 bg-background/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Quick jump project menu */}
            <div className="flex items-center gap-2 text-xs overflow-x-auto custom-scrollbar w-full md:w-auto">
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground/70 shrink-0">
                Quick Jump:
              </span>
              {filteredProjects.map((p) => (
                <a
                  key={p.id}
                  href={`#project-${p.id}`}
                  className="px-3 py-1 rounded-lg border border-border/40 bg-background/50 text-muted-foreground hover:text-foreground hover:border-border hover:scale-105 transition-all duration-200 shrink-0 text-xs font-medium shadow-2xs"
                >
                  {p.title}
                </a>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* ── 3. Empty Search State ── */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/60 rounded-3xl bg-card/20">
            <Search className="size-10 text-muted-foreground/40 mb-3" />
            <h3 className="text-lg font-bold text-foreground">
              No matching projects found
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              No software projects matched &quot;{searchQuery}&quot;. Try
              searching for a different framework or technology.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* ── 4. Masterpiece Project List ── */}
        <div className="flex flex-col gap-y-16">
          {filteredProjects.map((project, index) => {
            const currentTab = getActiveTab(project.id);
            const hasChallenges =
              project.challenges && project.challenges.length > 0;

            return (
              <BlurFade key={project.id} delay={BLUR_FADE_DELAY * (2 + index)}>
                <article
                  id={`project-${project.id}`}
                  className="group relative flex flex-col gap-y-6 py-2"
                >
                  <div className="flex flex-col gap-y-6">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/40 border border-border/40 px-3 py-1 rounded-full">
                            <Calendar className="size-3" />
                            {project.duration}
                          </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h2>

                        <p className="text-sm font-medium text-muted-foreground mt-1.5 max-w-2xl">
                          {project.tagline}
                        </p>
                      </div>

                      {/* CTA Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {project.links.map((link) => {
                          const isGithub = link.type === "GitHub";
                          return (
                            <a
                              key={link.type}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 ${
                                isGithub
                                  ? "bg-foreground text-background hover:bg-foreground/90 shadow-xs"
                                  : "bg-background text-foreground border border-border/70 hover:bg-accent shadow-2xs"
                              }`}
                            >
                              {isGithub ? (
                                <Github className="size-3.5" />
                              ) : (
                                <ExternalLink className="size-3.5" />
                              )}
                              {link.type}
                              <ArrowUpRight className="size-3 opacity-60" />
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation Tabs Bar - Plain Text */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/30 border border-border/40 overflow-x-auto custom-scrollbar">
                      <button
                        onClick={() => setProjectTab(project.id, "overview")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          currentTab === "overview"
                            ? "bg-background text-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Overview &amp; Tech
                      </button>

                      <button
                        onClick={() =>
                          setProjectTab(project.id, "capabilities")
                        }
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          currentTab === "capabilities"
                            ? "bg-background text-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Key Capabilities
                      </button>

                      <button
                        onClick={() =>
                          setProjectTab(project.id, "architecture")
                        }
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          currentTab === "architecture"
                            ? "bg-background text-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        System Architecture
                      </button>

                      {hasChallenges && (
                        <button
                          onClick={() =>
                            setProjectTab(project.id, "challenges")
                          }
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                            currentTab === "challenges"
                              ? "bg-background text-foreground shadow-xs"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Technical Challenges
                        </button>
                      )}
                    </div>

                    {/* Tab Content Display */}
                    <div className="pt-2">
                      {/* TAB 1: OVERVIEW & TECH */}
                      {currentTab === "overview" && (
                        <div className="flex flex-col gap-y-6">
                          {/* Banner Image */}
                          <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl border border-border/50 bg-muted/10 group/img">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover/img:scale-[1.02]"
                              sizes="(max-width: 1024px) 100vw, 1024px"
                              priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <span className="text-white text-xs font-mono font-medium">
                                {project.title} — Production Banner
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                              Project Brief &amp; Architecture Description
                            </h4>
                            <p className="text-sm text-foreground/90 leading-relaxed max-w-4xl whitespace-pre-line">
                              {project.description}
                            </p>
                          </div>

                          {/* Tech Stack Chips */}
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                              Technologies Deployed (
                              {project.technologies.length})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => {
                                const Icon = getTagIcon(tech.name);
                                return (
                                  <span
                                    key={tech.name}
                                    className="group/tech inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border border-border/50 bg-background/60 text-foreground cursor-default select-none transition-all duration-300 ease-out hover:scale-108 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xs"
                                  >
                                    {Icon && (
                                      <Icon className="size-4 shrink-0 transition-transform duration-300 group-hover/tech:scale-110 group-hover/tech:rotate-12" />
                                    )}
                                    <span>{tech.name}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 2: CAPABILITIES */}
                      {currentTab === "capabilities" && (
                        <div className="flex flex-col gap-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Key Core Capabilities &amp; Engine Features
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {project.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="group/capability flex items-start gap-3 text-xs text-foreground/90 bg-card/60 border border-border/40 rounded-2xl p-4 hover:border-border hover:bg-card hover:-translate-y-0.5 transition-all duration-300 ease-out"
                              >
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-muted/60 text-foreground border border-border/40 group-hover/capability:border-primary/50 group-hover/capability:scale-110 transition-all duration-300">
                                  <DynIcon
                                    name={feature.icon}
                                    className="size-3.5 transition-transform duration-300 group-hover/capability:rotate-12"
                                  />
                                </span>
                                <span className="leading-relaxed font-medium">
                                  {feature.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* TAB 3: ARCHITECTURE */}
                      {currentTab === "architecture" && (
                        <div className="flex flex-col gap-y-5">
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                              System Specifications
                            </h4>
                            <p className="text-xs font-mono text-foreground/80 leading-relaxed bg-muted/30 border border-border/40 rounded-xl p-4">
                              {project.architecture}
                            </p>
                          </div>

                          {/* Architecture step-by-step diagram */}
                          <div className="w-full">
                            <ProjectArchitectureDiagram
                              projectId={project.id}
                            />
                          </div>
                        </div>
                      )}

                      {/* TAB 4: CHALLENGES */}
                      {currentTab === "challenges" && hasChallenges && (
                        <div className="flex flex-col gap-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Engineering Challenges &amp; Technical Solutions
                          </h4>
                          <div className="flex flex-col gap-3">
                            {project.challenges.map((challenge, idx) => (
                              <div
                                key={idx}
                                className="group/challenge flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-border/40 bg-card/40 hover:border-border hover:bg-card transition-all duration-300"
                              >
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-foreground text-background">
                                    CHALLENGE {String(idx + 1).padStart(2, "0")}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed group-hover/challenge:text-foreground transition-colors duration-200">
                                  {challenge}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {index < filteredProjects.length - 1 && (
                    <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                  )}
                </article>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
