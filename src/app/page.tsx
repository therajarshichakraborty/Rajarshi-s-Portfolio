/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
// import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Leetcode from "@/components/ui/leetcode";
import Gallery from "@/components/ui/gallery";
import LeetCodeGraph from "./components/leetcode/LeetCodeGraph";



;

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className=" flex flex-col gap-14 relative">
      <section id="hero">
        <div className=" w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl whitespace-pre-line"
                yOffset={8}
                text={`Hello👋🏻, This is
                ${DATA.name}                   
                `}
              />
              <BlurFadeText
                className="text-muted-foreground "
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar
                style={{
                  height: "250px",
                  width: "250px",
                }}
                className="size-64 md:size-32 border rounded-full shadow-lg ring-4 ring-muted"
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
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
