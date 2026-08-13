async function fetchRecentSubmissions(username: string) {
  try {
    const gqlRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: `https://leetcode.com/u/${username}/`
      },
      body: JSON.stringify({
        query: `
          query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
              id
              title
              titleSlug
              timestamp
            }
          }
        `,
        variables: { username, limit: 50 }
      }),
      next: { revalidate: 300 }
    });

    if (gqlRes.ok) {
      const gqlData = await gqlRes.json();
      const list = gqlData?.data?.recentAcSubmissionList;
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item: any) => ({
          id: item.id ? String(item.id) : "",
          title: item.title || item.titleSlug,
          titleSlug: item.titleSlug || "",
          timestamp: item.timestamp,
          statusDisplay: "Accepted"
        }));
      }
    }
  } catch (err) {
    console.error("LeetCode GraphQL fetch failed:", err);
  }

  // Source 2: Alfa LeetCode API acSubmission
  try {
    const alfaRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}/acSubmission`,
      {
        next: { revalidate: 600 }
      }
    );
    if (alfaRes.ok) {
      const data = await alfaRes.json();
      const list =
        data?.submission ||
        data?.recentSubmissions ||
        data?.recentSubmissionList ||
        (Array.isArray(data) ? data : []);
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item: any) => ({
          id:
            item.id || item.submissionId
              ? String(item.id || item.submissionId)
              : "",
          title: item.title || item.titleSlug || "Submission",
          titleSlug: item.titleSlug || "",
          timestamp: item.timestamp,
          statusDisplay: item.statusDisplay || item.status || "Accepted"
        }));
      }
    }
  } catch (err) {
    console.error("Alfa LeetCode acSubmission fetch failed:", err);
  }

  // Source 3: Alfa LeetCode API recentSubmissions
  try {
    const alfaRes2 = await fetch(
      `https://alfa-leetcode-api.onrender.com/recentSubmissions/${username}`,
      {
        next: { revalidate: 600 }
      }
    );
    if (alfaRes2.ok) {
      const data = await alfaRes2.json();
      const list =
        data?.recentSubmissionList ||
        data?.submission ||
        (Array.isArray(data) ? data : []);
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item: any) => ({
          id:
            item.id || item.submissionId
              ? String(item.id || item.submissionId)
              : "",
          title: item.title || item.titleSlug || "Submission",
          titleSlug: item.titleSlug || "",
          timestamp: item.timestamp,
          statusDisplay: item.statusDisplay || item.status || "Accepted"
        }));
      }
    }
  } catch (err) {
    console.error("Alfa LeetCode recentSubmissions fetch failed:", err);
  }

  return [];
}

export async function GET() {
  try {
    const username = "rajarshi_2005";

    const [calendarRes, badgesRes, contestRes, submissionsList] =
      await Promise.all([
        fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, {
          next: { revalidate: 600 }
        })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`https://alfa-leetcode-api.onrender.com/${username}/badges`, {
          next: { revalidate: 600 }
        })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, {
          next: { revalidate: 600 }
        })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetchRecentSubmissions(username)
      ]);

    // Parse calendar
    let calendar: Record<string, number> = {};
    if (calendarRes?.submissionCalendar) {
      calendar =
        typeof calendarRes.submissionCalendar === "string"
          ? JSON.parse(calendarRes.submissionCalendar)
          : calendarRes.submissionCalendar;
    }

    // Parse badges
    let badgesCount = badgesRes?.badgesCount ?? 0;
    let badges = badgesRes?.badges ?? [];
    let mostRecentBadge =
      badges.length > 0
        ? {
            displayName: badges[0].displayName,
            icon: badges[0].icon,
            creationDate: badges[0].creationDate
          }
        : null;

    // Parse contest
    let contestTopPercentage = contestRes?.contestTopPercentage ?? null;
    let contestRating = contestRes?.contestRating ?? null;
    let contestGlobalRanking = contestRes?.contestGlobalRanking ?? null;
    let totalParticipants = contestRes?.totalParticipants ?? null;
    let contestAttend = contestRes?.contestAttend ?? null;

    return Response.json({
      calendar,
      badgesCount,
      badges,
      mostRecentBadge,
      contestTopPercentage,
      contestRating,
      contestGlobalRanking,
      totalParticipants,
      contestAttend,
      sublissionsList: submissionsList,
      submissions: submissionsList
    });
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return Response.json({ calendar: {} });
  }
}
