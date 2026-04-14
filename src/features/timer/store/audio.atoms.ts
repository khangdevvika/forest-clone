import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const isAudioMutedAtom = atomWithStorage("forest_audio_muted", false)
export const audioVolumeAtom = atomWithStorage("forest_audio_volume", 0.5)
export const activeSoundIdAtom = atomWithStorage<string | null>("forest_active_sound_id", "rain")
export const isAudioPlayingAtom = atom(false)
