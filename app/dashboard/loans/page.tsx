"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, ArrowUpDown, Edit, Trash, MoreHorizontal, CheckCircle } from "lucide-react"
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
import { Loan, LoansService } from "@/lib/services"

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "returned" | "overdue">("all")

  useEffect(() => {
    loadLoans()
  }, [search, statusFilter])

  const loadLoans = async () => {
    try {
      setLoading(true)
      const params: { active?: boolean; returned?: boolean; overdue?: boolean } = {}

      if (statusFilter === "active") {
        params.active = true
      } else if (statusFilter === "returned") {
        params.returned = true
      } else if (statusFilter === "overdue") {
        params.overdue = true
      }

      const data = await LoansService.getAll(params)
      setLoans(data)
    } catch (error) {
      console.error("Error loading loans:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReturn = async (id: number) => {
    try {
      const returnDate = new Date().toISOString()
      await LoansService.update(id, { returnDate })
      await loadLoans()
    } catch (error) {
      console.error("Error returning loan:", error)
    }
  }

  const getDaysLeft = (returnDue: string) => {
    const now = new Date()
    const dueDate = new Date(returnDue)
    const diffTime = dueDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusBadge = (loan: Loan) => {
    if (loan.returnDate) {
      return (
        <Badge variant="outline">Devuelto</Badge>
      )
    }

    const daysLeft = getDaysLeft(loan.returnDue)
    if (daysLeft < 0) {
      return (
        <Badge variant="destructive" className="bg-destructive/20">
          Vencido ({Math.abs(daysLeft)} días)
        </Badge>
      )
    }

    return (
      <Badge variant="default">
        Activo ({daysLeft} días)
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Préstamos</h1>
          <p className="text-muted-foreground">Gestiona los préstamos de libros</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/loans/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Préstamo
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por usuario o libro..."
              className="w-full pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value: "all" | "active" | "returned" | "overdue") => setStatusFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="returned">Devueltos</SelectItem>
              <SelectItem value="overdue">Vencidos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="10">
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
            <span className="sr-only">Ordenar</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Libro</TableHead>
              <TableHead>Fecha Préstamo</TableHead>
              <TableHead>Fecha Devolución</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : loans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No se encontraron préstamos
                </TableCell>
              </TableRow>
            ) : (
              loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>{loan.id}</TableCell>
                  <TableCell className="font-medium">{loan.user?.name}</TableCell>
                  <TableCell>{loan.book?.name}</TableCell>
                  <TableCell>{new Date(loan.loanDate).toLocaleDateString()}</TableCell>
                  <TableCell>{loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : new Date(loan.returnDue).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(loan)}</TableCell>
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
                        {!loan.returnDate && (
                          <DropdownMenuItem onClick={() => handleReturn(loan.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Marcar como devuelto</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
