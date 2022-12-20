import { axiosClient } from './client'

export type TodoErrorType = 'timeout' | 'none' | 'unknown'

export async function getTodoList(limit = 10, errorType: TodoErrorType  = 'none') {
  const response = await axiosClient.get(`/error-test?errorType=${errorType}`)

  const data: { id: number; title: string }[] = await response.data
  return data.filter((x) => x.id <= limit)
}
