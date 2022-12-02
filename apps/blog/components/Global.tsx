import { useAuth } from 'context/AuthProvider'
import GlobalHeader from 'ui/components/GlobalHeader'

function Global() {
  const { user, signInWithGithub, signOut } = useAuth()
  return (
    <GlobalHeader user={user} onLogin={signInWithGithub} onLogout={signOut} />
  )
}

export default Global
