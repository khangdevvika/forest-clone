"use client"

import { useUser } from "@/hooks/use-user"
import { THEME_ITEMS } from "../constants/items"
import { useTheme, THEMES } from "@/hooks/use-theme"
import { motion, AnimatePresence } from "framer-motion"
import { Coins, Check, Lock, MousePointer2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { type Theme } from "@/store/ui.atoms"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
            <motion.div layout key={item.id} whileHover={{ y: -4, scale: 1.01 }}>
              <Card
                variant={isActive ? "active" : "default"}
                padding="lg"
                className={cn("group relative overflow-hidden transition-all duration-300 h-full", !isActive && "hover:border-border/80 hover:shadow-xl hover:shadow-primary/5")}
              >
                {/* Theme Preview Color Orb */}
                <div className="absolute top-0 right-0 h-40 w-40 -translate-y-12 translate-x-12 opacity-10 blur-3xl rounded-full" style={{ backgroundColor: themeConfig?.color }} />

                <div className="flex flex-col h-full space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-foreground leading-none">{item.name}</h3>
                      <p className="text-xs text-muted-foreground pr-4">{item.description}</p>
                    </div>
                    <div
                      className="h-10 w-10 shrink-0 rounded-xl shadow-inner border-2 border-white/10 transition-transform group-hover:rotate-12"
                      style={{ backgroundColor: themeConfig?.color }}
                    />
                  </div>

                  <div className="mt-auto pt-4 flex flex-col gap-3">
                    <AnimatePresence mode="wait">
                      {isUnlocked ? (
                        <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Button
                            onClick={() => setTheme(item.id as Theme)}
                            variant={isActive ? "secondary" : "outline"}
                            className={cn("w-full h-11 rounded-xl text-xs uppercase tracking-widest", isActive && "bg-primary/10 text-primary border-transparent hover:bg-primary/15 cursor-default")}
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
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Button onClick={() => buyItem(item)} variant="3d-gold" className="w-full h-11 rounded-xl">
                            <Coins className="h-4 w-4" strokeWidth={2.5} />
                            {item.price}
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {!isUnlocked && (
                  <div className="absolute top-3 right-3 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
                    <Lock className="h-4 w-4" strokeWidth={2} />
                  </div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
