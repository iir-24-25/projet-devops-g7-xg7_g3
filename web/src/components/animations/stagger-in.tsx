"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerInProps {
  children: ReactNode
  staggerDelay?: number
  duration?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
  distance?: number
}

export const StaggerIn = ({
  children,
  staggerDelay = 0.1,
  duration = 0.5,
  className = "",
  direction = "up",
  distance = 20,
}: StaggerInProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 }
      case "down":
        return { y: -distance, opacity: 0 }
      case "left":
        return { x: distance, opacity: 0 }
      case "right":
        return { x: -distance, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case "up":
        return { y: 0, opacity: 1 }
      case "down":
        return { y: 0, opacity: 1 }
      case "left":
        return { x: 0, opacity: 1 }
      case "right":
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: getInitialPosition(),
    show: {
      ...getFinalPosition(),
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  )
}
