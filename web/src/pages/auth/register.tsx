import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Zap } from 'lucide-react'

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [teamSlug, setTeamSlug] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(name, email, password, teamSlug)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm p-8">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted">
          <Zap className="h-6 w-6 text-accent" />
        </div>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text">Create account</h1>
          <p className="mt-1 text-sm text-text-muted">Get started with Luxo Studio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="name"
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Min 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Input
          id="team"
          label="Team slug"
          placeholder="my-team"
          value={teamSlug}
          onChange={(e) => setTeamSlug(e.target.value)}
          required
        />

        {error && (
          <p className="rounded-lg bg-error-muted px-3 py-2 text-xs text-error">{error}</p>
        )}

        <Button type="submit" disabled={loading} className="mt-2 w-full">
          {loading ? 'Creating...' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  )
}
