export interface Tree {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export const STORE_TREES: Tree[] = [
  {
    id: "basic-tree",
    name: "Classic Oak",
    price: 0,
    image: "/autumn_tree.png",
    description: "The sturdy oak, a symbol of strength and endurance. Perfect for long focus sessions.",
  },
  {
    id: "cedar",
    name: "Mountain Cedar",
    price: 50,
    image: "https://images.unsplash.com/photo-1510002131317-062f6b399679?q=80&w=400&auto=format&fit=crop",
    description: "A resilient tree that thrives in the harshest conditions. Helps you stay grounded.",
  },
  {
    id: "cherry-blossom",
    name: "Hanami Cherry",
    price: 200,
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=400&auto=format&fit=crop",
    description: "Beautiful and fleeting. Reminds you to cherish every moment of productivity.",
  },
  {
    id: "gingko",
    name: "Golden Gingko",
    price: 350,
    image: "https://images.unsplash.com/photo-1508197149814-0cc02c8b7f44?q=80&w=400&auto=format&fit=crop",
    description: "Ancient and mystical. Its fan-shaped leaves bring clarity to your work.",
  },
  {
    id: "jacaranda",
    name: "Purple Jacaranda",
    price: 500,
    image: "https://images.unsplash.com/photo-1577979607530-019974268305?q=80&w=400&auto=format&fit=crop",
    description: "A stunning display of violet blooms. A rare find for the dedicated foresters.",
  },
  {
    id: "baobab",
    name: "Ancestral Baobab",
    price: 1000,
    image: "https://images.unsplash.com/photo-1518113645396-98ecda8f0bcc?q=80&w=400&auto=format&fit=crop",
    description: "The Tree of Life. Holds the wisdom of ages and the patience of the desert.",
  },
]
