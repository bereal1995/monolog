import styled from '@emotion/styled'

import { useEffect, useState } from 'react'

import ModalExample from '@/src/posts/use-layout-effect/ModalExample'

function Home() {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])
  return <Block>{showChild && <ModalExample />}</Block>
}

const Block = styled.div`
  padding: 10px;
`

export default Home
