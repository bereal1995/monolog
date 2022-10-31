import React, { useState } from 'react'

function Before() {
  const [input, setInput] = useState('')
  const [list, setList] = useState<string[]>([])

  const LIST_SIZE = 20000

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    const l = []
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push(e.target.value)
    }
    setList(l)
  }

  return (
    <>
      <input value={input} onChange={handleChange} />
      {list.map((item, index) => {
        return <div key={index}>{`${item}`}</div>
      })}
    </>
  )
}

export default Before
