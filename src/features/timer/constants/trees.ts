import type { Tree } from "@/features/timer/types/tree"

export type { Tree, GrowthStage } from "@/features/timer/types/tree"

export const STORE_TREES: Tree[] = [
  {
    id: "balloon-flower",
    name: "Balloon Flower",
    price: 1200,
    image: "https://images.unsplash.com/photo-1596434304658-006263884524?q=80&w=400&auto=format&fit=crop",
    description: "With a single purple petal, I promise to gently protect every moment of your focused time.",
    growthStages: [
      { label: "10 phút", image: "https://images.unsplash.com/photo-1596434304658-006263884524?q=80&w=100&auto=format&fit=crop" },
      { label: "30 phút", image: "https://images.unsplash.com/photo-1596434304658-006263884524?q=80&w=100&auto=format&fit=crop" },
      { label: "1 tiếng", image: "https://images.unsplash.com/photo-1596434304658-006263884524?q=80&w=100&auto=format&fit=crop" },
      { label: "2 tiếng", image: "https://images.unsplash.com/photo-1596434304658-006263884524?q=80&w=100&auto=format&fit=crop" },
    ],
  },
  {
    id: "geraniums",
    name: "Geraniums",
    price: 1200,
    image: "https://images.unsplash.com/photo-1508197149814-0cc02c8b7f44?q=80&w=400&auto=format&fit=crop",
    description: "Vibrant and cheerful, these flowers bloom most beautifully when you are deeply focused.",
    growthStages: [
      { label: "10 phút", image: "https://images.unsplash.com/photo-1508197149814-0cc02c8b7f44?q=80&w=100&auto=format&fit=crop" },
      { label: "30 phút", image: "https://images.unsplash.com/photo-1508197149814-0cc02c8b7f44?q=80&w=100&auto=format&fit=crop" },
      { label: "1 tiếng", image: "https://images.unsplash.com/photo-1508197149814-0cc02c8b7f44?q=80&w=100&auto=format&fit=crop" },
      { label: "2 tiếng", image: "https://images.unsplash.com/photo-1508197149814-0cc02c8b7f44?q=80&w=100&auto=format&fit=crop" },
    ],
  },
  {
    id: "jacaranda",
    name: "Jacaranda",
    price: 2000,
    image: "https://images.unsplash.com/photo-1577979607530-019974268305?q=80&w=400&auto=format&fit=crop",
    description: "A stunning display of violet blooms. A rare find for the dedicated foresters.",
    growthStages: [
      { label: "10 phút", image: "https://images.unsplash.com/photo-1577979607530-019974268305?q=80&w=100&auto=format&fit=crop" },
      { label: "30 phút", image: "https://images.unsplash.com/photo-1577979607530-019974268305?q=80&w=100&auto=format&fit=crop" },
      { label: "1 tiếng", image: "https://images.unsplash.com/photo-1577979607530-019974268305?q=80&w=100&auto=format&fit=crop" },
      { label: "2 tiếng", image: "https://images.unsplash.com/photo-1577979607530-019974268305?q=80&w=100&auto=format&fit=crop" },
    ],
  },
  {
    id: "golden-trumpet",
    name: "Golden Trumpet Tree",
    price: 2000,
    image: "https://images.unsplash.com/photo-1510002131317-062f6b399679?q=80&w=400&auto=format&fit=crop",
    description: "Bright yellow flowers that signal the arrival of success through persistence.",
    growthStages: [
      { label: "10 phút", image: "https://images.unsplash.com/photo-1510002131317-062f6b399679?q=80&w=100&auto=format&fit=crop" },
      { label: "30 phút", image: "https://images.unsplash.com/photo-1510002131317-062f6b399679?q=80&w=100&auto=format&fit=crop" },
      { label: "1 tiếng", image: "https://images.unsplash.com/photo-1510002131317-062f6b399679?q=80&w=100&auto=format&fit=crop" },
      { label: "2 tiếng", image: "https://images.unsplash.com/photo-1510002131317-062f6b399679?q=80&w=100&auto=format&fit=crop" },
    ],
  },
]
