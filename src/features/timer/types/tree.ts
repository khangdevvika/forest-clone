export interface GrowthStage {
  label: string
  image: string
}

export interface Tree {
  id: string
  name: string
  price: number
  image: string
  description: string
  growthStages: GrowthStage[]
}
