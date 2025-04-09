"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  initialScale?: number
}

export const ScaleIn = ({ children, delay = 0, duration = 0.5, className = "", initialScale = 0.95 }: ScaleInProps) => {
  return (
    <motion.div
      initial={{ scale: initialScale, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: initialScale, opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
