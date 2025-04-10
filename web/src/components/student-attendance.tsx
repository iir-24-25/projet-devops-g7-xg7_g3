"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  CheckCircle,
  XCircle,
  UsersRound,
  Search,
  Calendar,
  Filter,
  Edit,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { AttendanceModificationDialog } from "./attendance-modification-dialog"

const allStudents = [
  {
    id: 1,
    name: "John Smith",
    level: "Beginner - Level 1",
    class: "Web Development A",
    attendance: {
      "Week 5": ["present", "absent", "present", "present", "present", "present"],
      "Week 6": ["present", "present", "present", "absent", "present", "absent"],
      "Week 7": ["absent", "present", "present", "present", "present", "present"],
      "Week 8": ["present", "present", "absent", "present", "absent", "present"],
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    level: "Advanced - Level 3",
    class: "UI/UX Design",
    attendance: {
      "Week 5": ["present", "present", "absent", "present", "present", "absent"],
      "Week 6": ["present", "present", "absent", "present", "present", "present"],
      "Week 7": ["present", "absent", "present", "present", "absent", "absent"],
      "Week 8": ["present", "present", "present", "absent", "present", "present"],
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    level: "Intermediate - Level 2",
    class: "Data Science",
    attendance: {
      "Week 5": ["absent", "present", "present", "present", "present", "absent"],
      "Week 6": ["absent", "present", "present", "present", "present", "present"],
      "Week 7": ["present", "present", "absent", "present", "present", "absent"],
      "Week 8": ["present", "absent", "present", "present", "present", "present"],
    },
  },
  {
    id: 4,
    name: "Emily Davis",
    level: "Advanced - Level 3",
    class: "Web Development B",
    attendance: {
      "Week 5": ["present", "present", "present", "absent", "present", "absent"],
      "Week 6": ["present", "absent", "present", "present", "absent", "present"],
      "Week 7": ["absent", "present", "present", "absent", "present", "absent"],
      "Week 8": ["present", "present", "absent", "present", "present", "present"],
    },
  },
  {
    id: 5,
    name: "David Wilson",
    level: "Beginner - Level 1",
    class: "Mobile Development",
    attendance: {
      "Week 5": ["absent", "absent", "present", "present", "present", "present"],
      "Week 6": ["present", "present", "absent", "present", "present", "absent"],
      "Week 7": ["present", "present", "present", "absent", "absent", "present"],
      "Week 8": ["absent", "present", "present", "present", "present", "absent"],
    },
  },
]

const levels = ["All Levels", "Beginner - Level 1", "Intermediate - Level 2", "Advanced - Level 3"]
const classes = [
  "All Classes",
  "Web Development A",
  "Web Development B",
  "UI/UX Design",
  "Data Science",
  "Mobile Development",
]

export function StudentAttendance() {
  const [currentWeek, setCurrentWeek] = useState("Week 6")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedClass, setSelectedClass] = useState("All Classes")
  const [filteredStudents, setFilteredStudents] = useState(allStudents)
  const [selectedWeek, setSelectedWeek] = useState("Week 6")
  type Week = "Week 5" | "Week 6" | "Week 7" | "Week 8";
  const availableWeeks: Week[] = ["Week 5", "Week 6", "Week 7", "Week 8"];
  const [showFilters, setShowFilters] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isModificationDialogOpen, setIsModificationDialogOpen] = useState(false)
  const [selectedStudentForModification, setSelectedStudentForModification] = useState<any>(null)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null)
  const [hasModifications, setHasModifications] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Filter students based on search term, selected level, and selected class
  useEffect(() => {
    let result = allStudents

    // Filter by search term
    if (searchTerm) {
      result = result.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by level
    if (selectedLevel !== "All Levels") {
      result = result.filter((student) => student.level === selectedLevel)
    }

    // Filter by class
    if (selectedClass !== "All Classes") {
      result = result.filter((student) => student.class === selectedClass)
    }

    setFilteredStudents(result)
  }, [searchTerm, selectedLevel, selectedClass])

  const handleAttendanceModification = (student: any, dayIndex: number) => {
    setSelectedStudentForModification(student)
    setSelectedDayIndex(dayIndex)
    setIsModificationDialogOpen(true)
  }

  const handleModificationSave = (data: any) => {
    // In a real application, this would update the database
    // For this demo, we'll just log the changes and set a flag
    console.log("Attendance modification saved:", data)
    setHasModifications(true)
    setIsModificationDialogOpen(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const dayNames = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

  return (
    <Card className="shadow-lg border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 w-full mt-0">
      <CardHeader className="flex flex-col space-y-2 py-3 px-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-blue-800 dark:text-blue-300">
            <motion.div
              className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md"
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3,
              }}
            >
              <UsersRound className="h-5 w-5" strokeWidth={2} />
            </motion.div>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              Student Attendance
            </motion.span>
          </CardTitle>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModificationDialogOpen(true)}
              className="h-9 flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm"
            >
              <Edit className="h-4 w-4" />
              <span>Modify Attendance</span>
            </Button>

            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{selectedWeek}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[180px] p-2 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900 animate-in fade-in-80 slide-in-from-top-5"
              >
                {availableWeeks.map((week) => (
                  <DropdownMenuItem
                    key={week}
                    onClick={() => {
                      setSelectedWeek(week)
                      setCurrentWeek(week)
                      setIsDropdownOpen(false)
                    }}
                    className={cn(
                      "rounded-md cursor-pointer transition-colors",
                      currentWeek === week
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-medium"
                        : "hover:bg-blue-50 dark:hover:bg-blue-900/20",
                    )}
                  >
                    {week}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-9 flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </motion.div>
        </div>

        {/* Search and filters row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <motion.div
            className="relative flex-grow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search students..."
              className="pl-10 border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-600 transition-all rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10 rounded-lg">
                      {selectedLevel} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl shadow-lg border border-blue-100 dark:border-blue-900 animate-in fade-in-80 slide-in-from-top-5">
                    {levels.map((level) => (
                      <DropdownMenuItem
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={cn(
                          "cursor-pointer rounded-md",
                          selectedLevel === level && "font-medium bg-blue-50 dark:bg-blue-900/20",
                        )}
                      >
                        {level}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10 rounded-lg">
                      {selectedClass} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl shadow-lg border border-blue-100 dark:border-blue-900 animate-in fade-in-80 slide-in-from-top-5">
                    {classes.map((className) => (
                      <DropdownMenuItem
                        key={className}
                        onClick={() => setSelectedClass(className)}
                        className={cn(
                          "cursor-pointer rounded-md",
                          selectedClass === className && "font-medium bg-blue-50 dark:bg-blue-900/20",
                        )}
                      >
                        {className}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {hasModifications && (
          <motion.div
            className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-3 text-amber-800 dark:text-amber-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Attendance records have been manually modified</p>
              <p className="text-xs opacity-80">Changes are pending approval from the administrator</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40"
              onClick={() => setHasModifications(false)}
            >
              Dismiss
            </Button>
          </motion.div>
        )}

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle p-4 md:p-0">
            {filteredStudents.length > 0 ? (
              <motion.div
                className="rounded-xl overflow-hidden border border-blue-100 dark:border-blue-900 shadow-md"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <table className="min-w-full divide-y divide-blue-200 dark:divide-blue-800">
                  <thead className="bg-blue-50 dark:bg-blue-900/30">
                    <tr className="text-left">
                      <th className="py-2 px-3 font-semibold text-blue-800 dark:text-blue-300 text-sm">Name</th>
                      {dayNames.map((day, index) => (
                        <th
                          key={day}
                          className={cn(
                            "py-2 px-1 font-semibold text-center text-blue-800 dark:text-blue-300 text-sm",
                            index === 5 ? "bg-amber-50 dark:bg-amber-900/20" : "",
                          )}
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100 dark:divide-blue-900/50 bg-white dark:bg-gray-800">
                    {filteredStudents.slice(0, 3).map((student) => (
                      <motion.tr
                        key={student.id}
                        className="transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/10"
                        variants={item}
                      >
                        {student.attendance[currentWeek as Week].map((status: string, index: number) => (
                          <td
                            key={index}
                            className={cn(
                              "py-2 px-1 text-center relative group",
                              index === 5 ? "bg-amber-50/50 dark:bg-amber-900/10" : "",
                            )}
                          >
                            <div className="relative">
                              {status === "present" ? (
                                <Badge
                                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 flex items-center gap-1 justify-center mx-auto transition-all duration-300 hover:shadow-sm text-xs py-0.5 cursor-pointer"
                                  onClick={() => handleAttendanceModification(student, index)}
                                >
                                  <CheckCircle className="h-3 w-3" strokeWidth={2.5} />
                                  <span className="hidden sm:inline">Present</span>
                                </Badge>
                              ) : (
                                <Badge
                                  className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 flex items-center gap-1 justify-center mx-auto transition-all duration-300 hover:shadow-sm text-xs py-0.5 cursor-pointer"
                                  onClick={() => handleAttendanceModification(student, index)}
                                >
                                  <XCircle className="h-3 w-3" strokeWidth={2.5} />
                                  <span className="hidden sm:inline">Absent</span>
                                </Badge>
                              )}
                              <div className="absolute inset-0 bg-transparent group-hover:bg-blue-100/30 dark:group-hover:bg-blue-900/30 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <div className="text-center py-8 px-4 rounded-xl bg-white dark:bg-gray-800 border border-dashed border-blue-200 dark:border-blue-800">
                <UsersRound className="h-10 w-10 mx-auto text-blue-300 dark:text-blue-700 mb-2" />
                <p className="text-muted-foreground font-medium">No students found matching your search or filters.</p>
                <Button
                  variant="outline"
                  className="mt-3 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedLevel("All Levels")
                    setSelectedClass("All Classes")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
        {filteredStudents.length > 3 && (
          <div className="flex justify-center mt-3">
            <Button variant="outline" size="sm" className="text-blue-600 dark:text-blue-400">
              View All Students
            </Button>
          </div>
        )}

        {/* Summary stats */}
        {filteredStudents.length > 0 && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/30"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-all duration-300"
              variants={item}
            >
              <div className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Students</div>
              <div className="text-xl font-bold">{filteredStudents.length}</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-all duration-300"
              variants={item}
            >
              <div className="text-sm font-medium text-green-800 dark:text-green-300">Present Rate</div>
              <div className="text-xl font-bold">78%</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-all duration-300"
              variants={item}
            >
              <div className="text-sm font-medium text-red-800 dark:text-red-300">Absent Rate</div>
              <div className="text-xl font-bold">22%</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-all duration-300"
              variants={item}
            >
              <div className="text-sm font-medium text-amber-800 dark:text-amber-300">Saturday Attendance</div>
              <div className="text-xl font-bold">65%</div>
            </motion.div>
          </motion.div>
        )}
      </CardContent>

      <AttendanceModificationDialog
        isOpen={isModificationDialogOpen}
        onClose={() => setIsModificationDialogOpen(false)}
        onSave={handleModificationSave}
        student={selectedStudentForModification}
        dayIndex={selectedDayIndex}
        dayName={selectedDayIndex !== null ? dayNames[selectedDayIndex] : null}
        week={currentWeek}
      />
    </Card>
  )
}
