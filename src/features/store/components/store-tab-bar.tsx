"use client"

import { cn } from "@/lib/utils"

const TABS = ["Classic", "Exclusive", "Sound"] as const
export type StoreTab = (typeof TABS)[number]

interface StoreTabBarProps {
  activeTab: string
  onChange: (tab: string) => void
}

export function StoreTabBar({ activeTab, onChange }: StoreTabBarProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
      {TABS.map((tab) => (
        <button
          key={tab}
          id={`tab-${tab.toLowerCase()}`}
          onClick={() => onChange(tab)}
          className={cn(
            "relative px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none",
            activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
