"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Bell,
  Search,
  FileText,
  Settings,
  LogOut,
  Monitor,
  Sun,
  Moon,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Menu,
  Calendar,
  Clock,
  User,
  BookOpen,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Types
interface SearchResult {
  type: "student" | "course" | "event" | "absence"
  name: string
  details: string
  icon: React.ComponentType<{ className?: string }>
}

interface UserProfile {
  nom: string
  prenom: string
  email: string
  image?: string
}

// Constants
const SEARCH_RESULTS: SearchResult[] = [
  { type: "student", name: "Thomas Dupont", details: "Classe 3A", icon: User },
  { type: "student", name: "Sophie Dupont", details: "Classe 5B", icon: User },
  { type: "course", name: "Mathématiques", details: "M. Dubois - Salle A102", icon: BookOpen },
  { type: "event", name: "Réunion parents-professeurs", details: "15 avril, 18:00 - 20:00", icon: Calendar },
  { type: "absence", name: "Absence - Thomas Dupont", details: "22/03/2023 - Non justifiée", icon: Clock },
]

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Tableau de bord",
  enfants: "Mes Enfants",
  presences: "Présences et Absences",
  notifications: "Notifications",
  parametres: "Paramètres",
  settings: "Settings",
}

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("authToken")
        const id = localStorage.getItem("id")
        
        if (!token || !id) {
          throw new Error("No JWT token or user ID found")
        }

        const response = await fetch(`http://localhost:8080/info/admin?id=${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: UserProfile = await response.json()
        
        if (!data.nom || !data.prenom) {
          throw new Error("Invalid user data received")
        }

        setUserProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred")
        console.error("Error fetching user profile:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (mounted) {
      fetchUserProfile()
    }
  }, [mounted])

  // Close search results on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter search results
  const filteredResults = searchQuery
    ? SEARCH_RESULTS.filter(
        (result) =>
          result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.details.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  // Get page title
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean)[1] || "dashboard"
    return PAGE_TITLES[path] || "Home"
  }

  // Get avatar initials
  const getAvatarFallback = () => {
    if (!mounted || isLoading) return "..."
    if (error || !userProfile) return "NA"
    return `${userProfile.prenom[0]}${userProfile.nom[0]}`.toUpperCase()
  }

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    const sidebarButton = document.querySelector(".sidebar-mobile-button") as HTMLButtonElement
    sidebarButton?.click()
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold hidden md:block">{getPageTitle()}</h2>
          </div>
          <div className="flex-1 max-w-md mx-4"></div>
          <div className="flex items-center gap-4"></div>
        </div>
      </header>
    )
  }

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light'

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Sidebar toggle and page title */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold hidden md:block text-gray-900 dark:text-white">{getPageTitle()}</h2>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-4 relative" ref={searchRef}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher un cours, un professeur, une absence..."
              className="pl-10 pr-10 py-2 rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSearchResults(e.target.value.length > 0)
              }}
              onFocus={() => setShowSearchResults(searchQuery.length > 0)}
              aria-label="Search"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => {
                  setSearchQuery("")
                  setShowSearchResults(false)
                }}
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            )}
          </div>

          {/* Search results */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              {filteredResults.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {filteredResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSearchQuery("")
                        setShowSearchResults(false)
                      }}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          result.type === "student"
                            ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300"
                            : result.type === "course"
                              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                              : result.type === "event"
                                ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300"
                                : "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300"
                        }`}
                      >
                        <result.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{result.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{result.details}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  Aucun résultat pour &quot;{searchQuery}&quot;
                </div>
              )}
              <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-center">
                <button
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  onClick={() => setShowSearchResults(false)}
                >
                  Recherche avancée
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications and profile */}
        <motion.div
          className="flex items-center gap-2 md:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-10 text-gray-600 dark:text-gray-300" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-0"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
                <h3 className="text-base font-semibold">Notifications</h3>
                <p className="text-xs opacity-80">3 nouvelles notifications</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[
                  {
                    type: "absence",
                    title: "Absence enregistrée",
                    description: "Thomas était absent le 22/03/2023. Cette absence n'a pas encore été justifiée.",
                    time: "Il y a 2 heures",
                    badge: "Nouveau",
                    badgeClass: "bg-red-500 text-white",
                    icon: Bell,
                    iconClass: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300",
                  },
                  {
                    type: "message",
                    title: "Nouveau message",
                    description: "Mme Martin a envoyé un message sur les progrès de Thomas en français.",
                    time: "Il y a 5 heures",
                    badge: "Message",
                    badgeClass: "bg-purple-500 text-white",
                    icon: FileText,
                    iconClass: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300",
                  },
                  {
                    type: "event",
                    title: "Événement à venir",
                    description: "Rappel : Réunion parents-professeurs le 15 avril de 18h à 20h.",
                    time: "Hier",
                    badge: "Événement",
                    badgeClass: "bg-green-500 text-white",
                    icon: Calendar,
                    iconClass: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300",
                  },
                  {
                    type: "grade",
                    title: "Nouvelle note",
                    description: "Thomas a reçu une note de 16/20 en Mathématiques.",
                    time: "Il y a 2 jours",
                    badge: "Note",
                    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
                    icon: BookOpen,
                    iconClass: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300",
                  },
                ].map((notification, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div className={`p-2 rounded-full ${notification.iconClass}`}>
                      <notification.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                        <Badge className={`text-xs ${notification.badgeClass}`}>{notification.badge}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between items-center p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Marquer tout comme lu
                </Button>
                <Link href="/dashboard/notifications">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                  >
                    Voir toutes
                  </Button>
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu onOpenChange={setProfileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 rounded-full hover:bg-gray-0 dark:hover:bg-gray-0"
                aria-label="Profile menu"
              >
                <Avatar className="h-11 w-11 border-2 border-purple-100 dark:border-blue-400">
                  <AvatarImage 
                    src={userProfile?.image ? `data:image/jpeg;base64,${userProfile.image}` : "/default-avatar.png"} 
                    alt="Profile"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/default-avatar.png'
                    }}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-xs">
                    {getAvatarFallback()}
                  </AvatarFallback>
                </Avatar>
                {profileMenuOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2"
            >
              <div className="flex items-center gap-3 p-3">
                <Avatar className="h-12 w-12 border-2 border-purple-100 dark:border-blue-400">
                  <AvatarImage 
                    src={userProfile?.image ? `data:image/jpeg;base64,${userProfile.image}` : "/default-avatar.png"} 
                    alt="Profile"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/default-avatar.png'
                    }}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-sm">
                    {getAvatarFallback()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {isLoading ? (
                    <div className="space-y-1">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ) : error || !userProfile ? (
                    <>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Utilisateur inconnu</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Erreur de chargement</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[180px]">
                        {`${userProfile.prenom} ${userProfile.nom}`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                        {userProfile.email}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-12 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                {[
                  { theme: "light", icon: Sun, label: "Light" },
                  { theme: "dark", icon: Moon, label: "Dark" },
                  { theme: "system", icon: Monitor, label: "System" },
                ].map(({ theme: t, icon: Icon, label }) => (
                  <Button
                    key={t}
                    variant="ghost"
                    size="icon"
                    className={`rounded-md ${currentTheme === t ? "bg-white dark:bg-gray-600 shadow-sm" : ""}`}
                    onClick={() => setTheme(t)}
                    aria-label={`Switch to ${t} theme`}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <DropdownMenuSeparator className="my-1 border-gray-200 dark:border-gray-700" />
              {[
                { href: "/dashboard/enfants", label: "Mes Enfants", icon: GraduationCap },
                { href: "/dashboard/presences", label: "Présences et Absences", icon: FileText },
                { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
                { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
              ].map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator className="my-1 border-gray-200 dark:border-gray-700" />
              <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </header>
  )
}