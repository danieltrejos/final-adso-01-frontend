"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, BookCopy, Building2, Tag } from "lucide-react"
import Link from "next/link"
import { BooksService, AuthorsService, PublishersService, CategoriesService } from "@/lib/services"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    books: 0,
    authors: 0,
    loans: 0,
    categories: 0,
    publishers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        const [booksStats, authorsResponse, publishersResponse, categoriesResponse] = await Promise.all([
          BooksService.getActiveStats(),
          AuthorsService.getAll(),
          PublishersService.getAll(),
          CategoriesService.getAll(),
        ])

        setStats({
          books: booksStats?.books ?? 0,
          loans: booksStats?.loans ?? 0,
          authors: authorsResponse?.filter(a => a.active)?.length ?? 0,
          publishers: publishersResponse?.filter(p => p.active)?.length ?? 0,
          categories: categoriesResponse?.filter(c => c.active)?.length ?? 0,
        })
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
        <p className="text-muted-foreground">Bienvenido al panel de administración de BiblioApp</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Libros Activos</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.books}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Autores</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.authors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Préstamos Activos</CardTitle>
            <BookCopy className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.loans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Editoriales</CardTitle>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.publishers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Administrar categorías</CardTitle>
            <CardDescription>Agregar, editar y eliminar categorías de libros.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tag className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Categorías</p>
                  <p className="text-xs text-muted-foreground">{loading ? '...' : `${stats.categories} categorías activas`}</p>
                </div>
              </div>
              <Link
                href="/dashboard/categories"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Ir a Categorías
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Administrar libros</CardTitle>
            <CardDescription>Agregar, editar y eliminar libros en la Biblioteca.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Libros</p>
                  <p className="text-xs text-muted-foreground">{loading ? '...' : `${stats.books} libros activos`}</p>
                </div>
              </div>
              <Link
                href="/dashboard/books"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Ir a Libros
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Administrar autores</CardTitle>
            <CardDescription>Agregar, editar y eliminar autores de libros.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Autores</p>
                  <p className="text-xs text-muted-foreground">{loading ? '...' : `${stats.authors} autores registrados`}</p>
                </div>
              </div>
              <Link
                href="/dashboard/authors"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Ir a Autores
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Administrar editoriales</CardTitle>
            <CardDescription>Agregar, editar y eliminar editoriales de libros.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Editoriales</p>
                  <p className="text-xs text-muted-foreground">{loading ? '...' : `${stats.publishers} editoriales activas`}</p>
                </div>
              </div>
              <Link
                href="/dashboard/publishers"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Ir a Editoriales
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
