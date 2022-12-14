import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { Button, List } from 'antd'
import { useErrorHandler } from 'react-error-boundary'

import { getTodoList, TodoErrorType } from '../api'
import { useTodoList } from '../hooks/useTodoList'
import ExpectedError from '../lib/error'

function TodoList() {
  const { data } = useTodoList(10)
  const handleError = useErrorHandler()
  const { mutateAsync } = useMutation({
    mutationKey: ['todoList', 10],
    mutationFn: (errorType: TodoErrorType) => getTodoList(10, errorType),
    useErrorBoundary: true,
  })

  const onClickButton = async (errorType: TodoErrorType) => {
    if (errorType === 'timeout') {
      try {
        await mutateAsync(errorType)
      } catch (e) {
        handleError(new ExpectedError('408', 'timeout'))
      }
      return
    }

    await mutateAsync(errorType)
  }

  return (
    <Block>
      <List
        header={
          <ButtonWrapper>
            <Button onClick={() => onClickButton('timeout')}>예측가능한 에러 발생 시키기</Button>
            <Button onClick={() => onClickButton('unknown')} danger>
              알수 없는 에러 발생 시키기
            </Button>
          </ButtonWrapper>
        }
        bordered
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            {index}. {item.title}
          </List.Item>
        )}
      />
    </Block>
  )
}

const Block = styled.div`
  margin: 10px;
`
const ButtonWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`

export default TodoList
