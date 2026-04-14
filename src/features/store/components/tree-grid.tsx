"use client"

import { STORE_TREES } from "@/features/timer/constants/trees"
import type { Tree } from "@/features/timer/types/tree"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { StoreCard } from "./store-card"

interface TreeGridProps {
  activeTab: string
  onSelect: (tree: Tree) => void
}

export function TreeGrid({ onSelect }: TreeGridProps) {
  const { unlockedTrees, selectedTreeId } = useUser()

  return (
    <div className="flex flex-nowrap lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-8 overflow-x-auto lg:overflow-visible no-scrollbar">
      <AnimatePresence mode="popLayout">
        {STORE_TREES.map((tree, index) => {
          const isUnlocked = unlockedTrees.includes(tree.id)
          const isSelected = selectedTreeId === tree.id

          return (
            <StoreCard
              key={tree.id}
              index={index}
              title={tree.name}
              price={tree.price}
              isUnlocked={isUnlocked}
              isSelected={isSelected}
              onClick={() => onSelect(tree)}
              difficulty={index % 3 === 0 ? "easy" : index % 3 === 1 ? "medium" : "hard"}
              rating={4.5 + (index % 5) * 0.1}
              tags={
                index % 2 === 0 
                  ? [{ label: "Full sun", color: "bg-amber-100 text-amber-700" }, { label: "Easy care", color: "bg-green-100 text-green-700" }]
                  : [{ label: "High water", color: "bg-blue-100 text-blue-700" }, { label: "Blooms April", color: "bg-purple-100 text-purple-700" }]
              }
            >
              <Image
                src={tree.image}
                alt={tree.name}
                width={180}
                height={180}
                className={cn(
                  "w-44 h-44 object-contain transition-all duration-700",
                  !isUnlocked && "grayscale contrast-[0.8] opacity-25"
                )}
                priority={index < 4}
                unoptimized
              />
            </StoreCard>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

