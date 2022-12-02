import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import GlobalHeader from 'ui/components/GlobalHeader'

function Global() {
  const user = useUser()
  const router = useRouter()

  return (
    <GlobalHeader
      isLoggedIn={!!user}
      username={user?.user_metadata.name}
      avatarUrl={user?.user_metadata.avatar_url}
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
