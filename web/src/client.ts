import { FetchTransport } from '@luxo/client'

const endpoint = import.meta.env.VITE_API_URL || '/luvia'

export const transport = new FetchTransport({ endpoint })

export function setAuthToken(token: string | null) {
  if (token) {
    transport.setToken(token)
  }
}
