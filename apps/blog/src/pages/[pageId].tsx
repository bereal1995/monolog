import styled from '@emotion/styled'
import { GetServerSideProps } from 'next'

interface Props {}

export default function PageId(props: Props) {
  return (
    <Container>
      <h1>{'title'}</h1>
    </Container>
  )
}
const Container = styled.div`
  h1 {
    font-size: 30px;
    padding: 10px;
  }
`

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {},
  }
}
