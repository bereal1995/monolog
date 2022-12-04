import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { AppError } from '@/lib/error'

interface WriteState {
  form: {
    link: string
    title: string
    body: string
  }
  error?: AppError
  change(key: keyof WriteState['form'], value: string): void
  setError(error: AppError): void
}

const initialState: WriteState = {
  form: {
    link: '',
    title: '',
    body: '',
  },
  error: undefined,
  change: () => { },
  setError: () => { },
}

export const useWriteStore = create<WriteState>()(
  devtools((set) => ({
    ...initialState,
    change(key: keyof WriteState['form'], value: string) {
      set((state) => ({
        ...state,
        form: {
          ...state.form,
          [key]: value,
        },
      }))
    },
    setError(error: AppError) {
      set((state) => ({
        ...state,
        error,
      }))
    },
  })),
)

export function useWriteActions() {
  const change = useWriteStore((state) => state.change)
  const setError = useWriteStore((state) => state.setError)
  return { change, setError }
}

export function useWriteValue() {
  const { form, error } = useWriteStore()
  return { form, error }
}