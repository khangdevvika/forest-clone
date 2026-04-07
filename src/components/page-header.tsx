"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, children, className }: PageHeaderProps) {
  return (
    <header className={cn("sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border shadow-sm", className)}>
      <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger 
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted border border-border transition-all duration-300 hover:scale-105 active:scale-95 text-foreground"
          />
          
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-base font-bold text-foreground leading-none"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {children}
        </div>
      </div>
    </header>
  )
}
