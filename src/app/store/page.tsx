"use client"

import { useState } from "react"
import { Coins } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StoreTabBar } from "@/features/store/components/store-tab-bar"
import { SoundTab } from "@/features/store/components/sound-tab"
import { FeaturedTreeCard } from "@/features/store/components/featured-tree-card"
import { TreeGrid } from "@/features/store/components/tree-grid"
import { TreeDetailDialog } from "@/features/store/components/tree-detail-dialog"
import type { Tree } from "@/features/timer/types/tree"

export default function StorePage() {
  const { coins } = useUser()
  const [activeTab, setActiveTab] = useState("Classic")
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gray-50 text-gray-900 antialiased font-sans">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-none">Species Store</h1>
            <p className="text-[10px] text-green-600 font-semibold uppercase tracking-widest mt-0.5">
              Nature Sanctuary
            </p>
          </div>

          <div
            className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
            id="coin-display"
          >
            <div className="h-4 w-4 bg-yellow-400 rounded-sm flex items-center justify-center">
              <Coins className="h-2.5 w-2.5 text-yellow-900" />
            </div>
            <span className="text-gray-900 text-sm font-semibold tabular-nums">{coins.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 w-full">
        <div className="max-w-3xl mx-auto px-6 py-8 pb-24 space-y-10">
          <StoreTabBar activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === "Sound" ? (
            <SoundTab />
          ) : (
            <div className="space-y-10">
              <FeaturedTreeCard onSelect={setSelectedTree} />
              <TreeGrid activeTab={activeTab} onSelect={setSelectedTree} />
            </div>
          )}
        </div>
      </ScrollArea>

      <TreeDetailDialog tree={selectedTree} onClose={() => setSelectedTree(null)} />
    </div>
  )
}
