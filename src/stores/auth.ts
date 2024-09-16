import { defineStore } from 'pinia'
import type { User } from '../types'
import { getAuthUser } from '~/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as User | null,
  }),
  actions: {
    async setAuthUser() {
      this.user = await getAuthUser()
    },
    logout() {
      localStorage.removeItem('token')
      this.token = ''
      this.user = null
    },
  },
})
