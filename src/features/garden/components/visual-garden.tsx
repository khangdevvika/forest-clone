"use client"

import { useGardenStats } from "@/features/garden/hooks/use-garden-stats"
import { motion } from "framer-motion"
import Image from "next/image"

const spring = { type: "spring", stiffness: 120, damping: 20 } as const

// Isometric projection math:
// x_iso = (x - y) * cos(30°)
// y_iso = (x + y) * sin(30°) - z
// Simplified for 2D grid: transform: rotateX(60deg) rotateZ(45deg)

const GRID_DIM = 5 // 5x5 grid

export function VisualGarden() {
  const { sessions } = useGardenStats()

  // Prepare grid data
  const grid = Array.from({ length: GRID_DIM * GRID_DIM }).map((_, i) => ({
    id: `tile-${i}`,
    session: sessions[i] || null,
    x: Math.floor(i / GRID_DIM),
    y: i % GRID_DIM,
  }))

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto flex items-center justify-center py-10">
      {/* The isometric plane */}
      <div
        className="relative"
        style={{
          transform: "rotateX(55deg) rotateZ(-45deg)",
          transformStyle: "preserve-3d",
          width: "280px",
          height: "280px",
        }}
      >
        {/* Grid Floor */}
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1.5 p-1 bg-primary/5 rounded-2xl border-4 border-primary/10 shadow-2xl backdrop-blur-sm">
          {grid.map((tile) => (
            <div key={tile.id} className="w-full h-full bg-primary/5 rounded-md border border-primary/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
            </div>
          ))}
        </div>

        {/* Trees (Floating above the floor) */}
        {grid.map((tile, i) => {
          if (!tile.session) return null

          return (
            <motion.div
              key={tile.session.id}
              initial={{ opacity: 0, z: 100 }}
              animate={{ opacity: 1, z: 0 }}
              transition={{ ...spring, delay: i * 0.05 }}
              style={{
                position: "absolute",
                left: `${(tile.y / GRID_DIM) * 100}%`,
                top: `${(tile.x / GRID_DIM) * 100}%`,
                width: `${100 / GRID_DIM}%`,
                height: `${100 / GRID_DIM}%`,
                transformStyle: "preserve-3d",
              }}
              className="flex items-center justify-center group"
            >
              {/* Tree Visual (Rotated back to face camera) */}
              <div style={{ transform: "rotateZ(45deg) rotateX(-55deg) translateY(-20px)" }} className="relative z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]">
                <Image
                  src={tile.session.treeImage}
                  alt={tile.session.treeName}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  unoptimized={tile.session.treeImage.startsWith("http")}
                />

                {/* Visual indicator of duration */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] font-bold text-primary">{tile.session.durationMinutes}m</span>
                </div>
              </div>

              {/* Shadow on the ground */}
              <div className="absolute inset-0 bg-black/10 blur-md rounded-full transform scale-[0.6] -translate-y-2" style={{ transform: "translateZ(-1px)" }} />
            </motion.div>
          )
        })}
      </div>

      {/* Atmospheric lighting */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
