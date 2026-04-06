"use client"

import Image from "next/image"
import { Lock, Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/hooks/use-user"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { useMemo } from "react"
import type { Tree } from "@/features/timer/types/tree"

interface TreeGridProps {
  activeTab: string
  onSelect: (tree: Tree) => void
}

export function TreeGrid({ activeTab, onSelect }: TreeGridProps) {
  const { unlockedTrees, selectedTreeId } = useUser()

  const featuredId = useMemo(() => (STORE_TREES.find((t) => t.id === "jacaranda") ?? STORE_TREES[0]).id, [])

  const filteredTrees = useMemo(() => STORE_TREES.filter((t) => t.id !== featuredId), [featuredId])

  if (activeTab === "Exclusive" && filteredTrees.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-4xl mb-3">🌿</div>
        <p className="text-sm font-medium">No Exclusive species yet</p>
        <p className="text-xs mt-1">Check back later for new additions</p>
      </div>
    )
  }

  return (
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
                onClick={() => onSelect(tree)}
                id={`tree-card-${tree.id}`}
              >
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-xl border bg-white cursor-pointer",
                    "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    isSelected ? "border-green-400 ring-2 ring-green-400/20" : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className={cn("aspect-square relative flex items-center justify-center overflow-hidden", isUnlocked ? "bg-green-50" : "bg-gray-50")}>
                    <Image
                      src={tree.image}
                      alt={tree.name}
                      width={96}
                      height={96}
                      className={cn("w-20 h-20 object-contain transition-all duration-300 group-hover:scale-[1.05]", !isUnlocked && "grayscale opacity-40")}
                      unoptimized
                    />

                    {!isUnlocked && (
                      <div className="absolute top-3 left-3">
                        <div className="bg-white border border-gray-200 rounded-md p-1.5 shadow-sm">
                          <Lock className="h-3 w-3 text-gray-400" />
                        </div>
                      </div>
                    )}

                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-green-600 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md">Active</div>
                      </div>
                    )}
                  </div>

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
  )
}
