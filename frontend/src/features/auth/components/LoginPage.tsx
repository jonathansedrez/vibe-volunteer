import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components'
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <OAuthButtons disabled={isLoading} />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive px-3 py-2 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
