import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AuthSession, User as RawUser } from '@supabase/supabase-js'

import { useRouter } from 'next/router'

import { supabase } from '@/lib/supabase'

export interface UserProps {
  id: string
  email: string | undefined
  name: string
  providerId: string
  photoUrl: string
}

interface AuthContextType {
  user: UserProps | null
  signUp: (email: string, password: string) => Promise<void>
  signInWithGithub: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  signUp: () => Promise.resolve(undefined),
  signInWithGithub: () => Promise.resolve(undefined),
  signInWithGoogle: () => Promise.resolve(undefined),
  signInWithEmail: () => Promise.resolve(undefined),
  signOut: () => Promise.resolve(undefined)
})

interface Props {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const value = useAuthProvider()

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useAuthProvider = () => {
  const [user, setUser] = useState<UserProps | null>(null)
  const router = useRouter()

  const handleUser = (rawUser: RawUser | null | undefined) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      setUser(user)
      Cookies.set('monolog-auth', 'true', {
        expires: 1
      })
      router.push('/')
    } else {
      setUser(null)
      Cookies.remove('monolog-auth')
    }
  }

  useEffect(() => {
    const session = supabase.auth.session()
    handleUser(session?.user)

    const { data } = supabase.auth.onAuthStateChange(
      (_event: string, session: AuthSession | null) => {
        handleUser(session?.user)
      }
    )

    return () => {
      data?.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    await supabase.auth.signUp({
      email,
      password
    })
  }

  const signInWithGithub = async () => {
    await supabase.auth.signIn({
      provider: 'github'
    })
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signIn({
      provider: 'google'
    })
  }

  const signInWithEmail = async (email: string, password: string) => {
    await supabase.auth.signIn({
      email,
      password
    })
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    Cookies.remove('monolog-auth')
    console.log('@@ error ', error)
  }

  return {
    user,
    signUp,
    signInWithGithub,
    signInWithGoogle,
    signInWithEmail,
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
