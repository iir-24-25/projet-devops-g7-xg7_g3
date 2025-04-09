import type React from "react"
import { DashboardLayout } from "@/app/(dashboardProf)/dashboard-layout"

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
