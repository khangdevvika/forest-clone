import { LucideIcon } from "lucide-react"

export interface Tag {
  id: string
  label: string
  icon: LucideIcon
  evolvedIcon?: LucideIcon
  color: string
  isCustom?: boolean
}

export interface CustomTag {
  id: string
  label: string
  iconName: string
  color: string
  isCustom?: boolean
}

export interface TagLevelInfo {
  level: number
  totalMinutes: number
  nextLevelMinutes: number
  progress: number
}
