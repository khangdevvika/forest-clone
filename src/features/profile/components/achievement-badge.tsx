"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AchievementBadgeProps {
  icon: LucideIcon
  title: string
  description: string
  unlocked: boolean
  delay?: number
}

export function AchievementBadge({ icon: Icon, title, description, unlocked, delay = 0 }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 30 }}
      className="group relative flex flex-col items-center gap-3"
    >
      <div 
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative",
          unlocked 
            ? "bg-card border border-primary/20 text-primary shadow-sm" 
            : "bg-muted/30 border border-transparent text-muted-foreground/30 grayscale"
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.25} />
        
        {unlocked && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        )}
      </div>
      
      <p className={cn(
        "text-[9px] font-black uppercase tracking-widest text-center truncate w-full", 
        unlocked ? "text-foreground" : "text-muted-foreground/50"
      )}>
        {title}
      </p>

      {/* Detail Tooltip */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 p-2 bg-card border border-border rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <p className="text-[10px] font-bold text-foreground">{title}</p>
        <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{description}</p>
      </div>
    </motion.div>
  )
}
