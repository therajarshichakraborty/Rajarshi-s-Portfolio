"use client";

import { useEffect, useState, useCallback } from "react";
import { Icons } from "@/components/icons";
import { ExternalLink, GitCommit, Activity, Flame, Star, TrendingUp } from "lucide-react";


interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}


const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["", "Mon", "", "Wed", "", "Fri", ""];

const LEVEL_COLORS_LIGHT: Record<number, string> = {
  0: "#ebedf0", 1: "#9be9a8", 2: "#40c463", 3: "#30a14e", 4: "#216e39",
};
const LEVEL_COLORS_DARK: Record<number, string> = {
  0: "#161b22", 1: "#0e4429", 2: "#006d32", 3: "#26a641", 4: "#39d353",
};

// ─── Grid Builder ─────────────────────────────────────────────────────────────

function buildGrid(contributions: Contribution[]) {
  const today = new Date();
  const end   = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay())); // walk to Saturday

  const start = new Date(end);
  start.setDate(start.getDate() - 52 * 7 + 1);
  start.setDate(start.getDate() - start.getDay()); // walk to Sunday

  const byDate: Record<string, Contribution> = {};
  for (const c of contributions) byDate[c.date] = c;

  const weeks: (Contribution | null)[][] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const week: (Contribution | null)[] = [];
    for (let d = 0; d < 7; d++) {
      const iso = cursor.toISOString().slice(0, 10);
      week.push(byDate[iso] ?? null);
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return { weeks };
}

function getMonthLabels(weeks: (Contribution | null)[][]) {
  const labels: { label: string; col: number }[] = [];
  let last = -1;
  for (let c = 0; c < weeks.length; c++) {
    const first = weeks[c].find((d) => d !== null);
    if (!first) continue;
    const m = new Date(first.date).getMonth();
    if (m !== last) { labels.push({ label: MONTHS[m], col: c }); last = m; }
  }
  return labels;
}

// ─── Stat helpers ─────────────────────────────────────────────────────────────

function computeStats(contributions: Contribution[]) {
  if (!contributions.length) return { longest: 0, current: 0, bestDay: 0 };

  let longest = 0, streak = 0, bestDay = 0;
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));

  for (const c of sorted) {
    if (c.count > 0) {
      streak++;
      longest = Math.max(longest, streak);
    } else {
      streak = 0;
    }
    bestDay = Math.max(bestDay, c.count);
  }

  // current streak: count backwards from today
  let current = 0;
  const today = new Date().toISOString().slice(0, 10);
  const rev = [...sorted].reverse();
  for (const c of rev) {
    if (c.date > today) continue;
    if (c.count > 0) current++;
    else break;
  }

  return { longest, current, bestDay };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GithubContributionBadge({ username }: { username: string }) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalThisYear, setTotalThisYear] = useState(0);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [isDark, setIsDark]     = useState(false);
  const [tooltip, setTooltip]   = useState<{ text: string; x: number; y: number } | null>(null);

  // Image states for the two external badges
  const [activityLoaded, setActivityLoaded] = useState(false);
  const [activityError, setActivityError]   = useState(false);
  const [streakLoaded, setStreakLoaded]     = useState(false);

  // ── Theme detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => document.documentElement.classList.contains("dark");
    setIsDark(check());
    const obs = new MutationObserver(() => {
      setIsDark(check());
      setActivityLoaded(false); setActivityError(false);
      setStreakLoaded(false);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // ── Data fetch ───────────────────────────────────────────────────────────
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

  // ── Derived ──────────────────────────────────────────────────────────────
  const { weeks } = contributions.length ? buildGrid(contributions) : { weeks: [] };
  const monthLabels = weeks.length ? getMonthLabels(weeks) : [];
  const { longest, current, bestDay } = computeStats(contributions);
  const colors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT;

  const CELL      = 13;
  const GAP       = 2;
  const CELL_CORE = CELL - GAP; // 11
  const DAY_W     = 28;
  const MONTH_H   = 18;
  const gridH     = 7 * CELL;

  // ── Badge URLs ───────────────────────────────────────────────────────────
  const activityUrl = isDark
    ? `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=090b11&color=e2e8f0&line=3b82f6&point=6366f1&area=true&area_color=3b82f6`
    : `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=minimal&hide_border=true&bg_color=fefefe&color=18181b&line=3b82f6&point=6366f1&area=true&area_color=3b82f6`;

  const streakUrl = isDark
    ? `https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&background=090b11&stroke=1a1f2e&ring=3b82f6&fire=f97316&currStreakNum=f8fafc&sideNums=f8fafc&currStreakLabel=94a3b8&sideLabels=94a3b8&dates=64748b`
    : `https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&background=fefefe&stroke=e4e4e7&ring=3b82f6&fire=f97316&currStreakNum=18181b&sideNums=18181b&currStreakLabel=6b7280&sideLabels=6b7280&dates=9ca3af`;

  // ── Summary stats cards ──────────────────────────────────────────────────
  const summaryStats = [
    {
      icon: <GitCommit className="size-4 text-emerald-500" />,
      label: "This Year",
      value: totalThisYear.toLocaleString(),
      sub: "contributions",
      glow: "emerald",
    },
    {
      icon: <Flame className="size-4 text-orange-500" />,
      label: "Current Streak",
      value: `${current}`,
      sub: "days",
      glow: "orange",
    },
    {
      icon: <TrendingUp className="size-4 text-blue-500" />,
      label: "Longest Streak",
      value: `${longest}`,
      sub: "days",
      glow: "blue",
    },
    {
      icon: <Star className="size-4 text-yellow-500" />,
      label: "Best Day",
      value: `${bestDay}`,
      sub: "contributions",
      glow: "yellow",
    },
  ];

  return (
    <div className="w-full mt-6 flex flex-col gap-5">

      {/* ══════════════════════════════════════════════════════════════════
          1. SUMMARY STATS ROW
      ══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {summaryStats.map(({ icon, label, value, sub, glow }) => (
          <div
            key={label}
            className="relative rounded-xl border border-border/60 bg-card/40 dark:bg-card/30 backdrop-blur-sm px-4 py-3.5 flex flex-col gap-1 overflow-hidden hover:shadow-md transition-all duration-300 group"
          >
            <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-${glow}-500/40 to-transparent`} />
            <div className="flex items-center gap-1.5">
              {icon}
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground tabular-nums">
                {loading ? <span className="inline-block w-10 h-6 bg-muted/40 animate-pulse rounded" /> : value}
              </span>
              <span className="text-[10px] text-muted-foreground">{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          2. CONTRIBUTION HEATMAP (exact GitHub calendar)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full rounded-xl border border-border/60 bg-card/40 dark:bg-card/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="px-5 pt-5 pb-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icons.github className="size-4 text-foreground/70" />
              <span className="text-sm font-semibold text-foreground tracking-tight">
                Contribution Calendar
              </span>
              {!loading && !error && (
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <GitCommit className="size-2.5" />
                  {totalThisYear.toLocaleString()} this year
                </span>
              )}
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

          {/* Calendar body */}
          {loading ? (
            <div className="animate-pulse space-y-[2px] py-1">
              {[...Array(7)].map((_, r) => (
                <div key={r} className="flex gap-[2px]">
                  {[...Array(53)].map((_, c) => (
                    <div key={c} className="rounded-[2px] bg-muted/40" style={{ width: 11, height: 11 }} />
                  ))}
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <Icons.github className="size-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground text-center">{error}</p>
              <button onClick={fetchData} className="text-xs text-emerald-500 hover:text-emerald-400 underline underline-offset-2 transition-colors">
                Try again
              </button>
            </div>
          ) : (
            <div className="relative w-full overflow-x-auto custom-scrollbar">
              {/* Tooltip */}
              {tooltip && (
                <div
                  className="pointer-events-none absolute z-20 rounded-md border border-border bg-popover px-2.5 py-1.5 text-[11px] font-medium text-popover-foreground shadow-md whitespace-nowrap"
                  style={{ left: tooltip.x, top: tooltip.y - 36, transform: "translateX(-50%)" }}
                >
                  {tooltip.text}
                </div>
              )}

              <svg
                width={DAY_W + weeks.length * CELL}
                height={MONTH_H + gridH}
                className="block"
                onMouseLeave={() => setTooltip(null)}
              >
                {/* Month labels */}
                {monthLabels.map(({ label, col }) => (
                  <text key={`${label}-${col}`} x={DAY_W + col * CELL} y={MONTH_H - 4}
                    fontSize={10} fill={isDark ? "#8b949e" : "#57606a"} fontFamily="inherit">
                    {label}
                  </text>
                ))}

                {/* Day-of-week labels */}
                {DAYS.map((day, row) =>
                  day ? (
                    <text key={`day-${row}`} x={0} y={MONTH_H + row * CELL + CELL_CORE}
                      fontSize={9} fill={isDark ? "#8b949e" : "#57606a"} fontFamily="inherit" dominantBaseline="middle">
                      {day}
                    </text>
                  ) : null
                )}

                {/* Cells */}
                {weeks.map((week, col) =>
                  week.map((day, row) => {
                    if (!day) return null;
                    const cx = DAY_W + col * CELL;
                    const cy = MONTH_H + row * CELL;
                    const dateLabel = new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "short", month: "short", day: "numeric", year: "numeric",
                    });
                    const countLabel = day.count === 0 ? "No contributions" : day.count === 1 ? "1 contribution" : `${day.count} contributions`;
                    return (
                      <rect key={day.date} x={cx} y={cy} width={CELL_CORE} height={CELL_CORE}
                        rx={2} ry={2} fill={colors[day.level]} className="cursor-pointer"
                        onMouseEnter={() => setTooltip({ text: `${countLabel} on ${dateLabel}`, x: cx + CELL_CORE / 2, y: cy })}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })
                )}
              </svg>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1.5 mt-3">
                <span className="text-[10px] text-muted-foreground">Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <svg key={lvl} width={11} height={11}>
                    <rect width={11} height={11} rx={2} fill={colors[lvl as 0|1|2|3|4]} />
                  </svg>
                ))}
                <span className="text-[10px] text-muted-foreground">More</span>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          3. ACTIVITY LINE GRAPH
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full rounded-xl border border-border/60 bg-card/40 dark:bg-card/30 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

        {/* Header */}
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

        {/* Skeleton */}
        {!activityLoaded && !activityError && (
          <div className="w-full h-[200px] flex items-center justify-center animate-pulse bg-muted/10 mx-auto">
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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          4. STREAK STATS
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full rounded-xl border border-border/60 bg-card/40 dark:bg-card/30 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md hover:shadow-orange-500/5 transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />

        {/* Header */}
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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
      </div>

    </div>
  );
}
