import React, { ComponentProps } from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary'

import SSRSafeSuspense from './SSRSafeSuspense'

interface Props extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  pendingFallback: ComponentProps<typeof SSRSafeSuspense>['fallback']
  RejectedFallback: React.ComponentType<{ resetErrorBoundary: (...args: unknown[]) => void }>
  children: React.ReactNode
}

function AsyncBoundary({ pendingFallback, RejectedFallback, children, onReset }: Props) {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary, error }) => {
        console.log(error, 'dsadasdsadas')

        return <RejectedFallback resetErrorBoundary={resetErrorBoundary} />
      }}
      onReset={onReset}
    >
      <SSRSafeSuspense fallback={pendingFallback}>{children}</SSRSafeSuspense>
    </ErrorBoundary>
  )
}

export default AsyncBoundary
