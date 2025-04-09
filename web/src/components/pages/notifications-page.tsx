import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Check, Clock, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const notifications = [
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

export function NotificationsPage() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#1e3a8a] dark:text-blue-400" />
          Notifications
        </CardTitle>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 rounded-lg border ${notification.read ? "bg-background" : "bg-blue-50 dark:bg-blue-900/20"}`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                ${
                  notification.type === "warning"
                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                    : notification.type === "success"
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                }`}
              >
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{notification.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{notification.time}</span>
                    </Badge>
                    {!notification.read && (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-100">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Mark as read</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
