"use client"

import { cn } from "@/lib/utils"
import { TimerMode } from "@/features/timer/enum/timer"
import { CircularTimer } from "@/features/timer/components/circular-timer"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, scaleIn, staggerContainer, spring } from "@/lib/animations"
import type { Tree } from "@/features/timer/types"


interface TimerDisplayProps {
  isActive: boolean
  mode: TimerMode
  displayMinutes: number
  setMinutes: (minutes: number) => void
  bloomKey: number
  activeTree: Tree
  formattedTime: string
  progressPercent: number
}

export function TimerDisplay({
  isActive,
  mode,
  displayMinutes,
  setMinutes,
  bloomKey,
  activeTree,
  formattedTime,
  progressPercent,
}: TimerDisplayProps) {
  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex-1 w-full flex flex-col items-center justify-center gap-6 px-6 z-10"
    >
      {/* Status label */}
      <motion.p
        variants={fadeUp}
        className="text-[--timer-muted] text-sm font-[family-name:var(--font-inter)] font-medium tracking-wide text-center"
      >
        {isActive
          ? mode === TimerMode.TIMER
            ? "Stay focused — your tree is growing"
            : "Time is running…"
          : "Set your focus time and plant"}
      </motion.p>

      {/* Tree & circular slider */}
      <motion.div
        key={bloomKey}
        variants={scaleIn}
        className={cn("transition-all duration-500", isActive ? "scale-95" : "scale-100")}
      >
        <CircularTimer
          mode={mode}
          minutes={displayMinutes}
          onChange={setMinutes}
          disabled={isActive}
          treeImage={activeTree.image}
        />
      </motion.div>

      {/* Timer display + tree name */}
      <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
        {/* Big time — Outfit 100 */}
        <div
          className="text-[88px] md:text-[108px] leading-none tabular-nums text-[--timer-text]"
          style={{
            fontFamily: "var(--font-outfit)",
            fontWeight: 100,
            textShadow: "0 2px 20px rgba(27,43,26,0.1)",
            letterSpacing: "-0.03em",
          }}
        >
          {formattedTime}
        </div>

        {/* Active tree badge */}
        {!isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="flex items-center gap-2 bg-white/35 border border-white/50 backdrop-blur-sm rounded-lg px-3 py-1.5"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-[--sage-500]" />
            <span className="text-[--timer-text] text-xs font-medium font-[family-name:var(--font-inter)] opacity-75">
              {activeTree.name}
            </span>
          </motion.div>
        )}

        {/* Session progress bar */}
        <AnimatePresence>
          {isActive && mode === TimerMode.TIMER && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={spring}
              className="w-48 h-0.5 bg-black/10 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-[--sage-700] rounded-full transition-all duration-1000 ease-linear opacity-60"
                style={{ width: `${progressPercent}%` }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.main>
  )
}
