import { atom } from "jotai"
import React from "react"

export interface HeaderConfig {
  title?: string
  subtitle?: string
  leftContent?: React.ReactNode
  centerContent?: React.ReactNode
  rightContent?: React.ReactNode
  transparent?: boolean
  className?: string
  hideTrigger?: boolean
}

export const headerConfigAtom = atom<HeaderConfig>({
  transparent: false,
})
