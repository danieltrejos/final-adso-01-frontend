import { API_BASE_URL, defaultFetchOptions, handleApiResponse } from "../api-config"

export interface User {
  id: number
  name: string
  email: string
  role: "ADMIN" | "CLIENT"
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface UserCreateDto {
  name: string
  email: string
  password: string
  role?: "ADMIN" | "CLIENT"
}

export interface UserUpdateDto {
  name?: string
  email?: string
  password?: string
  role?: "ADMIN" | "CLIENT"
  active?: boolean
}

const BASE_URL = `${API_BASE_URL}/users`

export const UsersService = {
  // Obtener todos los usuarios
  async getAll(params: { active?: boolean; search?: string; role?: string } = {}) {
    const queryParams = new URLSearchParams()

    if (params.active !== undefined) {
      queryParams.append("active", params.active.toString())
    }

    if (params.search) {
      queryParams.append("search", params.search)
    }

    if (params.role) {
      queryParams.append("role", params.role)
    }

    const url = `${BASE_URL}?${queryParams.toString()}`
    const response = await fetch(url, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  },

  // Obtener un usuario por ID
  async getById(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  },

  // Crear un nuevo usuario
  async create(data: UserCreateDto) {
    const response = await fetch(BASE_URL, {
      ...defaultFetchOptions,
      method: "POST",
      body: JSON.stringify(data),
    })

    return handleApiResponse(response)
  },

  // Actualizar un usuario
  async update(id: number, data: UserUpdateDto) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "PATCH",
      body: JSON.stringify(data),
    })

    return handleApiResponse(response)
  },

  // Eliminar un usuario (soft delete)
  async delete(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      ...defaultFetchOptions,
      method: "DELETE",
    })

    return handleApiResponse(response)
  },

  // Restaurar un usuario eliminado
  async restore(id: number) {
    const response = await fetch(`${BASE_URL}/restore/${id}`, {
      ...defaultFetchOptions,
      method: "PATCH",
    })

    return handleApiResponse(response)
  },
}
