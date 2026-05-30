import { Contest } from "@/types/leetcode";

export async function getContestData(username: string) {
  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}/contest`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) {
      console.warn(
        `Failed to fetch contest data for ${username}: status ${res.status}`
      );
      return [];
    }

    const data = await res.json();
    return data?.contestParticipation || [];
  } catch (error) {
    console.error(`Error fetching contest data for ${username}:`, error);
    return [];
  }
}
