"use client"

import { cn } from "@/lib/utils"

import { motion } from "framer-motion"

const TABS = ["Trees", "Sound", "Theme", "Potion"] as const
export type StoreTab = (typeof TABS)[number]

interface StoreTabBarProps {
  activeTab: string
  onChange: (tab: string) => void
}

export function StoreTabBar({ activeTab, onChange }: StoreTabBarProps) {
  return (
    <div className="flex items-center gap-1 bg-muted/50 border border-border/50 rounded-xl p-1 w-fit shadow-inner">
      {TABS.map((tab) => (
        <button
          key={tab}
          id={`tab-${tab.toLowerCase()}`}
          onClick={() => onChange(tab)}
          className={cn(
            "relative px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none z-0",
            activeTab === tab ? "text-primary" : "text-muted-foreground/60 hover:text-foreground",
          )}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="store-active-pill"
              className="absolute inset-0 bg-card rounded-lg shadow-sm z-[-1]"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          {tab}
        </button>
      ))}
    </div>
  )
}
