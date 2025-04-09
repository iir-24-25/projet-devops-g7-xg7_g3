"use client"

import { useState, useEffect } from "react"
import { Store, FileText, Users, Settings, LogOut, Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

interface ProfileDropdownProps {
  user?: {
    name: string
    email: string
    image?: string
  }
}

export function ProfileDropdown({
  user = {
    name: "Mithun Ray",
    email: "mithun.ray@example.com",
    image: "/placeholder.svg?height=40&width=40",
  },
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("profile-dropdown")
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/dashboard")
    setIsOpen(false)
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <div className="relative" id="profile-dropdown">
      {/* Profile Button */}
      <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {user.image ? (
            <img src={user.image || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-sm flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          {/* User Info */}
          <div className="p-4 flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              {user.image ? (
                <img src={user.image || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-sm flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-base dark:text-white">{user.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <div className="mx-4 my-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center p-2 rounded-md transition ${
                  theme === "light"
                    ? "bg-white dark:bg-gray-600 shadow-sm text-black dark:text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Sun className="w-5 h-5" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center p-2 rounded-md transition ${
                  theme === "dark"
                    ? "bg-white dark:bg-gray-600 shadow-sm text-black dark:text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Moon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`flex items-center justify-center p-2 rounded-md transition ${
                  theme === "system"
                    ? "bg-white dark:bg-gray-600 shadow-sm text-black dark:text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Monitor className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="mt-2">
            {/* Navigation Links */}
            <nav className="flex flex-col">
              <button
                onClick={() => handleNavigation("/courses")}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition text-left w-full"
              >
                <Store className="w-5 h-5" />
                <span>Your Courses</span>
              </button>
              <button
                onClick={() => handleNavigation("/help")}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition text-left w-full"
              >
                <FileText className="w-5 h-5" />
                <span>Documentation</span>
              </button>
              <button
                onClick={() => handleNavigation("/students")}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition text-left w-full"
              >
                <Users className="w-5 h-5" />
                <span>Affiliate</span>
              </button>
              <button
                onClick={() => handleNavigation("/settings")}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition text-left w-full"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition border-t border-gray-100 dark:border-gray-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
