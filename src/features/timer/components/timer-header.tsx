"use client"

import { Coins, Menu, Clock, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import { TimerMode } from "@/features/timer/enum/timer"
import { ModeToggle } from "@/features/timer/components/mode-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, spring } from "@/lib/animations"

interface TimerHeaderProps {
  isActive: boolean
  mode: TimerMode
  onModeChange: (mode: TimerMode) => void
  coins: number
  onMenuClick: () => void
}

export function TimerHeader({ isActive, mode, onModeChange, coins, onMenuClick }: TimerHeaderProps) {
  const glassStyle = {
    background: "var(--timer-glass)",
    border: "1px solid var(--timer-glass-border)",
  }

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="w-full flex items-center justify-between px-5 pt-6 pb-2 z-50"
    >
      {/* Left: Menu + Brand */}
      <div className="flex items-center gap-3">
        <button
          id="sidebar-toggle"
          onClick={onMenuClick}
          disabled={isActive}
          style={glassStyle}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200. backdrop-blur-sm text-[--timer-text]",
            "hover:bg-white/40 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed",
          )}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.25} />
        </button>

        <div 
          style={glassStyle}
          className="flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-sm"
        >
          <Leaf className="h-5 w-5 text-[--timer-text]" strokeWidth={1.25} />
        </div>
      </div>

      {/* Center: Mode toggle or session badge */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="toggle"
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={spring}
            >
              <ModeToggle mode={mode} onChange={onModeChange} />
            </motion.div>
          ) : (
            <motion.div
              key="badge"
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={spring}
              style={glassStyle}
              className="flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 text-[--timer-text] text-[13px] font-medium font-sans tracking-wide"
            >
              {mode === TimerMode.TIMER ? (
                <Clock className="h-4 w-4" strokeWidth={1.25} />
              ) : (
                <Leaf className="h-4 w-4" strokeWidth={1.25} />
              )}
              <span className="capitalize">{mode}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Coin counter */}
      <div
        id="coin-counter"
        style={glassStyle}
        className="flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 cursor-pointer hover:bg-white/40 transition-all duration-200 active:scale-95 group"
      >
        <div className="h-4.5 w-4.5 rounded-md bg-[--warm-500] flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
          <Coins className="h-2.5 w-2.5 text-amber-900" strokeWidth={1.5} />
        </div>
        <span className="text-[--timer-text] text-sm font-semibold tabular-nums font-sans">
          {coins.toLocaleString()}
        </span>
      </div>
    </motion.header>
  )
}
