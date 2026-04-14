"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ReactNode, useState } from "react"
import { Heart, Star, Coins } from "lucide-react"

interface StoreCardProps {
  title?: string
  subtitle?: string // No longer used as 'FOREST SPECIMEN' but could be used for other labels
  icon?: ReactNode
  price?: number
  isSelected?: boolean
  isUnlocked?: boolean
  children: ReactNode
  cornerIcon?: ReactNode
  onClick?: () => void
  className?: string
  containerClassName?: string
  index?: number
  // New props for the redesign
  tags?: { label: string; color: string }[]
  difficulty?: "easy" | "medium" | "hard"
  rating?: number
}

export function StoreCard({
  title,
  price,
  isSelected,
  isUnlocked = true,
  children,
  onClick,
  className,
  containerClassName,
  index = 0,
  tags = [
    { label: "Full sun", color: "bg-amber-100 text-amber-700" },
    { label: "Easy care", color: "bg-green-100 text-green-700" },
  ],
  difficulty = "easy",
  rating = 4.8,
}: StoreCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className={cn("group cursor-pointer w-[240px] h-[380px] shrink-0", containerClassName)}
      onClick={onClick}
    >
      <Card
        className={cn(
          "relative overflow-hidden h-full border-none bg-card rounded-[20px] flex flex-col transition-shadow duration-300",
          "shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
          className,
        )}
      >
        {/* Header Section */}
        <div className="p-4 pb-2 flex flex-col gap-2 relative z-10">
          <div className="flex justify-between items-start">
            <h3 className="text-[18px] font-semibold text-foreground leading-tight pr-6">{title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
              className="absolute top-4 right-4 focus:outline-none transition-transform active:scale-90"
            >
              <Heart size={20} className={cn("transition-colors duration-300", isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground/40")} />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <span key={i} className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-[0.04em]", tag.color)}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Image Area - 52% Height */}
        <div className="relative h-[52%] w-full bg-muted/10 flex items-center justify-center overflow-hidden">
          <motion.div className="w-full h-full flex items-center justify-center p-4 relative" whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
            {/* warm vignette overlay appears on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-radial from-transparent via-transparent to-primary/10 pointer-events-none" />
            {children}
          </motion.div>
        </div>

        {/* Metadata section */}
        <div className="flex-1 px-4 py-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    i === 0 ? "bg-sage-500" : i === 1 ? (difficulty !== "easy" ? "bg-warm-500" : "bg-muted") : difficulty === "hard" ? "bg-destructive" : "bg-muted",
                  )}
                />
              ))}
              <span className="text-[13px] text-muted-foreground ml-1">Care Level</span>
            </div>

            <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
              <Star size={14} className="fill-warm-500 text-warm-500" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="h-[0.5px] w-full bg-border/40 my-1" />

          {/* Footer / CTA Area */}
          <div className="flex flex-col gap-2">
            <button
              className={cn(
                "w-full h-[40px] rounded-full text-[13px] font-medium uppercase tracking-[0.06em] transition-all duration-300",
                "bg-primary text-primary-foreground",
                "hover:brightness-110 hover:scale-[1.02] active:scale-[0.97]",
                "focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                isUnlocked && isSelected && "ring-2 ring-primary ring-offset-2",
              )}
            >
              {isSelected ? "Active in Garden" : "Add to Garden"}
            </button>

            {price !== undefined && !isUnlocked && (
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <div className="h-4 w-4 bg-warm-500 rounded-full flex items-center justify-center">
                  <Coins size={10} className="text-white" />
                </div>
                <span className="text-[13px] font-semibold text-foreground">{price}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
