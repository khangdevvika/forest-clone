"use client"

import { Home, Leaf, User, Coins, Flame, ShoppingBag, TreeDeciduous, ListTodo } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent, useSidebar } from "@/components/ui/sidebar"
import React from "react"
import { useTheme } from "@/hooks/use-theme"

// Consistent Animation Tokens
const spring = { type: "spring" as const, stiffness: 280, damping: 22 }
const gentleSpring = { type: "spring" as const, stiffness: 180, damping: 28 }

const navMain = [
  { title: "Home", url: "/", icon: Home },
  { title: "Garden", url: "/garden", icon: Leaf },
  { title: "Tasks", url: "/tasks", icon: ListTodo },
  { title: "Store", url: "/store", icon: ShoppingBag },
  { title: "Profile", url: "/profile", icon: User },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { coins, streak } = useUser()
  const pathname = usePathname()
  const { state } = useSidebar()
  const { theme, setTheme } = useTheme()
  const isExpanded = state === "expanded"

  // Motion values for global refined interactions
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Consistent Glass Style Tokens
  const glassStyle = "bg-white/5 border border-white/10 backdrop-blur-sm"
  const glassActive = "bg-white/10 border border-white/20 backdrop-blur-md"
  const glassMuted = "bg-white/2 border border-white/5 backdrop-blur-xs"

  return (
    <Sidebar className="border-r-0 text-sidebar-foreground bg-sidebar overflow-hidden" collapsible="offcanvas" {...props}>
      {/* Background Zen Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <motion.div initial={false} animate={isExpanded ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }} transition={gentleSpring} className="flex flex-col h-full w-full relative z-10">
        {/* ── Header ────────────────────────────────────────── */}
        <SidebarHeader className={cn("px-6 pt-8 pb-6 transition-all duration-300", !isExpanded && "px-0 items-center")}>
          <div className="flex items-center gap-4 group">
            <motion.div whileHover={{ scale: 1.05 }} className={cn("relative shrink-0 flex h-11 w-11 items-center justify-center rounded-xl", glassStyle)}>
              <TreeDeciduous className="h-5.5 w-5.5 text-primary" strokeWidth={1.25} />
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-xl"
              />
            </motion.div>
            {isExpanded && (
              <div className="flex flex-col gap-0">
                <span className="text-white text-[24px] tracking-tight leading-none font-light" style={{ fontFamily: "var(--font-outfit)" }}>
                  Forest
                </span>
                <span className="text-[8px] opacity-30 font-bold text-white uppercase tracking-[0.4em] ml-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                  Pure Focus
                </span>
              </div>
            )}
          </div>
        </SidebarHeader>

        {/* ── Navigation ───────────────────────────────────── */}
        <SidebarContent className="px-5">
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
                          "relative h-11 px-4 transition-all duration-300 gap-3 outline-none font-[family-name:var(--font-inter)] text-sm font-medium group overflow-hidden border-0 rounded-xl active:scale-[0.98]",
                          isActive ? "text-white" : cn("text-white/40 hover:text-white/80 hover:bg-white/5", glassMuted),
                        )}
                      >
                        <Link href={item.url}>
                          <AnimatePresence>
                            {isActive && <motion.div layoutId="active-nav-pill" className={cn("absolute inset-0 rounded-xl", glassActive)} transition={gentleSpring} />}
                          </AnimatePresence>

                          <div className="relative z-10 flex items-center gap-3 w-full">
                            <item.icon className={cn("h-4.5 w-4.5 transition-all duration-500", isActive ? "text-primary scale-110" : "text-white/30 group-hover:text-white/60")} strokeWidth={1.25} />
                            <span className={cn("tracking-wide", isActive ? "font-semibold" : "")}>{item.title}</span>

                            {isActive && (
                              <motion.div
                                layoutId="nav-indicator"
                                className="absolute -left-5 top-1/2 -translate-y-1/2 h-4 w-1 bg-primary rounded-r-full shadow-[0_0_12px_var(--primary)]"
                                transition={spring}
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

        {/* ── Footer ─────────────────────────────────── */}
        <SidebarFooter className="p-6 mt-auto flex flex-col gap-6">
          {/* Stats Bar */}
          {isExpanded && (
            <div className={cn("flex items-center justify-between px-4 py-3 rounded-2xl", glassStyle)}>
              <div className="flex items-center gap-3 group/stat cursor-default">
                <Coins className="h-4 w-4 text-[#d4af82] opacity-80" strokeWidth={1.25} />
                <span className="text-sm font-light tabular-nums text-white/90" style={{ fontFamily: "var(--font-outfit)" }}>
                  {coins.toLocaleString()}
                </span>
              </div>
              <div className="h-3.5 w-px bg-white/10" />
              <div className="flex items-center gap-3 group/stat cursor-default">
                <Flame className="h-4 w-4 text-primary opacity-80" strokeWidth={1.25} />
                <div className="flex items-baseline gap-0.5">
                  <span className="text-sm font-light tabular-nums text-white/90" style={{ fontFamily: "var(--font-outfit)" }}>
                    {streak}
                  </span>
                  <span className="text-[9px] opacity-20 text-white font-bold uppercase">D</span>
                </div>
              </div>
            </div>
          )}

          {/* Ambience & Actions */}
          <div className="space-y-4">
            {isExpanded && (
              <div className="flex flex-col gap-3 px-1">
                <div className="flex items-center justify-between opacity-30 px-1">
                  <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-white">Ambience</span>
                  <div className="h-px flex-1 mx-3 bg-white/20" />
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                  {[
                    { hex: "#d48c45", name: "Amber", theme: "sunset" as const },
                    { hex: "#38bdf8", name: "Sky", theme: "midnight" as const },
                    { hex: "#d4a5b2", name: "Rose", theme: "rose" as const },
                    { hex: "#7ba87b", name: "Sage", theme: "sage" as const },
                  ].map((mood, i) => {
                    const isActive = theme === mood.theme

                    return (
                      <motion.button
                        key={i}
                        onClick={() => setTheme(mood.theme)}
                        className={cn(
                          "h-3 w-3 rounded-full ring-offset-sidebar ring-offset-2 transition-all duration-300 cursor-pointer",
                          isActive ? "ring-2 ring-white/80 scale-110" : "hover:ring-1 hover:ring-white/20",
                        )}
                        style={{ backgroundColor: mood.hex }}
                        title={mood.name}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </SidebarFooter>
      </motion.div>
    </Sidebar>
  )
}
