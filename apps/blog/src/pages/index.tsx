import styled from '@emotion/styled'

import { Button } from 'ui'

import { useAuth } from '@/components/auth/AuthProvider'

export default function Home () {
  const { user, signInWithGithub, signOut } = useAuth()
  return (
    <Container>
      <h1>Home</h1>
      <img src={user?.photoUrl} alt=""/>
      <h2>{user?.name}</h2>
      <Button onClick={signInWithGithub}>github 로그인</Button>
      <Button onClick={signOut}>로그아웃!</Button>
    </Container>
  )
}

const Container = styled.div`

`
