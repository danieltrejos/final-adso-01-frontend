"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, ArrowUpDown, Edit, Trash } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Publisher, PublishersService } from "@/lib/services"

export default function PublishersPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all")

  useEffect(() => {
    loadPublishers()
  }, [search, activeFilter])

  const loadPublishers = async () => {
    try {
      setLoading(true)
      const params: { search?: string; active?: boolean } = {}
      if (search) {
        params.search = search
      }
      if (activeFilter !== "all") {
        params.active = activeFilter === "active"
      }
      const data = await PublishersService.getAll(params)
      setPublishers(data)
    } catch (error) {
      console.error("Error loading publishers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await PublishersService.delete(id)
      await loadPublishers()
    } catch (error) {
      console.error("Error deleting publisher:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editoriales de Libros</h1>
          <p className="text-muted-foreground">Gestión de Editoriales</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/publishers/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Editorial
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar editoriales..."
              className="w-full pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={activeFilter} onValueChange={(value: "all" | "active" | "inactive") => setActiveFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : publishers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No se encontraron editoriales
                </TableCell>
              </TableRow>
            ) : (
              publishers.map((publisher) => (
                <TableRow key={publisher.id}>
                  <TableCell>{publisher.id}</TableCell>
                  <TableCell className="font-medium">{publisher.name}</TableCell>
                  <TableCell>
                    <Badge variant={publisher.active ? "default" : "outline"}>
                      {publisher.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/publishers/${publisher.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(publisher.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
