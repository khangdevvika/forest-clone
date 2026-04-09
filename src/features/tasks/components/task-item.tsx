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
  work: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  study: "bg-primary/10 text-primary border-primary/20",
  personal: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
  exercise: "bg-warm-500/10 text-warm-600 border-warm-500/20",
  other: "bg-muted/50 text-muted-foreground border-border/50",
}

export function TaskItem({ task }: TaskItemProps) {
  const [tasks, setTasks] = useAtom(tasksAtom)
  const [activeTaskId, setActiveTaskId] = useAtom(activeTaskIdAtom)
  const { addCoins } = useUser()

  const toggleComplete = () => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === task.id) {
          const isCompleting = !t.isCompleted
          if (isCompleting) {
            addCoins(task.coinsReward)
          }
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
    if (activeTaskId === task.id) {
      setActiveTaskId(null)
    }
  }

  const selectTask = () => {
    setActiveTaskId(task.id === activeTaskId ? null : task.id)
  }

  const isActive = activeTaskId === task.id

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ 
        backgroundColor: isActive ? "rgba(107, 143, 107, 0.08)" : "rgba(255, 255, 255, 0.5)",
        borderColor: "rgba(107, 143, 107, 0.2)"
      }}
      transition={{ duration: 0.3 }}
      onClick={selectTask}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer",
        task.isCompleted ? "bg-muted/30 border-border/20" : isActive ? "bg-primary/5 border-primary/30 shadow-sm" : "bg-card/40 border-border/40 hover:border-primary/20 hover:bg-card/60",
      )}
    >
      {/* Custom Checkbox */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={(e) => {
          e.stopPropagation()
          toggleComplete()
        }}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          task.isCompleted ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 hover:border-primary/50",
        )}
      >
        {task.isCompleted && <Check className="w-4 h-4" />}
      </motion.button>

      <div className="flex-1 min-w-0">
        <h3 className={cn("font-medium transition-all duration-300 truncate", task.isCompleted ? "text-muted-foreground line-through decoration-muted-foreground/50" : "text-foreground")}>
          {task.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className={cn("text-[10px] capitalize font-medium py-0 h-5 px-1.5 border-transparent", categoryStyles[task.category])}>
            {task.category}
          </Badge>
          {task.isCompleted && (
            <span className="flex items-center gap-1 text-[10px] text-warm-600 font-bold">
              <Trophy className="w-3 h-3" />+{task.coinsReward}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation()
            deleteTask()
          }}
          className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
