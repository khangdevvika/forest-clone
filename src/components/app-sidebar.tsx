"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useTheme } from "@/hooks/use-theme"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { GlassToggle } from "@/components/glass-toggle"
import { AnimatePresence, motion } from "framer-motion"
import { Coins, Flame, Home, Leaf, ListTodo, ShoppingBag, TreeDeciduous, Trophy, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

// iOS 26: Weighted springs
const spring = { type: "spring" as const, stiffness: 280, damping: 22 }
const gentleSpring = { type: "spring" as const, stiffness: 180, damping: 28 }

const navMain = [
  { title: "Home", url: "/", icon: Home },
  { title: "Garden", url: "/garden", icon: Leaf },
  { title: "Tasks", url: "/tasks", icon: ListTodo },
  { title: "Achievements", url: "/achievements", icon: Trophy },
  { title: "Store", url: "/store", icon: ShoppingBag },
  { title: "Profile", url: "/profile", icon: User },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { coins, streak } = useUser()
  const pathname = usePathname()
  const { state } = useSidebar()
  const { theme, setTheme } = useTheme()
  const isExpanded = state === "expanded"

  return (
    <Sidebar className="border-r-0 text-sidebar-foreground bg-sidebar overflow-hidden" collapsible="offcanvas" {...props}>
      {/* iOS 26: Multi-layer ambient depth in sidebar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top aura */}
        <div
          className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(123,168,123,0.18) 0%, transparent 70%)", filter: "blur(50px)" }}
        />
        {/* Bottom accent */}
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,130,0.10) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        {/* iOS 26: Rim light on right edge */}
        <div className="absolute right-0 inset-y-0 w-px" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)" }} />
      </div>

      <motion.div initial={false} animate={isExpanded ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }} transition={gentleSpring} className="flex flex-col h-full w-full relative z-10">
        {/* ── Header ───────────────────────────── */}
        <SidebarHeader className={cn("px-6 pt-8 pb-6 transition-all duration-300", !isExpanded && "px-0 items-center")}>
          <div className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              className="relative shrink-0 flex h-11 w-11 items-center justify-center"
              style={{
                borderRadius: "35%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
            >
              <TreeDeciduous className="h-5 w-5 text-primary" strokeWidth={1.25} />
              {/* Breathing glow */}
              <motion.div
                animate={{ opacity: [0.08, 0.25, 0.08] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute inset-0 rounded-[inherit] bg-linear-to-tr from-primary/25 to-transparent"
              />
            </motion.div>

            {isExpanded && (
              <div className="flex flex-col gap-0">
                <span className="text-white text-[24px] tracking-tight leading-none font-light" style={{ fontFamily: "var(--font-outfit)" }}>
                  Forest
                </span>
                <span className="text-[8px] opacity-25 font-bold text-white uppercase tracking-[0.4em] ml-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                  Pure Focus
                </span>
              </div>
            )}
          </div>
        </SidebarHeader>

        {/* ── Navigation ──────────────────────── */}
        <SidebarContent className="px-4">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 relative">
                {navMain.map((item) => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "relative h-11 px-4 transition-all duration-300 gap-3 outline-none font-medium group overflow-hidden border-0 rounded-2xl",
                          isActive ? "text-white" : "text-white/35 hover:text-white/75",
                        )}
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
                      >
                        <Link href={item.url}>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                layoutId="active-nav-pill"
                                className="absolute inset-0 rounded-2xl"
                                transition={gentleSpring}
                                style={{
                                  background: "rgba(255,255,255,0.10)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.15)",
                                }}
                              />
                            )}
                          </AnimatePresence>

                          {/* Hover tint */}
                          <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(255,255,255,0.04)" }} />

                          <div className="relative z-10 flex items-center gap-3 w-full">
                            <item.icon className={cn("h-4 w-4 transition-all duration-500", isActive ? "text-primary brightness-125" : "text-white/25 group-hover:text-white/55")} strokeWidth={1.25} />
                            <span className={cn("tracking-wide", isActive ? "font-semibold" : "")}>{item.title}</span>

                            {/* iOS 26: Active indicator - glowing dot */}
                            {isActive && (
                              <motion.div
                                layoutId="nav-indicator"
                                className="absolute -left-5 top-1/2 -translate-y-1/2 h-3.5 w-1 rounded-r-full"
                                transition={spring}
                                style={{
                                  background: "var(--primary)",
                                  boxShadow: "0 0 8px var(--primary), 0 0 16px var(--aura-primary, rgba(123,168,123,0.4))",
                                }}
                              />
                            )}
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* ── Footer ──────────────────────────── */}
        <SidebarFooter className="p-6 mt-auto flex flex-col gap-5">
          {/* iOS 26: Stats plate */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={gentleSpring}
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3 cursor-default">
                <Coins className="h-4 w-4 text-[#d4af82] opacity-80" strokeWidth={1.25} />
                <span className="text-sm font-light tabular-nums text-white/90" style={{ fontFamily: "var(--font-outfit)" }}>
                  {coins.toLocaleString()}
                </span>
              </div>
              <div className="h-3.5 w-px bg-white/10" />
              <div className="flex items-center gap-3 cursor-default">
                <Flame className="h-4 w-4 text-primary opacity-80" strokeWidth={1.25} />
                <div className="flex items-baseline gap-0.5">
                  <span className="text-sm font-light tabular-nums text-white/90" style={{ fontFamily: "var(--font-outfit)" }}>
                    {streak}
                  </span>
                  <span className="text-[9px] opacity-20 text-white font-bold uppercase">D</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Ambience / Mood switcher */}
          <div className="space-y-4">
            {isExpanded && (
              <div className="flex flex-col gap-3 px-1">
                <div className="flex items-center justify-between opacity-25 px-1">
                  <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-white">Ambience</span>
                  <div className="h-px flex-1 mx-3 bg-white/20" />
                </div>

                {/* iOS 26: Mood dots inside a plate */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {[
                    { hex: "#d48c45", name: "Amber", theme: "sunset" as const },
                    { hex: "#38bdf8", name: "Sky", theme: "midnight" as const },
                    { hex: "#d4a5b2", name: "Rose", theme: "rose" as const },
                    { hex: "#7ba87b", name: "Sage", theme: "sage" as const },
                  ].map((mood, i) => {
                    const isActiveTheme = theme === mood.theme
                    return (
                      <motion.button
                        key={i}
                        onClick={() => setTheme(mood.theme)}
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                        transition={spring}
                        className={cn("h-3.5 w-3.5 rounded-full ring-offset-2 cursor-pointer", isActiveTheme ? "ring-2 ring-white/80 scale-110" : "hover:ring-1 hover:ring-white/30")}
                        style={{
                          backgroundColor: mood.hex,
                          boxShadow: isActiveTheme ? `0 0 8px ${mood.hex}80` : "none",
                        }}
                        title={mood.name}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Glass effects toggle ──────────────────── */}
          {isExpanded && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={gentleSpring} className="space-y-3 px-1 mt-2">
              <div className="flex  gap-2 flex-col justify-between">
                <div className="flex items-center gap-2 opacity-25">
                  <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-white whitespace-nowrap">Glass FX</p>
                </div>
                <GlassToggle variant="full" className="text-white/70" />
              </div>
            </motion.div>
          )}
        </SidebarFooter>
      </motion.div>
    </Sidebar>
  )
}
