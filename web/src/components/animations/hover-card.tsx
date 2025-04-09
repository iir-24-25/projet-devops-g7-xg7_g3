"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface HoverCardProps {
  children: ReactNode
  className?: string
  hoverScale?: number
  hoverElevation?: boolean
}

export const HoverCard = ({ children, className = "", hoverScale = 1.02, hoverElevation = true }: HoverCardProps) => {
  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        boxShadow: hoverElevation
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
          : undefined,
        y: hoverElevation ? -2 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
