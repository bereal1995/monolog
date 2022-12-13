interface Props {
  resetErrorBoundary: (...args: unknown[]) => void
  isRetry?: boolean
}

function RejectedFallback({ resetErrorBoundary, isRetry = false }: Props) {
  return (
    <div>
      알수없는 오류가 발생하였습니다.
      {isRetry ? <button onClick={() => resetErrorBoundary()}>다시 시도</button> : null}
    </div>
  )
}

export default RejectedFallback
