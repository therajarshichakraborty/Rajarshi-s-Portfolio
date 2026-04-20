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
        
        {/* TRACK */}
<circle
  stroke="currentColor"
  className="text-zinc-200 dark:text-zinc-700"
  fill="transparent"
  strokeWidth={stroke}
  r={normalizedRadius}
  cx={radius}
  cy={radius}
/>

{/* EASY */}
<circle
  className="stroke-[#d2ee9a] dark:stroke-violet-400"
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
  className="stroke-[#2fb344] dark:stroke-violet-500"
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
  className="stroke-[#1f7a34] dark:stroke-violet-700"
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