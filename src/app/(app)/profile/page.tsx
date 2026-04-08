"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, TreePine, Flame, Coins as CoinsIcon, ChevronRight, Leaf, Settings, Award, Sparkles, ExternalLink, Target, type LucideIcon } from "lucide-react"

import { useUser } from "@/hooks/use-user"
import { ThemeToggle } from "@/components/theme-toggle"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"
import { format, parseISO } from "date-fns"

import { ACHIEVEMENTS } from "@/features/profile/constants/achievements"
import { LevelProgress } from "@/features/profile/components/level-progress"
import { AchievementBadge } from "@/features/profile/components/achievement-badge"
import { cn } from "@/lib/utils"

// ── Patterns ──────────────────────────────────────────
const spring = { type: "spring", stiffness: 280, damping: 22 } as const
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
} as const
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { ...spring } },
} as const

const XP_PER_LEVEL = 200

interface CoreStat {
  label: string
  value: string | number
  icon: LucideIcon
  color: string
}

export default function ProfilePage() {
  const { coins, sessions, streak, unlockedTrees } = useUser()

  const totalMinutes = useMemo(() => sessions.reduce((sum, s) => sum + s.durationMinutes, 0), [sessions])
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60
  const totalCoinsEarned = useMemo(() => sessions.reduce((sum, s) => sum + s.coinsEarned, 0), [sessions])

  const level = Math.floor(totalMinutes / XP_PER_LEVEL) + 1
  const currentXP = totalMinutes % XP_PER_LEVEL

  const achievementStats = {
    totalMinutes,
    totalSessions: sessions.length,
    bestStreak: streak,
    ownedTrees: unlockedTrees.length,
  }

  const coreStats: CoreStat[] = [
    { label: "Hours Focused", value: `${totalHours}h ${remainingMins}m`, icon: Clock, color: "text-blue-500" },
    { label: "Trees Grown", value: sessions.length, icon: TreePine, color: "text-primary" },
    { label: "Current Streak", value: `${streak}d`, icon: Flame, color: "text-orange-500" },
    { label: "Total Wealth", value: totalCoinsEarned.toLocaleString(), icon: CoinsIcon, color: "text-yellow-600" },
  ]

  return (
    <div className="relative h-full flex flex-col bg-background timer-bg overflow-hidden antialiased">
      <PageHeader title="Nature Sanctuary" subtitle={`Member since ${sessions.length > 0 ? format(parseISO(sessions[sessions.length - 1].completedAt), "MMM yyyy") : "today"}`}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-muted border border-border rounded-xl px-4 py-2 shadow-sm">
          <div className="h-5 w-5 bg-[#d4af82] rounded-lg flex items-center justify-center shadow-inner">
            <CoinsIcon className="h-3 w-3 text-yellow-950" strokeWidth={2.5} />
          </div>
          <span className="text-foreground text-sm font-bold tabular-nums">{coins.toLocaleString()}</span>
        </motion.div>
      </PageHeader>

      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-8 pb-32">
          <motion.main variants={staggerContainer} initial="hidden" animate="show" className="space-y-12">
            {/* ── Practitioner Card ──────────────────── */}
            <motion.section variants={fadeUp} className="bg-card/30 border border-border/50 rounded-3xl p-8 backdrop-blur-sm shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <Leaf className="h-10 w-10 text-primary" strokeWidth={1.25} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm">
                    <p className="text-xs font-black text-primary">{level}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">Forest Guardian</p>
                    <h2 className="text-3xl font-[family-name:var(--font-outfit)] font-light text-foreground -ml-0.5">Focus Master</h2>
                  </div>

                  <div className="space-y-3">
                    <LevelProgress level={level} xp={currentXP} maxXp={XP_PER_LEVEL} />
                    <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                      <span>Level {level} Journey</span>
                      <span>
                        {XP_PER_LEVEL - currentXP} mins to level {level + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ── Key Statistics ──────────────────────── */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 px-1">
                <Target className="h-4 w-4 text-primary" strokeWidth={1.25} />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sanctuary Stats</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {coreStats.map((stat) => (
                  <motion.div key={stat.label} variants={fadeUp} className="bg-card/40 border border-border/50 rounded-2xl p-5 space-y-3">
                    <div className={cn("h-8 w-8 rounded-xl bg-secondary/30 flex items-center justify-center", stat.color)}>
                      <stat.icon className="h-4 w-4" strokeWidth={1.25} />
                    </div>
                    <div>
                      <p className="text-xl font-[family-name:var(--font-outfit)] font-medium text-foreground">{stat.value}</p>
                      <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-60">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Milestones ───────────────────────────── */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" strokeWidth={1.25} />
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Milestones</h3>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                  {ACHIEVEMENTS.filter((a) => a.requirement(achievementStats)).length} / {ACHIEVEMENTS.length}
                </span>
              </div>

              <div className="bg-card/20 border border-border/40 rounded-3xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-8">
                  {ACHIEVEMENTS.map((achievement, idx) => (
                    <AchievementBadge
                      key={achievement.id}
                      icon={achievement.icon}
                      title={achievement.title}
                      description={achievement.description}
                      unlocked={achievement.requirement(achievementStats)}
                      delay={0.1 + idx * 0.05}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ── Species Records ─────────────────────── */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-primary" strokeWidth={1.25} />
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sanctuary Records</h3>
                </div>
                <Link href="/store" className="text-[10px] font-black text-primary uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-1">
                  Store <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="bg-card/20 border border-border/40 rounded-3xl p-6">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {STORE_TREES.map((tree) => {
                    const isOwned = unlockedTrees.includes(tree.id)
                    return (
                      <motion.div
                        key={tree.id}
                        variants={fadeUp}
                        className={cn(
                          "aspect-square rounded-xl border flex items-center justify-center p-2 relative group",
                          isOwned ? "bg-secondary/30 border-primary/10" : "bg-muted/10 border-dashed border-border/30 opacity-40 grayscale",
                        )}
                      >
                        <Image
                          src={tree.image}
                          alt={tree.name}
                          width={48}
                          height={48}
                          className={cn("w-full h-full object-contain drop-shadow-sm transition-transform duration-300", isOwned && "group-hover:scale-110")}
                          unoptimized={tree.image.startsWith("http")}
                        />
                        {isOwned && (
                          <div className="absolute inset-x-0 bottom-0 py-0.5 bg-background/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <p className="text-[7px] font-bold text-center truncate px-1">{tree.name}</p>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* ── Preferences ──────────────────────────── */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 px-1">
                <Settings className="h-4 w-4 text-primary" strokeWidth={1.25} />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sanctuary Settings</h3>
              </div>
              <div className="bg-card/40 border border-border/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <Sparkles className="h-6 w-6" strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Aesthetic Vibes</h4>
                    <p className="text-[10px] text-muted-foreground font-medium mt-1 leading-relaxed opacity-60">Global font & color presets</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <ThemeToggle variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-border/40" />
                  <button className="h-12 w-12 bg-muted hover:bg-muted-hover rounded-xl flex items-center justify-center border border-border transition-all active:scale-95 group shadow-sm">
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.25} />
                  </button>
                </div>
              </div>
            </section>
          </motion.main>
        </div>
      </ScrollArea>
    </div>
  )
}
