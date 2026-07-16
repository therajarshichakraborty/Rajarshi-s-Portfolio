"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { Icons } from "@/components/icons";
import {
  ExternalLink,
  GitCommit,
  Activity,
  Flame,
  GitPullRequest,
  GitBranch,
  TrendingUp,
  Star,
  FolderGit
} from "lucide-react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity as GraphActivity
} from "@/components/kibo-ui/contribution-graph";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

function formatDate(dateStr: string, includeYear = false) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: includeYear ? "numeric" : undefined
  });
}

function computeStats(contributions: Contribution[]) {
  if (!contributions.length) {
    return {
      longest: 0,
      longestStart: "",
      longestEnd: "",
      current: 0,
      currentStart: "",
      currentEnd: "",
      bestDay: 0,
      totalContributions: 0,
      firstDate: "",
      lastDate: ""
    };
  }

  let longest = 0,
    longestStart = "",
    longestEnd = "";
  let streak = 0,
    streakStart = "";
  let bestDay = 0;
  let totalContributions = 0;

  const sorted = [...contributions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const firstDate = sorted[0]?.date || "";
  const lastDate = sorted[sorted.length - 1]?.date || "";

  for (const c of sorted) {
    totalContributions += c.count;
    if (c.count > 0) {
      if (streak === 0) {
        streakStart = c.date;
      }
      streak++;
      if (streak > longest) {
        longest = streak;
        longestStart = streakStart;
        longestEnd = c.date;
      }
    } else {
      streak = 0;
    }
    bestDay = Math.max(bestDay, c.count);
  }

  const today = new Date().toISOString().slice(0, 10);
  const yesterdayObj = new Date();
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterday = yesterdayObj.toISOString().slice(0, 10);

  let current = 0;
  let currentStart = "";
  let currentEnd = "";

  const reversed = [...sorted].reverse();
  const hasContribToday = sorted.some((c) => c.date === today && c.count > 0);
  const hasContribYesterday = sorted.some(
    (c) => c.date === yesterday && c.count > 0
  );

  if (hasContribToday || hasContribYesterday) {
    let started = false;
    for (const c of reversed) {
      if (c.date > today) continue;
      if (c.count > 0) {
        if (!started) {
          currentEnd = c.date;
          started = true;
        }
        current++;
        currentStart = c.date;
      } else {
        if (started) {
          break;
        }
      }
    }
  }

  return {
    longest,
    longestStart,
    longestEnd,
    current,
    currentStart,
    currentEnd,
    bestDay,
    totalContributions,
    firstDate,
    lastDate
  };
}

function ActivityOverviewChart({
  commits,
  prs,
  issues,
  reviews,
  loading
}: {
  commits: number;
  prs: number;
  issues: number;
  reviews: number;
  loading: boolean;
}) {
  const total = commits + prs + issues + reviews || 1;
  const pct = (n: number) => Math.round((n / total) * 100);

  const pctC = pct(commits);
  const pctI = pct(issues);
  const pctP = pct(prs);
  const pctR = pct(reviews);

  const W = 480,
    H = 320;
  const CX = 240,
    CY = 160;
  const MAX_ARM = 110,
    MIN_ARM = 12;
  const arm = (p: number) => MIN_ARM + (p / 100) * (MAX_ARM - MIN_ARM);

  const lLen = arm(pctC);
  const rLen = arm(pctI);
  const bLen = arm(pctP);
  const tLen = arm(pctR);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center animate-pulse"
        style={{ width: W, height: H }}
      >
        <div className="w-20 h-20 rounded-full bg-muted/50" />
      </div>
    );
  }

  const sub = "#94a3b8";

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ maxWidth: "100%", display: "block" }}
    >
      {[0.33, 0.66, 1].map((r) => (
        <circle
          key={r}
          cx={CX}
          cy={CY}
          r={MAX_ARM * r}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={1.5}
        />
      ))}
      <line
        x1={CX - MAX_ARM}
        y1={CY}
        x2={CX + MAX_ARM}
        y2={CY}
        stroke="currentColor"
        strokeOpacity={0.1}
        strokeWidth={1.5}
      />
      <line
        x1={CX}
        y1={CY - MAX_ARM}
        x2={CX}
        y2={CY + MAX_ARM}
        stroke="currentColor"
        strokeOpacity={0.1}
        strokeWidth={1.5}
      />

      <line
        x1={CX}
        y1={CY}
        x2={CX - lLen}
        y2={CY}
        stroke="#22c55e"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <line
        x1={CX}
        y1={CY}
        x2={CX + rLen}
        y2={CY}
        stroke="#f97316"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <line
        x1={CX}
        y1={CY}
        x2={CX}
        y2={CY + bLen}
        stroke="#a855f7"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <line
        x1={CX}
        y1={CY}
        x2={CX}
        y2={CY - tLen}
        stroke="#3b82f6"
        strokeWidth={3.5}
        strokeLinecap="round"
      />

      <circle cx={CX - lLen} cy={CY} r={6.5} fill="#22c55e" />
      <circle cx={CX + rLen} cy={CY} r={6.5} fill="#f97316" />
      <circle cx={CX} cy={CY + bLen} r={6.5} fill="#a855f7" />
      <circle cx={CX} cy={CY - tLen} r={6.5} fill="#3b82f6" />

      <circle cx={CX} cy={CY} r={9} fill="currentColor" />

      <text
        x={114}
        y={CY - 7}
        textAnchor="end"
        fontSize={20}
        fontWeight="800"
        fill="#22c55e"
        fontFamily="inherit"
      >
        {pctC}%
      </text>
      <text
        x={114}
        y={CY + 15}
        textAnchor="end"
        fontSize={13}
        fill={sub}
        fontFamily="inherit"
      >
        Commits
      </text>

      <text
        x={366}
        y={CY - 7}
        textAnchor="start"
        fontSize={20}
        fontWeight="800"
        fill="#f97316"
        fontFamily="inherit"
      >
        {pctI}%
      </text>
      <text
        x={366}
        y={CY + 15}
        textAnchor="start"
        fontSize={13}
        fill={sub}
        fontFamily="inherit"
      >
        Issues
      </text>

      <text
        x={CX}
        y={284}
        textAnchor="middle"
        fontSize={20}
        fontWeight="800"
        fill="#a855f7"
        fontFamily="inherit"
      >
        {pctP}%
      </text>
      <text
        x={CX}
        y={306}
        textAnchor="middle"
        fontSize={13}
        fill={sub}
        fontFamily="inherit"
      >
        Pull requests
      </text>

      <text
        x={CX}
        y={28}
        textAnchor="middle"
        fontSize={20}
        fontWeight="800"
        fill="#3b82f6"
        fontFamily="inherit"
      >
        {pctR}%
      </text>
      <text
        x={CX}
        y={50}
        textAnchor="middle"
        fontSize={13}
        fill={sub}
        fontFamily="inherit"
      >
        Code review
      </text>
    </svg>
  );
}

export default function GithubContributionBadge({
  username
}: {
  username: string;
}) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalThisYear, setTotalThisYear] = useState(0);
  const [totalCommits, setTotalCommits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [prCount, setPrCount] = useState<number | null>(null);
  const [issuesCount, setIssuesCount] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [starsCount, setStarsCount] = useState<number | null>(null);
  const [reposCount, setReposCount] = useState<number | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [isDark, setIsDark] = useState(false);
  const [cacheBust, setCacheBust] = useState("");
  const [chartMounted, setChartMounted] = useState(false);

  const [streakLoaded, setStreakLoaded] = useState(false);
  const streakUrl = isDark
    ? `https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&background=090b11&stroke=1a1f2e&ring=3b82f6&fire=f97316&currStreakNum=f8fafc&sideNums=f8fafc&currStreakLabel=94a3b8&sideLabels=94a3b8&dates=64748b`
    : `https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&background=fefefe&stroke=e4e4e7&ring=3b82f6&fire=f97316&currStreakNum=18181b&sideNums=18181b&currStreakLabel=6b7280&sideLabels=6b7280&dates=9ca3af`;

  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const graphWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChartMounted(true);
    setCacheBust(Date.now().toString());
    const check = () => document.documentElement.classList.contains("dark");
    setIsDark(check());
    const obs = new MutationObserver(() => {
      setIsDark(check());
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => obs.disconnect();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setStatsLoading(true);
      setError(null);
      const res = await fetch(
        `/api/github-stats?username=${username}&t=${Date.now()}`
      );
      if (!res.ok) throw new Error("Failed to load GitHub statistics.");
      const data = await res.json();

      if (data.calendar) {
        setContributions(data.calendar.contributions || []);
        const year = new Date().getFullYear().toString();
        setTotalThisYear(data.calendar.total[year] ?? 0);
      }

      if (data.stats) {
        setTotalCommits(data.stats.totalCommits);
        setPrCount(data.stats.prCount);
        setIssuesCount(data.stats.issuesCount);
        setReviewCount(data.stats.reviewCount);
        setStarsCount(data.stats.starsCount);
        setReposCount(data.stats.reposCount);
      }
    } catch (e: any) {
      setError(e.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const {
    longest,
    longestStart,
    longestEnd,
    current,
    currentStart,
    currentEnd,
    totalContributions,
    firstDate,
    lastDate
  } = computeStats(contributions);

  const graphData: GraphActivity[] = contributions as GraphActivity[];

  const last31DaysContributions = useMemo(() => {
    if (!contributions || contributions.length === 0) return [];
    const sorted = [...contributions].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    const todayStr = new Date().toISOString().slice(0, 10);
    const filtered = sorted.filter((c) => c.date <= todayStr);
    return filtered.slice(-31);
  }, [contributions]);

  const chartData = useMemo(() => {
    return last31DaysContributions.map((item) => ({
      date: item.date,
      contributions: item.count
    }));
  }, [last31DaysContributions]);

  const summaryStats = [
    {
      icon: <GitPullRequest className="size-4 text-violet-500" />,
      label: "Total PRs",
      value: prCount !== null ? prCount.toLocaleString() : "—",
      sub: "pull requests",
      accent: "via-violet-500/40",
      isLoading: statsLoading
    },
    {
      icon: <Flame className="size-4 text-orange-500 fill-orange-500" />,
      label: "Current Streak",
      value: `${current}`,
      sub: "days",
      accent: "via-orange-500/40",
      isLoading: loading
    },
    {
      icon: <TrendingUp className="size-4 text-blue-500" />,
      label: "Longest Streak",
      value: `${longest}`,
      sub: "days",
      accent: "via-blue-500/40",
      isLoading: loading
    },
    {
      icon: <GitBranch className="size-4 text-rose-500" />,
      label: "Total Issues",
      value: issuesCount !== null ? issuesCount.toLocaleString() : "—",
      sub: "issues raised",
      accent: "via-rose-500/40",
      isLoading: statsLoading
    }
  ];

  return (
    <div className="w-full mt-6 flex flex-col gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {summaryStats.map(({ icon, label, value, sub, accent, isLoading }) => (
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
              {isLoading ? (
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

      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icons.github className="size-4 text-foreground/70" />
              <span className="text-sm font-semibold text-foreground tracking-tight">
                Contribution Calendar
              </span>
              {/* {!loading && !error && (
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <GitCommit className="size-2.5" />
                  {totalThisYear.toLocaleString()} this year
                </span>
              )} */}
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>@{username}</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-[3px] py-1">
              {[...Array(7)].map((_, r) => (
                <div key={r} className="flex gap-[3px]">
                  {[...Array(53)].map((_, c) => (
                    <div
                      key={c}
                      className="rounded-sm bg-muted/40"
                      style={{ width: 12, height: 12 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <Icons.github className="size-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground text-center">
                {error}
              </p>
              <button
                onClick={fetchData}
                className="text-xs text-emerald-500 hover:text-emerald-400 underline underline-offset-2 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : (
            <div
              ref={graphWrapRef}
              className="relative text-[11px] text-muted-foreground"
            >
              {tooltip && (
                <div
                  className="pointer-events-none absolute z-20 rounded-md bg-popover px-2.5 py-1.5 text-[11px] font-medium text-popover-foreground shadow-md whitespace-nowrap"
                  style={{
                    left: tooltip.x,
                    top: tooltip.y - 38,
                    transform: "translateX(-50%)"
                  }}
                >
                  {tooltip.text}
                </div>
              )}

              <ContributionGraph
                data={graphData}
                blockSize={12}
                blockMargin={3}
                blockRadius={2}
                fontSize={11}
              >
                <ContributionGraphCalendar
                  onMouseLeave={() => setTooltip(null)}
                >
                  {({ activity, dayIndex, weekIndex }) => {
                    const dateLabel = new Date(
                      activity.date + "T00:00:00"
                    ).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    });
                    const countLabel =
                      activity.count === 0
                        ? "No contributions"
                        : activity.count === 1
                          ? "1 contribution"
                          : `${activity.count} contributions`;

                    return (
                      <ContributionGraphBlock
                        activity={activity}
                        dayIndex={dayIndex}
                        weekIndex={weekIndex}
                        className="cursor-pointer transition-opacity hover:opacity-80"
                        onMouseEnter={(e) => {
                          const rect = (
                            e.currentTarget as SVGRectElement
                          ).getBoundingClientRect();
                          const wrapRect =
                            graphWrapRef.current?.getBoundingClientRect();
                          if (!wrapRect) return;
                          setTooltip({
                            text: `${countLabel} on ${dateLabel}`,
                            x: rect.left - wrapRect.left + rect.width / 2,
                            y: rect.top - wrapRect.top
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  }}
                </ContributionGraphCalendar>

                <ContributionGraphFooter className="mt-2">
                  <ContributionGraphTotalCount className="text-[11px]" />
                  <ContributionGraphLegend className="text-[11px]" />
                </ContributionGraphFooter>
              </ContributionGraph>
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-blue-500" />
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Activity Graph
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/25 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Last 31 days
            </span>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icons.github className="size-3" />
            <ExternalLink className="size-3" />
          </a>
        </div>

        <div className="relative w-full px-10 pb-4 pt-2">
          {/* Rotated Y-Axis Label */}
          <div
            className="absolute left-1 top-1/2 -translate-y-1/2 text-[9px] font-semibold text-muted-foreground select-none"
            style={{
              writingMode: "vertical-lr",
              transform: "rotate(180deg)"
            }}
          >
            Contributions
          </div>

          <div className="text-xs font-semibold text-foreground text-center mb-3 select-none">
            Rajarshi Chakraborty's Contribution Graph
          </div>

          <div className="w-full h-[180px]">
            {!chartMounted || loading ? (
              <div className="w-full h-full flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center gap-3">
                  <div className="size-8 rounded-full bg-muted/50 flex items-center justify-center">
                    <Activity className="size-4 text-muted-foreground/40" />
                  </div>
                  <div className="h-2 w-32 rounded-full bg-muted/50" />
                </div>
              </div>
            ) : chartData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                No activity data available.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ left: -10, right: 10, top: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="contribGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="rgb(59, 130, 246)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="rgb(59, 130, 246)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="2 2"
                    stroke={
                      isDark
                        ? "rgba(148, 163, 184, 0.18)"
                        : "rgba(148, 163, 184, 0.35)"
                    }
                  />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(tick) =>
                      new Date(tick + "T00:00:00").getDate().toString()
                    }
                    tickLine={true}
                    axisLine={true}
                    tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                    stroke={
                      isDark
                        ? "rgba(148, 163, 184, 0.25)"
                        : "rgba(148, 163, 184, 0.5)"
                    }
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                    width={25}
                    allowDecimals={false}
                    ticks={[0, 5, 10, 15, 20, 25]}
                    domain={[0, 25]}
                    stroke={
                      isDark
                        ? "rgba(148, 163, 184, 0.25)"
                        : "rgba(148, 163, 184, 0.5)"
                    }
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border bg-popover/90 backdrop-blur-md px-3 py-2 text-[10px] text-popover-foreground shadow-md transition-all">
                            <p className="font-semibold text-muted-foreground mb-0.5">
                              {formatDate(data.date, true)}
                            </p>
                            <p className="text-blue-500 font-bold text-xs">
                              {data.contributions}{" "}
                              {data.contributions === 1
                                ? "contribution"
                                : "contributions"}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="contributions"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth={2}
                    dot={{
                      r: 2.5,
                      fill: "rgb(59, 130, 246)",
                      stroke: "rgb(59, 130, 246)",
                      strokeWidth: 0
                    }}
                    activeDot={{
                      r: 4.5,
                      fill: "rgb(59, 130, 246)",
                      stroke: "white",
                      strokeWidth: 1.5
                    }}
                    fillOpacity={1}
                    fill="url(#contribGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Centered X-Axis Label */}
          <div className="text-[9px] text-muted-foreground font-semibold text-center mt-1 select-none">
            Days
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-hidden justify-center items-center flex">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />

        <div className="px-2 sm:px-6 py-5">
          <div className="flex flex-row items-start justify-between gap-2 sm:gap-6">
            {/* Total Contributions */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-4 flex-1 min-w-0">
              <div className="flex items-center justify-center size-10 sm:size-12 rounded-xl bg-transparent text-orange-500 shrink-0">
                <GitPullRequest className="size-6 sm:size-7" />
              </div>

              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                  {loading ? (
                    <span className="inline-block w-16 h-6 rounded bg-muted animate-pulse" />
                  ) : (
                    (totalThisYear || totalContributions).toLocaleString()
                  )}
                </div>

                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                  Total Contributions
                </p>

                <p className="text-[10px] sm:text-xs text-muted-foreground/70 truncate">
                  {loading ? "..." : `${formatDate(firstDate, true)} – Present`}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-14 w-px bg-border" />

            {/* Total Stars */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-4 flex-1 min-w-0">
              <div className="flex items-center justify-center size-10 sm:size-12 rounded-xl bg-transparent text-orange-500 shrink-0">
                <Star
                  className="size-6 sm:size-7 text-gray-500"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>

              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                  {statsLoading
                    ? "—"
                    : starsCount !== null
                      ? starsCount.toLocaleString()
                      : "—"}
                </div>

                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                  Total Stars
                </p>

                <p className="text-[10px] sm:text-xs text-muted-foreground/70 truncate">
                  github stars
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-14 w-px bg-border" />

            {/* Total Repos */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-4 flex-1 min-w-0">
              <div className="flex items-center justify-center size-10 sm:size-12 rounded-xl bg-transparent text-blue-500 shrink-0">
                <FolderGit className="size-5 sm:size-6" />
              </div>

              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                  {statsLoading
                    ? "—"
                    : reposCount !== null
                      ? reposCount.toLocaleString()
                      : "—"}
                </div>

                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                  Total Repos
                </p>

                <p className="text-[10px] sm:text-xs text-muted-foreground/70 truncate">
                  repositories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
