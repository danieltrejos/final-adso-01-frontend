import { API_BASE_URL, defaultFetchOptions, handleApiResponse } from "../api-config"

export interface Book {
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

export interface BookCreateDto {
  isbn: string
  name: string
  authorId: number
  publisherId: number
  categoryId: number
  yearPublished: number
  numPages: number
}

export interface BookUpdateDto {
  isbn?: string
  name?: string
  authorId?: number
  publisherId?: number
  categoryId?: number
  yearPublished?: number
  numPages?: number
  state?: boolean
}

const BASE_URL = `${API_BASE_URL}/books`

export const BooksService = {
  // Obtener todos los libros activos
  async getAll(
    params: {
      page?: number;
      limit?: number;
      search?: string;
      authorId?: number;
      publisherId?: number;
      categoryId?: number;
    } = {},
  ) {
    const queryParams = new URLSearchParams()

    if (params.page) {
      queryParams.append("page", params.page.toString())
    }

    if (params.limit) {
      queryParams.append("limit", params.limit.toString())
    }

    if (params.search) {
      queryParams.append("search", params.search)
    }

    if (params.authorId) {
      queryParams.append("authorId", params.authorId.toString())
    }

    if (params.publisherId) {
      queryParams.append("publisherId", params.publisherId.toString())
    }

    if (params.categoryId) {
      queryParams.append("categoryId", params.categoryId.toString())
    }

    const url = `${BASE_URL}?${queryParams.toString()}`
    const response = await fetch(url, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  },

  // Obtener todos los libros inactivos
  async getAllInactive(params: { search?: string } = {}) {
    const queryParams = new URLSearchParams()

    if (params.search) {
      queryParams.append("search", params.search)
    }

    const url = `${BASE_URL}/inactive?${queryParams.toString()}`
    const response = await fetch(url, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  },

  // Obtener estadísticas de libros activos y préstamos
  async getActiveStats(): Promise<{ books: number; loans: number }> {
    const response = await fetch(`${BASE_URL}/stats/active`, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  },

  // Obtener un libro por ID
  async getById(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  },

  // Crear un nuevo libro
  async create(data: BookCreateDto) {
    const response = await fetch(BASE_URL, {
      ...defaultFetchOptions,
      method: "POST",
      body: JSON.stringify(data),
    })

    return handleApiResponse(response)
  },

  // Actualizar un libro
  async update(id: number, data: BookUpdateDto) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "PATCH",
      body: JSON.stringify(data),
    })

    return handleApiResponse(response)
  },

  // Eliminar un libro (soft delete)
  async delete(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "DELETE",
    })

    return handleApiResponse(response)
  },

  // Restaurar un libro eliminado
  async restore(id: number) {
    const response = await fetch(`${BASE_URL}/restore/${id}`, {
      ...defaultFetchOptions,
      method: "PATCH",
    })

    return handleApiResponse(response)
  },
}
