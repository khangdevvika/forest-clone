"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { format, startOfWeek, endOfWeek } from "date-fns"
import { TAGS } from "@/features/timer/constants/tags"
import { getWeeklyData, getTagDistribution, exportToCSV, exportToJSON } from "@/features/stats/lib/data-utils"
import { Heatmap } from "@/features/stats/components/heatmap"
import { scaleIn } from "@/lib/animations"
import { Clock, Tag as TagIcon, Download } from "lucide-react"
import { Session } from "@/features/timer/types/session"

interface StatsContentProps {
  sessions: Session[]
}

const formatMinutes = (mins: number) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

interface CustomTooltipProps {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/90 border border-border/50 px-4 py-3 rounded-2xl shadow-xl ring-1 ring-black/5">
        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1.5">{label}</p>
        <p className="text-[16px] font-semibold font-[family-name:var(--font-outfit)] text-foreground">
          {formatMinutes(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}

export function StatsContent({ sessions }: StatsContentProps) {
  // Use current week for the bar chart as it's designed for weekly view
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

  const weeklyData = getWeeklyData(sessions, { start: weekStart, end: weekEnd })
  const tagData = getTagDistribution(sessions, TAGS)
  const heatmapData =
    sessions.length > 0
      ? Array.from(new Set(sessions.map((s) => format(new Date(s.completedAt), "yyyy-MM-dd")))).map((date) => ({
          date,
          count: sessions.filter((s) => format(new Date(s.completedAt), "yyyy-MM-dd") === date).length,
          minutes: sessions.filter((s) => format(new Date(s.completedAt), "yyyy-MM-dd") === date).reduce((acc, s) => acc + s.durationMinutes, 0),
        }))
      : []

  const allTimeMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0)

  if (sessions.length === 0) return null

  return (
    <div className="space-y-10">
      {/* Main Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Bar Chart - 3 cols */}
        <motion.div variants={scaleIn} className="lg:col-span-3 bg-card/45 border border-border/50 rounded-[32px] p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.25} />
                Focus Distribution
              </h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Time spent across sessions</p>
            </div>
          </div>

          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: "var(--cream-600)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: "var(--cream-600)" }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--primary)", opacity: 0.05 }} />
                <Bar dataKey="minutes" radius={[12, 12, 12, 12]} fill="var(--primary)" barSize={32} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart - 2 cols */}
        <motion.div variants={scaleIn} className="lg:col-span-2 bg-card/45 border border-border/50 rounded-[32px] p-8 flex flex-col">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-8">
            <TagIcon className="w-4 h-4" strokeWidth={1.25} />
            Category Breakdown
          </h4>

          <div className="h-[230px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tagData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value" animationDuration={1500}>
                  {tagData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Selected</span>
              <span className="text-xl font-light font-[family-name:var(--font-outfit)]">{formatMinutes(allTimeMinutes)}</span>
            </div>
          </div>

          <div className="mt-auto space-y-2.5">
            {tagData.slice(0, 3).map((tag, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }} />
                  <span className="text-xs font-medium text-muted-foreground">{tag.name}</span>
                </div>
                <span className="text-xs font-bold text-foreground">{formatMinutes(tag.value)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Heatmap Section */}
      <motion.section variants={scaleIn}>
        <Heatmap data={heatmapData} />
      </motion.section>

      {/* Export Section */}
      <section className="flex items-center justify-between bg-card/45 border border-border/50 rounded-[32px] p-6 px-10">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Download className="w-4 h-4" strokeWidth={1.25} />
            Export Growth
          </h4>
          <p className="text-xs text-muted-foreground">Take these results with you.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => exportToCSV(sessions)} className="px-6 py-2 rounded-xl border border-border/50 text-[10px] font-bold uppercase tracking-widest hover:bg-card/50 transition-colors">
            CSV
          </button>
          <button onClick={() => exportToJSON(sessions)} className="px-6 py-2 rounded-xl border border-border/50 text-[10px] font-bold uppercase tracking-widest hover:bg-card/50 transition-colors">
            JSON
          </button>
        </div>
      </section>
    </div>
  )
}
