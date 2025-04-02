"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Clock, X, Info, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Notifications data
const initialNotifications = [
  {
    id: 1,
    title: "Assignment Deadline",
    message: "Your 'Web Development' assignment is due tomorrow.",
    time: "2 hours ago",
    read: false,
    type: "warning",
  },
  {
    id: 2,
    title: "Course Update",
    message: "New materials have been added to 'Advanced UI/UX' course.",
    time: "Yesterday",
    read: true,
    type: "info",
  },
  {
    id: 3,
    title: "Grade Published",
    message: "Your grade for 'Basic Design' has been published.",
    time: "2 days ago",
    read: true,
    type: "success",
  },
  {
    id: 4,
    title: "Meeting Scheduled",
    message: "Team meeting scheduled for Friday at 3 PM.",
    time: "3 days ago",
    read: false,
    type: "info",
  },
]

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("notifications-dropdown")
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" id="notifications-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-base">Notifications</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                Mark all as read
              </Button>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="relative px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div
                    className={cn(
                      "flex items-start gap-3 p-2 rounded-lg",
                      !notification.read && "bg-blue-50/50 dark:bg-blue-900/10",
                    )}
                  >
                    <div
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        notification.type === "warning"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300"
                          : notification.type === "success"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
                      )}
                    >
                      {getIconForType(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">{notification.title}</p>
                        <div className="flex items-center text-xs text-muted-foreground ml-2 whitespace-nowrap">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.time}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    </div>
                  </div>
                  <div className="absolute right-6 top-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <button
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3 w-3" />
                        <span className="sr-only">Mark as read</span>
                      </button>
                    )}
                    <button
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Dismiss</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                <div className="flex flex-col items-center justify-center py-4">
                  <Bell className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p>No new notifications</p>
                </div>
              </div>
            )}
          </div>
          <div className="p-2 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/notifications"
              className="block w-full text-center py-2 text-sm font-medium text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

