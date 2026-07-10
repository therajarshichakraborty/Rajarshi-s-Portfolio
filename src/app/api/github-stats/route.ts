import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface CalendarData {
  total: Record<string, number>;
  contributions: Contribution[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username query parameter is required" },
      { status: 400 }
    );
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Rajarshis-Portfolio"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    // 1. Fetch contribution calendar (GraphQL API if token exists, fallback to jogruber)
    let calendar: CalendarData | null = null;

    if (token) {
      try {
        const currentYear = new Date().getFullYear();
        const from = `${currentYear}-01-01T00:00:00Z`;
        const to = `${currentYear}-12-31T23:59:59Z`;

        const query = `
          query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `;

        const graphqlRes = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query,
            variables: { username, from, to }
          }),
          next: { revalidate: 60 }
        });

        if (graphqlRes.ok) {
          const resBody = await graphqlRes.json();
          const calendarRaw =
            resBody?.data?.user?.contributionsCollection?.contributionCalendar;

          if (calendarRaw) {
            const contributions: Contribution[] = [];
            const weeks = calendarRaw.weeks || [];

            weeks.forEach((week: any) => {
              (week.contributionDays || []).forEach((day: any) => {
                let level: 0 | 1 | 2 | 3 | 4 = 0;
                switch (day.contributionLevel) {
                  case "FIRST_QUARTILE":
                    level = 1;
                    break;
                  case "SECOND_QUARTILE":
                    level = 2;
                    break;
                  case "THIRD_QUARTILE":
                    level = 3;
                    break;
                  case "FOURTH_QUARTILE":
                    level = 4;
                    break;
                  default:
                    level = 0;
                }
                contributions.push({
                  date: day.date,
                  count: day.contributionCount,
                  level
                });
              });
            });

            const currentYear = new Date().getFullYear().toString();
            calendar = {
              total: {
                [currentYear]: calendarRaw.totalContributions
              },
              contributions
            };
          }
        }
      } catch (graphqlErr) {
        console.error("Error fetching GitHub GraphQL contributions:", graphqlErr);
      }
    }

    // Fallback if token is missing, or if GraphQL fetch failed
    if (!calendar) {
      try {
        const fallbackRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}`,
          { next: { revalidate: 60 } }
        );
        if (fallbackRes.ok) {
          calendar = await fallbackRes.json();
        }
      } catch (fallbackErr) {
        console.error("Error fetching fallback jogruber calendar:", fallbackErr);
      }
    }

    const fetchHelper = async (url: string, label: string) => {
      try {
        const res = await fetch(url, { headers, next: { revalidate: 60 } });
        if (!res.ok) {
          const bodyText = await res.text();
          console.error(`[GitHub API error] ${label}: status ${res.status}, body: ${bodyText.slice(0, 200)}`);
          return null;
        }
        return await res.json();
      } catch (err) {
        console.error(`[GitHub API error] ${label} fetch exception:`, err);
        return null;
      }
    };

    // 2. Fetch stats: Commits, PRs, Issues, and Reviews (with search APIs)
    const statsPromises = [
      fetchHelper(`https://api.github.com/search/commits?q=author:${username}`, "Commits Count"),
      fetchHelper(`https://api.github.com/search/issues?q=author:${username}+type:pr`, "PRs Count"),
      fetchHelper(`https://api.github.com/search/issues?q=author:${username}+type:issue`, "Issues Count"),
      fetchHelper(`https://api.github.com/search/issues?q=reviewed-by:${username}+type:pr`, "Reviews Count")
    ];

    const [commitsData, prsData, issuesData, reviewsData] = await Promise.all(
      statsPromises
    );

    const stats = {
      totalCommits: commitsData?.total_count ?? null,
      prCount: prsData?.total_count ?? null,
      issuesCount: issuesData?.total_count ?? null,
      reviewCount: reviewsData?.total_count ?? null
    };

    return NextResponse.json(
      {
        calendar,
        stats
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
        }
      }
    );
  } catch (error: any) {
    console.error("Error in github-stats api route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
