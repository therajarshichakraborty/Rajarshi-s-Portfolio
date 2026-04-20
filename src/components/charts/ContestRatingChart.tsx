"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ContestChartData = {
  data: {
    date: string;
    rating: number;
    ranking: number;
    contestAttend: number;
  }[];
};

export default function ContestRatingChart({ data }: ContestChartData) {
  if (!data || data.length === 0) {
    return <div className="text-xs text-muted-foreground">No contest data</div>;
  }

  return (
    <div className="rounded-xl p-4 bg-transparent">
      <h2 className="text-lg font-semibold mb-4 ml-30">
        Contest Rating Progress
      </h2>
    <div className="w-[450px] h-[220px]">
      {" "}
      <ResponsiveContainer width="100%" height="100%" className="dark:border-none">
        <LineChart data={data} >
          <XAxis dataKey="date" tick={{ fontSize: 9 }} tickLine={false} />

          <YAxis tick={{ fontSize: 9 }} tickLine={false} width={30} />

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

          {/* Legend */}
          <Legend wrapperStyle={{ fontSize: "10px" }} />

          {/* Rating Line */}
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            name="Rating"
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
