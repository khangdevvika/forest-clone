"use client"

import { Achievement } from "@/features/achievements/constants/achievements"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Lock, Share2, Leaf } from "lucide-react"

interface AchievementCardProps {
  achievement: Achievement
  isUnlocked: boolean
}

export function AchievementCard({ achievement, isUnlocked }: AchievementCardProps) {
  const Icon = achievement.icon

  return (
    <motion.div
      whileHover={{ 
        backgroundColor: isUnlocked ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.6)",
        borderColor: "rgba(107, 168, 107, 0.5)",
        boxShadow: "0 25px 50px -12px rgba(107, 143, 107, 0.15)"
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col items-center p-5 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden h-full min-h-[170px]",
        isUnlocked 
          ? "bg-card/60 border-primary/30 shadow-xl shadow-primary/10 backdrop-blur-md" 
          : "bg-background/40 border-dashed border-border/80 hover:bg-background/60 hover:border-primary/40",
      )}
    >
      {/* Visual metaphor for locked: Seedling hint */}
      {!isUnlocked && (
        <div className="absolute top-2 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Leaf className="w-12 h-12 text-primary rotate-12" strokeWidth={1} />
        </div>
      )}

      {/* Shine effect for unlocked */}
      {isUnlocked && (
        <motion.div 
          className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none z-20" 
          initial={{ x: "-150%", skewX: -25 }}
          animate={{ x: "250%" }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        />
      )}

      {/* Medallion Ring */}
      <div
        className={cn(
          "relative w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-700 z-10",
          isUnlocked 
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-primary/10" 
            : "bg-muted/30 border-2 border-border shadow-inner",
        )}
      >
        {isUnlocked ? (
          <motion.div 
            initial={{ scale: 0, rotate: -45 }} 
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Icon className="w-7 h-7" strokeWidth={1.5} />
          </motion.div>
        ) : (
          <Lock className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
        )}
      </div>

      <div className="text-center relative z-10 w-full px-1">
        <h3 className={cn(
          "font-[family-name:var(--font-outfit)] font-bold text-sm leading-tight mb-2 tracking-wide text-foreground", 
        )}>
          {achievement.isSecret && !isUnlocked ? "Locked Milestone" : achievement.title}
        </h3>
        <p className={cn(
          "text-[11px] font-[family-name:var(--font-inter)] font-normal leading-relaxed line-clamp-2 h-9 text-balance px-2 text-muted-foreground",
        )}>
          {achievement.isSecret && !isUnlocked ? "Grow more trees to uncover this secret achievement." : achievement.description}
        </p>
      </div>

      {isUnlocked && (
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          className="absolute top-4 right-4 p-2.5 rounded-2xl bg-primary text-primary-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-all z-30"
          onClick={(e) => {
            e.stopPropagation()
            // Share logic
          }}
        >
          <Share2 className="w-3.5 h-3.5" strokeWidth={2} />
        </motion.button>
      )}

      {/* Subtle organic background decoration for unlocked */}
      {isUnlocked && (
        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary/10 blur-2xl rounded-full pointer-events-none" />
      )}
    </motion.div>
  )
}
