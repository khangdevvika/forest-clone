"use client"

import { Home, Leaf, User, Coins, Flame, ShoppingBag, TreeDeciduous } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"

const spring = { type: "spring" as const, stiffness: 280, damping: 22 }

const navMain = [
  { title: "Home", url: "/", icon: Home },
  { title: "Garden", url: "/garden", icon: Leaf },
  { title: "Store", url: "/store", icon: ShoppingBag },
  { title: "Profile", url: "/profile", icon: User },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { coins, streak } = useUser()
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0 text-white" style={{ background: "var(--sidebar)" }} {...props}>
      {/* ── Brand ────────────────────────────────────────── */}
      <SidebarHeader className="px-5 py-7">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <TreeDeciduous className="h-5 w-5 text-primary/70" strokeWidth={1.25} />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xl tracking-tight leading-none" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              Forest
            </span>
            <span className="text-[9px] uppercase tracking-widest mt-1.5 opacity-30 font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Focus Timer
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* ── Navigation ───────────────────────────────────── */}
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navMain.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn("relative h-10 px-3.5 rounded-lg transition-colors duration-200 gap-3.5 outline-none", "font-sans text-[14px] font-medium group")}
                      style={{
                        color: isActive ? "#ffffff" : "rgba(232,237,230,0.4)",
                      }}
                    >
                      <Link href={item.url}>
                        {/* Subtle Active Background */}
                        <AnimatePresence>
                          {isActive && <motion.div layoutId="active-pill" className="absolute inset-0 rounded-lg z-0" style={{ background: "rgba(255,255,255,0.06)" }} transition={spring} />}
                        </AnimatePresence>

                        <item.icon className={cn("h-4.5 w-4.5 shrink-0 z-10 transition-colors", isActive ? "text-primary" : "text-white/20 group-hover:text-white/40")} strokeWidth={1.25} />

                        <span className="relative z-10">{item.title}</span>
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
      <SidebarFooter className="p-4 mt-auto">
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex flex-col gap-3.5 p-4 rounded-xl border border-white/5 bg-white/2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 opacity-30">
                <Coins className="h-3 w-3" strokeWidth={1.25} />
                <span className="text-[9px] uppercase tracking-widest font-bold">Coins</span>
              </div>
              <span className="text-sm font-semibold tabular-nums text-primary/80">{coins.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 opacity-30">
                <Flame className="h-3 w-3" strokeWidth={1.25} />
                <span className="text-[9px] uppercase tracking-widest font-bold">Streak</span>
              </div>
              <span className="text-sm font-semibold tabular-nums text-white/80">{streak}</span>
            </div>
          </div>

          {/* Theme & CTA */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] uppercase tracking-widest font-bold opacity-20">Appearance</span>
            <ThemeToggle variant="sidebar" />
          </div>

          <Link href="/" className="block">
            <button
              className="w-full h-11 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Start Session
            </button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
