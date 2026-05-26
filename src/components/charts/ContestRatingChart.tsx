"use client";

import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
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

// const xTicks = [0,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600];
const yTicks = [1200, 1300, 1400, 1500];

const dataX = [
  { x: 0, y: 12 },
  { x: 117, y: 45 },
  { x: 234, y: 23 },
  { x: 351, y: 78 },
  { x: 468, y: 156 },
];

  return (
    <div className="w-full rounded-xl p-1 sm:p-4 bg-transparent border-none -mx-6 sm:mx-0">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Contest Rating Progress
      </h2>

      <div className="w-full max-w-[450px] sm:max-w-none h-[220px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} height={600} margin={{ left: 0, right: 15, top: 10, bottom: 10 }}>
            {/* <CartesianGrid strokeDasharray="2 2"/> */}
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickLine={false}
              //ticks={xTicks}
            />

            <YAxis
              tick={{ fontSize: 10 }}
              tickLine={true}
              width={35}
              ticks={yTicks}
              domain={['dataMin - 100', 'dataMax + 10']}
              interval={0}
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
              dot={true}
              name="Rating"
              className="dark:text-white"
            />

            {/* Ranking Line */}
            {/* <Line
              type="monotone"
              dataKey="ranking"
              stroke="#000000"
              strokeWidth={2}
              dot={true}
              name="Ranking"
            /> */}
            
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}