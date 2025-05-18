"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Edit, Trash, MoreHorizontal, RotateCcw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { AuthorsService } from "@/lib/services/authors-service"
import { useToast } from "@/hooks/use-toast"

// Definición de la interfaz Author aquí para evitar problemas de importación
interface Author {
  id: number
  name: string
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    loadAuthors()
  }, [])

  const loadAuthors = async () => {
    try {
      setLoading(true)
      const params: { active?: boolean; search?: string } = {}

      if (activeFilter !== "all") {
        params.active = activeFilter === "active"
      }

      if (searchTerm) {
        params.search = searchTerm
      }

      const data = await AuthorsService.getAll(params)
      setAuthors(data)
    } catch (error) {
      console.error("Error loading authors:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los autores",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    loadAuthors()
  }

  const handleFilterChange = (value: string) => {
    setActiveFilter(value)
    loadAuthors()
  }

  const handleDelete = async (id: number) => {
    try {
      await AuthorsService.delete(id)
      toast({
        title: "Éxito",
        description: "Autor desactivado correctamente",
      })
      loadAuthors()
    } catch (error) {
      console.error("Error deleting author:", error)
      toast({
        title: "Error",
        description: "No se pudo desactivar el autor",
        variant: "destructive",
      })
    }
  }

  const handleRestore = async (id: number) => {
    try {
      await AuthorsService.restore(id)
      toast({
        title: "Éxito",
        description: "Autor restaurado correctamente",
      })
      loadAuthors()
    } catch (error) {
      console.error("Error restoring author:", error)
      toast({
        title: "Error",
        description: "No se pudo restaurar el autor",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Autores</h1>
          <p className="text-muted-foreground">Gestiona los autores de los libros</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/authors/deleted">
              <RotateCcw className="mr-2 h-4 w-4" />
              Restaurar Autores
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/authors/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Autor
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Select defaultValue={activeFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>Buscar</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <p>Cargando autores...</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No se encontraron autores
                  </TableCell>
                </TableRow>
              ) : (
                authors.map((author) => (
                  <TableRow key={author.id} className={!author.active ? "opacity-60" : ""}>
                    <TableCell>{author.id}</TableCell>
                    <TableCell className="font-medium">{author.name}</TableCell>
                    <TableCell>
                      <Badge variant={author.active ? "default" : "outline"}>
                        {author.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Acciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/authors/${author.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </Link>
                          </DropdownMenuItem>
                          {author.active ? (
                            <DropdownMenuItem onClick={() => handleDelete(author.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Desactivar</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleRestore(author.id)}>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              <span>Restaurar</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
