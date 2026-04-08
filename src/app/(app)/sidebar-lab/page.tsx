"use client"

import { FireflySidebar, AmbianceSidebar, LuminousSidebar } from "@/components/sidebar-v2/variations"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Sparkles, Palette, Zap, Layout, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SidebarLabPage() {
  const [activeVariation, setActiveVariation] = useState<"firefly" | "ambiance" | "luminous">("luminous")

  const variations = {
    luminous: {
      name: "C) Luminous Path",
      description: "CRITICAL: High contrast design with white active text, golden glow border, and clearly muted inactive states.",
      component: <LuminousSidebar />,
      icon: Eye,
      color: "#d4af82",
    },
    firefly: {
      name: "A) Firefly Sanctuary",
      description: "Minimalist minimalist design with soft 'firefly' glow indicators and discreet stats integration.",
      component: <FireflySidebar />,
      icon: Sparkles,
      color: "var(--sage-400)",
    },
    ambiance: {
      name: "B) Ambiance Bloom",
      description: "Bolder, color-coded sections that adapt to the app's current mood and hierarchy.",
      component: <AmbianceSidebar />,
      icon: Palette,
      color: "#d48c45",
    },
  }

  return (
    <div className="flex bg-background min-h-[calc(100vh-4rem)] p-8 gap-12 overflow-hidden">
      {/* Sidebar Container */}
      <div className="relative group shrink-0">
        <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <motion.div className="relative w-[300px] h-[800px] rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/10 ring-1 ring-black/5" layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVariation}
              initial={{ opacity: 0, x: -20, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 20, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="h-full"
            >
              {variations[activeVariation].component}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Control Panel */}
      <div className="flex-1 space-y-12 py-10">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary"
          >
            <Zap className="h-3 w-3" />
            Sidebar Lab V2
          </motion.div>
          <motion.h1 className="text-6xl font-[family-name:var(--font-outfit)] font-light tracking-tight leading-[1.1]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Precision <br />
            <span className="text-primary italic font-normal">Navigation</span>
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground font-light max-w-xl leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Refining the Forest core menu with a focus on absolute clarity, readability, and distinct visual states.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6 max-w-2xl">
          {(Object.entries(variations) as [keyof typeof variations, (typeof variations)["luminous"]][]).map(([key, data], idx) => {
            const Icon = data.icon
            const isActive = activeVariation === key

            return (
              <motion.button
                key={key}
                onClick={() => setActiveVariation(key)}
                className={cn(
                  "relative p-8 rounded-[32px] border text-left transition-all duration-700 group overflow-hidden",
                  isActive ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20 shadow-xl" : "bg-muted/30 border-border/50 hover:bg-muted/80 hover:border-border",
                )}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={cn(
                      "h-16 w-16 rounded-[24px] flex items-center justify-center transition-all duration-700",
                      isActive ? "bg-primary text-white scale-110 shadow-lg" : "bg-background border border-border group-hover:bg-primary/10 group-hover:text-primary",
                    )}
                    style={isActive ? { boxShadow: `0 0 20px ${data.color}44` } : {}}
                  >
                    <Icon className="h-8 w-8" strokeWidth={1.25} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{data.name}</h3>
                    <p className="text-base text-muted-foreground font-light leading-relaxed">{data.description}</p>
                  </div>
                </div>

                {isActive && <motion.div layoutId="lab-indicator-v2" className="absolute right-8 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
