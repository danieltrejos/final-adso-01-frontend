import { API_BASE_URL, defaultFetchOptions, handleApiResponse } from "../api-config"

export interface Author {
  id: number
  name: string
  state: boolean
  createdAt: string
}

const BASE_URL = `${API_BASE_URL}/authors`

export const AuthorsService = {
  async getAll() {
    const response = await fetch(BASE_URL, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  }
}
