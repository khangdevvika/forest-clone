"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

const gentleSpring = { type: "spring" as const, stiffness: 180, damping: 28 }
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { ...gentleSpring } },
} as const

interface AchievementStatsProps {
  unlockedCount: number
  totalCount: number
}

export function AchievementStats({ unlockedCount, totalCount }: AchievementStatsProps) {
  const progress = (unlockedCount / totalCount) * 100

  return (
    <div className="mb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2.5 mb-4">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Award className="w-4 h-4" strokeWidth={1.25} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80">Hall of Fame</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, ...gentleSpring }}
            className="text-5xl md:text-6xl font-[family-name:var(--font-outfit)] font-extralight text-foreground mb-4 tracking-tight"
          >
            Your Achievements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-light text-lg md:text-xl max-w-lg leading-relaxed"
          >
            Every focus session is a seed planted. These milestones are the trees that have flourished in your journey.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, ...scaleIn.show.transition }}
          className="flex items-center gap-10 p-8 px-12 rounded-3xl bg-card/60 border border-primary/20 backdrop-blur-md relative overflow-hidden group shadow-2xl shadow-primary/5"
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted/20" />
              <motion.circle
                cx="48"
                cy="48"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="276.46"
                initial={{ strokeDashoffset: 276.46 }}
                animate={{ strokeDashoffset: 276.46 - (progress / 100) * 276.46 }}
                transition={{ duration: 2, ease: "circOut" }}
                className="text-primary"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-[family-name:var(--font-outfit)] font-light text-foreground">{unlockedCount}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-tighter">/ {totalCount}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-[0.2em]">Journey Progress</div>
            <div className="text-5xl font-[family-name:var(--font-outfit)] font-extralight text-foreground tracking-tighter">
              {Math.round(progress)}
              <span className="text-2xl ml-0.5 opacity-70">%</span>
            </div>
          </div>

          {/* Dynamic background light */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full translate-x-12 -translate-y-12 group-hover:bg-primary/20 transition-colors duration-700" />
        </motion.div>
      </div>
    </div>
  )
}
