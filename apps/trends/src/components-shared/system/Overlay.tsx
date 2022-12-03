import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  visible?: boolean
  onClick?(): void
}

function Overlay({ visible, onClick }: Props) {
  return (
    <AnimatePresence key="overlay" initial={false}>
      {visible && (
        <Fill
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClick}
        />
      )}
    </AnimatePresence>
  )
}

const Fill = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.6);
`

export default Overlay
