"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { isTimerActiveAtom } from "@/features/timer/store/timer.atoms"
import { cn } from "@/lib/utils"
import { headerConfigAtom } from "@/store/header.atoms"
import { motion } from "framer-motion"
import { useAtomValue } from "jotai"
import { usePathname } from "next/navigation"

const gentleSpring = { type: "spring" as const, stiffness: 180, damping: 30 }

export function GlobalHeader() {
  const pathname = usePathname()
  const config = useAtomValue(headerConfigAtom)
  const isTimerActive = useAtomValue(isTimerActiveAtom)

  const isHomePage = pathname === "/"

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300",
        config.transparent
          ? "absolute top-0 left-0 bg-transparent"
          : "sticky top-0 border-b border-border/30",
      )}
      style={!config.transparent ? {
        background: "var(--plate-bg)",
        boxShadow: "0 1px 0 var(--border), inset 0 -1px 0 var(--rim-shadow)",
      } : undefined}
    >
      {/* iOS 26: Rim light on header bottom edge (non-transparent header) */}
      {!config.transparent && (
        <div
          className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)" }}
        />
      )}

      <div className={cn("mx-auto px-5 flex items-center justify-between", isHomePage ? "pt-6 pb-2" : "h-16 max-w-3xl")}>
        {/* Left: Trigger + Title */}
        <div className="flex items-center gap-4">
          {!config.hideTrigger && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={gentleSpring}>
              <SidebarTrigger
                disabled={isHomePage && isTimerActive}
                className={cn(
                  "flex h-10 w-10 items-center justify-center transition-all duration-300",
                  isHomePage
                    ? "bg-white/10 text-[--timer-text] hover:bg-white/30"
                    : "text-foreground hover:scale-105 active:scale-95",
                )}
                style={isHomePage ? {
                  background: "var(--timer-glass)",
                  border: "1px solid var(--timer-glass-border)",
                  borderRadius: "0.75rem",
                } : {
                  background: "var(--plate-bg)",
                  border: "1px solid var(--plate-border)",
                  borderRadius: "0.75rem",
                  boxShadow: "var(--shadow-xs)",
                }}
              />
            </motion.div>
          )}

          <div className="flex flex-col">
            {config.title && (
              <motion.h1
                initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={gentleSpring}
                className={cn("text-base font-bold leading-none", isHomePage ? "text-[--timer-text]" : "text-foreground")}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {config.title}
              </motion.h1>
            )}
            {config.subtitle && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08, ...gentleSpring }}
                className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", isHomePage ? "text-[--timer-text]/70" : "text-primary")}
              >
                {config.subtitle}
              </motion.p>
            )}
            {config.leftContent}
          </div>
        </div>

        {/* Center: Specialized Content */}
        <div className="flex-1 flex justify-center px-4">{config.centerContent}</div>

        {/* Right: Actions/Counters */}
        <div className="flex items-center gap-3">{config.rightContent}</div>
      </div>
    </header>
  )
}
