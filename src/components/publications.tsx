"use client";

import { DATA } from "@/data/resume";
import { ArrowUpRight, BookOpen, Calendar, Users } from "lucide-react";

export function Publications() {
  // Safe fallback check if publications array exists
  const publications = (DATA as any).publications || [];

  if (publications.length === 0) return null;

  return (
    <section id="publications-section" className="relative py-2 px-6">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-white dark:text-black text-sm font-medium ">
              Publications
            </span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l -transparent from-5% via-border via-95% to-transparent" />
        </div>
        <br />
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl inline-block text-center">
            Checkout My Latest Publicartions
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
            Committed to advancing technology through research, technical publications, and innovative engineering contributions across multiple domains.
          </p>
        </div>

        <div className="flex flex-col mt-2">
          {publications.map((pub: any, index: number) => (
            <div
              key={index}
              className="py-6 flex flex-col gap-y-2 group transition-all duration-300">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-red-600 dark:text-primary">
                  {pub.status}
                </span>
                <span>•</span>
                <span>Paper ID: {pub.paperId}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {pub.date}
                </span>
              </div>

              {/* Title with Arrow Link on Hover */}
              <a
                href={pub.links?.[0]?.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1 group/title w-fit"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover/title:text-primary transition-colors duration-200 leading-snug">
                  {pub.title}
                </h3>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover/title:text-primary group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
              </a>

              {/* Authors list with dynamic owner highlight */}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="size-3.5 shrink-0 text-muted-foreground/60" />
                <div className="flex flex-wrap gap-x-1">
                  {pub.authors.map((author: string, authIdx: number) => {
                    const isOwner = author.toLowerCase().includes("rajarshi");
                    return (
                      <span key={authIdx}>
                        <span
                          className={
                            isOwner
                              ? "font-semibold text-foreground underline decoration-primary/30 decoration-2"
                              : "text-muted-foreground/80"
                          }
                        >
                          {author}
                        </span>
                        {authIdx < pub.authors.length - 1 && ","}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Venue / Citation source */}
              <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                <BookOpen className="size-3.5 shrink-0 mt-0.5 text-muted-foreground/60" />
                <span className="leading-normal">
                  Published in{" "}
                  <span className="font-semibold text-foreground">
                    {pub.conference}
                  </span>{" "}
                  — <span className="text-muted-foreground/90">{pub.conferenceFullName}</span> (IEEE Xplore, Forthcoming)
                </span>
              </div>

              {/* Summary / Description */}
              <p className="text-sm leading-relaxed text-muted-foreground/90 mt-1 font-sans">
                {pub.description}
              </p>

              {/* Bottom links */}
              <div className="flex items-center gap-4 mt-2">
                {pub.links.map((link: any, linkIdx: number) => (
                  <a
                    key={linkIdx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                ))}
                {/* <span className="text-xs text-neutral-400 dark:text-neutral-600 select-none">
                  IEEE Xplore link forthcoming
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Publications;
