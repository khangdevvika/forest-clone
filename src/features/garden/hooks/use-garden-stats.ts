import { useMemo } from "react"
import { format, parseISO, startOfDay, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import { useUser } from "@/hooks/use-user"
import type { Session } from "@/features/timer/types/session"
import { useGardenView } from "./use-garden-view"

export function useGardenStats() {
  const { sessions, streak } = useUser()
  const { timeRange } = useGardenView()

  const filteredSessions = useMemo(() => {
    const now = new Date()
    let start: Date
    let end: Date = now

    switch(timeRange) {
      case "Day":
        start = startOfDay(now)
        break
      case "Week":
        start = startOfWeek(now, { weekStartsOn: 1 })
        end = endOfWeek(now, { weekStartsOn: 1 })
        break
      case "Month":
        start = startOfMonth(now)
        end = endOfMonth(now)
        break
      case "Year":
        start = startOfYear(now)
        end = endOfYear(now)
        break
      default:
        return sessions
    }

    return sessions.filter(s => {
      const date = parseISO(s.completedAt)
      return isWithinInterval(date, { start, end })
    })
  }, [sessions, timeRange])

  const groupedDays = useMemo(() => {
    const map: Record<string, Session[]> = {}
    for (const s of filteredSessions) {
      const key = format(startOfDay(parseISO(s.completedAt)), "yyyy-MM-dd")
      map[key] = map[key] ? [...map[key], s] : [s]
    }
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a))
  }, [filteredSessions])

  const totalMinutes = filteredSessions.reduce((sum, s) => sum + s.durationMinutes, 0)
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60
  const totalCoins = filteredSessions.reduce((sum, s) => sum + s.coinsEarned, 0)

  return {
    sessions: filteredSessions,
    allSessions: sessions,
    streak,
    groupedDays,
    totalMinutes,
    totalHours,
    remainingMins,
    totalCoins,
    hasSession: sessions.length > 0,
    hasFilteredSession: filteredSessions.length > 0,
  }
}
