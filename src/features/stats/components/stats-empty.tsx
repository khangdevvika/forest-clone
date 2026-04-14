"use client"

import { motion } from "framer-motion"
import { BarChart3, Search } from "lucide-react"

export function StatsEmpty() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-muted/5 flex items-center justify-center mb-6 relative">
        <BarChart3 className="w-8 h-8 text-muted-foreground/30" />
        <motion.div
          animate={{
            x: [0, 5, 0],
            y: [0, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-0 right-0"
        >
          <Search className="w-4 h-4 text-primary" strokeWidth={3} />
        </motion.div>
      </div>
      <h3 className="text-sm font-bold text-foreground mb-1 uppercase tracking-widest opacity-80">No Activity Data</h3>
      <p className="text-xs text-muted-foreground max-w-[200px]">Statistics will appear once you complete your first focus session.</p>
    </motion.div>
  )
}
