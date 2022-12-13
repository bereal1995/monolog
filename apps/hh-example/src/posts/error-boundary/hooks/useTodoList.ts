import { useQuery } from '@tanstack/react-query'

import { getTodoList } from '../api'

export const useTodoList = (limit: number, errorType: 'timeout' | 'network' | 'none' = 'none') => {
  return useQuery({
    queryKey: ['todoList', limit],
    queryFn: () => getTodoList(limit, errorType),
    suspense: true,
    useErrorBoundary: true,
    staleTime: 0,
    cacheTime: 0,
  })
}
