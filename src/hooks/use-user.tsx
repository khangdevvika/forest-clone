import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Tree } from "@/features/timer/constants/trees"

// Atoms with persistence
export const coinsAtom = atomWithStorage<number>("forest-coins", 3119)
export const unlockedTreesAtom = atomWithStorage<string[]>("forest-trees", ["balloon-flower", "golden-trumpet"])
export const selectedTreeIdAtom = atomWithStorage<string>("forest-selected-tree", "balloon-flower")

// Hook to maintain the same API as before
export const useUser = () => {
  const [coins, setCoins] = useAtom(coinsAtom)
  const [unlockedTrees, setUnlockedTrees] = useAtom(unlockedTreesAtom)
  const [selectedTreeId, setSelectedTreeId] = useAtom(selectedTreeIdAtom)

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

  return {
    coins,
    unlockedTrees,
    selectedTreeId,
    buyTree,
    sellTree,
    addCoins,
    selectTree,
  }
}
