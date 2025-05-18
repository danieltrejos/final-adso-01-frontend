"use client"

import Link from "next/link"
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
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/books")}>
              <Link href="/dashboard/books">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Libros</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/authors")}>
              <Link href="/dashboard/authors">
                <Users className="mr-2 h-4 w-4" />
                <span>Autores</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/publishers")}>
              <Link href="/dashboard/publishers">
                <Building2 className="mr-2 h-4 w-4" />
                <span>Editoriales</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/categories")}>
              <Link href="/dashboard/categories">
                <Tag className="mr-2 h-4 w-4" />
                <span>Categorías</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/loans")}>
              <Link href="/dashboard/loans">
                <BookCopy className="mr-2 h-4 w-4" />
                <span>Préstamos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/users")}>
              <Link href="/dashboard/users">
                <Users className="mr-2 h-4 w-4" />
                <span>Usuarios</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />

    </Sidebar>
  )
}
