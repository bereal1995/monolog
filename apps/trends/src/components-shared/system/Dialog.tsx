import styled from '@emotion/styled'

import Button from './Button'
import Modal from './Modal'

import { colors } from '@/lib/colors'

interface Props {
  visible: boolean
  title: string
  description: string
  cancelText?: string
  confirmText?: string
  mode?: 'OK' | 'OK_CANCEL'
  onClose(): void
  onConfirm(): void
}

function Dialog({ visible, title, description, cancelText, confirmText, mode, onClose, onConfirm }: Props) {
  return (
    <StyledModal visible={visible}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Footer>
        {mode === 'OK_CANCEL' && (
          <Button variant="secondary" onClick={onClose}>
            {cancelText || '닫기'}
          </Button>
        )}
        <Button onClick={onConfirm}>{confirmText ?? '확인'}</Button>
      </Footer>
    </StyledModal>
  )
}
const StyledModal = styled(Modal)`
  width: 375px;
  max-width: calc(100vw - 32px);
  padding: 24px 16px;
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray5};
`

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  white-space: pre-wrap;
`

const Footer = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

export default Dialog
