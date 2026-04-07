export type StoreItemType = "tree" | "music" | "theme" | "potion"

export interface StoreItem {
  id: string
  name: string
  description: string
  price: number
  type: StoreItemType
  image?: string
  emoji?: string
  multiplier?: number
}

export interface PotionInventory {
  x2: number
  x3: number
}
