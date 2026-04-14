import { useAtomValue } from "jotai"
import { sessionsAtom, streakAtom, unlockedTreesAtom } from "@/features/timer/store"
import { tasksAtom } from "@/features/tasks/store/tasks.atoms"
import { ACHIEVEMENTS, AchievementStats } from "@/features/achievements/constants/achievements"

export function useAchievements() {
  const sessions = useAtomValue(sessionsAtom)
  const streak = useAtomValue(streakAtom)
  const unlockedTrees = useAtomValue(unlockedTreesAtom)
  const tasks = useAtomValue(tasksAtom)

  const stats: AchievementStats = {
    totalMinutes: sessions.reduce((acc, s) => acc + s.durationMinutes, 0),
    totalSessions: sessions.length,
    bestStreak: streak,
    ownedTrees: unlockedTrees.length,
    completedTasks: tasks.filter((t) => t.isCompleted).length,
    longestSessionMinutes: Math.max(0, ...sessions.map((s) => s.durationMinutes)),
  }

  const unlockedIds = ACHIEVEMENTS.filter((a) => a.requirement(stats)).map((a) => a.id)

  return {
    achievements: ACHIEVEMENTS,
    unlockedIds,
    stats,
  }
}
