"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { format, subDays, eachDayOfInterval, startOfDay, startOfWeek } from "date-fns"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HeatmapProps {
  data: { date: string; count: number; minutes: number }[]
  className?: string
}

export function Heatmap({ data, className }: HeatmapProps) {
  // Generate last year's days, aligned to start of week (Monday)
  const today = startOfDay(new Date())
  const startDate = startOfWeek(subDays(today, 364), { weekStartsOn: 1 })

  const allDays = eachDayOfInterval({
    start: startDate,
    end: today,
  })

  // Map intensity 0-4
  const getIntensity = (minutes: number) => {
    if (minutes === 0) return 0
    if (minutes < 30) return 1
    if (minutes < 60) return 2
    if (minutes < 120) return 3
    return 4
  }

  const getColorClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-sage-100/40 dark:bg-white/5"
      case 1:
        return "bg-sage-200"
      case 2:
        return "bg-sage-400"
      case 3:
        return "bg-sage-600"
      case 4:
        return "bg-sage-700"
      default:
        return "bg-muted"
    }
  }

  // Group days by week
  const weeks: Date[][] = []
  let currentWeek: Date[] = []

  allDays.forEach((day, i) => {
    currentWeek.push(day)
    if (currentWeek.length === 7 || i === allDays.length - 1) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  // Extract months for labels (only when a month starts in a week)
  const monthLabels: { label: string; index: number }[] = []
  weeks.forEach((week, i) => {
    const firstDay = week[0]
    if (firstDay.getDate() <= 7) {
      const label = format(firstDay, "MMM")
      if (!monthLabels.find((m) => m.label === label)) {
        monthLabels.push({ label, index: i })
      }
    }
  })

  const formatMinutes = (mins: number) => {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  return (
    <Card className={cn("overflow-hidden border border-white/40 bg-white/40 rounded-[32px] shade-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-sm font-bold flex items-center gap-2">Focus Intensity</CardTitle>
          <CardDescription className="text-[10px] uppercase tracking-widest font-bold opacity-60">Evolution of your digital forest</CardDescription>
        </div>
        <div className="flex items-center gap-2 bg-white/40 dark:bg-black/20 px-3 py-1.5 rounded-full border border-white/60 dark:border-white/10 shadow-sm">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Less</span>
          <div className="flex gap-[1.5px]">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={cn("w-2.5 h-2.5 rounded-[1.5px]", getColorClass(level))} />
            ))}
          </div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">More</span>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <div className="overflow-x-auto pb-4 pt-4 custom-scrollbar">
          <div className="flex flex-col gap-2 min-w-max">
            {/* Month Labels */}
            <div className="flex text-[9px] font-bold text-muted-foreground/60 h-4 relative">
              {monthLabels.map((m, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${m.index * 13.5 + 28}px` }} // Adjust for day labels width
                >
                  {m.label}
                </div>
              ))}
            </div>

            <div className="flex gap-[2.5px]">
              {/* Day Labels */}
              <div className="flex flex-col gap-[2.5px] pr-3 text-[9px] font-bold text-muted-foreground/40 pt-[1.5px] w-7">
                <div className="h-[11px] flex items-center">Mon</div>
                <div className="h-[11px] flex items-center"></div>
                <div className="h-[11px] flex items-center">Wed</div>
                <div className="h-[11px] flex items-center"></div>
                <div className="h-[11px] flex items-center">Fri</div>
                <div className="h-[11px] flex items-center"></div>
                <div className="h-[11px] flex items-center"></div>
              </div>

              <TooltipProvider delayDuration={0}>
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[2.5px]">
                    {week.map((day) => {
                      const dateStr = format(day, "yyyy-MM-dd")
                      const dayData = data.find((d) => d.date === dateStr)
                      const minutes = dayData?.minutes || 0
                      const level = getIntensity(minutes)

                      return (
                        <Tooltip key={dateStr}>
                          <TooltipTrigger asChild>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: weekIndex * 0.003 }}
                              className={cn(
                                "w-[11px] h-[11px] rounded-[1.5px] transition-all duration-200 hover:ring-2 hover:ring-sage-500/20 hover:scale-110 cursor-pointer z-0 hover:z-10",
                                getColorClass(level),
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            sideOffset={6}
                            className="bg-white dark:bg-black text-foreground border border-white/40 dark:border-white/10 shadow-none px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-none"
                          >
                            <span className="text-[10px] font-medium font-(family-name:--font-inter) text-muted-foreground">{format(day, "MMM d")}</span>
                            <span className="w-[1px] h-2.5 bg-foreground/10" />
                            <span className="text-[10px] font-bold font-(family-name:--font-outfit)">{formatMinutes(minutes)}</span>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
