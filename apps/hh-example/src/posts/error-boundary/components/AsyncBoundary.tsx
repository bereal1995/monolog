import React, { ComponentProps } from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary'

import RejectedFallback from './RejectedFallback'
import SSRSafeSuspense from './SSRSafeSuspense'

interface Props extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  pendingFallback: ComponentProps<typeof SSRSafeSuspense>['fallback']
  children: React.ReactNode
}

function AsyncBoundary({ pendingFallback, children, onReset }: Props) {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary, error }) => {
        if (error?.response.status === 408) {
          return <RejectedFallback resetErrorBoundary={resetErrorBoundary} isRetry />
        }

        return <RejectedFallback resetErrorBoundary={resetErrorBoundary} />
      }}
      onReset={onReset}
    >
      <SSRSafeSuspense fallback={pendingFallback}>{children}</SSRSafeSuspense>
    </ErrorBoundary>
  )
}

export default AsyncBoundary
