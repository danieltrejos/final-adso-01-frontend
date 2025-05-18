import { API_BASE_URL, defaultFetchOptions, handleApiResponse } from "../api-config"

export interface Loan {
  id: number
  userId: number
  bookId: number
  loanDate: string
  returnDue: string
  returnDate?: string
  returned?: boolean
  returnedAt?: string
  state?: boolean
  createdAt?: string
  updatedAt?: string
  user?: {
    id: number
    name: string
    email: string
    role: string
    state: boolean
  }
  book?: {
    id: number
    name: string
    isbn: string
    yearPublished: number
    numPages: number
    state: boolean
  }
}

export interface LoanCreateDto {
  userId: number
  bookId: number
  loanDate: string
  returnDue: string
}

export interface LoanUpdateDto {
  returnDate?: string
  active?: boolean
}

const BASE_URL = `${API_BASE_URL}/loans`

export const LoansService = {
  // Obtener todos los préstamos
  async getAll(
    params: {
      active?: boolean
      userId?: number
      bookId?: number
      returned?: boolean
      overdue?: boolean
    } = {},
  ) {
    const queryParams = new URLSearchParams()

    if (params.active !== undefined) {
      queryParams.append("active", params.active.toString())
    }

    if (params.userId) {
      queryParams.append("userId", params.userId.toString())
    }

    if (params.bookId) {
      queryParams.append("bookId", params.bookId.toString())
    }

    if (params.returned !== undefined) {
      queryParams.append("returned", params.returned.toString())
    }

    if (params.overdue !== undefined) {
      queryParams.append("overdue", params.overdue.toString())
    }

    const url = `${BASE_URL}?${queryParams.toString()}`
    const response = await fetch(url, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  },

  // Obtener un préstamo por ID
  async getById(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  },

  // Crear un nuevo préstamo
  async create(data: LoanCreateDto) {
    const response = await fetch(BASE_URL, {
      ...defaultFetchOptions,
      method: "POST",
      body: JSON.stringify(data),
    })

    return handleApiResponse(response)
  },

  // Actualizar un préstamo (marcar como devuelto)
  async update(id: number, data: LoanUpdateDto) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "PATCH",
      body: JSON.stringify(data),
    })

    return handleApiResponse(response)
  },

  // Eliminar un préstamo (soft delete)
  async delete(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "DELETE",
    })

    return handleApiResponse(response)
  },

  // Restaurar un préstamo eliminado
  async restore(id: number) {
    const response = await fetch(`${BASE_URL}/restore/${id}`, {
      ...defaultFetchOptions,
      method: "PATCH",
    })

    return handleApiResponse(response)
  },
}
