"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  GraduationCap,
  UsersRound,
  Clock,
  MapPin,
  CalendarRange,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, addDays, subDays, isSameDay, isSameMonth, isToday } from "date-fns"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-mobile-prof"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Schedule data - expanded with more entries
const scheduleData = [
  {
    id: 1,
    title: "Design Principles",
    instructor: "Britt Gamble",
    role: "Sr. UI/UX designer",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 22), // March 22, 2025
    time: "09:00 - 10:30",
    duration: "1h 30m",
    status: "confirmed",
    color: "bg-blue-500",
    timeSlot: "morning",
    location: "Room 201",
  },
  {
    id: 2,
    title: "Project Management",
    instructor: "Steven Williamson",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 23), // March 23, 2025
    time: "13:00 - 15:00",
    duration: "2h",
    status: "pending",
    color: "bg-green-500",
    timeSlot: "afternoon",
    location: "Room 305",
  },
  {
    id: 3,
    title: "Mentorship Program",
    instructor: "Conrad Glass",
    role: "Course Mentor",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 24), // March 24, 2025
    time: "11:00 - 11:45",
    duration: "45m",
    status: "confirmed",
    color: "bg-purple-500",
    timeSlot: "morning",
    location: "Room 102",
  },
  {
    id: 4,
    title: "Data Analysis",
    instructor: "Emma Johnson",
    role: "Data Scientist",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 25), // March 25, 2025
    time: "14:00 - 17:00",
    duration: "3h",
    status: "confirmed",
    color: "bg-amber-500",
    timeSlot: "afternoon",
    location: "Lab 3",
  },
  {
    id: 5,
    title: "React Fundamentals",
    instructor: "Michael Chen",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 26), // March 26, 2025
    time: "10:00 - 12:15",
    duration: "2h 15m",
    status: "pending",
    color: "bg-indigo-500",
    timeSlot: "morning",
    location: "Room 401",
  },
  {
    id: 6,
    title: "UX Research Methods",
    instructor: "Sarah Parker",
    role: "UX Researcher",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 27), // March 27, 2025
    time: "09:30 - 11:30",
    duration: "2h",
    status: "confirmed",
    color: "bg-pink-500",
    timeSlot: "morning",
    location: "Design Studio",
  },
  {
    id: 7,
    title: "Backend Development",
    instructor: "Alex Turner",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 28), // March 28, 2025
    time: "13:30 - 15:30",
    duration: "2h",
    status: "confirmed",
    color: "bg-teal-500",
    timeSlot: "afternoon",
    location: "Lab 2",
  },
]

// Course time slots
const courseTimeSlots = [
  { id: "morning", label: "Morning", time: "8:00 - 12:00", icon: "☀️" },
  { id: "afternoon", label: "Afternoon", time: "13:00 - 17:00", icon: "🌤️" },
]

export function CalendarSection() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 28)) // March 28, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 28))
  const [previousDate, setPreviousDate] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState("days")
  const [activeTimeSlot, setActiveTimeSlot] = useState("morning")
  const [scheduleItems, setScheduleItems] = useState(scheduleData)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  // Check if we're on mobile
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Generate dates for the current view - 7 days starting from current date
  const getDatesForView = (date: Date) => {
    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = date.getDay()

    // Calculate the difference to get to the previous Monday
    // If today is Sunday (0), we need to go back 6 days to get to Monday
    // If today is Monday (1), we need to go back 0 days
    // If today is Tuesday (2), we need to go back 1 day, etc.
    const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1

    // Get the Monday of the current week
    const mondayOfWeek = subDays(date, daysToMonday)

    return Array.from({ length: 7 }).map((_, i) => {
      const dateObj = addDays(mondayOfWeek, i) // Start from Monday and add days

      return {
        day: format(dateObj, "dd"),
        weekday: format(dateObj, "EEE"),
        month: format(dateObj, "MMM"),
        date: dateObj,
        active: isSameDay(dateObj, selectedDate),
        isToday: isToday(dateObj),
        events: scheduleItems.filter((item) => isSameDay(item.date, dateObj)),
      }
    })
  }

  const calendarDates = getDatesForView(currentDate)

  // Filter schedule for selected date
  const filteredSchedule = scheduleItems.filter((item) =>
    activeTab === "days" ? isSameDay(item.date, selectedDate) : isSameMonth(item.date, selectedDate),
  )

  // Filter schedule for selected date and time slot
  const filteredScheduleByTimeSlot = filteredSchedule.filter((item) =>
    activeTab === "affected" ? item.timeSlot === activeTimeSlot : true,
  )

  // Navigate to previous period
  const prevPeriod = () => {
    setCurrentDate((prev) => {
      return subDays(prev, 7)
    })
  }

  // Navigate to next period
  const nextPeriod = () => {
    setCurrentDate((prev) => {
      return addDays(prev, 7)
    })
  }

  // Go to today
  const goToToday = () => {
    setPreviousDate(selectedDate)
    setCurrentDate(today)
    setSelectedDate(today)
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setPreviousDate(selectedDate)
    setSelectedDate(date)
    setCurrentDate(date)
  }

  // Handle time slot change
  const handleTimeSlotChange = (slotId: string) => {
    setActiveTimeSlot(slotId)
  }

  // Handle event click
  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
  }

  // Close event modal
  const closeEventModal = () => {
    setSelectedEvent(null)
  }

  // Available courses
  const courses = [
    "Web Development",
    "UI/UX Design",
    "Data Science",
    "Project Management",
    "Digital Marketing",
    "Mobile App Development",
  ]

  return (
    <Card className="shadow-sm overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
      <CardHeader className="pb-2 border-b">
        <div className="flex flex-col space-y-3">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
            Course Schedule
          </CardTitle>

          <div className="flex items-center justify-between">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-md"
              onClick={goToToday}
            >
              Today
            </Button>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 transition-all duration-300 hover:shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={prevPeriod}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </Button>
              <div className="mx-1 w-1 h-1 rounded-full bg-gray-400"></div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 transition-all duration-300 hover:shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={nextPeriod}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
            <TabsTrigger
              value="days"
              className="text-sm rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Days
            </TabsTrigger>
            <TabsTrigger
              value="affected"
              className="text-sm rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Affected Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="days">
            {/* Calendar dates - 4 days in top row */}
            <div className="grid grid-cols-4 gap-1 mb-2">
              {calendarDates.slice(0, 4).map((date, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg relative transition-all duration-300",
                    date.active
                      ? "bg-blue-600 text-white shadow-md"
                      : date.isToday
                        ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-400 hover:shadow-md"
                        : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md",
                  )}
                  onClick={() => {
                    setPreviousDate(selectedDate)
                    setSelectedDate(date.date)
                  }}
                >
                  <span className="text-xs font-medium">{date.weekday}</span>
                  <span className="text-lg font-semibold">{date.day}</span>
                  <span className="text-xs">{date.month}</span>
                  {date.events.length > 0 && (
                    <div className="absolute bottom-1 flex gap-0.5 mt-1">
                      {date.events.slice(0, 3).map((event, i) => (
                        <div key={i} className={`h-1.5 w-1.5 rounded-full ${event.color}`}></div>
                      ))}
                      {date.events.length > 3 && <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Calendar dates - 3 days in bottom row */}
            <div className="grid grid-cols-3 gap-1 mb-4">
              {calendarDates.slice(4, 7).map((date, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg relative transition-all duration-300",
                    date.active
                      ? "bg-blue-600 text-white shadow-md"
                      : date.isToday
                        ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-400 hover:shadow-md"
                        : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md",
                  )}
                  onClick={() => {
                    setPreviousDate(selectedDate)
                    setSelectedDate(date.date)
                  }}
                >
                  <span className="text-xs font-medium">{date.weekday}</span>
                  <span className="text-lg font-semibold">{date.day}</span>
                  <span className="text-xs">{date.month}</span>
                  {date.events.length > 0 && (
                    <div className="absolute bottom-1 flex gap-0.5 mt-1">
                      {date.events.slice(0, 3).map((event, i) => (
                        <div key={i} className={`h-1.5 w-1.5 rounded-full ${event.color}`}></div>
                      ))}
                      {date.events.length > 3 && <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Daily Schedule */}
            {filteredSchedule.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <CalendarRange className="h-4 w-4" strokeWidth={2} />
                  Schedule for {format(selectedDate, "MMMM d, yyyy")}
                </h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {filteredSchedule.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-3 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                      onClick={() => handleEventClick(item)}
                    >
                      <div className={`w-1 self-stretch rounded-full ${item.color}`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.title}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" strokeWidth={2} />
                            <span className="text-xs text-muted-foreground truncate">{item.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" strokeWidth={2} />
                            <span className="text-xs text-muted-foreground truncate">{item.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <Badge
                          variant="outline"
                          className={cn(
                            "px-2 py-0.5 text-xs mb-2 whitespace-nowrap",
                            item.status === "confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                          )}
                        >
                          {item.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                              {item.instructor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium truncate max-w-[80px]">{item.instructor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 px-4 rounded-lg bg-white dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700">
                <CalendarDays className="h-10 w-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-muted-foreground">
                  No scheduled meetings for {format(selectedDate, "MMMM d, yyyy")}
                </p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
              <div className="grid grid-cols-1 gap-4">
                {scheduleItems.slice(0, 3).map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className={`${event.color} w-full md:w-1 md:h-auto`}></div>
                      <CardContent className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-base">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{format(event.date, "EEEE, MMMM d")}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-2 py-0.5 text-xs whitespace-nowrap",
                              event.status === "confirmed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                            )}
                          >
                            {event.status === "confirmed" ? "Confirmed" : "Pending"}
                          </Badge>
                        </div>

                        <div className="mt-3 space-y-2">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                {event.instructor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{event.instructor}</span>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleEventClick(event)}>
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="affected">
            {/* Course Time Slots */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {courseTimeSlots.map((slot) => (
                <button
                  key={slot.id}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200",
                    activeTimeSlot === slot.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700",
                  )}
                  onClick={() => handleTimeSlotChange(slot.id)}
                >
                  <span className="text-2xl mb-1">{slot.icon}</span>
                  <span className="text-sm font-semibold">{slot.label}</span>
                  <span className="text-xs mt-1">{slot.time}</span>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Affected Courses for {format(selectedDate, "MMMM yyyy")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {courses.slice(0, 4).map((course, index) => (
                  <div
                    key={course}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{course}</h4>
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2 py-0.5 text-xs",
                          index % 3 === 0
                            ? "bg-green-100 text-green-800"
                            : index % 3 === 1
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800",
                        )}
                      >
                        {index % 3 === 0 ? "Active" : index % 3 === 1 ? "Upcoming" : "Pending"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 mb-1">
                      <GraduationCap className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {index % 2 === 0 ? "4 sessions" : "2 sessions"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <UsersRound className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{10 + index * 3} students</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {activeTimeSlot && filteredScheduleByTimeSlot.length > 0 && (
              <div className="space-y-3 mt-4">
                <h3 className="font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {activeTimeSlot === "morning" ? "Morning" : "Afternoon"} Schedule
                </h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {filteredScheduleByTimeSlot.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleEventClick(item)}
                    >
                      <div className={`w-1 self-stretch rounded-full ${item.color}`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.title}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" strokeWidth={2} />
                            <span className="text-xs text-muted-foreground truncate">{item.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" strokeWidth={2} />
                            <span className="text-xs text-muted-foreground truncate">{item.location}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2 py-0.5 text-xs whitespace-nowrap",
                          item.status === "confirmed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                        )}
                      >
                        {item.status === "confirmed" ? "Confirmed" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeEventModal}>
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 ${selectedEvent.color} -mx-6 -mt-6 rounded-t-lg mb-4`}></div>
            <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    {selectedEvent.instructor
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedEvent.instructor}</p>
                  <p className="text-xs text-muted-foreground">{selectedEvent.role}</p>
                </div>
              </div>
              <p className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                {selectedEvent.time} ({selectedEvent.duration})
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                {selectedEvent.location}
              </p>
              <p className="flex items-center">
                <CalendarRange className="mr-2 h-5 w-5 text-muted-foreground" />
                {format(selectedEvent.date, "EEEE, MMMM d, yyyy")}
              </p>
              <div className="flex justify-between items-center pt-2 mt-2 border-t">
                <Badge
                  className={cn(
                    "px-2 py-1",
                    selectedEvent.status === "confirmed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                  )}
                >
                  {selectedEvent.status === "confirmed" ? "Confirmed" : "Pending"}
                </Badge>
                <Button variant="outline" onClick={closeEventModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

