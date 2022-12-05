import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import { Database, SupabaseUser } from '@/types/database.types'
import { useSupabaseActions } from '@/states/supabase'

export function useSupabaseData() {
  const supabase = useSupabaseClient<Database>()
  const { setProfile } = useSupabaseActions()
  const user = useUser()

  async function getProfile() {
    try {
      if (!user) throw new Error('No user')

      const { data, error, status } = await supabase.from('User').select(`username, avatarUrl`).eq('authId', user.id).single()
      if (error && status !== 406) {
        throw error
      }

      return data
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    }
  }

  async function updateProfile({ username, avatarUrl }: { username: SupabaseUser['username']; avatarUrl: SupabaseUser['avatarUrl'] }) {
    try {
      if (!user) throw new Error('No user')

      const updates = {
        authId: user.id,
        username,
        avatarUrl,
        updatedAt: new Date().toISOString(),
      }

      const { error } = await supabase.from('User').update(updates).eq('authId', user.id)
      if (error) throw error

      setProfile({
        username,
        avatarUrl,
      })
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    }
  }

  async function downloadImage(path: string, cb: (url: string) => void) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      return url
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  return { getProfile, updateProfile, downloadImage }
}
