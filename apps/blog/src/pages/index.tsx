import styled from '@emotion/styled'

import { useAuth } from '@/components/auth/AuthProvider'
import { wrapper } from '@/modules/store'
import { BlockType, getRootBlockChildren } from '@/api/notion'
import Card from '@/components/card'

interface Props {
  blocks: BlockType[]
}

export default function Home({ blocks }: Props) {
  const { user } = useAuth()

  return (
    <Container>
      <div>
        <img src={user?.photoUrl} alt="" />
        <h2>{user?.name}</h2>
      </div>
      <Card blocks={blocks} />
    </Container>
  )
}

const Container = styled.div`
  padding: 10px;
`

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const blocks = await getRootBlockChildren()

  return {
    props: {
      blocks,
    },
    revalidate: 30,
  }
})
