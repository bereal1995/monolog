import { useQuery } from '@tanstack/react-query'

import { getTodoList } from '../api'

export const useTodoList = (limit: number) => {
  return useQuery({
    queryKey: ['todoList', limit],
    queryFn: () => getTodoList(limit),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  })
}
