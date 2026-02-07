import type { AuthUser, OAuthProvider } from '../types'

export interface AuthProviderConfig {
  redirectUrl?: string
}

export interface SignInWithPasswordParams {
  email: string
  password: string
}

export interface SignUpWithPasswordParams {
  email: string
  password: string
  name?: string
}

export interface AuthResult {
  user: AuthUser | null
  error: Error | null
}

export interface AuthProvider {
  signInWithOAuth(
    provider: OAuthProvider,
    config?: AuthProviderConfig
  ): Promise<void>

  signInWithPassword(params: SignInWithPasswordParams): Promise<AuthResult>

  signUpWithPassword(params: SignUpWithPasswordParams): Promise<AuthResult>

  signOut(): Promise<void>

  getUser(): Promise<AuthUser | null>

  getSession(): Promise<{ accessToken: string } | null>

  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void
}
