"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "BiblioApp",
    siteDescription: "Sistema de gestión de biblioteca",
    loanDays: "14",
    notificationDays: "3",
    allowRegistration: true,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "admin@example.com",
    smtpPassword: "********",
    fromEmail: "noreply@biblioapp.com",
    fromName: "BiblioApp",
    enableNotifications: true,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setGeneralSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleEmailSwitchChange = (name: string, checked: boolean) => {
    setEmailSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("General settings submitted:", generalSettings)
    // Aquí iría la lógica para enviar los datos al backend
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email settings submitted:", emailSettings)
    // Aquí iría la lógica para enviar los datos al backend
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra la configuración del sistema</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los parámetros generales del sistema</CardDescription>
            </CardHeader>
            <form onSubmit={handleGeneralSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Nombre del Sitio</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Descripción</Label>
                    <Input
                      id="siteDescription"
                      name="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={handleGeneralChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="loanDays">Días de Préstamo por Defecto</Label>
                    <Input
                      id="loanDays"
                      name="loanDays"
                      type="number"
                      value={generalSettings.loanDays}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notificationDays">Días para Notificación de Vencimiento</Label>
                    <Input
                      id="notificationDays"
                      name="notificationDays"
                      type="number"
                      value={generalSettings.notificationDays}
                      onChange={handleGeneralChange}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowRegistration"
                    checked={generalSettings.allowRegistration}
                    onCheckedChange={(checked) => handleSwitchChange("allowRegistration", checked)}
                  />
                  <Label htmlFor="allowRegistration">Permitir registro de usuarios</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Guardar Configuración</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Email</CardTitle>
              <CardDescription>Configura los parámetros para el envío de correos</CardDescription>
            </CardHeader>
            <form onSubmit={handleEmailSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">Servidor SMTP</Label>
                    <Input
                      id="smtpServer"
                      name="smtpServer"
                      value={emailSettings.smtpServer}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Puerto SMTP</Label>
                    <Input id="smtpPort" name="smtpPort" value={emailSettings.smtpPort} onChange={handleEmailChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">Usuario SMTP</Label>
                    <Input id="smtpUser" name="smtpUser" value={emailSettings.smtpUser} onChange={handleEmailChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Contraseña SMTP</Label>
                    <Input
                      id="smtpPassword"
                      name="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">Email Remitente</Label>
                    <Input
                      id="fromEmail"
                      name="fromEmail"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromName">Nombre Remitente</Label>
                    <Input id="fromName" name="fromName" value={emailSettings.fromName} onChange={handleEmailChange} />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableNotifications"
                    checked={emailSettings.enableNotifications}
                    onCheckedChange={(checked) => handleEmailSwitchChange("enableNotifications", checked)}
                  />
                  <Label htmlFor="enableNotifications">Habilitar notificaciones por email</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Guardar Configuración</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
