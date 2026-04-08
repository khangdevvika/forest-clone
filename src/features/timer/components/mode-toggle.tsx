"use client"

import { Clock, Timer } from "lucide-react"
import { cn } from "@/lib/utils"
import { TimerMode } from "@/features/timer/enum/timer"
import { useCallback } from "react"
import { AnimatedTabs } from "@/components/ui/animated-tabs"

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

  const animatedTabsOptions = tabs.map((tab) => ({
    id: tab.id,
    label: <span className="leading-none">{tab.label}</span>,
    icon: <tab.icon className={cn("h-4 w-4 shrink-0 transition-colors duration-200", mode === tab.id ? "text-[--timer-text]" : "text-[--timer-text]/70")} strokeWidth={1.25} />,
  }))

  return <AnimatedTabs variant="glass" tabs={animatedTabsOptions} activeTab={mode} onChange={(id) => handleChange(id as TimerMode)} layoutId="mode-pill" />
}
