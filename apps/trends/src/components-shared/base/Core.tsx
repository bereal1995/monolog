import { useSession } from '@supabase/auth-helpers-react'

import { useEffect } from 'react'

import { useSupabaseData } from '@/hooks/useSupabaseProfile'
import { useSupabaseActions } from '@/states/supabase'

function Core() {
  const session = useSession()
  const { setProfile } = useSupabaseActions()
  const { getProfile } = useSupabaseData()

  useEffect(() => {
    if (!session) return

    async function getProfileData() {
      const profile = await getProfile()
      profile && setProfile(profile)
    }
    getProfileData()
  }, [session])

  return null
}

export default Core
