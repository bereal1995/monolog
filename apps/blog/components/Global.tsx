import { useSession, useUser } from '@supabase/auth-helpers-react'
import { useSupabaseProfile } from 'hooks/useSupabaseProfile'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import GlobalHeader from 'ui/components/GlobalHeader'
import { Profiles } from './auth/Account'

function Global() {
  const user = useUser()
  const router = useRouter()
  const session = useSession()
  const [profile, setProfile] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const { getProfile, downloadImage } = useSupabaseProfile()

  console.log('profile', profile)

  useEffect(() => {
    getProfile(setProfile)
  }, [session, getProfile])

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadImage(profile.avatar_url, setAvatarUrl)
    }
  }, [profile])

  return (
    <GlobalHeader
      isLoggedIn={!!user}
      username={profile?.username ?? user?.user_metadata.name}
      avatarUrl={avatarUrl ?? user?.user_metadata.avatar_url}
      onClickLogo={() => router.push('/')}
      onLogin={() => {
        router.push('/auth')
      }}
      onClickAvatar={() => {
        router.push('/auth')
      }}
    />
  )
}

export default Global
