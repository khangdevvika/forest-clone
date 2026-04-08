"use client"

import { useHeader } from "@/hooks/use-header"

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, children, className }: PageHeaderProps) {
  useHeader({
    title,
    subtitle,
    rightContent: children,
    className
  })

  return null // This component now only handles configuration
}
