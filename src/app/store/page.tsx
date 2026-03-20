"use client"

import React, { useState } from "react"
import { Menu, Coins, ShoppingBag, Check, Lock, ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/ui/sidebar"
import { useUser } from "@/hooks/use-user"
import { Tree, STORE_TREES } from "@/features/timer/constants/trees"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function StorePage() {
  const { toggleSidebar } = useSidebar()
  const { coins, unlockedTrees, selectedTreeId, buyTree, sellTree, selectTree } = useUser()
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSellConfirmOpen, setIsSellConfirmOpen] = useState(false)

  const handleSelectTree = (tree: Tree) => {
    setSelectedTree(tree)
  }

  const handleEquip = () => {
    if (selectedTree) {
      selectTree(selectedTree.id)
      setSelectedTree(null)
    }
  }

  const handleBuy = () => {
    if (selectedTree) {
      const success = buyTree(selectedTree)
      if (success) {
        setIsConfirmOpen(false)
      } else {
        alert("Not enough coins!")
      }
    }
  }

  const handleSell = () => {
    if (selectedTree) {
      sellTree(selectedTree)
      setIsSellConfirmOpen(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-forest-teal text-white flex flex-col p-6 font-sans select-none overflow-x-hidden">
      {/* Top Header Section */}
      <div className="w-full flex items-center justify-between mt-2 z-50 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSidebar()}
            className="p-2 h-10 w-10 rounded-xl bg-white/20 hover:bg-white/30 transition-colors cursor-pointer text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Tree Store</h1>
        </motion.div>

        {/* Coin Counter */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 bg-black/20 backdrop-blur-md pl-1 pr-1.5 py-1 rounded-full border border-white/10 shadow-lg"
        >
          <div className="p-1.5 rounded-full bg-yellow-400 shadow-sm animate-pulse">
            <Coins className="h-4 w-4 text-yellow-900" />
          </div>
          <span className="font-bold text-sm tracking-wide mr-1">{coins.toLocaleString()}</span>
          <div className="p-0.5 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer shadow-sm transition-colors group">
            <Plus className="h-3 w-3 text-white transition-transform group-hover:scale-110" />
          </div>
        </motion.div>
      </div>

      {/* Store Categories / Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide"
      >
        <Badge className="bg-white text-forest-teal px-6 py-2 rounded-xl border-none text-sm font-bold shadow-lg whitespace-nowrap">Species</Badge>
        <Badge className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl border-none text-sm font-bold backdrop-blur-sm cursor-pointer whitespace-nowrap">Themes</Badge>
        <Badge className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl border-none text-sm font-bold backdrop-blur-sm cursor-pointer whitespace-nowrap">Music</Badge>
      </motion.div>

      {/* Tree Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1 pb-10">
        {STORE_TREES.map((tree, index) => {
          const isUnlocked = unlockedTrees.includes(tree.id)
          return (
            <motion.div
              key={tree.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => handleSelectTree(tree)}
              className={cn(
                "group relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-300 cursor-pointer",
                "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10",
                "active:scale-[0.98] shadow-xl",
                selectedTreeId === tree.id && "ring-4 ring-yellow-400 border-transparent",
                selectedTree?.id === tree.id && "ring-4 ring-[#71D6B8] border-transparent"
              )}
            >
              {/* Image Container */}
              <div className="aspect-square relative overflow-hidden">
                <Image 
                  src={tree.image} 
                  alt={tree.name} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  unoptimized={tree.image.startsWith("http")}
                />
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  {isUnlocked ? (
                    <div className="bg-green-500 p-1.5 rounded-full shadow-lg">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="bg-yellow-400 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Coins className="h-3 w-3 text-yellow-900" />
                      <span className="text-[10px] font-bold text-yellow-900">{tree.price}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Area */}
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-bold text-lg truncate">{tree.name}</h3>
                <p className="text-xs text-white/50 line-clamp-1 italic">{tree.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Selected Tree Detail Drawer/Overlay */}
      <AnimatePresence>
        {selectedTree && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 flex flex-col justify-end"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm h-screen" 
              onClick={() => setSelectedTree(null)} 
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[3rem] p-8 pb-10 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] relative z-10"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-40 h-40 rounded-[2rem] overflow-hidden shadow-2xl relative group">
                  <Image 
                    src={selectedTree.image} 
                    alt={selectedTree.name} 
                    fill 
                    className="object-cover" 
                    unoptimized={selectedTree.image.startsWith("http")}
                  />
                </div>
                
                <div className="flex-1 text-forest-teal">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-3xl font-black">{selectedTree.name}</h2>
                    {unlockedTrees.includes(selectedTree.id) ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1.5 rounded-full font-bold">Unlocked</Badge>
                    ) : (
                      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full font-bold">
                        <Coins className="h-4 w-4" />
                        <span>{selectedTree.price}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-forest-teal/70 leading-relaxed text-lg mb-8 font-medium italic">
                    &quot;{selectedTree.description}&quot;
                  </p>
                  
                  <div className="flex gap-4">
                    {unlockedTrees.includes(selectedTree.id) ? (
                      <>
                        <Button 
                          onClick={handleEquip}
                          disabled={selectedTreeId === selectedTree.id}
                          className={cn(
                            "flex-1 h-14 font-bold text-lg rounded-2xl shadow-xl transition-all active:scale-95",
                            selectedTreeId === selectedTree.id 
                              ? "bg-green-500 text-white cursor-default" 
                              : "bg-forest-teal hover:bg-forest-teal/90 text-white"
                          )}
                        >
                          {selectedTreeId === selectedTree.id ? "Already Equipped" : "Equip Tree"}
                        </Button>
                        {selectedTree.id !== "basic-tree" && (
                          <Button 
                            onClick={() => setIsSellConfirmOpen(true)}
                            variant="outline"
                            className="px-8 h-14 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold text-lg rounded-2xl transition-all active:scale-95"
                          >
                            Sell
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button 
                        onClick={() => setIsConfirmOpen(true)}
                        disabled={coins < selectedTree.price}
                        className={cn(
                          "w-full h-16 text-lg font-bold rounded-[1.5rem] shadow-xl transition-all active:scale-95",
                          coins >= selectedTree.price 
                            ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-yellow-400/20" 
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        )}
                      >
                        {coins >= selectedTree.price ? `Purchase for ${selectedTree.price} Coins` : `Need ${selectedTree.price - coins} more coins`}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="border-none bg-white text-forest-teal rounded-[2.5rem] max-w-sm">
          <DialogHeader className="items-center text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-3xl flex items-center justify-center mb-4">
              <ShoppingBag className="h-10 w-10 text-yellow-600" />
            </div>
            <DialogTitle className="text-2xl font-black">Buy {selectedTree?.name}?</DialogTitle>
            <DialogDescription className="text-forest-teal/60 text-base font-medium">
              This beautiful tree will cost you {selectedTree?.price} coins.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-3 sm:flex-col mt-4">
            <Button 
              onClick={handleBuy}
              className="w-full h-14 bg-forest-teal text-white hover:bg-forest-teal/90 font-bold text-lg rounded-2xl shadow-lg"
            >
              Confirm Purchase
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsConfirmOpen(false)}
              className="w-full h-12 text-forest-teal/40 font-bold hover:text-forest-teal/60 hover:bg-transparent"
            >
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sell Confirmation Dialog */}
      <Dialog open={isSellConfirmOpen} onOpenChange={setIsSellConfirmOpen}>
        <DialogContent className="border-none bg-white text-forest-teal rounded-[2.5rem] max-w-sm">
          <DialogHeader className="items-center text-center">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-4">
              <ArrowLeft className="h-10 w-10 text-red-500" />
            </div>
            <DialogTitle className="text-2xl font-black">Sell {selectedTree?.name}?</DialogTitle>
            <DialogDescription className="text-forest-teal/60 text-base font-medium">
              You will get {selectedTree ? Math.floor(selectedTree.price * 0.5) : 0} coins back (50% value).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-3 sm:flex-col mt-4">
            <Button 
              onClick={handleSell}
              className="w-full h-14 bg-red-500 text-white hover:bg-red-600 font-bold text-lg rounded-2xl shadow-lg"
            >
              Sell Tree
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsSellConfirmOpen(false)}
              className="w-full h-12 text-forest-teal/40 font-bold hover:text-forest-teal/60 hover:bg-transparent"
            >
              Keep It
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
