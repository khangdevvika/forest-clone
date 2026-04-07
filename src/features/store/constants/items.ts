import type { StoreItem } from "../types/store"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { AMBIENT_SOUNDS } from "@/features/timer/constants/sounds"

export const MUSIC_ITEMS: StoreItem[] = AMBIENT_SOUNDS.map((s) => ({
  id: s.id,
  name: s.name,
  description: s.description || "",
  price: s.id === "white-noise" || s.id === "ocean" || s.id === "fireplace" ? 800 : 0,
  type: "music",
  emoji: s.emoji,
}))

export const THEME_ITEMS: StoreItem[] = [
  { id: "sage", name: "Sage", description: "Classic calming sage green.", price: 0, type: "theme" },
  { id: "forest", name: "Forest", description: "Deep dark moss green.", price: 0, type: "theme" },
  { id: "sunset", name: "Sunset", description: "Warm orange and golden tones.", price: 1500, type: "theme" },
  { id: "midnight", name: "Midnight", description: "Deep blue and cosmic purple.", price: 1500, type: "theme" },
  { id: "rose", name: "Rose", description: "Soft pink and blush tones.", price: 1500, type: "theme" },
  { id: "emerald", name: "Emerald", description: "Vivid jewel-toned green.", price: 0, type: "theme" },
]

export const POTION_ITEMS: StoreItem[] = [
  {
    id: "potion-x2",
    name: "Double Growth Potion",
    description: "Earn 2x coins for your next focus session.",
    price: 500,
    type: "potion",
    multiplier: 2,
    emoji: "🧪",
  },
  {
    id: "potion-x3",
    name: "Triple Growth Potion",
    description: "Earn 3x coins for your next focus session.",
    price: 1200,
    type: "potion",
    multiplier: 3,
    emoji: "🧪",
  },
]

export const ALL_STORE_ITEMS: StoreItem[] = [...STORE_TREES.map((t) => ({ ...t, type: "tree" as const })), ...MUSIC_ITEMS, ...THEME_ITEMS, ...POTION_ITEMS]
