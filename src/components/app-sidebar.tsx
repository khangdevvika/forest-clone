"use client"

import * as React from "react"
import { Home, Leaf, User, Coins, Flame, ShoppingBag, TreePine, TreeDeciduous } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"

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
    <Sidebar className="border-r-0 bg-[#164f33] text-white" {...props}>
      {/* ── Brand ── */}
      <SidebarHeader className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
            <TreeDeciduous className="h-4 w-4 text-green-300" />
          </div>
          <div>
            <span className="text-white font-semibold text-base leading-none">Forest</span>
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-medium mt-0.5">Focus Timer</div>
          </div>
        </div>
      </SidebarHeader>

      {/* ── Navigation ── */}
      <SidebarContent className="px-3 py-4">
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
                      className={cn("h-10 px-3 rounded-lg transition-all duration-150 gap-3", isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5")}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-green-300" : "text-white/40")} />
                        <span className="text-sm font-medium">{item.title}</span>
                        {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-green-400" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer stats ── */}
      <SidebarFooter className="px-5 py-5 border-t border-white/8 space-y-4">
        {/* Stats */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/40">
              <Coins className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wider">Coins</span>
            </div>
            <span className="text-sm font-semibold text-white tabular-nums">{coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/40">
              <Flame className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wider">Streak</span>
            </div>
            <span className="text-sm font-semibold text-white tabular-nums">{streak}</span>
          </div>
        </div>

        {/* CTA */}
        <Link href="/">
          <button className="w-full h-10 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm font-semibold transition-all duration-150 cursor-pointer">
            Start Session
          </button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
