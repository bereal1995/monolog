import { useRef, useState } from 'react'

import styled from '@emotion/styled'

import useIsomorphicLayoutEffect from '@/src/hooks/useIsomorphicLayoutEffect'

function ModalExample() {
  const [showModal, setShowModal] = useState(false)
  const popup = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (popup.current === null || button.current === null) return

    const { bottom } = button.current.getBoundingClientRect()
    popup.current.style.top = `${bottom + 25}px`
  }, [showModal])

  return (
    <Block>
      <button ref={button} onClick={() => setShowModal((prev) => !prev)}>
        Show Modal
      </button>
      {showModal && (
        <div style={{ position: 'absolute' }} ref={popup}>
          이것은 모달입니다.
        </div>
      )}
    </Block>
  )
}

const Block = styled.div`
  padding: 20px;
`

export default ModalExample
