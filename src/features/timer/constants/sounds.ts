import type { AmbientSound } from "@/features/timer/types/sound"

export type { AmbientSound } from "@/features/timer/types/sound"

export const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: "rain",
    name: "Rain",
    emoji: "🌧️",
    description: "Gentle rainfall on a roof",
    url: "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg",
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌲",
    description: "Birds chirping in the morning",
    url: "https://actions.google.com/sounds/v1/ambient/morning_birds.ogg",
  },
  {
    id: "cafe",
    name: "Coffee Shop",
    emoji: "☕",
    description: "Relaxing cafe ambiance",
    url: "https://actions.google.com/sounds/v1/ambient/crowd_talking.ogg",
  },
  {
    id: "ocean",
    name: "Ocean",
    emoji: "🌊",
    description: "Waves crashing on the shore",
    url: "https://actions.google.com/sounds/v1/water/waves_crashing_on_shore.ogg",
  },
  {
    id: "fireplace",
    name: "Fireplace",
    emoji: "🔥",
    description: "Crackling wood fire",
    url: "https://actions.google.com/sounds/v1/ambient/fireplace.ogg",
  },
  {
    id: "white-noise",
    name: "White Noise",
    emoji: "📡",
    description: "Pure static for focus",
    url: "https://actions.google.com/sounds/v1/ambient/white_noise.ogg",
    isPremium: true,
  },
]
