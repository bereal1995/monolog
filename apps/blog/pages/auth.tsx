import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/auth/Account'

const Hh = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className='container'>
      {!session ? (
        <Auth
          providers={['github']}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme='dark'
        />
      ) : (
        <Account session={session} />
      )}
    </div>
  )
}

export default Hh
