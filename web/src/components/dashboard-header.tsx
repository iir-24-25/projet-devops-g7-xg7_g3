import type React from "react"
import { GraduationCap, Award, BookOpen, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardHeader() {
  return (
    <div className="space-y-8">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<GraduationCap className="h-6 w-6 text-white" />}
          iconBg="bg-blue-500"
          value="155+"
          label="Completed Courses"
        />
        <StatCard
          icon={<Award className="h-6 w-6 text-white" />}
          iconBg="bg-green-500"
          value="40+"
          label="Earned Certificate"
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-white" />}
          iconBg="bg-purple-500"
          value="27+"
          label="Course in Progress"
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-white" />}
          iconBg="bg-orange-500"
          value="19k+"
          label="Community Support"
        />
      </div>
    </div>
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
    <Card className="shadow-sm">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          <div className={`${iconBg} p-3 rounded-full`}>{icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
          <div className="hidden md:block w-16 h-12">
            <svg viewBox="0 0 100 40" className="w-full h-full text-green-200 dark:text-green-900">
              <path
                d="M0 40 L10 30 L20 32 L30 25 L40 28 L50 20 L60 22 L70 15 L80 18 L90 10 L100 12 L100 40 Z"
                fill="currentColor"
                stroke="none"
              />
              <path
                d="M0 40 L10 30 L20 32 L30 25 L40 28 L50 20 L60 22 L70 15 L80 18 L90 10 L100 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="2"
                className="text-green-500 dark:text-green-400"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

