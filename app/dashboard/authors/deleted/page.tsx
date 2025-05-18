"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, RotateCcw } from "lucide-react"
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

export default function DeletedAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadAuthors()
  }, [])

  const loadAuthors = async () => {
    try {
      setLoading(true)
      const params: { active: boolean; search?: string } = { active: false }

      if (searchTerm) {
        params.search = searchTerm
      }

      const data = await AuthorsService.getAll(params)
      setAuthors(data)
    } catch (error) {
      console.error("Error loading deleted authors:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los autores eliminados",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    loadAuthors()
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
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/authors">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Autores Eliminados</h1>
          <p className="text-muted-foreground">Restaura autores que han sido desactivados</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
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
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <p>Cargando autores eliminados...</p>
        </div>
      ) : (
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
              {authors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No se encontraron autores eliminados
                  </TableCell>
                </TableRow>
              ) : (
                authors.map((author) => (
                  <TableRow key={author.id}>
                    <TableCell>{author.id}</TableCell>
                    <TableCell className="font-medium">{author.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Inactivo</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleRestore(author.id)}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Restaurar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
