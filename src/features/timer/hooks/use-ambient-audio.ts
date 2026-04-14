"use client"

import { AMBIENT_SOUNDS } from "@/features/timer/constants/sounds"
import { activeSoundIdAtom, audioVolumeAtom, isAudioMutedAtom, isAudioPlayingAtom } from "@/features/timer/store/audio.atoms"
import { useAtom, useAtomValue } from "jotai"
import { useEffect, useRef } from "react"
import { isTimerActiveAtom } from "@/features/timer/store/timer.atoms"

export function useAmbientAudio() {
  const [activeSoundId, setActiveSoundId] = useAtom(activeSoundIdAtom)
  const [isPlaying, setIsPlaying] = useAtom(isAudioPlayingAtom)
  const [volume, setVolume] = useAtom(audioVolumeAtom)
  const [isMuted, setIsMuted] = useAtom(isAudioMutedAtom)
  const isTimerActive = useAtomValue(isTimerActiveAtom)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize and handle sound changes
  useEffect(() => {
    if (typeof window === "undefined") return

    const sound = AMBIENT_SOUNDS.find((s) => s.id === activeSoundId)
    if (!sound) return

    if (!audioRef.current) {
      audioRef.current = new Audio(sound.url)
      audioRef.current.loop = true
    } else {
      audioRef.current.src = sound.url
    }

    if (isPlaying || isTimerActive) {
      audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err))
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [activeSoundId, isPlaying, isTimerActive])

  // Handle play/pause state
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying || (isTimerActive && !isMuted)) {
      audioRef.current.play().catch((err) => console.log("Play failed:", err))
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isTimerActive, isMuted])

  // Handle volume and mute
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => setIsPlaying((prev) => !prev)
  const toggleMute = () => setIsMuted((prev) => !prev)

  const activeSound = AMBIENT_SOUNDS.find((s) => s.id === activeSoundId) || AMBIENT_SOUNDS[0]

  return {
    activeSound,
    setActiveSoundId,
    isPlaying: isPlaying || isTimerActive,
    togglePlay,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  }
}
