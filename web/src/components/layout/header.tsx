import { useAuth } from '@/hooks/use-auth'
import { LogOut, User } from 'lucide-react'

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-surface-0/80 px-6 backdrop-blur-sm">
      <div className="text-sm text-text-secondary">
        {/* breadcrumbs 预留位 */}
      </div>

      <div className="flex items-center gap-3">
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
          title="Logout"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  )
}
