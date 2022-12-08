import QueryString from 'qs'

// eslint-disable-next-line turbo/no-undeclared-env-vars
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080' : 'http://localhost:8080'

let _cookie = ''

export function setClientCookie(cookie: string) {
  _cookie = cookie
}

export function clearCookie() {
  _cookie = ''
}

export function consumeCookie(request: Request) {
  const cookie = request.headers.get('Cookie')
  if (cookie) {
    setClientCookie(cookie)
  }
}

interface RequestConfig {
  params?: any
  headers?: HeadersInit
  signal?: AbortSignal
}

export class FetchError extends Error {
  constructor(public response: Response, public data: any) {
    super(`Fetch failed with status ${response.status}`)
  }
}

async function rejectIfNeeded(response: Response) {
  if (!response.ok) {
    const data = await response.json()
    throw new FetchError(response, data)
  }

  return response
}

export const fetchClient = {
  baseUrl,
  async get<T>(url: string, config: RequestConfig = {}) {
    const query = config?.params ? QueryString.stringify(config.params, { addQueryPrefix: true }) : ''
    const response = await fetch(this.baseUrl.concat(url, query), {
      method: 'GET',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
    })
    await rejectIfNeeded(response)
    const data: T = await response.json()
    const { headers } = response
    return {
      data,
      headers,
    }
  },
  async post<T>(url: string, body?: any, config: RequestConfig = {}) {
    console.log('_cookie', _cookie)
    const response = await fetch(this.baseUrl.concat(url), {
      method: 'POST',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      signal: config?.signal,
      body: body ? JSON.stringify(body) : undefined,
    })
    await rejectIfNeeded(response)
    const responseData: T = await response.json()
    const { headers } = response
    return {
      data: responseData,
      headers,
    }
  },
  async patch<T>(url: string, body: any, config: RequestConfig = {}) {
    const response = await fetch(this.baseUrl.concat(url), {
      method: 'PATCH',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      signal: config?.signal,
      body: JSON.stringify(body),
    })
    await rejectIfNeeded(response)
    const responseData: T = await response.json()
    const { headers } = response
    return {
      data: responseData,
      headers,
    }
  },
  async delete<T>(url: string, config: RequestConfig = {}) {
    const query = config?.params ? QueryString.stringify(config?.params, { addQueryPrefix: true }) : ''

    const response = await fetch(this.baseUrl.concat(url, query), {
      method: 'DELETE',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      signal: config?.signal,
    })
    await rejectIfNeeded(response)

    const data: T = response.headers.get('Content-Type')?.includes('json') ? await response.json() : ((await response.text()) as any)

    const { headers } = response
    return {
      data,
      headers,
    }
  },
}
