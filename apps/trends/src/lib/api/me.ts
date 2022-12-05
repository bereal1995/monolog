import { fetchClient } from "./client"

export async function unregister() {
  const response = await fetchClient.delete('/api/me')
  return response.data
}
