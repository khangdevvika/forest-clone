"use client"

import { AchievementStats } from "@/features/achievements/components/achievement-stats"
import { AchievementGrid } from "@/features/achievements/components/achievement-grid"
import { useAchievements } from "@/features/achievements/hooks/use-achievements"

export default function AchievementsPage() {
  const { unlockedIds, achievements } = useAchievements()
  
  return (
    <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
      {/* Background Zen Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-warm-500/5 blur-[100px] rounded-full" />
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
