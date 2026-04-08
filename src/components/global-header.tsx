"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { isTimerActiveAtom } from "@/features/timer/store/timer.atoms"
import { cn } from "@/lib/utils"
import { headerConfigAtom } from "@/store/header.atoms"
import { motion } from "framer-motion"
import { useAtomValue } from "jotai"
import { usePathname } from "next/navigation"

export function GlobalHeader() {
  const pathname = usePathname()
  const config = useAtomValue(headerConfigAtom)
  const isTimerActive = useAtomValue(isTimerActiveAtom)

  const isHomePage = pathname === "/"

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300",
        config.transparent ? "absolute top-0 left-0 bg-transparent" : "sticky top-0 bg-background/80 backdrop-blur-md border-b border-border",
        config.className,
      )}
    >
      <div className={cn("mx-auto px-5 flex items-center justify-between", isHomePage ? "pt-6 pb-2" : "h-16 max-w-3xl")}>
        {/* Left: Trigger + Breadcrumb/Title */}
        <div className="flex items-center gap-4">
          {!config.hideTrigger && (
            <SidebarTrigger
              disabled={isHomePage && isTimerActive}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                isHomePage
                  ? "backdrop-blur-md text-[--timer-text] bg-[--timer-glass] border border-[--timer-glass-border] hover:bg-white/30"
                  : "bg-muted border border-border text-foreground hover:scale-105 active:scale-95",
              )}
            />
          )}

          <div className="flex flex-col">
            {config.title && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
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
                transition={{ delay: 0.1 }}
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
