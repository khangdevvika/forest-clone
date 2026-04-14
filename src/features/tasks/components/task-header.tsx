"use client"

import { dailyGoalAtom, tasksAtom } from "@/features/tasks/store/tasks.atoms"
import { motion } from "framer-motion"
import { useAtomValue } from "jotai"
import { Sparkles, Target } from "lucide-react"

const gentleSpring = { type: "spring" as const, stiffness: 160, damping: 28 }

export function TaskHeader() {
  const tasks = useAtomValue(tasksAtom)
  const dailyGoal = useAtomValue(dailyGoalAtom)

  const completedToday = tasks.filter((t) => t.isCompleted).length
  const progress = Math.min((completedToday / dailyGoal) * 100, 100)

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...gentleSpring }}
            className="eco-island inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl mb-4"
          >
            <Target className="w-3.5 h-3.5 text-primary" strokeWidth={1.25} />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary/80">Daily Focus</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.05, ...gentleSpring }}
            className="text-4xl md:text-5xl font-extralight text-foreground mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            Tasks for Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, ...gentleSpring }}
            className="text-muted-foreground font-light text-lg"
          >
            Stay focused, grow your garden step by step.
          </motion.p>
        </div>

        {/* iOS 26: Plate progress panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.18, ...gentleSpring }}
          className="plate flex items-center gap-6 p-5 rounded-[1.75rem] relative overflow-hidden"
        >
          {/* Rim light */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 50%, transparent)" }}
          />
          {/* Aura glow */}
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-full translate-x-8 -translate-y-8 pointer-events-none"
            style={{ background: "var(--aura-primary)", filter: "blur(24px)" }}
          />

          {/* Progress ring */}
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 12px var(--aura-primary)", opacity: 0.7 }}
            />
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted/20" />
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="150.8"
                initial={{ strokeDashoffset: 150.8 }}
                animate={{ strokeDashoffset: 150.8 - (progress / 100) * 150.8 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="text-primary"
                style={{ filter: "drop-shadow(0 0 3px var(--primary))" }}
              />
            </svg>
            <Target className="absolute w-5 h-5 text-primary" strokeWidth={1.25} />
          </div>

          {/* Counts */}
          <div className="flex flex-col gap-1 relative z-10">
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl font-light text-foreground"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {completedToday}
              </span>
              <span className="text-muted-foreground font-light text-sm">/ {dailyGoal}</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              {progress >= 100 ? (
                <>
                  <Sparkles className="w-3 h-3 text-warm-600" />
                  <span className="text-warm-600 font-medium">Goal reached!</span>
                </>
              ) : (
                "tasks completed"
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
