import styled from '@emotion/styled'

import { useAuth } from '@/components/auth/AuthProvider'

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
