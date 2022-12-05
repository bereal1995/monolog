import create from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Profile {
  username: string | null
  avatarUrl: string | null
}

interface SupabaseState {
  profile: Profile
  loading: boolean
  setProfile(profile: Profile): void
}

const initialState = {
  profile: {
    username: '',
    avatarUrl: '',
  },
  loading: true,
}

export const supabaseStore = create<SupabaseState>()(
  devtools((set) => ({
    ...initialState,
    setProfile: (profile) => {
      set({ profile })
    },
  })),
)

export function useSupabaseActions() {
  const setProfile = supabaseStore((state) => state.setProfile)
  return { setProfile }
}

export function useSupabaseValue() {
  const profile = supabaseStore((state) => state.profile)
  return { profile }
}
