"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { tasksAtom } from "@/features/tasks/store/tasks.atoms"
import { Task } from "@/features/tasks/types/task"
import { AnimatePresence, motion } from "framer-motion"
import { useSetAtom } from "jotai"
import { Plus } from "lucide-react"
import { useState } from "react"

const spring = { type: "spring" as const, stiffness: 280, damping: 22 }

export function AddTaskInput() {
  const [title, setTitle] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const setTasks = useSetAtom(tasksAtom)

  const handleAddTask = () => {
    if (!title.trim()) return

    const newTask: Task = {
      id: Math.random().toString(36).substring(7),
      title: title.trim(),
      category: "other",
      isCompleted: false,
      createdAt: new Date().toISOString(),
      coinsReward: 5,
    }

    setTasks((prev) => [newTask, ...prev])
    setTitle("")
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      {/* iOS 26: Aura glow that blooms when focused */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 -z-10 rounded-3xl"
            style={{
              background: "var(--aura-primary)",
              filter: "blur(20px)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          boxShadow: isFocused
            ? "var(--shadow-md), inset 0 1px 0 var(--rim-light)"
            : "var(--shadow-xs), inset 0 1px 0 var(--rim-light)",
        }}
        transition={spring}
        className="flex items-center gap-2 p-2 rounded-2xl border transition-colors duration-300"
        style={{
          background: "var(--plate-bg)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          borderColor: isFocused ? "var(--primary)" : "var(--plate-border)",
        }}
      >
        {/* Rim light stripe */}
        <div
          className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 40%, var(--rim-light) 60%, transparent)" }}
        />

        <div className="flex-1 flex items-center px-2">
          <Input
            placeholder="What are we focusing on today?"
            className="border-none bg-transparent shadow-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/40 placeholder:font-light"
            style={{ fontFamily: "var(--font-inter)" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => !title && setIsFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
        </div>

        <AnimatePresence>
          {(isFocused || title) && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.85 }}
              transition={spring}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={spring} className="btn-aura">
                <Button
                  onClick={handleAddTask}
                  disabled={!title.trim()}
                  size="sm"
                  className="rounded-xl h-10 px-4 text-primary-foreground shadow-sm"
                  style={{
                    background: title.trim() ? "var(--primary)" : "var(--muted)",
                    boxShadow: title.trim() ? "0 4px 12px var(--aura-primary)" : "none",
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" strokeWidth={2} />
                  Add
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
