"use client"

import { tasksAtom } from "@/features/tasks/store/tasks.atoms"
import { AnimatePresence, motion } from "framer-motion"
import { useAtomValue } from "jotai"
import { TaskItem } from "./task-item"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function TaskList() {
  const tasks = useAtomValue(tasksAtom)

  if (tasks.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-4xl"
          >
            🌱
          </motion.div>
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">Your forest is quiet</h3>
        <p className="text-muted-foreground font-light max-w-xs mx-auto">Add a task to start focusing and growing your garden today.</p>
      </motion.div>
    )
  }

  const activeTasks = tasks.filter((t) => !t.isCompleted)
  const completedTasks = tasks.filter((t) => t.isCompleted)

  return (
    <div className="space-y-12 pb-20">
      {activeTasks.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-4">Daily Focus</h4>
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-3">
            <AnimatePresence mode="popLayout">
              {activeTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-4">Done</h4>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} className="grid gap-3">
            <AnimatePresence mode="popLayout">
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  )
}
