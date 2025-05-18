"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { BooksService } from "@/lib/services/books-service"
import { AuthorsService } from "@/lib/services/authors-service"
import { PublishersService } from "@/lib/services/publishers-service"
import { CategoriesService } from "@/lib/services/categories-service"
import { toast } from "@/components/ui/use-toast"

interface Author {
  id: number
  name: string
}

interface Publisher {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

export default function NewBookPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [authors, setAuthors] = useState<Author[]>([])
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [formData, setFormData] = useState({
    isbn: "",
    name: "",
    authorId: "",
    publisherId: "",
    yearPublished: "",
    numPages: "",
    categoryId: "",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [authorsData, publishersData, categoriesData] = await Promise.all([
          AuthorsService.getAll(),
          PublishersService.getAll(),
          CategoriesService.getAll()
        ])

        setAuthors(authorsData)
        setPublishers(publishersData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error cargando datos:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los datos necesarios"
        })
      }
    }

    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const bookData = {
        ...formData,
        authorId: parseInt(formData.authorId),
        publisherId: parseInt(formData.publisherId),
        categoryId: parseInt(formData.categoryId),
        yearPublished: parseInt(formData.yearPublished),
        numPages: parseInt(formData.numPages)
      }

      await BooksService.create(bookData)
      toast({
        title: "Éxito",
        description: "El libro ha sido creado correctamente"
      })
      router.push('/dashboard/books')
    } catch (error) {
      console.error('Error al crear el libro:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el libro"
      })
    } finally {
      setLoading(false)
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
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Libro</h1>
          <p className="text-muted-foreground">Agrega un nuevo libro a la biblioteca</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Libro</CardTitle>
          <CardDescription>Completa todos los campos para agregar un nuevo libro</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  name="isbn"
                  placeholder="9783161484100"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ingrese el nombre del libro"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="authorId">Autor</Label>
                <Select value={formData.authorId} onValueChange={(value) => handleSelectChange("authorId", value)}>
                  <SelectTrigger id="authorId">
                    <SelectValue placeholder="Seleccione un autor" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id.toString()}>
                        {author.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publisherId">Editorial</Label>
                <Select
                  value={formData.publisherId}
                  onValueChange={(value) => handleSelectChange("publisherId", value)}
                >
                  <SelectTrigger id="publisherId">
                    <SelectValue placeholder="Seleccione una editorial" />
                  </SelectTrigger>
                  <SelectContent>
                    {publishers.map((publisher) => (
                      <SelectItem key={publisher.id} value={publisher.id.toString()}>
                        {publisher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryId">Categoría</Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleSelectChange("categoryId", value)}>
                  <SelectTrigger id="categoryId">
                    <SelectValue placeholder="Seleccione una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="yearPublished">Año de Publicación</Label>
                <Input
                  id="yearPublished"
                  name="yearPublished"
                  type="number"
                  placeholder="2023"
                  value={formData.yearPublished}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numPages">Número de Páginas</Label>
                <Input
                  id="numPages"
                  name="numPages"
                  type="number"
                  placeholder="250"
                  value={formData.numPages}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/books">Cancelar</Link>
            </Button>
            <Button type="submit">Guardar Libro</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
