export interface Session {
  id: string
  completedAt: string // ISO date string
  durationMinutes: number
  treeId: string
  treeName: string
  treeImage: string
  coinsEarned: number
  mode: "timer" | "stopwatch"
}
