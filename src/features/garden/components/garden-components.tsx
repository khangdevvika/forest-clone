"use client"

import Image from "next/image"
import Link from "next/link"
import { Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { Session } from "@/features/timer/types/session"
import { format, isToday, isYesterday, parseISO } from "date-fns"

interface SessionCardProps {
  session: Session
}

export function SessionCard({ session }: SessionCardProps) {
  const time = format(parseISO(session.completedAt), "HH:mm")

  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-green-200 hover:shadow-sm transition-all duration-150">
      {/* Tree thumbnail */}
      <div className="shrink-0 w-12 h-12 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center overflow-hidden">
        <Image
          src={session.treeImage}
          alt={session.treeName}
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          unoptimized={session.treeImage.startsWith("http")}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">{session.treeName}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">{session.durationMinutes} min</span>
          <span className="text-gray-200 text-xs">·</span>
          <div className="flex items-center gap-1">
            <Coins className="h-3 w-3 text-yellow-500" />
            <span className="text-xs font-medium text-gray-600">{session.coinsEarned}</span>
          </div>
        </div>
      </div>

      {/* Time */}
      <span className="shrink-0 text-xs text-gray-400 tabular-nums">{time}</span>
    </div>
  )
}

// ── Day group label ───────────────────────────────────────────
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
        <h2 className="text-sm font-semibold text-gray-700">{label}</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{totalMinutes} min</span>
          <div className="flex items-center gap-1">
            <Coins className="h-3 w-3 text-yellow-500" />
            <span className="text-xs font-medium text-gray-500">{totalCoins}</span>
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

// ── Empty state ───────────────────────────────────────────────
export function GardenEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="text-6xl mb-4 select-none">🌱</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">Your garden is empty</h3>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
        Complete a focus session to plant your first tree. Your forest grows with every minute of focus.
      </p>
      <Link href="/" className="mt-6">
        <button
          id="garden-start-btn"
          className={cn(
            "h-10 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold",
            "transition-colors duration-150 cursor-pointer",
          )}
        >
          Start focusing →
        </button>
      </Link>
    </div>
  )
}
