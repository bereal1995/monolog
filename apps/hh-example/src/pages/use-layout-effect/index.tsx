import styled from '@emotion/styled'

import ModalExample from '@/src/posts/use-layout-effect/ModalExample'

function Home() {
  return (
    <Block>
      <ModalExample />
    </Block>
  )
}

const Block = styled.div`
  padding: 10px;
`

export default Home
