"use client"

import { useSyncExternalStore } from "react"
import { useUser } from "@/hooks/use-user"
import { TimerDisplay, TimerActions, SessionDialog, ModeToggle } from "@/features/timer/components"
import { useTimer } from "@/features/timer"
import { useHeader } from "@/hooks/use-header"
import { Leaf, Clock, Coins } from "lucide-react"

export default function Home() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const { coins } = useUser()
  const timer = useTimer()

  const glassStyle = {
    background: "var(--timer-glass)",
    border: "1px solid var(--timer-glass-border)",
  }

  useHeader({
    transparent: true,
    leftContent: (
      <div 
        style={glassStyle}
        className="flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-sm"
      >
        <Leaf className="h-5 w-5 text-[--timer-text]" strokeWidth={1.25} />
      </div>
    ),
    centerContent: (
      <div className="flex justify-center w-full">
        {!timer.isActive ? (
          <ModeToggle mode={timer.mode} onChange={timer.setMode} />
        ) : (
          <div
            style={glassStyle}
            className="flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 text-[--timer-text] text-[13px] font-medium font-sans tracking-wide whitespace-nowrap"
          >
            {timer.mode === "timer" ? (
              <Clock className="h-4 w-4" strokeWidth={1.25} />
            ) : (
              <Leaf className="h-4 w-4" strokeWidth={1.25} />
            )}
            <span className="capitalize">{timer.mode}</span>
          </div>
        )}
      </div>
    ),
    rightContent: (
      <div
        id="coin-counter"
        style={glassStyle}
        className="flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 cursor-pointer hover:bg-white/40 transition-all duration-200 active:scale-95 group"
      >
        <div className="h-4.5 w-4.5 rounded-md bg-[--warm-500] flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
          <Coins className="h-2.5 w-2.5 text-amber-900" strokeWidth={1.5} />
        </div>
        <span className="text-[--timer-text] text-sm font-semibold tabular-nums font-sans">
          {coins.toLocaleString()}
        </span>
      </div>
    )
  })

  if (!mounted) return null

  return (
    <div className="timer-bg absolute inset-0 flex flex-col items-center justify-between select-none overflow-hidden pb-4 pt-16">
      <div /> {/* Spacer for absolute header */}

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
