"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  BookOpen,
  Calendar,
  Settings,
  Users,
  BarChart2,
  FileText,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSidebar } from "./sidebar-context"
import { SidebarToggle } from "./sidebar-toggle"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { collapsed, toggleSidebar, isMobile } = useSidebar()

  const menuItems = [
    { id: "dashboard", icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
    { id: "courses", icon: BookOpen, label: "Courses", href: "/courses" },
    { id: "students", icon: Users, label: "Students", href: "/students" },
    { id: "assignments", icon: FileText, label: "Assignments", href: "/assignments" },
    { id: "calendar", icon: Calendar, label: "Calendar", href: "/calendar" },
    { id: "emplois", icon: Briefcase, label: "Emplois", href: "/emplois" },
    { id: "statistics", icon: BarChart2, label: "Analytics", href: "/statistics" },
    { id: "notifications", icon: Bell, label: "Notifications", href: "/notifications" },
  ]

  const bottomMenuItems = [
    { id: "settings", icon: Settings, label: "Settings", href: "/settings" },
    { id: "logout", icon: LogOut, label: "Logout", href: "/logout" },
  ]

  // Check if the current path matches the menu item
  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/") {
      return true
    }
    return pathname.startsWith(href)
  }

  // Desktop sidebar
  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Logo collapsed={collapsed} />
        {!isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2 py-3">
          {menuItems.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground",
                  collapsed && "justify-center px-0",
                )}
              >
                <Icon className={cn("h-5 w-5", collapsed && "h-5 w-5")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t p-2">
        <nav className="grid gap-1">
          {bottomMenuItems.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground",
                  collapsed && "justify-center px-0",
                )}
              >
                <Icon className={cn("h-5 w-5", collapsed && "h-5 w-5")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )

  // Mobile sidebar with Sheet component
  if (isMobile) {
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <SidebarToggle />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop sidebar
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden md:flex flex-col bg-background border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[250px]",
        className,
      )}
    >
      <SidebarContent />
    </aside>
  )
}

