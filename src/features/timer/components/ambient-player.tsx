"use client"

import { useAmbientAudio } from "@/features/timer/hooks/use-ambient-audio"
import { AMBIENT_SOUNDS } from "@/features/timer/constants/sounds"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Music2, Pause, Play } from "lucide-react"
import { useState } from "react"

const spring = { type: "spring", stiffness: 300, damping: 25 } as const

export function AmbientPlayer() {
  const { activeSound, setActiveSoundId, isPlaying, togglePlay, volume, setVolume, isMuted, toggleMute } = useAmbientAudio()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      className={cn("fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3", "p-2 rounded-3xl border border-white/20 shadow-2xl bg-white/5", isExpanded ? "w-64" : "w-14 h-14")}
      style={{
        background: "var(--plate-bg)",
        boxShadow: "var(--plate-shadow)",
      }}
      transition={spring}
    >
      <div className="flex items-center gap-3 w-full h-10 px-2 overflow-hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn("flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-colors", isPlaying ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
        >
          {isPlaying ? (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Music2 className="w-5 h-5" />
            </motion.div>
          ) : (
            <Music2 className="w-5 h-5" />
          )}
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-grow flex flex-col justify-center min-w-0">
              <span className="text-xs font-bold truncate text-foreground">{activeSound.name}</span>
              <span className="text-[10px] text-muted-foreground truncate">{activeSound.description}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {isExpanded && (
          <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-shrink-0">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="w-full flex flex-col gap-4 mt-2 px-2 pb-2">
            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-grow h-1.5 rounded-full appearance-none bg-primary/20 accent-primary cursor-pointer"
              />
            </div>

            {/* Sound Selection Grid */}
            <div className="grid grid-cols-4 gap-2">
              {AMBIENT_SOUNDS.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => setActiveSoundId(sound.id)}
                  title={sound.name}
                  className={cn(
                    "relative aspect-square rounded-xl flex items-center justify-center text-lg transition-all",
                    activeSound.id === sound.id ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted/50 text-muted-foreground hover:bg-muted",
                  )}
                >
                  {sound.emoji}
                  {sound.isPremium && <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
