"use client"

import { Coins, Menu, Clock, Leaf, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "@/features/timer/components/mode-toggle"
import { CircularTimer } from "@/features/timer/components/circular-timer"
import { useState, useEffect, useSyncExternalStore } from "react"
import { TimerMode } from "@/features/timer/enum/timer"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { TIME_DEFAULT, CANCEL_THRESHOLD } from "@/features/timer/constants/timer"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Home() {
  const { toggleSidebar } = useSidebar()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const { coins, addCoins, addSession, selectedTreeId } = useUser()

  const activeTree = STORE_TREES.find((t) => t.id === selectedTreeId) || STORE_TREES[0]

  const [mode, setMode] = useState<TimerMode>(TimerMode.TIMER)
  const [minutes, setMinutes] = useState(TIME_DEFAULT)
  const [isActive, setIsActive] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const [dialogState, setDialogState] = useState<{
    isOpen: boolean
    title: string
    description: string
    onConfirm?: () => void
    confirmText?: string
    cancelText?: string
    showCancel?: boolean
    variant?: "default" | "destructive"
  }>({
    isOpen: false,
    title: "",
    description: "",
  })

  const closeDialog = () => setDialogState((prev) => ({ ...prev, isOpen: false }))

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1
          if (mode === TimerMode.TIMER && next >= minutes * 60) {
            const coinsEarned = Math.floor(minutes / 5)
            setIsActive(false)
            addCoins(coinsEarned)
            addSession({
              id: crypto.randomUUID(),
              completedAt: new Date().toISOString(),
              durationMinutes: minutes,
              treeId: activeTree.id,
              treeName: activeTree.name,
              treeImage: activeTree.image,
              coinsEarned,
              mode: "timer",
            })
            setDialogState({
              isOpen: true,
              title: "Session complete",
              description: `Great work! You stayed focused for ${minutes} minutes and earned ${coinsEarned} coins.`,
              confirmText: "Continue",
              showCancel: false,
            })
            return 0
          }
          return next
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, mode, minutes, addCoins, addSession, activeTree])

  const handleStart = () => {
    setElapsedSeconds(0)
    setIsActive(true)
  }

  const handleCancel = () => {
    setIsActive(false)
    setElapsedSeconds(0)
  }

  const handleGiveUp = () => {
    setDialogState({
      isOpen: true,
      title: "Give up session?",
      description: "Your tree will wither if you leave now. Do you want to quit this focus session?",
      confirmText: "Give up",
      cancelText: "Keep going",
      showCancel: true,
      variant: "destructive",
      onConfirm: () => {
        setIsActive(false)
        setElapsedSeconds(0)
        closeDialog()
      },
    })
  }

  const formatTime = () => {
    let totalSeconds = 0
    if (mode === TimerMode.TIMER) {
      totalSeconds = isActive ? Math.max(0, minutes * 60 - elapsedSeconds) : minutes * 60
    } else {
      totalSeconds = elapsedSeconds
    }
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const progressPercent = mode === TimerMode.TIMER && isActive ? ((minutes * 60 - elapsedSeconds) / (minutes * 60)) * 100 : mode === TimerMode.TIMER ? 100 : 0

  if (!mounted) return null

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center select-none overflow-hidden" style={{ background: "linear-gradient(160deg, #1a6440 0%, #2d9e65 50%, #3ab870 100%)" }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      {/* ── Header ── */}
      <header className="w-full flex items-center justify-between px-5 pt-5 pb-2 z-50">
        {/* Left: Menu + Brand icon */}
        <div className="flex items-center gap-2.5">
          <button
            id="sidebar-toggle"
            onClick={() => toggleSidebar()}
            disabled={isActive}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-150",
              "bg-white/10 hover:bg-white/20 text-white disabled:opacity-40 disabled:cursor-not-allowed",
              "border border-white/10",
            )}
            aria-label="Open menu"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>

          {/* Brand dot */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 border border-white/10">
            <Leaf className="h-4.5 w-4.5 text-white" />
          </div>
        </div>

        {/* Center: Mode toggle or session badge */}
        <div className="absolute left-1/2 -translate-x-1/2">
          {!isActive ? (
            <ModeToggle mode={mode} onChange={setMode} />
          ) : (
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white/80 text-xs font-medium tracking-wide">
              {mode === TimerMode.TIMER ? <Clock className="h-3.5 w-3.5" /> : <Leaf className="h-3.5 w-3.5" />}
              <span className="capitalize">{mode}</span>
            </div>
          )}
        </div>

        {/* Right: Coin counter */}
        <div className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-white/20 transition-colors duration-150" id="coin-counter">
          <div className="h-4 w-4 rounded-sm bg-yellow-400 flex items-center justify-center">
            <Coins className="h-2.5 w-2.5 text-yellow-900" />
          </div>
          <span className="text-white text-sm font-semibold tabular-nums">{coins.toLocaleString()}</span>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 w-full flex flex-col items-center justify-center gap-6 px-6 z-10">
        {/* Status label */}
        <p className="text-white/60 text-sm font-medium tracking-wide text-center">
          {isActive ? (mode === TimerMode.TIMER ? "Stay focused — your tree is growing" : "Time is running…") : "Set your focus time and plant"}
        </p>

        {/* Tree & circular slider */}
        <div className={cn("transition-all duration-500", isActive ? "scale-95" : "scale-100")}>
          <CircularTimer
            mode={mode}
            minutes={isActive && mode === TimerMode.TIMER ? (minutes * 60 - elapsedSeconds) / 60 : minutes}
            onChange={setMinutes}
            disabled={isActive}
            treeImage={activeTree.image}
          />
        </div>

        {/* Timer display + tree name */}
        <div className="flex flex-col items-center gap-3">
          {/* Big time */}
          <div className="text-[88px] md:text-[108px] font-light tracking-tight leading-none text-white font-mono" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.15)" }}>
            {formatTime()}
          </div>

          {/* Active tree badge */}
          {!isActive && (
            <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-300" />
              <span className="text-white/80 text-xs font-medium">{activeTree.name}</span>
            </div>
          )}

          {/* Session progress bar (only when active in timer mode) */}
          {isActive && mode === TimerMode.TIMER && (
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/60 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${progressPercent}%` }} />
            </div>
          )}
        </div>
      </main>

      {/* ── Footer Actions ── */}
      <footer className="w-full flex justify-center pb-12 pt-4 px-6 z-50">
        <div className="w-full max-w-xs flex flex-col gap-3">
          {!isActive ? (
            <button
              id="plant-button"
              onClick={handleStart}
              className={cn(
                "w-full h-13 rounded-xl bg-white text-green-800 font-semibold text-base tracking-wide",
                "border-b-[3px] border-green-200/60 shadow-sm",
                "hover:bg-white/95 active:translate-y-0.5 active:border-b-0",
                "transition-all duration-100 cursor-pointer",
              )}
            >
              Plant
            </button>
          ) : (
            <div className="flex flex-col gap-2.5">
              {elapsedSeconds < CANCEL_THRESHOLD ? (
                <button
                  id="cancel-button"
                  onClick={handleCancel}
                  className="w-full h-13 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-base
                             hover:bg-white/20 active:bg-white/15
                             transition-colors duration-150 cursor-pointer"
                >
                  Cancel
                </button>
              ) : (
                <button
                  id="giveup-button"
                  onClick={handleGiveUp}
                  className={cn(
                    "w-full h-13 rounded-xl text-white font-semibold text-base tracking-wide",
                    "bg-red-500/80 hover:bg-red-500 border border-red-400/30 border-b-[3px] border-b-red-700/60",
                    "active:translate-y-0.5 active:border-b-0",
                    "transition-all duration-100 cursor-pointer",
                  )}
                >
                  Give up
                </button>
              )}
            </div>
          )}
        </div>
      </footer>

      {/* ── Dialogs ── */}
      <Dialog open={dialogState.isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-white border border-gray-100 shadow-xl rounded-xl max-w-sm p-0 overflow-hidden">
          <div className="flex items-start gap-4 p-6">
            {/* Icon */}
            <div className={cn("mt-0.5 shrink-0 h-9 w-9 rounded-lg flex items-center justify-center", dialogState.variant === "destructive" ? "bg-red-50" : "bg-green-50")}>
              {dialogState.variant === "destructive" ? <AlertTriangle className="h-5 w-5 text-red-500" /> : <CheckCircle2 className="h-5 w-5 text-green-500" />}
            </div>
            <DialogHeader className="flex-1 gap-1 text-left">
              <DialogTitle className="text-gray-900 font-semibold text-base leading-tight">{dialogState.title}</DialogTitle>
              <DialogDescription className="text-gray-500 text-sm leading-relaxed">{dialogState.description}</DialogDescription>
            </DialogHeader>
          </div>

          <DialogFooter className="flex flex-row gap-2 px-6 pb-6 pt-0">
            {dialogState.showCancel && (
              <Button id="dialog-cancel" variant="ghost" onClick={closeDialog} className="flex-1 h-10 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium border border-gray-200">
                {dialogState.cancelText || "Cancel"}
              </Button>
            )}
            <Button
              id="dialog-confirm"
              onClick={dialogState.onConfirm || closeDialog}
              className={cn(
                "flex-1 h-10 rounded-lg text-sm font-semibold transition-colors",
                dialogState.variant === "destructive" ? "bg-red-500 hover:bg-red-600 text-white border-0" : "bg-green-600 hover:bg-green-700 text-white border-0",
              )}
            >
              {dialogState.confirmText || "OK"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
