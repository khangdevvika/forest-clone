"use client"

import { cn } from "@/lib/utils"
import { Volume2, Play, Pause, Coins } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { MUSIC_ITEMS } from "@/features/store/constants/items"
import { useUser } from "@/hooks/use-user"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SoundTab() {
  const { activeSoundId, setActiveSoundId, volume, setVolume, unlockedMusic, buyItem } = useUser()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Ambient Sounds</h2>
          <p className="text-sm text-muted-foreground">Perfect background for deep work</p>
        </div>

        <Card variant="default" padding="sm" className="flex items-center gap-3 min-w-[200px]">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider value={[volume * 100]} onValueChange={(v: number[]) => setVolume(v[0] / 100)} max={100} step={1} className="flex-1" />
          <span className="text-[10px] font-bold text-muted-foreground tabular-nums w-6">{Math.round(volume * 100)}%</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MUSIC_ITEMS.map((sound) => {
          const isUnlocked = unlockedMusic.includes(sound.id)
          const isActive = activeSoundId === sound.id

          return (
            <Card
              key={sound.id}
              variant={isActive ? "active" : isUnlocked ? "interactive" : "default"}
              padding="md"
              onClick={() => {
                if (isUnlocked) {
                  setActiveSoundId(isActive ? null : sound.id)
                }
              }}
              className={cn("flex items-center gap-4 transition-all duration-200", !isUnlocked && "opacity-80")}
            >
              <div
                className={cn(
                  "h-12 w-12 rounded-lg flex items-center justify-center text-2xl transition-all duration-300",
                  isActive ? "bg-accent scale-105" : "bg-muted group-hover:bg-muted/80",
                )}
              >
                {sound.emoji}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-sm">{sound.name}</h3>
                  {!isUnlocked && (
                    <Badge variant="outline" className="bg-yellow-400/10 text-yellow-700 border-yellow-400/20 text-[8px] h-4 py-0 px-1">
                      LOCKED
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{sound.description}</p>
              </div>

              {isUnlocked ? (
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground",
                  )}
                >
                  {isActive ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 ml-0.5 fill-current" />}
                </div>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    buyItem(sound)
                  }}
                  variant="3d-gold"
                  className="h-8 px-3 rounded-lg text-[10px]"
                >
                  <Coins className="h-3 w-3" />
                  {sound.price}
                </Button>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
