"use client";

import React from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";

export default function DSASheetsCard() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-transparent p-6 rounded-2xl">
        <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-primary" />
          DSA Practice Sheets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.techinterviewhandbook.org/grind75/?weeks=28&hours=6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between p-4 rounded-xl border border-border/40 bg-transparent hover:bg-muted/15 dark:hover:bg-muted/10 transition-all group cursor-pointer hover:border-border/80 hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  Grind 169 Study Plan
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Personalized study roadmap covering key coding patterns and Blind 169 variations on a 28-week schedule.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/50 px-2 py-0.5 rounded-md border border-border/40">
                28 Weeks
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/50 px-2 py-0.5 rounded-md border border-border/40">
                6 hrs/week
              </span>
            </div>
          </a>

          <a
            href="https://dsa.chaicode.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between p-4 rounded-xl border border-border/40 bg-background/40 hover:bg-muted/15 dark:hover:bg-muted/10 transition-all group cursor-pointer hover:border-border/80 hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  ChaiCode DSA Sheet
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Structured problems, learning paths, and progress sheets provided by Hitesh Choudhary's dsa.chaicode.in.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-gray-500 bg-transparent px-2 py-0.5 rounded-md border border-gray-500/20 uppercase tracking-wider">
                Interactive
              </span>
              <span className="text-[10px] font-bold text-gray-500 bg-transparent px-2 py-0.5 rounded-md border border-gray-500/20 uppercase tracking-wider">
                Comprehensive
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
