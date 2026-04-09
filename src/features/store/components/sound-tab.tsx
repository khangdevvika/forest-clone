"use client"

import { cn } from "@/lib/utils"
import { Volume2, Play, Pause, Music, Sparkles } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { MUSIC_ITEMS } from "@/features/store/constants/items"
import { useUser } from "@/hooks/use-user"
import { StoreCard } from "./store-card"
import { motion } from "framer-motion"
import { gentleSpring, scaleIn } from "@/lib/animations"

export function SoundTab() {
  const { activeSoundId, setActiveSoundId, volume, setVolume, unlockedMusic, buyItem } = useUser()

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
        <div className="flex flex-col gap-3 text-left pt-2">
          <div className="flex items-center gap-3.5">
             <Music className="h-6 w-6 text-[--sage-600]" strokeWidth={1.25} />
             <h3 className="text-3xl font-light font-[family-name:var(--font-outfit)] text-[--sage-900] tracking-tight leading-none">
               Atmospheric Frequencies
             </h3>
          </div>
          <p className="text-[14px] text-[--sage-600]/60 font-medium ml-9 leading-relaxed max-w-sm">
             Fine-tune the vibrational resonance of your focus space with curated environment audio.
          </p>
        </div>

        <motion.div 
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className={cn(
            "flex items-center gap-7 px-8 py-7 rounded-[32px] border-white/50 backdrop-blur-sm min-w-[380px]",
            "bg-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.03)] border"
          )}
        >
          <div className="p-4 rounded-2xl bg-white/60 shadow-sm border border-white/80 transition-transform hover:scale-105 duration-500">
            <Volume2 className="h-5 w-5 text-[--sage-600]" strokeWidth={1.25} />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-semibold text-[--sage-600]/40 uppercase tracking-[0.2em]">Atmosphere Gain</span>
              <span className="text-sm font-semibold font-[family-name:var(--font-outfit)] text-[--sage-900] tabular-nums tracking-wider">{Math.round(volume * 100)}%</span>
            </div>
            <Slider 
              value={[volume * 100]} 
              onValueChange={(v: number[]) => setVolume(v[0] / 100)} 
              max={100} 
              step={1} 
              className="flex-1" 
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {MUSIC_ITEMS.map((sound, index) => {
          const isUnlocked = unlockedMusic.includes(sound.id)
          const isActive = activeSoundId === sound.id

          return (
            <StoreCard
              key={sound.id}
              index={index}
              title={sound.name}
              subtitle="Environment Audio"
              icon={<Music className="h-4 w-4" strokeWidth={1.25} />}
              price={sound.price}
              isUnlocked={isUnlocked}
              isSelected={isActive}
              onClick={() => {
                if (isUnlocked) {
                  setActiveSoundId(isActive ? null : sound.id)
                } else {
                  buyItem(sound)
                }
              }}
              cornerIcon={
                isActive ? (
                  <Sparkles className="h-4.5 w-4.5 text-[--sage-600]/30 animate-pulse" strokeWidth={1.25} />
                ) : null
              }
            >
              <div className="flex flex-col items-center gap-9 w-full text-center py-2">
                <div className="relative shrink-0 flex items-center justify-center">
                  {/* Organic Aura — Refined Zen Glow */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.1, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset--4 bg-[--sage-400]/20 blur-[30px] rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -inset-8 bg-[--sage-300]/15 blur-[20px] rounded-full"
                      />
                    </div>
                  )}
                  
                  <motion.div
                    whileHover={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: "rgba(255, 255, 255, 1)",
                      boxShadow: "0 24px 48px -12px rgba(107, 143, 107, 0.15)",
                      scale: 1.05
                    }}
                    transition={{ duration: 0.7 }}
                    className={cn(
                      "h-32 w-32 rounded-[44px] flex items-center justify-center text-5xl transition-all duration-1000 relative z-10",
                      isActive 
                        ? "bg-white shadow-[0_24px_54px_-10px_rgba(0,0,0,0.08)] border border-white" 
                        : "bg-white/30 backdrop-blur-sm border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.02)] text-foreground",
                    )}
                  >
                    <span className={cn(isActive && "animate-pulse")}>{sound.emoji}</span>
                  </motion.div>
                </div>

                <div className="flex flex-col items-center gap-7 relative z-10 w-full mb-2">
                  <div className={cn("h-6 transition-all duration-700 flex items-center justify-center", !isActive && "opacity-0 pointer-events-none invisible")}>
                    <MusicVisualizer />
                  </div>
                  
                  {isUnlocked && (
                    <motion.div 
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "h-14 w-14 rounded-full flex items-center justify-center transition-all duration-700 shadow-xl border-2",
                        isActive 
                          ? "bg-[--sage-900] text-white border-[--sage-800] shadow-[--sage-900]/30 ring-4 ring-[--sage-900]/10" 
                          : "bg-white/50 backdrop-blur-sm text-[--sage-400] border-white/80 hover:text-[--sage-900] hover:bg-white hover:shadow-[--sage-900]/10 hover:border-white"
                      )}
                    >
                      {isActive ? (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Pause className="h-6 w-6 fill-current" strokeWidth={1.5} />
                        </motion.div>
                      ) : (
                        <Play className="h-6 w-6 fill-current ml-1" strokeWidth={1.5} />
                      )}
                    </motion.div>
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

function MusicVisualizer() {
  return (
    <div className="flex items-end gap-1 h-3">
      {[0.6, 0.9, 0.5, 0.8, 0.4, 0.7].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: "4px" }}
          animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
          transition={{
            duration: 1 + h,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
          className="w-1 bg-sage-400 rounded-full opacity-60"
        />
      ))}
    </div>
  )
}
