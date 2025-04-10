"use client"

import { useState } from "react"
import { User, Settings, LogOut, Mail, Phone, MapPin, Briefcase, Calendar, BookOpen, Award, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"


export function ProfileModal() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/dashboard")
    setOpen(false)
  }

  const handleNavigate = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 rounded-full border px-3 py-2 h-auto">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Profile" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium">Mithun Ray</div>
            <div className="text-xs text-muted-foreground">Sr. Product designer</div>
          </div>
          <Badge
            variant="outline"
            className="hidden md:flex bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ml-1"
          >
            Pro
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 pb-20 relative">
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setOpen(false)}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
          <DialogTitle className="text-xl font-bold">User Profile</DialogTitle>
        </DialogHeader>

        <div className="px-6 -mt-12 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center">
            <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 -mt-16 shadow-md">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback className="text-2xl">MR</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mt-3">Mithun Ray</h2>
            <p className="text-muted-foreground">Sr. Product Designer</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Pro
              </Badge>
              <Badge variant="outline">Admin</Badge>
              <Badge variant="outline">Designer</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full mt-6">
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">155</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">40</p>
                <p className="text-xs text-muted-foreground">Certificates</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">27</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="info" className="px-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">mithun.ray@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm">Design Team</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed &quot;Advanced UI/UX&quot; course</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                  <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Earned &quot;UI Design Expert&quot; certificate</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Scheduled meeting with Design Team</p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-4 space-y-4">
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start" onClick={() => handleNavigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleNavigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleNavigate("/settings")}>
                <Shield className="mr-2 h-4 w-4" />
                Privacy & Security
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <DialogFooter className="p-6 pt-0">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/profile">View Full Profile</Link>
          </Button>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}