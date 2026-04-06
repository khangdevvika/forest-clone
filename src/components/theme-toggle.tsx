"use client"

import { THEMES, useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useSyncExternalStore } from "react"

interface ThemeToggleProps {
  className?: string
  variant?: "sidebar" | "outline" | "ghost"
}

export function ThemeToggle({ className, variant = "sidebar" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-3.5 w-3.5 rounded-full bg-white/5 animate-pulse" />
        ))}
      </div>
    )
  }

  const isSidebar = variant === "sidebar"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            "relative flex h-3.5 w-3.5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-125 focus-visible:outline-none focus-visible:ring-1",
            isSidebar ? "focus-visible:ring-white/20" : "focus-visible:ring-black/10",
          )}
          style={{ backgroundColor: t.color }}
          title={t.label}
          aria-label={`Set theme to ${t.label}`}
        >
          {theme === t.id && (
            <motion.div
              layoutId="theme-active"
              className={cn("absolute -inset-1 rounded-full border", isSidebar ? "border-white/40" : "border-primary/40")}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
