"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Book, Lock, Info, Sparkles } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { cn } from "@/lib/utils"
import { scaleIn } from "@/lib/animations"
import Image from "next/image"

export function LoreBook() {
  const { lore } = useUser()
  const [selectedTreeId, setSelectedTreeId] = React.useState<string | null>(null)

  const selectedEntry = lore.find((l) => l.treeId === selectedTreeId)
  const selectedTree = STORE_TREES.find((t) => t.id === selectedTreeId)

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Search/Filter & List */}
      <div className="w-full lg:w-1/3 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
          {STORE_TREES.map((tree) => {
            const entry = lore.find((l) => l.treeId === tree.id)
            const isUnlocked = !!entry

            return (
              <button
                key={tree.id}
                onClick={() => setSelectedTreeId(tree.id)}
                className={cn(
                  "relative group aspect-square rounded-[32px] border transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-4",
                  selectedTreeId === tree.id ? "bg-card border-primary/40 shadow-xl scale-105" : "bg-card/20 border-border/40 hover:bg-card/40 hover:scale-105",
                  !isUnlocked && "opacity-60 grayscale-[0.8]",
                )}
              >
                {!isUnlocked && <Lock className="absolute top-4 right-4 w-3.5 h-3.5 text-muted-foreground/30" />}
                <Image
                  src={tree.image}
                  alt={isUnlocked ? tree.name : "Locked species"}
                  width={64}
                  height={64}
                  className={cn("w-16 h-16 object-contain mb-3 transition-transform duration-700", isUnlocked ? "group-hover:scale-110" : "opacity-30")}
                />
                <span className={cn("text-[10px] uppercase font-bold tracking-widest text-center px-2", isUnlocked ? "text-foreground" : "text-muted-foreground/50")}>
                  {isUnlocked ? tree.name : "Locked"}
                </span>

                {isUnlocked && (entry?.unlockedLevel ?? 0) >= 3 && (
                  <div className="absolute bottom-2">
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Detail View - The "Encyclopedia Page" */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {selectedTreeId ? (
            <motion.div
              key={selectedTreeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-card/45 border border-border/50 rounded-[48px] p-8 lg:p-12 min-h-[600px] relative overflow-hidden"
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] grayscale" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-2/5 flex flex-col items-center">
                  <div className="relative group">
                    <motion.div variants={scaleIn} className="relative z-10 w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center">
                      <Image src={selectedTree?.image || ""} alt={selectedTree?.name || "Tree species"} width={256} height={256} className="w-full h-full object-contain" />
                    </motion.div>
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" />
                  </div>

                  <div className="mt-8 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
                      {selectedTree?.rarity} Species
                    </div>
                    <h2 className="text-4xl font-light font-[family-name:var(--font-outfit)]">{selectedTree?.name}</h2>
                    <p className="text-xs text-muted-foreground italic font-medium px-4 opacity-80 leading-relaxed max-w-xs mx-auto">&ldquo;{selectedTree?.description}&rdquo;</p>
                  </div>
                </div>

                <div className="flex-1 space-y-10">
                  {/* Level 1: Taxonomy */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Info className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">Botanical Taxonomy</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-3xl bg-card border border-border/60">
                        <span className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">Status</span>
                        <span className="text-sm font-medium">{selectedEntry ? "Unlocked" : "Hidden"}</span>
                      </div>
                      <div className="p-4 rounded-3xl bg-card border border-border/60">
                        <span className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">Required Essence</span>
                        <span className="text-sm font-medium">{selectedTree?.requiredEssence} ESP</span>
                      </div>
                    </div>
                  </div>

                  {/* Level 2: Lore (Unlocked at lv2) */}
                  <div className={cn("space-y-4 transition-all duration-1000", (selectedEntry?.unlockedLevel ?? 0) < 2 && "opacity-30 grayscale")}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Book className="w-4 h-4 text-primary" strokeWidth={1.5} />
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">Forest Legend</h4>
                      </div>
                      {(selectedEntry?.unlockedLevel ?? 0) < 2 && <Lock className="w-3.5 h-3.5" />}
                    </div>
                    <div className="p-6 rounded-[32px] bg-card border border-border/60 relative overflow-hidden group">
                      <p className="text-[14px] leading-relaxed text-muted-foreground font-serif italic">
                        {(selectedEntry?.unlockedLevel ?? 0) >= 2
                          ? `The ${selectedTree?.name} has long been revered by the ancient scholars of the high peaks. It is said that its roots do not merely grow into the earth, but into the very consciousness of those who sit beneath its shade...`
                          : "Plant and nurture this species 5 times to reveal its ancient lore."}
                      </p>
                    </div>
                  </div>

                  {/* Level 3: Zen Mastery (Unlocked at lv3) */}
                  <div className={cn("space-y-4 transition-all duration-1000", (selectedEntry?.unlockedLevel ?? 0) < 3 && "opacity-30 grayscale")}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">Zen Mastery Tip</h4>
                      </div>
                      {(selectedEntry?.unlockedLevel ?? 0) < 3 && <Lock className="w-3.5 h-3.5" />}
                    </div>
                    <div className="p-6 rounded-[32px] bg-primary/5 border border-primary/20">
                      <p className="text-[14px] leading-relaxed text-primary/80 font-medium">
                        {(selectedEntry?.unlockedLevel ?? 0) >= 3
                          ? `To master focus while cultivating the ${selectedTree?.name}, one must practice 'Anapanasati'—mindfulness of breath. Breathe like the leaves: equal inhale, equal exhale.`
                          : "Harvest this species 10 times to unlock the Master's focus secret."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 bg-card/10 border border-dashed border-border/40 rounded-[48px]">
              <div className="w-20 h-20 bg-card rounded-[32px] shadow-sm flex items-center justify-center mb-6">
                <Book className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-medium font-[family-name:var(--font-outfit)] mb-2">The Archive of Ancient Flora</h3>
              <p className="max-w-[280px] text-sm text-muted-foreground italic">Select a specimen from your collection to view its botanical properties and hidden legends.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
