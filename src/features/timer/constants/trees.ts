import type { Tree } from "@/features/timer/types/tree"

export type { Tree, GrowthStage } from "@/features/timer/types/tree"

export const STORE_TREES: Tree[] = [
  {
    id: "balloon-flower",
    name: "Balloon Flower",
    price: 1200,
    image: "/trees/balloon-flower.png",
    description: "With a single purple petal, I promise to gently protect every moment of your focused time.",
    growthStages: [
      { label: "10m", image: "/trees/balloon-flower.png" },
      { label: "120m", image: "/trees/balloon-flower.png" },
    ],
  },
  {
    id: "geraniums",
    name: "Geraniums",
    price: 1200,
    image: "/trees/geraniums.png",
    description: "Vibrant and cheerful, these flowers bloom most beautifully when you are deeply focused.",
    growthStages: [
      { label: "10m", image: "/trees/geraniums.png" },
      { label: "120m", image: "/trees/geraniums.png" },
    ],
  },
  {
    id: "jacaranda",
    name: "Jacaranda",
    price: 2000,
    image: "/trees/jacaranda.png",
    description: "A stunning display of violet blooms. A rare find for the dedicated foresters.",
    growthStages: [
      { label: "10m", image: "/trees/jacaranda.png" },
      { label: "120m", image: "/trees/jacaranda.png" },
    ],
  },
  {
    id: "golden-trumpet",
    name: "Golden Trumpet Tree",
    price: 2000,
    image: "/trees/golden-trumpet.png",
    description: "Bright yellow flowers that signal the arrival of success through persistence.",
    growthStages: [
      { label: "10m", image: "/trees/golden-trumpet.png" },
      { label: "120m", image: "/trees/golden-trumpet.png" },
    ],
  },
  {
    id: "chinese-banyan",
    name: "Chinese Banyan",
    price: 1500,
    image: "https://images.unsplash.com/photo-1544331305-6490332840c8?q=80&w=400&auto=format&fit=crop",
    description: "An ancient spirit residing in a complex web of aerial roots. A symbol of resilience.",
    growthStages: [
       { label: "10m", image: "https://images.unsplash.com/photo-1544331305-6490332840c8?q=80&w=100&auto=format&fit=crop" },
       { label: "120m", image: "https://images.unsplash.com/photo-1544331305-6490332840c8?q=80&w=100&auto=format&fit=crop" },
    ]
  },
  {
    id: "cherry-blossom",
    name: "Cherry Blossom",
    price: 2500,
    image: "https://images.unsplash.com/photo-1522383225223-f113c7674640?q=80&w=400&auto=format&fit=crop",
    description: "Transcendent pink petals that celebrate the fleeting nature of focus and time.",
    growthStages: [
       { label: "10m", image: "https://images.unsplash.com/photo-1522383225223-f113c7674640?q=80&w=100&auto=format&fit=crop" },
       { label: "120m", image: "https://images.unsplash.com/photo-1522383225223-f113c7674640?q=80&w=100&auto=format&fit=crop" },
    ]
  },
  {
    id: "maple",
    name: "Autumn Maple",
    price: 1800,
    image: "https://images.unsplash.com/photo-1471374526693-02f5a60e0350?q=80&w=400&auto=format&fit=crop",
    description: "Deep crimson leaves signify the transition into deep cognitive resonance.",
    growthStages: [
       { label: "10m", image: "https://images.unsplash.com/photo-1471374526693-02f5a60e0350?q=80&w=100&auto=format&fit=crop" },
       { label: "120m", image: "https://images.unsplash.com/photo-1471374526693-02f5a60e0350?q=80&w=100&auto=format&fit=crop" },
    ]
  },
  {
    id: "cypress",
    name: "Monterey Cypress",
    price: 2200,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop",
    description: "Twisted by the coastal winds, it stands as a monument to unyielding determination.",
    growthStages: [
       { label: "10m", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=100&auto=format&fit=crop" },
       { label: "120m", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=100&auto=format&fit=crop" },
    ]
  },
]
