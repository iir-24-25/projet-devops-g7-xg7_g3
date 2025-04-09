"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PulseProps {
  children: ReactNode
  className?: string
  duration?: number
  scale?: number
  repeat?: number | Infinity
}

export const Pulse = ({
  children,
  className = "",
  duration = 2,
  scale = 1.05,
  repeat = Number.POSITIVE_INFINITY,
}: PulseProps) => {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
