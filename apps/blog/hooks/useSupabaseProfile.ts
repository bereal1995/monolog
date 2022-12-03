import { Users } from '@/components/auth/Account'
import { Database } from '@/components/types/database.types'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export function useSupabaseProfile() {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)

  async function getProfile(cb: any) {
    try {
      setLoading(true)
      // if (!user) throw new Error('No user')
      if (!user) return

      const { data, error, status } = await supabase
        .from('User')
        .select(`username, avatarUrl`)
        .eq('authId', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      cb(data)
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    avatarUrl
  }: {
    username: Users['username']
    avatarUrl: Users['avatarUrl']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        authId: user.id,
        username,
        avatarUrl,
        updatedAt: new Date().toISOString()
      }

      const { error } = await supabase
        .from('User')
        .update(updates)
        .eq('authId', user.id)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function downloadImage(path: string, cb: (url: string) => void) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      cb(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  return { getProfile, updateProfile, downloadImage, loading }
}
