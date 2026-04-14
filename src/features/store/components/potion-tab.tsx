"use client"

import { cn } from "@/lib/utils"
import { FlaskConical, Clock, Info, Zap, Sparkles } from "lucide-react"
import { POTION_ITEMS } from "@/features/store/constants/items"
import { useUser } from "@/hooks/use-user"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { StoreCard } from "./store-card"

export function PotionTab() {
  const { buyItem, activePotionId, potionsInventory, usePotion: activatePotion } = useUser()

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-3 px-1 text-left">
        <div className="flex items-center gap-3.5">
           <FlaskConical className="h-6 w-6 text-primary" strokeWidth={1.25} />
           <h3 className="text-3xl font-light font-[family-name:var(--font-outfit)] text-foreground tracking-tight leading-none">
             Mystic Catalysts
           </h3>
        </div>
        <p className="text-[14px] text-muted-foreground font-medium ml-9 leading-relaxed max-w-sm">
          Potent elixirs and alchemical enhancers to refine your mental frequency and focus depth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {POTION_ITEMS.map((potion, index) => {
          const isActive = activePotionId === potion.id
          const count = potionsInventory[potion.id] || 0

          return (
            <StoreCard
              key={potion.id}
              index={index}
              title={potion.name}
              subtitle="Alchemical Essence"
              icon={<FlaskConical className="h-4 w-4" strokeWidth={1.25} />}
              price={potion.price}
              isUnlocked={count > 0 || isActive}
              isSelected={isActive}
              onClick={() => {
                if (count > 0 && !isActive) {
                   activatePotion(potion.id)
                } else if (!isActive) {
                   buyItem(potion)
                }
              }}
              cornerIcon={
                isActive ? (
                   <Sparkles className="h-4.5 w-4.5 text-primary/30 animate-pulse" strokeWidth={1.25} />
                ) : null
              }
            >
              <div className="flex flex-col items-center gap-6 w-full text-center">
                <div className="relative shrink-0">
                   <motion.div 
                     whileHover={{ 
                       backgroundColor: "var(--card)",
                       borderColor: "var(--border)",
                       boxShadow: "0 24px 48px -12px rgba(107, 143, 107, 0.12)",
                       scale: 1.05
                     }}
                     transition={{ duration: 0.7 }}
                     className={cn(
                       "h-28 w-28 rounded-[40px] flex items-center justify-center text-4xl transition-all duration-1000",
                       "bg-card/60 border border-border/60 shadow-sm",
                       isActive ? "bg-foreground text-background" : "text-foreground"
                     )}
                   >
                     <span className={cn(isActive && "animate-pulse")}>{potion.emoji}</span>
                   </motion.div>
                </div>

                <div className="space-y-4 mt-2">
                  <p className="text-[13px] text-muted-foreground leading-relaxed font-medium line-clamp-2 px-6 italic">
                    &ldquo;{potion.description}&rdquo;
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3">
                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/40 border border-border/60 text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">
                        <Clock className="h-3 w-3" strokeWidth={1.25} />
                        60m
                     </div>
                     {count > 0 && (
                        <div className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full uppercase tracking-widest">
                           {count} Available
                        </div>
                     )}
                  </div>
                </div>
              </div>

              {/* Unique Action Overlay for Potion Tab */}
              {count > 0 && !isActive && (
                 <div className="absolute top-6 right-6">
                    <Button
                      variant="ghost"
                      className="h-9 w-9 rounded-full p-0 bg-card/70 border border-border/80 hover:bg-card text-warm-500 shadow-sm transition-all duration-500"
                    >
                       <Zap className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                 </div>
              )}
            </StoreCard>
          )
        })}
      </div>

      <div className="max-w-4xl mx-auto p-12 rounded-[48px] bg-card/45 border border-border/40 flex flex-col sm:flex-row items-center gap-10">
         <div className="h-20 w-20 shrink-0 bg-card/60 rounded-[32px] shadow-sm flex items-center justify-center border border-border">
            <Info className="h-7 w-7 text-primary" strokeWidth={1.25} />
         </div>
         <div className="space-y-2">
           <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Alchemical Guidance</h4>
           <p className="text-[15px] text-muted-foreground font-medium leading-relaxed italic text-center sm:text-left">
              &ldquo;Potions are temporary catalysts. Use them wisely during peak cognitive windows. Effects do not persist across multiple focus cycles.&rdquo;
           </p>
         </div>
      </div>
    </div>

  )
}
