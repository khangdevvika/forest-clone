"use client"

import React, { useState, useMemo } from "react"
import { Coins, Lock, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"
import { Tree, STORE_TREES } from "@/features/timer/constants/trees"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CrystalButton } from "@/components/ui/crystal-button"

const TABS = ["Classic", "Exclusive", "Sound"] as const

export default function StorePage() {
  const { coins, unlockedTrees, selectedTreeId, buyTree, selectTree } = useUser()
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)
  const [activeTab, setActiveTab] = useState<string>("Classic")

  const featuredTree = useMemo(() => STORE_TREES.find((t) => t.id === "jacaranda") || STORE_TREES[0], [])
  const filteredTrees = useMemo(() => STORE_TREES.filter((t) => t.id !== featuredTree.id), [featuredTree])

  const handleEquip = (tree: Tree) => {
    selectTree(tree.id)
    setSelectedTree(null)
  }

  const handleBuy = (tree: Tree) => {
    buyTree(tree)
  }

  const isUnlockedFeatured = unlockedTrees.includes(featuredTree.id)
  const isSelectedFeatured = selectedTreeId === featuredTree.id

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gray-50 text-gray-900 antialiased font-sans">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-none">Species Store</h1>
            <p className="text-[10px] text-green-600 font-semibold uppercase tracking-widest mt-0.5">Nature Sanctuary</p>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors duration-150" id="coin-display">
            <div className="h-4 w-4 bg-yellow-400 rounded-sm flex items-center justify-center">
              <Coins className="h-2.5 w-2.5 text-yellow-900" />
            </div>
            <span className="text-gray-900 text-sm font-semibold tabular-nums">{coins.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 w-full">
        <div className="max-w-3xl mx-auto px-6 py-8 pb-24 space-y-10">
          {/* ── Category Tabs ─────────────────────────────── */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none",
                  activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700",
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Featured ──────────────────────────────────── */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md">Featured</Badge>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 -mt-1">Today&apos;s specimen</h2>

            <motion.div layout whileHover={{ y: -2 }} transition={{ duration: 0.15 }} onClick={() => setSelectedTree(featuredTree)} className="cursor-pointer" id={`tree-featured-${featuredTree.id}`}>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className="flex flex-col sm:flex-row items-center gap-0">
                  {/* Image panel */}
                  <div className="shrink-0 w-full sm:w-52 h-48 sm:h-full bg-green-50 flex items-center justify-center relative overflow-hidden">
                    <Image src={featuredTree.image} alt={featuredTree.name} width={160} height={160} className="w-36 h-36 object-contain drop-shadow-md relative z-10" unoptimized />
                  </div>

                  {/* Info panel */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-yellow-500" />
                        <span className="text-[10px] font-semibold text-yellow-600 uppercase tracking-wider">Special Edition</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{featuredTree.name}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{featuredTree.description}</p>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      {isUnlockedFeatured ? (
                        <Button
                          id="featured-equip-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEquip(featuredTree)
                          }}
                          disabled={isSelectedFeatured}
                          className={cn(
                            "h-9 px-5 rounded-lg text-sm font-semibold transition-all",
                            isSelectedFeatured ? "bg-gray-100 text-gray-400 cursor-not-allowed border-0" : "bg-green-600 hover:bg-green-700 text-white border-0",
                          )}
                        >
                          {isSelectedFeatured ? "Currently growing" : "Use this tree"}
                        </Button>
                      ) : (
                        <Button
                          id="featured-buy-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBuy(featuredTree)
                          }}
                          disabled={coins < featuredTree.price}
                          className="h-9 px-5 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white border-0 flex items-center gap-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                          <Coins className="h-3.5 w-3.5" />
                          {featuredTree.price.toLocaleString()}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── Tree Grid ─────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">All species</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredTrees.map((tree, index) => {
                  const isUnlocked = unlockedTrees.includes(tree.id)
                  const isSelected = selectedTreeId === tree.id

                  return (
                    <motion.div
                      key={tree.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2 }}
                      onClick={() => setSelectedTree(tree)}
                      id={`tree-card-${tree.id}`}
                    >
                      <div
                        className={cn(
                          "group relative overflow-hidden rounded-xl border bg-white cursor-pointer",
                          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                          isSelected ? "border-green-400 ring-2 ring-green-400/20" : "border-gray-200 hover:border-gray-300",
                        )}
                      >
                        {/* Image area */}
                        <div className={cn("aspect-square relative flex items-center justify-center overflow-hidden", isUnlocked ? "bg-green-50" : "bg-gray-50")}>
                          <Image
                            src={tree.image}
                            alt={tree.name}
                            width={96}
                            height={96}
                            className={cn("w-20 h-20 object-contain transition-all duration-300 group-hover:scale-[1.05]", !isUnlocked && "grayscale opacity-40")}
                            unoptimized
                          />

                          {/* Lock indicator */}
                          {!isUnlocked && (
                            <div className="absolute top-3 left-3">
                              <div className="bg-white border border-gray-200 rounded-md p-1.5 shadow-sm">
                                <Lock className="h-3 w-3 text-gray-400" />
                              </div>
                            </div>
                          )}

                          {/* Active badge */}
                          {isSelected && (
                            <div className="absolute top-3 right-3">
                              <div className="bg-green-600 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md">Active</div>
                            </div>
                          )}
                        </div>

                        {/* Info area */}
                        <div className="p-3 border-t border-gray-100">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-gray-900 text-sm truncate">{tree.name}</h3>
                            {isUnlocked ? (
                              <span className="text-[10px] text-gray-400 font-medium shrink-0">Owned</span>
                            ) : (
                              <div className="flex items-center gap-1 shrink-0">
                                <Coins className="h-3 w-3 text-yellow-500" />
                                <span className="text-xs font-semibold text-gray-700">{tree.price.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </section>

          {/* ── Empty state placeholder for other tabs ───── */}
          {activeTab !== "Classic" && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🌿</div>
              <p className="text-sm font-medium">No {activeTab} species yet</p>
              <p className="text-xs mt-1">Check back later for new additions</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* ── Detail Dialog ─────────────────────────────────── */}
      <Dialog open={!!selectedTree} onOpenChange={(open) => !open && setSelectedTree(null)}>
        <DialogContent showCloseButton={false} className="max-w-sm p-0 border-gray-200 bg-white rounded-2xl shadow-2xl overflow-visible">
          {selectedTree && (
            <div className="relative flex flex-col">
              {/* Close button */}
              <div className="absolute -top-3 -right-3 z-50">
                <CrystalButton variant="outline" size="sm" radius="lg" className="w-8 h-8 p-0" onClick={() => setSelectedTree(null)} id="dialog-close-btn">
                  <X className="h-3.5 w-3.5 stroke-[2.5px]" />
                </CrystalButton>
              </div>

              {/* Image header */}
              <div className="w-full h-44 bg-green-50 rounded-t-2xl flex items-center justify-center overflow-hidden relative">
                <motion.div key={selectedTree.id} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                  <Image src={selectedTree.image} alt={selectedTree.name} width={140} height={140} className="w-32 h-32 object-contain drop-shadow-md" unoptimized />
                </motion.div>
                {/* Subtle ground strip */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-amber-800/20 rounded-none" />
              </div>

              {/* Info */}
              <div className="px-6 pt-5 pb-4 text-center space-y-2">
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Botanical Specimen</p>
                <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">{selectedTree.name}</DialogTitle>
                <DialogDescription className="text-sm text-gray-500 leading-relaxed">{selectedTree.description}</DialogDescription>
              </div>

              {/* Growth stages */}
              <div className="px-6 pb-6 pt-2">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">Growth stages</p>
                <div className="grid grid-cols-4 gap-3">
                  {selectedTree.growthStages.map((stage, idx) => {
                    const labels = ["10m", "30m", "60m", "120m"]
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center overflow-hidden">
                          <Image src={stage.image} alt={stage.label} width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-500 tabular-nums">{labels[idx]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Divider + CTA */}
              <div className="border-t border-gray-100 px-6 py-4">
                {unlockedTrees.includes(selectedTree.id) ? (
                  <Button
                    id="dialog-equip-btn"
                    onClick={() => handleEquip(selectedTree)}
                    disabled={selectedTreeId === selectedTree.id}
                    className={cn(
                      "w-full h-10 rounded-lg text-sm font-semibold transition-all",
                      selectedTreeId === selectedTree.id ? "bg-gray-100 text-gray-400 cursor-not-allowed border-0" : "bg-green-600 hover:bg-green-700 text-white border-0",
                    )}
                  >
                    {selectedTreeId === selectedTree.id ? (
                      <span className="flex items-center gap-2">
                        Currently growing <Sparkles className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      "Use this tree"
                    )}
                  </Button>
                ) : (
                  <Button
                    id="dialog-buy-btn"
                    onClick={() => handleBuy(selectedTree)}
                    disabled={coins < selectedTree.price}
                    className="w-full h-10 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white border-0 flex items-center justify-center gap-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    <Coins className="h-3.5 w-3.5" />
                    Buy for {selectedTree.price.toLocaleString()} coins
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
