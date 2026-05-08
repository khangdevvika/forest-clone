"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  targetX: number
}

export function GrowthParticles() {
  const [particles, setParticles] = React.useState<Particle[]>([])

  React.useEffect(() => {
    const colors = ["#6b8f6b", "#a3be9e", "#c8d9c5", "#d4af82"]
    
    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 2 + 3,
        targetX: Math.random() * 20 - 10
      }
      
      setParticles(prev => [...prev.slice(-15), newParticle])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-40">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, x: `${p.x}%`, y: "110%" }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1.5, 0.5],
            y: "-10%",
            x: `${p.x + p.targetX}%`
          }}
          transition={{ 
            duration: p.duration,
            ease: "easeOut"
          }}
          className="absolute rounded-full blur-[1px]"
          style={{ 
            width: p.size, 
            height: p.size, 
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`
          }}
        />
      ))}
    </div>
  )
}
