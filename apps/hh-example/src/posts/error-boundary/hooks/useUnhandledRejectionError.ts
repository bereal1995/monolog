import { useEffect } from 'react'

type Handler = (event: PromiseRejectionEvent) => void

export default function useUnhandledRejectionError(handler: Handler) {
  useEffect(() => {
    window.addEventListener('unhandledrejection', handler)

    return () => {
      window.removeEventListener('unhandledrejection', handler)
    }
  }, [handler])
}
