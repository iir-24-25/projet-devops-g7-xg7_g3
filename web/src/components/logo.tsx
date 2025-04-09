"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LogoProps {
  collapsed?: boolean
  className?: string
}

export function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center"
      >
        <div className="relative h-8 w-8 rounded-full bg-white text-sky-500 flex items-center justify-center font-bold text-xl shadow-sm">
          E
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="ml-2 text-lg font-semibold text-white"
          >
            EMSI 4IIR
          </motion.span>
        )}
      </motion.div>
    </div>
  )
}
