"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, CheckCircle, XCircle, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type AttendanceStatus = "present" | "absent" | "";
type WeekKey = "Week 5" | "Week 6" | "Week 7";

interface Student {
  id: number;
  name: string;
  attendance: Record<WeekKey, AttendanceStatus[]>;
}

const allStudents: Student[] = [
  {
    id: 1,
    name: "John Smith",
    attendance: {
      "Week 5": ["present", "absent", "present", "present", ""],
      "Week 6": ["present", "present", "present", "absent", "present"],
      "Week 7": ["absent", "present", "present", "present", "present"],
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    attendance: {
      "Week 5": ["present", "present", "absent", "present", ""],
      "Week 6": ["present", "present", "absent", "present", "present"],
      "Week 7": ["present", "absent", "present", "present", "absent"],
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    attendance: {
      "Week 5": ["absent", "present", "present", "present", ""],
      "Week 6": ["absent", "present", "present", "present", ""],
      "Week 7": ["present", "present", "absent", "present", "present"],
    },
  },
]

const weeks: WeekKey[] = ["Week 5", "Week 6", "Week 7"];

export function StudentAttendance() {
  const [currentWeek, setCurrentWeek] = useState<WeekKey>("Week 6");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 mb-2 sm:mb-0">
          <Users className="h-5 w-5 text-[#1e3a8a] dark:text-blue-400" />
          Student Attendance
        </CardTitle>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 flex items-center gap-2 rounded-lg">
              <span>{currentWeek}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {weeks.map((week) => (
              <DropdownMenuItem
                key={week}
                onClick={() => {
                  setCurrentWeek(week);
                  setIsDropdownOpen(false);
                }}
                className={currentWeek === week ? "bg-blue-50 dark:bg-blue-900" : ""}
              >
                {week}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle p-4 md:p-0">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 pt-2 font-medium text-gray-600 dark:text-gray-300">Name</th>
                  <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Mon</th>
                  <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Tues</th>
                  <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Wed</th>
                  <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Thurs</th>
                  <th className="pb-3 pt-2 font-medium text-center text-gray-600 dark:text-gray-300">Fri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {allStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="py-4 font-medium">{student.name}</td>
                    {student.attendance[currentWeek].map((status: AttendanceStatus, index: number) => (
                      <td key={index} className="py-4 text-center">
                        {status === "present" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 flex items-center gap-1 justify-center">
                            <CheckCircle className="h-3 w-3" />
                            Present
                          </Badge>
                        )}
                        {status === "absent" && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 flex items-center gap-1 justify-center">
                            <XCircle className="h-3 w-3" />
                            Absent
                          </Badge>
                        )}
                        {status === "" && <div className="h-6"></div>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}