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

import { LevelProgress } from "@/features/profile/components/level-progress"
import { useAchievements } from "@/features/achievements/hooks/use-achievements"
import { cn } from "@/lib/utils"

// iOS 26: Weighted springs
const gentleSpring = { type: "spring", stiffness: 160, damping: 28 } as const
const spring = { type: "spring", stiffness: 280, damping: 22 } as const

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
} as const

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...gentleSpring } },
} as const

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { ...gentleSpring } },
} as const

const XP_PER_LEVEL = 200

interface CoreStat {
  label: string
  value: string | number
  icon: LucideIcon
  color: string
  bgColor: string
}

export default function ProfilePage() {
  const { coins, sessions, streak, unlockedTrees } = useUser()

  const totalMinutes = useMemo(() => sessions.reduce((sum, s) => sum + s.durationMinutes, 0), [sessions])
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60
  const totalCoinsEarned = useMemo(() => sessions.reduce((sum, s) => sum + s.coinsEarned, 0), [sessions])

  const level = Math.floor(totalMinutes / XP_PER_LEVEL) + 1
  const currentXP = totalMinutes % XP_PER_LEVEL

  const { unlockedIds, achievements } = useAchievements()

  const coreStats: CoreStat[] = [
    { label: "Hours Focused", value: `${totalHours}h ${remainingMins}m`, icon: Clock, color: "text-blue-400", bgColor: "rgba(59,130,246,0.10)" },
    { label: "Trees Grown", value: sessions.length, icon: TreePine, color: "text-primary", bgColor: "var(--aura-primary)" },
    { label: "Current Streak", value: `${streak}d`, icon: Flame, color: "text-orange-400", bgColor: "rgba(251,146,60,0.10)" },
    { label: "Total Wealth", value: totalCoinsEarned.toLocaleString(), icon: CoinsIcon, color: "text-yellow-500", bgColor: "rgba(234,179,8,0.10)" },
  ]

  return (
    <div className="relative h-full flex flex-col bg-background timer-bg overflow-hidden antialiased">
      {/* iOS 26: Ambient aura blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-[-10%] right-[-15%] w-[55%] h-[55%] rounded-full"
          style={{ background: "radial-gradient(circle, var(--aura-primary) 0%, transparent 70%)", filter: "blur(70px)", opacity: 0.5 }}
        />
        <div
          className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, var(--aura-accent) 0%, transparent 70%)", filter: "blur(80px)", opacity: 0.4 }}
        />
      </div>

      <PageHeader title="Nature Sanctuary" subtitle={`Member since ${sessions.length > 0 ? format(parseISO(sessions[sessions.length - 1].completedAt), "MMM yyyy") : "today"}`}>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="eco-island flex items-center gap-2.5 rounded-2xl px-4 py-2.5">
          <div className="h-5 w-5 rounded-lg flex items-center justify-center shadow-sm" style={{ background: "var(--warm-400)" }}>
            <CoinsIcon className="h-3 w-3 text-yellow-950" strokeWidth={2.5} />
          </div>
          <span className="text-foreground text-sm font-bold tabular-nums">{coins.toLocaleString()}</span>
        </motion.div>
      </PageHeader>

      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-8 pb-32">
          <motion.main variants={staggerContainer} initial="hidden" animate="show" className="space-y-10">
            {/* ── iOS 26: Practitioner Hero Card ──────────────── */}
            <motion.section variants={scaleIn} className="plate rounded-[2rem] p-8 relative overflow-hidden">
              {/* Rim light */}
              <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 40%, var(--rim-light) 60%, transparent)" }}
              />
              {/* Corner aura */}
              <div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, var(--aura-primary) 0%, transparent 70%)", filter: "blur(30px)", opacity: 0.6 }}
              />

              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                <div className="relative group">
                  {/* iOS 26: Squircle avatar */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={spring}
                    className="h-24 w-24 flex items-center justify-center transition-all duration-500"
                    style={{
                      borderRadius: "30%",
                      background: "var(--aura-primary)",
                      border: "1px solid var(--rim-light)",
                      boxShadow: "var(--shadow-md), inset 0 1px 0 var(--rim-light)",
                    }}
                  >
                    <Leaf className="h-10 w-10 text-primary" strokeWidth={1.25} />
                  </motion.div>

                  {/* Level badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ ...spring, delay: 0.4 }}
                    className="absolute -bottom-2 -right-2 h-8 w-8 eco-island flex items-center justify-center"
                    style={{ borderRadius: "40%", boxShadow: "var(--shadow-sm)" }}
                  >
                    <p className="text-xs font-black text-primary">{level}</p>
                  </motion.div>
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">Forest Guardian</p>
                    <h2 className="text-3xl font-light text-foreground -ml-0.5" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.01em" }}>
                      Focus Master
                    </h2>
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

            {/* ── iOS 26: Stat Grid ────────────────────────────── */}
            <section className="space-y-5">
              <div className="flex items-center gap-2 px-1">
                <Target className="h-4 w-4 text-primary" strokeWidth={1.25} />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sanctuary Stats</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {coreStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    whileHover={{ y: -3, boxShadow: "var(--shadow-lg)" }}
                    transition={spring}
                    className="plate-subtle rounded-[1.5rem] p-5 space-y-3 lift relative overflow-hidden"
                  >
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: stat.bgColor, boxShadow: "var(--shadow-xs)" }}>
                      <stat.icon className={cn("h-4 w-4", stat.color)} strokeWidth={1.25} />
                    </div>
                    <div>
                      <p className="text-xl font-medium text-foreground" style={{ fontFamily: "var(--font-outfit)" }}>
                        {stat.value}
                      </p>
                      <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-60">{stat.label}</p>
                    </div>
                    {/* Aura tint per stat */}
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full pointer-events-none" style={{ background: stat.bgColor, filter: "blur(20px)" }} />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── iOS 26: Milestones Plate ──────────────────────── */}
            <section className="space-y-5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" strokeWidth={1.25} />
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Milestones</h3>
                </div>
                <Link href="/achievements" className="text-[10px] font-black text-primary uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-1">
                  View All <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <Link href="/achievements" className="block group">
                <motion.div whileHover={{ y: -3 }} transition={spring} className="plate rounded-[1.75rem] p-7 flex items-center justify-between relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 50%, transparent)" }} />
                  <div className="space-y-1">
                    <p className="text-lg font-light text-foreground" style={{ fontFamily: "var(--font-outfit)" }}>
                      Achievement Collection
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="text-primary font-bold">
                        {unlockedIds.length} / {achievements.length}
                      </span>
                      medals collected in your sanctuary
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={spring}
                    className="h-12 w-12 rounded-2xl flex items-center justify-center text-primary transition-all duration-500"
                    style={{ background: "var(--aura-primary)", border: "1px solid var(--rim-light)", boxShadow: "var(--shadow-sm)" }}
                  >
                    <Award className="h-6 w-6" strokeWidth={1.25} />
                  </motion.div>
                </motion.div>
              </Link>
            </section>

            {/* ── iOS 26: Species Records ───────────────────────── */}
            <section className="space-y-5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-primary" strokeWidth={1.25} />
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sanctuary Records</h3>
                </div>
                <Link href="/store" className="text-[10px] font-black text-primary uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-1">
                  Store <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <motion.div variants={fadeUp} className="plate-subtle rounded-[1.75rem] p-6 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 50%, transparent)" }} />
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {STORE_TREES.map((tree) => {
                    const isOwned = unlockedTrees.includes(tree.id)
                    return (
                      <motion.div
                        key={tree.id}
                        whileHover={isOwned ? { scale: 1.08, y: -3 } : {}}
                        transition={spring}
                        className={cn(
                          "aspect-square rounded-2xl border flex items-center justify-center p-2 relative group",
                          isOwned ? "border-primary/15 lift" : "bg-muted/10 border-dashed border-border/30 opacity-35 grayscale",
                        )}
                        style={
                          isOwned
                            ? {
                                background: "var(--aura-primary)",
                                boxShadow: "var(--shadow-xs)",
                              }
                            : {}
                        }
                      >
                        <Image
                          src={tree.image}
                          alt={tree.name}
                          width={48}
                          height={48}
                          className={cn("w-full h-full object-contain transition-all duration-300", isOwned && "drop-shadow-[0_4px_12px_var(--aura-primary)]")}
                          unoptimized={tree.image.startsWith("http")}
                        />
                        {isOwned && (
                          <div className="absolute inset-x-0 bottom-0 py-0.5 bg-background opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-b-2xl">
                            <p className="text-[7px] font-bold text-center truncate px-1">{tree.name}</p>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </section>

            {/* ── iOS 26: Preferences Plate ─────────────────────── */}
            <section className="space-y-5">
              <div className="flex items-center gap-2 px-1">
                <Settings className="h-4 w-4 text-primary" strokeWidth={1.25} />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sanctuary Settings</h3>
              </div>

              <motion.div variants={fadeUp} className="plate rounded-[1.75rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 50%, transparent)" }} />
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={spring}
                    className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center"
                    style={{ boxShadow: "0 6px 20px var(--aura-primary)" }}
                  >
                    <Sparkles className="h-6 w-6" strokeWidth={1} />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Aesthetic Vibes</h4>
                    <p className="text-[10px] text-muted-foreground font-medium mt-1 leading-relaxed opacity-60">Global font & color presets</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <ThemeToggle variant="outline" className="flex-1 md:flex-none h-12 rounded-2xl border-border/40" />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={spring}
                    className="h-12 w-12 rounded-2xl flex items-center justify-center border border-border/40 group"
                    style={{ background: "var(--plate-bg)", boxShadow: "var(--shadow-xs)" }}
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.25} />
                  </motion.button>
                </div>
              </motion.div>
            </section>
          </motion.main>
        </div>
      </ScrollArea>
    </div>
  )
}
