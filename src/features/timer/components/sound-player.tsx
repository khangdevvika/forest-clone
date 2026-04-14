"use client"

import { useEffect, useRef } from "react"
import { useUser } from "@/hooks/use-user"
import { AMBIENT_SOUNDS } from "@/features/timer/constants/sounds"

export function SoundPlayer() {
  const { activeSoundId, volume } = useUser()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const sound = AMBIENT_SOUNDS.find((s) => s.id === activeSoundId)

  // Handlers for play and volume
  useEffect(() => {
    if (!audioRef.current || !sound) return

    const audio = audioRef.current
    
    // We only call play() if the audio is paused
    if (audio.paused) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Ignore autoplay blocking errors, but log others as warnings
          if (error.name !== "NotAllowedError" && error.name !== "AbortError") {
            console.warn("Audio playback issue:", error)
          }
        })
      }
    }
  }, [sound, volume])

  // Sync volume separately to avoid re-triggering playback logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  if (!activeSoundId || !sound) {
    return null
  }

  return (
    <audio
      ref={audioRef}
      key={activeSoundId}
      src={sound.url}
      loop
      style={{ display: "none" }}
      preload="auto"
    />
  )
}
