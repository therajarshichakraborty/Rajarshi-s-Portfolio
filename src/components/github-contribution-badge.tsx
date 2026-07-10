"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Icons } from "@/components/icons";
import { ExternalLink, GitCommit, Activity, Flame, GitPullRequest, GitBranch, TrendingUp } from "lucide-react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity as GraphActivity,
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

function computeStats(contributions: Contribution[]) {
  if (!contributions.length) return { longest: 0, current: 0, bestDay: 0 };

  let longest = 0, streak = 0, bestDay = 0;
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));

  for (const c of sorted) {
    if (c.count > 0) { streak++; longest = Math.max(longest, streak); }
    else streak = 0;
    bestDay = Math.max(bestDay, c.count);
  }

  // current streak: walk backwards from today
  const today = new Date().toISOString().slice(0, 10);
  let current = 0;
  for (const c of [...sorted].reverse()) {
    if (c.date > today) continue;
    if (c.count > 0) current++;
    else break;
  }

  return { longest, current, bestDay };
}

export default function GithubContributionBadge({ username }: { username: string }) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalThisYear, setTotalThisYear] = useState(0);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  // PR + Issues counts
  const [prCount, setPrCount]         = useState<number | null>(null);
  const [issuesCount, setIssuesCount] = useState<number | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Image badge states
  const [activityLoaded, setActivityLoaded] = useState(false);
  const [activityError, setActivityError]   = useState(false);
  const [streakLoaded, setStreakLoaded]     = useState(false);
  const [isDark, setIsDark]                 = useState(false);

  // Tooltip state for kibo blocks
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const graphWrapRef = useRef<HTMLDivElement>(null);

  // ── Theme detection ────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => document.documentElement.classList.contains("dark");
    setIsDark(check());
    const obs = new MutationObserver(() => {
      setIsDark(check());
      setActivityLoaded(false);
      setActivityError(false);
      setStreakLoaded(false);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // ── Data fetch ─────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    try {
      setLoading(true); setError(null);
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

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── GitHub PR + Issues fetch ────────────────────────────────────────────────
  const fetchGithubStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const headers = { Accept: "application/vnd.github+json" };
      const [prRes, issueRes] = await Promise.all([
        fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`,
          { headers }
        ),
        fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:issue&per_page=1`,
          { headers }
        ),
      ]);
      if (prRes.ok) {
        const d = await prRes.json();
        setPrCount(d.total_count ?? 0);
      }
      if (issueRes.ok) {
        const d = await issueRes.json();
        setIssuesCount(d.total_count ?? 0);
      }
    } catch {
      // silently degrade — values stay null
    } finally {
      setStatsLoading(false);
    }
  }, [username]);

  useEffect(() => { fetchGithubStats(); }, [fetchGithubStats]);

  const { longest, current, bestDay } = computeStats(contributions);

  // Cast to kibo's Activity type (same shape)
  const graphData: GraphActivity[] = contributions as GraphActivity[];

  // ── Badge URLs ─────────────────────────────────────────────────────────────
  const activityUrl = isDark
    ? `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=090b11&color=e2e8f0&line=3b82f6&point=6366f1&area=true&area_color=3b82f6`
    : `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=minimal&hide_border=true&bg_color=fefefe&color=18181b&line=3b82f6&point=6366f1&area=true&area_color=3b82f6`;

  const streakUrl = isDark
    ? `https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&background=090b11&stroke=1a1f2e&ring=3b82f6&fire=f97316&currStreakNum=f8fafc&sideNums=f8fafc&currStreakLabel=94a3b8&sideLabels=94a3b8&dates=64748b`
    : `https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&background=fefefe&stroke=e4e4e7&ring=3b82f6&fire=f97316&currStreakNum=18181b&sideNums=18181b&currStreakLabel=6b7280&sideLabels=6b7280&dates=9ca3af`;

  // ── Summary stats ──────────────────────────────────────────────────────────
  const summaryStats = [
    {
      icon: <GitPullRequest className="size-4 text-violet-500" />,
      label: "Total PRs",
      value: prCount !== null ? prCount.toLocaleString() : "—",
      sub: "pull requests",
      accent: "via-violet-500/40",
      isLoading: statsLoading,
    },
    {
      icon: <Flame className="size-4 text-orange-500" />,
      label: "Current Streak",
      value: `${current}`,
      sub: "days",
      accent: "via-orange-500/40",
      isLoading: loading,
    },
    {
      icon: <TrendingUp className="size-4 text-blue-500" />,
      label: "Longest Streak",
      value: `${longest}`,
      sub: "days",
      accent: "via-blue-500/40",
      isLoading: loading,
    },
    {
      icon: <GitBranch className="size-4 text-rose-500" />,
      label: "Total Issues",
      value: issuesCount !== null ? issuesCount.toLocaleString() : "—",
      sub: "issues raised",
      accent: "via-rose-500/40",
      isLoading: statsLoading,
    },
  ];

  return (
    <div className="w-full mt-6 flex flex-col gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {summaryStats.map(({ icon, label, value, sub, accent, isLoading }) => (
          <div
            key={label}
            className="relative rounded-xl bg-transparent px-4 py-3.5 flex flex-col gap-1 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent ${accent} to-transparent`} />
            <div className="flex items-center gap-1.5">
              {icon}
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              {isLoading
                ? <span className="inline-block w-10 h-6 bg-muted/40 animate-pulse rounded" />
                : <span className="text-2xl font-bold text-foreground tabular-nums">{value}</span>
              }
              <span className="text-[10px] text-muted-foreground">{sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="px-5 pt-5 pb-4">
          {/* Header */}
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

          {/* Body */}
          {loading ? (
            <div className="animate-pulse space-y-[3px] py-1">
              {[...Array(7)].map((_, r) => (
                <div key={r} className="flex gap-[3px]">
                  {[...Array(53)].map((_, c) => (
                    <div key={c} className="rounded-sm bg-muted/40" style={{ width: 12, height: 12 }} />
                  ))}
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <Icons.github className="size-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground text-center">{error}</p>
              <button
                onClick={fetchData}
                className="text-xs text-emerald-500 hover:text-emerald-400 underline underline-offset-2 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : (
            <div ref={graphWrapRef} className="relative text-[11px] text-muted-foreground">
              {/* Tooltip */}
              {tooltip && (
                <div
                  className="pointer-events-none absolute z-20 rounded-md bg-popover px-2.5 py-1.5 text-[11px] font-medium text-popover-foreground shadow-md whitespace-nowrap"
                  style={{
                    left: tooltip.x,
                    top: tooltip.y - 38,
                    transform: "translateX(-50%)",
                  }}
                >
                  {tooltip.text}
                </div>
              )}

              <ContributionGraph data={graphData} blockSize={12} blockMargin={3} blockRadius={2} fontSize={11}>
                <ContributionGraphCalendar
                  onMouseLeave={() => setTooltip(null)}
                >
                  {({ activity, dayIndex, weekIndex }) => {
                    const dateLabel = new Date(activity.date + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "short", month: "short", day: "numeric", year: "numeric",
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
                          const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
                          const wrapRect = graphWrapRef.current?.getBoundingClientRect();
                          if (!wrapRect) return;
                          setTooltip({
                            text: `${countLabel} on ${dateLabel}`,
                            x: rect.left - wrapRect.left + rect.width / 2,
                            y: rect.top - wrapRect.top,
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
            <span className="text-sm font-semibold text-foreground tracking-tight">Activity Graph</span>
            <span className="inline-flex items-center gap-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/25 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Last 31 days
            </span>
          </div>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-200">
            <Icons.github className="size-3" />
            <ExternalLink className="size-3" />
          </a>
        </div>

        {!activityLoaded && !activityError && (
          <div className="w-full h-[200px] flex items-center justify-center animate-pulse bg-muted/10">
            <div className="flex flex-col items-center gap-3">
              <div className="size-8 rounded-full bg-muted/50 flex items-center justify-center">
                <Activity className="size-4 text-muted-foreground/40" />
              </div>
              <div className="h-2 w-32 rounded-full bg-muted/50" />
            </div>
          </div>
        )}

        {activityError ? (
          <div className="w-full h-[180px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <Icons.github className="size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Unable to load activity graph.</p>
              <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors">
                View on GitHub →
              </a>
            </div>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={activityUrl}
            src={activityUrl}
            alt={`${username}'s GitHub activity graph`}
            className="w-full object-cover transition-opacity duration-500"
            style={{ opacity: activityLoaded ? 1 : 0 }}
            onLoad={() => setActivityLoaded(true)}
            onError={() => { setActivityError(true); setActivityLoaded(false); }}
          />
        )}


      </div>

      {/* ══════════════════════════════════════════════════════════════════
          4. STREAK STATS
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />

        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
          <Flame className="size-4 text-orange-500" />
          <span className="text-sm font-semibold text-foreground tracking-tight">Streak Stats</span>
          <span className="inline-flex items-center gap-1 bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/25 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Flame className="size-2.5" />
            {current > 0 ? `${current} days active` : "Keep going!"}
          </span>
        </div>

        <div className="flex items-center justify-center py-4 px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={streakUrl}
            src={streakUrl}
            alt={`${username}'s GitHub streak stats`}
            className="max-w-full h-auto transition-opacity duration-500"
            style={{ maxHeight: "160px", opacity: streakLoaded ? 1 : 0.7 }}
            onLoad={() => setStreakLoaded(true)}
          />
        </div>


      </div>

    </div>
  );
}
