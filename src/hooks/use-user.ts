import { useAtom, useAtomValue } from "jotai"
import { coinsAtom, unlockedTreesAtom, selectedTreeIdAtom, sessionsAtom, activeSoundIdAtom, volumeAtom, streakAtom } from "@/features/timer/store"
import type { Tree, Session } from "@/features/timer/types"


// ── Hook ────────────────────────────────────────────────────────
export const useUser = () => {
  const [coins, setCoins] = useAtom(coinsAtom)
  const [unlockedTrees, setUnlockedTrees] = useAtom(unlockedTreesAtom)
  const [selectedTreeId, setSelectedTreeId] = useAtom(selectedTreeIdAtom)
  const [sessions, setSessions] = useAtom(sessionsAtom)
  const [activeSoundId, setActiveSoundId] = useAtom(activeSoundIdAtom)
  const [volume, setVolume] = useAtom(volumeAtom)
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
    activeSoundId,
    setActiveSoundId,
    volume,
    setVolume,
    buyTree,
    sellTree,
    addCoins,
    addSession,
    selectTree,
  }
}
