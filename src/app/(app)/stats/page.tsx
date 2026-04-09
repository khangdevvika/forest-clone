"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useAtomValue } from "jotai"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts"
import { format, startOfWeek, endOfWeek, subWeeks, addWeeks } from "date-fns"
import { 
  sessionsAtom 
} from "@/features/timer/store"
import { TAGS } from "@/features/timer/constants/tags"
import { 
  getWeeklyData, 
  getTagDistribution, 
  getPeakFocusTimes,
  getLongestSession,
  getComparisonData,
  getYearlyHeatmapData,
  exportToCSV,
  exportToJSON
} from "@/features/stats/lib/data-utils"
import { Heatmap } from "@/features/stats/components/heatmap"
import { PageHeader } from "@/components/page-header"
import { 
  staggerContainer, 
  fadeUp, 
  scaleIn, 
  spring 
} from "@/lib/animations"
import { 
  Clock, 
  TrendingUp, 
  Tag as TagIcon, 
  ChevronLeft, 
  ChevronRight,
  History,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Trees
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function StatsPage() {
  const sessions = useAtomValue(sessionsAtom)
  const [currentDate, setCurrentDate] = React.useState(new Date())

  // Calculate ranges
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })

  // Data processing
  const weeklyData = getWeeklyData(sessions, { start: weekStart, end: weekEnd })
  const tagData = getTagDistribution(sessions, TAGS)
  const peakData = getPeakFocusTimes(sessions)
  const longestSession = getLongestSession(sessions)
  const comparisonData = getComparisonData(sessions, { start: weekStart, end: weekEnd })
  const heatmapData = getYearlyHeatmapData(sessions)
  
  const totalMinutes = weeklyData.reduce((acc, d) => acc + d.minutes, 0)
  const allTimeMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0)
  
  const formatMinutes = (mins: number) => {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/45 border border-white/60 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl shadow-black/5 ring-1 ring-black/5">
          <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">{label}</p>
          <p className="text-sm font-bold text-foreground">{formatMinutes(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 zen-bg min-h-screen">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto flex flex-col gap-10"
      >
        <PageHeader 
          title="Forest Stats" 
          description="Your focus journey, visualized through the lens of growth."
        />

        {/* Weekly Summary Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} className="bg-white/35 border border-white/50 backdrop-blur-sm rounded-3xl p-6 flex flex-col gap-1 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                <Clock className="w-20 h-20" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">This Week</span>
             <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-light font-(family-name:--font-outfit) text-foreground">{formatMinutes(totalMinutes)}</h3>
                <div className={cn(
                  "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full select-none",
                  comparisonData.trend === 'up' ? "text-emerald-600 bg-emerald-500/10" : "text-amber-600 bg-amber-500/10"
                )}>
                  {comparisonData.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {Math.abs(comparisonData.percentage)}%
                </div>
             </div>
             <p className="text-xs text-muted-foreground mt-2">Daily average: {formatMinutes(Math.round(totalMinutes / 7))}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white/35 border border-white/50 backdrop-blur-sm rounded-3xl p-6 flex flex-col gap-1 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                <History className="w-20 h-20" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">All Time</span>
             <h3 className="text-3xl font-light font-(family-name:--font-outfit) text-foreground">{formatMinutes(allTimeMinutes)}</h3>
             <p className="text-xs text-muted-foreground mt-2">{sessions.length} sessions completed</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white/35 border border-white/50 backdrop-blur-sm rounded-3xl p-6 flex flex-col gap-1 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                <Trees className="w-20 h-20" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Deepest Root</span>
             <h3 className="text-3xl font-light font-(family-name:--font-outfit) text-foreground">
                {longestSession ? formatMinutes(longestSession.durationMinutes) : '0m'}
             </h3>
             <p className="text-xs text-muted-foreground mt-2">
               {longestSession ? `Focused on ${longestSession.treeName}` : 'No sessions recorded'}
             </p>
          </motion.div>
        </section>

        {/* Main Charts Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Bar Chart - 3 cols */}
          <motion.div variants={scaleIn} className="lg:col-span-3 bg-white/35 border border-white/50 backdrop-blur-sm rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" strokeWidth={1.25} />
                  Focus Time
                </h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                  {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
                  className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
                  className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(107, 143, 107, 0.1)" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--cream-600)' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--cream-600)' }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.15)' }} />
                  <Bar 
                    dataKey="minutes" 
                    radius={[12, 12, 12, 12]} 
                    fill="var(--sage-500)" 
                    barSize={32}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Donut Chart - 2 cols */}
          <motion.div variants={scaleIn} className="lg:col-span-2 bg-white/35 border border-white/50 backdrop-blur-sm rounded-[32px] p-8 flex flex-col">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-8">
              <TagIcon className="w-4 h-4" strokeWidth={1.25} />
              Category Breakdown
            </h4>

            <div className="h-[230px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tagData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {tagData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total</span>
                 <span className="text-xl font-light font-(family-name:--font-outfit)">{formatMinutes(allTimeMinutes)}</span>
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
        <section className="flex items-center justify-between bg-white/35 border border-white/50 backdrop-blur-sm rounded-[32px] p-6">
            <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Download className="w-4 h-4" strokeWidth={1.25} />
                    Export Your Growth
                </h4>
                <p className="text-xs text-muted-foreground">Take your focus data with you in CSV or JSON format.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => exportToCSV(sessions)}
                  className="px-4 py-2 rounded-xl border border-white/60 text-[10px] font-bold uppercase tracking-widest hover:bg-white/40 transition-colors"
                >
                    CSV
                </button>
                <button 
                  onClick={() => exportToJSON(sessions)}
                  className="px-4 py-2 rounded-xl border border-white/60 text-[10px] font-bold uppercase tracking-widest hover:bg-white/40 transition-colors"
                >
                    JSON
                </button>
            </div>
        </section>

        {/* Empty State */}
        {sessions.length === 0 && (
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center py-20 bg-white/20 border border-dashed border-white/40 rounded-[32px]">
             <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-muted-foreground opacity-20" strokeWidth={1} />
             </div>
             <h3 className="text-lg font-medium text-foreground">Deep Roots</h3>
             <p className="text-sm text-muted-foreground mt-1 max-w-xs text-center">Complete your first session to see your growth analytics Bloom here.</p>
          </motion.div>
        )}
      </motion.div>
      
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply z-50">
           <svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'>
              <filter id='noise'>
                 <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>
              </filter>
              <rect width='100%' height='100%' filter='url(#noise)' />
           </svg>
      </div>
    </div>
  )
}
