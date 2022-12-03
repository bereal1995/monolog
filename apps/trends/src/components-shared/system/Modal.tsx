import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'

import Overlay from './Overlay'

interface Props {
  visible: boolean
  className?: string
  children: React.ReactNode
}

function Modal({ className, children, visible }: Props) {
  return (
    <>
      <Overlay visible={visible} />
      <Positioner>
        <AnimatePresence key="modal">
          {visible && (
            <Block
              className={className}
              initial={{ y: '30vh', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '30vh', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.35 }}
            >
              {children}
            </Block>
          )}
        </AnimatePresence>
      </Positioner>
    </>
  )
}

const Positioner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Block = styled(motion.div)`
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`

export default Modal
