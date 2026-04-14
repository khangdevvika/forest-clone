"use client"

import { motion } from "framer-motion"

interface LevelProgressProps {
  level: number
  xp: number
  maxXp: number
}

export function LevelProgress({ xp, maxXp }: LevelProgressProps) {
  const percentage = Math.min(100, Math.max(0, (xp / maxXp) * 100))

  return (
    <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden border border-border/50">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full bg-primary relative"
      >
        <div className="absolute inset-0 bg-white/20" />
      </motion.div>
    </div>
  )
}
