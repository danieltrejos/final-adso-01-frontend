import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardFooter } from "@/components/dashboard/footer"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 w-full">
          <DashboardHeader />
          <main className="flex-1 p-6 w-full">{children}</main>
          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}
