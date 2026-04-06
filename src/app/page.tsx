"use client"

import { useSyncExternalStore } from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { useUser } from "@/hooks/use-user"
import { TimerHeader, TimerDisplay, TimerActions, SessionDialog } from "@/features/timer/components"
import { useTimer } from "@/features/timer"

export default function Home() {
  const { toggleSidebar } = useSidebar()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const { coins } = useUser()
  const timer = useTimer()

  if (!mounted) return null

  return (
    <div className="timer-bg relative h-full w-full flex flex-col items-center select-none overflow-hidden">
      <TimerHeader isActive={timer.isActive} mode={timer.mode} onModeChange={timer.setMode} coins={coins} onMenuClick={toggleSidebar} />

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

      <TimerActions isActive={timer.isActive} elapsedSeconds={timer.elapsedSeconds} onStart={timer.handleStart} onCancel={timer.handleCancel} onGiveUp={timer.handleGiveUp} />

      <SessionDialog state={timer.dialogState} onClose={timer.closeDialog} />
    </div>
  )
}
