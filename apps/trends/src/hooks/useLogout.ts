import { useSupabaseClient } from "@supabase/auth-helpers-react"

export function useLogout() {
  const supabase = useSupabaseClient()
  const logout = () => {
    supabase.auth.signOut()
  }

  return logout
}