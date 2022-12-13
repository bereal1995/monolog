import { useTodoList } from '../hooks/useTodoList'

function TodoList() {
  const { data } = useTodoList(10)

  return (
    <div>
      {data?.map((todo: any) => {
        return <div key={todo.id}>{todo.title}</div>
      })}
    </div>
  )
}

export default TodoList
