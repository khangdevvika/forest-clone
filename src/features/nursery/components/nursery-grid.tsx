"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplet, Sun, Zap, Sparkles, Plus, PackageOpen } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { BloomModal } from "./bloom-modal"
import { type Tree } from "@/features/timer/types"

export function NurseryGrid() {
  const { nurseryPlants, inventory, seeds, nurserySlotsCount, plantSeed, nurturePlant, harvestPlant } = useUser()

  const [selectedSlot, setSelectedSlot] = React.useState<number | null>(null)
  const [bloomedTree, setBloomedTree] = React.useState<Tree | null>(null)

  const handleHarvest = (plantId: string, tree: Tree | undefined) => {
    if (!tree) return
    const success = harvestPlant(plantId)
    if (success) {
      setBloomedTree(tree)
    }
  }

  return (
    <div className="space-y-12">
      {/* Inventory & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card/45 border border-border/50 rounded-[32px] p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Morning Dew</p>
            <p className="text-2xl font-light font-[family-name:var(--font-outfit)]">{inventory.water}</p>
          </div>
        </div>

        <div className="bg-card/45 border border-border/50 rounded-[32px] p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Pure Sunlight</p>
            <p className="text-2xl font-light font-[family-name:var(--font-outfit)]">{inventory.essence}</p>
          </div>
        </div>

        <div className="bg-card/45 border border-border/50 rounded-[32px] p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Fertilizer</p>
            <p className="text-2xl font-light font-[family-name:var(--font-outfit)]">{inventory.fertilizer}</p>
          </div>
        </div>
      </div>

      {/* Nursery Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: nurserySlotsCount }).map((_, index) => {
          const plant = nurseryPlants.find((p) => p.slotIndex === index)
          const tree = plant ? STORE_TREES.find((t) => t.id === plant.treeId) : null

          return (
            <div
              key={index}
              className={cn(
                "relative aspect-square rounded-[48px] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8",
                plant ? "border-primary/20 bg-primary/5" : "border-border/40 bg-card/20",
              )}
            >
              {plant ? (
                <>
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
                    <motion.div key={plant.progress} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
                      {/* Growth Visual */}
                      <Image
                        src={tree?.image || ""}
                        alt={tree?.name || "Tree"}
                        width={128}
                        height={128}
                        className={cn(
                          "w-32 h-32 object-contain transition-all duration-1000",
                          plant.progress < 30 ? "grayscale opacity-50 scale-75" : plant.progress < 70 ? "grayscale-[0.5] scale-90" : "grayscale-0 scale-100",
                        )}
                      />
                      {plant.progress === 100 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                        </div>
                      )}
                    </motion.div>

                    <div className="w-full space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{tree?.name}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">{Math.floor(plant.progress)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-border/20 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${plant.progress}%` }} className="h-full bg-primary" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={inventory.water < 1 || plant.progress >= 100}
                        onClick={() => nurturePlant(plant.id, "water", 1)}
                        className="rounded-full w-10 h-10 p-0 border border-border bg-card/50"
                      >
                        <Droplet className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={inventory.essence < 20 || plant.progress >= 100}
                        onClick={() => nurturePlant(plant.id, "essence", 20)}
                        className="rounded-full w-10 h-10 p-0 border border-border bg-card/50"
                      >
                        <Sun className="w-4 h-4 text-amber-500" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={inventory.fertilizer < 1 || plant.progress >= 100}
                        onClick={() => nurturePlant(plant.id, "fertilizer", 1)}
                        className="rounded-full w-10 h-10 p-0 border border-border bg-card/50"
                      >
                        <Zap className="w-4 h-4 text-emerald-500" />
                      </Button>
                    </div>

                    {plant.progress === 100 && (
                      <Button
                        onClick={() => handleHarvest(plant.id, tree || undefined)}
                        className="absolute -bottom-4 bg-primary text-primary-foreground rounded-full px-6 py-2 shadow-xl hover:scale-105 transition-transform"
                      >
                        Harvest into Garden
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-border/10 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedSlot(index)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                    Select Seed
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Seed Selection Modal Overlay */}
      <AnimatePresence>
        {selectedSlot !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pb-24 sm:pb-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSlot(null)} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-[48px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <PackageOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium font-[family-name:var(--font-outfit)]">Plant a New Seed</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">Your Collection</p>
                </div>
              </div>

              {seeds.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-foreground italic">&ldquo;No seeds available. Focus more to earn seeds!&rdquo;</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {[...new Set(seeds)].map((seedId) => {
                    const tree = STORE_TREES.find((t) => t.id === seedId)
                    const count = seeds.filter((id) => id === seedId).length
                    return (
                      <button
                        key={seedId}
                        onClick={() => {
                          plantSeed(seedId, selectedSlot)
                          setSelectedSlot(null)
                        }}
                        className="flex items-center gap-4 p-4 rounded-3xl bg-card/40 border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-card border border-border group-hover:bg-primary/10 flex items-center justify-center">
                          <Image src={tree?.image || ""} alt={tree?.name || "Seed"} width={24} height={24} className="w-6 h-6 object-contain" />
                        </div>
                        <div className="flex flex-col items-start leading-tight">
                          <span className="text-xs font-bold text-foreground">{tree?.name}</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">x{count} Available</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              <Button variant="ghost" onClick={() => setSelectedSlot(null)} className="w-full mt-8 rounded-2xl text-[10px] uppercase font-bold tracking-widest">
                Close
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BloomModal isOpen={!!bloomedTree} onClose={() => setBloomedTree(null)} tree={bloomedTree} />
    </div>
  )
}
