import { Contest } from './../../types/leetcode.d';
export async function getContestData(username: string) {
  const res = await fetch(
    `https://alfa-leetcode-api.onrender.com/${username}/contest`,
    { next: { revalidate: 600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch contest data");
  }

  const data = await res.json();
  const totalContest = await data.ContestAttented;
  return data?.contestParticipation || [];
}