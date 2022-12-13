import React from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary'

import ExpectedError from '../lib/error'
import { captureExpected, captureUnhandledRejection } from '../lib/sentry'

import RejectedFallback from './RejectedFallback'
import SSRSafeSuspense from './SSRSafeSuspense'

interface Props extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  pendingFallback: React.ReactNode
  children: React.ReactNode
}

function AsyncBoundary({ pendingFallback, children, onReset }: Props) {
  return (
    <ErrorBoundary
      onReset={onReset}
      fallbackRender={({ resetErrorBoundary, error }) => {
        const isExpectedError = error instanceof ExpectedError

        if (isExpectedError) {
          captureExpected(error)
        } else {
          captureUnhandledRejection(error)
        }

        return <RejectedFallback resetErrorBoundary={resetErrorBoundary} isRetry={isExpectedError} />
      }}
    >
      <SSRSafeSuspense fallback={pendingFallback}>{children}</SSRSafeSuspense>
    </ErrorBoundary>
  )
}

export default AsyncBoundary
