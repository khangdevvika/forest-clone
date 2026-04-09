import { Briefcase, Book, Heart, BookOpen, Zap, Wind, type LucideIcon } from "lucide-react"

export interface Tag {
  id: string
  label: string
  icon: LucideIcon
  color: string // CSS variable matching Zen Organic palette
}

export const TAGS: Tag[] = [
  {
    id: "work",
    label: "Work",
    icon: Briefcase,
    color: "var(--sage-600)",
  },
  {
    id: "study",
    label: "Study",
    icon: Book,
    color: "var(--warm-500)",
  },
  {
    id: "exercise",
    label: "Exercise",
    icon: Zap,
    color: "var(--sage-500)",
  },
  {
    id: "reading",
    label: "Reading",
    icon: BookOpen,
    color: "var(--warm-600)",
  },
  {
    id: "self-care",
    label: "Self-Care",
    icon: Heart,
    color: "var(--sage-400)",
  },
  {
    id: "meditation",
    label: "Meditation",
    icon: Wind,
    color: "var(--sage-300)",
  },
]

export const DEFAULT_TAG_ID = "work"
