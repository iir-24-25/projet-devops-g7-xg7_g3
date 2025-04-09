"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Award, GraduationCap, Users, Zap, TrendingUp, Clock, ArrowRight, BookOpen, Calendar } from "lucide-react"
import { CalendarSection } from "@/components/calendar-section"
import { CurrentAssignments } from "@/components/current-assignments"
import { StudentAttendance } from "@/components/student-attendance"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("today")
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const fadeIn = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Handle navigation for buttons
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <motion.div className="space-y-6" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
      {/* Hero Section with Stats */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome Card */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-xl hover:border-blue-300/70 dark:hover:border-blue-600/70 overflow-hidden transform hover:-translate-y-1">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 p-6 bg-gradient-to-br from-white/90 via-blue-50/80 to-indigo-50/80 dark:from-gray-800/90 dark:via-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg"
                    initial={{ rotate: -10, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </motion.div>
                  <motion.h1
                    className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Hi, khalid 👋
                  </motion.h1>
                </div>
                <motion.h2
                  className="text-xl font-medium text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  What do you want to learn today with your partner?
                </motion.h2>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Discover courses, track progress, and achieve your learning goals seamlessly.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Button
                    variant="default"
                    className="mt-2 group shadow-md hover:shadow-lg hover:shadow-blue-500/20 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    onClick={() => handleNavigation("/courses")}
                  >
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <motion.img
                src="/images/creative-illustration.png"
                alt="Learning illustration"
                className="max-h-[200px] object-contain relative z-10 drop-shadow-xl"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 },
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats Column */}
        <div className="lg:col-span-1 grid grid-cols-2 gap-3 h-full">
          <StatCard
            icon={<GraduationCap className="h-4 w-4 text-white" strokeWidth={2.5} />}
            iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
            value="155+"
            label="Completed Courses"
            color="blue"
            delay={0.3}
          />
          <StatCard
            icon={<Award className="h-4 w-4 text-white" strokeWidth={2.5} />}
            iconBg="bg-gradient-to-br from-green-500 to-green-600"
            value="40+"
            label="Certificates"
            color="green"
            delay={0.4}
          />
          <StatCard
            icon={<Clock className="h-4 w-4 text-white" strokeWidth={2.5} />}
            iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
            value="27+"
            label="In Progress"
            color="purple"
            delay={0.5}
          />
          <StatCard
            icon={<Users className="h-4 w-4 text-white" strokeWidth={2.5} />}
            iconBg="bg-gradient-to-br from-amber-500 to-amber-600"
            value="19k+"
            label="Community"
            color="amber"
            delay={0.6}
          />
        </div>
      </motion.div>

      {/* Quick Access Tabs */}
      <motion.div variants={fadeIn} className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {["today", "upcoming", "popular", "recommended", "recent"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-full transition-all duration-300",
              activeTab === tab
                ? "shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent"
                : "hover:border-blue-300 dark:hover:border-blue-700",
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Assignments */}
          <motion.div
            className="transform transition-all duration-300 hover:-translate-y-1"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CurrentAssignments />
          </motion.div>

          {/* Student Attendance */}
          <motion.div
            className="transform transition-all duration-300 hover:-translate-y-1"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <StudentAttendance />
          </motion.div>
        </div>

        {/* Right Column - Takes 1/3 of the width on large screens */}
        <motion.div variants={item} className="lg:col-span-1 space-y-4">
          {/* Calendar Section */}
          <motion.div
            className="transform transition-all duration-300 hover:-translate-y-1"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CalendarSection />
          </motion.div>

          {/* Quick Stats */}
          <Card className="overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-sm">
                    <TrendingUp className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span>Learning Progress</span>
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  onClick={() => handleNavigation("/statistics")}
                >
                  View Details
                </Button>
              </div>

              <div className="space-y-4">
                <ProgressItem label="Course Completion" value={78} color="blue" delay={0.3} />
                <ProgressItem label="Assignment Submission" value={92} color="green" delay={0.4} />
                <ProgressItem label="Attendance Rate" value={85} color="amber" delay={0.5} />
              </div>
            </CardContent>
          </Card>

          {/* Quick Links Card */}
          <Card className="overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-md shadow-sm">
                  <BookOpen className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                <span>Quick Access</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto py-3 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  onClick={() => handleNavigation("/calendar")}
                >
                  <Calendar className="h-5 w-5 mb-1" strokeWidth={2} />
                  <span className="text-xs">Schedule</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto py-3 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  onClick={() => handleNavigation("/assignments")}
                >
                  <ClipboardIcon className="h-5 w-5 mb-1" strokeWidth={2} />
                  <span className="text-xs">Assignments</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto py-3 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  onClick={() => handleNavigation("/students")}
                >
                  <Users className="h-5 w-5 mb-1" strokeWidth={2} />
                  <span className="text-xs">Students</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto py-3 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  onClick={() => handleNavigation("/settings")}
                >
                  <SettingsIcon className="h-5 w-5 mb-1" strokeWidth={2} />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  value: string
  label: string
  color: "blue" | "green" | "purple" | "amber" | "red"
  delay?: number
}

function StatCard({ icon, iconBg, value, label, color, delay = 0 }: StatCardProps) {
  const colorMap = {
    blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
    green:
      "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700",
    purple:
      "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700",
    amber:
      "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700",
    red: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700",
  }

  return (
    <motion.div
      className={`bg-gradient-to-br ${colorMap[color]} p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border backdrop-blur-sm transform hover:-translate-y-1 flex flex-col items-center justify-center text-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <motion.div
        className={`${iconBg} p-2.5 rounded-full mb-2 shadow-lg`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          delay: delay + 0.2,
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 },
        }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="text-base font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.3 }}
      >
        {value}
      </motion.div>
      <motion.p
        className="text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.3 }}
      >
        {label}
      </motion.p>
    </motion.div>
  )
}

interface ProgressItemProps {
  label: string
  value: number
  color: "blue" | "green" | "amber"
  delay?: number
}

function ProgressItem({ label, value, color, delay = 0 }: ProgressItemProps) {
  const colorMap = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-green-600",
    amber: "from-amber-500 to-amber-600",
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full`}
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
        ></motion.div>
      </div>
    </motion.div>
  )
}

function ClipboardIcon(props: React.ComponentProps<typeof Clock>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect width="14" height="14" x="5" y="5" rx="2" />
      <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  )
}

function SettingsIcon(props: React.ComponentProps<typeof Clock>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
