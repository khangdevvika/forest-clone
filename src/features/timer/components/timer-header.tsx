"use client"

import { Coins, Clock, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import { TimerMode } from "@/features/timer/enum/timer"
import { ModeToggle } from "@/features/timer/components/mode-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, spring } from "@/lib/animations"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface TimerHeaderProps {
  isActive: boolean
  mode: TimerMode
  onModeChange: (mode: TimerMode) => void
  coins: number
}

export function TimerHeader({ isActive, mode, onModeChange, coins }: TimerHeaderProps) {
  const glassStyle = {
    background: "var(--timer-glass)",
    border: "1px solid var(--timer-glass-border)",
  }

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="w-full grid grid-cols-3 items-center px-5 pt-6 pb-2 z-50 overflow-visible"
    >
      {/* Left: Menu + Brand */}
      <div className="flex items-center gap-3 justify-start">
        <SidebarTrigger 
          disabled={isActive}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 backdrop-blur-md text-[--timer-text] bg-[--timer-glass] border border-[--timer-glass-border]",
            "hover:bg-white/30 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm",
          )}
        />

        <div 
          style={glassStyle}
          className="flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-sm"
        >
          <Leaf className="h-5 w-5 text-[--timer-text]" strokeWidth={1.25} />
        </div>
      </div>

      {/* Center: Mode toggle or session badge */}
      <div className="flex justify-center w-full">
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
              className="flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 text-[--timer-text] text-[13px] font-medium font-sans tracking-wide whitespace-nowrap"
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
      <div className="flex justify-end">
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
      </div>
    </motion.header>
  )
}
