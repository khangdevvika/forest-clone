"use client"

import { AchievementStats } from "@/features/achievements/components/achievement-stats"
import { AchievementGrid } from "@/features/achievements/components/achievement-grid"
import { useAchievements } from "@/features/achievements/hooks/use-achievements"

export default function AchievementsPage() {
  const { unlockedIds, achievements } = useAchievements()

  return (
    <div className="h-full overflow-y-auto no-scrollbar scroll-smooth relative">
      {/* iOS 26: Multi-layer ambient aura background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Primary top-left glow */}
        <div
          className="absolute top-[5%] left-[-12%] w-[50%] h-[50%] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--aura-primary) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.6,
          }}
        />
        {/* Secondary bottom-right glow */}
        <div
          className="absolute bottom-[5%] right-[-8%] w-[40%] h-[40%] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--aura-accent) 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.45,
          }}
        />
        {/* Subtle center glow */}
        <div
          className="absolute top-[40%] left-[30%] w-[35%] h-[35%] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--aura-primary) 0%, transparent 70%)",
            filter: "blur(120px)",
            opacity: 0.20,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8 md:py-16">
        <AchievementStats
          unlockedCount={unlockedIds.length}
          totalCount={achievements.length}
        />
        <AchievementGrid />
      </div>
    </div>
  )
}
