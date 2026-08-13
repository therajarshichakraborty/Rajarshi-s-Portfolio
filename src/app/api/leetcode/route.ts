export async function GET() {
  const username = "rajarshi_2005";

  const LEETCODE_GRAPHQL_QUERY = `
    query getLeetCodeUserData($username: String!, $limit: Int!) {
      matchedUser(username: $username) {
        userCalendar {
          submissionCalendar
        }
        badges {
          id
          displayName
          icon
          creationDate
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
      }
      recentAcSubmissionList(username: $username, limit: $limit) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

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
        query: LEETCODE_GRAPHQL_QUERY,
        variables: { username, limit: 50 }
      }),
      next: { revalidate: 300 }
    });

    if (!gqlRes.ok) {
      throw new Error(`LeetCode GraphQL request failed with status ${gqlRes.status}`);
    }

    const gqlData = await gqlRes.json();
    const data = gqlData?.data;

    // 1. Parse Calendar
    let calendar: Record<string, number> = {};
    const rawCalendar = data?.matchedUser?.userCalendar?.submissionCalendar;
    if (rawCalendar) {
      calendar = typeof rawCalendar === "string" ? JSON.parse(rawCalendar) : rawCalendar;
    }

    // 2. Parse Badges
    const rawBadges = data?.matchedUser?.badges || [];
    const badges = rawBadges.map((b: any) => ({
      id: b.id || b.displayName,
      displayName: b.displayName,
      icon: b.icon?.startsWith("/") ? `https://leetcode.com${b.icon}` : b.icon,
      creationDate: b.creationDate
    }));
    const badgesCount = badges.length;
    const mostRecentBadge =
      badges.length > 0
        ? {
            displayName: badges[0].displayName,
            icon: badges[0].icon,
            creationDate: badges[0].creationDate
          }
        : null;

    // 3. Parse Contest Data
    const contestRanking = data?.userContestRanking;
    const contestTopPercentage = contestRanking?.topPercentage ?? null;
    const contestRating = contestRanking?.rating ? Math.round(contestRanking.rating) : null;
    const contestGlobalRanking = contestRanking?.globalRanking ?? null;
    const totalParticipants = contestRanking?.totalParticipants ?? null;
    const contestAttend = contestRanking?.attendedContestsCount ?? null;

    // 4. Parse Submissions
    const rawSubmissions = data?.recentAcSubmissionList || [];
    const submissionsList = rawSubmissions.map((item: any) => ({
      id: item.id ? String(item.id) : "",
      title: item.title || item.titleSlug,
      titleSlug: item.titleSlug || "",
      timestamp: item.timestamp,
      statusDisplay: "Accepted"
    }));

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
    console.error("Error fetching LeetCode GraphQL data:", error);
    return Response.json({
      calendar: {},
      badgesCount: 0,
      badges: [],
      mostRecentBadge: null,
      contestTopPercentage: null,
      contestRating: null,
      contestGlobalRanking: null,
      totalParticipants: null,
      contestAttend: null,
      sublissionsList: [],
      submissions: []
    });
  }
}
