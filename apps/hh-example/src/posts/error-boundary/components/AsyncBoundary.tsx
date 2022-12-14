import React from 'react'
import { ErrorBoundary, ErrorBoundaryPropsWithRender } from 'react-error-boundary'

import SSRSafeSuspense from './SSRSafeSuspense'

export interface AsyncBoundaryProps extends Omit<ErrorBoundaryPropsWithRender, 'fallbackRender'> {
  rejectedFallback: ErrorBoundaryPropsWithRender['fallbackRender']
  pendingFallback: React.ReactNode
  children: React.ReactNode
}

function AsyncBoundary({ rejectedFallback, pendingFallback, children, ...errorBoundaryProps }: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallbackRender={rejectedFallback} {...errorBoundaryProps}>
      <SSRSafeSuspense fallback={pendingFallback}>{children}</SSRSafeSuspense>
    </ErrorBoundary>
  )
}

export default AsyncBoundary
