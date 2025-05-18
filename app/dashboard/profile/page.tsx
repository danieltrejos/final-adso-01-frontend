"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Juan Pérez",
    email: "juan@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile data submitted:", profileData)
    // Aquí iría la lógica para enviar los datos al backend
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password data submitted:", {
      currentPassword: profileData.currentPassword,
      newPassword: profileData.newPassword,
      confirmPassword: profileData.confirmPassword,
    })
    // Aquí iría la lógica para enviar los datos al backend
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
        <p className="text-muted-foreground">Administra tu información personal y préstamos</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="@usuario" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{profileData.name}</CardTitle>
              <CardDescription>{profileData.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Rol:</span>
                <Badge>Administrador</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estado:</span>
                <Badge variant="outline">Activo</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Préstamos activos:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Préstamos totales:</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="account">Cuenta</TabsTrigger>
              <TabsTrigger value="loans">Préstamos</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información personal</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleProfileSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={profileData.email} onChange={handleChange} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Guardar Cambios</Button>
                    </CardFooter>
                  </form>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cambiar Contraseña</CardTitle>
                    <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
                  </CardHeader>
                  <form onSubmit={handlePasswordSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Contraseña Actual</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={profileData.currentPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva Contraseña</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={profileData.newPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={profileData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Cambiar Contraseña</Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="loans">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Préstamos</CardTitle>
                  <CardDescription>Visualiza tus préstamos actuales e históricos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Libro</TableHead>
                        <TableHead>Fecha Préstamo</TableHead>
                        <TableHead>Fecha Devolución</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          book: "Cien años de soledad",
                          loanDate: "2023-05-10",
                          returnDue: "2023-05-24",
                          returned: false,
                          overdue: false,
                        },
                        {
                          id: 2,
                          book: "El amor en los tiempos del cólera",
                          loanDate: "2023-05-15",
                          returnDue: "2023-05-29",
                          returned: false,
                          overdue: true,
                        },
                        {
                          id: 3,
                          book: "La casa de los espíritus",
                          loanDate: "2023-05-18",
                          returnDue: "2023-06-01",
                          returned: false,
                          overdue: false,
                        },
                        {
                          id: 4,
                          book: "Rayuela",
                          loanDate: "2023-04-20",
                          returnDue: "2023-05-04",
                          returned: true,
                          overdue: false,
                        },
                        {
                          id: 5,
                          book: "Pedro Páramo",
                          loanDate: "2023-04-10",
                          returnDue: "2023-04-24",
                          returned: true,
                          overdue: true,
                        },
                      ].map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.book}</TableCell>
                          <TableCell>{loan.loanDate}</TableCell>
                          <TableCell>{loan.returnDue}</TableCell>
                          <TableCell>
                            {loan.returned ? (
                              <Badge variant="outline">Devuelto</Badge>
                            ) : loan.overdue ? (
                              <Badge variant="destructive">Vencido</Badge>
                            ) : (
                              <Badge>Activo</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
