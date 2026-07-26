"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphLegend
} from "@/components/kibo-ui/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { LeetCode } from "@/components/ui/svgs/leetcode";
import { Award, Trophy, Zap, TrendingUp, Users } from "lucide-react";

type Activity = {
  date: string;
  count: number;
  value: number;
  level: number;
};

type LeetCodeBadge = {
  id: string;
  displayName: string;
  icon: string;
  creationDate: string;
};

type LeetCodeData = {
  calendar: Record<string, number>;
  badgesCount: number;
  badges: LeetCodeBadge[];
  mostRecentBadge: {
    displayName: string;
    icon: string;
    creationDate: string;
  } | null;
  contestTopPercentage: number | null;
  contestRating: number | null;
  contestGlobalRanking: number | null;
  totalParticipants: number | null;
  contestAttend: number | null;
};

// ─── Badge Card ───────────────────────────────────────────────────────────────
function BadgeCard({
  badge,
  isMostRecent
}: {
  badge: LeetCodeBadge;
  isMostRecent?: boolean;
}) {
  const formattedDate = badge.creationDate
    ? new Date(badge.creationDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              relative flex flex-col items-center gap-2 p-3 rounded-xl
              border transition-all duration-300 cursor-pointer group
              hover:scale-105 hover:shadow-lg
              ${
                isMostRecent
                  ? "border-amber-500/40 bg-amber-500/5 hover:border-amber-500/60 hover:bg-amber-500/10 hover:shadow-amber-500/10"
                  : "border-border bg-muted/20 hover:border-violet-500/30 hover:bg-violet-500/5 hover:shadow-violet-500/10"
              }
            `}
          >
            {isMostRecent && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-amber-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                <Zap className="size-2.5" />
                Most Recent
              </span>
            )}
            <div
              className={`
              size-14 flex items-center justify-center rounded-xl overflow-hidden
              ${isMostRecent ? "ring-2 ring-amber-500/50 ring-offset-1 ring-offset-background" : ""}
            `}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={badge.icon}
                alt={badge.displayName}
                className="size-12 object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <p className="text-[10px] font-medium text-center text-muted-foreground leading-tight max-w-[80px] line-clamp-2">
              {badge.displayName}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs max-w-[180px] text-center">
          <p className="font-semibold">{badge.displayName}</p>
          {formattedDate && (
            <p className="text-muted-foreground mt-0.5">Earned {formattedDate}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ─── Stats Bar (matches GitHub summary stats card template exactly) ────────────
function StatsBar({
  topPercentage,
  rating,
  globalRanking,
  totalParticipants,
  contestAttend,
  badgesCount,
  loading
}: {
  topPercentage: number | null;
  rating: number | null;
  globalRanking: number | null;
  totalParticipants: number | null;
  contestAttend: number | null;
  badgesCount: number;
  loading: boolean;
}) {
  const pct = topPercentage !== null ? topPercentage.toFixed(2) : null;

  const stats = [
    {
      icon: <Award className="size-4 text-amber-500" />,
      label: "Badges",
      value: badgesCount > 0 ? badgesCount.toString() : "—",
      sub: "earned",
      accent: "via-amber-500/40"
    },
    {
      icon: <TrendingUp className="size-4 text-orange-400" />,
      label: "Top",
      value: pct !== null ? `${pct}%` : "—",
      sub: "globally",
      accent: "via-orange-400/40"
    },
    {
      icon: <Trophy className="size-4 text-violet-500" />,
      label: "Contest Rating",
      value: rating !== null ? Math.round(rating).toLocaleString() : "—",
      sub: "rating",
      accent: "via-violet-500/40"
    },
    {
      icon: <Users className="size-4 text-blue-400" />,
      label: "Global Rank",
      value: globalRanking !== null ? globalRanking.toLocaleString() : "—",
      sub:
        totalParticipants !== null
          ? `of ${(totalParticipants / 1000).toFixed(0)}K`
          : "rank",
      accent: "via-blue-400/40"
    },
    {
      icon: <Zap className="size-4 text-emerald-400" />,
      label: "Attended",
      value: contestAttend !== null ? contestAttend.toString() : "—",
      sub: "contests",
      accent: "via-emerald-400/40"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
      {stats.map(({ icon, label, value, sub, accent }) => (
        <div
          key={label}
          className="relative rounded-xl bg-transparent px-4 py-3.5 flex flex-col gap-1 overflow-hidden hover:shadow-md transition-all duration-300"
        >
          <div
            className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent ${accent} to-transparent`}
          />
          <div className="flex items-center gap-1.5">
            {icon}
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            {loading ? (
              <span className="inline-block w-10 h-6 bg-muted/40 animate-pulse rounded" />
            ) : (
              <span className="text-2xl font-bold text-foreground tabular-nums">
                {value}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground">{sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LeetCodeGraph() {
  const [data, setData] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [badgesCount, setBadgesCount] = useState<number>(0);
  const [badges, setBadges] = useState<LeetCodeBadge[]>([]);
  const [mostRecentBadge, setMostRecentBadge] =
    useState<LeetCodeBadge | null>(null);

  const [contestTopPercentage, setContestTopPercentage] = useState<
    number | null
  >(null);
  const [contestRating, setContestRating] = useState<number | null>(null);
  const [contestGlobalRanking, setContestGlobalRanking] = useState<
    number | null
  >(null);
  const [totalParticipants, setTotalParticipants] = useState<number | null>(
    null
  );
  const [contestAttend, setContestAttend] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/leetcode");
        const json: LeetCodeData = await res.json();

        // Calendar
        const calendar =
          typeof json.calendar === "string"
            ? JSON.parse(json.calendar)
            : json.calendar ?? {};

        let totalCount = 0;
        const transformed: Activity[] = Object.entries(calendar).map(
          ([ts, count]) => {
            const c = Number(count) || 0;
            totalCount += c;
            const date = new Date(Number(ts) * 1000)
              .toISOString()
              .split("T")[0];
            let level = 0;
            if (c > 0 && c < 2) level = 1;
            else if (c < 4) level = 2;
            else if (c < 7) level = 3;
            else if (c >= 7) level = 4;
            return { date, count: c, value: c, level };
          }
        );

        setData(transformed);
        setTotal(totalCount);

        // Badges
        setBadgesCount(json.badgesCount ?? 0);
        setBadges(json.badges ?? []);
        if (json.mostRecentBadge) {
          // find the full badge object for the most recent one
          const recentFull = (json.badges ?? []).find(
            (b) => b.displayName === json.mostRecentBadge!.displayName
          );
          setMostRecentBadge(recentFull ?? null);
        }

        // Contest
        setContestTopPercentage(json.contestTopPercentage ?? null);
        setContestRating(json.contestRating ?? null);
        setContestGlobalRanking(json.contestGlobalRanking ?? null);
        setTotalParticipants(json.totalParticipants ?? null);
        setContestAttend(json.contestAttend ?? null);
      } catch (err) {
        console.error("Failed to fetch LeetCode data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Separate the 4 most prominent badges for the featured row
  // (500 Days, 365 Days, 100 Days 2026, Most Recent)
  const featuredBadgeNames = new Set<string>();
  const featuredBadges: LeetCodeBadge[] = [];

  if (mostRecentBadge && !featuredBadgeNames.has(mostRecentBadge.id)) {
    featuredBadgeNames.add(mostRecentBadge.id);
    featuredBadges.push(mostRecentBadge);
  }

  // Add the next top 3 (or up to 4 total)
  for (const b of badges) {
    if (featuredBadges.length >= 4) break;
    if (!featuredBadgeNames.has(b.id)) {
      featuredBadgeNames.add(b.id);
      featuredBadges.push(b);
    }
  }

  // Remaining badges for the overflow row
  const remainingBadges = badges.filter(
    (b) => !featuredBadgeNames.has(b.id)
  );

  return (
    <>
      {/* ── Graph Section ─────────────────────────────────────────────────── */}
      <div className="w-full mt-6">
        {/* Header row: button */}
        <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
          <Link
            href="https://leetcode.com/u/rajarshi_2005/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer flex items-center gap-2 bg-background text-foreground border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-md"
            >
              <LeetCode />
              Visit Rajarshi's LeetCode
            </Button>
          </Link>
        </div>

        {/* Horizontal stats bar — sits above the graph */}
        <StatsBar
          topPercentage={contestTopPercentage}
          rating={contestRating}
          globalRanking={contestGlobalRanking}
          totalParticipants={totalParticipants}
          contestAttend={contestAttend}
          badgesCount={badgesCount}
          loading={loading}
        />

        {/* Contribution Graph (full width) */}
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <TooltipProvider>
            <ContributionGraph
              data={data}
              theme="purple"
              className="transition-[background-color,color,border-color,fill,stroke] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              <ContributionGraphCalendar>
                {({ activity, dayIndex, weekIndex }) => (
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  >
                    <title className="z-50 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
                      {`📅 ${activity.date}\n🔥 ${activity.count ?? 0} submissions`}
                    </title>
                  </ContributionGraphBlock>
                )}
              </ContributionGraphCalendar>

              <div className="flex flex-row-reverse items-center justify-between w-full mt-1.5">
                <ContributionGraphLegend />
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  Total:
                  <Badge variant="outline">
                    {loading ? "—" : total.toLocaleString()} Submissions
                  </Badge>
                </div>
              </div>
            </ContributionGraph>
          </TooltipProvider>
        </div>
      </div>

    </>
  );
}
