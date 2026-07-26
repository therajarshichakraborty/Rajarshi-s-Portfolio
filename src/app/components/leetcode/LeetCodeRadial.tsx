"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface LeetCodeRadialProps {
  easy: number;
  medium: number;
  hard: number;
}

export default function LeetCodeRadial({
  easy = 0,
  medium = 0,
  hard = 0
}: LeetCodeRadialProps) {
  const total = easy + medium + hard;
  const safeTotal = total || 1;

  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const easyLen = (easy / safeTotal) * circumference;
  const mediumLen = (medium / safeTotal) * circumference;
  const hardLen = (hard / safeTotal) * circumference;

  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]"
      >
        {/* TRACK */}
        <circle
          stroke="currentColor"
          className="text-zinc-200 dark:text-zinc-700/60"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* EASY */}
        <motion.circle
          className="stroke-[oklch(75%_0.14_290)] dark:stroke-violet-400 transition-all duration-300 hover:stroke-[oklch(82%_0.16_290)] dark:hover:stroke-violet-300"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${easyLen} ${circumference}` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />

        {/* MEDIUM */}
        <motion.circle
          className="stroke-[oklch(60%_0.18_295)] dark:stroke-violet-500 transition-all duration-300 hover:stroke-[oklch(67%_0.20_295)] dark:hover:stroke-violet-400"
          fill="transparent"
          strokeWidth={stroke}
          strokeDashoffset={-easyLen}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${mediumLen} ${circumference}` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        />

        {/* HARD */}
        <motion.circle
          className="stroke-[oklch(30%_0.24_305)] dark:stroke-violet-700 transition-all duration-300 hover:stroke-[oklch(37%_0.26_305)] dark:hover:stroke-violet-600"
          fill="transparent"
          strokeWidth={stroke}
          strokeDashoffset={-(easyLen + mediumLen)}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${hardLen} ${circumference}` }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        />
      </svg>

      {/* center text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.span
          className="text-sm font-bold text-zinc-800 dark:text-white"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {total}
        </motion.span>
        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-0.5">
          solved
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 350, delay: 0.7 }}
            whileHover={{ rotate: [0, -12, 12, 0] }}
            className="inline-block"
          >
            <Image src="/icons8-tick.svg" alt="Tick" width={14} height={14} />
          </motion.div>
        </span>
      </motion.div>
    </motion.div>
  );
}
