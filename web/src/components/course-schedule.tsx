"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, BookOpen, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, addDays, subDays, isSameDay, isToday } from "date-fns"

// Define the Course interface
interface Course {
  id: number
  title: string
  instructor: string
  instructorImage: string
  date: Date
  time: string
  location: string
  color: string
  category: string
}

// Course schedule data with explicit typing
const courseScheduleData: Course[] = [
  {
    id: 1,
    title: "HealthTrack Mobile App",
    instructor: "Dr. Sarah Johnson",
    instructorImage: "/placeholder.svg?height=40&width=40&text=SJ",
    date: new Date(2025, 2, 22), // March 22, 2025
    time: "10:00 - 12:00",
    location: "Room 101",
    color: "bg-blue-500",
    category: "Development",
  },
  {
    id: 2,
    title: "UI/UX Design",
    instructor: "Prof. Michael Chen",
    instructorImage: "/placeholder.svg?height=40&width=40&text=MC",
    date: new Date(2025, 2, 22), // March 22, 2025
    time: "14:00 - 16:00",
    location: "Design Studio",
    color: "bg-purple-500",
    category: "Design",
  },
  {
    id: 3,
    title: "Data Science",
    instructor: "Dr. Emily Davis",
    instructorImage: "/placeholder.svg?height=40&width=40&text=ED",
    date: new Date(2025, 2, 23), // March 23, 2025
    time: "09:00 - 11:00",
    location: "Lab 3",
    color: "bg-green-500",
    category: "Data",
  },
  {
    id: 4,
    title: "JavaScript Advanced",
    instructor: "Prof. Alex Turner",
    instructorImage: "/placeholder.svg?height=40&width=40&text=AT",
    date: new Date(2025, 2, 23), // March 23, 2025
    time: "13:00 - 15:00",
    location: "Room 205",
    color: "bg-yellow-500",
    category: "Development",
  },
  {
    id: 5,
    title: "Mobile App Development",
    instructor: "Dr. James Wilson",
    instructorImage: "/placeholder.svg?height=40&width=40&text=JW",
    date: new Date(2025, 2, 24), // March 24, 2025
    time: "10:00 - 12:00",
    location: "Lab 2",
    color: "bg-red-500",
    category: "Development",
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    instructor: "Prof. Sophia Lee",
    instructorImage: "/placeholder.svg?height=40&width=40&text=SL",
    date: new Date(2025, 2, 24), // March 24, 2025
    time: "14:00 - 16:00",
    location: "Room 301",
    color: "bg-indigo-500",
    category: "Data",
  },
]

// Time slots for the day view
const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "13:00 - 15:00", "15:00 - 17:00"]

export function CourseSchedule() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 22)) // March 22, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 22))
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null) // Type selectedCourse as Course | null
  const [viewMode, setViewMode] = useState<"week" | "day">("week") // Explicitly type viewMode

  // Generate dates for the current view - 5 days starting from current date
  const getDatesForView = (date: Date) => {
    const currentDayOfWeek = date.getDay()
    const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1
    const mondayOfWeek = subDays(date, daysToMonday)

    return Array.from({ length: 5 }).map((_, i) => {
      const dateObj = addDays(mondayOfWeek, i)
      return {
        day: format(dateObj, "dd"),
        weekday: format(dateObj, "EEE"),
        month: format(dateObj, "MMM"),
        date: dateObj,
        active: isSameDay(dateObj, selectedDate),
        isToday: isToday(dateObj),
        events: courseScheduleData.filter((item) => isSameDay(item.date, dateObj)),
      }
    })
  }

  const calendarDates = getDatesForView(currentDate)
  const filteredCourses = courseScheduleData.filter((course) => isSameDay(course.date, selectedDate))

  const prevPeriod = () => {
    setCurrentDate((prev) => subDays(prev, viewMode === "week" ? 7 : 1))
    if (viewMode === "day") {
      setSelectedDate((prev) => subDays(prev, 1))
    }
  }

  const nextPeriod = () => {
    setCurrentDate((prev) => addDays(prev, viewMode === "week" ? 7 : 1))
    if (viewMode === "day") {
      setSelectedDate((prev) => addDays(prev, 1))
    }
  }

  const goToToday = () => {
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    if (viewMode === "week") {
      setViewMode("day")
    }
  }

  const getCoursesForTimeSlot = (timeSlot: string) => {
    return filteredCourses.filter((course) => course.time === timeSlot)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "week" ? "day" : "week")
  }

  return (
    <Card className="shadow-lg border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg shadow-md">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-300">Course Schedule</CardTitle>
            <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">
              {viewMode === "week"
                ? `Week of ${format(calendarDates[0].date, "MMMM d, yyyy")}`
                : format(selectedDate, "MMMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleViewMode}
            className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm"
          >
            {viewMode === "week" ? "Day View" : "Week View"}
          </Button>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 transition-all duration-300 hover:shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800"
              onClick={prevPeriod}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="mx-1 h-8 transition-all duration-300 hover:shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800"
              onClick={goToToday}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 transition-all duration-300 hover:shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800"
              onClick={nextPeriod}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {viewMode === "week" ? (
          <>
            {/* Week View */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {calendarDates.map((date, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg relative transition-all duration-300",
                    date.active
                      ? "bg-blue-600 text-white shadow-md"
                      : date.isToday
                        ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-400 hover:shadow-md"
                        : "bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md",
                  )}
                  onClick={() => handleDateSelect(date.date)}
                >
                  <span className="text-xs font-medium">{date.weekday}</span>
                  <span className="text-2xl font-semibold">{date.day}</span>
                  <span className="text-xs">{date.month}</span>
                  {date.events.length > 0 && (
                    <div className="absolute bottom-1 flex gap-1 mt-1">
                      {date.events.slice(0, 3).map((event, i) => (
                        <div key={i} className={`h-2 w-2 rounded-full ${event.color}`}></div>
                      ))}
                      {date.events.length > 3 && <div className="h-2 w-2 rounded-full bg-gray-400"></div>}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Course cards for the week */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calendarDates.flatMap((date) =>
                date.events.map((course) => (
                  <Card
                    key={`${date.day}-${course.id}`}
                    className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className={`h-2 ${course.color} w-full`}></div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-base">{course.title}</h3>
                        <Badge className={`${course.color} bg-opacity-15 text-opacity-90`}>{course.category}</Badge>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={course.instructorImage} alt={course.instructor} />
                          <AvatarFallback className="text-xs">
                            {course.instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{course.instructor}</span>
                      </div>

                      <div className="flex flex-col space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span>{format(date.date, "EEEE, MMMM d")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span>{course.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span>{course.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )),
              )}
            </div>
          </>
        ) : (
          <>
            {/* Day View */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b bg-blue-50 dark:bg-blue-900/20">
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </h3>
              </div>

              <div className="divide-y">
                {timeSlots.map((timeSlot) => {
                  const coursesInSlot = getCoursesForTimeSlot(timeSlot)

                  return (
                    <div key={timeSlot} className="p-4">
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                        <span className="font-medium">{timeSlot}</span>
                      </div>

                      {coursesInSlot.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                          {coursesInSlot.map((course) => (
                            <div
                              key={course.id}
                              className={`${course.color} rounded-lg p-4 text-white shadow-md cursor-pointer transform transition-transform hover:scale-[1.02]`}
                              onClick={() => setSelectedCourse(course)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold">{course.title}</h4>
                                <Badge className="bg-white/20 text-white">{course.category}</Badge>
                              </div>

                              <div className="flex items-center gap-2 mb-3">
                                <Avatar className="h-6 w-6 border border-white/30">
                                  <AvatarImage src={course.instructorImage} alt={course.instructor} />
                                  <AvatarFallback className="text-xs">
                                    {course.instructor
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{course.instructor}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{course.location}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="pl-6 text-muted-foreground italic">No courses scheduled</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick stats for the day */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-3 bg-blue-500 text-white rounded-full">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Courses</p>
                    <p className="text-2xl font-bold">{filteredCourses.length}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-900/20 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-3 bg-purple-500 text-white rounded-full">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hours of Learning</p>
                    <p className="text-2xl font-bold">{filteredCourses.length * 2}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-3 bg-green-500 text-white rounded-full">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instructors</p>
                    <p className="text-2xl font-bold">{new Set(filteredCourses.map((c) => c.instructor)).size}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </CardContent>

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
                <Badge className={`${selectedCourse.color} text-white`}>{selectedCourse.category}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">{format(selectedCourse.date, "EEEE, MMMM d, yyyy")}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">{selectedCourse.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">{selectedCourse.location}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
              <Button>View Course Details</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}