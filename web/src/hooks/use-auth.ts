import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { transport, setAuthToken } from '@/client'
import React from 'react'

interface User {
  id: number
  name: string
  email: string
  role: string
  teamId: number
  avatar?: string
}

interface AuthContextValue {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, teamSlug: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY = 'luxo_studio_token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(!!token)

  useEffect(() => {
    if (!token) return
    setAuthToken(token)
    transport.call('me', {}).then((data) => {
      setUser(data as User)
    }).catch(() => {
      localStorage.removeItem(TOKEN_KEY)
      setToken(null)
    }).finally(() => {
      setLoading(false)
    })
  }, [token])

  const login = useCallback(async (email: string, _password: string) => {
    const result = await transport.call('login', { email }) as { token: string; member: User }
    localStorage.setItem(TOKEN_KEY, result.token)
    setAuthToken(result.token)
    setToken(result.token)
    setUser(result.member)
  }, [])

  const register = useCallback(async (name: string, email: string, password: string, teamSlug: string) => {
    const result = await transport.call('register', { name, email, password, teamSlug }) as { token: string; member: User }
    localStorage.setItem(TOKEN_KEY, result.token)
    setAuthToken(result.token)
    setToken(result.token)
    setUser(result.member)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
    setAuthToken(null)
  }, [])

  return React.createElement(AuthContext.Provider, {
    value: { user, token, loading, login, register, logout },
  }, children)
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
