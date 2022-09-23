import styled from '@emotion/styled'
import { END } from 'redux-saga'

import { useAuth } from '@/components/auth/AuthProvider'
import { wrapper } from '@/modules/store'
import { getPokemon } from '@/modules/app/reducer'

export default function Home () {
  const { user } = useAuth()

  return (
    <Container>
      <h1>Home</h1>
      <img src={user?.photoUrl} alt=""/>
      <h2>{user?.name}</h2>
    </Container>
  )
}

const Container = styled.div`

`

export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(getPokemon())
    store.dispatch(END)

    await (store as any).sagaTask.toPromise()

    return {
      props: {},
      revalidate: 30
    }
  }

)
