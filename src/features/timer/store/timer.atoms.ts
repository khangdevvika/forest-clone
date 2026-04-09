import { DEFAULT_TAG_ID } from "@/features/timer/constants/tags"
import { TimerMode } from "@/features/timer/enum/timer"
import type { Session } from "@/features/timer/types/session"
import { differenceInCalendarDays, parseISO, startOfDay } from "date-fns"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// ── Persistent atoms ────────────────────────────────────────────
export const coinsAtom = atomWithStorage<number>("forest-coins", 3119)
export const unlockedTreesAtom = atomWithStorage<string[]>("forest-trees", ["balloon-flower", "golden-trumpet"])
export const selectedTreeIdAtom = atomWithStorage<string>("forest-selected-tree", "balloon-flower")
export const selectedTagIdAtom = atomWithStorage<string>("forest-selected-tag", DEFAULT_TAG_ID)
export const sessionsAtom = atomWithStorage<Session[]>("forest-sessions", [
  {
    id: "1",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    durationMinutes: 45,
    treeId: "balloon-flower",
    treeName: "Balloon Flower",
    treeImage: "/trees/balloon-flower.png",
    coinsEarned: 9,
    mode: "timer",
    tagId: "work",
  },
  {
    id: "2",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    durationMinutes: 60,
    treeId: "golden-trumpet",
    treeName: "Golden Trumpet",
    treeImage: "/trees/golden-trumpet.png",
    coinsEarned: 12,
    mode: "timer",
    tagId: "study",
  },
  {
    id: "3",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    durationMinutes: 30,
    treeId: "balloon-flower",
    treeName: "Balloon Flower",
    treeImage: "/trees/balloon-flower.png",
    coinsEarned: 6,
    mode: "timer",
    tagId: "reading",
  },
  {
    id: "4",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    durationMinutes: 90,
    treeId: "golden-trumpet",
    treeName: "Golden Trumpet",
    treeImage: "/trees/golden-trumpet.png",
    coinsEarned: 18,
    mode: "timer",
    tagId: "work",
  },
  {
    id: "5",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    durationMinutes: 45,
    treeId: "balloon-flower",
    treeName: "Balloon Flower",
    treeImage: "/trees/balloon-flower.png",
    coinsEarned: 9,
    mode: "timer",
    tagId: "exercise",
  },
  {
    id: "6",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    durationMinutes: 120,
    treeId: "golden-trumpet",
    treeName: "Golden Trumpet",
    treeImage: "/trees/golden-trumpet.png",
    coinsEarned: 24,
    mode: "timer",
    tagId: "study",
  },
  {
    id: "7",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    durationMinutes: 25,
    treeId: "balloon-flower",
    treeName: "Balloon Flower",
    treeImage: "/trees/balloon-flower.png",
    coinsEarned: 5,
    mode: "timer",
    tagId: "meditation",
  },
])
export const activeSoundIdAtom = atomWithStorage<string | null>("forest-active-sound", null)
export const volumeAtom = atomWithStorage<number>("forest-volume", 0.5)

export const unlockedMusicAtom = atomWithStorage<string[]>("forest-music", ["rain", "forest", "cafe"])
export const unlockedThemesAtom = atomWithStorage<string[]>("forest-unlocked-themes", ["sage", "forest", "emerald"])
export const potionsInventoryAtom = atomWithStorage<Record<string, number>>("forest-potions", { "potion-x2": 0, "potion-x3": 0 })
export const activePotionIdAtom = atomWithStorage<string | null>("forest-active-potion", null)

// ── Timer state atoms (Global) ──────────────────────────────────
export const timerModeAtom = atom<TimerMode>(TimerMode.TIMER)
export const timerMinutesAtom = atom<number>(30)
export const isTimerActiveAtom = atom<boolean>(false)
export const timerElapsedSecondsAtom = atom<number>(0)

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
