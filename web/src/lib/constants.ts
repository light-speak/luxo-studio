export const ROUTES = {
  login: '/login',
  register: '/register',
  projects: '/',
  overview: (id: string) => `/${id}`,
  schema: (id: string) => `/${id}/schema`,
  playground: (id: string) => `/${id}/playground`,
  traces: (id: string) => `/${id}/traces`,
  topology: (id: string) => `/${id}/topology`,
  cluster: (id: string) => `/${id}/cluster`,
  settings: (id: string) => `/${id}/settings`,
} as const

export const STATUS_COLORS = {
  ONLINE: 'bg-success',
  OFFLINE: 'bg-text-muted',
  ERROR: 'bg-error',
  OK: 'text-success',
} as const
