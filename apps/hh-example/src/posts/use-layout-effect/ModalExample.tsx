import { useLayoutEffect, useRef, useState } from 'react'

function ModalExample() {
  const [showModal, setShowModal] = useState(false)
  const popup = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    if (popup.current === null || button.current === null) return

    const { bottom } = button.current.getBoundingClientRect()
    popup.current.style.top = `${bottom + 25}px`
  }, [showModal])

  return (
    <>
      <button ref={button} onClick={() => setShowModal((prev) => !prev)}>
        Show Modal
      </button>
      {showModal && (
        <div style={{ position: 'absolute' }} ref={popup}>
          이것은 모달입니다.
        </div>
      )}
    </>
  )
}

export default ModalExample
