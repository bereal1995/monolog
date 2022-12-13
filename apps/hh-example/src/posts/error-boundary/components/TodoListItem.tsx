import styled from '@emotion/styled'

interface Props {
  title: string
  index: number
}

function TodoListItem({ title, index }: Props) {
  return (
    <Block>
      <span>{index}.</span>
      {title}
    </Block>
  )
}

const Block = styled.div`
  border-bottom: 1px solid #fcf;
  font-size: 18px;
  span {
    margin-right: 10px;
  }
`
export default TodoListItem
