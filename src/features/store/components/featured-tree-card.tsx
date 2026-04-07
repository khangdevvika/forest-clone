"use client"

import Image from "next/image"
import { Coins, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useUser } from "@/hooks/use-user"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { useMemo } from "react"
import type { Tree } from "@/features/timer/types/tree"

interface FeaturedTreeCardProps {
  onSelect: (tree: Tree) => void
}

export function FeaturedTreeCard({ onSelect }: FeaturedTreeCardProps) {
  const { coins, unlockedTrees, selectedTreeId, buyTree, selectTree } = useUser()

  const featuredTree = useMemo(() => STORE_TREES.find((t) => t.id === "jacaranda") ?? STORE_TREES[0], [])

  const isUnlocked = unlockedTrees.includes(featuredTree.id)
  const isSelected = selectedTreeId === featuredTree.id

  const handleEquip = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectTree(featuredTree.id)
  }

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation()
    buyTree(featuredTree)
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge className="bg-accent text-accent-foreground border-border text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md">
          Featured
        </Badge>
      </div>
      <h2 className="text-xl font-semibold text-foreground -mt-1">Today&apos;s specimen</h2>

      <motion.div layout whileHover={{ y: -2 }} transition={{ duration: 0.15 }} onClick={() => onSelect(featuredTree)} className="cursor-pointer" id={`tree-featured-${featuredTree.id}`}>
        <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-border/70 hover:shadow-md transition-all duration-200">
          <div className="flex flex-col sm:flex-row items-center gap-0">
            <div className="shrink-0 w-full sm:w-52 h-48 sm:h-full bg-muted flex items-center justify-center relative overflow-hidden">
              <Image src={featuredTree.image} alt={featuredTree.name} width={160} height={160} className="w-36 h-36 object-contain drop-shadow-md relative z-10" unoptimized />
            </div>

            <div className="flex-1 p-6 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                  <span className="text-[10px] font-semibold text-yellow-600 uppercase tracking-wider">Special Edition</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">{featuredTree.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{featuredTree.description}</p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                {isUnlocked ? (
                  <Button
                    id="featured-equip-btn"
                    onClick={handleEquip}
                    disabled={isSelected}
                    className={cn(
                      "h-9 px-5 rounded-lg text-sm font-semibold transition-all",
                      isSelected ? "bg-muted text-muted-foreground cursor-not-allowed border-0" : "bg-primary hover:bg-primary/90 text-primary-foreground border-0",
                    )}
                  >
                    {isSelected ? "Currently growing" : "Use this tree"}
                  </Button>
                ) : (
                  <Button
                    id="featured-buy-btn"
                    onClick={handleBuy}
                    disabled={coins < featuredTree.price}
                    className="h-9 px-5 rounded-lg text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-0 flex items-center gap-2 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
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
  )
}
