"use client"

import { motion, Transition } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

const tabsContainerVariants = cva("flex", {
  variants: {
    variant: {
      default: "bg-muted/50 p-1 rounded-xl border border-border/50",
      card: "gap-1 w-fit shadow-inner bg-muted/50 border border-border/50 rounded-xl p-1 items-center flex",
      glass: "relative items-center p-1 rounded-2xl backdrop-blur-sm self-center mx-auto bg-[var(--timer-glass)] border-solid border border-[var(--timer-glass-border)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const tabVariants = cva("relative transition-all duration-300 outline-none z-0", {
  variants: {
    variant: {
      default: "px-4 py-1.5 text-xs font-semibold rounded-lg",
      card: "px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest",
      glass: "group flex items-center h-10 px-5 rounded-xl text-[14px] font-medium font-sans isolation-auto select-none",
    },
    active: {
      true: "",
      false: "cursor-pointer",
    },
  },
  compoundVariants: [
    { variant: "default", active: true, className: "text-primary-foreground" },
    { variant: "default", active: false, className: "text-muted-foreground hover:text-foreground" },
    { variant: "card", active: true, className: "text-primary" },
    { variant: "card", active: false, className: "text-muted-foreground/60 hover:text-foreground" },
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
      default: "bg-primary rounded-lg",
      card: "bg-card rounded-lg shadow-sm border border-border/10",
      glass: "bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:bg-white/10 rounded-[inherit]",
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

export function AnimatedTabs({
  tabs,
  activeTab,
  onChange,
  layoutId = "animated-tabs",
  variant = "default",
  className,
  transition = { type: "spring", stiffness: 300, damping: 30 },
}: AnimatedTabsProps) {
  const normalizedTabs = tabs.map((tab) => {
    if (typeof tab === "string") {
      return { id: tab, label: tab }
    }
    return tab
  })

  // Set default transitions per variant if not overridden
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
