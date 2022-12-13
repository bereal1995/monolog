interface Props {
  resetErrorBoundary: (...args: unknown[]) => void
}

function RejectedFallback({ resetErrorBoundary }: Props) {
  return (
    <div>
      알수없는 오류가 발생하였습니다.
      <button onClick={() => resetErrorBoundary()}>다시 시도</button>
    </div>
  )
}

export default RejectedFallback
