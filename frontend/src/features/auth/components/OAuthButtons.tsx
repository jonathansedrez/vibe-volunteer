import { useState } from 'react'
import { Button } from '@/shared/components'
import { useAuth } from '../hooks'
import type { OAuthProvider } from '../types'

interface OAuthButtonsProps {
  disabled?: boolean
}

const providers: { id: OAuthProvider; label: string }[] = [
  { id: 'google', label: 'Continue with Google' },
]

export function OAuthButtons({ disabled = false }: OAuthButtonsProps) {
  const { signInWithOAuth } = useAuth()
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(
    null
  )

  const handleOAuthLogin = async (provider: OAuthProvider) => {
    setLoadingProvider(provider)
    try {
      await signInWithOAuth(provider)
    } catch (error) {
      console.error(`OAuth login failed for ${provider}:`, error)
      setLoadingProvider(null)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {providers.map(({ id, label }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthLogin(id)}
          disabled={disabled || loadingProvider !== null}
        >
          {loadingProvider === id ? 'Redirecting...' : label}
        </Button>
      ))}
    </div>
  )
}
