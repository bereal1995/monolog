import * as Sentry from '@sentry/nextjs'

import ExpectedError from './error'

const setScope = (err: Error, name: string) => {
  const scope = new Sentry.Scope()
  scope.setContext('error_description', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  })
  scope.setTransactionName(name)

  return scope
}

export const captureUnhandledRejection = (err: Error) => {
  Sentry.captureException(new Error('UnhandledRejection'), setScope(err, 'UnhandledRejection'))
}
export const captureExpected = (err: ExpectedError) => {
  Sentry.captureException(new Error('Expected'), setScope(err, 'Expected'))
}
