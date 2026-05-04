import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-0 p-4">
      <Outlet />
    </div>
  )
}
