"use client"

import { motion } from "framer-motion"
import { Sprout } from "lucide-react"
import { NurseryGrid, GrowthParticles } from "@/features/nursery/components"
import { fadeIn } from "@/lib/animations"

export default function NurseryPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 relative min-h-screen">
      <GrowthParticles />
      <header className="flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Sprout className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-4xl font-light font-[family-name:var(--font-outfit)] tracking-tight">The Nursery</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/50 mt-1 ml-0.5">Nurture your seedlings</p>
          </div>
        </div>
        <p className="max-w-xl text-sm text-muted-foreground leading-relaxed mt-2">
          Your concentration has yielded new life. Here in the sanctuary of the Greenhouse, use your gathered essence to nourish these sprouts until they are strong enough to take their place in the
          Great Forest.
        </p>
      </header>

      <motion.main initial="initial" animate="animate" variants={fadeIn}>
        <NurseryGrid />
      </motion.main>

      <footer className="pt-24 pb-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground/30">Steady growth requires patience & care</p>
      </footer>
    </div>
  )
}
