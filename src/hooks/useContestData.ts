"use client";

import { useEffect, useState } from "react";
import { getContestData } from "@/lib/leetcode/getContestData";
import { transformContestData } from "@/lib/leetcode/transformContestData";
import { ContestChartData } from "@/types/leetcode";

export function useContestData(username: string) {
  const [data, setData] = useState<ContestChartData[]>([]);

  useEffect(() => {
    async function load() {
      const raw = await getContestData(username);
      const formatted = transformContestData(raw);

      setData(formatted);
    }

    load();
  }, [username]);

  return data;
}