"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export function GardenEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="text-6xl mb-4 select-none">🌱</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">Your garden is empty</h3>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
        Complete a focus session to plant your first tree. Your forest grows with every minute of focus.
      </p>
      <Link href="/" className="mt-6">
        <button
          id="garden-start-btn"
          className={cn(
            "h-10 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold",
            "transition-colors duration-150 cursor-pointer",
          )}
        >
          Start focusing →
        </button>
      </Link>
    </div>
  )
}
