import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";
import type { ComponentType } from "react";

import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { React } from "@/components/ui/svgs/react";
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
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";

const reviews = [
  { name: "React", icon: React },
  { name: "Tailwind", icon: Tailwind },
  { name: "Next.js", icon: NextjsIconDark },
  { name: "Javascript", icon: JavaScript },
  { name: "Typescript", icon: Typescript },
  { name: "Express", icon: Express },
  { name: "MongoDB", icon: MongoDB },
  { name: "Node.js", icon: Nodejs },
  { name: "Git", icon: Git },
  { name: "Python", icon: Python },
  { name: "Go", icon: Golang },
  { name: "Postgres", icon: Postgres },
  { name: "Prisma", icon: Prisma },
  { name: "Docker", icon: Docker },
  { name: "Kubernetes", icon: Kubernetes },
  { name: "Java", icon: Java },
  { name: "NumPy", icon: NumPy },
  { name: "Pandas", icon: Pandas },
  { name: "Scikit Learn", icon: SkLearn },
  { name: "PyTorch", icon: Pytorch },
  { name: "C++", icon: CPP }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  icon: Icon
}: {
  name: string;
  icon: ComponentType;
}) => {
  return (
    <figure
      className={cn(
        "relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl border p-2.5 px-4 transition-all duration-300",
        "border-white/80 bg-white/60 text-neutral-900 shadow-sm hover:bg-white/80",
        "dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10"
      )}
    >
      <div className="flex items-center justify-center shrink-0">
        <Icon />
      </div>
      <figcaption className="text-sm font-medium">{name}</figcaption>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-transparent"></div>
    </div>
  );
}
