import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'

import { getTodoList, TodoErrorType } from '../api'
import { useTodoList } from '../hooks/useTodoList'

import TodoListItem from './TodoListItem'

function TodoList() {
  const { data } = useTodoList(10)
  const { mutateAsync } = useMutation({
    mutationKey: ['todoList', 10],
    mutationFn: (errorType: TodoErrorType) => getTodoList(10, errorType),
    useErrorBoundary: true,
  })

  const onClickButton = async (errorType: TodoErrorType) => {
    await mutateAsync(errorType)
  }

  return (
    <Block>
      <ButtonWrapper>
        <button onClick={() => onClickButton('timeout')}>timeout 에러 발생 시키기</button>
        <button onClick={() => onClickButton('unknown')}>알수 없는 에러 발생 시키기</button>
      </ButtonWrapper>
      {data?.map((todo: any, index) => {
        return <TodoListItem key={todo.id} title={todo.title} index={index} />
      })}
    </Block>
  )
}

const Block = styled.div`
padding: 10px;
  margin: 10px;
  border: 1px solid #000;
  border-radius: 5px;
`
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`

export default TodoList
