"use client";

import LeetCodeRadial from "./LeetCodeRadial";

function Stat({ color, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-zinc-600 dark:text-zinc-300">
        {label}:{" "}
        <span className="font-medium text-zinc-800 dark:text-white">
          {value}
        </span>
      </span>
    </div>
  );
}

export default function LeetCodeCardUI({ data }) {
  return (
    <div className="mt-10 flex justify-center">
      <div
        className="
        w-[300px] sm:w-[260px]
        p-5 rounded-2xl
        bg-transparent 
        backdrop-blur-md
        
      "
      >
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
          LeetCode Progress
        </h2>

        <div className="flex items-center gap-5">
          <LeetCodeRadial {...data} />

          <div className="space-y-2 text-xs">
            <Stat color="bg-[#BFA2F3]" label="Easy" value={data.easy} />
            <Stat color="bg-[#7A00FF]" label="Medium" value={data.medium} />
            <Stat color="bg-[#2E0A59]" label="Hard" value={data.hard} />

            <div className="pt-2 text-zinc-500 dark:text-zinc-400">
              Total:{" "}
              <span className="font-semibold text-zinc-800 dark:text-white">
                {data.total}/3906
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
