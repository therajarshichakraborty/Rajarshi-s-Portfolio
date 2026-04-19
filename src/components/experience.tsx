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
  description: string;
  technologies: string[];
  Location: string;
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
  pytorch: (
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
  nextjs: (
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
  Location,
}: ExperienceItemProps) => {
  return (
    <>
      <div className="relative pl-8 not-last:pb-12">
        {/* Timeline line */}
        <div className="absolute left-0 top-2.5 h-full w-[1px] bg-zinc-400 dark:bg-zinc-100 dark:w-[1px] group-first:h-[calc(75%-1px)] group-first:top-1">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-black bg-black dark:bg-white dark:border-0" />
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

            <span className="text-3xl font-bold">{company}</span>
          </div>

          <div>
            <h3 className="text-2xl font-medium">{title}</h3>

            <div className="flex items-center justify-between mt-1 text-sm w-full">
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
          <p className="text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <p className="text-black font-bold dark:text-white">
              Technologies & Tools :
            </p>
            <br />
            {technologies.map((tech) => {
              const techKey = tech.toLowerCase();

              return (
                <div key={tech} className="flex items-center ">
                  {/* 3. Render the SVG/Component or fall back to a Badge */}
                  {techComponents[techKey] || (
                    <Button
                      size={"sm"}
                      className="bg-white text-black border-black cursor-pointer flex items-center gap-2"
                    >
                      {tech}
                    </Button>
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
      title: "UnderGrad Student Researcher",
      company: "Techno Main Salt Lake",
      period: "Jan 2026 - Present",
      Location: "Kolkata , West Bengal , India",
      description:
        "Researching and optimizing weather forecasting models using LSTM, ARIMA, and RNN-based Deep Learning architectures for time-series prediction. Engineered scalable data preprocessing pipelines and significantly improved model performance on real-world datasets through rigorous evaluation, hyperparameter tuning, cross-validation, and feature engineering. Leveraged statistical modeling, data normalization, and anomaly detection techniques to enhance forecasting accuracy, while ensuring model robustness, scalability, and deployment readiness in production environments.",
      technologies: [
        "Python",
        "NumPy",
        "Pandas",
        "sk-learn",
        "PyTorch",
        "nodejs",
        "Time Series Analysis",
      ],
    },
    {
      title: "Co-Head , Content Writer of IGNITE",
      company: "Samarth TMSL",
      period: "July 2023 - Present",
      Location: "Kolkata , West Bengal , India",
      description: `Led the IGNITE division of Samarth TMSL official educational and civil services society of Techno Main Salt Lake. Organized and managed multiple large-scale events including Educathon (national-level hackathon) and Safalya (annual fest). Coordinated teams, handled event execution, and drove community engagement through seminars, workshops, and initiatives like Pragati.
      
      Created technical and educational content for initiatives under Samarth TMSL. Contributed to outreach, documentation, and communication strategies to improve engagement and awareness.`,
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
        "Documentation",
      ],
    },
    {
      title: "Volunteer & Management Staff",
      company: "Geekonix",
      period: "Oct 2023 - Dec 2024",
      Location: "Kolkata , West Bengal , India",
      description:
        "Worked at the ground level to organize and execute EDGE , the official technical fest of Techno Main Salt Lake. Managed logistics, coordinated teams, and ensured smooth execution of technical events and operations.",
      technologies: [
        "Event Operations",
        "Team Management",
        "Logistics",
        "Coordination",
        "Execution",
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-1 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-12">
          {/* <Button size={"sm"} className=" bg-white text-black border-black cursor-pointer gap-2 mb-8">
            Experience
          </Button> */}
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
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
