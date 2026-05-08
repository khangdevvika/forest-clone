export interface NurseryPlant {
  id: string
  treeId: string
  progress: number // 0 to 100
  plantedAt: string
  slotIndex: number
}

export interface GardeningInventory {
  essence: number
  water: number
  fertilizer: number
}

export interface LoreEntry {
  treeId: string
  unlockedLevel: 1 | 2 | 3
  timesGrown: number
}
