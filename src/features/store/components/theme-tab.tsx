"use client"

import { cn } from "@/lib/utils"
import { Check, Sparkles, Palette } from "lucide-react"
import { THEME_ITEMS } from "@/features/store/constants/items"
import { useUser } from "@/hooks/use-user"
import { useTheme } from "@/hooks/use-theme"
import { type Theme } from "@/store/ui.atoms"
import { motion } from "framer-motion"
import { StoreCard } from "./store-card"

const THEME_VISUALS: Record<string, { gradient: string; aura: string; iconColor: string }> = {
  sage: {
    gradient: "bg-linear-to-br from-[#7ba87b]/30 to-[#e6ede4]/30",
    aura: "bg-[#7ba87b]",
    iconColor: "text-[#5a7a5a]",
  },
  forest: {
    gradient: "bg-linear-to-br from-[#2a3d27]/40 to-[#4a6649]/30 border-b border-white/5",
    aura: "bg-[#2a3d27] border border-white/10",
    iconColor: "text-[#9ebd98]",
  },
  sunset: {
    gradient: "bg-linear-to-br from-[#f97316]/30 via-[#fb923c]/20 to-[#fde68a]/30",
    aura: "bg-orange-400 blur-[30px]",
    iconColor: "text-orange-600",
  },
  midnight: {
    gradient: "bg-linear-to-br from-[#1e1b4b]/50 to-[#4338ca]/30",
    aura: "bg-indigo-500 blur-[25px]",
    iconColor: "text-indigo-400",
  },
  rose: {
    gradient: "bg-linear-to-br from-[#fecdd3]/40 to-[#fda4af]/30",
    aura: "bg-rose-300",
    iconColor: "text-rose-600",
  },
  emerald: {
    gradient: "bg-linear-to-br from-[#059669]/30 to-[#34d399]/20",
    aura: "bg-emerald-400",
    iconColor: "text-emerald-700",
  },
}

export function ThemeTab() {
  const { unlockedThemes, buyItem } = useUser()
  const { theme: activeTheme, setTheme } = useTheme()

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-3 px-1 text-left">
        <div className="flex items-center gap-3.5">
          <Palette className="h-6 w-6 text-primary" strokeWidth={1.25} />
          <h3 className="text-3xl font-light font-[family-name:var(--font-outfit)] text-foreground tracking-tight leading-none">Chromatic Lenses</h3>
        </div>
        <p className="text-[14px] text-muted-foreground font-medium ml-9 leading-relaxed max-w-sm">Refract the forest atmosphere through unique chromatic filters and ethereal light.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {THEME_ITEMS.map((item, index) => {
          const isUnlocked = unlockedThemes.includes(item.id)
          const isActive = activeTheme === item.id
          const visual = THEME_VISUALS[item.id] || THEME_VISUALS.sage

          return (
            <StoreCard
              key={item.id}
              index={index}
              title={item.name}
              subtitle="Chromatic Culture"
              icon={<Palette className={cn("h-4 w-4", visual.iconColor)} strokeWidth={1.25} />}
              price={item.price}
              isUnlocked={isUnlocked}
              isSelected={isActive}
              onClick={() => {
                if (isUnlocked) {
                  setTheme(item.id as Theme)
                } else {
                  buyItem(item)
                }
              }}
              className="px-0 py-0"
              cornerIcon={isActive ? <Sparkles className="h-4.5 w-4.5 text-primary/30 animate-pulse" strokeWidth={1.25} /> : null}
            >
              <div className="flex flex-col items-stretch w-full h-full">
                <div className={cn("w-full h-[140px] relative overflow-hidden flex items-center justify-center transition-all duration-700", visual.gradient)}>
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0.7, 0.4],
                      rotate: [0, 10, 0],
                    }}
                    transition={{ duration: 10 + index, repeat: Infinity, ease: "easeInOut" }}
                    className={cn("h-32 w-32 rounded-full blur-[35px] opacity-50", visual.aura)}
                  />

                  {/* Internal Reflection Effect — Premium Glassy layer */}
                  <div className="absolute inset-0 bg-card/5 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 bg-linear-to-b from-card/10 via-transparent to-black/5" />

                  <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-white/30 mix-blend-overlay" strokeWidth={0.75} />
                </div>

                <div className="p-7 flex-1 flex flex-col items-center text-center gap-5">
                  <p className="text-[13px] text-muted-foreground font-medium leading-relaxed italic px-2">&ldquo;{item.description}&rdquo;</p>

                  {isActive && (
                    <div className="mt-auto pt-2 flex items-center gap-2.5 text-primary/80 font-semibold text-[10px] uppercase tracking-[0.25em]">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              </div>
            </StoreCard>
          )
        })}
      </div>
    </div>
  )
}
