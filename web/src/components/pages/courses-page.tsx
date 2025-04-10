"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  User,
  Filter
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// ===================
// TYPES
// ===================

type ScheduleSlot = {
  day: string
  time: string
  location: string
}

type Course = {
  id: number
  title: string
  description: string
  instructor: string
  instructorImage: string
  level: string
  duration: string
  category: string
  color: string
  schedule: ScheduleSlot[]
}

type ApiModule = {
  nom: string
  prenom: string
  titre: string
  salle: string
  filiere: string
  niveau: string
  seance: string
  jour: string
  semestre: string
}

// ===================
// UTILS
// ===================

const seanceToTimeMap: Record<string, string> = {
  "S1": "08:00 - 10:00",
  "S2": "10:00 - 12:00",
  "S3": "13:00 - 15:00",
  "S4": "15:00 - 17:00",
  "S5": "08:00 - 10:00",
  "S6": "10:00 - 12:00"
}

const filiereColors: Record<string, string> = {
  "GC": "bg-blue-500",
  "GI": "bg-green-500",
  "GE": "bg-purple-500",
  "GM": "bg-red-500",
  "default": "bg-gray-500"
}

// ===================
// COMPONENT
// ===================

export function CoursesPage() {
  const [activeTab, setActiveTab] = useState<string>("list")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken") || "your-token-here";
        const response = await fetch(
          "http://localhost:8080/api/module/professeur/semestre?id=61999&semestre=DEUXIEME",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: ApiModule[] = await response.json();
        const transformedCourses = transformApiData(data);
        setCourses(transformedCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const transformApiData = (apiData: ApiModule[]): Course[] => {
    return apiData.map((module, index) => ({
      id: index + 1,
      title: module.titre,
      description: `Module ${module.filiere} - ${module.niveau}`,
      instructor: `${module.prenom} ${module.nom}`,
      instructorImage: `/placeholder.svg?height=40&width=40&text=${module.prenom[0]}${module.nom[0]}`,
      level: module.niveau,
      duration: "Full semester",
      category: module.filiere,
      color: filiereColors[module.filiere] || filiereColors.default,
      schedule: [
        {
          day: module.jour,
          time: seanceToTimeMap[module.seance] || "08:00 - 10:00",
          location: module.salle
        }
      ]
    }));
  }

  const daysOfWeek = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"]
  const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "13:00 - 15:00", "15:00 - 17:00"]

  const getCoursesForTimeSlot = (day: string, time: string): Course[] => {
    return courses.filter((course) =>
      course.schedule.some((schedule) => schedule.day === day && schedule.time === time)
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading courses...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Courses Schedule
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="list">Course List</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className={`h-2 ${course.color} w-full`}></div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg">{course.title}</h3>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm">{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm">{course.duration}</span>
                        </div>
                      </div>

                      <div className="border-t pt-3 mt-3">
                        <Button variant="outline" className="w-full" onClick={() => setSelectedCourse(course)}>
                          View Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-md overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-[150px_repeat(6,1fr)] border-b">
                    <div className="p-3 font-medium text-center">Time</div>
                    {daysOfWeek.map((day) => (
                      <div key={day} className="p-3 font-medium text-center border-l">
                        {day}
                      </div>
                    ))}
                  </div>

                  {timeSlots.map((timeSlot) => (
                    <div key={timeSlot} className="grid grid-cols-[150px_repeat(6,1fr)] border-b">
                      <div className="p-3 text-center flex items-center justify-center text-sm">{timeSlot}</div>
                      {daysOfWeek.map((day) => {
                        const coursesInSlot = getCoursesForTimeSlot(day, timeSlot)
                        return (
                          <div key={day} className="p-2 border-l relative min-h-[100px]">
                            {coursesInSlot.length > 0 ? (
                              <div className="space-y-2">
                                {coursesInSlot.map((course) => (
                                  <div
                                    key={course.id}
                                    className={`${course.color} rounded-lg p-2 text-white text-xs shadow-md cursor-pointer`}
                                    onClick={() => setSelectedCourse(course)}
                                  >
                                    <div className="font-bold">{course.title}</div>
                                    <div className="flex items-center gap-1 mt-1">
                                      <MapPin className="h-3 w-3" />
                                      <span className="opacity-90">
                                        {course.schedule.find((s) => s.day === day && s.time === timeSlot)?.location}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-gray-100 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 ${selectedCourse.color} -mx-6 -mt-6 rounded-t-xl mb-6`}></div>
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="h-16 w-16 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-md">
                <AvatarImage src={selectedCourse.instructorImage} alt={selectedCourse.instructor} />
                <AvatarFallback className="text-lg">
                  {selectedCourse.instructor.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold">{selectedCourse.title}</h3> {/* Corrigé ici */}
                <p className="text-sm text-muted-foreground">{selectedCourse.instructor}</p>
              </div>
            </div>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">{selectedCourse.duration}</span>
                </div>
                <Badge>{selectedCourse.level}</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Schedule:</h4>
                {selectedCourse.schedule.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>{slot.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>{slot.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Description:</h4>
              <p className="text-muted-foreground">{selectedCourse.description}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
              <Button>View Details</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}