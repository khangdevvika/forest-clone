"use client"

import { useUser } from "@/hooks/use-user"
import { POTION_ITEMS } from "../constants/items"
import { motion } from "framer-motion"
import { Coins, Zap, Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function PotionTab() {
  const { buyItem, potionsInventory, usePotion: activatePotion, activePotionId } = useUser()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Growth Potions</h2>
        <p className="text-sm text-muted-foreground">Boost your coin earnings during focus sessions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {POTION_ITEMS.map((potion) => {
          const count = potionsInventory[potion.id] || 0
          const isActive = activePotionId === potion.id
          
          return (
            <motion.div
              key={potion.id}
              whileHover={{ y: -4 }}
              className={cn(
                "group relative bg-card/60 border border-border rounded-2xl p-6.5 overflow-hidden transition-all duration-300 backdrop-blur-xs",
                isActive ? "ring-2 ring-primary border-primary/20 bg-accent/10" : "hover:border-border/80 hover:shadow-xl hover:shadow-primary/5"
              )}
            >
              <div className="absolute top-0 right-0 p-4">
                 <Badge variant="outline" className={cn("bg-white/5 border-white/10", count > 0 ? "text-primary border-primary/20" : "text-muted-foreground/30")}>
                    Owned: {count}
                 </Badge>
              </div>

              <div className="flex gap-6 items-start">
                <div className={cn(
                  "h-16 w-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner transition-transform group-hover:scale-110",
                  isActive ? "bg-primary/20 text-primary-foreground" : "bg-muted group-hover:bg-muted/80"
                )}>
                  {potion.emoji}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-foreground leading-none">{potion.name}</h3>
                    {isActive && (
                      <Badge className="bg-primary/20 text-primary border-transparent animate-pulse text-[10px] h-5">ACTIVE</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed pr-8">{potion.description}</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => buyItem(potion)}
                  className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all border-b-4 border-primary-foreground/20 active:border-b-0"
                >
                  <Coins className="h-4 w-4" strokeWidth={2.5} />
                  {potion.price}
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  disabled={count === 0 || isActive}
                  onClick={() => activatePotion(potion.id)}
                  className={cn(
                    "flex-1 h-11 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all",
                    count > 0 && !isActive 
                      ? "bg-accent/80 hover:bg-accent text-accent-foreground border-b-4 border-accent-foreground/10 active:border-b-0" 
                      : "bg-muted text-muted-foreground/30 cursor-not-allowed"
                  )}
                >
                  <Zap className={cn("h-4 w-4 fill-current", count > 0 && !isActive ? "text-primary" : "text-muted-foreground/20")} strokeWidth={2.5} />
                  {isActive ? "Active" : "Use Now"}
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Informational Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {[
          { icon: Clock, title: "One-Time Use", text: "Consumed when focus session ends" },
          { icon: Sparkles, title: "Stacking", text: "Multipliers apply to base earnings" },
          { icon: Coins, title: "Maximize Profit", text: "Best for long 2h sessions" },
        ].map((info, i) => (
          <div key={i} className="bg-muted/30 border border-white/5 rounded-xl p-4 flex gap-3">
             <info.icon className="h-5 w-5 text-primary/40 shrink-0" strokeWidth={1.5} />
             <div className="space-y-0.5">
               <p className="text-[11px] font-bold text-foreground/60 uppercase tracking-wider">{info.title}</p>
               <p className="text-[11px] text-muted-foreground leading-tight">{info.text}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
