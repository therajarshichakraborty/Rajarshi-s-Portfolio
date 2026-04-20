"use client";

import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ContestDataItem = {
  date: string;
  rating: number;
  ranking: number;
  contestAttend: number;
};

type ContestChartData = {
  data: ContestDataItem[];
};

export default function ContestRatingChart({ data }: ContestChartData) {
  const { resolvedTheme } = useTheme(); // ✅ FIXED (inside component)

  // ✅ Prevent hydration mismatch (important in Next.js)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!data || data.length === 0) {
    return (
      <div className="text-xs text-muted-foreground">
        No contest data
      </div>
    );
  }

  const strokeColor =
    mounted && resolvedTheme === "dark"
      ? "#e2463d" 
      : "#d85413"; 

  return (
    <div className="rounded-xl p-4 bg-transparent">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Contest Rating Progress
      </h2>

      <div className="w-[450px] h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9 }}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 9 }}
              tickLine={false}
              width={30}
            />

            <Tooltip
              formatter={(value, name) => [
                value,
                name === "rating" ? "Rating" : "Ranking",
              ]}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{
                color: "hsl(var(--foreground))",
              }}
              itemStyle={{
                color: "hsl(var(--foreground))",
              }}
            />

            <Legend wrapperStyle={{ fontSize: "10px" }} />

            {/* Rating Line */}
            <Line
              type="monotone"
              dataKey="rating"
              stroke={strokeColor}
              strokeWidth={2}
              dot={false}
              name="Rating"
              className="dark:text-white"
            />

            {/* Ranking Line */}
            <Line
              type="monotone"
              dataKey="ranking"
              stroke="#000000"
              strokeWidth={2}
              dot={true}
              name="Ranking"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}