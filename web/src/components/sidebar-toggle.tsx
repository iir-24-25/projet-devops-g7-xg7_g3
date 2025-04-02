"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-context"

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button variant="outline" size="icon" onClick={toggleSidebar} className="fixed left-4 top-4 z-50 md:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  )
}

