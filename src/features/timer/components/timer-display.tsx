"use client"

import { cn } from "@/lib/utils"
import { TimerMode } from "@/features/timer/enum/timer"
import { CircularTimer } from "@/features/timer/components/circular-timer"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, scaleIn, staggerContainer, spring } from "@/lib/animations"
import type { Tree } from "@/features/timer/types"
import { useUser } from "@/hooks/use-user"
import { POTION_ITEMS } from "@/features/store/constants/items"
import { Zap, ListTodo } from "lucide-react"
import { useAtomValue } from "jotai"
import { tasksAtom, activeTaskIdAtom } from "@/features/tasks/store/tasks.atoms"

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

export function TimerDisplay({ isActive, mode, displayMinutes, setMinutes, bloomKey, activeTree, formattedTime, progressPercent }: TimerDisplayProps) {
  const { activePotionId } = useUser()
  const activePotion = POTION_ITEMS.find((p) => p.id === activePotionId)
  
  const tasks = useAtomValue(tasksAtom)
  const activeTaskId = useAtomValue(activeTaskIdAtom)
  const activeTask = tasks.find((t) => t.id === activeTaskId)

  return (
    <motion.main variants={staggerContainer} initial="hidden" animate="show" className="flex-1 w-full flex flex-col items-center justify-around py-6 px-6 min-h-0">
      {/* Status label */}
      <motion.p variants={fadeUp} className="text-[--timer-muted] text-[10px] md:text-xs font-bold tracking-[0.2em] text-center uppercase flex items-center gap-2">
        {activeTask && (
          <ListTodo className="w-3.5 h-3.5 opacity-50" />
        )}
        {isActive 
          ? (activeTask ? `FOCUSING: ${activeTask.title}` : "Stay focused — growing tree") 
          : (activeTask ? `READY: ${activeTask.title}` : "Select a task or plant")
        }
      </motion.p>

      {/* Tree & circular slider */}
      <motion.div key={bloomKey} variants={scaleIn} className={cn("transition-all duration-500", isActive ? "scale-90" : "scale-100")}>
        <CircularTimer mode={mode} minutes={displayMinutes} onChange={setMinutes} disabled={isActive} treeImage={activeTree.image} />
      </motion.div>

      {/* Timer display + tree name */}
      <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
        {/* Big time — Outfit 100 */}
        <div
          className="text-[72px] md:text-[96px] leading-none tabular-nums text-[--timer-text]"
          style={{
            fontFamily: "var(--font-outfit)",
            fontWeight: 100,
            textShadow: "0 2px 20px rgba(27,43,26,0.1)",
            letterSpacing: "-0.03em",
          }}
        >
          {formattedTime}
        </div>

        <div className="flex flex-col items-center gap-1.5">
          {/* Active tree badge */}
          {!isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring}
              className="flex items-center gap-2 bg-white/50 border border-white/60 backdrop-blur-md rounded-lg px-3.5 py-1.5 shadow-sm shadow-white/10"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-foreground text-xs font-semibold font-(family-name:--font-inter) tracking-wide uppercase">{activeTree.name}</span>
            </motion.div>
          )}

          {/* Active potion indicator */}
          <AnimatePresence>
            {activePotion && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1.5 bg-primary/20 backdrop-blur-md border border-primary/20 rounded-md px-2.5 py-1 mt-1 shadow-sm shadow-primary/5"
              >
                <Zap className="h-3.5 w-3.5 text-primary animate-pulse fill-current" strokeWidth={2.5} />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.08em] mt-0.5">{activePotion.multiplier}x BOOST</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
              <div className="h-full bg-[--sage-700] rounded-full transition-all duration-1000 ease-linear opacity-60" style={{ width: `${progressPercent}%` }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.main>
  )
}
