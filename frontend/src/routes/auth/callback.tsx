import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuth } from '@/features/auth'

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
})

function AuthCallback() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate({ to: '/' })
      } else {
        navigate({ to: '/login' })
      }
    }
  }, [isAuthenticated, isLoading, navigate])

  return (
    <div className="auth-callback">
      <p>Completing sign in...</p>
    </div>
  )
}
