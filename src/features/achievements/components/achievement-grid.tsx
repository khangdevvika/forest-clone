"use client"

import { useAchievements } from "@/features/achievements/hooks/use-achievements"
import { AchievementCard } from "@/features/achievements/components/achievement-card"
import { AchievementCategory } from "@/features/achievements/constants/achievements"
import { motion } from "framer-motion"

const categoryLabels: Record<AchievementCategory, string> = {
  efficiency: "Focus & Efficiency",
  consistency: "Rhythm & Continuity",
  collection: "Nature's Abundance",
  special: "Mysteries & Milestones",
}

const spring = { type: "spring" as const, stiffness: 280, damping: 22 }
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { ...spring } },
} as const

export function AchievementGrid() {
  const { achievements, unlockedIds } = useAchievements()

  const categories: AchievementCategory[] = ["efficiency", "consistency", "collection", "special"]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-12 pb-32">
      {categories.map((cat) => {
        const catAchievements = achievements.filter((a) => a.category === cat)
        if (catAchievements.length === 0) return null

        return (
          <motion.section key={cat} variants={fadeUp} className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <h4 className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] opacity-80">{categoryLabels[cat]}</h4>
              <div className="h-px flex-1 bg-border/20" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
              {catAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} isUnlocked={unlockedIds.includes(achievement.id)} />
              ))}
            </div>
          </motion.section>
        )
      })}
    </motion.div>
  )
}
