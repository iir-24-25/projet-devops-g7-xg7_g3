"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, CalendarDays, ClipboardList, Search, GraduationCap, Building, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"

const allAssignments = [
  {
    id: 1,
    title: "Basic Design",
    subtitle: "Introduction to Graphics Design",
    teacher: "Prof. Maria Rodriguez",
    dueDate: "23rd March 2022",
    branch: "Design & Arts",
    level: "Beginner - Level 1",
    submitted: 22,
    notSubmitted: 10,
    total: 32,
    category: "design",
  },
  {
    id: 2,
    title: "Advanced UI/UX",
    subtitle: "User Interface Principles",
    teacher: "Dr. James Wilson",
    dueDate: "25th March 2022",
    branch: "Digital Design",
    level: "Advanced - Level 3",
    submitted: 18,
    notSubmitted: 14,
    total: 32,
    category: "design",
  },
  {
    id: 3,
    title: "Web Development",
    subtitle: "Frontend Technologies",
    teacher: "Prof. Sarah Johnson",
    dueDate: "28th March 2022",
    branch: "Computer Science",
    level: "Intermediate - Level 2",
    submitted: 25,
    notSubmitted: 7,
    total: 32,
    category: "development",
  },
  {
    id: 4,
    title: "Database Design",
    subtitle: "SQL Fundamentals",
    teacher: "Dr. Michael Chen",
    dueDate: "30th March 2022",
    branch: "Information Systems",
    level: "Intermediate - Level 2",
    submitted: 20,
    notSubmitted: 12,
    total: 32,
    category: "development",
  },
  {
    id: 5,
    title: "Mobile App Design",
    subtitle: "iOS and Android Principles",
    teacher: "Prof. Emily Davis",
    dueDate: "2nd April 2022",
    branch: "Mobile Computing",
    level: "Advanced - Level 3",
    submitted: 15,
    notSubmitted: 17,
    total: 32,
    category: "design",
  },
  {
    id: 6,
    title: "Backend Development",
    subtitle: "Server-side Programming",
    teacher: "Dr. Robert Kim",
    dueDate: "5th April 2022",
    branch: "Software Engineering",
    level: "Advanced - Level 3",
    submitted: 12,
    notSubmitted: 20,
    total: 32,
    category: "development",
  },
]

export function CurrentAssignments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const assignmentsPerPage = 2 // Changed to 2 assignments per page

  // Filter assignments based on search term
  const filteredAssignments = allAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const indexOfLastAssignment = currentPage * assignmentsPerPage
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage
  const currentAssignments = filteredAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment)
  const totalPages = Math.ceil(filteredAssignments.length / assignmentsPerPage)

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
          Current Assignments
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search assignments..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {currentAssignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentAssignments.map((assignment) => (
              <Card
                key={assignment.id}
                className="overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 h-full transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold truncate">{assignment.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{assignment.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-500 flex-shrink-0" strokeWidth={2} />
                      <span className="text-sm font-medium truncate">{assignment.teacher}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4 text-gray-500 flex-shrink-0" strokeWidth={2} />
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          Due: {assignment.dueDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-green-500 flex-shrink-0" strokeWidth={2} />
                        <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
                          Branch: {assignment.branch}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Layers className="h-4 w-4 text-amber-500 flex-shrink-0" strokeWidth={2} />
                        <span className="text-xs text-gray-600 dark:text-gray-300 truncate">{assignment.level}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-xs font-medium text-blue-600 dark:text-blue-300">
                            {assignment.submitted}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Submitted</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900 text-xs font-medium text-orange-600 dark:text-orange-300">
                            {assignment.notSubmitted}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Not Submitted</span>
                        </div>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                          style={{
                            width: `${(assignment.submitted / assignment.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No assignments found matching your search.
          </div>
        )}

        {/* Pagination */}
        {filteredAssignments.length > assignmentsPerPage && (
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="transition-all duration-300 hover:shadow-md"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="transition-all duration-300 hover:shadow-md"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="transition-all duration-300 hover:shadow-md"
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

