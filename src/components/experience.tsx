"use client";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Building2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Golang } from "@/components/ui/svgs/golang";
import { React } from "@/components/ui/svgs/react";
import { Docker } from "@/components/ui/svgs/docker";
import { Nodejs } from "./ui/svgs/nodejs";
import { Typescript } from "./ui/svgs/typescript";
import { Java } from "./ui/svgs/java";
import { Button } from "./ui/button";
import Link from "next/link";
import { Express } from "./ui/svgs/express";
import { Postgres } from "./ui/svgs/postgresql";
import { Python } from "./ui/svgs/python";
import { Kubernetes } from "./ui/svgs/kubernetes";
import { NumPy } from "./ui/svgs/numpy";
import { Pandas } from "./ui/svgs/pandas";
import { MongoDB } from "./ui/svgs/mongodb";
import { SkLearn } from "./ui/svgs/sk-learn";
import { CPP } from "./ui/svgs/c++";
import { Pytorch } from "./ui/svgs/pytorch";
import { NextJs } from "./ui/svgs/nextjs";
import { Git } from "@/components/ui/svgs/git";
import { Redis } from "@/components/ui/svgs/redis";
import { Prisma } from "@/components/ui/svgs/prisma";
import { Tailwind } from "@/components/ui/svgs/tailwind";
import { NestJs } from "@/components/ui/svgs/nestjs";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  Location: string;
}

/**
 * Auto-bolds numeric values (including %, x, + suffixes) within a bullet string.
 */
function HighlightedBullet({ text }: { text: string }) {
  const parts = text.split(/(\b\d+(?:\.\d+)?(?:%|x|\+)?\b)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\d+(?:\.\d+)?(?:%|x|\+)?$/.test(part) ? (
          <span key={i} className="font-semibold text-foreground tabular-nums">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

interface TechConfigItem {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
}

const techConfig: Record<string, TechConfigItem> = {
  golang: { name: "Golang", url: "https://go.dev/", icon: Golang },
  react: { name: "React", url: "https://react.dev/", icon: React },
  docker: { name: "Docker", url: "https://www.docker.com/", icon: Docker },
  nodejs: { name: "NodeJs", url: "https://nodejs.org/en", icon: Nodejs },
  typescript: {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    icon: Typescript
  },
  java: { name: "Java", url: "https://www.java.com/en/", icon: Java },
  express: { name: "Express", url: "https://expressjs.com/", icon: Express },
  postgres: {
    name: "PostgreSQL",
    url: "https://www.postgresql.org/",
    icon: Postgres
  },
  postgresql: {
    name: "PostgreSQL",
    url: "https://www.postgresql.org/",
    icon: Postgres
  },
  python: { name: "Python", url: "https://www.python.org/", icon: Python },
  kubernetes: {
    name: "Kubernetes",
    url: "https://kubernetes.io/",
    icon: Kubernetes
  },
  numpy: { name: "Numpy", url: "https://numpy.org/", icon: NumPy },
  pandas: { name: "Pandas", url: "https://pandas.pydata.org/", icon: Pandas },
  mongo: { name: "MongoDB", url: "https://www.mongodb.com/", icon: MongoDB },
  mongodb: { name: "MongoDB", url: "https://www.mongodb.com/", icon: MongoDB },
  "sk-learn": {
    name: "Scikit Learn",
    url: "https://scikit-learn.org/stable/",
    icon: SkLearn
  },
  "c++": { name: "C++", url: "https://isocpp.org/", icon: CPP },
  pytorch: { name: "PyTorch", url: "https://pytorch.org/", icon: Pytorch },
  nextjs: { name: "NextJs", url: "https://nextjs.org/", icon: NextJs },
  git: { name: "Git", url: "https://git-scm.com/", icon: Git },
  tailwind: {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    icon: Tailwind
  },
  tailwindcss: {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    icon: Tailwind
  },
  prisma: { name: "Prisma", url: "https://www.prisma.io/", icon: Prisma },
  redis: { name: "Redis", url: "https://redis.io/", icon: Redis },
  nestjs: { name: "NestJS", url: "https://nestjs.com/", icon: NestJs }
};

const monthMap: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
};

function parseMonthYear(str: string): Date | null {
  if (!str) return null;
  const clean = str.trim().toLowerCase();
  if (/present|currently working|current/i.test(clean)) {
    return new Date();
  }
  const parts = clean.replace(/[,.]/g, "").split(/\s+/);
  if (parts.length >= 2) {
    const month = monthMap[parts[0]];
    const year = parseInt(parts[1], 10);
    if (month !== undefined && !isNaN(year)) {
      return new Date(year, month, 1);
    }
  }
  return null;
}

function calculateDuration(periodStr: string): string | null {
  const parts = periodStr.split(/\s*[-–—]\s*|\s+to\s+/i);
  if (parts.length < 2) return null;

  const startDate = parseMonthYear(parts[0]);
  const isPresent = /present|currently working|current/i.test(parts[1]);
  const endDate = isPresent ? new Date() : parseMonthYear(parts[1]);

  if (!startDate || !endDate) return null;

  let totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;

  if (totalMonths <= 0) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const segments: string[] = [];
  if (years > 0) {
    segments.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }
  if (months > 0 || years === 0) {
    segments.push(`${months} ${months === 1 ? "month" : "months"}`);
  }

  const result = segments.join(" ");
  return isPresent ? `${result} +` : result;
}

const ExperienceItem = ({
  title,
  company,
  period,
  description,
  technologies,
  Location
}: ExperienceItemProps) => {
  const isCurrent = /present|currently working/i.test(period);
  const displayPeriod = period.replace(/present/i, "Currently Working");
  const duration = calculateDuration(period);

  const getCompanyLogo = () => {
    if (company === "Brand Voy")
      return (
        <Image
          src="/brandvoy.png"
          alt={company}
          className="size-full object-contain p-0.5"
          width={36}
          height={36}
        />
      );
    if (company === "Techno Main Salt Lake")
      return (
        <Image
          src="/techno-main.jpg"
          alt={company}
          className="size-full object-contain p-0.5"
          width={36}
          height={36}
        />
      );
    if (company === "Samarth TMSL")
      return (
        <Image
          src="/Samarth.jpg"
          alt={company}
          className="size-full object-contain p-0.5"
          width={36}
          height={36}
        />
      );
    if (company === "Geekonix")
      return (
        <Image
          src="/geekonix.png"
          alt={company}
          className="size-full object-contain p-0.5"
          width={36}
          height={36}
        />
      );
    return <Building2 className="size-5 text-muted-foreground" />;
  };

  return (
    <div className="relative">
      <div className="space-y-4">
        {/* ── Header row ── */}
        <div className="flex items-start gap-4">
          {/* Logo badge */}
          <div className="flex-shrink-0 size-12 rounded-xl border border-border/70 bg-background flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105">
            {getCompanyLogo()}
          </div>

          {/* Company + title + meta on left, Period + duration on right */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-x-3 gap-y-1">
              {/* Left column: Company, Title, Location */}
              <div className="flex flex-col min-w-0">
                <span className="text-lg sm:text-xl font-bold tracking-tight leading-tight">
                  {company}
                </span>
                <h3 className="mt-0.5 text-sm sm:text-base font-semibold text-muted-foreground">
                  {title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground/70">
                  <MapPin className="size-3 flex-shrink-0" />
                  <span>{Location}</span>
                </div>
              </div>

              {/* Right column: Animated Period pill + dynamic duration */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                {isCurrent ? (
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-foreground whitespace-nowrap select-none">
                    <span className="relative flex size-2 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-80" />
                      <span className="relative inline-flex size-2 rounded-full bg-lime-500 shadow-[0_0_8px_rgba(132,204,22,0.9)]" />
                    </span>
                    <span className="tracking-tight">{displayPeriod}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-muted-foreground whitespace-nowrap select-none">
                    <Calendar className="size-3.5 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="tracking-tight">{displayPeriod}</span>
                  </span>
                )}
                {duration && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium tabular-nums select-none",
                      isCurrent
                        ? "text-lime-600 dark:text-lime-400 font-semibold"
                        : "text-muted-foreground/80"
                    )}
                  >
                    {isCurrent && (
                      <span className="size-1 rounded-full bg-lime-500 shrink-0 shadow-[0_0_4px_rgba(132,204,22,0.8)]" />
                    )}
                    <span>{duration}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bullet points ── */}
        <ul className="space-y-2.5 pt-1">
          {description.map((point, i) => {
            const colonIdx = point.indexOf(":");
            const hasLabel = colonIdx !== -1 && colonIdx < 35;
            const label = hasLabel ? point.slice(0, colonIdx) : null;
            const rest = hasLabel ? point.slice(colonIdx + 1).trim() : point;

            return (
              <li key={i} className="flex items-start gap-3 group/bullet">
                {/* Chevron-style bullet */}
                <span className="mt-[5px] flex-shrink-0 size-[3px] rotate-45 border-r border-b border-muted-foreground/50 group-hover/bullet:border-foreground/90 group-hover/bullet:scale-125 transition-all duration-200" />
                <p className="text-sm leading-relaxed text-muted-foreground group-hover/bullet:text-foreground/90 transition-colors duration-200">
                  {label && (
                    <span className="font-semibold text-foreground/90">
                      {label}:{" "}
                    </span>
                  )}
                  <HighlightedBullet text={rest} />
                </p>
              </li>
            );
          })}
        </ul>

        {/* ── Tech stack ── */}
        {technologies.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-2 items-center">
              {technologies.map((tech) => {
                const techKey = tech.toLowerCase();
                const techData = techConfig[techKey];

                if (techData) {
                  const Icon = techData.icon;
                  return (
                    <Link href={techData.url} target="_blank" key={tech}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer flex items-center gap-1.5 h-7 px-2.5 text-xs bg-transparent text-foreground border-border/60 transition-all duration-300 ease-out hover:scale-108 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 active:scale-95"
                      >
                        <Icon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                        <span>{techData.name}</span>
                      </Button>
                    </Link>
                  );
                }

                return (
                  <span
                    key={tech}
                    className="inline-flex items-center h-7 px-2.5 text-xs rounded-md border border-border/60 bg-transparent text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-foreground hover:border-border"
                  >
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Brand Voy",
      period: "August 2026 - Currently Working",
      Location: "London, United Kingdom",
      description: [
        "As a Software Engineer at Brand Voy, I contribute to designing, developing, and maintaining scalable software solutions. I work across the development lifecycle, building reliable and user-focused applications while applying modern software engineering practices. I collaborate with the team to develop new features, improve existing systems, optimize application performance, and solve real-world technical challenges."
      ],
      technologies: [
        "Typescript",
        "NodeJs",
        "Redis",
        "NextJs",
        "Express",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
        "Git",
      ]
    },
    {
      title: "UnderGrad Student Researcher",
      company: "Techno Main Salt Lake",
      period: "Jan 2026 - Currently Working",
      Location: "Kolkata , West Bengal , India",
      description: [
        "Forecasting Accuracy: Built and benchmarked LSTM, ARIMA, and RNN models for weather time-series forecasting, achieving a 28.75% improvement in prediction reliability over baseline statistical methods through systematic backtesting on 3+ years of historical data.",
        "Deployment Pipeline: Refactored research Jupyter notebooks into a modular, deployment-ready Python pipeline (NumPy, Pandas, Scikit-learn, PyTorch, Node.js), reducing the model retrain-to-redeploy cycle from 3+ days to under 4 hours.",
        "Dataset Engineering: Designed and executed an end-to-end preprocessing workflow across a dataset of 60,000+ rows, covering missing values, outlier detection, seasonal decomposition, and feature normalization, reducing data noise by ~35%.",
        "Hyperparameter Tuning: Applied grid search and cross-validation across 120+ hyperparameter configurations, boosting LSTM validation accuracy by 19.4% while reducing Mean Absolute Error by 22% on held-out test splits.",
        "Research Documentation: Authored a structured technical report covering model architecture decisions, evaluation metrics (RMSE, MAE, MAPE), and ablation study results, forming the foundation for an ongoing research publication."
      ],
      technologies: [
        "Python",
        "NumPy",
        "Pandas",
        "sk-learn",
        "PyTorch",
        "nodejs",
        "Time Series Analysis"
      ]
    },
    {
      title: "Co-Head , Content Writer of IGNITE",
      company: "Samarth TMSL",
      period: "July 2023 - Currently Working",
      Location: "Kolkata , West Bengal , India",
      description: [
        "Event Leadership: Co-led the IGNITE division of Samarth TMSL, orchestrating 6+ large-scale events including Educathon (national-level hackathon) and Safalya (annual academic-cultural fest), collectively drawing 500+ participants across all sessions.",
        "Team Coordination: Directed cross-functional teams of 20+ volunteers across logistics, design, outreach, and operations, ensuring 100% on-time execution of all planned events with zero critical incidents.",
        "Content Strategy: Authored 15+ pieces of technical and educational content (articles, workshop decks, guides) for Samarth TMSL initiatives, contributing to a 40% increase in social media engagement and organic reach.",
        "Community Growth: Spearheaded outreach under Pragati, onboarding 200+ first-year students through structured orientation programs, mentorship drives, and inter-department collaborations."
      ],
      technologies: [
        "Leadership",
        "Event Management",
        "Public Speaking",
        "Team Coordination",
        "Operations",
        "Community Building",
        "Content Writing",
        "Technical Writing",
        "Communication",
        "Documentation"
      ]
    },
    {
      title: "Volunteer & Management Staff",
      company: "Geekonix",
      period: "Oct 2023 - Dec 2024",
      Location: "Kolkata , West Bengal , India",
      description: [
        "Fest Operations: Played a key ground-level role in executing EDGE, the official technical fest of Techno Main Salt Lake, supporting 10+ individual event tracks spanning competitive programming, robotics, and quizzing.",
        "Logistics Management: Coordinated scheduling, venue setup, and resource allocation for events hosting 300+ participants per day, maintaining smooth operations across 2 consecutive fest days with a team of 30+ volunteers.",
        "On-Site Coordination: Served as a primary point of contact for participant queries and real-time problem-solving during live events, achieving a 95%+ participant satisfaction rate based on post-event feedback.",
        "Process Improvement: Identified 3 critical bottlenecks in the registration and check-in workflow mid-event and proposed quick-fix solutions that reduced average participant wait time by 25% within the same day.",
        "Cross-Team Collaboration: Worked alongside tech, design, and PR divisions to maintain consistent communication and branding across all EDGE touchpoints, contributing to the fest being recognized as the most well-organized edition to date."
      ],
      technologies: [
        "Event Operations",
        "Team Management",
        "Logistics",
        "Coordination",
        "Execution"
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-1 px-6">
      <div className="max-w-screen-md mx-auto">
        {/* Section heading */}
        <div className="flex flex-col gap-y-4 items-center justify-center mb-12">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-white dark:text-black text-sm font-medium">
                Work Experience
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl inline-block text-center">
              Professional Journey
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              My background spans{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                Undergraduate Research
              </span>
              , leadership as{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                Co-Head at Samarth TMSL
              </span>
              , and management staff at{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                Geekonix
              </span>
              . Mapping my journey of growth, technical execution, and community
              leadership.
            </p>
          </div>
        </div>

        {/* Cards stack with connecting line */}
        <div className="relative flex flex-col gap-8">
          {/* Vertical timeline rule centered at 15px (half of 30px) */}
          <div className="absolute left-[15px] top-6 bottom-6 w-px bg-gradient-to-b from-border via-border/40 to-transparent hidden sm:block" />

          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative flex gap-5 sm:gap-6 items-start"
            >
              {/* Index badge on the timeline, mt-[9px] centers 30px badge with 48px company logo */}
              <div className="hidden sm:flex flex-shrink-0 size-[30px] mt-[9px] rounded-full border border-primary/80 bg-black text-white dark:bg-white dark:text-black items-center justify-center z-10 text-xs font-bold shadow-md">
                {String(index + 1).padStart(2, "")}
              </div>
              <div className="flex-1 min-w-0">
                <ExperienceItem {...experience} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
