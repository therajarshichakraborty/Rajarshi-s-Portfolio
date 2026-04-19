"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
} from "@/components/kibo-ui/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import LeetCodeCard from "./LeetCodeCard";

type Activity = {
  date: string;
  count: number;
  value: number;
  level: number;
};

export default function LeetCodeGraph() {
  const [data, setData] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/leetcode");
      const raw = await res.json();

      const calendar = typeof raw === "string" ? JSON.parse(raw) : raw;

      let totalCount = 0;

      const transformed: Activity[] = Object.entries(calendar).map(
        ([ts, count]) => {
          const c = Number(count) || 0;
          totalCount += c;

          const date = new Date(Number(ts) * 1000).toISOString().split("T")[0];
          let level = 0;
          if (c > 0 && c < 2) level = 1;
          else if (c < 4) level = 2;
          else if (c < 7) level = 3;
          else if (c >= 7) level = 4;

          return {
            date,
            count: c,
            value: c,
            level,
          };
        },
      );

      setData(transformed);
      setTotal(totalCount);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto cursor-pointer   ">
        
       
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground flex items-center gap-1.5">
            <span className="font-semibold text-foreground">
              <Button
                size={"sm"}
                variant={"outline"}
                asChild
                className="transition-all active:scale-95 hover:bg-white hover:text-blue-600 hover:border-blue-600 dark:hover:bg-black"
              >
                <Link
                  href="https://leetcode.com/u/rajarshi_2005/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Rajarshi's LeetCode
                </Link>
              </Button>
            </span>
          </div>
        </div>

        <TooltipProvider>
          <ContributionGraph data={data}>
            <ContributionGraphCalendar>
              {({ activity, dayIndex, weekIndex }) => (
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                >
                  <title className="z-50 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
                    {`📅 ${activity.date}
🔥 ${activity.count ?? 0} submissions`}
                  </title>
                </ContributionGraphBlock>
              )}
            </ContributionGraphCalendar>

            <div className="flex flex-row-reverse items-center justify-between w-full">
              <ContributionGraphLegend />

              <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                Current:
                <span className="font-semibold text-foreground">
                  <Badge  variant="outline">
                    {total.toLocaleString()} Submissions
                  </Badge> 
                </span>
              </div>
            </div>
          </ContributionGraph>
        </TooltipProvider>
      </div>
    </>
  );
}
