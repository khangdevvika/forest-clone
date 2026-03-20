"use client"

import { Clock, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TimerMode } from "@/features/timer/enum/timer"
import { useCallback } from "react"

interface ModeToggleProps {
  mode: TimerMode
  onChange: (mode: TimerMode) => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  const handleChange = useCallback(() => {
    onChange(mode === TimerMode.TIMER ? TimerMode.STOPWATCH : TimerMode.TIMER)
  }, [mode, onChange])
  return (
    <div className="flex items-center gap-1 bg-black/10 backdrop-blur-sm p-1 rounded-full border border-white/5">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleChange}
        className={cn(
          "h-9 w-9 rounded-full transition-all duration-300 hover:bg-white/10",
          mode === TimerMode.TIMER ? "bg-white/20 shadow-sm text-white hover:bg-white/25" : "text-white/40 hover:text-white/60",
        )}
      >
        <Clock className="h-5 w-5" />
      </Button>

      <Separator orientation="vertical" className="h-4 bg-white/10 mx-1" />

      <Button
        variant="ghost"
        size="icon"
        onClick={handleChange}
        className={cn(
          "h-9 w-9 rounded-full transition-all duration-300 hover:bg-white/10",
          mode === TimerMode.STOPWATCH ? "bg-white/20 shadow-sm text-white hover:bg-white/25" : "text-white/40 hover:text-white/60",
        )}
      >
        <Leaf className="h-5 w-5" />
      </Button>
    </div>
  )
}
