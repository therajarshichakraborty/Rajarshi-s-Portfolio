export async function getLeetCodeStats(username: string) {
  const res = await fetch(
    `https://alfa-leetcode-api.onrender.com/${username}/progress`,
    { next: { revalidate: 600 } },
  );

  const data = await res.json();

  const stats = data?.numAcceptedQuestions?.numAcceptedQuestions || [];
  const easy = stats.find((s: any) => s.difficulty === "EASY")?.count || 0;
  const medium = stats.find((s: any) => s.difficulty === "MEDIUM")?.count || 0;
  const hard = stats.find((s: any) => s.difficulty === "HARD")?.count || 0;

  return {
    easy,
    medium,
    hard,
    total: easy + medium + hard,
  };
}
