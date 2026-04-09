"use client"

import * as React from "react"
import { useAtom } from "jotai"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"
import { selectedTagIdAtom } from "@/features/timer/store/timer.atoms"
import { TAGS } from "@/features/timer/constants/tags"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/animations"

interface TagSelectorProps {
  disabled?: boolean
}

export function TagSelector({ disabled }: TagSelectorProps) {
  const [selectedId, setSelectedId] = useAtom(selectedTagIdAtom)
  const [isOpen, setIsOpen] = React.useState(false)
  
  const selectedTag = TAGS.find(t => t.id === selectedId) || TAGS[0]
  const Icon = selectedTag.icon

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2.5 px-3.5 py-1.5 rounded-full transition-all duration-300",
          "bg-white/40 border border-white/60 backdrop-blur-md shadow-sm shadow-white/10",
          "hover:bg-white/70 hover:border-white/90 hover:shadow-md",
          disabled && "opacity-50 cursor-not-allowed grayscale-[0.5]"
        )}
      >
        <div 
          className="flex items-center justify-center w-5 h-5 rounded-full"
          style={{ backgroundColor: `${selectedTag.color}20`, color: selectedTag.color }}
        >
          <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>
        <span className="text-[11px] font-semibold font-(family-name:--font-inter) tracking-wide text-foreground uppercase">
          {selectedTag.label}
        </span>
        {!disabled && (
          <ChevronDown 
            className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} 
            strokeWidth={1.25} 
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={spring}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 min-w-[160px] p-1.5 overflow-hidden rounded-2xl bg-white/45 border border-white/60 backdrop-blur-md shadow-xl shadow-black/5"
            >
              <div className="flex flex-col gap-0.5">
                {TAGS.map((tag) => {
                  const TagIcon = tag.icon
                  const isSelected = tag.id === selectedId
                  
                  return (
                    <button
                      key={tag.id}
                      onClick={() => {
                        setSelectedId(tag.id)
                        setIsOpen(false)
                      }}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-xl transition-all duration-200 group text-left",
                        isSelected ? "bg-white/50 shadow-sm shadow-white/10" : "hover:bg-white/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="flex items-center justify-center w-6 h-6 rounded-full transition-all group-hover:bg-white/20"
                          style={{ backgroundColor: `${tag.color}15`, color: tag.color }}
                        >
                          <TagIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </div>
                        <span className={cn(
                          "text-xs font-medium font-(family-name:--font-inter)",
                          isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}>
                          {tag.label}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
