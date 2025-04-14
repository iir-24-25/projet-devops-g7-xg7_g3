"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Bell, Calendar, FileText, Info, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function NotificationsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64">
            <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-full" />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
            <TabsTrigger value="absences">Absences</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Latest information sent by the school</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md hover:bg-yellow-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Weather Alert - High Temperatures</h3>
                        <Badge variant="destructive">Important</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Due to the high temperatures expected this week, please equip your children with water bottles
                        and hats. Schedule adjustments may be implemented.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Today, 09:15</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Mark as read
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md hover:bg-blue-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Parent-Teacher Meeting</h3>
                        <Badge variant="default">Événement</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        We remind you that the parent-teacher meeting will take place on April 15 from 6pm to 8pm.
                        Please confirm your attendance via the online form.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Yesterday, 14:30</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Mark as read
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md hover:bg-red-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Bell className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Unjustified Absence</h3>
                        <Badge variant="destructive">Absence</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Thomas was absent on 03/22/2023 all day. This absence has not yet been justified. Please provide
                        a justification as soon as possible.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>03/23/2023, 08:45</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Justify
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md hover:bg-green-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Quarterly Report Available</h3>
                        <Badge variant="default">Information</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Thomas&apos;s 2nd quarter report is now available. You can view and download it from your parent
                        portal.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>03/20/2023, 16:15</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-md hover:bg-purple-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Info className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Message from Mrs. Martin</h3>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-none">Message</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hello, I would like to meet with you regarding Thomas&apos;s progress in French. Could you suggest a
                        time slot for next week?
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>03/18/2023, 11:20</span>
                          <Avatar className="h-5 w-5">
                            <AvatarFallback>MM</AvatarFallback>
                          </Avatar>
                          <span>Mme Martin (Français)</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="important" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Important Notifications</CardTitle>
                <CardDescription>Priority information requiring your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md hover:bg-yellow-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Weather Alert - High Temperatures</h3>
                        <Badge variant="destructive">Important</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Due to the high temperatures expected this week, please equip your children with water bottles
                        and hats. Schedule adjustments may be implemented.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Today, 09:15</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Mark as read
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="absences" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Absence Notifications</CardTitle>
                <CardDescription>Information about your children&apos;s absences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md hover:bg-red-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Bell className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Unjustified Absence</h3>
                        <Badge variant="destructive">Absence</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Thomas was absent on 03/22/2023 all day. This absence has not yet been justified. Please provide
                        a justification as soon as possible.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>03/23/2023, 08:45</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Justify
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}