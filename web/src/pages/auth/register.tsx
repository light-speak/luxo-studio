import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/shared/logo'

export function Register() {
  const { t } = useTranslation()
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
      setError(err instanceof Error ? err.message : t('auth.registerFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm p-8">
      <div className="mb-8 flex flex-col items-center gap-3">
        <Logo className="h-12" />
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text">{t('auth.createAccount')}</h1>
          <p className="mt-1 text-sm text-text-muted">{t('auth.getStarted')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="name"
          label={t('auth.name')}
          placeholder={t('auth.namePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="email"
          label={t('auth.email')}
          type="email"
          placeholder={t('auth.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label={t('auth.password')}
          type="password"
          placeholder={t('auth.passwordMinLength')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Input
          id="team"
          label={t('auth.teamSlug')}
          placeholder={t('auth.teamSlugPlaceholder')}
          value={teamSlug}
          onChange={(e) => setTeamSlug(e.target.value)}
          required
        />

        {error && (
          <p className="rounded-lg bg-error-muted px-3 py-2 text-xs text-error">{error}</p>
        )}

        <Button type="submit" disabled={loading} className="mt-2 w-full">
          {loading ? t('auth.creating') : t('auth.createAccount')}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-text-muted">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="text-accent hover:underline">
          {t('auth.signIn')}
        </Link>
      </p>
    </Card>
  )
}
