import styled from '@emotion/styled'
import { BlockObjectResponse, ChildPageBlockObjectResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

import CardItem from './CardItem'

interface Props {
  blocks: ListBlockChildrenResponse;
}

export default function Card ({ blocks }: Props) {
  const { results } = blocks

  return (
    <Container>
      {
        results
          .filter((block) => (block as BlockObjectResponse).type === 'child_page')
          .map((block) => {
            const { id, child_page } = block as ChildPageBlockObjectResponse
            return (
              <CardItem
                key={id}
                id={id}
                title={child_page.title}
              />
            )
          })
      }
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-template-rows: repeat(3, 600px);
  justify-content: center;
  gap: 90px 70px;
  padding: 20px;
`
