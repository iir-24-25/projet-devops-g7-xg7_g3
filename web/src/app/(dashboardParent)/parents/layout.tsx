"use client"

import type React from "react"

import { Sidebar } from "@/components/parent/sidebar"
import { AppHeader } from "@/components/parent/app-header"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Vérifier l'état de la sidebar depuis les cookies au chargement
  useEffect(() => {
    setMounted(true)
    const cookies = document.cookie.split(";")
    const sidebarCookie = cookies.find((cookie) => cookie.trim().startsWith("sidebar:state="))
    if (sidebarCookie) {
      const sidebarValue = sidebarCookie.split("=")[1]
      setSidebarCollapsed(sidebarValue === "collapsed")
    }

    // Ajouter un écouteur d'événement pour détecter les changements de cookie
    const checkSidebarState = () => {
      const cookies = document.cookie.split(";")
      const sidebarCookie = cookies.find((cookie) => cookie.trim().startsWith("sidebar:state="))
      if (sidebarCookie) {
        const sidebarValue = sidebarCookie.split("=")[1]
        setSidebarCollapsed(sidebarValue === "collapsed")
      }
    }

    // Vérifier périodiquement l'état du cookie
    const interval = setInterval(checkSidebarState, 500)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          sidebarCollapsed ? "md:ml-20" : "md:ml-64",
        )}
      >
        <AppHeader />
        <motion.main
          key={pathname}
          className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
