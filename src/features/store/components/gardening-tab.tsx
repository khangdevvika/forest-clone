"use client"

import { cn } from "@/lib/utils"
import { Sprout, Droplet, Zap, PackageOpen } from "lucide-react"
import { GARDENING_ITEMS } from "@/features/store/constants/items"
import { useUser } from "@/hooks/use-user"
import type { GardeningInventory } from "@/features/timer/types/nursery"
import { StoreCard } from "./store-card"

export function GardeningTab() {
  const { buyItem, inventory } = useUser()

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-3 px-1 text-left">
        <div className="flex items-center gap-3.5">
          <Sprout className="h-6 w-6 text-primary" strokeWidth={1.25} />
          <h3 className="text-3xl font-light font-[family-name:var(--font-outfit)] text-foreground tracking-tight leading-none">Gardening Supplies</h3>
        </div>
        <p className="text-[14px] text-muted-foreground font-medium ml-9 leading-relaxed max-w-sm">
          Essential tools and nutrients to help your nursery flourish and accelerate the growth of your sprouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {GARDENING_ITEMS.map((item, index) => {
          const count = (inventory as GardeningInventory)[item.id as keyof GardeningInventory] || 0

          return (
            <StoreCard
              key={item.id}
              index={index}
              title={item.name}
              subtitle="Nursery Supply"
              icon={item.id === "water" ? <Droplet className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
              price={item.price}
              isUnlocked={true}
              onClick={() => buyItem(item)}
            >
              <div className="flex flex-col items-center gap-6 w-full text-center">
                <div className="relative shrink-0">
                  <div
                    className={cn("h-28 w-28 rounded-[40px] flex items-center justify-center text-4xl transition-all duration-1000", "bg-card/60 border border-border/60 shadow-sm text-foreground")}
                  >
                    <span>{item.emoji}</span>
                  </div>
                </div>

                <div className="space-y-4 mt-2">
                  <p className="text-[13px] text-muted-foreground leading-relaxed font-medium line-clamp-2 px-6 italic">&ldquo;{item.description}&rdquo;</p>

                  {count > 0 && (
                    <div className="flex justify-center">
                      <div className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full uppercase tracking-widest">{count} In Stock</div>
                    </div>
                  )}
                </div>
              </div>
            </StoreCard>
          )
        })}
      </div>

      <div className="max-w-4xl mx-auto p-12 rounded-[48px] bg-card/45 border border-border/40 flex flex-col sm:flex-row items-center gap-10">
        <div className="h-20 w-20 shrink-0 bg-card/60 rounded-4xl shadow-sm flex items-center justify-center border border-border">
          <PackageOpen className="h-7 w-7 text-primary" strokeWidth={1.25} />
        </div>
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Nursery Wisdom</h4>
          <p className="text-[15px] text-muted-foreground font-medium leading-relaxed italic text-center sm:text-left">
            &ldquo;Seeds need more than just time; they need attention. A well-watered sprout matures into a resilient tree that stands tall in your vision.&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
