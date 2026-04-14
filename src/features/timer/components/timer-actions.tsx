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
              initial={{ opacity: 0, y: 15, scale: 0.98 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 15, scale: 0.98 }} 
              transition={spring}
              className="w-full flex flex-col items-center gap-6"
            >
              <Button
                id="plant-button"
                onClick={onStart}
                variant="3d"
                className="w-full h-16 rounded-3xl font-bold text-[18px] tracking-[0.02em] flex items-center justify-center gap-3 cursor-pointer group/plant transition-all duration-300"
                style={{
                  backgroundColor: "var(--sage-500)",
                  boxShadow: "0 8px 0 var(--sage-700), 0 15px 30px rgba(107, 143, 107, 0.2)",
                }}

              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover/plant:brightness-125 transition-all duration-300">
                  <Leaf className="h-4 w-4 text-white" strokeWidth={1.25} />
                </div>
                <span>Plant Now</span>
              </Button>
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
                <Button
                  id="cancel-button"
                  onClick={onCancel}
                  variant="glass"
                  className="w-full h-14 rounded-2xl font-semibold text-base cursor-pointer hover:bg-white/50 border-white/40"
                >
                  Give up for now
                </Button>
              ) : (
                <Button
                  id="giveup-button"
                  onClick={onGiveUp}
                  variant="3d-danger"
                  className="w-full h-14 rounded-2xl font-semibold text-base tracking-wide cursor-pointer"
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


