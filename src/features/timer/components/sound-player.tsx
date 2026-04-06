"use client"

import { useEffect, useRef } from "react"
import { useUser } from "@/hooks/use-user"
import { AMBIENT_SOUNDS } from "@/features/timer/constants/sounds"

export function SoundPlayer() {
  const { activeSoundId, volume } = useUser()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const sound = AMBIENT_SOUNDS.find((s) => s.id === activeSoundId)

    if (sound) {
      audio.src = sound.url
      audio.volume = volume
      audio.loop = true

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Playback failed:", error)
          // Most browsers block auto-play without user interaction
        })
      }
    } else {
      audio.pause()
      audio.src = ""
    }
  }, [activeSoundId, volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return <audio ref={audioRef} style={{ display: "none" }} />
}
