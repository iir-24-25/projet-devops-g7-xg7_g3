"use client"

import { useState, useEffect } from "react"
import { Menu, MessageSquareText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useSidebar } from "./sidebar-context"
import { NotificationsDropdown } from "./notifications-dropdown"
import { ProfileDropdown } from "./profile-dropdown"
import ActionSearchBar from "./action-search-bar"
import { motion, AnimatePresence } from "framer-motion"

// Define navigation items for search
const navigationItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "courses", label: "Courses", path: "/courses" },
  { id: "students", label: "Students", path: "/students" },
  { id: "assignments", label: "Assignments", path: "/assignments" },
  { id: "calendar", label: "Calendar", path: "/calendar" },
  { id: "emplois", label: "Emplois", path: "/emplois" },
  { id: "statistics", label: "Analytics", path: "/statistics" },
  { id: "notifications", label: "Notifications", path: "/notifications" },
  { id: "profile", label: "Profile", path: "/profile" },
  { id: "portfolio", label: "Portfolio", path: "/portfolio" },
  { id: "resume", label: "Resume/CV", path: "/resume" },
  { id: "settings", label: "Settings", path: "/settings" },
]

export function TopNavigation() {
  const pathname = usePathname()
  const [date] = useState(new Date())
  const { toggleSidebar, isMobile } = useSidebar()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <motion.div
      className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-4 md:px-6 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left section - Page Title */}
      <div className="flex items-center gap-4">
        <AnimatePresence>
          {!isMobile && mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col">
          <motion.h1
            className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {getPageTitle()}
          </motion.h1>
          <motion.p
            className="text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {formattedDate}
          </motion.p>
        </div>
      </div>

      {/* Center section - Enhanced Search */}
      <div className="hidden md:flex justify-center items-center flex-1 max-w-3xl mx-auto">
        <motion.div
          className="w-full transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ActionSearchBar />
        </motion.div>
      </div>

      {/* Right section - Actions and Profile */}
      <div className="flex items-center gap-4">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium group">
            <MessageSquareText className="h-5 w-5 group-hover:text-blue-500 transition-colors" />
            <span className="hidden md:inline group-hover:text-blue-500 transition-colors">Get Support</span>
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <NotificationsDropdown />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          <ProfileDropdown />
        </motion.div>
      </div>
    </motion.div>
  )
}
