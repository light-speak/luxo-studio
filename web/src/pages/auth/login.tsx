import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/shared/logo'

export function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm p-8">
      <div className="mb-8 flex flex-col items-center gap-3">
        <Logo className="h-12" />
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text">{t('auth.welcomeBack')}</h1>
          <p className="mt-1 text-sm text-text-muted">{t('auth.signInTo')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          placeholder={t('auth.passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="rounded-lg bg-error-muted px-3 py-2 text-xs text-error">{error}</p>
        )}

        <Button type="submit" disabled={loading} className="mt-2 w-full">
          {loading ? t('auth.signingIn') : t('auth.signIn')}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-text-muted">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="text-accent hover:underline">
          {t('auth.createOne')}
        </Link>
      </p>
    </Card>
  )
}
