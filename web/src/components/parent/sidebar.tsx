"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, ClipboardCheck, Bell, LogOut, Settings, Menu, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Sidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false) // État pour le Dialog
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    // Récupérer l'état de la sidebar depuis les cookies
    const cookies = document.cookie.split(";")
    const sidebarCookie = cookies.find((cookie) => cookie.trim().startsWith("sidebar:state="))
    if (sidebarCookie) {
      const sidebarValue = sidebarCookie.split("=")[1]
      setSidebarCollapsed(sidebarValue === "collapsed")
    }
  }, [])

  // Fonction pour basculer l'état de la sidebar et sauvegarder dans un cookie
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    document.cookie = `sidebar:state=${newState ? "collapsed" : "expanded"}; path=/; max-age=${60 * 60 * 24 * 30}`
    const event = new CustomEvent("sidebarStateChange", { detail: { collapsed: newState } })
    document.dispatchEvent(event)
  }

  // Update the sidebar menu items to use English labels
  const menuItems = [
    { title: "Home", href: "/parents/accueil", icon: Home },
    { title: "My Children", href: "/parents/enfants", icon: Users },
    { title: "Attendance", href: "/parents/presences", icon: ClipboardCheck },
    { title: "Notifications", href: "/parents/notifications", icon: Bell },
    { title: "Settings", href: "/parents/settings", icon: Settings },
  ]

  // Fermer la sidebar mobile lors des changements de route
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Fonction pour ouvrir le popup de déconnexion
  const handleOpenLogoutDialog = () => {
    setIsLogoutDialogOpen(true)
  }

  // Fonction pour fermer le popup de déconnexion
  const handleCloseLogoutDialog = () => {
    setIsLogoutDialogOpen(false)
  }

  if (!mounted) return null

  return (
    <>
      {/* Bouton mobile pour ouvrir le menu */}
      <Button
        variant="ghost"
        size="icon"
        className="sidebar-mobile-button md:hidden fixed top-4 left-4 z-50 glass-effect rounded-full shadow-lg dark:bg-gray-800/80"
        onClick={(e) => {
          e.stopPropagation()
          setMobileMenuOpen(!mobileMenuOpen)
        }}
      >
        {mobileMenuOpen ? <ChevronLeft className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay pour mobile */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={(e) => {
            e.stopPropagation()
            setMobileMenuOpen(false)
          }}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-900 dark:border-gray-800",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          sidebarCollapsed ? "md:w-20" : "md:w-64",
        )}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo et titre */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mr-3 shadow-md flex-shrink-0">
              <img src="/logo.png" className="w-10 h-10" alt="" />
            </div>
            {!sidebarCollapsed && <span className="text-xl font-bold text-gradient">SIGAP</span>}
          </div>

          {/* Bouton pour réduire/étendre la sidebar (visible uniquement sur desktop) */}
          <button
            className="hidden md:flex absolute -right-3 top-20 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              toggleSidebar()
            }}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform",
                sidebarCollapsed && "rotate-180",
              )}
            />
          </button>

          {/* Menu de navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                className="mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center py-3 px-4 rounded-xl transition-all duration-200 hover:bg-accent",
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 font-medium shadow-sm dark:from-blue-900/20 dark:to-blue-800/20 dark:text-blue-400"
                      : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400",
                    sidebarCollapsed && "justify-center px-2",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  title={sidebarCollapsed ? item.title : ""}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5",
                      pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400",
                    )}
                  />
                  {!sidebarCollapsed && (
                    <>
                      <span className="ml-3">{item.title}</span>
                      {pathname === item.href && (
                        <div className="ml-auto w-1.5 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                      )}
                    </>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Pied de page */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full flex items-center justify-center gap-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400",
                    sidebarCollapsed && "p-2",
                  )}
                  onClick={handleOpenLogoutDialog}
                >
                  <LogOut className="h-4 w-4" />
                  {!sidebarCollapsed && <span>Déconnexion</span>}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirmer la déconnexion</DialogTitle>
                  <DialogDescription>Êtes-vous sûr de vouloir vous déconnecter de votre compte ?</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={handleCloseLogoutDialog}>
                    Annuler
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      console.log("Logging out...")
                      handleCloseLogoutDialog()
                    }}
                  >
                    Déconnexion
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>
    </>
  )
}
