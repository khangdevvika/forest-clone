"use client"

import { glassEnabledAtom } from "@/store/ui.atoms"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useAtom } from "jotai"
import { Layers, Layers2, Sparkles } from "lucide-react"
import { useSyncExternalStore } from "react"

interface GlassToggleProps {
  /** compact = icon-only pill; full = icon + label */
  variant?: "compact" | "full"
  className?: string
}

const spring = { type: "spring" as const, stiffness: 300, damping: 25 }
const microSpring = { type: "spring" as const, stiffness: 400, damping: 30 }

/**
 * GlassToggle
 *
 * Flips `glassEnabledAtom` which in turn sets `data-glass="off"` on
 * <html> via GlassEffectSyncer. CSS handles every downstream change —
 * this component has zero knowledge of what the glass classes look like.
 */
export function GlassToggle({ variant = "compact", className }: GlassToggleProps) {
  const [glassEnabled, setGlassEnabled] = useAtom(glassEnabledAtom)

  // Prevent hydration mismatch
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  if (!mounted) {
    return <div className={cn("h-8 rounded-full animate-pulse", variant === "full" ? "w-24" : "w-8", className)} style={{ background: "rgba(255,255,255,0.08)" }} />
  }

  const toggle = () => setGlassEnabled((prev) => !prev)

  if (variant === "full") {
    return (
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={microSpring}
        className={cn("group relative flex items-center justify-between gap-3 px-3.5 py-1.5 rounded-full border transition-all duration-500 cursor-pointer overflow-visible min-w-25", className)}
        style={{
          background: "rgba(255,255,255,0.06)",
          borderColor: glassEnabled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
          boxShadow: glassEnabled ? "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={glassEnabled ? "on" : "off"}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              {glassEnabled ? <Sparkles className="h-3 w-3 text-primary opacity-80" /> : <Layers2 className="h-3 w-3 text-white/30" />}
            </motion.div>
          </AnimatePresence>

          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 whitespace-nowrap pt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            {glassEnabled ? "Glass On" : "Glass Off"}
          </span>
        </div>

        {/* The Toggle Switch Handle */}
        <div className="relative w-7 h-4 rounded-full transition-colors duration-300 pointer-events-none" style={{ background: "rgba(0,0,0,0.2)" }}>
          <motion.div
            animate={{
              x: glassEnabled ? 13 : 1,
              backgroundColor: glassEnabled ? "var(--primary)" : "#888",
            }}
            transition={spring}
            className="absolute top-0.5 left-0 h-3 w-3 rounded-full"
            style={{
              boxShadow: glassEnabled ? "0 0 8px var(--primary)" : "none",
            }}
          />
        </div>

        {/* Premium hover glow */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: glassEnabled ? "0 0 15px rgba(123, 168, 123, 0.15)" : "0 0 10px rgba(255, 255, 255, 0.05)",
          }}
        />
      </motion.button>
    )
  }

  // compact variant — icon pill only
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={spring}
      className={cn("relative flex items-center justify-center h-8 w-8 rounded-full border transition-all duration-500 cursor-pointer group", className)}
      style={{
        background: glassEnabled ? "rgba(123, 168, 123, 0.15)" : "rgba(255, 255, 255, 0.06)",
        borderColor: glassEnabled ? "rgba(123, 168, 123, 0.25)" : "rgba(255, 255, 255, 0.1)",
      }}
    >
      <AnimatePresence mode="wait">
        {glassEnabled ? (
          <motion.div key="on" initial={{ opacity: 0, rotate: -20, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 20, scale: 0.5 }} transition={spring}>
            <Layers className="h-4 w-4 text-primary" strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div key="off" initial={{ opacity: 0, rotate: 20, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -20, scale: 0.5 }} transition={spring}>
            <Layers2 className="h-4 w-4 text-white/20" strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
