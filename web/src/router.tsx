import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/components/layout/root-layout'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Login } from '@/pages/auth/login'
import { Register } from '@/pages/auth/register'
import { ProjectList } from '@/pages/projects/project-list'
import { MetricsDashboard } from '@/pages/metrics/metrics-dashboard'
import { SchemaBrowser } from '@/pages/schema/schema-browser'
import { Playground } from '@/pages/playground/playground'
import { TraceList } from '@/pages/traces/trace-list'
import { ServiceTopology } from '@/pages/topology/service-topology'
import { ClusterStatus } from '@/pages/cluster/cluster-status'
import { SettingsPage } from '@/pages/settings/settings'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '/',
    element: <ProjectList />,
  },
  {
    path: '/:projectId',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <MetricsDashboard /> },
      { path: 'schema', element: <SchemaBrowser /> },
      { path: 'playground', element: <Playground /> },
      { path: 'traces', element: <TraceList /> },
      { path: 'topology', element: <ServiceTopology /> },
      { path: 'cluster', element: <ClusterStatus /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
