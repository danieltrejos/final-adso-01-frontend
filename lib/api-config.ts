// Configuración base para la API
export const API_BASE_URL = "http://localhost:3001/api/v1"

// Opciones por defecto para fetch
export const defaultFetchOptions = {
  headers: {
    "Content-Type": "application/json",
  },
}

// Función para manejar errores de la API
export async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Error en la petición")
  }
  return response.json()
}
