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

// iOS 26: Weighted spring — slow entry, high damping for premium feel
const gentleSpring = { type: "spring", stiffness: 160, damping: 28 } as const
const spring = { type: "spring", stiffness: 280, damping: 22 } as const

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...gentleSpring } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { ...gentleSpring } },
}

export default function GardenPage() {
  const { sessions, streak, groupedDays, totalMinutes, totalHours, remainingMins, totalCoins, hasSession } = useGardenStats()
  const { viewMode, timeRange } = useGardenView()

  return (
    <div className="relative h-full flex flex-col bg-background zen-bg overflow-hidden">
      {/* iOS 26: Page-level aura blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, var(--aura-primary) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, var(--aura-accent) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      <PageHeader title="My Forest" subtitle={`${sessions.length} trees grown`}>
        <div className="flex gap-2">
          {/* iOS 26: Eco-Island stat chips */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="eco-island flex items-center gap-1.5 rounded-2xl px-3 py-2"
          >
            <Flame className="h-3.5 w-3.5 text-orange-500" strokeWidth={1.5} />
            <span className="text-xs font-bold tabular-nums">{streak}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="eco-island flex items-center gap-1.5 rounded-2xl px-3 py-2"
          >
            <Coins className="h-3.5 w-3.5 text-yellow-500" strokeWidth={1.5} />
            <span className="text-xs font-bold tabular-nums">{totalCoins}</span>
          </motion.div>
        </div>
      </PageHeader>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto pb-32">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="px-5 pt-4 space-y-10">
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
                <motion.div key="content" variants={fadeUp} className="space-y-10">
                  {/* iOS 26: Primary Plate — Focus Duration + Visual */}
                  <motion.div
                    variants={scaleIn}
                    layout
                    className="plate rounded-[2rem] p-8 relative overflow-hidden"
                  >
                    {/* Rim light stripe */}
                    <div
                      className="absolute inset-x-0 top-0 h-px pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 40%, var(--rim-light) 60%, transparent)" }}
                    />

                    {/* Aura glow behind card */}
                    <div
                      className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-60 pointer-events-none"
                      style={{ background: "radial-gradient(circle, var(--aura-primary) 0%, transparent 70%)", filter: "blur(30px)" }}
                    />

                    <div className="flex items-start justify-between mb-8 relative z-10">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.28em]">
                          Focus Duration · {timeRange}
                        </p>
                        <p
                          className="text-5xl font-light text-primary leading-none"
                          style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
                        >
                          {totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${totalMinutes}m`}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={spring}
                        className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          background: "var(--aura-primary)",
                          border: "1px solid var(--rim-light)",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        <Clock className="h-5 w-5 text-primary" strokeWidth={1.25} />
                      </motion.div>
                    </div>

                    {/* View Switcher Content */}
                    <div className="relative z-10">
                      {viewMode === "Grid" ? (
                        <VisualGarden />
                      ) : (
                        <div className="space-y-8 mt-4 pt-8 border-t border-border/20">
                          {groupedDays.map(([dateKey, daySessions]) => (
                            <DayGroup key={dateKey} dateKey={dateKey} sessions={daySessions} />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* iOS 26: Stats Plate — secondary altitude, subtle */}
                  <motion.div variants={fadeUp} className="space-y-6">
                    <div className="flex items-center gap-3 px-1">
                      <BarChart2 className="w-4 h-4 text-primary" strokeWidth={1.25} />
                      <h4 className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] opacity-70">
                        Insights & Growth
                      </h4>
                      <div className="h-px flex-1 bg-border/20" />
                    </div>

                    {/* iOS 26: plate-subtle for secondary section */}
                    <div className="plate-subtle rounded-[1.75rem] p-6 overflow-hidden relative">
                      <div
                        className="absolute inset-x-0 top-0 h-px pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 50%, transparent)" }}
                      />
                      <StatsContent sessions={sessions} />
                    </div>
                  </motion.div>

                  {/* Species Insights */}
                  <motion.div variants={fadeUp} className="px-1">
                    <SpeciesLegend />
                  </motion.div>

                  {/* iOS 26: Info chip — minimal, floating style */}
                  <motion.div
                    variants={fadeUp}
                    className="eco-island rounded-2xl p-4 flex gap-3 items-start"
                  >
                    <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={1.25} />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your forest grows healthier as you stick to your focus goals. Activity data shown is filtered for the selected{" "}
                      <span className="text-primary font-medium">{timeRange.toLowerCase()}</span>.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  )
}
