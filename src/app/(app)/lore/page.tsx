"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import { LoreBook } from "@/features/nursery/components/lore-book"
import { fadeIn } from "@/lib/animations"

export default function LorePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-warm-500/10 flex items-center justify-center text-warm-500">
            <BookOpen className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-4xl font-light font-[family-name:var(--font-outfit)] tracking-tight">Focus Legends</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/50 mt-1 ml-0.5">The Great Botanical Archive</p>
          </div>
        </div>
        <p className="max-w-2xl text-[15px] text-muted-foreground leading-relaxed font-medium mt-2">
          Discover the ancient stories and wisdom of the Forest. Every tree you nurture 
          to maturity reveals a piece of the Great Lore. Collector&apos;s heart, focus deeply.
        </p>
      </header>

      <motion.main
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <LoreBook />
      </motion.main>
      
      <footer className="pt-24 pb-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground/20">
          Wisdom is the deepest root
        </p>
      </footer>
    </div>
  )
}
