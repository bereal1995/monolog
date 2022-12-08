import { Profiles } from '@/components/auth/Account'
import { Database } from '@/components/types/database.types'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useCallback, useState } from 'react'

export function useSupabaseProfile() {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)

  const getProfile = useCallback(
    async (cb: any) => {
      try {
        setLoading(true)
        // if (!user) throw new Error('No user')
        if (!user) return

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', user.id)
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
    },
    [supabase, user]
  )

  const updateProfile = useCallback(
    async ({
      username,
      avatarUrl
    }: {
      username: Profiles['username']
      avatarUrl: Profiles['avatar_url']
    }) => {
      try {
        setLoading(true)
        if (!user) throw new Error('No user')

        const updates = {
          id: user.id,
          username,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        }

        const { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
        alert('Profile updated!')
      } catch (error) {
        alert('Error updating the data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
    [supabase, user]
  )

  const downloadImage = useCallback(
    async (path: string, cb: (url: string) => void) => {
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
    },
    [supabase.storage]
  )

  return { getProfile, updateProfile, downloadImage, loading }
}
