"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, ArrowUpDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define primary color constants
const primary = {
  light: "rgba(147, 51, 234, 0.7)",
  DEFAULT: "rgb(147, 51, 234)",
  dark: "rgb(126, 34, 206)",
}

// Define props interface for StaticBadge
interface StaticBadgeProps {
  variant: "destructive" | "success" | "warning" | "default"
  children: React.ReactNode
}

// Custom StaticBadge component to avoid popups
const StaticBadge = ({ variant, children }: StaticBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variant === "destructive" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
          variant === "success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
          variant === "warning" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}
    >
      {children}
    </span>
  )
}

export default function PresencesPage() {
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

  // Données des absences (exemple)
  const absences = [
    {
      id: "1",
      date: "22/03/2023",
      course: "Mathématiques",
      duration: "Journée complète",
      status: "Non justifiée",
    },
    {
      id: "2",
      date: "15/03/2023",
      course: "Sciences",
      duration: "2 heures",
      status: "Justifiée",
    },
    {
      id: "3",
      date: "08/03/2023",
      course: "Histoire",
      duration: "1 heure",
      status: "En attente",
    },
    {
      id: "4",
      date: "01/03/2023",
      course: "Français",
      duration: "Journée complète",
      status: "Justifiée",
    },
    {
      id: "5",
      date: "22/02/2023",
      course: "Éducation Physique",
      duration: "2 heures",
      status: "Justifiée",
    },
  ]

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div>
            <Select defaultValue="thomas">
              <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="Select a child" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="thomas">Thomas Dupont</SelectItem>
                <SelectItem value="sophie">Sophie Dupont</SelectItem>
                <SelectItem value="lucas">Lucas Dupont</SelectItem>
                <SelectItem value="emma">Emma Dupont</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="absences" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="absences">Absences</TabsTrigger>
            <TabsTrigger value="statistiques">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="absences" className="space-y-6">
            {/* Absence History */}
            <Card className="border-none shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="dark:text-white">Absence History</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                        <DropdownMenuLabel className="dark:text-white">Filtrer par</DropdownMenuLabel>
                        <DropdownMenuSeparator className="dark:border-gray-700" />
                        <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                          Toutes les absences
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                          Non justifiées
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                          Justifiées
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                          En attente
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border dark:border-gray-700">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <span>Date</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider dark:text-gray-400">
                          Class
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider dark:text-gray-400">
                          Duration
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider dark:text-gray-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-white dark:bg-gray-800 dark:divide-gray-700">
                      {absences.map((absence) => (
                        <tr key={absence.id} className="hover:bg-muted/30 transition-colors dark:hover:bg-gray-700/50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium dark:text-white">{absence.date}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm dark:text-white">{absence.course}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm dark:text-white">{absence.duration}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <StaticBadge
                              variant={
                                absence.status === "Non justifiée"
                                  ? "destructive"
                                  : absence.status === "Justifiée"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {absence.status}
                            </StaticBadge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-muted-foreground dark:text-gray-400">Showing 5 of 8 absences</div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistiques" className="space-y-6">
            {/* Attendance Chart */}
            <Card className="border-none shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Attendance Statistics</CardTitle>
                <CardDescription className="dark:text-gray-400">Attendance rate over the last months</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <div className="relative w-64 h-64 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-light shadow-lg"></div>
                      <div
                        className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-700"
                        style={{
                          clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 50% 0)",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="text-3xl font-bold dark:text-white">78%</div>
                        <div className="text-sm text-muted-foreground dark:text-gray-400">Présent</div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3 dark:text-white">Attendance Distribution</h4>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary-light mr-2"></div>
                            <span className="mr-2 flex-1 dark:text-white">Present</span>
                            <span className="font-semibold dark:text-white">78%</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 mr-2"></div>
                            <span className="mr-2 flex-1 dark:text-white">Absent</span>
                            <span className="font-semibold dark:text-white">22%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 dark:text-white">Absence Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="dark:text-white">Total absences:</span>
                            <span className="font-medium dark:text-white">8 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="dark:text-white">Justified absences:</span>
                            <span className="font-medium dark:text-white">5 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="dark:text-white">Unjustified absences:</span>
                            <span className="font-medium dark:text-white">3 days</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 dark:text-white">Class Comparison</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="dark:text-white">Thomas</span>
                              <span className="dark:text-white">78%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-primary to-primary-light h-2.5 rounded-full"
                                style={{ width: "78%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="dark:text-white">Class average</span>
                              <span className="dark:text-white">92%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-green-400 to-green-500 h-2.5 rounded-full"
                                style={{ width: "92%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Monthly Evolution</CardTitle>
                <CardDescription className="dark:text-gray-400">Attendance rate over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between">
                  {[
                    { month: "Oct", value: 95 },
                    { month: "Nov", value: 88 },
                    { month: "Déc", value: 82 },
                    { month: "Jan", value: 90 },
                    { month: "Fév", value: 85 },
                    { month: "Mar", value: 78 },
                  ].map((item) => (
                    <div key={item.month} className="flex flex-col items-center group">
                      <div className="relative">
                        <div
                          className="w-16 bg-gradient-to-t from-primary/70 to-primary rounded-t-md transition-all duration-300 group-hover:from-primary/80 group-hover:to-primary group-hover:shadow-lg"
                          style={{ height: `${item.value * 2}px` }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.value}%
                        </div>
                      </div>
                      <div className="mt-2 text-sm font-medium dark:text-white">{item.month}</div>
                      <div className="text-xs text-muted-foreground dark:text-gray-400">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}