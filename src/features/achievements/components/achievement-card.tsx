"use client"

import { Achievement } from "@/features/achievements/constants/achievements"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Lock, Share2 } from "lucide-react"
import { useRef } from "react"

interface AchievementCardProps {
  achievement: Achievement
  isUnlocked: boolean
}

const spring = { type: "spring", stiffness: 280, damping: 22 } as const

export function AchievementCard({ achievement, isUnlocked }: AchievementCardProps) {
  const Icon = achievement.icon
  const cardRef = useRef<HTMLDivElement>(null)

  // iOS 26: Parallax shine that follows cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isUnlocked) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty("--shine-x", `${x}%`)
    cardRef.current.style.setProperty("--shine-y", `${y}%`)
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty("--shine-x", "50%")
    cardRef.current.style.setProperty("--shine-y", "50%")
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5, transition: spring }}
      whileTap={{ scale: 0.97, transition: spring }}
      className={cn(
        "group relative flex flex-col items-center p-5 rounded-4xl border transition-all duration-500 overflow-hidden h-full min-h-42.5",
        isUnlocked ? "border-primary/20" : "border-dashed border-border/60 hover:border-primary/30 opacity-60 hover:opacity-80",
      )}
      style={
        isUnlocked
          ? {
              background: "var(--plate-bg)",
              backdropFilter: "blur(16px) saturate(160%)",
              WebkitBackdropFilter: "blur(16px) saturate(160%)",
              boxShadow: "var(--plate-shadow)",
            }
          : {
              background: "var(--plate-bg)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }
      }
    >
      {/* iOS 26: Rim light top border */}
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none z-20" style={{ background: "linear-gradient(90deg, transparent, var(--rim-light) 40%, var(--rim-light) 60%, transparent)" }} />

      {/* iOS 26: Holographic parallax shine (unlocked only) */}
      {isUnlocked && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.25) 0%, transparent 55%)",
          }}
        />
      )}

      {/* iOS 26: Scan-line shimmer (always animating, unlocked only) */}
      {isUnlocked && (
        <motion.div
          className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/12 to-white/0 pointer-events-none z-10"
          initial={{ x: "-150%", skewX: -20 }}
          animate={{ x: "250%" }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        />
      )}

      {/* iOS 26: Corner ambient glow */}
      {isUnlocked && <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full pointer-events-none" style={{ background: "var(--aura-primary)", filter: "blur(20px)" }} />}

      {/* Medallion Ring — iOS 26 squircle instead of circle */}
      <motion.div
        initial={isUnlocked ? { scale: 0, rotate: -45 } : { scale: 1 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ ...spring, delay: 0.05 }}
        className={cn("relative w-14 h-14 flex items-center justify-center mb-4 transition-all duration-700 z-10", isUnlocked ? "text-primary-foreground" : "text-muted-foreground")}
        style={{
          borderRadius: "35%",
          background: isUnlocked ? "var(--primary)" : "var(--muted)",
          boxShadow: isUnlocked ? "0 4px 16px var(--aura-primary), inset 0 1px 0 rgba(255,255,255,0.30)" : "inset 0 2px 4px rgba(0,0,0,0.08)",
        }}
      >
        {isUnlocked ? <Icon className="w-7 h-7" strokeWidth={1.5} /> : <Lock className="w-5 h-5" strokeWidth={1.5} />}
      </motion.div>

      <div className="text-center relative z-10 w-full px-1">
        <h3 className="font-bold text-sm leading-tight mb-2 tracking-wide text-foreground" style={{ fontFamily: "var(--font-outfit)" }}>
          {achievement.isSecret && !isUnlocked ? "Locked Milestone" : achievement.title}
        </h3>
        <p className="text-[11px] font-normal leading-relaxed line-clamp-2 h-9 text-balance px-2 text-muted-foreground" style={{ fontFamily: "var(--font-inter)" }}>
          {achievement.isSecret && !isUnlocked ? "Grow more trees to uncover this secret achievement." : achievement.description}
        </p>
      </div>

      {/* iOS 26: Share button — appears on hover with spring */}
      {isUnlocked && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, transition: spring }}
          className="absolute top-4 right-4 p-2.5 text-primary-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-all z-30"
          style={{
            borderRadius: "40%",
            background: "var(--primary)",
            boxShadow: "0 4px 12px var(--aura-primary)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Share2 className="w-3.5 h-3.5" strokeWidth={2} />
        </motion.button>
      )}
    </motion.div>
  )
}
