import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { TimerMode } from "@/features/timer/enum/timer"
import { TIME_DEFAULT, CANCEL_THRESHOLD, STORE_TREES } from "@/features/timer/constants"
import { useUser } from "@/hooks/use-user"
import type { TimerDialogState, Tree } from "@/features/timer/types"

const INITIAL_DIALOG: TimerDialogState = { isOpen: false, title: "", description: "" }

export function useTimer() {
  const { addCoins, addSession, selectedTreeId } = useUser()

  const activeTree: Tree = STORE_TREES.find((t) => t.id === selectedTreeId) ?? STORE_TREES[0]

  const [mode, setMode] = useState<TimerMode>(TimerMode.TIMER)
  const [minutes, setMinutes] = useState(TIME_DEFAULT)
  const [isActive, setIsActive] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [bloomKey, setBloomKey] = useState(0)
  const [dialogState, setDialogState] = useState<TimerDialogState>(INITIAL_DIALOG)

  const closeDialog = () => setDialogState((prev) => ({ ...prev, isOpen: false }))

  // ── Interval ────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1

        if (mode === TimerMode.TIMER && next >= minutes * 60) {
          const coinsEarned = Math.floor(minutes / 5)
          setIsActive(false)
          setBloomKey((k) => k + 1)

          setTimeout(() => {
            confetti({
              particleCount: 90,
              spread: 65,
              origin: { y: 0.58 },
              colors: ["#6b8f6b", "#a3be9e", "#c8d9c5", "#d4af82", "#e8ede6"],
            })
          }, 300)

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

    return () => clearInterval(interval)
  }, [isActive, mode, minutes, addCoins, addSession, activeTree])

  // ── Handlers ─────────────────────────────────────────────────
  const handleStart = () => {
    setElapsedSeconds(0)
    setBloomKey((k) => k + 1)
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

  // ── Computed ──────────────────────────────────────────────────
  const formatTime = (): string => {
    const totalSeconds = mode === TimerMode.TIMER ? (isActive ? Math.max(0, minutes * 60 - elapsedSeconds) : minutes * 60) : elapsedSeconds

    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const progressPercent = mode === TimerMode.TIMER && isActive ? ((minutes * 60 - elapsedSeconds) / (minutes * 60)) * 100 : mode === TimerMode.TIMER ? 100 : 0

  // Minutes value passed to CircularTimer (counts down when active)
  const displayMinutes = isActive && mode === TimerMode.TIMER ? (minutes * 60 - elapsedSeconds) / 60 : minutes

  return {
    mode,
    setMode,
    minutes,
    setMinutes,
    isActive,
    elapsedSeconds,
    bloomKey,
    activeTree,
    dialogState,
    closeDialog,
    handleStart,
    handleCancel,
    handleGiveUp,
    formatTime,
    progressPercent,
    displayMinutes,
    cancelThreshold: CANCEL_THRESHOLD,
  }
}
