"use client"

import { useState } from "react"
import { Coins } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"
import { StoreTabBar } from "@/features/store/components/store-tab-bar"
import { SoundTab } from "@/features/store/components/sound-tab"
import { FeaturedTreeCard } from "@/features/store/components/featured-tree-card"
import { TreeGrid } from "@/features/store/components/tree-grid"
import { TreeDetailDialog } from "@/features/store/components/tree-detail-dialog"
import { motion } from "framer-motion"
import type { Tree } from "@/features/timer/types/tree"

import { ThemeTab } from "@/features/store/components/theme-tab"
import { PotionTab } from "@/features/store/components/potion-tab"

export default function StorePage() {
  const { coins } = useUser()
  const [activeTab, setActiveTab] = useState("Trees")
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background text-foreground antialiased font-sans">
      <PageHeader title="Species Store" subtitle="Nature Sanctuary">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-muted border border-border rounded-xl px-4 py-2 cursor-pointer hover:bg-muted/80 transition-all duration-200 shadow-sm"
          id="coin-display"
        >
          <div className="h-5 w-5 bg-[#d4af82] rounded-lg flex items-center justify-center shadow-inner">
            <Coins className="h-3 w-3 text-yellow-950" strokeWidth={2.5} />
          </div>
          <span className="text-foreground text-sm font-bold tabular-nums">{coins.toLocaleString()}</span>
        </motion.div>
      </PageHeader>

      <ScrollArea className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-6 py-8 pb-32 space-y-10">
          <div className="flex justify-center">
            <StoreTabBar activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div className="mt-4">
            {activeTab === "Sound" && <SoundTab />}
            {activeTab === "Theme" && <ThemeTab />}
            {activeTab === "Potion" && <PotionTab />}
            {activeTab === "Trees" && (
              <div className="space-y-10">
                <FeaturedTreeCard onSelect={setSelectedTree} />
                <TreeGrid activeTab="Classic" onSelect={setSelectedTree} />
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <TreeDetailDialog tree={selectedTree} onClose={() => setSelectedTree(null)} />
    </div>
  )
}
