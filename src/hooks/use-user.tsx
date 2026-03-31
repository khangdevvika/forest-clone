import { useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { atom } from "jotai"
import { Tree } from "@/features/timer/constants/trees"
import { Session } from "@/features/timer/types/session"
import { differenceInCalendarDays, parseISO, startOfDay } from "date-fns"

// ── Atoms with persistence ─────────────────────────────────────
export const coinsAtom = atomWithStorage<number>("forest-coins", 3119)
export const unlockedTreesAtom = atomWithStorage<string[]>("forest-trees", ["balloon-flower", "golden-trumpet"])
export const selectedTreeIdAtom = atomWithStorage<string>("forest-selected-tree", "balloon-flower")
export const sessionsAtom = atomWithStorage<Session[]>("forest-sessions", [])

// ── Derived: current streak (consecutive days with >= 1 session, going backward from today) ──
export const streakAtom = atom((get) => {
  const sessions = get(sessionsAtom)
  if (sessions.length === 0) return 0

  // Collect unique day strings (yyyy-MM-dd) that have a session
  const daySet = new Set(
    sessions.map((s) => startOfDay(parseISO(s.completedAt)).toISOString()),
  )
  const sortedDays = Array.from(daySet)
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime()) // newest first

  const today = startOfDay(new Date())
  // Streak must include today or yesterday (otherwise it's broken)
  const diff0 = differenceInCalendarDays(today, sortedDays[0])
  if (diff0 > 1) return 0

  let streak = 1
  for (let i = 1; i < sortedDays.length; i++) {
    const diff = differenceInCalendarDays(sortedDays[i - 1], sortedDays[i])
    if (diff === 1) {
      streak++
    } else {
      break
    }
  }
  return streak
})

// ── Hook ───────────────────────────────────────────────────────
export const useUser = () => {
  const [coins, setCoins] = useAtom(coinsAtom)
  const [unlockedTrees, setUnlockedTrees] = useAtom(unlockedTreesAtom)
  const [selectedTreeId, setSelectedTreeId] = useAtom(selectedTreeIdAtom)
  const [sessions, setSessions] = useAtom(sessionsAtom)
  const streak = useAtomValue(streakAtom)

  const buyTree = (tree: Tree) => {
    if (coins >= tree.price && !unlockedTrees.includes(tree.id)) {
      setCoins((prev) => prev - tree.price)
      setUnlockedTrees((prev) => [...prev, tree.id])
      return true
    }
    return false
  }

  const sellTree = (tree: Tree) => {
    if (unlockedTrees.includes(tree.id) && tree.id !== "balloon-flower") {
      setCoins((prev) => prev + Math.floor(tree.price * 0.5))
      setUnlockedTrees((prev) => prev.filter((id) => id !== tree.id))
      if (selectedTreeId === tree.id) {
        setSelectedTreeId("balloon-flower")
      }
    }
  }

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount)
  }

  const selectTree = (id: string) => {
    if (unlockedTrees.includes(id)) {
      setSelectedTreeId(id)
    }
  }

  const addSession = (session: Session) => {
    setSessions((prev) => [session, ...prev])
  }

  return {
    coins,
    unlockedTrees,
    selectedTreeId,
    sessions,
    streak,
    buyTree,
    sellTree,
    addCoins,
    addSession,
    selectTree,
  }
}
