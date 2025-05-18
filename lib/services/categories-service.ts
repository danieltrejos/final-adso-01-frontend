import { API_BASE_URL, defaultFetchOptions, handleApiResponse } from "../api-config"

export interface Category {
  id: number
  name: string
  state: boolean
  createdAt: string
}

const BASE_URL = `${API_BASE_URL}/categories`

export const CategoriesService = {
  async getAll() {
    const response = await fetch(BASE_URL, {
      ...defaultFetchOptions,
      method: "GET",
    })

    return handleApiResponse(response)
  }
}
