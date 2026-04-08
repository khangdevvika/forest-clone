"use client"

import { useTheme } from "@/hooks/use-theme"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Coins, Flame, Home, Leaf, ListTodo, ShoppingBag, Trophy, User, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const spring = { type: "spring" as const, stiffness: 280, damping: 22 }
const bounceSpring = { type: "spring" as const, stiffness: 400, damping: 12 }

const navGroups = [
  {
    label: "Navigation",
    items: [
      { title: "Home", url: "/", icon: Home, color: "var(--sage-400)" },
      { title: "Garden", url: "/garden", icon: Leaf, color: "var(--sage-400)" },
    ],
  },
  {
    label: "Progression",
    items: [
      { title: "Tasks", url: "/tasks", icon: ListTodo, color: "#d48c45" },
      { title: "Achievements", url: "/achievements", icon: Trophy, color: "#d4a5b2" },
    ],
  },
  {
    label: "Personal",
    items: [
      { title: "Store", url: "/store", icon: ShoppingBag, color: "#38bdf8" },
      { title: "Profile", url: "/profile", icon: User, color: "#ffffff" },
    ],
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// DIRECTION C: THE LUMINOUS PATH (High Contrast & Clear Hierarchy)
// ──────────────────────────────────────────────────────────────────────────────
export function LuminousSidebar() {
  const pathname = usePathname()
  const { coins, streak } = useUser()

  return (
    <div className="flex flex-col h-full bg-[#1b2b1a] text-white overflow-hidden relative border-r border-[#2a3d27]">
      {/* Texture Layer */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="p-8 pb-10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#d4af82]/10 border border-[#d4af82]/20 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,130,0.1)]">
            <Leaf className="h-5 w-5 text-[#d4af82]" strokeWidth={1.5} />
          </div>
          <span className="font-[family-name:var(--font-outfit)] text-2xl font-light tracking-tight opacity-90">Forest</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 relative z-20">
        {navGroups
          .flatMap((g) => g.items)
          .map((item) => {
            const isActive = pathname === item.url

            return (
              <Link key={item.title} href={item.url}>
                <motion.div
                  className={cn(
                    "group relative flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200",
                    isActive ? "bg-gradient-to-r from-[#d4af82]/15 to-transparent text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]",
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Indicator Border */}
                  {isActive && (
                    <motion.div
                      layoutId="luminous-border"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#d4af82] rounded-full shadow-[0_0_12px_#d4af82,0_0_24px_rgba(212,175,130,0.4)]"
                      transition={spring}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-all duration-300",
                        isActive ? "text-[#d4af82] scale-110 drop-shadow-[0_0_8px_rgba(212,175,130,0.6)]" : "text-zinc-600 group-hover:text-zinc-400",
                      )}
                      strokeWidth={isActive ? 1.5 : 1.25}
                    />
                    <span className={cn("text-sm tracking-wide transition-all", isActive ? "font-bold text-white" : "font-medium")}>{item.title}</span>
                  </div>
                </motion.div>
              </Link>
            )
          })}
      </nav>

      {/* Stats Footer */}
      <div className="mt-auto p-6 space-y-4 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] shadow-inner">
            <span className="text-[9px] uppercase font-bold text-zinc-600 tracking-widest">Points</span>
            <div className="flex items-center gap-2">
              <Coins className="h-3.5 w-3.5 text-[#d4af82]" strokeWidth={1.5} />
              <span className="text-sm font-light tracking-tight tabular-nums text-zinc-200">{coins.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] shadow-inner">
            <span className="text-[9px] uppercase font-bold text-zinc-600 tracking-widest">Streak</span>
            <div className="flex items-center gap-2">
              <Flame className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
              <span className="text-sm font-light tracking-tight tabular-nums text-zinc-200">{streak} Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// DIRECTION A: THE FIREFLY SANCTUARY (Minimalist + Glow)
// ──────────────────────────────────────────────────────────────────────────────
export function FireflySidebar() {
  const pathname = usePathname()
  const { coins, streak } = useUser()

  return (
    <div className="flex flex-col h-full bg-[#1b2b1a] py-8 px-6 text-white overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mb-12 flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/30">Focus Sanctuary</span>
          <h2 className="text-2xl font-[family-name:var(--font-outfit)] font-light">Forest</h2>
        </div>
        <div className="flex flex-col items-end gap-1 px-3 py-2 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-light tabular-nums text-white/80">{coins.toLocaleString()}</span>
            <Sparkles className="h-3 w-3 text-primary/80 animate-pulse" strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-primary/40 leading-none">{streak}D</span>
            <div className="h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-8 relative">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-3">
            <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 pl-4">{group.label}</span>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <Link key={item.title} href={item.url}>
                    <motion.div
                      className={cn("group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-700", isActive ? "text-white" : "text-white/30 hover:text-white/60")}
                      whileTap={{ scale: 0.96 }}
                    >
                      <AnimatePresence>
                        {isActive && <motion.div layoutId="firefly-active" className="absolute inset-0 bg-white/[0.04] rounded-2xl border border-white/5" transition={spring} />}
                      </AnimatePresence>

                      <div className="relative z-10 flex items-center gap-4 w-full">
                        <item.icon
                          className={cn("h-4.5 w-4.5 transition-all duration-700", isActive ? "text-primary drop-shadow-[0_0_8px_var(--primary)]" : "text-current")}
                          strokeWidth={isActive ? 1.5 : 1}
                        />
                        <span className={cn("text-sm font-light tracking-wide", isActive && "font-medium")}>{item.title}</span>
                        {isActive && <motion.div layoutId="firefly-light" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" transition={bounceSpring} />}
                      </div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-4 bg-primary/40 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// DIRECTION B: AMBIANCE BLOOM (Bolder + Color-coded)
// ──────────────────────────────────────────────────────────────────────────────
export function AmbianceSidebar() {
  const pathname = usePathname()
  const { coins, streak } = useUser()
  const { theme, setTheme } = useTheme()

  const moodColors = [
    { hex: "#7ba87b", name: "Sage", theme: "sage" as const },
    { hex: "#d48c45", name: "Amber", theme: "sunset" as const },
    { hex: "#38bdf8", name: "Sky", theme: "midnight" as const },
    { hex: "#d4a5b2", name: "Rose", theme: "rose" as const },
  ]

  return (
    <div className="flex flex-col h-full bg-[#1b2b1a] text-white overflow-hidden relative">
      <div
        className="absolute inset-x-0 top-0 h-[400px] opacity-[0.08] transition-all duration-1000 blur-[80px]"
        style={{ background: `radial-gradient(circle at 50% 0%, ${moodColors.find((m) => m.theme === theme)?.hex || "#7ba87b"}, transparent)` }}
      />

      <div className="p-8 pt-10 pb-6 relative z-10 flex items-center justify-between">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-[family-name:var(--font-outfit)] font-light tracking-tight">Forest</h1>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-0.5 w-4 rounded-full bg-primary/20" />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-warm-400" />
            <span className="text-lg font-light tabular-nums" style={{ fontFamily: "var(--font-outfit)" }}>
              {coins.toLocaleString()}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-primary/40 font-bold">{streak} Day Streak</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-10 relative z-10 mt-4">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-4">
            <div className="flex items-center gap-4 opacity-20 px-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] whitespace-nowrap">{group.label}</span>
              <div className="h-px w-full bg-white" />
            </div>
            <div className="space-y-2">
              {group.items.map((item) => {
                const isActive = pathname === item.url
                const itemColor = item.color
                return (
                  <Link key={item.title} href={item.url}>
                    <motion.div
                      className={cn("group relative flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-500", isActive ? "text-white" : "text-white/40 hover:text-white/70")}
                      whileHover={{ x: 8 }}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="ambiance-pill"
                            className="absolute inset-0 rounded-3xl opacity-15"
                            style={{ backgroundColor: itemColor }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.15 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                          />
                        )}
                      </AnimatePresence>
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors">
                            <item.icon className="h-5 w-5 transition-all duration-500" style={{ color: isActive ? itemColor : "currentColor" }} strokeWidth={isActive ? 1.5 : 1} />
                          </div>
                          <span className={cn("text-sm transition-all tracking-wide", isActive ? "font-bold" : "text-white/40")}>{item.title}</span>
                        </div>
                        {isActive && (
                          <motion.div layoutId="active-marker" className="p-1 rounded-full bg-primary/20 border border-primary/40 transform -translate-x-1">
                            <Sparkles className="h-3 w-3 text-primary animate-spin-slow" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-8 relative z-10">
        <div className="bg-white/[0.03] border border-white/5 rounded-[32px] p-5 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] uppercase font-bold text-white/20 tracking-widest leading-none">Ambiance</span>
            <span className="text-xs font-medium capitalize text-primary/80">{theme}</span>
          </div>
          <div className="flex gap-2.5">
            {moodColors.map((mood) => (
              <motion.button
                key={mood.theme}
                onClick={() => setTheme(mood.theme)}
                className={cn("h-4 w-4 rounded-full ring-offset-[#1b2b1a] transition-all", theme === mood.theme ? "ring-2 ring-white scale-110" : "opacity-30 hover:opacity-100 scale-90")}
                style={{ backgroundColor: mood.hex }}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
