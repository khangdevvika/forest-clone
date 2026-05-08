"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Search, Check, Briefcase, Book, Heart, Zap, Wind, ShieldCheck, GraduationCap, Flame, Glasses, Sparkles, Cloud, Coffee, Code, Camera, Music, Palette, Dumbbell, Plane, ShoppingBag, Terminal, MessageSquare, Brain, PenTool, Coffee as Cup, AlertCircle } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { scaleIn } from "@/lib/animations"
import confetti from "canvas-confetti"

const ICON_OPTIONS = [
  { name: "Briefcase", icon: Briefcase },
  { name: "Book", icon: Book },
  { name: "Heart", icon: Heart },
  { name: "Zap", icon: Zap },
  { name: "Wind", icon: Wind },
  { name: "ShieldCheck", icon: ShieldCheck },
  { name: "GraduationCap", icon: GraduationCap },
  { name: "Flame", icon: Flame },
  { name: "Glasses", icon: Glasses },
  { name: "Sparkles", icon: Sparkles },
  { name: "Cloud", icon: Cloud },
  { name: "Coffee", icon: Coffee },
  { name: "Code", icon: Code },
  { name: "Camera", icon: Camera },
  { name: "Music", icon: Music },
  { name: "Palette", icon: Palette },
  { name: "Dumbbell", icon: Dumbbell },
  { name: "Plane", icon: Plane },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "Terminal", icon: Terminal },
  { name: "MessageSquare", icon: MessageSquare },
  { name: "Brain", icon: Brain },
  { name: "PenTool", icon: PenTool },
  { name: "Cup", icon: Cup },
]

const COLOR_OPTIONS = [
  { name: "Sage", value: "var(--sage-500)" },
  { name: "Forest", value: "var(--sage-700)" },
  { name: "Amber", value: "var(--warm-500)" },
  { name: "Earth", value: "#BC6C25" },
  { name: "Sand", value: "#DDA15E" },
  { name: "Moss", value: "#606C38" },
  { name: "Mint", value: "#A3B18A" },
  { name: "Emerald", value: "#3A5A40" },
  { name: "Slate", value: "#4A5E47" },
  { name: "Blush", value: "#D4A5B2" },
]

interface CreateTagDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTagDialog({ isOpen, onClose }: CreateTagDialogProps) {
  const { addCustomTag, allTags } = useUser()
  const [label, setLabel] = React.useState("")
  const [selectedIcon, setSelectedIcon] = React.useState(ICON_OPTIONS[0].name)
  const [selectedColor, setSelectedColor] = React.useState(COLOR_OPTIONS[0].value)
  const [search, setSearch] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const filteredIcons = ICON_OPTIONS.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  const isDuplicate = allTags.some(t => t.label.toLowerCase() === label.trim().toLowerCase())

  const handleCreate = () => {
    if (!label.trim()) return
    if (isDuplicate) {
      setError("This tag name already exists")
      return
    }

    addCustomTag({
      label: label.trim(),
      iconName: selectedIcon,
      color: selectedColor
    })

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: [selectedColor, "#ffffff", "var(--primary)"]
    })

    setLabel("")
    setError(null)
    onClose()
  }

  React.useEffect(() => {
    if (error && !isDuplicate) setError(null)
  }, [label, isDuplicate, error])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/40 backdrop-blur-xl"
          />
          
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="relative w-full max-w-md overflow-hidden rounded-[48px] bg-card/80 border border-border/60 shadow-2xl p-8 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-light font-[family-name:var(--font-outfit)]">Create Focus Tag</h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mt-1">Personalize your journey</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Preview */}
              <div className="flex flex-col items-center gap-4 py-8 bg-primary/5 rounded-[40px] border border-primary/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div 
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-card shadow-xl border border-border/40 relative z-10"
                >
                  <div 
                    className="flex items-center justify-center w-8 h-8 rounded-full"
                    style={{ backgroundColor: `${selectedColor}20`, color: selectedColor }}
                  >
                    {React.createElement(ICON_OPTIONS.find(i => i.name === selectedIcon)?.icon || AlertCircle, {
                      className: "w-4 h-4",
                      strokeWidth: 1.5
                    })}
                  </div>
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    {label || "Untagged"}
                  </span>
                </div>
                <p className="text-[9px] font-bold text-primary/40 uppercase tracking-tighter z-10">Live Preview</p>
              </div>

              {/* Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">Label</label>
                  {error && (
                    <span className="text-[9px] font-bold text-red-500 uppercase flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {error}
                    </span>
                  )}
                </div>
                <input
                  autoFocus
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Creative Coding"
                  className={cn(
                    "w-full bg-muted/20 border rounded-2xl px-6 py-4 text-sm focus:outline-none transition-all",
                    error ? "border-red-500/50 bg-red-500/5" : "border-border/40 focus:ring-2 focus:ring-primary/20"
                  )}
                />
              </div>

              {/* Selection Tabs (Icons & Colors) */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">Symbol</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/40" />
                      <input 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search symbols..."
                        className="bg-muted/10 border border-border/10 rounded-full pl-8 pr-4 py-1.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredIcons.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setSelectedIcon(item.name)}
                        className={cn(
                          "aspect-square rounded-2xl flex items-center justify-center transition-all duration-300",
                          selectedIcon === item.name 
                            ? "bg-primary text-primary-foreground shadow-lg scale-110" 
                            : "bg-muted/10 border border-border/10 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                        )}
                      >
                        <item.icon className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50 px-1">Atmosphere</label>
                  <div className="flex flex-wrap gap-3">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all duration-300 relative overflow-hidden",
                          selectedColor === color.value ? "border-foreground scale-110 rotate-12" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                        style={{ backgroundColor: color.value }}
                      >
                        {selectedColor === color.value && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreate}
                disabled={!label.trim() || !!error}
                className="w-full bg-foreground text-background font-bold uppercase tracking-widest text-xs py-5 rounded-[28px] hover:opacity-90 disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-2xl elevation-4"
              >
                <Plus className="w-4 h-4" strokeWidth={3} />
                Create Tag
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


