"use client"

import { useAtom } from "jotai"
import { themeAtom, type Theme } from "@/store/ui.atoms"
import { useEffect } from "react"

export const THEMES: { id: Theme; color: string; label: string }[] = [
  { id: "sage", color: "#6b8f6b", label: "Sage" },
  { id: "forest", color: "#2a3d27", label: "Forest" },
  { id: "sunset", color: "#d48c45", label: "Sunset" },
  { id: "midnight", color: "#38bdf8", label: "Midnight" },
  { id: "rose", color: "#d4a5b2", label: "Rose" },
  { id: "emerald", color: "#10b981", label: "Emerald" },
]

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom)

  useEffect(() => {
    // Apply theme class to <html>
    const root = window.document.documentElement
    // Remove old themes
    THEMES.forEach((t) => root.classList.remove(t.id))
    root.classList.remove("dark") // cleanup old
    // Add new theme
    root.classList.add(theme)
  }, [theme])

  return {
    theme,
    setTheme,
    isDark: theme === "forest" || theme === "midnight" || theme === "emerald",
  }
}
