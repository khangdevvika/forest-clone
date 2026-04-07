"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useRef, useState } from "react"
import { TimerMode } from "@/features/timer/enum/timer"
import { TIME_MAX, TIME_MIN, TIME_STEP } from "@/features/timer/constants/timer"

interface CircularTimerProps {
  mode: TimerMode
  minutes: number
  onChange: (minutes: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
  disabled?: boolean
  treeImage?: string
}

export function CircularTimer({ mode, minutes, onChange, onDragStart, onDragEnd, disabled, treeImage = "/autumn_tree.png" }: CircularTimerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateMinutes = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current || disabled) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = clientX - centerX
      const dy = clientY - centerY
      let angle = Math.atan2(dx, -dy) * (180 / Math.PI)
      if (angle < 0) angle += 360

      let newMinutes = Math.round((angle / 360) * TIME_MAX)
      newMinutes = Math.max(TIME_MIN, Math.min(TIME_MAX, Math.round(newMinutes / TIME_STEP) * TIME_STEP))
      onChange(newMinutes)
    },
    [onChange, disabled],
  )

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== TimerMode.TIMER || disabled) return
    setIsDragging(true)
    onDragStart?.()
    calculateMinutes(e.clientX, e.clientY)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (mode !== TimerMode.TIMER || disabled) return
    setIsDragging(true)
    onDragStart?.()
    const touch = e.touches[0]
    calculateMinutes(touch.clientX, touch.clientY)
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) calculateMinutes(e.clientX, e.clientY)
    },
    [isDragging, calculateMinutes],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0]
        calculateMinutes(touch.clientX, touch.clientY)
      }
    },
    [isDragging, calculateMinutes],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    onDragEnd?.()
  }, [onDragEnd])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp])

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={cn("relative size-64 transition-transform duration-700", mode === TimerMode.TIMER ? "cursor-pointer touch-none" : "")}
    >
      {/* Progress Ring */}
      {mode === TimerMode.TIMER && (
        <svg className="absolute inset-[-6%] -rotate-90 pointer-events-none z-10" viewBox="0 0 100 100" style={{ width: "112%", height: "112%" }}>
          {/* Ghost track */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(107,143,107,0.25)" strokeWidth="1" />
          {/* Active progress — sage */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(74,102,73,0.7)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - (minutes / TIME_MAX) * 100}
            className={cn("transition-all duration-300 ease-out", isDragging ? "opacity-100" : "opacity-80")}
          />
        </svg>
      )}

      {/* Main Circle — earthy cream/sage background */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden z-0 pointer-events-none flex items-center justify-center"
        style={{
          background: "linear-gradient(140deg, #d6e5d3 0%, #c0d9bc 60%, #afd0ab 100%)",
          boxShadow: "0 8px 32px rgba(27,43,26,0.15), 0 2px 8px rgba(27,43,26,0.08)",
          border: "6px solid rgba(255,255,255,0.55)",
        }}
      >
        <div className="relative w-[110%] h-[110%] flex items-center justify-center">
          <Image
            src={treeImage}
            alt="Selected Tree"
            width={500}
            height={500}
            className={cn("w-full h-full object-contain transition-transform duration-500", mode === TimerMode.TIMER && isDragging ? "scale-105" : "")}
            priority
            unoptimized={treeImage.startsWith("http")}
          />
        </div>
      </div>

      {/* Drag Handle */}
      {mode === TimerMode.TIMER && (
        <div
          className={cn("absolute inset-0 pointer-events-none z-20 transition-opacity duration-200", isDragging ? "opacity-100" : "opacity-0")}
          style={{ transform: `rotate(${(minutes / TIME_MAX) * 360}deg)` }}
        >
          <div
            className="absolute left-1/2 w-4 h-4 bg-white rounded-full shadow -translate-x-1/2 -translate-y-1/2"
            style={{
              top: "0.72%",
              boxShadow: "0 2px 8px rgba(27,43,26,0.2)",
              border: "2px solid rgba(107,143,107,0.6)",
            }}
          />
        </div>
      )}
    </div>
  )
}
