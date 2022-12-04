import { FetchError } from "./api/client"

export interface AppError {
  name:
    | 'Unauthorized'
    | 'Forbidden'
    | 'InvalidURL'
    | 'UserExists'
    | 'WrongCredentials'
    | 'Unknown'
    | 'BadRequest'
    | 'RefreshFailure'
    | 'NotFound'
    | 'AlreadyExists'
  statusCode: number
  message: string
  payload?: any
}

export function isAppError(e: any): e is AppError {
  if (!e) return false

  return e?.statusCode !== undefined && e?.message !== undefined && e?.name !== undefined
}

export function extractError(e: any): AppError {
  console.log(e)
  if (e instanceof FetchError) {
    const data = e.data
    if (isAppError(data)) {
      return data
    }
  }
  return {
    statusCode: 500,
    message: 'Unknown error',
    name: 'Unknown',
  }
}

// export function useNextAppErrorCatch() {
//   const caught = useCatch<ThrownResponse<number, AppError>>()
//   return caught
// }
