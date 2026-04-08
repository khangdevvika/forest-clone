"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, spring } from "@/lib/animations"
import { CANCEL_THRESHOLD } from "@/features/timer/constants/timer"

import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

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
            <motion.div key="plant" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={spring}>
              <Button
                id="plant-button"
                onClick={onStart}
                variant="3d"
                className="w-full h-15 rounded-2xl font-bold text-[18px] tracking-tight flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Leaf className="h-5 w-5" strokeWidth={2.5} />
                Plant
              </Button>
            </motion.div>
          ) : (
            <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={spring} className="flex flex-col gap-2.5">
              {elapsedSeconds < CANCEL_THRESHOLD ? (
                <Button
                  id="cancel-button"
                  onClick={onCancel}
                  variant="glass"
                  className="w-full h-13 rounded-xl font-semibold text-base cursor-pointer"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  id="giveup-button"
                  onClick={onGiveUp}
                  variant="3d-danger"
                  className="w-full h-13 rounded-xl font-semibold text-base tracking-wide cursor-pointer"
                >
                  Give up
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  )
}
