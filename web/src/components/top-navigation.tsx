"use client"

import { useState } from "react"
import { Search, Menu, MessageSquareText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useSidebar } from "./sidebar-context"
import { NotificationsDropdown } from "./notifications-dropdown"
import { ProfileDropdown } from "./profile-dropdown"

export function TopNavigation() {
  const pathname = usePathname()
  const [date] = useState(new Date())
  const { toggleSidebar, isMobile } = useSidebar()

  // Get the current page title based on the pathname
  const getPageTitle = () => {
    const path = pathname.split("/")[1] || "dashboard"
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  // Format date: DD Month, YYYY
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      {/* Left section - Page Title */}
      <div className="flex items-center gap-4">
        {!isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="hidden md:block max-w-md w-full">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anything"
            className="w-full pl-9 pr-4 py-2 rounded-full border-muted bg-background"
          />
        </div>
      </div>

      {/* Right section - Actions and Profile */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium">
          <MessageSquareText className="h-5 w-5" />
          <span className="hidden md:inline">Get Support</span>
        </Button>
        <NotificationsDropdown />
        <ProfileDropdown />
      </div>
    </div>
  )
}

