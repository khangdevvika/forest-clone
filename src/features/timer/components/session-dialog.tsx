"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { spring } from "@/lib/animations"
import type { TimerDialogState } from "@/features/timer/types/dialog"

interface SessionDialogProps {
  state: TimerDialogState
  onClose: () => void
}

export function SessionDialog({ state, onClose }: SessionDialogProps) {
  return (
    <Dialog open={state.isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[--cream-50] dark:bg-[--bg-surface] border border-[--border] shadow-xl rounded-xl max-w-sm p-0 overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring} className="flex items-start gap-4 p-6">
          {/* Icon */}
          <div className={cn("mt-0.5 shrink-0 h-9 w-9 rounded-lg flex items-center justify-center", state.variant === "destructive" ? "bg-red-50" : "bg-[--sage-100]")}>
            {state.variant === "destructive" ? <AlertTriangle className="h-4.5 w-4.5 text-red-500" strokeWidth={1.5} /> : <CheckCircle2 className="h-4.5 w-4.5 text-[--sage-600]" strokeWidth={1.5} />}
          </div>

          <DialogHeader className="flex-1 gap-1 text-left">
            <DialogTitle className="text-foreground font-semibold text-base leading-tight font-[family-name:var(--font-inter)]">{state.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed font-[family-name:var(--font-inter)]">{state.description}</DialogDescription>
          </DialogHeader>
        </motion.div>

        <DialogFooter className="flex flex-row gap-2 px-6 pb-6 pt-0">
          {state.showCancel && (
            <Button
              id="dialog-cancel"
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg text-muted-foreground hover:bg-accent text-sm font-medium font-[family-name:var(--font-inter)] border border-border"
            >
              {state.cancelText ?? "Cancel"}
            </Button>
          )}
          <Button
            id="dialog-confirm"
            onClick={state.onConfirm ?? onClose}
            className={cn(
              "flex-1 h-10 rounded-lg text-sm font-semibold font-[family-name:var(--font-inter)] transition-colors",
              state.variant === "destructive" ? "bg-red-500 hover:bg-red-600 text-white border-0" : "bg-[--sage-600] hover:bg-[--sage-700] text-white border-0",
            )}
          >
            {state.confirmText ?? "OK"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
