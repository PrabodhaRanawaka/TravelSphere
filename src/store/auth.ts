import { defineStore } from 'pinia'
import type { AuthUser, LoginRequest } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null
  }),

  actions: {
    async login(payload: LoginRequest) {
      try {
        const res = await fetch('https://dummyjson.com/auth/login?expiresInMins=60', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: payload.username,
            password: payload.password,
            expiresInMins: 60
          })
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message || 'Login failed')
        }

        const data: AuthUser = await res.json()
        this.user = data
        localStorage.setItem('authUser', JSON.stringify(data))
      } catch (err: unknown) {
        if (err instanceof Error) throw err
        throw new Error('Unknown login error')
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('authUser')
    },

    restoreSession() {
      const stored = localStorage.getItem('authUser')
      if (stored) this.user = JSON.parse(stored)
    }
  }
})