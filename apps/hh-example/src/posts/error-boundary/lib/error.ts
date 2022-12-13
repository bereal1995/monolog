import { AxiosError } from 'axios'

export const ERROR_STATUS = {
  TIMEOUT: 408,
  UNKNOWN: 500,
}

class ExpectedError extends Error {
  constructor(public errorCode: string, message: string) {
    super(message)
  }
}

export function isExpectedError<T>(res: unknown): res is ExpectedError {
  if (typeof res !== 'object' || res == null) {
    return false
  }

  return (res as ExpectedError).errorCode != null
}

export const handleAxiosError = (error: AxiosError) => {
  if (error.code === 'ECONNABORTED' || error.response?.status === ERROR_STATUS.TIMEOUT) {
    throw new ExpectedError('408', 'Timeout')
  }

  throw new Error('Unknown error')
}

export default ExpectedError
