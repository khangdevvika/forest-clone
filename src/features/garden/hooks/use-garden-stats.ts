import { useMemo } from "react"
import { format, parseISO, startOfDay } from "date-fns"
import { useUser } from "@/hooks/use-user"
import type { Session } from "@/features/timer/types/session"

export function useGardenStats() {
  const { sessions, streak } = useUser()

  const groupedDays = useMemo(() => {
    const map: Record<string, Session[]> = {}
    for (const s of sessions) {
      const key = format(startOfDay(parseISO(s.completedAt)), "yyyy-MM-dd")
      map[key] = map[key] ? [...map[key], s] : [s]
    }
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a))
  }, [sessions])

  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0)
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60
  const totalCoins = sessions.reduce((sum, s) => sum + s.coinsEarned, 0)

  return {
    sessions,
    streak,
    groupedDays,
    totalMinutes,
    totalHours,
    remainingMins,
    totalCoins,
    hasSession: sessions.length > 0,
  }
}
