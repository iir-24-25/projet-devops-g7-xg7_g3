"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-context"

export function SidebarToggle() {
  const { toggleSidebar, isMobile } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-primary hover:bg-primary/10 hover:text-primary"
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar"
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}
