"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useGardenStats } from "../hooks/use-garden-stats"

const gentleSpring = { type: "spring", stiffness: 180, damping: 28 } as const

const GRID_SIZE = 25 // 5x5

export function GardenGrid() {
  const { sessions } = useGardenStats()
  
  // Fill the grid with sessions or placeholders
  const tiles = Array.from({ length: GRID_SIZE }).map((_, i) => sessions[i] || null)

  return (
    <div className="grid grid-cols-5 gap-3 p-5 max-w-sm mx-auto">
      {tiles.map((session, i) => (
        <motion.div
          key={session?.id || `empty-${i}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...gentleSpring, delay: i * 0.02 }}
          className="aspect-square rounded-xl bg-secondary/30 border border-primary/5 flex items-center justify-center p-1.5 overflow-hidden group relative"
        >
          {session ? (
            <>
              <Image
                src={session.treeImage}
                alt={session.treeName}
                width={48}
                height={48}
                className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                unoptimized={session.treeImage.startsWith("http")}
              />
              <div className="absolute inset-x-0 bottom-0 py-0.5 px-1 bg-background/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="text-[8px] font-bold text-center truncate">{session.durationMinutes}m</p>
              </div>
            </>
          ) : (
            <div className="w-1 h-1 rounded-full bg-primary/10" />
          )}
        </motion.div>
      ))}
    </div>
  )
}
