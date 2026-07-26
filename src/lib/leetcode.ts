export async function getLeetCodeStats(username: string) {
  const fallback = { easy: 206, medium: 346, hard: 104, total: 656 };
  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}/progress`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) {
      console.warn(
        `Failed to fetch leetcode stats for ${username}: status ${res.status}`
      );
      return fallback;
    }

    const data = await res.json();
    const stats = data?.numAcceptedQuestions?.numAcceptedQuestions || [];
    const easy = stats.find((s: any) => s.difficulty === "EASY")?.count || 0;
    const medium =
      stats.find((s: any) => s.difficulty === "MEDIUM")?.count || 0;
    const hard = stats.find((s: any) => s.difficulty === "HARD")?.count || 0;
    const total = easy + medium + hard;

    if (total === 0) {
      return fallback;
    }

    return {
      easy,
      medium,
      hard,
      total
    };
  } catch (error) {
    console.error(`Error fetching LeetCode stats for ${username}:`, error);
    return fallback;
  }
}
