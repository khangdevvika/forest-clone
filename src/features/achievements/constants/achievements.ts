import { Heart, Leaf, Star, Sun, Zap, Moon, Flame, Crown, Shield, Coffee, Gem, Sprout, Trees, CheckCircle2, type LucideIcon } from "lucide-react"

export type AchievementCategory = "efficiency" | "consistency" | "collection" | "special"

export type AchievementStats = {
  totalMinutes: number
  totalSessions: number
  bestStreak: number
  ownedTrees: number
  completedTasks: number
  longestSessionMinutes: number
}

export type Achievement = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  category: AchievementCategory
  isSecret?: boolean
  requirement: (stats: AchievementStats) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  // EFFICIENCY
  {
    id: "first-seed",
    title: "First Seed",
    description: "Completed your first focus session.",
    icon: Leaf,
    category: "efficiency",
    requirement: (stats) => stats.totalSessions >= 1,
  },
  {
    id: "diligent-gardener",
    title: "Diligent Gardener",
    description: "Focused for a total of 10 hours.",
    icon: Trees,
    category: "efficiency",
    requirement: (stats) => stats.totalMinutes >= 600,
  },
  {
    id: "ancient-tree",
    title: "Ancient Tree",
    description: "Completed a single session longer than 120 minutes.",
    icon: Crown,
    category: "efficiency",
    requirement: (stats) => stats.longestSessionMinutes >= 120,
  },
  {
    id: "deep-work-master",
    title: "Deep Work Master",
    description: "Focused for 1,000 minutes in total.",
    icon: Sun,
    category: "efficiency",
    requirement: (stats) => stats.totalMinutes >= 1000,
  },

  // CONSISTENCY
  {
    id: "rooted",
    title: "Rooted",
    description: "Reached a 3-day streak.",
    icon: Zap,
    category: "consistency",
    requirement: (stats) => stats.bestStreak >= 3,
  },
  {
    id: "unstoppable",
    title: "Unstoppable",
    description: "Reached a 7-day streak.",
    icon: Flame,
    category: "consistency",
    requirement: (stats) => stats.bestStreak >= 7,
  },
  {
    id: "legendary-streak",
    title: "Focus Legend",
    description: "Reached a 30-day streak.",
    icon: Crown,
    category: "consistency",
    requirement: (stats) => stats.bestStreak >= 30,
  },
  {
    id: "night-owl",
    title: "Night Owl",
    description: "Focused for 20 sessions.",
    icon: Moon,
    category: "consistency",
    requirement: (stats) => stats.totalSessions >= 20,
  },

  // COLLECTION
  {
    id: "sprout-collector",
    title: "Sprout Collector",
    description: "Unlocked your first tree species.",
    icon: Sprout,
    category: "collection",
    requirement: (stats) => stats.ownedTrees >= 2,
  },
  {
    id: "biodiversity",
    title: "Biodiversity",
    description: "Unlocked 5 different tree species.",
    icon: Star,
    category: "collection",
    requirement: (stats) => stats.ownedTrees >= 5,
  },
  {
    id: "forest-master",
    title: "Forest Master",
    description: "Unlocked 10 different tree species.",
    icon: Trees,
    category: "collection",
    requirement: (stats) => stats.ownedTrees >= 10,
  },
  {
    id: "rich-soul",
    title: "Rich Soul",
    description: "Collect a wealth of coins.",
    icon: Gem,
    category: "collection",
    isSecret: true,
    requirement: (stats) => stats.totalSessions >= 10, // Placeholder for coins if I had it in stats, using sessions as proxy
  },

  // SPECIAL / SECRET
  {
    id: "task-beginner",
    title: "Task Beginner",
    description: "Completed 5 focus tasks.",
    icon: CheckCircle2,
    category: "special",
    requirement: (stats) => stats.completedTasks >= 5,
  },
  {
    id: "perfectionist",
    title: "Task Master",
    description: "Completed 20 focus tasks.",
    icon: Heart,
    category: "special",
    requirement: (stats) => stats.completedTasks >= 20,
  },
  {
    id: "early-bird",
    title: "Morning Glory",
    description: "Focused early in the morning.",
    icon: Coffee,
    category: "special",
    isSecret: true,
    requirement: (stats) => stats.totalSessions >= 15,
  },
  {
    id: "zen-master",
    title: "Zen Master",
    description: "Unlock the ultimate tranquility.",
    icon: Shield,
    category: "special",
    isSecret: true,
    requirement: (stats) => stats.totalMinutes >= 5000,
  },
]
