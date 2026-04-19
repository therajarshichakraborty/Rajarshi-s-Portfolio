import { Button } from "@/components/ui/button"
import Image from "next/image"
export default function LeetCodeRadial({ easy, medium, hard }) {
  const total = easy + medium + hard
  if (!total) return null

  const radius = 50   
  const stroke = 10  
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius

  const easyLen = (easy / total) * circumference
  const mediumLen = (medium / total) * circumference
  const hardLen = (hard / total) * circumference

  return (
    <div className="relative">
      <svg height={radius * 2} width={radius * 2}>
        
        <circle
          stroke="currentColor"
          className="text-zinc-200 dark:text-zinc-700"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="oklch(81.1% 0.111 293.571)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${easyLen} ${circumference}`}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        {/* MEDIUM */}
        <circle
          stroke="oklch(49.1% 0.27 292.581)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${mediumLen} ${circumference}`}
          strokeDashoffset={-easyLen}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        {/* HARD */}
        <circle
          stroke="oklch(28.3% 0.141 291.089)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${hardLen} ${circumference}`}
          strokeDashoffset={-(easyLen + mediumLen)}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>

      {/* center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-zinc-800 dark:text-white">
          {total}
        </span>
        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
          solved
          <div className="rounded-b-full ml-1">
            {"  "}
              <Image src="/icons8-tick.svg" alt="Tick" width={20} height={20} />
            </div>
        </span>
      </div>
    </div>
  )
}