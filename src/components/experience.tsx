"use client";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Building2, Calendar } from "lucide-react";
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
  python: { name: "Python", url: "https://www.python.org/", icon: Python },
  kubernetes: {
    name: "Kubernetes",
    url: "https://kubernetes.io/",
    icon: Kubernetes
  },
  numpy: { name: "Numpy", url: "https://numpy.org/", icon: NumPy },
  pandas: { name: "Pandas", url: "https://pandas.pydata.org/", icon: Pandas },
  mongo: { name: "MongoDB", url: "https://www.mongodb.com/", icon: MongoDB },
  "sk-learn": {
    name: "Scikit Learn",
    url: "https://scikit-learn.org/stable/",
    icon: SkLearn
  },
  "c++": { name: "C++", url: "https://isocpp.org/", icon: CPP },
  pytorch: { name: "PyTorch", url: "https://pytorch.org/", icon: Pytorch },
  nextjs: { name: "NextJs", url: "https://nextjs.org/", icon: NextJs }
};

const ExperienceItem = ({
  title,
  company,
  period,
  description,
  technologies,
  Location
}: ExperienceItemProps) => {
  const getCompanyLogo = () => {
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
    <div className="group relative rounded-2xl border border-border/60 bg-card hover:border-border transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 overflow-hidden">
      {/* Top accent gradient bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 sm:p-7">
        {/* ── Header row ── */}
        <div className="flex items-start gap-4">
          {/* Logo badge */}
          <div className="flex-shrink-0 size-12 rounded-xl border border-border/70 bg-background flex items-center justify-center overflow-hidden shadow-sm">
            {getCompanyLogo()}
          </div>

          {/* Company + title + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className="text-lg sm:text-xl font-bold tracking-tight leading-tight">
                {company}
              </span>
              {/* Period pill */}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-border/70 bg-muted/40 text-muted-foreground whitespace-nowrap">
                <Calendar className="size-3" />
                {period}
              </span>
            </div>

            <h3 className="mt-0.5 text-sm sm:text-base font-semibold text-muted-foreground">
              {title}
            </h3>

            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground/70">
              <MapPin className="size-3 flex-shrink-0" />
              <span>{Location}</span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="my-5 h-px bg-border/60" />

        {/* ── Bullet points ── */}
        <ul className="space-y-3">
          {description.map((point, i) => {
            const colonIdx = point.indexOf(":");
            const hasLabel = colonIdx !== -1 && colonIdx < 35;
            const label = hasLabel ? point.slice(0, colonIdx) : null;
            const rest = hasLabel ? point.slice(colonIdx + 1).trim() : point;

            return (
              <li key={i} className="flex items-start gap-3 group/bullet">
                {/* Chevron-style bullet */}
                <span className="mt-[5px] flex-shrink-0 size-[5px] rotate-45 border-r border-b border-muted-foreground/50 group-hover/bullet:border-foreground/70 transition-colors duration-200" />
                <p className="text-sm leading-relaxed text-muted-foreground group-hover/bullet:text-foreground/75 transition-colors duration-200">
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
          <>
            <div className="my-5 h-px bg-border/60" />
            <div className="flex flex-wrap gap-2 items-center">
              {technologies.map((tech) => {
                const techKey = tech.toLowerCase();
                const techData = techConfig[techKey];

                if (techData) {
                  const Icon = techData.icon;
                  return (
                    <Link
                      href={techData.url}
                      target="_blank"
                      key={tech}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer flex items-center gap-1.5 h-7 px-2.5 text-xs bg-transparent text-foreground border-border/60 hover:border-border hover:bg-accent/50 transition-all duration-200 hover:scale-[1.03] hover:-translate-y-px active:scale-[0.98]"
                      >
                        <Icon className="size-3.5" />
                        <span>{techData.name}</span>
                      </Button>
                    </Link>
                  );
                }

                return (
                  <span
                    key={tech}
                    className="inline-flex items-center h-7 px-2.5 text-xs rounded-md border border-border/60 bg-transparent text-muted-foreground"
                  >
                    {tech}
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "UnderGrad Student Researcher",
      company: "Techno Main Salt Lake",
      period: "Jan 2026 - Present",
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
      period: "July 2023 - Present",
      Location: "Kolkata , West Bengal , India",
      description: [
        "Event Leadership: Co-led the IGNITE division of Samarth TMSL, orchestrating 6+ large-scale events including Educathon (national-level hackathon) and Safalya (annual academic-cultural fest), collectively drawing 500+ participants across all sessions.",
        "Team Coordination: Directed cross-functional teams of 20+ volunteers across logistics, design, outreach, and operations, ensuring 100% on-time execution of all planned events with zero critical incidents.",
        "Content Strategy: Authored 15+ pieces of technical and educational content (articles, workshop decks, guides) for Samarth TMSL initiatives, contributing to a 40% increase in social media engagement and organic reach.",
        "Community Growth: Spearheaded outreach under Pragati, onboarding 200+ first-year students through structured orientation programs, mentorship drives, and inter-department collaborations.",
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
              . Mapping my journey of growth, technical execution, and community leadership.
            </p>
          </div>
        </div>

        {/* Cards stack with connecting line */}
        <div className="relative flex flex-col gap-5">
          {/* Vertical timeline rule */}
          <div className="absolute left-[23px] top-12 bottom-12 w-px bg-gradient-to-b from-border via-border/40 to-transparent hidden sm:block" />

          {experiences.map((experience, index) => (
            <div key={index} className="relative flex gap-5 sm:gap-6 items-start">
              {/* Index badge on the timeline */}
              <div className="hidden sm:flex flex-shrink-0 size-[46px] rounded-full border border-border/70 bg-background items-center justify-center z-10 text-xs font-bold text-muted-foreground shadow-sm">
                {String(index + 1).padStart(2, "0")}
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
