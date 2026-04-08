"use client"

import { useState } from "react"
import { useSetAtom } from "jotai"
import { Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { tasksAtom } from "../store/tasks.atoms"
import { Task } from "../types/task"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
      <motion.div
        animate={{
          scale: isFocused ? 1.01 : 1,
          boxShadow: isFocused 
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.05)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.02)"
        }}
        className={cn(
          "flex items-center gap-2 p-2 rounded-2xl border transition-all duration-300",
          isFocused 
            ? "border-primary/40 bg-card/80 backdrop-blur-md" 
            : "border-border/40 bg-card/40 backdrop-blur-sm"
        )}
      >
        <div className="flex-1 flex items-center px-2">
          <Input
            placeholder="What are we focusing on today?"
            className="border-none bg-transparent shadow-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50 placeholder:font-light"
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
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <Button 
                onClick={handleAddTask}
                disabled={!title.trim()}
                size="sm"
                className="rounded-xl h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
