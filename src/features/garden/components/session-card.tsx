"use client"

import Image from "next/image"
import { Coins } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Card } from "@/components/ui/card"
import type { Session } from "@/features/timer/types/session"

interface SessionCardProps {
  session: Session
}

export function SessionCard({ session }: SessionCardProps) {
  const time = format(parseISO(session.completedAt), "HH:mm")

  return (
    <Card variant="interactive" padding="md" className="flex items-center gap-4">
      {/* Tree thumbnail */}
      <div className="shrink-0 w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden">
        <Image
          src={session.treeImage}
          alt={session.treeName}
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          unoptimized={session.treeImage.startsWith("http")}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm truncate">{session.treeName}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground">{session.durationMinutes} min</span>
          <span className="text-border text-xs">·</span>
          <div className="flex items-center gap-1">
            <Coins className="h-3 w-3 text-yellow-500" />
            <span className="text-xs font-medium text-secondary-foreground">{session.coinsEarned}</span>
          </div>
        </div>
      </div>

      {/* Time */}
      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{time}</span>
    </Card>
  )
}
