import React from "react"

interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  value: string | number
  label: string
}

function StatCard({ icon, iconBg, value, label }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 flex flex-col items-center justify-center text-center">
      <div className={`${iconBg} p-2.5 rounded-full mb-2`}>{icon}</div>
      <div className="text-base font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export default StatCard
