import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import {
  BarChart3,
  Database,
  Play,
  Activity,
  Network,
  Server,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { useState } from 'react'

export function Sidebar() {
  const { t } = useTranslation()
  const { projectId } = useParams()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { icon: BarChart3, label: t('nav.overview'), path: '' },
    { icon: Database, label: t('nav.schema'), path: '/schema' },
    { icon: Play, label: t('nav.playground'), path: '/playground' },
    { icon: Activity, label: t('nav.traces'), path: '/traces' },
    { icon: Network, label: t('nav.topology'), path: '/topology' },
    { icon: Server, label: t('nav.cluster'), path: '/cluster' },
  ]

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-surface-1 transition-all duration-200',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-4">
        <Logo className={collapsed ? 'h-5 w-5' : 'h-6'} />
        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight">Studio</span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/${projectId}${item.path}`}
              end={item.path === ''}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  collapsed && 'justify-center px-0',
                  isActive
                    ? 'bg-accent-muted text-accent'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text',
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t border-border px-2 py-2">
        <NavLink
          to={`/${projectId}/settings`}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              collapsed && 'justify-center px-0',
              isActive
                ? 'bg-accent-muted text-accent'
                : 'text-text-secondary hover:bg-surface-2 hover:text-text',
            )
          }
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>{t('nav.settings')}</span>}
        </NavLink>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-surface-2 hover:text-text transition-colors cursor-pointer"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4 shrink-0" />
              <span>{t('nav.collapse')}</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
