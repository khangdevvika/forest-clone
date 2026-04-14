"use client"

import { glassEnabledAtom } from "@/store/ui.atoms"
import { useAtomValue } from "jotai"
import { useEffect } from "react"

/**
 * GlassEffectSyncer
 *
 * Bridges the `glassEnabledAtom` state to a `data-glass` attribute on
 * `<html>`. This keeps the DOM in sync without any component needing to
 * know about the glass setting — CSS selectors handle the rest:
 *
 *   [data-glass="off"] .plate  { ... }   ← simple solid fallback
 *   [data-glass="off"] .eco-island { ... }
 *   etc.
 *
 * Renders nothing. Place it inside <Providers> so it runs early.
 */
export function GlassEffectSyncer() {
  const glassEnabled = useAtomValue(glassEnabledAtom)

  useEffect(() => {
    const root = document.documentElement
    if (glassEnabled) {
      root.removeAttribute("data-glass")
    } else {
      root.setAttribute("data-glass", "off")
    }
  }, [glassEnabled])

  return null
}
