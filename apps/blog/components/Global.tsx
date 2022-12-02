import { useAuth } from 'context/AuthProvider'
import GlobalHeader from 'ui/components/GlobalHeader'

function Global() {
  const { user, signInWithGithub, signOut } = useAuth()
  return (
    <GlobalHeader
      isLogin={!!user}
      onClickAuthButton={() => {
        if (user) {
          signOut()
        } else {
          signInWithGithub()
        }
      }}
    />
  )
}

export default Global
