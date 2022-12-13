import { useMutation } from '@tanstack/react-query'

import { getTodoList } from '../api'
import { useTodoList } from '../hooks/useTodoList'

import TodoListItem from './TodoListItem'

function TodoList() {
  const { data } = useTodoList(10)
  const { mutateAsync } = useMutation({
    mutationKey: ['todoList', 10],
    mutationFn: () => getTodoList(10, 'timeout'),
    useErrorBoundary: true,
  })

  const onClickButton = async () => {
    await mutateAsync()
  }

  return (
    <div>
      <button onClick={onClickButton}>에러 발생 시키기</button>
      {data?.map((todo: any, index) => {
        return <TodoListItem key={todo.id} title={todo.title} index={index} />
      })}
    </div>
  )
}

export default TodoList
