"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GraduationCap,
  UsersRound,
  Briefcase,
  LineChart,
  BellRing,
  Cog,
  LogOut,
  User,
  FileText,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSidebar } from "./sidebar-context"
import { SidebarToggle } from "./sidebar-toggle"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { collapsed, toggleSidebar, isMobile } = useSidebar()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [mounted, setMounted] = useState(false)

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { id: "courses", icon: GraduationCap, label: "Courses", href: "/courses" },
    { id: "students", icon: UsersRound, label: "Students", href: "/students" },
    { id: "emplois", icon: Briefcase, label: "Emplois", href: "/emplois" },
    { id: "statistics", icon: LineChart, label: "Analytics", href: "/statistics" },
    { id: "notifications", icon: BellRing, label: "Notifications", href: "/notifications" },
  ]

  const profileMenuItems = [
    { id: "profile", icon: User, label: "Profile", href: "/profile" },
    { id: "portfolio", icon: Briefcase, label: "Portfolio", href: "/portfolio" },
    { id: "resume", icon: FileText, label: "Resume/CV", href: "/resume" },
  ]

  const bottomMenuItems = [
    { id: "settings", icon: Cog, label: "Settings", href: "/settings" },
    { id: "logout", icon: LogOut, label: "Logout", href: "#", onClick: () => setShowLogoutConfirm(true) },
  ]

  // Check if the current path matches the menu item
  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/") {
      return true
    }
    return pathname.startsWith(href)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants
  const sidebarVariants = {
    expanded: { width: "250px" },
    collapsed: { width: "70px" },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  }

  // Desktop sidebar
  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4 bg-gradient-to-r from-cyan-400 to-sky-300 text-white">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Logo collapsed={collapsed} />
        </motion.div>
      </div>

      <div className="flex-1 overflow-auto py-2 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700">
        {/* Top spacer */}
        <div className="h-4"></div>

        <nav className="grid gap-1 px-2 py-3">
          {menuItems.map((item, index) => {
            const active = isActive(item.href)
            const Icon = item.icon

            return (
              <motion.div
                key={item.id}
                custom={index}
                initial="hidden"
                animate={mounted ? "visible" : "hidden"}
                variants={itemVariants}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 relative",
                    active
                      ? "bg-cyan-50 text-cyan-700 font-medium border-l-2 border-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-300"
                      : "text-gray-600 dark:text-gray-300 border-l-2 border-transparent",
                    collapsed && "justify-center px-0",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-all duration-200",
                      active ? "text-cyan-600 dark:text-cyan-400" : "text-gray-500 dark:text-gray-400",
                    )}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {!collapsed && <span>{item.label}</span>}
                  {active && !collapsed && (
                    <div className="ml-auto flex items-center">
                      <ChevronRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Profile Section */}
        <div className="px-3 py-2 mt-4">
          <h3
            className={cn(
              "mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center",
              collapsed && "justify-center",
            )}
          >
            {!collapsed ? (
              <>
                <User className="h-4 w-4 mr-2" />
                PROFILE
              </>
            ) : (
              <User className="h-4 w-4" />
            )}
          </h3>
          <nav className="grid gap-1">
            {profileMenuItems.map((item, index) => {
              const active = isActive(item.href)
              const Icon = item.icon

              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  initial="hidden"
                  animate={mounted ? "visible" : "hidden"}
                  variants={itemVariants}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 relative",
                      active
                        ? "bg-teal-50 text-teal-700 font-medium border-l-2 border-teal-500 dark:bg-teal-900/30 dark:text-teal-300"
                        : "text-gray-600 dark:text-gray-300 border-l-2 border-transparent",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-all duration-200",
                        active ? "text-teal-600 dark:text-teal-400" : "text-gray-500 dark:text-gray-400",
                      )}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    {!collapsed && <span>{item.label}</span>}
                    {active && !collapsed && (
                      <div className="ml-auto flex items-center">
                        <ChevronRight className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      </div>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="border-t p-2 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700">
        <nav className="grid gap-1">
          {bottomMenuItems.map((item, index) => {
            const active = isActive(item.href)
            const Icon = item.icon

            return (
              <motion.div
                key={item.id}
                custom={index}
                initial="hidden"
                animate={mounted ? "visible" : "hidden"}
                variants={itemVariants}
              >
                <button
                  onClick={item.onClick || (() => (window.location.href = item.href))}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 w-full text-left relative",
                    active
                      ? "bg-gray-200 text-gray-800 font-medium border-l-2 border-gray-500 dark:bg-gray-700 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-300 border-l-2 border-transparent",
                    collapsed && "justify-center px-0",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-all duration-200",
                      active ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-400",
                    )}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </motion.div>
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
    <>
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 shadow-sm",
          className,
        )}
        initial={collapsed ? "collapsed" : "expanded"}
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
      >
        <SidebarContent />
      </motion.aside>
      <Dialog open={showLogoutConfirm} onOpenChange={(open) => setShowLogoutConfirm(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>Are you sure you want to log out of your account?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={() => (window.location.href = "/logout")} variant="destructive">
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
