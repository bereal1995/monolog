import { useState, useEffect } from 'react'
import {
  useUser,
  useSupabaseClient,
  Session
} from '@supabase/auth-helpers-react'
import { Database } from '../types/database.types'
import Avatar from './Avatar'
import { useRouter } from 'next/router'
import { useSupabaseProfile } from 'hooks/useSupabaseProfile'
export type Users = Database['public']['Tables']['User']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [username, setUsername] = useState<Users['username']>(null)
  // const [website, setWebsite] = useState<Users['website']>(null)
  const [avatarUrl, setAvatarUrl] = useState<Users['avatarUrl']>(null)
  const router = useRouter()
  const { getProfile, updateProfile, loading } = useSupabaseProfile()

  useEffect(() => {
    console.log('dsadsadas')
    getProfile(setProfile)
  }, [session])

  const setProfile = (
    data: {
      username: string
    } & {
      avatarUrl: string
    }
  ) => {
    console.log('data', data)
    if (data) {
      setUsername(data.username)
      setAvatarUrl(data.avatarUrl)
    }
  }

  return (
    <div className='form-widget'>
      <div className='logo'>
        <h1
          onClick={() => {
            router.back()
          }}
        >
          HH
        </h1>
      </div>

      <Avatar
        uid={user.id}
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, avatarUrl: url })
        }}
      />

      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* <div>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          type='website'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div> */}

      <div>
        <button
          className='button primary block'
          onClick={() => updateProfile({ username, avatarUrl })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className='button block'
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
