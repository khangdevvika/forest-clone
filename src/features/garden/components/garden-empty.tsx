"use client"

import { motion } from "framer-motion"
import { Sprout, Timer } from "lucide-react"
import Link from "next/link"

export function GardenEmpty() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-6">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-[30%] bg-primary/10 flex items-center justify-center text-primary"
        >
          <Sprout className="w-12 h-12" strokeWidth={1.5} />
        </motion.div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shadow-sm">
          <Timer className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
        Your Garden is Silent
      </h3>
      <p className="text-sm text-muted-foreground max-w-[280px] mb-8 leading-relaxed">Every great forest starts with a single seed. Plant your first tree by starting a focus session.</p>

      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 h-12 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all"
        >
          Start Focusing
        </motion.button>
      </Link>
    </motion.div>
  )
}
