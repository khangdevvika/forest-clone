"use client"

import { cn } from "@/lib/utils"
import { Volume2, Play, Pause } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { AMBIENT_SOUNDS } from "@/features/timer/constants/sounds"
import { useUser } from "@/hooks/use-user"

export function SoundTab() {
  const { activeSoundId, setActiveSoundId, volume, setVolume } = useUser()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Ambient Sounds</h2>
          <p className="text-sm text-gray-500">Perfect background for deep work</p>
        </div>

        <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm min-w-[200px]">
          <Volume2 className="h-4 w-4 text-gray-400" />
          <Slider value={[volume * 100]} onValueChange={(v: number[]) => setVolume(v[0] / 100)} max={100} step={1} className="flex-1" />
          <span className="text-[10px] font-bold text-gray-400 tabular-nums w-6">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {AMBIENT_SOUNDS.map((sound) => {
          const isActive = activeSoundId === sound.id
          return (
            <div
              key={sound.id}
              onClick={() => setActiveSoundId(isActive ? null : sound.id)}
              className={cn(
                "group relative flex items-center gap-4 p-4 rounded-xl border bg-white cursor-pointer transition-all duration-200",
                isActive ? "border-green-400 bg-green-50/30 ring-2 ring-green-400/10 shadow-sm" : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
              )}
            >
              <div
                className={cn("h-12 w-12 rounded-lg flex items-center justify-center text-2xl transition-all duration-300", isActive ? "bg-green-100 scale-105" : "bg-gray-50 group-hover:bg-gray-100")}
              >
                {sound.emoji}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{sound.name}</h3>
                  {sound.isPremium && <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100 text-[8px] h-4 py-0 px-1 hover:bg-yellow-50">PRO</Badge>}
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{sound.description}</p>
              </div>

              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                  isActive ? "bg-green-600 text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600",
                )}
              >
                {isActive ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 ml-0.5 fill-current" />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
