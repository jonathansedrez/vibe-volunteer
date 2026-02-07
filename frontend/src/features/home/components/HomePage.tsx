import { Link } from '@tanstack/react-router'
import { Button, Card, CardHeader, CardContent } from '@/shared/components'
import { useAuth } from '@/features/auth'

export function HomePage() {
  const { user, isAuthenticated, signOut, isLoading } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  if (isLoading) {
    return (
      <div className="home-page">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Vibe Volunteer</h1>
        <p>Connect with opportunities to make a difference</p>
      </header>

      <main className="home-content">
        <Card className="welcome-card">
          <CardHeader>
            <h2>{isAuthenticated ? `Welcome, ${user?.name || user?.email}` : 'Get Started'}</h2>
          </CardHeader>
          <CardContent>
            {isAuthenticated ? (
              <>
                <p>You are signed in and ready to make a difference.</p>
                <div className="home-actions">
                  <Button onClick={handleLogout}>Sign Out</Button>
                </div>
              </>
            ) : (
              <>
                <p>
                  Join our community of volunteers and discover meaningful ways to
                  contribute to causes you care about.
                </p>
                <div className="home-actions">
                  <Link to="/login">
                    <Button>Sign In</Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
