"use client"

import * as React from "react"
import { Home, Leaf, User, Coins, Flame } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import { ShoppingBag } from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navMain = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Garden",
    url: "/garden",
    icon: Leaf,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Store",
    url: "/store",
    icon: ShoppingBag,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { coins } = useUser()
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0 bg-forest-dark-teal text-white" {...props}>
      <SidebarHeader className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white shadow-sm backdrop-blur-sm">
            <Leaf className="h-6 w-6" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold text-white tracking-tight">Forest</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">Focus Timer</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navMain.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "h-12 px-4 rounded-2xl transition-all duration-200",
                        "data-[active=true]:bg-white/20 data-[active=true]:text-white! data-[active=true]:hover:bg-white/30",
                        "hover:bg-white/10 text-white/70 hover:text-white",
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-4">
                        <item.icon className={cn("h-5 w-5", isActive ? "text-white!" : "text-white/70")} />
                        <span className="text-base font-semibold">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6 mt-auto gap-8">
        <div className="space-y-4 px-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-white/60 font-bold uppercase tracking-wider text-[10px]">
              <Coins className="h-4 w-4" />
              <span>Coins</span>
            </div>
            <span className="font-bold text-white text-base">{coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-white/60 font-bold uppercase tracking-wider text-[10px]">
              <Flame className="h-4 w-4" />
              <span>Streak</span>
            </div>
            <span className="font-bold text-white text-base">12</span>
          </div>
        </div>
        <Button className="w-full h-12 bg-white text-[#2D5A43] hover:bg-white/90 font-bold rounded-2xl shadow-lg shadow-black/10 transition-all active:scale-[0.98]">Start Session</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
