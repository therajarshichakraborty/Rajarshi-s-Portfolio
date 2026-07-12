/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
// import ProjectsSection from "@/components/section/projects-section"; // preserved — not rendered
// import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, FileDown, Eye } from "lucide-react";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Gallery from "@/components/ui/gallery";
import LeetCodeGraph from "./components/leetcode/LeetCodeGraph";
import LeetCodeCard from "./components/leetcode/LeetCodeCard";
import LeetCodeCardUI from "./components/leetcode/LeetCodeCardUI";
import DSASheetsCard from "./components/leetcode/DSASheetsCard";
import HireMeSection from "@/components/section/hire-me";
import ContestRatingChart from "@/components/charts/ContestRatingChart";
import { getContestData } from "@/lib/leetcode/getContestData";
import { transformContestData } from "@/lib/leetcode/transformContestData";
// import BrandCard from "@/components/gptCard/brandCard";
import { MarqueeDemo } from "@/components/magicui/marquee-demo";
import GithubCommits from "@/components/github-commits";
import GithubContributionBadge from "@/components/github-contribution-badge";
import MultilingualGreeting from "@/components/multilingual-greeting";
import { Button } from "@/components/ui/button";
import HeroAvatarOrbit from "@/components/hero-avatar-orbit";
import { ProjectCarousel } from "@/components/21stdotdev/project-carausal";
import Publications from "@/components/publications";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const raw = await getContestData("rajarshi_2005");
  const data = transformContestData(raw);

  return (
    <main className="flex flex-col gap-20 md:gap-28 relative">
      <section id="hero" className="w-full flex justify-center mt-4 md:mt-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="gap-6 flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="flex flex-col gap-3 order-2 md:order-1 pt-6 md:pt-18 w-full md:w-[380px] lg:w-[450px] shrink-0">
              <div className="flex flex-col">
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <MultilingualGreeting />
                </BlurFade>
              </div>
              <BlurFadeText
                className="text-muted-foreground"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />

              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex items-center gap-3 mt-2 sm:mt-2.5">
                  <Button
                    asChild
                    variant="default"
                    size="default"
                    className="group font-semibold"
                  >
                    <a
                      href="/Rajarshi's-Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Eye className="size-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                      <span>View Resume</span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="default"
                    className="group font-semibold bg-background text-foreground border border-input transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-white/5 active:scale-[0.98]"
                  >
                    <a
                      href="/Rajarshi's-Resume-01.pdf"
                      download="Rajarshi's-Resume.pdf"
                      className="flex items-center gap-2"
                    >
                      <FileDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                      <span>Download Resume</span>
                    </a>
                  </Button>
                </div>
              </BlurFade>
            </div>
            <BlurFade
              delay={BLUR_FADE_DELAY}
              className="order-1 md:order-2 shrink-0"
            >
              <div className="relative -mt-4 md:-mt-10 md:-ml-24 lg:-ml-12">
                <HeroAvatarOrbit />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about" className="mb-4 -mt-15">
        <div className="flex min-h-0 flex-col gap-y-2">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold mb-2 inline-block whitespace-nowrap">
              About
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert [&>*:last-child]:mb-0">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="gallery" className="-mt-20">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <Gallery />
        </BlurFade>
      </section>

      <section id="work" className="-mt-20">
        <div className="flex min-h-0 flex-col gap-y-3 ">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              
              <span className="text-white dark:text-black text-sm font-medium ">
                Experience
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>

          <br />
            <Experience />
          </BlurFade>
        </div>
      </section>
      <section id="education" className="-mt-15">
        <div className="flex min-h-0 flex-col gap-y-6 -mt-16">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="inline-block whitespace-nowrap text-xl font-bold ">
              Education
            </h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <Education />
          </BlurFade>
        </div>
      </section>

      <section id="skills" className="-mt-15">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="flex flex-col gap-y-4 ">
            <h2 className="text-xl font-bold">Skills & Activity</h2>
            <div >
            <MarqueeDemo />
            </div>
            <br />
            <br />
            <section id="projects">
              <BlurFade delay={BLUR_FADE_DELAY * 11}>
                <ProjectCarousel />
              </BlurFade>
            </section>
            <br />
            <br />
            <br />
            <br />
            <div className="w-full -mt-20">
              <div className="flex flex-col gap-y-4 items-center justify-center">
                <div className="flex items-center w-full">
                  <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                  <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                    <span className="text-white dark:text-black text-sm font-medium ">
                      My Latest Commits
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                </div>
                <div className="flex flex-col gap-y-3 items-center justify-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl inline-block text-center">
                    Here are my latest commit history
                  </h2>
                  <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                    I've been actively contributing to open-source projects and
                    working on various projects to enhance my skills. Here are
                    some of my recent contributions.
                  </p>
                </div>
              </div>
              <GithubCommits username="therajarshichakraborty" />
              <GithubContributionBadge username="therajarshichakraborty" />
            </div>
          </div>
        </BlurFade>
      </section>

      <section id="publications" className="-mt-8 md:-mt-12">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <Publications />
        </BlurFade>
      </section>

      <section id="leetcode" className="-mt-20 md:-mt-12">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-white dark:text-black text-sm font-medium ">
                Problem Solving
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <br />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-foreground">
            My DSA Journey
          </h1>

          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg text-center mb-4 max-w-2xl mx-auto leading-relaxed">
            I am a student with a strong enthusiasm for Data Structures and
            Algorithms. Since 2024, I have been actively solving problems on
            LeetCode and consistently participating in coding contests. I have
            solved{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
              1100+ problems
            </span>{" "}
            across multiple platforms, including
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
              {" "}
              LeetCode
            </span>
            ,
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
              {" "}
              GeeksForGeeks
            </span>
            , &
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
              {" "}
              CodeForces
            </span>
            .
          </p>

          <div className="w-full max-w-7xl mx-auto mt-10 flex flex-col lg:flex-row gap-6 items-stretch">
            {/* LEFT: Chart */}
            <div className="flex-1 ">
              <div className="h-full w-full flex items-center">
                <ContestRatingChart data={data as any} />
              </div>
            </div>

            <div className="w-full lg:w-[320px] flex justify-center -mt-25 items-center">
              <LeetCodeCard />
            </div>
          </div>

          <LeetCodeGraph />
          <DSASheetsCard />
        </BlurFade>
      </section>

      <section id="contact" className="-mt-20">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <HireMeSection />
        </BlurFade>
      </section>

      <p className="text-center text-sm text-muted-foreground tracking-wide -mt-30">
        Design & Developed by{" "}
        <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium">
          Rajarshi Chakraborty
        </span>
        <br />
        @2026. All rights reserved.
      </p>
    </main>
  );
}
