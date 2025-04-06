"use client"

import type React from "react"

import { CurrentAssignments } from "@/components/current-assignments"
import { CalendarSection } from "@/components/calendar-section"
import { StudentAttendance } from "@/components/student-attendance"
import { Button } from "@/components/ui/button"
import { GraduationCap, Award, BookOpen, Users } from "lucide-react"

export default function Dashboard() {
  return (
    <>
      {/* Header Section with Hi Mohib and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Hi Mohib Section - Same width as Current Assignments */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Hi, Mohib 👋</h1>
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              What do you want to learn today with your partner?
            </h2>
            <p className="text-muted-foreground mb-4">
              Discover courses, track progress, and achieve your learning goals seamlessly.
            </p>
            <Button className="px-6 transition-all duration-300 hover:shadow-md">Explore Courses</Button>
          </div>
        </div>

        {/* Stats Section - All icons same size */}
        <div className="lg:col-span-1 grid grid-cols-2 gap-3">
          <StatCard
            icon={<GraduationCap className="h-5 w-5 text-white" strokeWidth={2} />}
            iconBg="bg-blue-500"
            value="155+"
            label="Completed Courses"
          />
          <StatCard
            icon={<Award className="h-5 w-5 text-white" strokeWidth={2} />}
            iconBg="bg-green-500"
            value="40+"
            label="Certificates"
          />
          <StatCard
            icon={<BookOpen className="h-5 w-5 text-white" strokeWidth={2} />}
            iconBg="bg-purple-500"
            value="27+"
            label="In Progress"
          />
          <StatCard
            icon={<Users className="h-5 w-5 text-white" strokeWidth={2} />}
            iconBg="bg-orange-500"
            value="19k+"
            label="Community"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-8">
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-8">
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

interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  value: string
  label: string
}

function StatCard({ icon, iconBg, value, label }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-600 flex flex-col items-center justify-center text-center">
      <div className={`${iconBg} p-2.5 rounded-full mb-2`}>{icon}</div>
      <div className="text-base font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

