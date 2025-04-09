"use client"

import { useState } from "react"
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

// ===================
// MOCK DATA
// ===================

const courses: Course[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn modern web development techniques and frameworks",
    instructor: "Dr. Sarah Johnson",
    instructorImage: "/placeholder.svg?height=40&width=40&text=SJ",
    level: "Intermediate",
    duration: "12 weeks",
    category: "Development",
    color: "bg-blue-500",
    schedule: [
      { day: "Monday", time: "10:00 - 12:00", location: "Room 101" },
      { day: "Wednesday", time: "14:00 - 16:00", location: "Room 101" }
    ]
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Master the principles of user interface and experience design",
    instructor: "Prof. Michael Chen",
    instructorImage: "/placeholder.svg?height=40&width=40&text=MC",
    level: "Beginner",
    duration: "8 weeks",
    category: "Design",
    color: "bg-purple-500",
    schedule: [
      { day: "Tuesday", time: "09:00 - 11:00", location: "Design Studio" },
      { day: "Thursday", time: "13:00 - 15:00", location: "Design Studio" }
    ]
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, visualization, and machine learning",
    instructor: "Dr. Emily Davis",
    instructorImage: "/placeholder.svg?height=40&width=40&text=ED",
    level: "Beginner",
    duration: "10 weeks",
    category: "Data",
    color: "bg-green-500",
    schedule: [
      { day: "Monday", time: "14:00 - 16:00", location: "Lab 3" },
      { day: "Friday", time: "10:00 - 12:00", location: "Lab 3" }
    ]
  },
  {
    id: 4,
    title: "Advanced JavaScript",
    description: "Deep dive into modern JavaScript features and frameworks",
    instructor: "Prof. Alex Turner",
    instructorImage: "/placeholder.svg?height=40&width=40&text=AT",
    level: "Advanced",
    duration: "8 weeks",
    category: "Development",
    color: "bg-yellow-500",
    schedule: [
      { day: "Tuesday", time: "14:00 - 16:00", location: "Room 205" },
      { day: "Thursday", time: "14:00 - 16:00", location: "Room 205" }
    ]
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Build native and cross-platform mobile applications",
    instructor: "Dr. James Wilson",
    instructorImage: "/placeholder.svg?height=40&width=40&text=JW",
    level: "Intermediate",
    duration: "12 weeks",
    category: "Development",
    color: "bg-red-500",
    schedule: [
      { day: "Wednesday", time: "10:00 - 12:00", location: "Lab 2" },
      { day: "Friday", time: "14:00 - 16:00", location: "Lab 2" }
    ]
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    description: "Introduction to AI concepts, algorithms, and applications",
    instructor: "Prof. Sophia Lee",
    instructorImage: "/placeholder.svg?height=40&width=40&text=SL",
    level: "Advanced",
    duration: "14 weeks",
    category: "Data",
    color: "bg-indigo-500",
    schedule: [
      { day: "Monday", time: "09:00 - 11:00", location: "Room 301" },
      { day: "Wednesday", time: "09:00 - 11:00", location: "Room 301" }
    ]
  }
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "13:00 - 15:00", "15:00 - 17:00"]

// ===================
// COMPONENT
// ===================

export function CoursesPage() {
  const [activeTab, setActiveTab] = useState<string>("list")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const getCoursesForTimeSlot = (day: string, time: string): Course[] => {
    return courses.filter((course) =>
      course.schedule.some((schedule) => schedule.day === day && schedule.time === time)
    )
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Courses
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
                  {/* Schedule Header */}
                  <div className="grid grid-cols-[150px_repeat(5,1fr)] border-b">
                    <div className="p-3 font-medium text-center">Time</div>
                    {daysOfWeek.map((day) => (
                      <div key={day} className="p-3 font-medium text-center border-l">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Schedule Body */}
                  {timeSlots.map((timeSlot) => (
                    <div key={timeSlot} className="grid grid-cols-[150px_repeat(5,1fr)] border-b">
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

      {/* Course Details Modal */}
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
                  {selectedCourse.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-2xl font-bold">{selectedCourse.title}</h3>
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
              <Button>Enroll</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
