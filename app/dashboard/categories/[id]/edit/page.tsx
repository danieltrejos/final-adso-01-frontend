"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

// Simulación de datos para el ejemplo
const mockCategories = [
  { id: 1, name: "Ficción", state: true },
  { id: 2, name: "No Ficción", state: true },
  { id: 3, name: "Ciencia Ficción", state: true },
  { id: 4, name: "Historia", state: true },
  { id: 5, name: "Biografía", state: false },
]

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: "",
    state: true,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga de datos
    const categoryId = Number.parseInt(params.id)
    const category = mockCategories.find((c) => c.id === categoryId)

    if (category) {
      setFormData({
        name: category.name,
        state: category.state,
      })
    }

    setLoading(false)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, state: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí iría la lógica para enviar los datos al backend
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/categories">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Categoría</h1>
          <p className="text-muted-foreground">Modifica la información de la categoría</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Categoría</CardTitle>
          <CardDescription>Actualiza los campos para modificar la categoría</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nombre de la categoría"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="state" checked={formData.state} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="state">Estado: {formData.state ? "Activo" : "Inactivo"}</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/categories">Cancelar</Link>
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
