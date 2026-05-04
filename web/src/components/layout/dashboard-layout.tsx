import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-surface-0">
      <Sidebar />
      <div className="pl-60">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
