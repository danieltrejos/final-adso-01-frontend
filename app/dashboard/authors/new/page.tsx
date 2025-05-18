"use client"

import type React from "react"

import { useState } from "react"
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

export default function NewAuthorPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    state: true,
  })

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
      setLoading(true)

      await AuthorsService.create({
        name: formData.name,
      })

      toast({
        title: "Éxito",
        description: "Autor creado correctamente",
      })

      router.push("/dashboard/authors")
    } catch (error) {
      console.error("Error creating author:", error)
      toast({
        title: "Error",
        description: "No se pudo crear el autor",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
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
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Autor</h1>
          <p className="text-muted-foreground">Agrega un nuevo autor al sistema</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Autor</CardTitle>
          <CardDescription>Completa los campos para agregar un nuevo autor</CardDescription>
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
                disabled={loading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="state" checked={formData.state} onCheckedChange={handleSwitchChange} disabled={loading} />
              <Label htmlFor="state">Estado: {formData.state ? "Activo" : "Inactivo"}</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild disabled={loading}>
              <Link href="/dashboard/authors">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Agregar Autor"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
