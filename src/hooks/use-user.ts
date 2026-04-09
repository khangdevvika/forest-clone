import { useAtom, useAtomValue } from "jotai"
import {
  coinsAtom,
  unlockedTreesAtom,
  selectedTreeIdAtom,
  sessionsAtom,
  activeSoundIdAtom,
  volumeAtom,
  streakAtom,
  unlockedMusicAtom,
  unlockedThemesAtom,
  potionsInventoryAtom,
  activePotionIdAtom,
  selectedTagIdAtom,
} from "@/features/timer/store"
import type { Tree, Session } from "@/features/timer/types"
import type { StoreItem } from "@/features/store/types/store"

// ── Hook ───────────────────────────────────────────────────────
export const useUser = () => {
  const [coins, setCoins] = useAtom(coinsAtom)
  const [unlockedTrees, setUnlockedTrees] = useAtom(unlockedTreesAtom)
  const [selectedTreeId, setSelectedTreeId] = useAtom(selectedTreeIdAtom)
  const [selectedTagId, setSelectedTagId] = useAtom(selectedTagIdAtom)
  const [sessions, setSessions] = useAtom(sessionsAtom)
  const [activeSoundId, setActiveSoundId] = useAtom(activeSoundIdAtom)
  const [volume, setVolume] = useAtom(volumeAtom)
  const [unlockedMusic, setUnlockedMusic] = useAtom(unlockedMusicAtom)
  const [unlockedThemes, setUnlockedThemes] = useAtom(unlockedThemesAtom)
  const [potionsInventory, setPotionsInventory] = useAtom(potionsInventoryAtom)
  const [activePotionId, setActivePotionId] = useAtom(activePotionIdAtom)
  const streak = useAtomValue(streakAtom)

  const buyItem = (item: StoreItem) => {
    if (coins < item.price) return false

    switch (item.type) {
      case "tree":
        if (unlockedTrees.includes(item.id)) return false
        setUnlockedTrees((prev) => [...prev, item.id])
        break
      case "music":
        if (unlockedMusic.includes(item.id)) return false
        setUnlockedMusic((prev) => [...prev, item.id])
        break
      case "theme":
        if (unlockedThemes.includes(item.id)) return false
        setUnlockedThemes((prev) => [...prev, item.id])
        break
      case "potion":
        setPotionsInventory((prev) => ({
          ...prev,
          [item.id]: (prev[item.id] || 0) + 1,
        }))
        break
      default:
        return false
    }

    setCoins((prev) => prev - item.price)
    return true
  }

  const usePotion = (potionId: string) => {
    const currentCount = potionsInventory[potionId] || 0
    if (currentCount > 0) {
      setPotionsInventory((prev) => ({
        ...prev,
        [potionId]: Math.max(0, (prev[potionId] || 0) - 1),
      }))
      setActivePotionId(potionId)
      return true
    }
    return false
  }

  const buyTree = (tree: Tree) => {
    return buyItem({ ...tree, type: "tree" })
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
    selectedTagId,
    setSelectedTagId,
    sessions,
    streak,
    activeSoundId,
    setActiveSoundId,
    volume,
    setVolume,
    unlockedMusic,
    unlockedThemes,
    potionsInventory,
    activePotionId,
    setActivePotionId,
    buyItem,
    buyTree,
    sellTree,
    addCoins,
    addSession,
    selectTree,
    usePotion,
  }
}
