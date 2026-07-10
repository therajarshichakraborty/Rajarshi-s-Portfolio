"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Github,
  ExternalLink,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PenLine,
  ShieldCheck,
  Database,
  Layers,
  RefreshCw,
  Moon,
  Tag,
  Terminal,
  FolderPlus,
  KeyRound,
  Zap,
  Bug,
  LayoutDashboard,
  Gauge,
  Copy,
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
  Brain,
  Globe,
  Hammer,
  CheckCircle,
  ArrowUpRight,
  Play,
  Pause
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PROJECTS,
  TECH_COLORS,
  skills,
  type ProjectData
} from "@/data/projects";

// Build a normalized name → icon lookup from the shared skills array
const SKILL_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {};
for (const s of skills) {
  const normalize = (str: string) => str.toLowerCase().replace(/[.\s+]/g, "");
  SKILL_ICON_MAP[normalize(s.name)] = s.icon as React.ComponentType<{
    className?: string;
  }>;
  SKILL_ICON_MAP[s.name.toLowerCase()] = s.icon as React.ComponentType<{
    className?: string;
  }>;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  PenLine,
  ShieldCheck,
  Database,
  Layers,
  RefreshCw,
  Moon,
  Tag,
  Terminal,
  FolderPlus,
  KeyRound,
  Zap,
  Bug,
  LayoutDashboard,
  Gauge,
  Copy,
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
  Brain,
  Globe,
  Hammer,
  CheckCircle,
  Github,
  ExternalLink,
  BookOpen
};

function DynIcon({ name, className }: { name: string; className?: string }) {
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return <Comp className={className} />;
}

function StatusBadge() {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase select-none"
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status !== "Completed" && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            )}
          />
        )}
        <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5")} />
      </span>
      {status}
    </span>
  );
}

function TechBadge({ name, delay }: { name: string; delay: number }) {
  const normalize = (str: string) => str.toLowerCase().replace(/[.\s+]/g, "");
  const Icon =
    SKILL_ICON_MAP[normalize(name)] ??
    SKILL_ICON_MAP[name.toLowerCase()] ??
    null;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08, y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, delay }}
      className={cn(
        "group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[11px] font-medium border cursor-default select-none",
        "bg-transparent border-black/20 text-black",
        "dark:border-white/20 dark:text-white",
        "hover:border-black/50 hover:shadow-[0_0_8px_0px_rgba(0,0,0,0.12)]",
        "dark:hover:border-white/50 dark:hover:shadow-[0_0_8px_0px_rgba(255,255,255,0.10)]",
        "transition-[border-color,box-shadow] duration-200"
      )}
    >
      {Icon && (
        <Icon className="size-3.5 shrink-0 transition-transform duration-300 group-hover:rotate-12" />
      )}
      {name}
    </motion.span>
  );
}

function FeatureItem({
  text,
  icon,
  delay
}: {
  text: string;
  icon: string;
  delay: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay }}
      className="flex items-center gap-2 text-sm text-muted-foreground"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
        <DynIcon name={icon} className="h-3 w-3" />
      </span>
      <span className="leading-tight">{text}</span>
    </motion.li>
  );
}

function StatPill({
  label,
  value,
  icon,
  delay
}: {
  label: string;
  value: string;
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay }}
      className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 px-3 py-2"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
        <DynIcon name={icon} className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
          {label}
        </p>
        <p className="text-xs font-bold text-foreground leading-tight truncate">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function CtaButton({
  href,
  type,
  delay
}: {
  href: string;
  type: string;
  delay: number;
}) {
  const isGithub = type === "GitHub";
  const Icon = isGithub ? Github : ExternalLink;
  if (!href) return null;
  return (
    <motion.a
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300",
        "hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isGithub
          ? "border-border bg-background text-foreground hover:bg-muted hover:shadow-md hover:shadow-black/5"
          : "border-primary/25 bg-transparent text-primary hover:bg-primary/15 hover:shadow-md hover:shadow-primary/10"
      )}
      aria-label={type}
    >
      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      {type}
      <ArrowUpRight className="h-3 w-3 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

const ProjectThumb = memo(function ProjectThumb({
  project,
  isActive,
  onClick
}: {
  project: ProjectData;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`View ${project.title}`}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "group relative w-full min-w-[155px] lg:w-[175px] shrink-0 rounded-2xl border p-3.5 text-left",
        "outline-none transition-all duration-200 ease-out",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-border bg-accent/60 shadow-sm"
          : "border-transparent hover:border-border hover:bg-accent/30"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span
            className={cn(
              "block truncate text-sm font-semibold tracking-tight transition-colors duration-200",
              isActive
                ? "text-foreground"
                : "text-foreground/70 group-hover:text-foreground"
            )}
          >
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-bold">
              {project.title}
            </span>
          </span>
          <p
            className={cn(
              "mt-0.5 line-clamp-1 text-[11px] leading-tight transition-colors duration-200",
              isActive
                ? "text-muted-foreground"
                : "text-muted-foreground/60 group-hover:text-muted-foreground"
            )}
          >
            {project.tagline}
          </p>
        </div>
        <ArrowUpRight
          className={cn(
            "size-3.5 shrink-0 translate-y-0.5 transition-all duration-200 ease-out",
            isActive
              ? "translate-x-0 opacity-60 text-foreground"
              : "-translate-x-1 opacity-0 text-muted-foreground group-hover:translate-x-0 group-hover:opacity-50"
          )}
        />
      </div>
    </button>
  );
});

function DetailsPanel({ project }: { project: ProjectData }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5 w-full"
      >
        <div className="relative w-[550px] lg:w-[550px] overflow-hidden rounded-2xl lg:-ml-25">
          <div style={{ paddingBottom: "65.00%" }} className="relative w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover absolute inset-0"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent" />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                {project.category}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70 leading-snug line-clamp-1">
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── META + DESCRIPTION ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 lg:w-[550px] rounded-2xl lg:-ml-25">
          <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
            <span className="font-medium">{project.duration}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* ── FEATURES + TECH / CTAS — side by side on md+ ───────────────── */}
        <div className="grid grid-cols-1 gap-4 lg:w-[550px] rounded-2xl lg:-ml-25">
          {/* Features */}

          {/* Tech stack + CTAs */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="w-full rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Tech Stack
                </h4>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, i) => (
                    <TechBadge key={t.name} name={t.name} delay={i * 0.03} />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2.5">
              {project.links.map((l, i) => (
                <CtaButton
                  key={l.type}
                  href={l.href}
                  type={l.type}
                  delay={i * 0.07}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_INTERVAL = 6000;

  const goTo = useCallback((index: number) => {
    setActiveIndex(
      ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length
    );
  }, []);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
    setIsPlaying(false);
  }, [activeIndex, goTo]);
  const next = useCallback(() => {
    goTo(activeIndex + 1);
    setIsPlaying(false);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((i) => (i + 1) % PROJECTS.length);
      }, AUTO_INTERVAL);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const active = PROJECTS[activeIndex];

  return (
    <section
      id="projects-carousel"
      className="w-full"
      aria-label="Current Projects"
    >
      <div className="flex flex-col gap-y-4 items-center justify-center mb-10">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-white dark:text-black text-sm font-medium">
                My Projects
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl inline-block text-center">
              Check out my latest work
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              My work spans{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                Full Stack Web Applications
              </span>
              , open-source contributions, and theming systems. Click any card
              to explore with full details and left/right navigation. I&apos;m
              currently working on{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                Generative AI & AI-powered agents
              </span>
              , building intelligent, AI-powered systems.
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      {/* Mobile/tablet: single column (details above, project strip below) */}
      {/* Desktop lg+: 2 columns (project sidebar left, details right) */}
      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-5 lg:gap-8 items-start">
        {/* ── Details panel: shows FIRST on mobile, SECOND column on lg ── */}
        <div className="min-w-0 w-full order-1 lg:order-2">
          <DetailsPanel project={active} />
        </div>

        {/* ── Project selector: shows BELOW on mobile, LEFT sidebar on lg ── */}
        <div className="order-2 lg:order-1 w-full lg:w-auto">
          {/* Horizontal scroll strip on sm/md; vertical list on lg+ */}
          <div
            className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto pb-1 lg:pb-0 lg:max-h-[480px]"
            style={
              {
                scrollbarWidth: "none",
                msOverflowStyle: "none"
              } as React.CSSProperties
            }
          >
            <style>{`.project-list-scroll::-webkit-scrollbar { display: none; }`}</style>
            <div className="project-list-scroll flex flex-row lg:flex-col gap-2">
              {PROJECTS.map((project, i) => (
                <ProjectThumb
                  key={project.id}
                  project={project}
                  isActive={i === activeIndex}
                  index={i}
                  onClick={() => {
                    goTo(i);
                    setIsPlaying(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Feature() {
  return null;
}
