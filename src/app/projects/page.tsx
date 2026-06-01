import BlurFade from "@/components/magicui/blur-fade";
import { AnimatedFolder } from "@/components/3d-folder";
import type { FolderProject } from "@/components/3d-folder";
import { DATA } from "@/data/resume";

// ── Skill icon lookup ─────────────────────────────────────────────────────────
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
import type React from "react";

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

function getTagIcon(tag: string) {
  const key = tag.toLowerCase();
  return tagIconMap[key] ?? tagIconMap[key.replace(/[.\s]/g, "")] ?? undefined;
}

function buildFolderProjects(): FolderProject[] {
  return DATA.projects.map((project, i) => ({
    id: String(i + 1),
    image: project.image || "/placeholder.svg",
    title: project.title,
    href: project.href || undefined,
    dates: project.dates,
    description: project.description,
    tags: project.technologies.map((t) => ({ name: t, icon: getTagIcon(t) })),
    links: project.links as any,
    isBuilding: "isBuilding" in project ? project.isBuilding : undefined
  }));
}

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  const folderProjects = buildFolderProjects();

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-8">
        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-white dark:text-black text-sm font-medium">
                Projects
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

        {/* ── Single folder containing ALL projects ───────────────────────── */}
        <BlurFade delay={BLUR_FADE_DELAY * 12} className="flex justify-center">
          <AnimatedFolder title="All Projects" projects={folderProjects} />
        </BlurFade>
      </div>
    </section>
  );
}
