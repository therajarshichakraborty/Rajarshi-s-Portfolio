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
  return (
    <>
      <div className="relative pl-8 pb-12 group last:pb-0">
        {/* Timeline line */}
        <div className="absolute left-0 top-2.5 h-full w-[1px] bg-zinc-300 dark:bg-zinc-800 group-last:h-2">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-primary bg-black dark:bg-white" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center overflow-hidden">
              {(() => {
                let icon;

                if (company === "Techno Main Salt Lake") {
                  icon = (
                    <Image
                      src="/techno-main.jpg"
                      alt="Techno Main Salt Lake"
                      className="size-52 object-contain p-1"
                      width={20}
                      height={20}
                    />
                  );
                } else if (company === "Samarth TMSL") {
                  icon = (
                    <Image
                      src="/Samarth.jpg"
                      alt="Samarth TMSL"
                      className="size-full object-contain p-1"
                      width={20}
                      height={20}
                    />
                  );
                } else if (company === "Geekonix") {
                  icon = (
                    <Image
                      src="/geekonix.png"
                      alt="Geekonix"
                      className="size-full object-contain p-1"
                      width={20}
                      height={20}
                    />
                  );
                } else {
                  icon = <Building2 className="size-5 text-muted-foreground" />;
                }

                return icon;
              })()}
            </div>

            <span className="text-2xl sm:text-3xl font-bold">{company}</span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-medium">{title}</h3>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mt-1 text-sm w-full">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{period}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>{Location}</span>
              </div>
            </div>
          </div>
          {/* Bullet-point description */}
          <ul className="space-y-2 mt-1">
            {description.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 group/bullet">
                <span className="mt-[6px] flex-shrink-0 size-1.5 rounded-full bg-primary/60 group-hover/bullet:bg-primary transition-colors duration-200" />
                <p className="text-sm leading-relaxed text-muted-foreground group-hover/bullet:text-foreground/80 transition-colors duration-200">
                  <HighlightedBullet text={point} />
                </p>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 items-center">
            <p className="text-black font-bold dark:text-white">
              Technologies & Tools :
            </p>
            <br />
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
                    className="flex items-center"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer flex items-center gap-2 bg-transparent text-foreground border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-white/5 active:scale-[0.98]"
                    >
                      <Icon className="size-4" />
                      <span>{techData.name}</span>
                    </Button>
                  </Link>
                );
              }

              return (
                <div key={tech} className="flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-foreground border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-white/5 active:scale-[0.98] cursor-default flex items-center gap-2"
                  >
                    {tech}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
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
        "Dataset Engineering: Designed and executed an end-to-end preprocessing workflow across a dataset of 60,000+ rows — handling missing values, outlier detection, seasonal decomposition, and feature normalization — reducing data noise by ~35%.",
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
        "Team Coordination: Directed cross-functional teams of 20+ volunteers across logistics, design, outreach, and operations — ensuring 100% on-time execution of all planned events with zero critical incidents.",
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
        <div className="text-center mb-12">
          {/* <Button size={"sm"} className=" bg-white text-black border-black cursor-pointer gap-2 mb-8">
            Experience
          </Button> */}
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight ">
            Professional Journey
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            Mapping my journey of growth, innovation, and real-world impact.
          </p>
        </div>

        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceItem key={index} {...experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
