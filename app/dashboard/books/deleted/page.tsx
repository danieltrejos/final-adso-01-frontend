"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, RotateCcw } from "lucide-react"
import { BooksService } from "@/lib/services/books-service"
import { useToast } from "@/hooks/use-toast"

// Definición de la interfaz Book para evitar problemas de importación
interface Book {
  id: number
  isbn: string
  name: string
  authorId: number
  publisherId: number
  categoryId: number
  yearPublished: number
  numPages: number
  state: boolean
  createdAt?: string
  updatedAt?: string
  author?: {
    id: number
    name: string
  }
  publisher?: {
    id: number
    name: string
  }
  category?: {
    id: number
    name: string
  }
}

export default function DeletedBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setLoading(true)
      const params = {
        search: searchTerm || undefined
      }

      const data = await BooksService.getAllInactive(params)
      setBooks(data)
    } catch (error) {
      console.error("Error loading deleted books:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los libros eliminados",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    loadBooks()
  }

  const handleRestore = async (id: number) => {
    try {
      await BooksService.restore(id)
      toast({
        title: "Éxito",
        description: "Libro restaurado correctamente",
      })
      loadBooks()
    } catch (error) {
      console.error("Error restoring book:", error)
      toast({
        title: "Error",
        description: "No se pudo restaurar el libro",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/books">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Libros Eliminados</h1>
          <p className="text-muted-foreground">Restaura libros que han sido desactivados</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por título o ISBN..."
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
          <p>Cargando libros eliminados...</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ISBN</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Editorial</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No se encontraron libros eliminados
                  </TableCell>
                </TableRow>
              ) : (
                books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell className="font-medium">{book.name}</TableCell>
                    <TableCell>{book.author?.name || "N/A"}</TableCell>
                    <TableCell>{book.publisher?.name || "N/A"}</TableCell>
                    <TableCell>{book.category?.name || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{book.state ? "Activo" : "Inactivo"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleRestore(book.id)}>
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
