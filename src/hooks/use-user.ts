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
  gardeningInventoryAtom,
  nurseryPlantsAtom,
  seedsInventoryAtom,
  loreLibraryAtom,
  nurserySlotsCountAtom,
  customTagsAtom,
  allTagsAtom,
} from "@/features/timer/store"
import { STORE_TREES } from "@/features/timer/constants/trees"
import type { Tree, Session, CustomTag } from "@/features/timer/types"
import type { StoreItem } from "@/features/store/types/store"
import { DEFAULT_TAG_ID } from "@/features/timer/constants/tags"

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
  const [inventory, setInventory] = useAtom(gardeningInventoryAtom)
  const [nurseryPlants, setNurseryPlants] = useAtom(nurseryPlantsAtom)
  const [seeds, setSeeds] = useAtom(seedsInventoryAtom)
  const [lore, setLore] = useAtom(loreLibraryAtom)
  const [customTags, setCustomTags] = useAtom(customTagsAtom)
  const allTags = useAtomValue(allTagsAtom)
  const nurserySlotsCount = useAtomValue(nurserySlotsCountAtom)
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
      case "gardening":
        setInventory((prev) => ({
          ...prev,
          [item.id]: (prev[item.id as keyof typeof prev] || 0) + 1,
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
    
    // Update Lore on harvest/completion
    setLore(prev => {
      const existing = prev.find(l => l.treeId === session.treeId)
      if (existing) {
        const newTimes = existing.timesGrown + 1
        let newLevel = existing.unlockedLevel
        if (newTimes >= 10) newLevel = 3
        else if (newTimes >= 5) newLevel = 2
        
        return prev.map(l => l.treeId === session.treeId ? { ...l, timesGrown: newTimes, unlockedLevel: newLevel as 1|2|3 } : l)
      }
      return [...prev, { treeId: session.treeId, unlockedLevel: 1, timesGrown: 1 }]
    })
  }

  // ── Gardening Functions ───────────────────────────────────────
  const addGardeningResources = (essence: number, water = 0, fertilizer = 0) => {
    setInventory(prev => ({
      essence: prev.essence + essence,
      water: prev.water + water,
      fertilizer: prev.fertilizer + fertilizer
    }))
  }

  const addSeed = (treeId: string) => {
    setSeeds(prev => [...prev, treeId])
  }

  const plantSeed = (treeId: string, slotIndex: number) => {
    if (nurseryPlants.some(p => p.slotIndex === slotIndex)) return false
    if (!seeds.includes(treeId)) return false

    const newPlant = {
      id: crypto.randomUUID(),
      treeId,
      progress: 0,
      plantedAt: new Date().toISOString(),
      slotIndex
    }

    setNurseryPlants(prev => [...prev, newPlant])
    setSeeds(prev => {
      const index = prev.indexOf(treeId)
      const next = [...prev]
      next.splice(index, 1)
      return next
    })
    return true
  }

  const nurturePlant = (plantId: string, type: 'essence' | 'water' | 'fertilizer', amount: number) => {
    const plant = nurseryPlants.find(p => p.id === plantId)
    if (!plant) return false

    // Progress calculation logic
    let progressGain = 0
    if (type === 'essence') {
      if (inventory.essence < amount) return false
      progressGain = amount * 0.5 // 2 essence = 1%
      setInventory(prev => ({ ...prev, essence: prev.essence - amount }))
    } else if (type === 'water') {
      if (inventory.water < 1) return false
      progressGain = 15 // 1 water = 15%
      setInventory(prev => ({ ...prev, water: prev.water - 1 }))
    } else if (type === 'fertilizer') {
      if (inventory.fertilizer < 1) return false
      progressGain = 40 // 1 fertilizer = 40%
      setInventory(prev => ({ ...prev, fertilizer: prev.fertilizer - 1 }))
    }

    setNurseryPlants(prev => prev.map(p => 
      p.id === plantId ? { ...p, progress: Math.min(100, p.progress + progressGain) } : p
    ))
    return true
  }

  const harvestPlant = (plantId: string) => {
    const plant = nurseryPlants.find(p => p.id === plantId)
    if (!plant || plant.progress < 100) return false

    // Finalize as session
    const tree = STORE_TREES.find(t => t.id === plant.treeId)
    
    const session: Session = {
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
      durationMinutes: 30, // Default duration for harvested tree stats
      treeId: plant.treeId,
      treeName: tree?.name || "Unknown Tree",
      treeImage: tree?.image || "",
      coinsEarned: 0, // Coins already earned during focus
      mode: "timer",
      tagId: selectedTagId
    }

    addSession(session)
    setNurseryPlants(prev => prev.filter(p => p.id !== plantId))
    return true
  }

  const addCustomTag = (tag: Omit<CustomTag, 'id'>) => {
    const newTag: CustomTag = {
      ...tag,
      id: crypto.randomUUID()
    }
    setCustomTags(prev => [...(prev as CustomTag[]), newTag])
    return newTag
  }

  const removeCustomTag = (tagId: string) => {
    setCustomTags(prev => (prev as CustomTag[]).filter(t => (t as CustomTag).id !== tagId))
    if (selectedTagId === tagId) {
      setSelectedTagId(DEFAULT_TAG_ID)
    }
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
    inventory,
    nurseryPlants,
    seeds,
    lore,
    nurserySlotsCount,
    addGardeningResources,
    addSeed,
    plantSeed,
    nurturePlant,
    harvestPlant,
    customTags,
    allTags,
    addCustomTag,
    removeCustomTag
  }
}
