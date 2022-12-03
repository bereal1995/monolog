import { useSession, useUser } from '@supabase/auth-helpers-react'
import { useSupabaseProfile } from 'hooks/useSupabaseProfile'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import GlobalHeader from 'ui/components/GlobalHeader'
import { Users } from './auth/Account'

function Global() {
  const user = useUser()
  const router = useRouter()
  const session = useSession()
  const [profile, setProfile] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState<Users['avatarUrl']>(null)
  const { getProfile, downloadImage } = useSupabaseProfile()

  useEffect(() => {
    getProfile(setProfile)
  }, [session])

  useEffect(() => {
    if (profile?.avatarUrl) {
      downloadImage(profile.avatarUrl, setAvatarUrl)
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
