import type { Variants } from "framer-motion"

// ── Spring presets ──────────────────────────────────────────────
export const spring = { type: "spring" as const, stiffness: 280, damping: 22 }
export const springSnappy = { type: "spring" as const, stiffness: 300, damping: 25 }
export const gentleSpring = { type: "spring" as const, stiffness: 180, damping: 28 }

// ── Variants ────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: spring },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: gentleSpring },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}
