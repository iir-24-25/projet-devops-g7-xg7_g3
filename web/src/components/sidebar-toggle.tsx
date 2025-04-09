"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebar } from "./sidebar-context"
import { cn } from "@/lib/utils"

export function SidebarToggle() {
  const { toggleSidebar, collapsed, isMobile } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm",
        isMobile ? "fixed top-4 left-4 z-50" : "absolute -right-4 top-6 z-50",
      )}
      onClick={toggleSidebar}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
    </Button>
  )
}
