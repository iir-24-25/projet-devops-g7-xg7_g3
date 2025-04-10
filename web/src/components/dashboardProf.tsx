"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Users, Zap, TrendingUp, BookOpen, Calendar } from "lucide-react";
import { CalendarSection } from "@/components/calendar-section";
import { CurrentAssignments } from "@/components/current-assignments";
import { StudentAttendance } from "@/components/student-attendance";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalGroups: 0,
    totalModules: 0,
    totalSessions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      const authToken = localStorage.getItem("authToken");
      const profId = localStorage.getItem("id");

      if (!authToken || !profId) {
        setError("No authentication token or professor ID found");
        setLoading(false);
        return;
      }

      try {
        // Fetch total sessions
        const sessionsResponse = await fetch(`http://localhost:8080/api/seances/count/professeur?id=${profId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!sessionsResponse.ok) throw new Error("Failed to fetch sessions count");
        const sessionsCount = await sessionsResponse.json();

        // Fetch groups and students
        const groupsEtudResponse = await fetch(`http://localhost:8080/GroupAndEtud/Prof?idProf=${profId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!groupsEtudResponse.ok) throw new Error("Failed to fetch groups and students");
        const { groups, etudiant } = await groupsEtudResponse.json();

        // Fetch total modules
        const modulesResponse = await fetch(`http://localhost:8080/api/module/count/professeur?id=${profId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!modulesResponse.ok) throw new Error("Failed to fetch modules count");
        const modulesCount = await modulesResponse.json();

        setStats({
          totalStudents: etudiant,
          totalGroups: groups,
          totalModules: modulesCount,
          totalSessions: sessionsCount,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchStats();
    setIsLoaded(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

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
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <motion.div className="space-y-6" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
      {/* Hero Section with Stats */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome Card */}
        <Header />

        {/* Stats Column */}
        <div className="lg:col-span-1 grid grid-cols-2 gap-3 h-full">
          <StatCard
            icon={<Users className="h-4 w-4 text-white" strokeWidth={2.5} />}
            iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
            value={`${stats.totalStudents}+`}
            label="Total Students"
            color="blue"
            delay={0.3}
          />
          <StatCard
            icon={<Users className="h-4 w-4 text-white" strokeWidth={2.5} />}
            iconBg="bg-gradient-to-br from-green-500 to-green-600"
            value={`${stats.totalGroups}+`}
            label="Total Groups"
            color="green"
            delay={0.4}
          />
          <StatCard
            icon={<BookOpen className="h-4 w-4 text-white" strokeWidth={2.5} />}
            iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
            value={`${stats.totalModules}+`}
            label="Total Modules"
            color="purple"
            delay={0.5}
          />
          <StatCard
            icon={<Calendar className="h-4 w-4 text-white" strokeWidth={2.5} />}
            iconBg="bg-gradient-to-br from-amber-500 to-amber-600"
            value={`${stats.totalSessions}+`}
            label="Total Sessions"
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
          <motion.div
            className="transform transition-all duration-300 hover:-translate-y-1"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CurrentAssignments />
          </motion.div>

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
          <motion.div
            className="transform transition-all duration-300 hover:-translate-y-1"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CalendarSection />
          </motion.div>

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
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  label: string;
  color: "blue" | "green" | "purple" | "amber" | "red";
  delay?: number;
}

function StatCard({ icon, iconBg, value, label, color, delay = 0 }: StatCardProps) {
  const colorMap = {
    blue: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
    green:
      "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700",
    purple:
      "from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30 border-violet-200 dark:border-violet-800 hover:border-violet-300 dark:hover:border-violet-700",
    amber:
      "from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700",
    red: "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700",
  };

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
        className="text-base font-bold text-gray-900 dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.3 }}
      >
        {value}
      </motion.div>
      <motion.p
        className="text-xs text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.3 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

interface ProgressItemProps {
  label: string;
  value: number;
  color: "blue" | "green" | "amber";
  delay?: number;
}

function ProgressItem({ label, value, color, delay = 0 }: ProgressItemProps) {
  const colorMap = {
    blue: "from-primary to-info",
    green: "from-success to-success/80",
    amber: "from-warning to-warning/80",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}%</span>
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
  );
}

function ClipboardIcon(props: React.ComponentProps<typeof Calendar>) {
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
  );
}

function SettingsIcon(props: React.ComponentProps<typeof Calendar>) {
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
  );
}