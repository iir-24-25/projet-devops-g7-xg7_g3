import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SettingsPage() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5 text-[#1e3a8a]" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Theme</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Dark Mode:</span>
              <ThemeToggle />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Account</h3>
            <p className="text-gray-500">Account settings will appear here.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <p className="text-gray-500">Notification settings will appear here.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
