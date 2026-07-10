"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Icons } from "@/components/icons";
import {
  ExternalLink,
  GitCommit,
  Activity,
  Flame,
  GitPullRequest,
  GitBranch,
  TrendingUp
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [prCount, setPrCount] = useState<number | null>(null);
  const [issuesCount, setIssuesCount] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [activityLoaded, setActivityLoaded] = useState(false);
  const [activityError, setActivityError] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const graphWrapRef = useRef<HTMLDivElement>(null);
  const activityImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const check = () => document.documentElement.classList.contains("dark");
    setIsDark(check());
    const obs = new MutationObserver(() => {
      setIsDark(check());
      setActivityLoaded(false);
      setActivityError(false);
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
      setError(null);
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        { next: { revalidate: 3600 } } as any
      );
      if (!res.ok) throw new Error("Failed to load contributions.");
      const data: ApiResponse = await res.json();
      setContributions(data.contributions);
      const year = new Date().getFullYear().toString();
      setTotalThisYear(data.total[year] ?? 0);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchGithubStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const headers = { Accept: "application/vnd.github+json" };
      const [prRes, issueRes, reviewRes] = await Promise.all([
        fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`,
          { headers }
        ),
        fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:issue&per_page=1`,
          { headers }
        ),
        fetch(
          `https://api.github.com/search/issues?q=reviewed-by:${username}+type:pr&per_page=1`,
          { headers }
        )
      ]);
      if (prRes.ok) {
        const d = await prRes.json();
        setPrCount(d.total_count ?? 0);
      }
      if (issueRes.ok) {
        const d = await issueRes.json();
        setIssuesCount(d.total_count ?? 0);
      }
      if (reviewRes.ok) {
        const d = await reviewRes.json();
        setReviewCount(d.total_count ?? 0);
      }
    } catch {
      // silently degrade — values stay null
    } finally {
      setStatsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchGithubStats();
  }, [fetchGithubStats]);

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

  const activityUrl = isDark
    ? `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=090b11&color=e2e8f0&line=3b82f6&point=6366f1&area=true&area_color=3b82f6`
    : `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=minimal&hide_border=true&bg_color=fefefe&color=18181b&line=3b82f6&point=6366f1&area=true&area_color=3b82f6`;

  useEffect(() => {
    if (
      activityImgRef.current?.complete &&
      activityImgRef.current.naturalWidth > 0
    ) {
      setActivityLoaded(true);
    }
  }, [activityUrl]);

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
      icon: <Flame className="size-4 text-orange-500" />,
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

        {activityError ? (
          <div className="w-full h-[180px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <Icons.github className="size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Unable to load activity graph.
              </p>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        ) : (
          <div className="relative">
            {!activityLoaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center gap-3">
                  <div className="size-8 rounded-full bg-muted/50 flex items-center justify-center">
                    <Activity className="size-4 text-muted-foreground/40" />
                  </div>
                  <div className="h-2 w-32 rounded-full bg-muted/50" />
                </div>
              </div>
            )}
            <img
              ref={activityImgRef}
              key={activityUrl}
              src={activityUrl}
              alt={`${username}'s GitHub activity graph`}
              className="w-full object-cover"
              onLoad={() => setActivityLoaded(true)}
              onError={() => {
                setActivityError(true);
                setActivityLoaded(false);
              }}
            />
          </div>
        )}
      </div>
      <div className="relative w-full overflow-hidden justify-center items-center flex">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />

        <div className="flex flex-col sm:flex-row gap-0 items-stretch">
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2 px-5 pt-4 pb-4">
              <Flame className="size-4 text-violet-500" />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Streak Stats
              </span>
              {current > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:bg-rose-500/15 dark:text-rose-300 animate-pulse">
                  <Flame className="size-2.5" />
                  {current} days active
                </span>
              )}
            </div>

            <div className="flex flex-col gap-6 px-6 pb-6 items-center sm:items-start">
              <br />
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center justify-center size-10 text-emerald-500 shrink-0">
                  <GitCommit className="size-6" />
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight text-foreground leading-none">
                    {loading ? (
                      <span className="inline-block w-12 h-5 bg-muted/40 animate-pulse rounded" />
                    ) : (
                      totalContributions.toLocaleString()
                    )}
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground mt-1.5">
                    Total Contributions
                  </div>
                  <div className="text-[10px] text-muted-foreground/60">
                    {loading
                      ? "..."
                      : `${formatDate(firstDate, true)} - Present`}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-2 w-full max-w-[200px] sm:self-center">
                <div className="relative size-24 rounded-full border-[3px] border-blue-500 dark:border-blue-500 flex items-center justify-center">
                  <div className="absolute -top-3.5 bg-background px-1.5 text-orange-500 flex items-center justify-center">
                    <Flame className="size-6 fill-orange-500" />
                  </div>
                  <span className="text-3xl font-black text-foreground tabular-nums">
                    {loading ? "—" : current}
                  </span>
                </div>
                <div className="text-center mt-2">
                  <div className="text-xs font-bold text-muted-foreground">
                    Current Streak
                  </div>
                  <div className="text-[10px] text-muted-foreground/60 mt-0.5">
                    {loading
                      ? "..."
                      : current > 0
                        ? `${formatDate(currentStart)} - ${formatDate(currentEnd)}`
                        : "No active streak"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center justify-center size-10 text-blue-700 shrink-0">
                  <TrendingUp className="size-6" />
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight text-foreground leading-none">
                    {loading ? (
                      <span className="inline-block w-12 h-5 bg-muted/40 animate-pulse rounded" />
                    ) : (
                      longest
                    )}
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground mt-1.5">
                    Longest Streak
                  </div>
                  <div className="text-[10px] text-muted-foreground/60">
                    {loading
                      ? "..."
                      : longest > 0
                        ? `${formatDate(longestStart)} - ${formatDate(longestEnd)}`
                        : "No streak recorded"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-[400px] shrink-0 flex flex-col">
            <div className="flex items-center gap-2 px-30 pt-4 pb-2">
              <Activity className="size-4 text-emerald-500" />
              <h3 className="text-sm font-semibold tracking-tight text-foreground ">
                Activity Overview
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-4">
              <ActivityOverviewChart
                commits={contributions.reduce((s, c) => s + c.count, 0)}
                prs={prCount ?? 0}
                issues={issuesCount ?? 0}
                reviews={reviewCount ?? 0}
                loading={statsLoading || loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
