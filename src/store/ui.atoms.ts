import { atomWithStorage } from "jotai/utils"

export type Theme = "sage" | "forest" | "sunset" | "midnight" | "rose" | "emerald"

export const themeAtom = atomWithStorage<Theme>("forest-theme", "sage")

/**
 * Controls whether iOS 26 glass effects are active.
 *
 * This atom is the SINGLE source of truth for the glass feature.
 * The value is applied as a `data-glass` attribute on <html> by
 * GlassEffectSyncer (in providers.tsx), which lets CSS handle the
 * fallback via `[data-glass="off"] .plate { ... }` — no conditional
 * logic is needed in any component.
 */
export const glassEnabledAtom = atomWithStorage<boolean>("forest-glass", true)
