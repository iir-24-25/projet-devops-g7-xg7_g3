"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, ArrowRight, BookOpen, Users, AlertTriangle, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function Dashboard() {
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

  // Données des enfants (unchanged)
  const children = [
    {
      id: "thomas",
      name: "Thomas Dupont",
      class: "Classe 3A",
      studentId: "STD-3421",
      avatar: "/placeholder.svg?height=100&width=100",
      initials: "TD",
      attendance: 78,
      absences: 8,
      justified: 5,
      unjustified: 3,
      notifications: 3,
      todayCourses: [
        {
          time: "08:00 - 09:00",
          name: "Mathématiques",
          teacher: "M. Dubois",
          room: "A102",
          color: "bg-blue-100 border-blue-300 text-blue-800",
        },
        {
          time: "09:00 - 10:00",
          name: "Français",
          teacher: "Mme Martin",
          room: "B201",
          color: "bg-purple-100 border-purple-300 text-purple-800",
        },
        {
          time: "10:00 - 11:00",
          name: "Sciences",
          teacher: "M. Bernard",
          room: "C305",
          color: "bg-green-100 border-green-300 text-green-800",
        },
        {
          time: "11:00 - 12:00",
          name: "Histoire",
          teacher: "Mme Petit",
          room: "A104",
          color: "bg-amber-100 border-amber-300 text-amber-800",
        },
        {
          time: "14:00 - 15:00",
          name: "Anglais",
          teacher: "M. Thomas",
          room: "B205",
          color: "bg-pink-100 border-pink-300 text-pink-800",
        },
        {
          time: "15:00 - 16:00",
          name: "Éducation Physique",
          teacher: "M. Robert",
          room: "Gymnase",
          color: "bg-red-100 border-red-300 text-red-800",
        },
      ],
    },
    {
      id: "sophie",
      name: "Sophie Dupont",
      class: "Classe 5B",
      studentId: "STD-4532",
      avatar: "/placeholder.svg?height=100&width=100",
      initials: "SD",
      attendance: 95,
      absences: 2,
      justified: 2,
      unjustified: 0,
      notifications: 1,
      todayCourses: [
        {
          time: "08:00 - 09:00",
          name: "Littérature",
          teacher: "Mme Martin",
          room: "A102",
          color: "bg-purple-100 border-purple-300 text-purple-800",
        },
        {
          time: "09:00 - 10:00",
          name: "Mathématiques",
          teacher: "M. Dubois",
          room: "B201",
          color: "bg-blue-100 border-blue-300 text-blue-800",
        },
        {
          time: "10:00 - 11:00",
          name: "Anglais",
          teacher: "M. Thomas",
          room: "C305",
          color: "bg-pink-100 border-pink-300 text-pink-800",
        },
        {
          time: "11:00 - 12:00",
          name: "Histoire",
          teacher: "Mme Petit",
          room: "A104",
          color: "bg-amber-100 border-amber-300 text-amber-800",
        },
        {
          time: "14:00 - 15:00",
          name: "Sciences",
          teacher: "M. Bernard",
          room: "C305",
          color: "bg-green-100 border-green-300 text-green-800",
        },
        {
          time: "15:00 - 16:00",
          name: "Éducation Physique",
          teacher: "M. Robert",
          room: "Gymnase",
          color: "bg-red-100 border-red-300 text-red-800",
        },
      ],
    },
  ]

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">

      {/* Section pour sélectionner l'enfant */}
      <motion.div variants={item}>
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-gradient">My Children</CardTitle>
            <CardDescription>Select a child to view their information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="thomas" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                {children.map((child) => (
                  <TabsTrigger key={child.id} value={child.id} className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-xs">
                        {child.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span>{child.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {children.map((child) => (
                <TabsContent key={child.id} value={child.id} className="space-y-6 mt-15">
                  {/* Section combinée profil et statistiques */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profil de l'élève réduit */}
                    <Card className="border-none shadow-md overflow-hidden">
                      <CardHeader className="pb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        <div className="flex justify-between items-center">
                          <CardTitle>Profil</CardTitle>
                          <Link href="/dashboard/enfants">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                            >
                              Details
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                            <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-lg">
                              {child.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h2 className="text-xl font-bold text-gradient">{child.name}</h2>
                            <div className="flex flex-col gap-1 mt-1">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Users className="mr-1 h-3 w-3" />
                                <span>{child.class}</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <BookOpen className="mr-1 h-3 w-3" />
                                <span>ID: {child.studentId}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Cartes statistiques redessinées - placées à côté */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="overflow-hidden border-none shadow-md">
                        <CardContent className="p-0">
                          <div className="flex items-start">
                            <div className="p-4 flex-1">
                              <h3 className="text-base font-semibold mb-1">Absences</h3>
                              <div className="text-2xl font-bold text-red-500">{child.absences}</div>
                              <div className="text-xs text-muted-foreground mt-1">Ce mois-ci</div>
                            </div>
                            <div className="bg-gradient-to-br from-red-500 to-pink-500 p-4 flex items-center justify-center">
                              <Bell className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="bg-red-50 dark:bg-red-900/20 p-2 border-t border-red-100 dark:border-red-900/30">
                            <Link
                              href="/dashboard/presences"
                              className="text-xs text-red-600 dark:text-red-400 font-medium hover:underline flex items-center"
                            >
                              <span>Voir les détails</span>
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-none shadow-md">
                        <CardContent className="p-0">
                          <div className="flex items-start">
                            <div className="p-4 flex-1">
                              <h3 className="text-base font-semibold mb-1">Non justifiées</h3>
                              <div className="text-2xl font-bold text-orange-500">{child.unjustified}</div>
                              <div className="text-xs text-muted-foreground mt-1">Sur {child.absences} absences</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 flex items-center justify-center">
                              <AlertTriangle className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="bg-orange-50 dark:bg-orange-900/20 p-2 border-t border-orange-100 dark:border-orange-900/30">
                            <Link
                              href="/dashboard/presences"
                              className="text-xs text-orange-600 dark:text-orange-400 font-medium hover:underline flex items-center"
                            >
                              <span>Justifier maintenant</span>
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-none shadow-md">
                        <CardContent className="p-0">
                          <div className="flex items-start">
                            <div className="p-4 flex-1">
                              <h3 className="text-base font-semibold mb-1">Justifiées</h3>
                              <div className="text-2xl font-bold text-green-500">{child.justified}</div>
                              <div className="text-xs text-muted-foreground mt-1">Sur {child.absences} absences</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 flex items-center justify-center">
                              <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 border-t border-green-100 dark:border-green-900/30">
                            <Link
                              href="/dashboard/presences"
                              className="text-xs text-green-600 dark:text-green-400 font-medium hover:underline flex items-center"
                            >
                              <span>Justifier une absence</span>
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-none shadow-md">
                        <CardContent className="p-0">
                          <div className="flex items-start">
                            <div className="p-4 flex-1">
                              <h3 className="text-base font-semibold mb-1">Notifications</h3>
                              <div className="text-2xl font-bold text-amber-500">{child.notifications}</div>
                              <div className="text-xs text-muted-foreground mt-1">Non lues</div>
                            </div>
                            <div className="bg-gradient-to-br from-amber-500 to-yellow-500 p-4 flex items-center justify-center">
                              <Bell className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="bg-amber-50 dark:bg-amber-900/20 p-2 border-t border-amber-100 dark:border-amber-900/30">
                            <Link
                              href="/dashboard/notifications"
                              className="text-xs text-amber-600 dark:text-amber-400 font-medium hover:underline flex items-center"
                            >
                              <span>Voir les notifications</span>
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Cours du jour */}
                  <motion.div variants={item}>
                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-gradient">Today&apos;s Classes</CardTitle>
                            <CardDescription>Schedule for today</CardDescription>
                          </div>
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500">
                            {new Date().toLocaleDateString("fr-FR", { weekday: "long" }).charAt(0).toUpperCase() +
                              new Date().toLocaleDateString("fr-FR", { weekday: "long" }).slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {child.todayCourses.map((course, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${course.color} transition-all hover:shadow-md`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center p-2 bg-white/60 rounded-md">
                                    <Clock className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{course.name}</h3>
                                    <p className="text-xs opacity-80">
                                      {course.room} • {course.teacher}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">{course.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <Link href="/dashboard/enfants">
                            <Button className="btn-gradient">View Full Schedule</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Dernières absences */}
                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <div>
                        <CardTitle className="text-gradient">Recent Absences</CardTitle>
                        <CardDescription>Recent absence history</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800/50 dark:hover:bg-gray-800">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                                {child.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{child.name}</h3>
                              <p className="text-sm text-muted-foreground">22/03/2023 - Journée complète</p>
                            </div>
                          </div>
                          <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-pink-500">
                            Unjustified
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800/50 dark:hover:bg-gray-800">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                                {child.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{child.name}</h3>
                              <p className="text-sm text-muted-foreground">15/03/2023 - Sciences (2h)</p>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-gradient-to-r from-green-500 to-emerald-500">
                            Justified
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800/50 dark:hover:bg-gray-800">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                                {child.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{child.name}</h3>
                              <p className="text-sm text-muted-foreground">08/03/2023 - Histoire (1h)</p>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-yellow-500">
                            Pending
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Link href="/dashboard/presences">
                          <Button className="btn-gradient">View All Absences</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
