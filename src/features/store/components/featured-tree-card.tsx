"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { STORE_TREES } from "@/features/timer/constants/trees"
import type { Tree } from "@/features/timer/types/tree"
import { useUser } from "@/hooks/use-user"
import { gentleSpring, spring } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Coins, Sparkles, Sprout, Wand2 } from "lucide-react"
import Image from "next/image"
import { useMemo } from "react"

interface FeaturedTreeCardProps {
  onSelect: (tree: Tree) => void
}

export function FeaturedTreeCard({ onSelect }: FeaturedTreeCardProps) {
  const { coins, buyItem, selectTree, unlockedTrees, selectedTreeId } = useUser()

  const featuredTree = useMemo(() => STORE_TREES.find((t) => t.id === "jacaranda") ?? STORE_TREES[0], [])

  const isUnlocked = unlockedTrees.includes(featuredTree.id)
  const isSelected = selectedTreeId === featuredTree.id

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isUnlocked) {
      selectTree(featuredTree.id)
    } else {
      buyItem({ ...featuredTree, type: "tree" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group cursor-pointer"
      onClick={() => onSelect(featuredTree)}
    >
      {/* Immersive Shadow/Glow */}
      <div className="absolute -inset-4 bg-linear-to-b from-[--sage-400]/5 to-transparent blur-[40px] rounded-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <Card
        variant="glass"
        className="relative overflow-hidden p-10 md:p-14 rounded-[50px] border-white bg-white/80 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.1)] flex flex-col items-center text-center gap-10"
      >
        {/* Floating Aura */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[80%] bg-[--sage-300] rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-[--sage-300]/50" />
            <span className="text-[10px] font-bold text-[--sage-600] uppercase tracking-[0.4em]">Master Specimen</span>
            <div className="h-px w-8 bg-[--sage-300]/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-light font-[family-name:var(--font-outfit)] text-foreground tracking-tight italic lowercase px-2">
            The {featuredTree.name}
          </h2>
          <p className="max-w-md mx-auto text-sm md:text-base text-foreground/50 font-medium leading-relaxed italic px-4">
            &ldquo;A rare botanical anomaly, whispers of violet blooms that harmonize with the cosmic frequency of focus.&rdquo;
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <div className="absolute -inset-10 bg-white/20 blur-3xl rounded-full opacity-50" />
          <Image
            src={featuredTree.image}
            alt={featuredTree.name}
            width={350}
            height={350}
            className="w-56 md:w-72 h-auto object-contain drop-shadow-[0_45px_75px_rgba(0,0,0,0.15)] transition-all duration-1000 group-hover:drop-shadow-[0_45px_95px_rgba(107,143,107,0.3)] group-hover:brightness-[1.02]"
            unoptimized
          />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
             <Badge className="bg-[--sage-100] text-[--sage-700] border-0 text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full">
               Level Alpha
             </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
             <Button
                onClick={handleAction}
                disabled={!isUnlocked && coins < featuredTree.price}
                className={cn(
                  "h-14 px-10 rounded-[22px] text-xs font-bold uppercase tracking-[0.2em] shadow-2xl transition-all duration-500",
                  isSelected 
                    ? "bg-white/60 text-[--sage-600] border border-white cursor-default" 
                    : isUnlocked 
                      ? "bg-[--warm-500] hover:bg-[--warm-600] text-white" 
                      : "bg-[--sage-500] hover:bg-[--sage-600] text-white"
                )}
             >
                {isSelected ? (
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4" />
                    Currently Seated
                  </div>
                ) : isUnlocked ? (
                  <div className="flex items-center gap-3">
                    <Sprout className="h-4 w-4" />
                    Cultivate Now
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Coins className="h-4 w-4" />
                    <span className="tabular-nums">Research {featuredTree.price}</span>
                  </div>
                )}
             </Button>

             {!isSelected && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                   <Wand2 className="h-3.5 w-3.5" />
                   Limited Flux
                </div>
             )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-2 py-1 rounded text-xs", className)}>{children}</div>
}
