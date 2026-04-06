"use client"

import Image from "next/image"
import { X, Coins, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CrystalButton } from "@/components/ui/crystal-button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useUser } from "@/hooks/use-user"
import type { Tree } from "@/features/timer/types/tree"

interface TreeDetailDialogProps {
  tree: Tree | null
  onClose: () => void
}

const GROWTH_LABELS = ["10m", "30m", "60m", "120m"]

export function TreeDetailDialog({ tree, onClose }: TreeDetailDialogProps) {
  const { coins, unlockedTrees, selectedTreeId, buyTree, selectTree } = useUser()

  const handleEquip = () => {
    if (!tree) return
    selectTree(tree.id)
    onClose()
  }

  const handleBuy = () => {
    if (!tree) return
    buyTree(tree)
  }

  if (!tree) return null

  const isUnlocked = unlockedTrees.includes(tree.id)
  const isSelected = selectedTreeId === tree.id

  return (
    <Dialog open={!!tree} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-sm p-0 border-gray-200 bg-white rounded-2xl shadow-2xl overflow-visible">
        <div className="relative flex flex-col">
          {/* Close button */}
          <div className="absolute -top-3 -right-3 z-50">
            <CrystalButton variant="outline" size="sm" radius="lg" className="w-8 h-8 p-0" onClick={onClose} id="dialog-close-btn">
              <X className="h-3.5 w-3.5 stroke-[2.5px]" />
            </CrystalButton>
          </div>

          {/* Image header */}
          <div className="w-full h-44 bg-green-50 rounded-t-2xl flex items-center justify-center overflow-hidden relative">
            <motion.div key={tree.id} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
              <Image src={tree.image} alt={tree.name} width={140} height={140} className="w-32 h-32 object-contain drop-shadow-md" unoptimized />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-amber-800/20" />
          </div>

          {/* Info */}
          <div className="px-6 pt-5 pb-4 text-center space-y-2">
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Botanical Specimen</p>
            <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">{tree.name}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 leading-relaxed">{tree.description}</DialogDescription>
          </div>

          {/* Growth stages */}
          <div className="px-6 pb-6 pt-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">Growth stages</p>
            <div className="grid grid-cols-4 gap-3">
              {tree.growthStages.map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center overflow-hidden">
                    <Image src={stage.image} alt={stage.label} width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 tabular-nums">{GROWTH_LABELS[idx]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-gray-100 px-6 py-4">
            {isUnlocked ? (
              <Button
                id="dialog-equip-btn"
                onClick={handleEquip}
                disabled={isSelected}
                className={cn(
                  "w-full h-10 rounded-lg text-sm font-semibold transition-all",
                  isSelected ? "bg-gray-100 text-gray-400 cursor-not-allowed border-0" : "bg-green-600 hover:bg-green-700 text-white border-0",
                )}
              >
                {isSelected ? (
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
                onClick={handleBuy}
                disabled={coins < tree.price}
                className="w-full h-10 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white border-0 flex items-center justify-center gap-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <Coins className="h-3.5 w-3.5" />
                Buy for {tree.price.toLocaleString()} coins
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
