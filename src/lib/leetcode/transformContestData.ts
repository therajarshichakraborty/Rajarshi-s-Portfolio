import { Contest, ContestChartData } from "@/types/leetcode";

export function transformContestData(data: Contest[]): ContestChartData[] {
  return data.map((item) => ({
    date: new Date(item.contest.startTime * 1000).toLocaleDateString(),
    rating: item.rating,
  }));
}