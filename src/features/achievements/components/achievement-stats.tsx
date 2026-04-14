"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

const gentleSpring = { type: "spring" as const, stiffness: 160, damping: 28 }

interface AchievementStatsProps {
  unlockedCount: number
  totalCount: number
}

export function AchievementStats({ unlockedCount, totalCount }: AchievementStatsProps) {
  const progress = (unlockedCount / totalCount) * 100

  return (
    <div className="mb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        {/* Left: hero text */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={gentleSpring}
            className="flex items-center gap-2.5 mb-4"
          >
            {/* iOS 26: Eco-island label chip */}
            <div
              className="eco-island flex items-center gap-2 px-3 py-1.5 rounded-2xl"
            >
              <Award className="w-3.5 h-3.5 text-primary" strokeWidth={1.25} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80">Hall of Fame</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.08, ...gentleSpring }}
            className="text-5xl md:text-6xl font-extralight text-foreground mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            Your Achievements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, ...gentleSpring }}
            className="text-muted-foreground font-light text-lg md:text-xl max-w-lg leading-relaxed"
          >
            Every focus session is a seed planted. These milestones are the trees that have flourished in your journey.
          </motion.p>
        </div>

        {/* Right: iOS 26 Spatial progress plate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.20, ...gentleSpring }}
          className="plate flex items-center gap-10 p-8 px-12 rounded-[2rem] relative overflow-hidden group"
        >
          {/* Rim light */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 40%, var(--rim-light) 60%, transparent)" }}
          />

          {/* Rotating ambient glow that changes with progress */}
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full translate-x-16 -translate-y-16 transition-colors duration-700 pointer-events-none"
            style={{ background: "var(--aura-primary)", filter: "blur(40px)" }}
          />

          {/* SVG progress ring */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            {/* Outer subtle glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 20px var(--aura-primary)`, opacity: 0.6 }}
            />
            <svg className="w-full h-full transform -rotate-90">
              {/* Track */}
              <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/25" />
              {/* Progress arc */}
              <motion.circle
                cx="48"
                cy="48"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="276.46"
                initial={{ strokeDashoffset: 276.46 }}
                animate={{ strokeDashoffset: 276.46 - (progress / 100) * 276.46 }}
                transition={{ duration: 2.2, ease: "circOut", delay: 0.3 }}
                className="text-primary"
                style={{ filter: "drop-shadow(0 0 4px var(--primary))" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, ...gentleSpring }}
                className="text-3xl font-light text-foreground"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {unlockedCount}
              </motion.span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-tight">/ {totalCount}</span>
            </div>
          </div>

          {/* Stats text */}
          <div className="space-y-2 relative z-10">
            <div className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-[0.2em]">Journey Progress</div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, ...gentleSpring }}
              className="text-5xl font-extralight text-foreground tracking-tighter"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {Math.round(progress)}
              <span className="text-2xl ml-0.5 opacity-60">%</span>
            </motion.div>
            {/* iOS 26: mini progress bar */}
            <div className="w-28 h-1 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--primary)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 2, ease: "circOut", delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
