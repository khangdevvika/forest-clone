import { Heart, Leaf, Star, Sun, Trophy, Zap, type LucideIcon } from "lucide-react"

export type Achievement = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  requirement: (stats: { totalMinutes: number; totalSessions: number; bestStreak: number; ownedTrees: number }) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-seed",
    title: "First Seed",
    description: "Completed your first focus session.",
    icon: Leaf,
    requirement: (stats) => stats.totalSessions >= 1,
  },
  {
    id: "consistency",
    title: "Rooted",
    description: "Reached a 3-day streak.",
    icon: Zap,
    requirement: (stats) => stats.bestStreak >= 3,
  },
  {
    id: "centurion",
    title: "Centurion",
    description: "Focused for a total of 100 minutes.",
    icon: Trophy,
    requirement: (stats) => stats.totalMinutes >= 100,
  },
  {
    id: "biodiversity",
    title: "Biodiversity",
    description: "Unlocked 5 different tree species.",
    icon: Star,
    requirement: (stats) => stats.ownedTrees >= 5,
  },
  {
    id: "early-bird",
    title: "Early Bird",
    description: "Focused for 1,000 minutes in total.",
    icon: Sun,
    requirement: (stats) => stats.totalMinutes >= 1000,
  },
  {
    id: "forest-guardian",
    title: "Forest Guardian",
    description: "Planted 50 trees in your sanctuary.",
    icon: Heart,
    requirement: (stats) => stats.totalSessions >= 50,
  },
]
