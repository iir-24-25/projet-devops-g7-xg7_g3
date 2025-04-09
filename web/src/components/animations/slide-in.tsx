"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SlideInProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
  className?: string
  distance?: number
}

export const SlideIn = ({
  children,
  direction = "left",
  delay = 0,
  duration = 0.5,
  className = "",
  distance = 50,
}: SlideInProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -distance, opacity: 0 }
      case "right":
        return { x: distance, opacity: 0 }
      case "up":
        return { y: -distance, opacity: 0 }
      case "down":
        return { y: distance, opacity: 0 }
      default:
        return { x: -distance, opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier for smooth motion
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
