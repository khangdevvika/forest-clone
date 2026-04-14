"use client"

import * as React from "react"
import { useAtom, useAtomValue } from "jotai"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check, Sparkles } from "lucide-react"
import { selectedTagIdAtom } from "@/features/timer/store/timer.atoms"
import { sessionsAtom } from "@/features/timer/store"
import { TAGS } from "@/features/timer/constants/tags"
import { getTagLevelInfo } from "@/features/timer/lib/tag-utils"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/animations"

interface TagSelectorProps {
  disabled?: boolean
}

export function TagSelector({ disabled }: TagSelectorProps) {
  const [selectedId, setSelectedId] = useAtom(selectedTagIdAtom)
  const sessions = useAtomValue(sessionsAtom)
  const [isOpen, setIsOpen] = React.useState(false)
  
  const selectedTag = TAGS.find(t => t.id === selectedId) || TAGS[0]
  const levelInfo = getTagLevelInfo(selectedTag.id, sessions)
  
  // Icon evolution check (Level 3+)
  const EffectiveIcon = (levelInfo.level >= 3 && selectedTag.evolvedIcon) 
    ? selectedTag.evolvedIcon 
    : selectedTag.icon

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300",
          "bg-card/60 border border-border/60 shadow-sm",
          "hover:bg-card/70 hover:border-border/90 hover:shadow-md",
          disabled && "opacity-50 cursor-not-allowed grayscale-[0.5]"
        )}
      >
        <div 
          className="flex items-center justify-center w-6 h-6 rounded-full relative"
          style={{ backgroundColor: `${selectedTag.color}20`, color: selectedTag.color }}
        >
          {levelInfo.level >= 3 && (
            <Sparkles className="absolute -top-1 -right-1 w-2.5 h-2.5 animate-pulse" />
          )}
          <EffectiveIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[11px] font-bold font-[family-name:var(--font-inter)] tracking-wider text-foreground uppercase">
            {selectedTag.label}
          </span>
          <span className="text-[9px] font-bold text-primary/60 uppercase tracking-tighter">
            Level {levelInfo.level}
          </span>
        </div>
        {!disabled && (
          <ChevronDown 
            className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ml-1", isOpen && "rotate-180")} 
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
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 min-w-[200px] p-2 overflow-hidden rounded-[24px] bg-card/90 border border-border/60 shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                {TAGS.map((tag) => {
                  const tagLevel = getTagLevelInfo(tag.id, sessions)
                  const isSelected = tag.id === selectedId
                  const TagIcon = (tagLevel.level >= 3 && tag.evolvedIcon) ? tag.evolvedIcon : tag.icon
                  
                  return (
                    <button
                      key={tag.id}
                      onClick={() => {
                        setSelectedId(tag.id)
                        setIsOpen(false)
                      }}
                      className={cn(
                        "flex flex-col w-full px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        isSelected ? "bg-card/80 shadow-sm border border-border/20" : "hover:bg-card/40"
                      )}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="flex items-center justify-center w-7 h-7 rounded-full transition-all group-hover:bg-card/20"
                            style={{ backgroundColor: `${tag.color}15`, color: tag.color }}
                          >
                            <TagIcon className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-col items-start leading-none">
                            <span className={cn(
                              "text-xs font-semibold font-[family-name:var(--font-inter)]",
                              isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                            )}>
                              {tag.label}
                            </span>
                            <span className="text-[9px] font-bold text-primary/50 uppercase tracking-tighter">
                              Level {tagLevel.level}
                            </span>
                          </div>
                        </div>
                        
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                        )}
                      </div>

                      {/* Progress bar to next level */}
                      <div className="w-full h-1 bg-border/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${tagLevel.progress}%` }}
                          className="h-full bg-primary/40 rounded-full"
                        />
                      </div>
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
