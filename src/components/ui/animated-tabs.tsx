"use client"

import { motion, Transition } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

const tabsContainerVariants = cva("flex", {
  variants: {
    variant: {
      default: "bg-muted/30 p-1 rounded-full border border-border/40",
      card: "gap-3 w-fit bg-white/40 border border-white/60 rounded-full p-1.5 items-center flex shadow-sm",
      glass: "relative items-center p-1 rounded-full self-center mx-auto bg-white/10 dark:bg-black/20 border-solid border border-white/10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const tabVariants = cva("relative transition-all duration-300 outline-none z-0", {
  variants: {
    variant: {
      default: "px-5 py-2 text-xs font-medium rounded-full",
      card: "px-10 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.25em]",
      glass: "group flex items-center h-10 px-5 rounded-full text-[14px] font-medium font-sans isolation-auto select-none",
    },
    active: {
      true: "",
      false: "cursor-pointer",
    },
  },
  compoundVariants: [
    { variant: "default", active: true, className: "text-primary-foreground" },
    { variant: "default", active: false, className: "text-muted-foreground/70 hover:text-foreground" },
    { variant: "card", active: true, className: "text-[--sage-700]" },
    { variant: "card", active: false, className: "text-[--sage-600]/40 hover:text-[--sage-600]/80" },
    { variant: "glass", active: true, className: "text-[--timer-text]" },
    { variant: "glass", active: false, className: "text-[--timer-text] opacity-40 hover:opacity-60" },
  ],
  defaultVariants: {
    variant: "default",
    active: false,
  },
})

const indicatorVariants = cva("absolute inset-0 z-[-1]", {
  variants: {
    variant: {
      default: "bg-primary rounded-full shadow-sm",
      card: "bg-white rounded-full shadow-md border border-white",
      glass: "bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:bg-white/10 rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface TabOption {
  id: string
  label?: ReactNode
  icon?: ReactNode
}

export interface AnimatedTabsProps extends VariantProps<typeof tabsContainerVariants> {
  tabs: readonly string[] | string[] | readonly TabOption[] | TabOption[]
  activeTab: string
  onChange: (id: string) => void
  layoutId?: string
  className?: string
  transition?: Transition
}

export function AnimatedTabs({ tabs, activeTab, onChange, layoutId = "animated-tabs", variant = "default", className, transition }: AnimatedTabsProps) {
  const normalizedTabs = tabs.map((tab) => {
    if (typeof tab === "string") {
      return { id: tab, label: tab }
    }
    return tab
  })

  const activeTransition = transition || (variant === "card" ? { type: "spring", bounce: 0.15, duration: 0.5 } : { type: "spring", stiffness: 300, damping: 30 })

  return (
    <div className={cn(tabsContainerVariants({ variant, className }))}>
      {normalizedTabs.map((tab) => {
        const isActive = activeTab === tab.id

        return (
          <button key={tab.id} id={`tab-${tab.id.toLowerCase()}`} onClick={() => onChange(tab.id)} className={cn(tabVariants({ variant, active: isActive }))} aria-pressed={isActive}>
            {isActive && <motion.div layoutId={layoutId} className={indicatorVariants({ variant })} transition={activeTransition} />}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
