export type OAuthProvider = 'google' | 'github' | 'apple'

export interface AuthUser {
  id: string
  email: string
  name?: string
  avatarUrl?: string
}

export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AuthError {
  message: string
  code?: string
}
