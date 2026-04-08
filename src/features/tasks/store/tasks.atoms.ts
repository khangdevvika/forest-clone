import { Task } from "@/features/tasks/types/task"
import { atomWithStorage } from "jotai/utils"

export const tasksAtom = atomWithStorage<Task[]>("forest-tasks", [])
export const activeTaskIdAtom = atomWithStorage<string | null>("forest-active-task", null)

// Daily focus goal (e.g., 3 tasks)
export const dailyGoalAtom = atomWithStorage<number>("forest-daily-task-goal", 3)
