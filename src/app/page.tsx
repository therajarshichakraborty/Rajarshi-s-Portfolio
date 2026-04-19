/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
// import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
// import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Gallery from "@/components/ui/gallery";
import LeetCodeGraph from "./components/leetcode/LeetCodeGraph";
import LeetCodeCard from "./components/leetcode/LeetCodeCard";
import LeetCodeCardUI from "./components/leetcode/LeetCodeCardUI";
import HireMeSection from "@/components/section/hire-me";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className=" flex flex-col gap-15 relative">
      <section
        id="hero"
        className="w-full flex justify-center -mt-10 md:-mt-14 dark:mt-0"
      >
        <div className="w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            {/* TEXT */}
            <div className="gap-2 flex flex-col order-2 md:order-1 md:pt-6 dark:pt-0">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl whitespace-pre-line"
                yOffset={8}
                text={`Hello👋🏻, This is
${DATA.name}`}
              />

              <BlurFadeText
                className="text-muted-foreground"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>

            {/* AVATAR */}
            <BlurFade
              delay={BLUR_FADE_DELAY}
              className="order-1 md:order-2 -mt-20 md:-mt-38 dark:mt-0"
            >
              <Avatar
                className="
            size-40 sm:size-48 md:size-52
            border rounded-full
            shadow-xl
            ring-4 ring-background
            bg-background
          "
              >
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about" className="mb-4">
        <div className="flex min-h-0 flex-col gap-y-2">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold mb-2">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert [&>*:last-child]:mb-0">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="gallery">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <Gallery />
        </BlurFade>
      </section>

      <section id="work" className="mt-0">
        <div className="flex min-h-0 flex-col gap-y-3 ">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <Experience />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <Education />
          </BlurFade>
        </div>
      </section>

      <section id="skills">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <Skills />
        </BlurFade>
      </section>

      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="leetcode">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center bg-black bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            My DSA Journey
          </h1>

          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg text-center mb-4 max-w-2xl mx-auto leading-relaxed">
            I am a student with a strong enthusiasm for Data Structures and
            Algorithms. Since 2024, I have been actively solving problems on
            LeetCode and consistently participating in coding contests. I have
            solved{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent font-medium">
              1100+ problems
            </span>{" "}
            across multiple platforms, including
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent font-medium">
              {" "}
              LeetCode
            </span>
            ,
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent font-medium">
              {" "}
              GeeksForGeeks
            </span>
            , &
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent font-medium">
              {" "}
              CodeForces
            </span>
            .
          </p>
          <div className="w-full flex justify-end">
            <LeetCodeCard />
          </div>
          <LeetCodeGraph />
        </BlurFade>
      </section>

      {/* <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section> */}

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <HireMeSection />
        </BlurFade>
      </section>

      {/* <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section> */}

      <p className="text-center text-sm text-muted-foreground tracking-wide">
        Design & Developed by{" "}
        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent font-medium">
          Rajarshi Chakraborty
        </span>
        <br />
        @2026. All rights reserved.
      </p>
    </main>
  );
}
