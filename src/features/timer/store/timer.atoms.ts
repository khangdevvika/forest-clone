import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { differenceInCalendarDays, parseISO, startOfDay } from "date-fns"
import type { Session } from "@/features/timer/types/session"

// ── Persistent atoms ────────────────────────────────────────────
export const coinsAtom = atomWithStorage<number>("forest-coins", 3119)
export const unlockedTreesAtom = atomWithStorage<string[]>("forest-trees", ["balloon-flower", "golden-trumpet"])
export const selectedTreeIdAtom = atomWithStorage<string>("forest-selected-tree", "balloon-flower")
export const sessionsAtom = atomWithStorage<Session[]>("forest-sessions", [])
export const activeSoundIdAtom = atomWithStorage<string | null>("forest-active-sound", null)
export const volumeAtom = atomWithStorage<number>("forest-volume", 0.5)

export const unlockedMusicAtom = atomWithStorage<string[]>("forest-music", ["rain", "forest", "cafe"])
export const unlockedThemesAtom = atomWithStorage<string[]>("forest-unlocked-themes", ["sage", "forest", "emerald"])
export const potionsInventoryAtom = atomWithStorage<Record<string, number>>("forest-potions", { "potion-x2": 0, "potion-x3": 0 })
export const activePotionIdAtom = atomWithStorage<string | null>("forest-active-potion", null)

// ── Derived: streak ─────────────────────────────────────────────
export const streakAtom = atom((get) => {
  const sessions = get(sessionsAtom)
  if (sessions.length === 0) return 0

  const daySet = new Set(sessions.map((s) => startOfDay(parseISO(s.completedAt)).toISOString()))
  const sortedDays = Array.from(daySet)
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime())

  const today = startOfDay(new Date())
  const diff0 = differenceInCalendarDays(today, sortedDays[0])
  if (diff0 > 1) return 0

  let streak = 1
  for (let i = 1; i < sortedDays.length; i++) {
    const diff = differenceInCalendarDays(sortedDays[i - 1], sortedDays[i])
    if (diff === 1) streak++
    else break
  }
  return streak
})
