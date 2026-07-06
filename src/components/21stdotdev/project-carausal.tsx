"use client";

// ─────────────────────────────────────────────────────────────────────────────
// components/21stdotdev/project-carausal.tsx
// Premium animated project carousel — replaces ProjectsSection in page.tsx.
// The legacy Feature export is preserved at the bottom for backwards compat.
// ─────────────────────────────────────────────────────────────────────────────

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
  Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS, TECH_COLORS, type ProjectData } from "@/data/projects";

// ─────────────────────────────────────────────────────────────────────────────
// Icon resolver
// ─────────────────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, PenLine, ShieldCheck, Database, Layers, RefreshCw, Moon, Tag,
  Terminal, FolderPlus, KeyRound, Zap, Bug, LayoutDashboard, Gauge, Copy,
  FileCode, Code2, Accessibility, Palette, Wifi, Users, Monitor, Link,
  Sliders, Package, Puzzle, Brain, Globe, Hammer, CheckCircle,
  Github, ExternalLink, BookOpen,
};

function DynIcon({ name, className }: { name: string; className?: string }) {
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return <Comp className={className} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Status badge
// ─────────────────────────────────────────────────────────────────────────────
function StatusBadge() {
  // const cfg = {
  //   "In Progress": {
  //     dot: "bg-amber-400", ping: "bg-amber-400",
  //     text: "text-amber-500 dark:text-amber-400",
  //     bg: "bg-amber-500/10 border-amber-500/25",
  //   },
  //   Completed: {
  //     dot: "bg-slate-400", ping: "bg-slate-400",
  //     text: "text-slate-500 dark:text-slate-400",
  //     bg: "bg-slate-500/10 border-slate-500/25",
  //   },
  //   Production: {
  //     dot: "bg-emerald-400", ping: "bg-emerald-400",
  //     text: "text-emerald-600 dark:text-emerald-400",
  //     bg: "bg-emerald-500/10 border-emerald-500/25",
  //   },
  // }[status];

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase select-none",
    )}>
      <span className="relative flex h-1.5 w-1.5">
        {status !== "Completed" && (
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75")} />
        )}
        <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5")} />
      </span>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tech badge
// ─────────────────────────────────────────────────────────────────────────────
function TechBadge({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay }}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border",
        TECH_COLORS["slate"]
      )}
    >
      {name}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature item
// ─────────────────────────────────────────────────────────────────────────────
function FeatureItem({ text, icon, delay }: { text: string; icon: string; delay: number }) {
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

// ─────────────────────────────────────────────────────────────────────────────
// Stat card — compact horizontal pill
// ─────────────────────────────────────────────────────────────────────────────
function StatPill({ label, value, icon, delay }: { label: string; value: string; icon: string; delay: number }) {
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
        <p className="text-[9px] uppercase tracking-widest text-muted-foreground/70 font-semibold">{label}</p>
        <p className="text-xs font-bold text-foreground leading-tight truncate">{value}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA Button
// ─────────────────────────────────────────────────────────────────────────────
function CtaButton({ href, type, delay }: { href: string; type: string; delay: number }) {
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
          : "border-primary/25 bg-primary/8 text-primary hover:bg-primary/15 hover:shadow-md hover:shadow-primary/10"
      )}
      aria-label={type}
    >
      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      {type}
      <ArrowUpRight className="h-3 w-3 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project thumbnail (left panel)
// ─────────────────────────────────────────────────────────────────────────────
const ProjectThumb = memo(function ProjectThumb({
  project, isActive, index, onClick,
}: {
  project: ProjectData; isActive: boolean; index: number; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`View ${project.title}`}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "group relative w-full rounded-2xl border p-3.5 text-left transition-all duration-300 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        isActive
          ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/5"
          : "border-border/40 bg-transparent hover:border-border/70 hover:bg-muted/30"
      )}
    >
      {/* Left active bar */}
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="relative h-11 w-[72px] shrink-0 overflow-hidden rounded-lg border border-border/30">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="72px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={cn(
              "text-sm font-semibold truncate block transition-colors duration-200",
              isActive ? "text-primary" : "text-foreground"
            )}>
              {project.title}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground/70 line-clamp-1 leading-tight">
            {project.tagline}
          </p>
        </div>

        <span className={cn(
          "shrink-0 text-[11px] font-bold tabular-nums transition-colors duration-200",
          isActive ? "text-primary/50" : "text-muted-foreground/30"
        )}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </button>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Premium Details Panel — full-width hero + vertical content stack
// ─────────────────────────────────────────────────────────────────────────────
function DetailsPanel({ project }: { project: ProjectData }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        {/* ── HERO IMAGE ─────────────────────────────────────────────────── */}
        {/* padding-bottom sets the aspect ratio (7/16 = 43.75%) reliably */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          <div style={{ paddingBottom: "60.00%" }} className="relative w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover absolute inset-0"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            {/* Multi-stop gradient for premium depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

            {/* Top row: category chip + featured badge */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                {project.category}
              </span>
            </div>

            {/* Bottom: title + tagline + status */}
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
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
            <span className="font-medium">{project.duration}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* ── FEATURES + TECH / CTAS — side by side on md+ ───────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
          {/* Features */}

          {/* Tech stack + CTAs */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1 min-w-[380px] rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Tech Stack
                </h4>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, i) => (
                    <TechBadge
                      key={t.name}
                      name={t.name}
                      delay={i * 0.03}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2.5">
              {project.links.map((l, i) => (
                <CtaButton key={l.type} href={l.href} type={l.type} delay={i * 0.07} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main: ProjectCarousel
// ─────────────────────────────────────────────────────────────────────────────
export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_INTERVAL = 6000;

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length);
  }, []);

  const prev = useCallback(() => { goTo(activeIndex - 1); setIsPlaying(false); }, [activeIndex, goTo]);
  const next = useCallback(() => { goTo(activeIndex + 1); setIsPlaying(false); }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((i) => (i + 1) % PROJECTS.length);
      }, AUTO_INTERVAL);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
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
    <section id="projects-carousel" className="w-full" aria-label="Current Projects">
      {/* ── Section header ─────────────────────────────────────────────── */}
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
              My work spans full-stack web applications, open-source
              contributions, theming systems, and machine learning models. Hover
              the folder — click any card to explore with full details and
              left/right navigation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main 2-col layout ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 lg:gap-8 items-start">

        {/* ── LEFT: project list ────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {/* Controls */}
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              {String(activeIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>

            {/* <div className="flex items-center gap-1">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="rounded-lg border border-border/50 p-1.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted/60 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </button>
              <button
                onClick={prev}
                aria-label="Previous project"
                className="rounded-lg border border-border/50 p-1.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted/60 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button
                onClick={next}
                aria-label="Next project"
                className="rounded-lg border border-border/50 p-1.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted/60 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            </div> */}

          </div>

          {/* Auto-play progress bar */}
          {isPlaying && (
            <div className="h-0.5 w-full rounded-full bg-border/30 overflow-hidden">
              {/* <motion.div
                key={activeIndex}
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
              /> */}
            </div>
          )}

          {/*
            Scrollable project list.
            max-h bounds it — add as many projects as you like,
            they scroll invisibly inside this container.
            scrollbar is hidden visually but still functional.
          */}
          <div
            className="flex flex-col gap-2 overflow-y-auto"
            style={{
              maxHeight: "480px",
              scrollbarWidth: "none",        /* Firefox */
              msOverflowStyle: "none",       /* IE/Edge */
            }}
          >
            {/* Hide webkit scrollbar via a style tag scoped to this element */}
            <style>{`
              .project-list-scroll::-webkit-scrollbar { display: none; }
            `}</style>
            <div className="project-list-scroll flex flex-col gap-2">
              {PROJECTS.map((project, i) => (
                <ProjectThumb
                  key={project.id}
                  project={project}
                  isActive={i === activeIndex}
                  index={i}
                  onClick={() => { goTo(i); setIsPlaying(false); }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: premium details panel ─────────────────────────────── */}
        <div className="min-w-0">
          <DetailsPanel project={active} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy stub — kept so the named export doesn't break any imports
// ─────────────────────────────────────────────────────────────────────────────
export function Feature() {
  return null;
}
