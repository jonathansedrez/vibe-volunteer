import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardContent } from '@/shared/components'
import { LoginForm } from './LoginForm'
import { OAuthButtons } from './OAuthButtons'
import { useAuth } from '../hooks'
import type { LoginFormData } from '../schemas'

export function LoginPage() {
  const navigate = useNavigate()
  const { signInWithPassword, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    navigate({ to: '/' })
    return null
  }

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (result.error) {
        setError(result.error.message)
      } else {
        navigate({ to: '/' })
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Login failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <Card className="login-card">
        <CardHeader>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <OAuthButtons disabled={isLoading} />

          <div className="login-divider">
            <span>or</span>
          </div>

          {error && <div className="login-error">{error}</div>}

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
