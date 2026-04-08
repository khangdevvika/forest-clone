"use client"

import { AnimatedTabs } from "@/components/ui/animated-tabs"
import { cn } from "@/lib/utils"

const TABS = ["Trees", "Sound", "Theme", "Potion"] as const
export type StoreTab = (typeof TABS)[number]

interface StoreTabBarProps {
  activeTab: string
  onChange: (tab: string) => void
}

export function StoreTabBar({ activeTab, onChange }: StoreTabBarProps) {
  return (
    <AnimatedTabs
      variant="card"
      tabs={TABS as unknown as string[]}
      activeTab={activeTab}
      onChange={onChange}
      layoutId="store-active-pill"
    />
  )
}
