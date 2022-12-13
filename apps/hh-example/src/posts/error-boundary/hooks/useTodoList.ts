import { useQuery } from '@tanstack/react-query'

import { getTodoList, TodoErrorType } from '../api'

export const useTodoList = (limit: number, errorType: TodoErrorType = 'none') => {
  return useQuery({
    queryKey: ['todoList', limit],
    queryFn: () => getTodoList(limit, errorType),
    suspense: true,
    useErrorBoundary: true,
  })
}
