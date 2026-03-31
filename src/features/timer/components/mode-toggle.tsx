"use client"

import { Clock, Timer } from "lucide-react"
import { cn } from "@/lib/utils"
import { TimerMode } from "@/features/timer/enum/timer"
import { useCallback } from "react"

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

  return (
    <div
      className="flex items-center gap-0.5 bg-black/15 border border-white/10 backdrop-blur-sm rounded-lg p-0.5"
      role="group"
      aria-label="Timer mode"
    >
      <button
        id="mode-timer"
        onClick={() => handleChange(TimerMode.TIMER)}
        aria-pressed={mode === TimerMode.TIMER}
        className={cn(
          "flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium transition-all duration-150",
          mode === TimerMode.TIMER
            ? "bg-white/20 text-white shadow-sm"
            : "text-white/45 hover:text-white/65",
        )}
      >
        <Clock className="h-3.5 w-3.5" />
        <span>Timer</span>
      </button>

      <button
        id="mode-stopwatch"
        onClick={() => handleChange(TimerMode.STOPWATCH)}
        aria-pressed={mode === TimerMode.STOPWATCH}
        className={cn(
          "flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium transition-all duration-150",
          mode === TimerMode.STOPWATCH
            ? "bg-white/20 text-white shadow-sm"
            : "text-white/45 hover:text-white/65",
        )}
      >
        <Timer className="h-3.5 w-3.5" />
        <span>Stopwatch</span>
      </button>
    </div>
  )
}
