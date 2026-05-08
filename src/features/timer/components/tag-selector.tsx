"use client"

import * as React from "react"
import { useAtom, useAtomValue } from "jotai"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check, Sparkles, Plus, Trash2, AlertCircle } from "lucide-react"
import { selectedTagIdAtom } from "@/features/timer/store/timer.atoms"
import { sessionsAtom } from "@/features/timer/store"
import { getTagLevelInfo } from "@/features/timer/lib/tag-utils"
import { useUser } from "@/hooks/use-user"
import { CreateTagDialog } from "./create-tag-dialog"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/animations"

interface TagSelectorProps {
  disabled?: boolean
}

export function TagSelector({ disabled }: TagSelectorProps) {
  const [selectedId, setSelectedId] = useAtom(selectedTagIdAtom)
  const sessions = useAtomValue(sessionsAtom)
  const { allTags = [], removeCustomTag } = useUser()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  const selectedTag = allTags.find((t) => t.id === selectedId) || allTags[0]
  const levelInfo = getTagLevelInfo(selectedTag?.id || "", sessions)

  // Icon evolution check (Level 3+)
  const EffectiveIcon = levelInfo.level >= 3 && selectedTag?.evolvedIcon ? selectedTag.evolvedIcon : selectedTag?.icon || Sparkles

  const handleRemoveTag = (e: React.MouseEvent, tagId: string) => {
    e.stopPropagation()
    if (deletingId === tagId) {
      removeCustomTag(tagId)
      setDeletingId(null)
    } else {
      setDeletingId(tagId)
      // Auto-reset after 3s
      setTimeout(() => setDeletingId(null), 3000)
    }
  }

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
          disabled && "opacity-50 cursor-not-allowed grayscale-[0.5]",
        )}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full relative" style={{ backgroundColor: `${selectedTag?.color}20`, color: selectedTag?.color }}>
          {levelInfo.level >= 3 && <Sparkles className="absolute -top-1 -right-1 w-2.5 h-2.5 animate-pulse" />}
          <EffectiveIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[11px] font-bold font-[family-name:var(--font-inter)] tracking-wider text-foreground uppercase">{selectedTag?.label}</span>
          <span className="text-[9px] font-bold text-primary/60 uppercase tracking-tighter">Level {levelInfo.level}</span>
        </div>
        {!disabled && <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ml-1", isOpen && "rotate-180")} strokeWidth={1.25} />}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 12, scale: 0.9, filter: "blur(10px)" }}
              transition={spring}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 min-w-[260px] p-2 overflow-hidden rounded-[32px] bg-card/85 border border-border/60 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-1.5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar px-1 py-1">
                {allTags.map((tag, idx) => {
                  const tagLevel = getTagLevelInfo(tag.id, sessions)
                  const isSelected = tag.id === selectedId
                  const TagIcon = tagLevel.level >= 3 && tag.evolvedIcon ? tag.evolvedIcon : tag.icon
                  const isConfirming = deletingId === tag.id

                  return (
                    <motion.div key={tag.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }} className="relative group">
                      <button
                        onClick={() => {
                          setSelectedId(tag.id)
                          setIsOpen(false)
                        }}
                        className={cn(
                          "flex flex-col w-full px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                          isSelected ? "bg-card shadow-lg border border-primary/20" : "hover:bg-primary/5",
                        )}
                      >
                        {isSelected && <motion.div layoutId="active-pill" className="absolute inset-0 bg-primary/5 -z-10" />}

                        <div className="flex items-center justify-between w-full mb-2.5">
                          <div className="flex items-center gap-3.5">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all group-hover:scale-110" style={{ backgroundColor: `${tag.color}15`, color: tag.color }}>
                              <TagIcon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col items-start leading-none">
                              <span
                                className={cn(
                                  "text-xs font-bold font-[family-name:var(--font-inter)] tracking-tight",
                                  isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                                )}
                              >
                                {tag.label}
                              </span>
                              <span className="text-[9px] font-bold text-primary/40 uppercase tracking-tighter">Level {tagLevel.level}</span>
                            </div>
                          </div>

                          {isSelected && <Check className="w-4 h-4 text-primary" strokeWidth={3} />}
                        </div>

                        {/* Progress bar to next level */}
                        <div className="w-full h-1 bg-primary/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${tagLevel.progress}%` }} className="h-full bg-primary/30 rounded-full" />
                        </div>
                      </button>

                      {tag.isCustom && !isSelected && (
                        <button
                          onClick={(e) => handleRemoveTag(e, tag.id)}
                          className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1.5 rounded-xl transition-all flex items-center gap-1.5",
                            isConfirming ? "bg-red-500 text-white shadow-lg scale-105" : "bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white",
                          )}
                        >
                          {isConfirming ? (
                            <>
                              <AlertCircle className="w-3 h-3" strokeWidth={3} />
                              <span className="text-[8px] font-bold uppercase tracking-tighter">Sure?</span>
                            </>
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                          )}
                        </button>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-2 p-2 pt-3 border-t border-border/40">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setIsCreateOpen(true)
                  }}
                  className="flex items-center gap-3.5 w-full px-4 py-3.5 rounded-2xl bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-white/20 transition-all">
                    <Plus className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest">Create Focus Tag</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CreateTagDialog isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  )
}
