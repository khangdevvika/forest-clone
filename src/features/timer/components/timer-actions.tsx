"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, spring } from "@/lib/animations"
import { CANCEL_THRESHOLD } from "@/features/timer/constants/timer"

import { Leaf } from "lucide-react"

interface TimerActionsProps {
  isActive: boolean
  elapsedSeconds: number
  onStart: () => void
  onCancel: () => void
  onGiveUp: () => void
}

export function TimerActions({ isActive, elapsedSeconds, onStart, onCancel, onGiveUp }: TimerActionsProps) {
  return (
    <motion.footer
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="w-full flex justify-center pb-10 pt-6 px-6"
    >
      <div className="w-full max-w-xs flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.button
              key="plant"
              id="plant-button"
              onClick={onStart}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={spring}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full h-15 rounded-2xl font-[family-name:var(--font-inter)] font-bold text-[18px] tracking-tight",
                "bg-primary text-primary-foreground",
                "shadow-[0_6px_0_rgb(58,80,56),0_12px_24px_rgba(27,43,26,0.25)]", 
                "hover:brightness-110 active:shadow-[0_2px_0_rgb(58,80,56)] active:translate-y-1",
                "transition-all duration-150 cursor-pointer flex items-center justify-center gap-2.5",
              )}
            >
              <Leaf className="h-5 w-5" strokeWidth={2.5} />
              Plant
            </motion.button>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={spring}
              className="flex flex-col gap-2.5"
            >
              {elapsedSeconds < CANCEL_THRESHOLD ? (
                <motion.button
                  id="cancel-button"
                  onClick={onCancel}
                  whileTap={{ scale: 0.975 }}
                  className={cn(
                    "w-full h-13 rounded-xl font-[family-name:var(--font-inter)] font-semibold text-base",
                    "bg-white/35 border border-white/50 backdrop-blur-sm text-[--timer-text]",
                    "hover:bg-white/50 transition-colors duration-150 cursor-pointer",
                  )}
                >
                  Cancel
                </motion.button>
              ) : (
                <motion.button
                  id="giveup-button"
                  onClick={onGiveUp}
                  whileTap={{ scale: 0.975 }}
                  className={cn(
                    "w-full h-13 rounded-xl font-[family-name:var(--font-inter)] text-white font-semibold text-base tracking-wide",
                    "bg-red-500/75 hover:bg-red-500/90 border border-red-400/25 border-b-[3px] border-b-red-700/50",
                    "transition-colors duration-100 cursor-pointer",
                  )}
                >
                  Give up
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  )
}
