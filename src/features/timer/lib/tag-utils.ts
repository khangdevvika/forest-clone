import { Session } from "@/features/timer/types/session"

export interface TagLevelInfo {
  level: number
  totalMinutes: number
  minutesToNextLevel: number | null
  progress: number
}

const LEVEL_THRESHOLDS = [
  0,      // Level 1
  300,    // Level 2 (5h)
  1200,   // Level 3 (20h)
  3000,   // Level 4 (50h)
  6000,   // Level 5 (100h)
]

export function getTagLevelInfo(tagId: string, sessions: Session[]): TagLevelInfo {
  const totalMinutes = sessions
    .filter((s) => s.tagId === tagId)
    .reduce((acc, s) => acc + s.durationMinutes, 0)

  let level = 1
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalMinutes >= LEVEL_THRESHOLDS[i]) {
      level = i + 1
      break
    }
  }

  const nextThreshold = LEVEL_THRESHOLDS[level] || null
  const currentThreshold = LEVEL_THRESHOLDS[level - 1]

  let progress = 100
  let minutesToNextLevel = null

  if (nextThreshold !== null) {
    const range = nextThreshold - currentThreshold
    const currentProgress = totalMinutes - currentThreshold
    progress = Math.min(100, Math.max(0, (currentProgress / range) * 100))
    minutesToNextLevel = nextThreshold - totalMinutes
  }

  return {
    level,
    totalMinutes,
    minutesToNextLevel,
    progress,
  }
}
