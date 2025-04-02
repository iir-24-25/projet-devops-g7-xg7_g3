"use client"

import { CurrentAssignments } from "@/components/current-assignments"
import { CalendarSection } from "@/components/calendar-section"
import { StudentAttendance } from "@/components/student-attendance"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <>
      {/* Header Section */}
      <DashboardHeader />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-8">
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="lg:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">Hi, Mohib 👋</h1>
              <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                What do you want to learn today with your partner?
              </h2>
              <p className="text-muted-foreground mb-4">
                Discover courses, track progress, and achieve your learning goals seamlessly.
              </p>
              <Button className="px-6">Explore Courses</Button>
            </div>
          </div>
          <CurrentAssignments />
          <StudentAttendance />
        </div>

        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-8">
          <CalendarSection />
        </div>
      </div>
    </>
  )
}

