import { Link } from '@tanstack/react-router'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components'
import { useAuth } from '@/features/auth'

export function HomePage() {
  const { user, isAuthenticated, signOut, isLoading } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Vibe Volunteer</h1>
        <p className="text-lg text-muted-foreground">
          Connect with opportunities to make a difference
        </p>
      </header>

      <main className="max-w-[600px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              {isAuthenticated
                ? `Welcome, ${user?.name || user?.email}`
                : 'Get Started'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAuthenticated ? (
              <>
                <p className="mb-6 text-muted-foreground">
                  You are signed in and ready to make a difference.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleLogout}>Sign Out</Button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-6 text-muted-foreground">
                  Join our community of volunteers and discover meaningful ways
                  to contribute to causes you care about.
                </p>
                <div className="flex gap-4">
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
