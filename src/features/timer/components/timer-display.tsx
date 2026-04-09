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
import { TagSelector } from "@/features/timer/components/tag-selector"
import { TAGS } from "@/features/timer/constants/tags"
import { selectedTagIdAtom } from "@/features/timer/store/timer.atoms"

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
  
  const selectedTagId = useAtomValue(selectedTagIdAtom)
  const selectedTag = TAGS.find(t => t.id === selectedTagId) || TAGS[0]

  return (
    <motion.main variants={staggerContainer} initial="hidden" animate="show" className="flex-1 w-full flex flex-col items-center justify-between py-6 md:py-8 px-6 min-h-0 overflow-hidden">
      {/* Top Status Label - Minimalist approach */}
      <motion.div variants={fadeUp} className="flex flex-col items-center gap-1.5 shrink-0">
        <p className="text-[--timer-muted] text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-center uppercase flex items-center gap-2">
          {activeTask && (
            <ListTodo className="w-3.5 h-3.5 opacity-50" />
          )}
          {isActive 
            ? (activeTask ? `FOCUSING: ${activeTask.title}` : `Focusing on ${selectedTag.label}`) 
            : (activeTask ? `READY TO START` : "Nature is waiting")
          }
        </p>
        {!isActive && activeTask && (
          <span className="text-[10px] text-primary/70 font-medium uppercase tracking-wider">{activeTask.title}</span>
        )}
      </motion.div>

      {/* Tree & circular slider with integrated metadata */}
      <div className="flex flex-col items-center gap-6">
        {/* Category Selector - Only shown when NOT active */}
        {!isActive && (
          <motion.div variants={fadeUp} className="mb-2">
            <TagSelector disabled={isActive} />
          </motion.div>
        )}

        <motion.div key={bloomKey} variants={scaleIn} className={cn("transition-all duration-500", isActive ? "scale-90" : "scale-105")}>
          <CircularTimer mode={mode} minutes={displayMinutes} onChange={setMinutes} disabled={isActive} treeImage={activeTree.image} />
        </motion.div>

        {/* Info Pill: Tree Name & Boost - No absolute positioning */}
        {!isActive && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="px-3.5 py-1.5 bg-white/40 border border-white/60 backdrop-blur-md rounded-full shadow-sm shadow-black/5 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.1em] text-[--timer-text] uppercase">{activeTree.name}</span>
              
              {activePotion && (
                <>
                  <div className="w-[1px] h-2.5 bg-[--timer-text]/10 mx-0.5" />
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-primary fill-current" />
                    <span className="text-[10px] font-black text-primary tracking-tight">{activePotion.multiplier}X</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Timer display */}
      <motion.div variants={fadeUp} className="flex flex-col items-center gap-0 w-full shrink-0">
        {/* Big time — Outfit 100 */}
        <div
          className="text-[88px] md:text-[116px] leading-none tabular-nums text-[--timer-text]"
          style={{
            fontFamily: "var(--font-outfit)",
            fontWeight: 100,
            textShadow: "0 4px 30px rgba(27,43,26,0.08)",
            letterSpacing: "-0.04em",
          }}
        >
          {formattedTime}
        </div>

        {/* Progress bar only when active */}
        <div className="h-6 flex items-center justify-center w-full">
          <AnimatePresence>
            {isActive && mode === TimerMode.TIMER && (
               <motion.div
                 initial={{ opacity: 0, scaleX: 0.5 }}
                 animate={{ opacity: 1, scaleX: 1 }}
                 exit={{ opacity: 0 }}
                 transition={spring}
                 className="w-48 h-0.5 bg-black/5 rounded-full overflow-hidden"
               >
                 <div className="h-full bg-[--sage-500] rounded-full transition-all duration-1000 ease-linear opacity-40" style={{ width: `${progressPercent}%` }} />
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.main>


  )
}
