import styled from '@emotion/styled'
import { Button } from 'antd'

interface Props {
  resetErrorBoundary: (...args: unknown[]) => void
  isRetry?: boolean
}

function RejectedFallback({ resetErrorBoundary, isRetry = false }: Props) {
  return (
    <Block>
      <div>알수없는 오류가 발생하였습니다.</div>
      <div>{isRetry ? <Button onClick={() => resetErrorBoundary()}>다시 시도</Button> : '고객센터에 문의해주세요'}</div>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  white-space: pre-wrap;
`

export default RejectedFallback
