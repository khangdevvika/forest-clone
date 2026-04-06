import { atomWithStorage } from "jotai/utils"

export type Theme = "sage" | "forest" | "sunset" | "midnight" | "rose" | "emerald"

export const themeAtom = atomWithStorage<Theme>("forest-theme", "sage")
