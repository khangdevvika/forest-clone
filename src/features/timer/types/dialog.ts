import type { Session } from "@/features/timer/types/session"

export type TimerDialogVariant = "default" | "destructive"

export interface TimerDialogState {
  isOpen: boolean
  title: string
  description: string
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  variant?: TimerDialogVariant
  session?: Session // Added for summary display
}
