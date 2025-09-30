import { useEffect } from 'react'
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { getSupabase } from '@/sdk/supabase'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      type AuthLocationState = { from?: { pathname?: string } }
      const to = (location.state as AuthLocationState | undefined)?.from?.pathname || '/dashboard'
      navigate(to, { replace: true })
    }
  }, [user, location, navigate])

  return (
    <div className="mx-auto max-w-md p-6">
      {getSupabase() ? (
        <SupabaseAuth
          supabaseClient={getSupabase()!}
          providers={["google", "github"]}
          appearance={{ theme: ThemeSupa }}
          view="sign_in"
          onlyThirdPartyProviders={false}
          showLinks
          socialLayout="horizontal"
        />
      ) : (
        <div className="text-sm text-muted-foreground">
          Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable authentication.
        </div>
      )}
    </div>
  )
}


