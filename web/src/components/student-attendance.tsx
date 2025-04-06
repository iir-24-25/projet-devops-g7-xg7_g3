"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, CheckCircle, XCircle, UsersRound, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Définir les types pour les données des étudiants
interface Attendance {
  [week: string]: string[] // Signature d'index pour permettre n'importe quelle clé de type string
}

interface Student {
  id: number
  name: string
  level: string
  class: string
  attendance: Attendance
}

const allStudents: Student[] = [
  {
    id: 1,
    name: "John Smith",
    level: "Beginner - Level 1",
    class: "Web Development A",
    attendance: {
      "Week 5": ["present", "absent", "present", "present", "present"],
      "Week 6": ["present", "present", "present", "absent", "present"],
      "Week 7": ["absent", "present", "present", "present", "present"],
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    level: "Advanced - Level 3",
    class: "UI/UX Design",
    attendance: {
      "Week 5": ["present", "present", "absent", "present", "present"],
      "Week 6": ["present", "present", "absent", "present", "present"],
      "Week 7": ["present", "absent", "present", "present", "absent"],
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    level: "Intermediate - Level 2",
    class: "Data Science",
    attendance: {
      "Week 5": ["absent", "present", "present", "present", "present"],
      "Week 6": ["absent", "present", "present", "present", "present"],
      "Week 7": ["present", "present", "absent", "present", "present"],
    },
  },
  {
    id: 4,
    name: "Emily Davis",
    level: "Advanced - Level 3",
    class: "Web Development B",
    attendance: {
      "Week 5": ["present", "present", "present", "absent", "present"],
      "Week 6": ["present", "absent", "present", "present", "absent"],
      "Week 7": ["absent", "present", "present", "absent", "present"],
    },
  },
  {
    id: 5,
    name: "David Wilson",
    level: "Beginner - Level 1",
    class: "Mobile Development",
    attendance: {
      "Week 5": ["absent", "absent", "present", "present", "present"],
      "Week 6": ["present", "present", "absent", "present", "present"],
      "Week 7": ["present", "present", "present", "absent", "absent"],
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
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(allStudents)
  const [selectedWeek, setSelectedWeek] = useState("Week 6")
  const availableWeeks = ["Week 5", "Week 6", "Week 7", "Week 8"]

  const weeks = ["Week 5", "Week 6", "Week 7"]

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

  // Get the current filter display text
  const getFilterDisplayText = () => {
    if (selectedLevel !== "All Levels" && selectedClass !== "All Classes") {
      return "Multiple Filters"
    } else if (selectedLevel !== "All Levels") {
      return selectedLevel
    } else if (selectedClass !== "All Classes") {
      return selectedClass
    } else {
      return "Filter"
    }
  }

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
      <CardHeader className="flex flex-col space-y-3 pb-2 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <UsersRound className="h-5 w-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
            Student Attendance
          </CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 flex items-center gap-2 rounded-lg">
                  <span>{selectedWeek}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {availableWeeks.map((week) => (
                  <DropdownMenuItem
                    key={week}
                    onClick={() => {
                      setSelectedWeek(week)
                      setCurrentWeek(week)
                      setIsDropdownOpen(false)
                    }}
                    className={currentWeek === week ? "bg-blue-50 dark:bg-blue-900" : ""}
                  >
                    {week}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Elastic search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search students..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle p-4 md:p-0">
            {filteredStudents.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="text-left">
                    <th className="pb-3 pt-2 font-medium text-gray-600 dark:text-gray-300">Name</th>
                    <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Mon</th>
                    <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Tues</th>
                    <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Wed</th>
                    <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Thurs</th>
                    <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Fri</th>
                    <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Sat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-4 font-medium">{student.name}</td>
                      {student.attendance[currentWeek].map((status: string, index: number) => (
                        <td key={index} className="py-4 text-center">
                          {status === "present" && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 flex items-center gap-1 justify-center mx-auto transition-all duration-300 hover:shadow-sm">
                              <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                              Present
                            </Badge>
                          )}
                          {status === "absent" && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 flex items-center gap-1 justify-center mx-auto transition-all duration-300 hover:shadow-sm">
                              <XCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                              Absent
                            </Badge>
                          )}
                        </td>
                      ))}
                      {/* Saturday attendance status */}
                      <td className="py-4 text-center">
                        <Badge
                          className={`${
                            Math.random() > 0.5
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900"
                          } 
                          flex items-center gap-1 justify-center mx-auto`}
                        >
                          {Math.random() > 0.5 ? (
                            <>
                              <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                              Present
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                              Absent
                            </>
                          )}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No students found matching your search or filters.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}