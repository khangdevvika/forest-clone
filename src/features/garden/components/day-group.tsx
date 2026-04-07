"use client"

import { Coins } from "lucide-react"
import { format, isToday, isYesterday, parseISO } from "date-fns"
import { SessionCard } from "@/features/garden/components/session-card"
import type { Session } from "@/features/timer/types/session"

interface DayGroupProps {
  dateKey: string
  sessions: Session[]
}

export function DayGroup({ dateKey, sessions }: DayGroupProps) {
  const date = parseISO(dateKey)
  const label = isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "EEEE, MMM d")
  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0)
  const totalCoins = sessions.reduce((sum, s) => sum + s.coinsEarned, 0)

  return (
    <section className="space-y-2">
      {/* Day header */}
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-sm font-semibold text-secondary-foreground">{label}</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{totalMinutes} min</span>
          <div className="flex items-center gap-1">
            <Coins className="h-3 w-3 text-yellow-500" />
            <span className="text-xs font-medium text-muted-foreground">{totalCoins}</span>
          </div>
        </div>
      </div>

      {/* Session cards */}
      <div className="space-y-2">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </section>
  )
}
