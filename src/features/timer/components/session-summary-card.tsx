"use client"

import { Session } from "@/features/timer/types/session"
import { motion } from "framer-motion"
import { toPng } from "html-to-image"
import { Clock, Coins, Download, Share2, Tag, Trees } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface SessionSummaryCardProps {
  session: Session
  onClose: () => void
}

export function SessionSummaryCard({ session, onClose }: SessionSummaryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 1 })
      const link = document.createElement("a")
      link.download = `forest-session-${new Date().getTime()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Failed to export image", err)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* The Actual Card to Export */}
      <div
        ref={cardRef}
        className="relative w-80 aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl bg-[#fdfaf3]"
        style={{
          background: "linear-gradient(180deg, #fdfaf3 0%, #f5f1e6 100%)",
        }}
      >
        {/* Grain Overlay (Visual only, usually doesn't export well to SVG/Canvas without tricks, but let's try) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grain.png')] mix-blend-overlay" />

        {/* Top Header */}
        <div className="absolute top-8 left-0 right-0 px-8 flex justify-between items-center z-10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-bold">Focus Session</span>
            <span className="text-xs text-muted-foreground font-medium">{new Date(session.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Trees className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Tree Visual */}
        <div className="absolute inset-0 flex items-center justify-center pt-8">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
            <Image src={session.treeImage} alt={session.treeName} fill className="object-contain drop-shadow-2xl" unoptimized={session.treeImage.startsWith("http")} />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pt-12">
          <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-t from-[#f5f1e6] to-transparent" />

          <h2 className="relative text-2xl font-bold text-foreground mb-4 tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
            {session.treeName}
          </h2>

          <div className="relative grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Duration</span>
              </div>
              <span className="text-lg font-bold text-primary">{session.durationMinutes}m</span>
            </div>

            <div className="flex flex-col gap-1 text-right">
              <div className="flex items-center gap-1.5 text-muted-foreground justify-end">
                <Coins className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Earned</span>
              </div>
              <span className="text-lg font-bold text-amber-600">+{session.coinsEarned}</span>
            </div>
          </div>

          <div className="relative mt-4 pt-4 border-t border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center">
                <Tag className="w-3 h-3 text-primary/60" />
              </div>
              <span className="text-xs font-medium text-muted-foreground capitalize">{session.tagId || "No Tag"}</span>
            </div>
            <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Forest Clone</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {isExporting ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <Share2 className="w-4 h-4" />
            </motion.div>
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isExporting ? "Exporting..." : "Save Image"}
        </button>
        <button onClick={onClose} className="h-12 w-12 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 transition-colors">
          Close
        </button>
      </div>
    </div>
  )
}
