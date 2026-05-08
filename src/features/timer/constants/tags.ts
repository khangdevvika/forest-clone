import { type Tag } from "../types/tag"
import { Briefcase, Book, Heart, BookOpen, Zap, Wind, ShieldCheck, GraduationCap, Flame, Glasses, Sparkles, Cloud } from "lucide-react"

export const TAGS: Tag[] = [
  {
    id: "work",
    label: "Work",
    icon: Briefcase,
    evolvedIcon: ShieldCheck,
    color: "var(--sage-600)",
  },
  {
    id: "study",
    label: "Study",
    icon: Book,
    evolvedIcon: GraduationCap,
    color: "var(--warm-500)",
  },
  {
    id: "exercise",
    label: "Exercise",
    icon: Zap,
    evolvedIcon: Flame,
    color: "var(--sage-500)",
  },
  {
    id: "reading",
    label: "Reading",
    icon: BookOpen,
    evolvedIcon: Glasses,
    color: "var(--warm-600)",
  },
  {
    id: "self-care",
    label: "Self-Care",
    icon: Heart,
    evolvedIcon: Sparkles,
    color: "var(--sage-400)",
  },
  {
    id: "meditation",
    label: "Meditation",
    icon: Wind,
    evolvedIcon: Cloud,
    color: "var(--sage-300)",
  },
]

export const DEFAULT_TAG_ID = "work"
