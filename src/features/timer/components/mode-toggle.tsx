"use client"

import { Clock, Timer } from "lucide-react"
import { cn } from "@/lib/utils"
import { TimerMode } from "@/features/timer/enum/timer"
import { useCallback } from "react"
import { motion } from "framer-motion"
import { springSnappy as spring } from "@/lib/animations"

interface ModeToggleProps {
  mode: TimerMode
  onChange: (mode: TimerMode) => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  const handleChange = useCallback(
    (next: TimerMode) => {
      if (mode !== next) onChange(next)
    },
    [mode, onChange],
  )

  const tabs = [
    { id: TimerMode.TIMER, label: "Timer", icon: Clock },
    { id: TimerMode.STOPWATCH, label: "Stopwatch", icon: Timer },
  ]

  return (
    <div
      className="relative flex items-center p-1 rounded-2xl backdrop-blur-sm self-center mx-auto"
      style={{
        background: "var(--timer-glass)",
        border: "1px solid var(--timer-glass-border)",
      }}
      role="group"
      aria-label="Timer mode"
    >
      {tabs.map((tab) => {
        const isActive = mode === tab.id
        return (
          <button
            key={tab.id}
            id={`mode-${tab.id}`}
            onClick={() => handleChange(tab.id)}
            aria-pressed={isActive}
            className={cn(
              "relative group flex items-center gap-2 h-10 px-5 rounded-xl text-[14px] font-medium font-sans transition-all duration-300 isolation-auto select-none",
              isActive 
                ? "text-[--timer-text]" 
                : "text-[--timer-text] opacity-40 hover:opacity-60"
            )}
          >
            {/* Active Pill — Animates width/position smoothly across buttons */}
            {isActive && (
              <motion.div
                layoutId="mode-pill"
                className="absolute inset-0 bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.06)] z-0 dark:bg-white/10"
                style={{ borderRadius: "inherit" }}
                transition={spring}
              />
            )}

            <tab.icon 
              className={cn(
                "h-4 w-4 shrink-0 z-10 transition-colors duration-200",
                isActive ? "text-[--timer-text]" : "text-[--timer-text]/70"
              )} 
              strokeWidth={1.25} 
            />
            <span className="relative z-10 leading-none">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
