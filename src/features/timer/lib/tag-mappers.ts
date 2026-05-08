import * as Icons from "lucide-react"
import { type Tag, type CustomTag } from "../types/tag"

export const getIconByName = (name: string): Icons.LucideIcon => {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] || Icons.HelpCircle
  return Icon
}

export const mapCustomTagToTag = (customTag: CustomTag): Tag => {
  return {
    id: customTag.id,
    label: customTag.label,
    icon: getIconByName(customTag.iconName),
    color: customTag.color,
    isCustom: true
  }
}
