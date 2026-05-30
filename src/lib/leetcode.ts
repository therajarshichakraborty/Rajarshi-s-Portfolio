export async function getLeetCodeStats(username: string) {
  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}/progress`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) {
      console.warn(
        `Failed to fetch leetcode stats for ${username}: status ${res.status}`
      );
      return { easy: 0, medium: 0, hard: 0, total: 0 };
    }

    const data = await res.json();
    const stats = data?.numAcceptedQuestions?.numAcceptedQuestions || [];
    const easy = stats.find((s: any) => s.difficulty === "EASY")?.count || 0;
    const medium =
      stats.find((s: any) => s.difficulty === "MEDIUM")?.count || 0;
    const hard = stats.find((s: any) => s.difficulty === "HARD")?.count || 0;

    return {
      easy,
      medium,
      hard,
      total: easy + medium + hard
    };
  } catch (error) {
    console.error(`Error fetching LeetCode stats for ${username}:`, error);
    return {
      easy: 0,
      medium: 0,
      hard: 0,
      total: 0
    };
  }
}
