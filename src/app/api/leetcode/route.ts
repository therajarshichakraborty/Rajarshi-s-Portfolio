export async function GET() {
  try {
    const username = "rajarshi_2005";

    // Fetch all three in parallel
    const [calendarRes, badgesRes, contestRes] = await Promise.allSettled([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, {
        next: { revalidate: 600 }
      }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/badges`, {
        next: { revalidate: 600 }
      }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, {
        next: { revalidate: 600 }
      })
    ]);

    // Parse calendar
    let calendar: Record<string, number> = {};
    if (calendarRes.status === "fulfilled" && calendarRes.value.ok) {
      const data = await calendarRes.value.json();
      if (data?.submissionCalendar) {
        calendar = JSON.parse(data.submissionCalendar);
      }
    }

    // Parse badges
    let badgesCount = 0;
    let badges: Array<{
      id: string;
      displayName: string;
      icon: string;
      creationDate: string;
    }> = [];
    let mostRecentBadge: {
      displayName: string;
      icon: string;
      creationDate: string;
    } | null = null;

    if (badgesRes.status === "fulfilled" && badgesRes.value.ok) {
      const data = await badgesRes.value.json();
      badgesCount = data?.badgesCount ?? 0;
      badges = data?.badges ?? [];
      // The first badge in the list is the most recent
      if (badges.length > 0) {
        const first = badges[0];
        mostRecentBadge = {
          displayName: first.displayName,
          icon: first.icon,
          creationDate: first.creationDate
        };
      }
    }

    // Parse contest
    let contestTopPercentage: number | null = null;
    let contestRating: number | null = null;
    let contestGlobalRanking: number | null = null;
    let totalParticipants: number | null = null;
    let contestAttend: number | null = null;

    if (contestRes.status === "fulfilled" && contestRes.value.ok) {
      const data = await contestRes.value.json();
      contestTopPercentage = data?.contestTopPercentage ?? null;
      contestRating = data?.contestRating ?? null;
      contestGlobalRanking = data?.contestGlobalRanking ?? null;
      totalParticipants = data?.totalParticipants ?? null;
      contestAttend = data?.contestAttend ?? null;
    }

    return Response.json({
      calendar,
      badgesCount,
      badges,
      mostRecentBadge,
      contestTopPercentage,
      contestRating,
      contestGlobalRanking,
      totalParticipants,
      contestAttend
    });
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return Response.json({ calendar: {} });
  }
}
