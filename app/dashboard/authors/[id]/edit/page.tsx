"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { AuthorsService } from "@/lib/services/authors-service"
import { useToast } from "@/hooks/use-toast"

export default function EditAuthorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    state: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadAuthor = async () => {
      try {
        setLoading(true)
        const authorId = Number.parseInt(params.id)
        const author = await AuthorsService.getById(authorId)

        setFormData({
          name: author.name,
          state: author.active,
        })
      } catch (error) {
        console.error("Error loading author:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar la información del autor",
          variant: "destructive",
        })
        router.push("/dashboard/authors")
      } finally {
        setLoading(false)
      }
    }

    loadAuthor()
  }, [params.id, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, state: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSaving(true)
      const authorId = Number.parseInt(params.id)

      await AuthorsService.update(authorId, {
        name: formData.name,
        active: formData.state,
      })

      toast({
        title: "Éxito",
        description: "Autor actualizado correctamente",
      })

      router.push("/dashboard/authors")
    } catch (error) {
      console.error("Error updating author:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el autor",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <p>Cargando información del autor...</p>
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight">Editar Autor</h1>
          <p className="text-muted-foreground">Modifica la información del autor</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Autor</CardTitle>
          <CardDescription>Actualiza los campos para modificar el autor</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nombre del autor"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={saving}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="state" checked={formData.state} onCheckedChange={handleSwitchChange} disabled={saving} />
              <Label htmlFor="state">Estado: {formData.state ? "Activo" : "Inactivo"}</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild disabled={saving}>
              <Link href="/dashboard/authors">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
