export type TaskCategory = "work" | "study" | "personal" | "exercise" | "other"

export interface Task {
  id: string
  title: string
  category: TaskCategory
  isCompleted: boolean
  createdAt: string
  completedAt?: string
  coinsReward: number
}
