"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { useSidebar } from "@/components/sidebar-context"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { collapsed, isMobile } = useSidebar()
  const pathname = usePathname()

  // Reset scroll position when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isMobile ? "ml-0" : collapsed ? "ml-[70px]" : "ml-[250px]",
        )}
      >
        <TopNavigation />
        <main className="mx-auto max-w-7xl p-4 md:p-6 space-y-8">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
