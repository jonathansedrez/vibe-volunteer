import { Link } from '@tanstack/react-router'
import { Button, Card, CardHeader, CardContent } from '@/shared/components'

export function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Vibe Volunteer</h1>
        <p>Connect with opportunities to make a difference</p>
      </header>

      <main className="home-content">
        <Card className="welcome-card">
          <CardHeader>
            <h2>Get Started</h2>
          </CardHeader>
          <CardContent>
            <p>
              Join our community of volunteers and discover meaningful ways to
              contribute to causes you care about.
            </p>
            <div className="home-actions">
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
