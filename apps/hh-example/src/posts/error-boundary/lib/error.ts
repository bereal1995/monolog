class ExpectedError extends Error {
  constructor(public errorCode: string, message: string) {
    super(message)
  }
}

const a = new ExpectedError('408', 'timeout')
const b = a.errorCode

export function isExpectedError<T>(res: unknown): res is ExpectedError {
  if (typeof res !== 'object' || res == null) {
    return false
  }

  return (res as ExpectedError).errorCode != null
}

export default ExpectedError
