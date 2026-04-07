"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, TreePine, Flame, Coins as CoinsIcon, ChevronRight, Leaf, Settings } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { ThemeToggle } from "@/components/theme-toggle"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"
import { format, parseISO } from "date-fns"
import { motion } from "framer-motion"

// ── Helper: compute longest ever streak from sessions ─────────
function computeBestStreak(sessions: { completedAt: string }[]): number {
  if (sessions.length === 0) return 0
  const days = [...new Set(sessions.map((s) => format(parseISO(s.completedAt), "yyyy-MM-dd")))].sort()

  let best = 1
  let current = 1
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1])
    const curr = new Date(days[i])
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    current = diff === 1 ? current + 1 : 1
    if (current > best) best = current
  }
  return best
}

export default function ProfilePage() {
  const { coins, sessions, streak, unlockedTrees } = useUser()

  const totalMinutes = useMemo(() => sessions.reduce((sum, s) => sum + s.durationMinutes, 0), [sessions])
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60
  const totalCoinsEarned = useMemo(() => sessions.reduce((sum, s) => sum + s.coinsEarned, 0), [sessions])
  const bestStreak = useMemo(() => computeBestStreak(sessions), [sessions])

  const recentSessions = sessions.slice(0, 5)
  const ownedTrees = STORE_TREES.filter((t) => unlockedTrees.includes(t.id))

  const stats = [
    {
      icon: Clock,
      label: "Focus Time",
      value: totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${totalMinutes}m`,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: TreePine,
      label: "Trees Planted",
      value: sessions.length.toString(),
      color: "text-primary",
      bg: "bg-muted",
      border: "border-border",
    },
    {
      icon: Flame,
      label: "Best Streak",
      value: `${bestStreak}d`,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      icon: CoinsIcon,
      label: "Coins Earned",
      value: totalCoinsEarned.toLocaleString(),
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
    },
  ]

  return (
    <div className="relative h-full flex flex-col bg-background">
      <PageHeader title="Profile" subtitle="Nature Sanctuary Member" />

      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-5 py-8 pb-32 space-y-8">
          {/* ── Profile card with Glass Overlay ────────── */}
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/5" 
            style={{ background: "linear-gradient(135deg, #1a6440 0%, #2d9e65 60%, #4db882 100%)" }}
          >
            <div className="px-7 py-10 flex items-center gap-6 relative overflow-hidden">
               {/* Decorative Circle */}
               <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl pointer-events-none" />
               
              <div className="relative z-10">
                <p className="text-white font-black text-2xl tracking-tight leading-none">Forester</p>
                <p className="text-green-50/80 text-xs mt-2 font-bold uppercase tracking-widest">Level 1 Practitioner</p>
                
                <div className="flex items-center gap-2 mt-5">
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10">
                    <Flame className="h-3.5 w-3.5 text-orange-300" strokeWidth={2.5} />
                    <span className="text-white text-xs font-bold">{streak} day streak</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10">
                    <CoinsIcon className="h-3.5 w-3.5 text-yellow-300" strokeWidth={2.5} />
                    <span className="text-white text-xs font-bold">{coins.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Stats grid ────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`bg-card border ${stat.border} rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md transition-all`}
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground leading-none">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-widest">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── My Collection ─────────────────────── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Species Records</h2>
              <Link href="/store" className="text-xs text-primary font-bold hover:text-primary/80 transition-colors">
                View catalog →
              </Link>
            </div>
            {ownedTrees.length === 0 ? (
              <div className="bg-muted/50 border border-border border-dashed rounded-3xl p-10 text-center text-muted-foreground">
                <Leaf className="h-10 w-10 mx-auto mb-4 opacity-10" />
                <p className="text-xs font-medium">Your collection is empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {ownedTrees.map((tree, idx) => (
                  <motion.div 
                    key={tree.id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-full aspect-square rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-sm">
                      <Image src={tree.image} alt={tree.name} width={64} height={64} className="w-14 h-14 object-contain drop-shadow-md" unoptimized={tree.image.startsWith("http")} />
                    </div>
                    <p className="text-[9px] text-muted-foreground font-bold text-center leading-tight line-clamp-2 px-1 uppercase tracking-tighter opacity-70">{tree.name}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* ── Recent Sessions ───────────────────── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Focus History</h2>
              {sessions.length > 5 && (
                <Link href="/garden" className="text-xs text-primary font-bold hover:text-primary/80 flex items-center gap-0.5 transition-colors">
                  Full history <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            {recentSessions.length === 0 ? (
              <div className="bg-card border border-border border-dashed rounded-3xl p-12 text-center">
                <Leaf className="h-12 w-12 text-muted-foreground/10 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground font-medium">Time for your first session.</p>
                <Link href="/" className="text-xs text-primary font-bold hover:text-primary/80 mt-2 block uppercase tracking-widest">
                  Begin focus →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session, idx) => {
                  const tree = STORE_TREES.find((t) => t.id === session.treeId)
                  return (
                    <motion.div 
                      key={session.id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-4 hover:shadow-md transition-all group cursor-default"
                    >
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                        {tree && <Image src={tree.image} alt={tree.name} width={34} height={34} className="w-9 h-9 object-contain drop-shadow-sm" unoptimized={tree.image.startsWith("http")} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{session.treeName}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1 opacity-70">
                          {session.durationMinutes}m · {format(parseISO(session.completedAt), "MMM d, HH:mm")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 bg-muted/50 px-2 py-1 rounded-lg">
                        <CoinsIcon className="h-3 w-3 text-yellow-500" strokeWidth={2.5} />
                        <span className="text-xs font-black text-secondary-foreground tabular-nums">{session.coinsEarned}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </section>

          {/* ── Settings ───────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1">Preferences</h2>
            <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                  <Settings className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Mood & Visuals</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5 opacity-60">System Theme Palette</p>
                </div>
              </div>
              <ThemeToggle variant="outline" />
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}
