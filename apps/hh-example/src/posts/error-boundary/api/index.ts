import ExpectedError, { isExpectedError } from '../lib/error'

import { kyClient } from './client'

export type TodoErrorType = 'timeout' | 'network' | 'none' | 'unknown'

export async function getTodoList(limit = 10, errorType: TodoErrorType) {
  try {
    const response = await kyClient.get(`error-test`, {
      searchParams: {
        errorType,
      },
    })
    if (!response.ok) {
      throw response
    }
    const data: { id: number }[] = await response.json()
    return data.filter((x) => x.id <= limit)
  } catch (e: any) {
    const isTimeout = e.name.includes('TimeoutError')

    if (isTimeout) {
      throw new ExpectedError('408', 'timeout')
    }

    const errorData = await e.response?.json()
    if (isExpectedError(errorData)) {
      throw new ExpectedError(errorData.errorCode, errorData.message)
    }

    throw e
  }
}
