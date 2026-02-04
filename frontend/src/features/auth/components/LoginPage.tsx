import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardContent } from '@/shared/components'
import { LoginForm } from './LoginForm'
import type { LoginFormData } from '../schemas'

export function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual login logic
      console.log('Login attempt:', data.email)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      navigate({ to: '/' })
    } catch (error) {
      console.error('Login failed:', error)
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
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
