"use client"

import { Crown, Coins, Plus, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/ui/sidebar"

// Module components
import { ModeToggle } from "@/features/timer/components/mode-toggle"
import { CircularTimer } from "@/features/timer/components/circular-timer"
import { useState, useEffect } from "react"
import { TimerMode } from "@/features/timer/enum/timer"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import { STORE_TREES } from "@/features/timer/constants/trees"
import { TIME_DEFAULT, CANCEL_THRESHOLD } from "@/features/timer/constants/timer"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Home() {
  const { toggleSidebar } = useSidebar()
  const { coins, addCoins, selectedTreeId } = useUser()
  
  const activeTree = STORE_TREES.find(t => t.id === selectedTreeId) || STORE_TREES[0]
  const [mode, setMode] = useState<TimerMode>(TimerMode.TIMER)
  const [minutes, setMinutes] = useState(TIME_DEFAULT)
  const [isActive, setIsActive] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  // Dialog State
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

  // Combined Timer logic to handle ticking and completion
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1
          // Check for completion in Timer mode
          if (mode === TimerMode.TIMER && next >= minutes * 60) {
            setIsActive(false)
            addCoins(Math.floor(minutes / 5)) // Earn coins based on time focused
            setDialogState({
              isOpen: true,
              title: "Time's Up!",
              description: `Congratulations! Your tree has grown. You earned ${Math.floor(minutes / 5)} coins!`,
              confirmText: "Great!",
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
  }, [isActive, mode, minutes, addCoins])

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
      title: "Wait! Don't leave!",
      description: "If you give up now, your tree will die. Are you sure you want to quit focusing?",
      confirmText: "Give Up",
      cancelText: "Stay focused",
      showCancel: true,
      variant: "destructive",
      onConfirm: () => {
        setIsActive(false)
        setElapsedSeconds(0)
        closeDialog()
      },
    })
  }

  // Timer display helper
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

    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative min-h-screen w-full bg-forest-teal text-white flex flex-col items-center p-6 font-sans select-none overflow-hidden">
      {/* Top Header Section */}
      <div className="w-full flex items-center justify-between mt-2 z-50">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSidebar()}
            className="p-2 h-10 w-10 rounded-xl bg-white/20 hover:bg-white/30 transition-colors cursor-pointer text-white"
            disabled={isActive}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-linear-to-tr from-cyan-400 via-green-400 to-yellow-300 shadow-md">
            <div className="absolute inset-0 flex items-center justify-center">
              <Crown className="h-6 w-6 text-white drop-shadow-sm" />
            </div>
          </div>
        </div>

        {/* Timer/Stopwatch Toggle Indicator */}
        {!isActive && <ModeToggle mode={mode} onChange={setMode} />}
        {isActive && (
          <Badge variant="outline" className="text-white border-white/20 bg-white/10 px-4 py-1.5 rounded-full capitalize">
            {mode} Mode
          </Badge>
        )}

        {/* Coin Counter */}
        <div className="flex items-center gap-2 bg-black/10 backdrop-blur-sm pl-1 pr-1.5 py-1 rounded-full border border-white/5">
          <div className="p-1 rounded-full bg-yellow-400 shadow-sm">
            <Coins className="h-4 w-4 text-yellow-900" />
          </div>
          <span className="font-bold text-sm tracking-wide">{coins.toLocaleString()}</span>
          <div className="p-0.5 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer shadow-sm transition-colors group">
            <Plus className="h-3 w-3 text-white transition-transform group-hover:scale-110" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 max-w-md z-10">
        <h1 className="text-xl md:text-2xl font-medium tracking-tight text-white/90">{isActive ? (mode === TimerMode.TIMER ? "Keep focusing!" : "Stopwatch running...") : "Start planting today!"}</h1>

        {/* Tree Illustration & Circular Slider */}
        <div className={cn("transition-all duration-700", isActive ? "scale-90 opacity-100" : "scale-100")}>
          <CircularTimer 
            mode={mode} 
            minutes={isActive && mode === TimerMode.TIMER ? Math.ceil((minutes * 60 - elapsedSeconds) / 60) : minutes} 
            onChange={setMinutes} 
            disabled={isActive} 
            treeImage={activeTree.image}
          />
        </div>

        {/* Tag/Category */}
        <div className="flex flex-col items-center gap-4">
          {!isActive && (
            <Badge
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white/90 border-0 px-4 py-1.5 rounded-full flex gap-2 items-center cursor-pointer transition-colors backdrop-blur-sm"
            >
              <div className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
              <span className="text-sm font-medium">{activeTree.name}</span>
            </Badge>
          )}

          {/* Timer Display */}
          <div className="text-[100px] md:text-[120px] font-extralight tracking-tight leading-none text-white drop-shadow-sm font-mono transition-all duration-300">{formatTime()}</div>
        </div>
      </div>

      {/* Footer / Action Button */}
      <div className="w-full max-w-xs mb-10 z-50">
        {!isActive ? (
          <Button
            onClick={handleStart}
            className="w-full h-14 bg-[#71D6B8] hover:bg-[#5fc0a2] text-[#2D5A43] font-bold text-lg rounded-2xl shadow-xl shadow-black/10 border-b-4 border-[#2D5A43]/10 transform transition-all active:translate-y-1 active:border-b-0"
          >
            Plant
          </Button>
        ) : (
          <div className="flex flex-col gap-3">
            {elapsedSeconds < CANCEL_THRESHOLD ? (
              <Button onClick={handleCancel} variant="outline" className="w-full h-14 bg-white/10 hover:bg-white/20 border-white/20 text-white font-bold text-lg rounded-2xl backdrop-blur-sm">
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleGiveUp}
                className="w-full h-14 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-black/10 border-b-4 border-red-700 transform transition-all active:translate-y-1 active:border-b-0"
              >
                Give Up!
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Popups */}
      <Dialog open={dialogState.isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="border-none bg-white text-forest-teal">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{dialogState.title}</DialogTitle>
            <DialogDescription className="text-forest-teal/70 text-base">{dialogState.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3 sm:justify-center">
            {dialogState.showCancel && (
              <Button variant="ghost" onClick={closeDialog} className="flex-1 rounded-xl text-forest-teal opacity-60 hover:opacity-100">
                {dialogState.cancelText || "Cancel"}
              </Button>
            )}
            <Button
              className={cn("flex-1 rounded-xl h-12 font-bold", dialogState.variant === "destructive" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-forest-teal text-white hover:bg-forest-teal/90")}
              onClick={dialogState.onConfirm || closeDialog}
            >
              {dialogState.confirmText || "OK"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
