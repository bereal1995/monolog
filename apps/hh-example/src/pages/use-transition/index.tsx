import styled from '@emotion/styled'
import React, { useState, useTransition } from 'react'

import Before from '@/src/posts/use-transition/Before'
import After from '@/src/posts/use-transition/After'

function Home() {
  const [isPending, startTransition] = useTransition()
  const [input, setInput] = useState('')
  const [list, setList] = useState<string[]>([])

  const LIST_SIZE = 20000

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    startTransition(() => {
      const l = []
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(e.target.value)
      }
      setList(l)
    })
  }

  return (
    <Block>
      <div>
        <h2>useTransition 사용안한경우</h2>
        <Before />
      </div>
      <div>
        <h2>useTransition 사용</h2>
        <After />
      </div>
    </Block>
  )
}

const Block = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
`

export default Home
