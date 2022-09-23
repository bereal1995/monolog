import React, { useContext, useEffect, useState } from 'react'

import { AuthSession, User as RawUser } from '@supabase/supabase-js'

import { supabase } from '@/src/lib/supabaseClient'

interface User {
  id: string
  email: string | undefined
  name: string
  providerId: string
  photoUrl: string
}

interface AuthContextType {
  user: User | null;
  signInWithGithub: () => void;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  signInWithGithub: () => Promise.resolve(undefined),
  signOut: () => Promise.resolve(undefined)
})

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider ({ children }: Props) {
  const value = useAuthProvider()

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null)

  const handleUser = (rawUser: RawUser | null | undefined) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      setUser(user)
      return user
    } else {
      setUser(null)
      return false
    }
  }

  useEffect(() => {
    const session = supabase.auth.session()
    handleUser(session?.user)

    const { data } = supabase.auth.onAuthStateChange((_event: string, session: AuthSession | null) => {
      handleUser(session?.user)
    })

    return () => {
      data?.unsubscribe()
    }
  }, [])

  const signInWithGithub = async () => {
    await supabase.auth.signIn({
      provider: 'github'
    })
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    console.log('@@ error ', error)
  }

  return {
    user,
    signInWithGithub,
    signOut
  }
}

const formatUser = (user: RawUser) => {
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata.name,
    providerId: user.user_metadata.provider_id,
    photoUrl: user.user_metadata.avatar_url
  }
}
