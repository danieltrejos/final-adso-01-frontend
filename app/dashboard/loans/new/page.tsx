"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function NewLoanPage() {
  const [formData, setFormData] = useState({
    userId: "",
    bookId: "",
    loanDate: new Date(),
    returnDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días después
  })

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, [name]: date }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí iría la lógica para enviar los datos al backend
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/loans">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Préstamo</h1>
          <p className="text-muted-foreground">Registra un nuevo préstamo de libro</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Préstamo</CardTitle>
          <CardDescription>Completa todos los campos para registrar un nuevo préstamo</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="userId">Usuario</Label>
                <Select value={formData.userId} onValueChange={(value) => handleSelectChange("userId", value)}>
                  <SelectTrigger id="userId">
                    <SelectValue placeholder="Seleccione un usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Juan Pérez</SelectItem>
                    <SelectItem value="2">María López</SelectItem>
                    <SelectItem value="3">Carlos Rodríguez</SelectItem>
                    <SelectItem value="4">Ana Martínez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookId">Libro</Label>
                <Select value={formData.bookId} onValueChange={(value) => handleSelectChange("bookId", value)}>
                  <SelectTrigger id="bookId">
                    <SelectValue placeholder="Seleccione un libro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Cien años de soledad</SelectItem>
                    <SelectItem value="2">El amor en los tiempos del cólera</SelectItem>
                    <SelectItem value="3">La casa de los espíritus</SelectItem>
                    <SelectItem value="4">Rayuela</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="loanDate">Fecha de Préstamo</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.loanDate && "text-muted-foreground",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.loanDate ? (
                        format(formData.loanDate, "PPP", { locale: es })
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.loanDate}
                      onSelect={(date) => handleDateChange("loanDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnDue">Fecha de Devolución</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.returnDue && "text-muted-foreground",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.returnDue ? (
                        format(formData.returnDue, "PPP", { locale: es })
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.returnDue}
                      onSelect={(date) => handleDateChange("returnDue", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/loans">Cancelar</Link>
            </Button>
            <Button type="submit">Registrar Préstamo</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
