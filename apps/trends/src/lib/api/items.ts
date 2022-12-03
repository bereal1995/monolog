import qs from 'qs'

import { fetchClient } from './client'
import { GetItemsResult, LikeItemResult, ListMode } from './types'

export async function getItems({ mode, cursor, startDate, endDate }: { mode: ListMode; cursor?: number; startDate?: string; endDate?: string }) {
  const response = await fetchClient.get<GetItemsResult>('/api/items'.concat(qs.stringify({ mode, cursor, startDate, endDate }, { addQueryPrefix: true })))
  return response.data
}

export async function likeItem(itemId: number, controller?: AbortController) {
  const response = await fetchClient.post<LikeItemResult>(
    `/api/items/${itemId}/likes`,
    {},
    {
      signal: controller?.signal,
    },
  )
  return response.data
}
export async function unlikeItem(itemId: number, controller?: AbortController) {
  const response = await fetchClient.delete<LikeItemResult>(`/api/items/${itemId}/likes`, {
    signal: controller?.signal,
  })
  return response.data
}