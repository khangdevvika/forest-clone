"use client"

import { format, startOfDay } from "date-fns"
import { Leaf, Flame, Clock, Coins } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"
import { DayGroup } from "@/features/garden/components/day-group"
import { GardenEmpty } from "@/features/garden/components/garden-empty"
import { useGardenStats } from "@/features/garden/hooks/use-garden-stats"
import { motion } from "framer-motion"

export default function GardenPage() {
  const { sessions, streak, groupedDays, totalMinutes, totalHours, remainingMins, totalCoins, hasSession } = useGardenStats()

  return (
    <div className="relative h-full flex flex-col bg-background">
      {/* ── Updated Header with SidebarTrigger ────────────────── */}
      <PageHeader 
        title="My Garden" 
        subtitle={`${sessions.length} ${sessions.length === 1 ? "tree" : "trees"} planted`}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ y: -2 }}
            className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-xl px-3 py-1.5 shadow-sm"
          >
            <Flame className="h-3.5 w-3.5 text-orange-500" strokeWidth={2.5} />
            <span className="text-xs font-bold text-orange-700 tabular-nums">{streak}</span>
          </motion.div>
          <motion.div 
            whileHover={{ y: -2 }}
            className="flex items-center gap-1.5 bg-muted border border-border rounded-xl px-3 py-1.5 shadow-sm"
          >
            <Clock className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            <span className="text-xs font-bold text-secondary-foreground tabular-nums">
              {totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${totalMinutes}m`}
            </span>
          </motion.div>
        </div>
      </PageHeader>

      {/* ── Today banner ─────────────────────────── */}
      {hasSession && groupedDays[0]?.[0] === format(startOfDay(new Date()), "yyyy-MM-dd") && (
        <div className="max-w-2xl mx-auto w-full px-5 pt-6">
          <div className="flex items-center gap-3 bg-primary rounded-2xl px-5 py-4 shadow-lg shadow-primary/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground text-sm font-bold">You&apos;ve focused {groupedDays[0][1].reduce((sum, s) => sum + s.durationMinutes, 0)} minutes today 🌱</p>
              <p className="text-primary-foreground/75 text-[10px] uppercase font-bold tracking-wider mt-0.5">
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
          <div className="max-w-2xl mx-auto px-5 py-8 pb-32 space-y-10">
            {groupedDays.map(([dateKey, daySessions]) => (
              <DayGroup key={dateKey} dateKey={dateKey} sessions={daySessions} />
            ))}

            {/* Bottom stats summary */}
            <div className="border-t border-border pt-10 mt-10 grid grid-cols-3 gap-3">
              <div className="text-center group">
                <p className="text-2xl font-black text-foreground group-hover:scale-110 transition-transform">{sessions.length}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1.5">Planted</p>
              </div>
              <div className="text-center border-x border-border group">
                <p className="text-2xl font-black text-foreground group-hover:scale-110 transition-transform">{totalHours > 0 ? `${totalHours}h` : `${totalMinutes}m`}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1.5">Focus</p>
              </div>
              <div className="text-center group">
                <p className="text-2xl font-black text-foreground group-hover:scale-110 transition-transform">{totalCoins.toLocaleString()}</p>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <Coins className="h-3 w-3 text-yellow-500" strokeWidth={2.5} />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Earned</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
