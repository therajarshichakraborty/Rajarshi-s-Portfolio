"use client";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar } from "lucide-react";
import Image from "next/image";
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
  description: string;
  technologies: string[];
}

const techComponents: Record<string, React.ReactNode> = {
  golang: (
    <Link href="https://go.dev/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Golang />
        Golang
      </Button>
    </Link>
  ),
  react: (
    <Link href="https://react.dev/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <React />
        React
      </Button>
    </Link>
  ),
  docker: (
    <Link href="https://www.docker.com/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Docker />
        Docker
      </Button>
    </Link>
  ),
  nodejs: (
    <Link href="https://nodejs.org/en" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Nodejs />
        NodeJs
      </Button>
    </Link>
  ),
  typescript: (
    <Link href="https://www.typescriptlang.org/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Typescript />
        TypeScript
      </Button>
    </Link>
  ),
  java: (
    <Link href="https://www.java.com/en/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Java />
        Java
      </Button>
    </Link>
  ),
  express: (
    <Link href="https://expressjs.com/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Express />
        Express
      </Button>
    </Link>
  ),
  postgres: (
    <Link href="https://expressjs.com/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Postgres />
        PostgreSQL
      </Button>
    </Link>
  ),
  python: (
    <Link href="https://www.python.org/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Python />
        Python
      </Button>
    </Link>
  ),
  kubernetes: (
    <Link href="https://www.python.org/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Kubernetes />
        Kubernetes
      </Button>
    </Link>
  ),
  numpy: (
    <Link href="https://numpy.org/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <NumPy />
        Numpy
      </Button>
    </Link>
  ),
  pandas: (
    <Link href="https://pandas.pydata.org/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Pandas />
        Pandas
      </Button>
    </Link>
  ),
  mongo: (
    <Link href="https://www.mongodb.com/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <MongoDB />
        MongoDB
      </Button>
    </Link>
  ),
  "sk-learn": (
    <Link href="https://scikit-learn.org/stable/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <SkLearn />
        Scikit Learn
      </Button>
    </Link>
  ),
  "c++": (
    <Link href="https://isocpp.org/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <CPP />
        C++
      </Button>
    </Link>
  ),
  "pytorch": (
    <Link href="https://pytorch.org/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <Pytorch />
        PyTorch
      </Button>
    </Link>
  ),
  "nextjs": (
    <Link href="https://nextjs.org/" target="_blank">
      {" "}
      <Button
        size={"sm"}
        className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
      >
        <NextJs />
        NextJs
      </Button>
    </Link>
  ),
};
const ExperienceItem = ({
  title,
  company,
  period,
  description,
  technologies,
}: ExperienceItemProps) => {
  return (
    <>
      <div className="relative pl-8 not-last:pb-12">
        {/* Timeline line */}
        <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-1">
          <div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-black bg-black" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center">
              <Building2 className="size-5 text-muted-foreground" />
            </div>
            <span className="text-lg font-semibold">{company}</span>
          </div>
          <div>
            <h3 className="text-xl font-medium">{title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <Calendar className="size-4" />
              <span>{period}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2 items-center">
            {technologies.map((tech) => {
              // 2. Convert to lowercase to match your object keys safely
              const techKey = tech.toLowerCase();

              return (
                <div key={tech} className="flex items-center ">
                  {/* 3. Render the SVG/Component or fall back to a Badge */}
                  {techComponents[techKey] || (
                    <Badge variant="outline">{tech}</Badge>
                  )}
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
      title: "Researcher",
      company: "Techno Main Salt Lake",
      period: "Jan 2026 - Present",
      description: "Researching about LSTM and /deep Learning",
      technologies: [
        "golang",
        "nodejs",
        "typescript",
        "react",
        "mongo",
        "java",
        "python",
        "kubernetes",
        "numpy",
        "pandas",
        "sk-learn",
        "pythorch","c++","nextjs"
      ],
    },
    {
      title: "Co-Head",
      company: "Co-Head of Ignite",
      period: "2019 - 2021",
      description:
        "Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
      technologies: ["React", "Express", "postgres", "Docker", "Redis"],
    },
    {
      title: "Frontend Developer",
      company: "WebTech Studios",
      period: "2018 - 2019",
      description:
        "Created responsive and interactive user interfaces, collaborated with designers, and optimized application performance.",
      technologies: ["React", "typescript", "java", "Webpack", "Jest"],
    },
  ];

  return (
    <section id="experience" className="relative py-1 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Experience
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Professional Journey
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            A timeline of my professional growth and key achievements
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
