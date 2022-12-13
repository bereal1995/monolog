import { useTodoList } from '../hooks/useTodoList'

import TodoListItem from './TodoListItem'

function TodoList() {
  const { data } = useTodoList(10)

  return (
    <div>
      {data?.map((todo: any, index) => {
        return <TodoListItem key={todo.id} title={todo.title} index={index} />
      })}
    </div>
  )
}

export default TodoList
