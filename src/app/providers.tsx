"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { SoundPlayer } from "@/features/timer/components/sound-player"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <SoundPlayer />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}
