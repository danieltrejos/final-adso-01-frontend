"use client"

import { usePathname } from "next/navigation"
import { BookOpen, Users, BookCopy, Building2, Tag, Home, Settings, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TransitionLink } from "@/components/ui/transition-link"

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="w-64 shrink-0 border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-center gap-2 ">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">BiblioApp</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="ml-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <TransitionLink href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/books")}>
              <TransitionLink href="/dashboard/books">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Libros</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/authors")}>
              <TransitionLink href="/dashboard/authors">
                <Users className="mr-2 h-4 w-4" />
                <span>Autores</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/publishers")}>
              <TransitionLink href="/dashboard/publishers">
                <Building2 className="mr-2 h-4 w-4" />
                <span>Editoriales</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/categories")}>
              <TransitionLink href="/dashboard/categories">
                <Tag className="mr-2 h-4 w-4" />
                <span>Categorías</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/loans")}>
              <TransitionLink href="/dashboard/loans">
                <BookCopy className="mr-2 h-4 w-4" />
                <span>Préstamos</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/users")}>
              <TransitionLink href="/dashboard/users">
                <Users className="mr-2 h-4 w-4" />
                <span>Usuarios</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <TransitionLink href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <TransitionLink href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </TransitionLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
