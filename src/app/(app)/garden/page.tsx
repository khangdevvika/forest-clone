"use client"

import { format, startOfDay } from "date-fns"
import { Leaf, Flame, Clock, Coins } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DayGroup } from "@/features/garden/components/day-group"
import { GardenEmpty } from "@/features/garden/components/garden-empty"
import { useGardenStats } from "@/features/garden/hooks/use-garden-stats"

export default function GardenPage() {
  const { sessions, streak, groupedDays, totalMinutes, totalHours, remainingMins, totalCoins, hasSession } = useGardenStats()

  return (
    <div className="relative h-full flex flex-col bg-gray-50">
      {/* ── Header ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-none">My Garden</h1>
            <p className="text-[10px] text-green-600 font-semibold uppercase tracking-widest mt-0.5">
              {sessions.length} {sessions.length === 1 ? "tree" : "trees"} planted
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1.5">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs font-semibold text-orange-700 tabular-nums">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 rounded-lg px-2.5 py-1.5">
              <Clock className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs font-semibold text-green-700 tabular-nums">{totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${totalMinutes}m`}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Today banner ─────────────────────────── */}
      {hasSession && groupedDays[0]?.[0] === format(startOfDay(new Date()), "yyyy-MM-dd") && (
        <div className="max-w-2xl mx-auto w-full px-5 pt-5">
          <div className="flex items-center gap-3 bg-green-600 rounded-xl px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">You&apos;ve focused {groupedDays[0][1].reduce((sum, s) => sum + s.durationMinutes, 0)} minutes today 🌱</p>
              <p className="text-green-200 text-xs mt-0.5">
                {groupedDays[0][1].length} {groupedDays[0][1].length === 1 ? "session" : "sessions"} completed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Content ────────────────────────────────── */}
      {!hasSession ? (
        <GardenEmpty />
      ) : (
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto px-5 py-5 pb-24 space-y-6">
            {groupedDays.map(([dateKey, daySessions]) => (
              <DayGroup key={dateKey} dateKey={dateKey} sessions={daySessions} />
            ))}

            {/* Bottom stats summary */}
            <div className="border-t border-gray-200 pt-6 mt-6 grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
                <p className="text-xs text-gray-400 mt-0.5">Trees Planted</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{totalHours > 0 ? `${totalHours}h` : `${totalMinutes}m`}</p>
                <p className="text-xs text-gray-400 mt-0.5">Focus Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{totalCoins.toLocaleString()}</p>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <Coins className="h-3 w-3 text-yellow-500" />
                  <p className="text-xs text-gray-400">Coins Earned</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
