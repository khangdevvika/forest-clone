"use client"

import { PageHeader } from "@/components/page-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StoreTabBar } from "@/features/store/components/store-tab-bar"
import { TreeDetailDialog } from "@/features/store/components/tree-detail-dialog"
import { TreeGrid } from "@/features/store/components/tree-grid"
import type { Tree } from "@/features/timer/types/tree"
import { useUser } from "@/hooks/use-user"
import { AnimatePresence, motion } from "framer-motion"
import { Coins } from "lucide-react"
import { useState } from "react"

import { PotionTab } from "@/features/store/components/potion-tab"
import { SoundTab } from "@/features/store/components/sound-tab"
import { ThemeTab } from "@/features/store/components/theme-tab"
import { fadeUp, staggerContainer } from "@/lib/animations"

export default function StorePage() {
  const { coins } = useUser()
  const [activeTab, setActiveTab] = useState("Trees")
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background text-foreground zen-bg antialiased overflow-hidden">
      <PageHeader title="Botanical Garden" subtitle="Discover diverse plant species and start your growing journey.">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group relative flex items-center gap-4 px-6 py-2.5 rounded-full bg-card border border-border/50 shadow-sm transition-all duration-300"
        >
          <div className="h-8 w-8 bg-warm-500 rounded-full flex items-center justify-center shadow-md">
            <Coins className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] leading-none mb-1">Clover Coins</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold tabular-nums tracking-tight leading-none text-foreground">{coins.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      </PageHeader>

      <ScrollArea className="flex-1 w-full relative z-10 no-scrollbar">
        <div className="max-w-6xl mx-auto px-8 py-10 pb-40">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-12">
            {/* Tab Switcher - Simple and Zen */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <StoreTabBar activeTab={activeTab} onChange={setActiveTab} />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="outline-none">
                {activeTab === "Trees" ? (
                  <div className="space-y-12">
                    <div className="flex flex-col gap-2 px-4 mb-4">
                      <h2 className="text-[18px] font-bold text-foreground">Featured Collection</h2>
                      <p className="text-[14px] text-muted-foreground">Select your next botanical companion to start growing together.</p>
                    </div>
                    <TreeGrid activeTab="Classic" onSelect={setSelectedTree} />
                  </div>
                ) : (
                  <div className="max-w-5xl mx-auto">
                    {activeTab === "Sound" && <SoundTab />}
                    {activeTab === "Theme" && <ThemeTab />}
                    {activeTab === "Potion" && <PotionTab />}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </ScrollArea>

      <TreeDetailDialog tree={selectedTree} onClose={() => setSelectedTree(null)} />
    </div>
  )
}
