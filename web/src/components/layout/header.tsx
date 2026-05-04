import { useAuth } from '@/hooks/use-auth'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, setLanguage } from '@/i18n'
import { LogOut, User, Globe } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'

export function Header() {
  const { user, logout } = useAuth()
  const { t, i18n } = useTranslation()
  const [langOpen, setLangOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-surface-0/80 px-6 backdrop-blur-sm">
      <div className="text-sm text-text-secondary" />

      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted hover:bg-surface-2 hover:text-text transition-colors cursor-pointer"
            title="Language"
          >
            <Globe className="h-3.5 w-3.5" />
          </button>
          {langOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-1 w-32 rounded-lg border border-border bg-surface-1 p-1 shadow-lg">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false) }}
                    className={cn(
                      'flex w-full items-center rounded-md px-2.5 py-1.5 text-xs transition-colors cursor-pointer',
                      i18n.language === lang.code
                        ? 'bg-accent-muted text-accent'
                        : 'text-text-secondary hover:bg-surface-2 hover:text-text',
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-3">
              <User className="h-3.5 w-3.5 text-text-secondary" />
            </div>
            <span className="text-sm text-text-secondary">{user.name}</span>
          </div>
        )}
        <button
          onClick={logout}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted hover:bg-surface-2 hover:text-text transition-colors cursor-pointer"
          title={t('nav.logout')}
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  )
}
