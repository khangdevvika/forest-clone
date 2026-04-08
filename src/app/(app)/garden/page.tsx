"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"
import { DayGroup } from "@/features/garden/components/day-group"
import { GardenEmpty } from "@/features/garden/components/garden-empty"
import { GardenTabs } from "@/features/garden/components/garden-tabs"
import { GardenGrid } from "@/features/garden/components/garden-grid"
import { SpeciesLegend } from "@/features/garden/components/species-legend"
import { useGardenStats } from "@/features/garden/hooks/use-garden-stats"
import { useGardenView } from "@/features/garden/hooks/use-garden-view"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Clock, Coins, Info } from "lucide-react"

const spring = { type: "spring", stiffness: 280, damping: 22 } as const
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { ...spring } },
}

export default function GardenPage() {
  const { sessions, streak, groupedDays, totalMinutes, totalHours, remainingMins, totalCoins, hasSession } = useGardenStats()
  const { viewMode, timeRange } = useGardenView()

  return (
    <div className="relative h-full flex flex-col bg-background zen-bg overflow-hidden">
      <PageHeader title="My Forest" subtitle={`${sessions.length} trees grown`}>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 bg-card/50 border border-border/50 rounded-xl px-2.5 py-1.5 shadow-sm">
            <Flame className="h-3.5 w-3.5 text-orange-500" strokeWidth={1.5} />
            <span className="text-xs font-bold tabular-nums">{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-card/50 border border-border/50 rounded-xl px-2.5 py-1.5 shadow-sm">
            <Coins className="h-3.5 w-3.5 text-yellow-500" strokeWidth={1.5} />
            <span className="text-xs font-bold tabular-nums">{totalCoins}</span>
          </div>
        </div>
      </PageHeader>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-xl mx-auto pb-32">
          {/* Main Section */}
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="px-5 pt-4 space-y-6">
            {/* Navigation Tabs */}
            <motion.div variants={fadeUp}>
              <GardenTabs />
            </motion.div>

            {/* Main Visual/Content */}
            <AnimatePresence mode="wait">
              {!hasSession ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GardenEmpty />
                </motion.div>
              ) : (
                <motion.div key={`${viewMode}-${timeRange}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={spring} className="space-y-10">
                  {/* Summary Box */}
                  <div className="bg-card/30 border border-border/50 rounded-3xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Focus Duration</p>
                        <p className="text-4xl font-[family-name:var(--font-outfit)] font-light text-primary">{totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${totalMinutes}m`}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" strokeWidth={1.25} />
                      </div>
                    </div>

                    {/* View Switcher Content */}
                    {viewMode === "Grid" ? (
                      <GardenGrid />
                    ) : (
                      <div className="space-y-8 mt-4">
                        {groupedDays.map(([dateKey, daySessions]) => (
                          <DayGroup key={dateKey} dateKey={dateKey} sessions={daySessions} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Species Insights */}
                  <div className="px-1">
                    <SpeciesLegend />
                  </div>

                  {/* Success Rate Info (Conceptual) */}
                  <div className="bg-muted/30 border border-border/40 rounded-2xl p-4 flex gap-3 items-start">
                    <Info className="h-4 w-4 text-muted-foreground mt-0.5" strokeWidth={1.25} />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your forest grows healthier as you stick to your focus goals. Success rate is calculated based on completed versus abandoned sessions.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  )
}
