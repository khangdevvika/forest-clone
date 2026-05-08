"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Check, BookOpen } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { type Tree } from "@/features/timer/types"
import confetti from "canvas-confetti"

interface BloomModalProps {
  isOpen: boolean
  onClose: () => void
  tree: Tree | null
}

export function BloomModal({ isOpen, onClose, tree }: BloomModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6b8f6b", "#a3be9e", "#c8d9c5", "#d4af82", "#e8ede6"]
      })
    }
  }, [isOpen])

  if (!tree) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[48px] bg-card/80 border border-border/60 shadow-2xl p-10 backdrop-blur-md text-center"
          >
            {/* Background Flair */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                <Sparkles className="w-3 h-3" />
                Natural Evolution Complete
              </div>

              <div className="relative group flex justify-center">
                <motion.div
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="relative z-10"
                >
                  <Image 
                    src={tree.image} 
                    alt={tree.name}
                    width={200}
                    height={200}
                    className="w-48 h-48 lg:w-56 lg:h-56 object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                {/* Aura effect */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" 
                />
              </div>

              <div className="space-y-3">
                <h2 className="text-4xl font-light font-[family-name:var(--font-outfit)] tracking-tight">
                  The {tree.name} Has Bloomed
                </h2>
                <p className="text-muted-foreground text-sm max-w-[280px] mx-auto italic leading-relaxed">
                  &ldquo;A testament to your patience and consistent care. This specimen has reached full maturity.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-card border border-border/60 flex flex-col items-center gap-1">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Rewards</span>
                  <span className="text-sm font-semibold text-primary">+500 XP</span>
                </div>
                <div className="p-4 rounded-3xl bg-card border border-border/60 flex flex-col items-center gap-1">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Collection</span>
                  <span className="text-sm font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    Lore Updated
                  </span>
                </div>
              </div>

              <Button 
                onClick={onClose}
                className="w-full bg-foreground text-background font-bold uppercase tracking-widest text-xs py-7 rounded-[28px] hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                <Check className="w-4 h-4" strokeWidth={3} />
                Return to Greenhouse
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
