"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CalendarPlus2Icon as CalendarIcon2, BookOpen, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths, isSameDay, isSameMonth, isToday } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-mobile-prof";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
  },
  {
    id: 8,
    title: "Mobile App Design",
    instructor: "Jessica Lee",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 29), // March 29, 2025
    time: "10:00 - 12:00",
    duration: "2h",
    status: "pending",
    color: "bg-orange-500",
  },
  {
    id: 9,
    title: "Database Design",
    instructor: "David Kim",
    role: "Database Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 30), // March 30, 2025
    time: "14:00 - 16:00",
    duration: "2h",
    status: "confirmed",
    color: "bg-cyan-500",
  },
  {
    id: 10,
    title: "Content Strategy",
    instructor: "Sophia Martinez",
    role: "Content Strategist",
    avatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2025, 2, 31), // March 31, 2025
    time: "11:00 - 13:00",
    duration: "2h",
    status: "pending",
    color: "bg-red-500",
  },
];

// Course time slots
const courseTimeSlots = [
  { id: "morning", label: "Morning", time: "8:00 - 12:00", icon: "☀️" },
  { id: "afternoon", label: "Afternoon", time: "13:00 - 17:00", icon: "🌤️" },
];

export function CalendarSection() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 28)); // March 28, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 28));
  const [previousDate, setPreviousDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("days");
  const [activeTimeSlot, setActiveTimeSlot] = useState("morning");
  const [scheduleItems, setScheduleItems] = useState(scheduleData);
  const [animateItems, setAnimateItems] = useState(false);

  // Check if we're on mobile
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Animation effect when changing dates
  useEffect(() => {
    setAnimateItems(false);
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [selectedDate, activeTab]);

  // Generate dates for the current view
  const getDatesForView = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const startDay = 22; // Start from 22nd of the month

    return Array.from({ length: 10 }).map((_, i) => {
      const day = startDay + i;
      const actualMonth = day > 30 ? month + 1 : month;
      const actualDay = day > 30 ? day - 30 : day;
      const dateObj = new Date(year, actualMonth, actualDay);

      return {
        day: actualDay < 10 ? `0${actualDay}` : actualDay.toString(),
        month: format(new Date(year, actualMonth, 1), "MMM"),
        date: dateObj,
        active: isSameDay(dateObj, selectedDate),
        isToday: isToday(dateObj),
        events: scheduleItems.filter((item) => isSameDay(item.date, dateObj)),
      };
    });
  };

  const calendarDates = getDatesForView(currentDate);

  // Filter schedule for selected date
  const filteredSchedule = scheduleItems.filter((item) =>
    activeTab === "days" ? isSameDay(item.date, selectedDate) : isSameMonth(item.date, selectedDate),
  );

  // Navigate to previous period
  const prevPeriod = () => {
    setCurrentDate((prev) => {
      const newDate = subMonths(prev, 1);
      return newDate;
    });
  };

  // Navigate to next period
  const nextPeriod = () => {
    setCurrentDate((prev) => {
      const newDate = addMonths(prev, 1);
      return newDate;
    });
  };

  // Go to today
  const goToToday = () => {
    setPreviousDate(selectedDate);
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Go to previous date
  const goToPreviousDate = () => {
    if (previousDate) {
      const temp = selectedDate;
      setSelectedDate(previousDate);
      setCurrentDate(previousDate);
      setPreviousDate(temp);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setPreviousDate(selectedDate);
    setSelectedDate(date);
    setCurrentDate(date);
  };

  // Handle time slot change
  const handleTimeSlotChange = (slotId: string) => {
    setActiveTimeSlot(slotId);
  };

  // Available courses
  const courses = [
    "Web Development",
    "UI/UX Design",
    "Data Science",
    "Project Management",
    "Digital Marketing",
    "Mobile App Development",
  ];

  return (
    <Card className="shadow-sm overflow-hidden bg-blue-50 dark:bg-blue-950/20 border-0">
      <CardHeader className="pb-2 border-b">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <CalendarIcon2 className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl font-semibold">Course Schedule</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={goToToday}>
              Today
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevPeriod}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="mx-1 w-1 h-1 rounded-full bg-gray-400"></div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextPeriod}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-1">Here\'s your schedule activity for today</p> {/* Escaped ' */}

        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-white/80 dark:bg-gray-800/80 rounded-lg">
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
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Course Time Slots */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {courseTimeSlots.map((slot) => (
            <button
              key={slot.id}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200",
                activeTimeSlot === slot.id ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800",
              )}
              onClick={() => handleTimeSlotChange(slot.id)}
            >
              <span className="text-2xl mb-1">{slot.icon}</span>
              <span className="text-sm font-semibold">{slot.label}</span>
              <span className="text-xs mt-1">{slot.time}</span>
            </button>
          ))}
        </div>

        {activeTab === "days" && (
          <>
            {/* Calendar dates - first row */}
            <div className="grid grid-cols-5 gap-2 mb-2">
              {calendarDates.slice(0, 5).map((date, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg relative",
                    date.active
                      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                      : date.isToday
                        ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-400"
                        : "bg-white dark:bg-gray-800",
                  )}
                  onClick={() => {
                    setPreviousDate(selectedDate);
                    setSelectedDate(date.date);
                  }}
                >
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

            {/* Calendar dates - second row */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {calendarDates.slice(5, 10).map((date, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg relative",
                    date.active
                      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                      : date.isToday
                        ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-400"
                        : "bg-white dark:bg-gray-800",
                  )}
                  onClick={() => {
                    setPreviousDate(selectedDate);
                    setSelectedDate(date.date);
                  }}
                >
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
          </>
        )}

        {activeTab === "affected" && (
          <div className="mb-4">
            <h3 className="font-medium mb-2 text-blue-600 dark:text-blue-400">
              Affected Courses for {format(selectedDate, "MMMM yyyy")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {courses.slice(0, 4).map((course, index) => (
                <div
                  key={course}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700"
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
                    <BookOpen className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {index % 2 === 0 ? "4 sessions" : "2 sessions"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{10 + index * 3} students</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Schedule */}
        {filteredSchedule.length > 0 ? (
          <div className="space-y-3">
            <h3 className="font-medium text-blue-600 dark:text-blue-400">
              Schedule for {format(selectedDate, "MMMM d, yyyy")}
            </h3>
            <div className="space-y-2">
              {filteredSchedule.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                >
                  <div className={`w-1 self-stretch rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Instructor: {item.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-2 py-0.5 text-xs",
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
        ) : (
          <div className="text-center py-6 px-4 rounded-lg bg-white dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700">
            <CalendarIcon2 className="h-10 w-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
            <p className="text-muted-foreground">No scheduled meetings for {format(selectedDate, "MMMM d, yyyy")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}