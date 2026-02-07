import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { AuthUser, AuthState, OAuthProvider } from '../types'
import type { AuthProvider, SignInWithPasswordParams } from '../providers/types'

interface AuthContextValue extends AuthState {
  signInWithOAuth: (provider: OAuthProvider) => Promise<void>
  signInWithPassword: (
    params: SignInWithPasswordParams
  ) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  getAccessToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
  provider: AuthProvider
}

export function AuthContextProvider({ children, provider }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    provider.getUser().then((user) => {
      setUser(user)
      setIsLoading(false)
    })

    const unsubscribe = provider.onAuthStateChange((user) => {
      setUser(user)
      setIsLoading(false)
    })

    return unsubscribe
  }, [provider])

  const signInWithOAuth = useCallback(
    async (oauthProvider: OAuthProvider) => {
      await provider.signInWithOAuth(oauthProvider)
    },
    [provider]
  )

  const signInWithPassword = useCallback(
    async (params: SignInWithPasswordParams) => {
      const result = await provider.signInWithPassword(params)
      if (result.user) {
        setUser(result.user)
      }
      return { error: result.error }
    },
    [provider]
  )

  const signOut = useCallback(async () => {
    await provider.signOut()
    setUser(null)
  }, [provider])

  const getAccessToken = useCallback(async () => {
    const session = await provider.getSession()
    return session?.accessToken ?? null
  }, [provider])

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signInWithOAuth,
    signInWithPassword,
    signOut,
    getAccessToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}
