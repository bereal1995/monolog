import styled from "@emotion/styled"

interface Props {
  resetErrorBoundary: (...args: unknown[]) => void
  isRetry?: boolean
}

function RejectedFallback({ resetErrorBoundary, isRetry = false }: Props) {
  return (
    <Block>
      알수없는 오류가 발생하였습니다.
      {isRetry ? <button onClick={() => resetErrorBoundary()}>다시 시도</button> : '\n고객센터에 문의해주세요'}
    </Block>
  )
}

const Block = styled.div`
  white-space: pre-wrap;
  text-align: center;
`

export default RejectedFallback
