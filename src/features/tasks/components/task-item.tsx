"use client"

import { Badge } from "@/components/ui/badge"
import { activeTaskIdAtom, tasksAtom } from "@/features/tasks/store/tasks.atoms"
import { Task, TaskCategory } from "@/features/tasks/types/task"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { Check, Trash2, Trophy } from "lucide-react"

interface TaskItemProps {
  task: Task
}

const categoryStyles: Record<TaskCategory, string> = {
  work:     "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  study:    "bg-primary/10 text-primary border-primary/20",
  personal: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
  exercise: "bg-warm-500/10 text-warm-600 border-warm-500/20",
  other:    "bg-muted/50 text-muted-foreground border-border/50",
}

// iOS 26: Per-category aura color
const categoryAura: Record<TaskCategory, string> = {
  work:     "rgba(59,130,246,0.10)",
  study:    "var(--aura-primary)",
  personal: "rgba(244,63,94,0.10)",
  exercise: "rgba(212,175,130,0.12)",
  other:    "var(--aura-primary)",
}

const spring = { type: "spring" as const, stiffness: 280, damping: 22 }
const gentleSpring = { type: "spring" as const, stiffness: 160, damping: 28 }

export function TaskItem({ task }: TaskItemProps) {
  const [, setTasks] = useAtom(tasksAtom)
  const [activeTaskId, setActiveTaskId] = useAtom(activeTaskIdAtom)
  const { addCoins } = useUser()

  const toggleComplete = () => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === task.id) {
          const isCompleting = !t.isCompleted
          if (isCompleting) addCoins(task.coinsReward)
          return {
            ...t,
            isCompleted: isCompleting,
            completedAt: isCompleting ? new Date().toISOString() : undefined,
          }
        }
        return t
      }),
    )
  }

  const deleteTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
    if (activeTaskId === task.id) setActiveTaskId(null)
  }

  const selectTask = () => {
    setActiveTaskId(task.id === activeTaskId ? null : task.id)
  }

  const isActive = activeTaskId === task.id

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(3px)" }}
      transition={gentleSpring}
      whileHover={{ y: -2 }}
      onClick={selectTask}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
        task.isCompleted
          ? "opacity-60"
          : isActive
            ? "border-primary/35"
            : "hover:border-primary/20",
      )}
      style={{
        background: task.isCompleted
          ? "var(--muted)"
          : isActive
            ? "var(--plate-bg)"
            : "var(--plate-bg)",
        backdropFilter: "blur(12px) saturate(150%)",
        WebkitBackdropFilter: "blur(12px) saturate(150%)",
        borderColor: task.isCompleted
          ? "var(--border)"
          : isActive
            ? "var(--primary)"
            : "var(--plate-border)",
        boxShadow: isActive
          ? "var(--shadow-md), inset 0 1px 0 var(--rim-light)"
          : "var(--shadow-xs), inset 0 1px 0 var(--rim-light)",
      }}
    >
      {/* Rim light */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 40%, var(--rim-light) 60%, transparent)" }}
      />

      {/* Active aura glow per category */}
      {isActive && !task.isCompleted && (
        <div
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${categoryAura[task.category]} 0%, transparent 70%)`,
            filter: "blur(16px)",
          }}
        />
      )}

      {/* iOS 26: Squircle checkbox */}
      <motion.button
        whileTap={{ scale: 0.75 }}
        transition={spring}
        onClick={(e) => {
          e.stopPropagation()
          toggleComplete()
        }}
        className={cn(
          "w-6 h-6 flex items-center justify-center transition-all duration-300 shrink-0",
          task.isCompleted
            ? "text-primary-foreground"
            : "border-2 border-muted-foreground/30 hover:border-primary/60",
        )}
        style={{
          borderRadius: "35%",
          background: task.isCompleted ? "var(--primary)" : "transparent",
          boxShadow: task.isCompleted ? "0 2px 8px var(--aura-primary)" : "none",
        }}
      >
        {task.isCompleted && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
      </motion.button>

      {/* Task content */}
      <div className="flex-1 min-w-0 relative z-10">
        <h3
          className={cn(
            "font-medium transition-all duration-300 truncate",
            task.isCompleted ? "text-muted-foreground line-through decoration-muted-foreground/50" : "text-foreground",
          )}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {task.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="outline"
            className={cn("text-[10px] capitalize font-medium py-0 h-5 px-1.5 border-transparent", categoryStyles[task.category])}
          >
            {task.category}
          </Badge>
          {task.isCompleted && (
            <span className="flex items-center gap-1 text-[10px] text-warm-600 font-bold">
              <Trophy className="w-3 h-3" />+{task.coinsReward}
            </span>
          )}
        </div>
      </div>

      {/* Delete button */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={spring}
          onClick={(e) => {
            e.stopPropagation()
            deleteTask()
          }}
          className="p-2 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
        </motion.button>
      </div>
    </motion.div>
  )
}
