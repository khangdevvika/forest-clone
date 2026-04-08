"use client"

import { useAtomValue } from "jotai"
import { motion } from "framer-motion"
import { tasksAtom, dailyGoalAtom } from "../store/tasks.atoms"
import { Target, Sparkles } from "lucide-react"

export function TaskHeader() {
  const tasks = useAtomValue(tasksAtom)
  const dailyGoal = useAtomValue(dailyGoalAtom)

  const completedToday = tasks.filter(t => t.isCompleted).length
  const progress = Math.min((completedToday / dailyGoal) * 100, 100)

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2"
          >
            Tasks for Today
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-light text-lg"
          >
            Stay focused, grow your garden step by step.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-6 p-4 rounded-3xl bg-card/60 border border-border/40 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-1 min-w-[80px]">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="125.66"
                  initial={{ strokeDashoffset: 125.66 }}
                  animate={{ strokeDashoffset: 125.66 - (progress / 100) * 125.66 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-primary"
                />
              </svg>
              <Target className="absolute w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Goal</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-foreground">{completedToday}</span>
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
