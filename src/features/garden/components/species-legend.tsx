"use client"

import { useGardenStats } from "@/features/garden/hooks/use-garden-stats"
import Image from "next/image"

export function SpeciesLegend() {
  const { sessions } = useGardenStats()

  // Calculate distribution
  const distribution = sessions.reduce(
    (acc, s) => {
      if (!acc[s.treeId]) {
        acc[s.treeId] = { name: s.treeName, image: s.treeImage, count: 0, minutes: 0 }
      }
      acc[s.treeId].count += 1
      acc[s.treeId].minutes += s.durationMinutes
      return acc
    },
    {} as Record<string, { name: string; image: string; count: number; minutes: number }>,
  )

  const items = Object.values(distribution).sort((a, b) => b.minutes - a.minutes)

  if (items.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-sm font-semibold text-secondary-foreground uppercase tracking-wider text-[10px]">Species Distribution</h2>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-3 bg-card border border-border/50 rounded-xl px-3 py-2">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Image src={item.image} alt={item.name} width={24} height={24} className="object-contain" unoptimized={item.image.startsWith("http")} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {item.count} sessions • {item.minutes}m
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
