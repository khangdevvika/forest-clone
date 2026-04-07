"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, TreePine, Flame, Coins as CoinsIcon, ChevronRight, Leaf, Settings } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { ThemeToggle } from "@/components/theme-toggle"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format, parseISO } from "date-fns"

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
      {/* ── Sticky header ──────────────────────────── */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center">
          <h1 className="text-base font-semibold text-foreground">Profile</h1>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-5 py-6 pb-24 space-y-6">
          {/* ── Profile card ──────────────────────── */}
          <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: "linear-gradient(135deg, #1a6440 0%, #2d9e65 60%, #4db882 100%)" }}>
            <div className="px-6 py-8 flex items-center gap-5">
              <div>
                <p className="text-white font-bold text-xl leading-none">Forester</p>
                <p className="text-green-200 text-xs mt-1.5 font-medium">Nature Sanctuary Member</p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <div className="flex items-center gap-1 bg-white/15 rounded-md px-2 py-0.5">
                    <Flame className="h-3 w-3 text-orange-300" />
                    <span className="text-white text-xs font-semibold">{streak} day streak</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/15 rounded-md px-2 py-0.5">
                    <CoinsIcon className="h-3 w-3 text-yellow-300" />
                    <span className="text-white text-xs font-semibold">{coins.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats grid ────────────────────────── */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">Stats</h2>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className={`bg-card border ${stat.border} rounded-xl p-4 space-y-2`}>
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground leading-none">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── My Collection ─────────────────────── */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Collection</h2>
              <Link href="/store" className="text-xs text-primary font-medium hover:text-primary/80">
                Browse store →
              </Link>
            </div>
            {ownedTrees.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-6 text-center text-muted-foreground">
                <p className="text-sm">No trees yet. Visit the store!</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {ownedTrees.map((tree) => (
                  <div key={tree.id} className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                      <Image src={tree.image} alt={tree.name} width={48} height={48} className="w-12 h-12 object-contain" unoptimized={tree.image.startsWith("http")} />
                    </div>
                    <p className="text-[10px] text-muted-foreground font-medium text-center leading-tight line-clamp-2">{tree.name}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Recent Sessions ───────────────────── */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Sessions</h2>
              {sessions.length > 5 && (
                <Link href="/garden" className="text-xs text-primary font-medium hover:text-primary/80 flex items-center gap-0.5">
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              )}
            </div>

            {recentSessions.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Leaf className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No sessions yet.</p>
                <Link href="/" className="text-xs text-primary font-medium hover:text-primary/80 mt-1 block">
                  Start your first session →
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentSessions.map((session) => {
                  const tree = STORE_TREES.find((t) => t.id === session.treeId)
                  return (
                    <div key={session.id} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                      <div className="shrink-0 w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden">
                        {tree && <Image src={tree.image} alt={tree.name} width={28} height={28} className="w-7 h-7 object-contain" unoptimized={tree.image.startsWith("http")} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{session.treeName}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.durationMinutes} min · {format(parseISO(session.completedAt), "MMM d, HH:mm")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <CoinsIcon className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-semibold text-secondary-foreground">{session.coinsEarned}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* ── Settings ───────────────────────────── */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">Settings</h2>
            <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Settings className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Appearance</p>
                  <p className="text-[10px] text-muted-foreground">Choose your favorite color palette</p>
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
