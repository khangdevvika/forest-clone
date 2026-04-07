"use client"

import { useSyncExternalStore } from "react"
import { useUser } from "@/hooks/use-user"
import { TimerHeader, TimerDisplay, TimerActions, SessionDialog } from "@/features/timer/components"
import { useTimer } from "@/features/timer"

export default function Home() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const { coins } = useUser()
  const timer = useTimer()

  if (!mounted) return null

  return (
    <div className="timer-bg h-svh w-full flex flex-col items-center justify-between select-none overflow-hidden">
      <div className="w-full shrink-0">
        <TimerHeader isActive={timer.isActive} mode={timer.mode} onModeChange={timer.setMode} coins={coins} />
      </div>

      <TimerDisplay
        isActive={timer.isActive}
        mode={timer.mode}
        displayMinutes={timer.displayMinutes}
        setMinutes={timer.setMinutes}
        bloomKey={timer.bloomKey}
        activeTree={timer.activeTree}
        formattedTime={timer.formatTime()}
        progressPercent={timer.progressPercent}
      />

      <div className="w-full shrink-0">
        <TimerActions isActive={timer.isActive} elapsedSeconds={timer.elapsedSeconds} onStart={timer.handleStart} onCancel={timer.handleCancel} onGiveUp={timer.handleGiveUp} />
      </div>

      <SessionDialog state={timer.dialogState} onClose={timer.closeDialog} />
    </div>
  )
}
