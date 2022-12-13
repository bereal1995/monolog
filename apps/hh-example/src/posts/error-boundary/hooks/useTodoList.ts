import { useQuery } from '@tanstack/react-query'

import { getTodoList } from '../api'

export const useTodoList = (limit: number) => {
  return useQuery({
    queryKey: ['todoList', limit],
    queryFn: () => getTodoList(limit),
    suspense: true,
    staleTime: 0,
    cacheTime: 0,
  })
}
