import styled from '@emotion/styled'
import { END } from 'redux-saga'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

import { useAuth } from '@/components/auth/AuthProvider'
import { wrapper } from '@/modules/store'
import { getPokemon } from '@/modules/app/reducer'
import { getNotionBlocks } from '@/api/notion'
import Card from '@/components/card'

interface Props {
  notionBlocks: ListBlockChildrenResponse;
}

export default function Home ({ notionBlocks }: Props) {
  const { user } = useAuth()

  return (
    <Container>
      <div>
        <img src={user?.photoUrl} alt=""/>
        <h2>{user?.name}</h2>
      </div>
      <Card blocks={notionBlocks} />
    </Container>
  )
}

const Container = styled.div`
  padding: 10px;
`

export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(getPokemon())
    store.dispatch(END)

    await (store as any).sagaTask.toPromise()

    const notionBlocks = await getNotionBlocks()

    return {
      props: {
        notionBlocks
      },
      revalidate: 30
    }
  }

)
