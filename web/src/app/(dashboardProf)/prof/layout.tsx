// src/app/(dashboardProf)/layout.tsx
import type React from "react"
import { DashboardLayout } from "@/app/(dashboardProf)/dashboard-layout"
import { SidebarProvider } from "@/components/sidebar-context"

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  )
}