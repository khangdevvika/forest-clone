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

const gentleSpring = { type: "spring" as const, stiffness: 160, damping: 28 }

export default function StorePage() {
  const { coins } = useUser()
  const [activeTab, setActiveTab] = useState("Trees")
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background text-foreground zen-bg antialiased overflow-hidden">
      {/* iOS 26: Ambient aura blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-[-10%] right-[-8%] w-[55%] h-[55%] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--aura-primary) 0%, transparent 70%)",
            filter: "blur(70px)",
            opacity: 0.50,
          }}
        />
        <div
          className="absolute bottom-[5%] left-[-10%] w-[45%] h-[45%] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--aura-accent) 0%, transparent 70%)",
            filter: "blur(90px)",
            opacity: 0.40,
          }}
        />
      </div>

      <PageHeader title="Botanical Garden" subtitle="Discover diverse plant species and start your growing journey.">
        {/* iOS 26: Coin display — eco-island style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={gentleSpring}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="eco-island group relative flex items-center gap-3 px-5 py-3 rounded-2xl cursor-default"
        >
          {/* Rim light */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 50%, transparent)" }}
          />

          <motion.div
            whileHover={{ rotate: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="h-8 w-8 rounded-xl flex items-center justify-center shadow-md shrink-0"
            style={{
              background: "var(--warm-400)",
              boxShadow: "0 4px 12px rgba(212,175,130,0.35)",
            }}
          >
            <Coins className="h-4 w-4 text-amber-900" strokeWidth={2} />
          </motion.div>

          <div className="flex flex-col items-start">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] leading-none mb-0.5">
              Clover Coins
            </span>
            <span
              className="text-xl font-light tabular-nums leading-none text-foreground"
              style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.01em" }}
            >
              {coins.toLocaleString()}
            </span>
          </div>
        </motion.div>
      </PageHeader>

      <ScrollArea className="flex-1 w-full relative z-10 no-scrollbar">
        <div className="max-w-6xl mx-auto px-8 py-10 pb-40">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-10">
            {/* Tab Switcher */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <StoreTabBar activeTab={activeTab} onChange={setActiveTab} />
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                transition={gentleSpring}
                className="outline-none"
              >
                {activeTab === "Trees" ? (
                  <div className="space-y-10">
                    <div className="flex flex-col gap-2 px-4 mb-4">
                      <h2
                        className="text-[22px] font-light text-foreground tracking-tight"
                        style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.01em" }}
                      >
                        Featured Collection
                      </h2>
                      <p className="text-[14px] text-muted-foreground font-light">
                        Select your next botanical companion to start growing together.
                      </p>
                    </div>
                    <TreeGrid activeTab="Classic" onSelect={setSelectedTree} />
                  </div>
                ) : (
                  <div className="max-w-5xl mx-auto">
                    {activeTab === "Sound"  && <SoundTab />}
                    {activeTab === "Theme"  && <ThemeTab />}
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
