"use client"

import { useUser } from "@/hooks/use-user"
import { THEME_ITEMS } from "../constants/items"
import { useTheme, THEMES } from "@/hooks/use-theme"
import { motion, AnimatePresence } from "framer-motion"
import { Coins, Check, Lock, MousePointer2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { type Theme } from "@/store/ui.atoms"

export function ThemeTab() {
  const { unlockedThemes, buyItem } = useUser()
  const { theme: currentTheme, setTheme } = useTheme()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Aesthetics Store</h2>
        <p className="text-sm text-muted-foreground">Personalize your oasis landscape</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {THEME_ITEMS.map((item) => {
          const isUnlocked = unlockedThemes.includes(item.id)
          const isActive = currentTheme === item.id
          const themeConfig = THEMES.find((t) => t.id === item.id)

          return (
            <motion.div
              layout
              key={item.id}
              whileHover={{ y: -4, scale: 1.01 }}
              className={cn(
                "group relative bg-card border border-border rounded-xl p-5 overflow-hidden transition-all duration-300",
                isActive ? "ring-2 ring-primary border-primary shadow-lg" : "hover:border-border/80 hover:shadow-xl hover:shadow-primary/5",
              )}
            >
              {/* Theme Preview Color Orb */}
              <div className="absolute top-0 right-0 h-40 w-40 -translate-y-12 translate-x-12 opacity-10 blur-3xl rounded-full" style={{ backgroundColor: themeConfig?.color }} />

              <div className="flex flex-col h-full space-y-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground leading-none">{item.name}</h3>
                    <p className="text-xs text-muted-foreground pr-4">{item.description}</p>
                  </div>
                  <div className="h-10 w-10 shrink-0 rounded-xl shadow-inner border-2 border-white/10 transition-transform group-hover:rotate-12" style={{ backgroundColor: themeConfig?.color }} />
                </div>

                <div className="mt-auto pt-4 flex flex-col gap-3">
                  <AnimatePresence mode="wait">
                    {isUnlocked ? (
                      <motion.button
                        key="select"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setTheme(item.id as Theme)}
                        className={cn(
                          "w-full h-11 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all",
                          isActive ? "bg-primary/20 text-primary cursor-default" : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground",
                        )}
                      >
                        {isActive ? (
                          <>
                            <Check className="h-4 w-4" strokeWidth={3} />
                            Active
                          </>
                        ) : (
                          <>
                            <MousePointer2 className="h-3.5 w-3.5" strokeWidth={3} />
                            Apply Theme
                          </>
                        )}
                      </motion.button>
                    ) : (
                      <motion.button
                        key="buy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => buyItem(item)}
                        className="w-full h-11 bg-[#d4af82] text-yellow-950 hover:brightness-110 active:scale-95 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_4px_0_rgba(100,80,0,0.2)] active:shadow-none -translate-y-0.5 active:translate-y-0"
                      >
                        <Coins className="h-4 w-4" strokeWidth={2.5} />
                        {item.price}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!isUnlocked && (
                <div className="absolute top-3 right-3 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
                  <Lock className="h-4 w-4" strokeWidth={2} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
