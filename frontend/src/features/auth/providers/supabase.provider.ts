import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { AuthUser, OAuthProvider } from '../types'
import type {
  AuthProvider,
  AuthProviderConfig,
  AuthResult,
  SignInWithPasswordParams,
  SignUpWithPasswordParams,
} from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables not set. Auth will not work correctly.'
  )
}

const supabase: SupabaseClient = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? ''
)

function mapSupabaseUser(
  supabaseUser: {
    id: string
    email?: string
    user_metadata?: Record<string, unknown>
  } | null
): AuthUser | null {
  if (!supabaseUser) return null

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    name:
      (supabaseUser.user_metadata?.full_name as string) ??
      (supabaseUser.user_metadata?.name as string),
    avatarUrl:
      (supabaseUser.user_metadata?.avatar_url as string) ??
      (supabaseUser.user_metadata?.picture as string),
  }
}

export const supabaseAuthProvider: AuthProvider = {
  async signInWithOAuth(
    provider: OAuthProvider,
    config?: AuthProviderConfig
  ): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo:
          config?.redirectUrl ?? `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      throw error
    }
  },

  async signInWithPassword(
    params: SignInWithPasswordParams
  ): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    })

    return {
      user: mapSupabaseUser(data.user),
      error: error ?? null,
    }
  },

  async signUpWithPassword(
    params: SignUpWithPasswordParams
  ): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          full_name: params.name,
        },
      },
    })

    return {
      user: mapSupabaseUser(data.user),
      error: error ?? null,
    }
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  },

  async getUser(): Promise<AuthUser | null> {
    const { data } = await supabase.auth.getUser()
    return mapSupabaseUser(data.user)
  },

  async getSession(): Promise<{ accessToken: string } | null> {
    const { data } = await supabase.auth.getSession()
    if (!data.session) return null

    return {
      accessToken: data.session.access_token,
    }
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(mapSupabaseUser(session?.user ?? null))
    })

    return () => {
      data.subscription.unsubscribe()
    }
  },
}

export { supabase }
