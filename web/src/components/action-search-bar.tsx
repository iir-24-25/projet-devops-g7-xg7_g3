"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import {
  Search,
  FileText,
  Briefcase,
  User,
  Settings,
  GraduationCap,
  ClipboardList,
  CalendarDays,
  BellRing,
  LayoutDashboard,
  LineChart,
  ChevronRight,
} from "lucide-react"
import useDebounce from "@/hooks/use-debounce"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Action {
  id: string
  label: string
  icon: React.ReactNode
  description?: string
  route?: string
}

interface SearchResult {
  actions: Action[]
}

const allActions = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4 text-blue-500" />,
    description: "Main dashboard",
    route: "/dashboard",
  },
  {
    id: "courses",
    label: "Courses",
    icon: <GraduationCap className="h-4 w-4 text-green-500" />,
    description: "Course management",
    route: "/courses",
  },
  {
    id: "students",
    label: "Students",
    icon: <User className="h-4 w-4 text-purple-500" />,
    description: "Student management",
    route: "/students",
  },
  {
    id: "assignments",
    label: "Assignments",
    icon: <ClipboardList className="h-4 w-4 text-orange-500" />,
    description: "Assignment management",
    route: "/assignments",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: <CalendarDays className="h-4 w-4 text-red-500" />,
    description: "Calendar view",
    route: "/calendar",
  },
  {
    id: "emplois",
    label: "Emplois",
    icon: <Briefcase className="h-4 w-4 text-indigo-500" />,
    description: "Schedule management",
    route: "/emplois",
  },
  {
    id: "statistics",
    label: "Analytics",
    icon: <LineChart className="h-4 w-4 text-cyan-500" />,
    description: "Data analytics",
    route: "/statistics",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <BellRing className="h-4 w-4 text-amber-500" />,
    description: "Notification center",
    route: "/notifications",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User className="h-4 w-4 text-blue-500" />,
    description: "User profile",
    route: "/profile",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: <Briefcase className="h-4 w-4 text-green-500" />,
    description: "Portfolio management",
    route: "/portfolio",
  },
  {
    id: "resume",
    label: "Resume/CV",
    icon: <FileText className="h-4 w-4 text-purple-500" />,
    description: "Resume management",
    route: "/resume",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4 text-gray-500" />,
    description: "System settings",
    route: "/settings",
  },
]

function ActionSearchBar({ actions = allActions }: { actions?: Action[] }) {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isExpanded, setIsExpanded] = useState(false)
  const debouncedQuery = useDebounce(query) // Using default 500ms delay
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const resultContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isFocused) {
      setResult(null)
      return
    }

    if (!debouncedQuery) {
      setResult({ actions: allActions })
      return
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim()
    const filteredActions = allActions.filter((action) => {
      const searchableText = `${action.label} ${action.description || ""}`.toLowerCase()
      return searchableText.includes(normalizedQuery)
    })

    setResult({ actions: filteredActions })
    setSelectedIndex(-1) // Reset selection when results change
  }, [debouncedQuery, isFocused])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleFocus = () => {
    setIsFocused(true)
    setIsExpanded(true)
  }

  const handleBlur = () => {
    // Delay hiding results to allow for click events
    setTimeout(() => {
      setIsFocused(false)
      setIsExpanded(false)
    }, 200)
  }

  const handleActionSelect = (action: Action) => {
    setQuery("")
    setIsFocused(false)
    setIsExpanded(false)

    if (action.route) {
      router.push(action.route)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setIsExpanded(true)
      }

      // Close search with Escape
      if (e.key === "Escape" && isFocused) {
        e.preventDefault()
        inputRef.current?.blur()
        setIsFocused(false)
        setIsExpanded(false)
      }

      if (!isFocused || !result) return

      // Arrow down - navigate down the list
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < result.actions.length - 1 ? prev + 1 : prev))

        // Scroll into view if needed
        if (resultContainerRef.current && selectedIndex >= 0) {
          const items = resultContainerRef.current.querySelectorAll("li")
          if (items[selectedIndex + 1]) {
            items[selectedIndex + 1].scrollIntoView({ block: "nearest" })
          }
        }
      }

      // Arrow up - navigate up the list
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))

        // Scroll into view if needed
        if (resultContainerRef.current && selectedIndex > 0) {
          const items = resultContainerRef.current.querySelectorAll("li")
          if (items[selectedIndex - 1]) {
            items[selectedIndex - 1].scrollIntoView({ block: "nearest" })
          }
        }
      }

      // Enter - select the highlighted item
      if (e.key === "Enter" && selectedIndex >= 0 && result.actions[selectedIndex]) {
        e.preventDefault()
        handleActionSelect(result.actions[selectedIndex])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFocused, result, selectedIndex])

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative flex flex-col justify-start items-center">
        <div className={cn("w-full transition-all duration-300 ease-in-out", isExpanded ? "max-w-md" : "max-w-sm")}>
          <div className="relative">
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400 transition-all duration-300",
                isExpanded ? "opacity-100" : "opacity-80",
              )}
            >
              <Search className="h-4 w-4" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder={isExpanded ? "Search anything..." : "Search..."}
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={cn(
                "pl-10 pr-4 py-2 transition-all duration-300 ease-in-out",
                isExpanded
                  ? "rounded-2xl border-gray-300 dark:border-gray-600 shadow-md h-11"
                  : "rounded-full border-gray-200 dark:border-gray-700 h-9",
              )}
            />
          </div>
        </div>

        <div
          ref={resultContainerRef}
          className={cn(
            "w-full absolute top-full mt-1 z-20 transition-all duration-300 ease-in-out",
            isExpanded ? "max-w-md opacity-100 translate-y-0" : "max-w-sm opacity-0 -translate-y-2 pointer-events-none",
          )}
        >
          {isFocused && result && (
            <div className="w-full border rounded-xl shadow-lg overflow-hidden dark:border-gray-800 bg-white dark:bg-gray-900">
              <ul className="max-h-[60vh] overflow-y-auto">
                {result.actions.length > 0 ? (
                  result.actions.map((action, index) => (
                    <li
                      key={action.id}
                      className={cn(
                        "px-3 py-2 flex items-center justify-between cursor-pointer transition-colors duration-150",
                        selectedIndex === index
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                      )}
                      onClick={() => handleActionSelect(action)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800">
                          {action.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{action.label}</span>
                          {action.description && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">{action.description}</span>
                          )}
                        </div>
                      </div>
                      {selectedIndex === index && (
                        <div className="flex items-center text-blue-500 dark:text-blue-400">
                          <span className="text-xs mr-1">Go to</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                      <p className="text-sm text-gray-500">No results found for "{query}"</p>
                      <p className="text-xs text-gray-400">Try searching for pages, features, or actions</p>
                    </div>
                  </li>
                )}
              </ul>
              <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">↑</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">↓</span>
                      <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">Enter</span>
                      <span>to select</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">Esc</span>
                    <span>to close</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActionSearchBar
