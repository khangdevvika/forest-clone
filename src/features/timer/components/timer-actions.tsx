"use client"

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

const gentleSpring = { type: "spring" as const, stiffness: 180, damping: 28 }

export function TimerActions({ isActive, elapsedSeconds, onStart, onCancel, onGiveUp }: TimerActionsProps) {
  return (
    <motion.footer
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="w-full flex justify-center pb-12 pt-4 px-8 shrink-0"
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="plant"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={gentleSpring}
              className="w-full flex flex-col items-center gap-6"
            >
              {/* iOS 26: Aura-glowing plant button with phygital press */}
              <div className="relative w-full btn-aura">
                <Button
                  id="plant-button"
                  onClick={onStart}
                  variant="3d"
                  className="w-full h-16 rounded-3xl font-bold text-[18px] tracking-[0.02em] flex items-center justify-center gap-3 cursor-pointer group/plant press"
                  style={{
                    backgroundColor: "var(--sage-500)",
                    boxShadow: "0 6px 0 var(--sage-700), 0 12px 30px rgba(107, 143, 107, 0.30), inset 0 1px 0 rgba(255,255,255,0.20)",
                  }}
                >
                  <motion.div
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20"
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Leaf className="h-4 w-4 text-white" strokeWidth={1.25} />
                  </motion.div>
                  <span>Plant Now</span>
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={spring}
              className="w-full flex flex-col gap-3"
            >
              {elapsedSeconds < CANCEL_THRESHOLD ? (
                /* iOS 26: Glass cancel button */
                <Button
                  id="cancel-button"
                  onClick={onCancel}
                  variant="glass"
                  className="w-full h-14 rounded-2xl font-semibold text-base cursor-pointer press"
                  style={{
                    background: "var(--timer-glass)",
                    border: "1px solid var(--timer-glass-border)",
                    backdropFilter: "blur(12px)",
                    color: "var(--timer-text)",
                  }}
                >
                  Give up for now
                </Button>
              ) : (
                <Button
                  id="giveup-button"
                  onClick={onGiveUp}
                  variant="3d-danger"
                  className="w-full h-14 rounded-2xl font-semibold text-base tracking-wide cursor-pointer press"
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
