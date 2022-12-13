import { kyClient } from './client'

export type TodoErrorType = 'timeout' | 'network' | 'none'

export async function getTodoList(limit = 10, errorType: TodoErrorType) {
  const data: { id: number }[] = await kyClient
    .get(`error-test`, {
      searchParams: {
        errorType,
      },
    })
    .json()
  return data.filter((x) => x.id <= limit)
}
