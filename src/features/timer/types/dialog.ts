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
}
