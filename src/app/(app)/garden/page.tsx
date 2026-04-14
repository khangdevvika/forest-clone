"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"
import { DayGroup } from "@/features/garden/components/day-group"
import { GardenEmpty } from "@/features/garden/components/garden-empty"
import { GardenTabs } from "@/features/garden/components/garden-tabs"
import { VisualGarden } from "@/features/garden/components/visual-garden"
import { SpeciesLegend } from "@/features/garden/components/species-legend"
import { StatsContent } from "@/features/stats/components/StatsContent"
import { useGardenStats } from "@/features/garden/hooks/use-garden-stats"
import { useGardenView } from "@/features/garden/hooks/use-garden-view"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Clock, Coins, Info, BarChart2 } from "lucide-react"

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
        <div className="max-w-4xl mx-auto pb-32">
          {/* Main Section */}
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="px-5 pt-4 space-y-12">
            {/* Navigation Tabs */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <GardenTabs />
            </motion.div>

            {/* Main Visual/Content */}
            <AnimatePresence mode="wait">
              {!hasSession ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GardenEmpty />
                </motion.div>
              ) : (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                    {/* Summary Box & Layout */}
                    <motion.div variants={fadeUp} layout className="bg-card/30 border border-border/50 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                      <div className="flex items-center justify-between mb-8">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Focus Duration ({timeRange})</p>
                          <p className="text-5xl font-(family-name:--font-outfit) font-light text-primary">{totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${totalMinutes}m`}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-primary" strokeWidth={1.25} />
                        </div>
                      </div>

                      {/* View Switcher Content */}
                      {viewMode === "Grid" ? (
                        <VisualGarden />
                      ) : (
                        <div className="space-y-8 mt-4 pt-8 border-t border-border/20">
                          {groupedDays.map(([dateKey, daySessions]) => (
                            <DayGroup key={dateKey} dateKey={dateKey} sessions={daySessions} />
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Stats & Analytics Integration */}
                    <motion.div variants={fadeUp} className="space-y-8">
                      <div className="flex items-center gap-3 px-1">
                        <BarChart2 className="w-4 h-4 text-primary" strokeWidth={1.5} />
                        <h4 className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] opacity-80">Insights & Growth</h4>
                        <div className="h-px flex-1 bg-border/20" />
                      </div>

                      <StatsContent sessions={sessions} />
                    </motion.div>
                  </div>

                  {/* Species Insights */}
                  <motion.div variants={fadeUp} className="px-1">
                    <SpeciesLegend />
                  </motion.div>

                  {/* Success Rate Info (Conceptual) */}
                  <motion.div variants={fadeUp} className="bg-muted/30 border border-border/40 rounded-2xl p-4 flex gap-3 items-start">
                    <Info className="h-4 w-4 text-muted-foreground mt-0.5" strokeWidth={1.25} />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your forest grows healthier as you stick to your focus goals. Activity data shown is filtered for the selected {timeRange.toLowerCase()}.
                    </p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  )
}
