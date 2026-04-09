"use client"

import Image from "next/image"
import { X, Coins } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useUser } from "@/hooks/use-user"
import type { Tree } from "@/features/timer/types/tree"

interface TreeDetailDialogProps {
  tree: Tree | null
  onClose: () => void
}

const GROWTH_LABELS = ["10m", "30m", "60m", "120m"]

// Define animation preset locally to avoid reference errors
const gentleSpring = { type: "spring" as const, stiffness: 180, damping: 28 }

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
      <DialogContent showCloseButton={false} className="max-w-md p-0 border-none bg-white rounded-[20px] shadow-2xl overflow-hidden focus:outline-none">
        <div className="relative flex flex-col">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-[#FDFCF6] transition-colors group"
          >
            <X className="h-5 w-5 text-[#D1D5DB] group-hover:text-[#1A2E0A]" strokeWidth={2} />
          </button>

          {/* Image header - Botanical Style */}
          <div className="w-full h-72 bg-[#FDFCF6] flex items-center justify-center overflow-hidden relative border-b border-[#E5E7EB]">
            <motion.div 
              key={tree.id} 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              transition={gentleSpring}
              className="relative z-10"
            >
              <Image 
                src={tree.image} 
                alt={tree.name} 
                width={220} 
                height={220} 
                className="w-56 h-56 object-contain drop-shadow-[0_20px_40px_rgba(26,46,10,0.1)]" 
                unoptimized 
              />
            </motion.div>
          </div>

          {/* Info area */}
          <div className="px-10 pt-8 pb-4 text-center space-y-3">
            <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-[0.1em]">Botanical Species</span>
            <DialogTitle className="text-3xl font-bold text-[#1A2E0A] tracking-tight">
              {tree.name}
            </DialogTitle>
            <DialogDescription className="text-[15px] text-[#6B7280] leading-relaxed max-w-sm mx-auto">
              {tree.description}
            </DialogDescription>
          </div>

          {/* Growth stages */}
          <div className="px-10 pb-8 pt-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[0.5px] w-12 bg-[#E5E7EB]" />
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.15em]">Growth Stages</p>
              <div className="h-[0.5px] w-12 bg-[#E5E7EB]" />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {tree.growthStages.map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-[12px] bg-[#FDFCF6] border border-[#E5E7EB] flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-[#2D5016]">
                    <Image src={stage.image} alt={stage.label} width={40} height={40} className="w-12 h-12 object-contain" unoptimized />
                  </div>
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{GROWTH_LABELS[idx]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-10 py-8 bg-[#FDFCF6] border-t border-[#E5E7EB]">
            {isUnlocked ? (
              <button
                id="dialog-equip-btn"
                onClick={handleEquip}
                disabled={isSelected}
                className={cn(
                  "w-full h-14 rounded-full text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-300",
                  isSelected 
                    ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed" 
                    : "bg-[#2D5016] text-white hover:brightness-110 hover:scale-[1.01] active:scale-[0.98]",
                  "focus:outline-none focus:ring-2 focus:ring-[#2D5016] focus:ring-offset-2"
                )}
              >
                {isSelected ? "Currently Growing" : "Select Species"}
              </button>
            ) : (
              <button
                id="dialog-buy-btn"
                onClick={handleBuy}
                disabled={coins < tree.price}
                className="w-full h-14 rounded-full text-[13px] font-semibold uppercase tracking-[0.06em] bg-[#2D5016] text-white flex items-center justify-center gap-4 transition-all duration-300 hover:brightness-110 hover:scale-[1.01] active:scale-[0.98] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2D5016] focus:ring-offset-2"
              >
                <div className="h-6 w-6 bg-[#F59E0B] rounded-full flex items-center justify-center shadow-md">
                  <Coins className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </div>
                Acquire for {tree.price.toLocaleString()}
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
