import { defineStore } from 'pinia'
import type { User } from '../types'
import { getAuthUser } from '~/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as User | null,
  }),
  getters: {
    displayName: (state) => {
      if (!state.user) return ''
      const res: string[] = []
      if (state.user.firstName) res.push(state.user.firstName)
      if (state.user.lastName) res.push(state.user.lastName)
      return res.join(' ')
    },
  },
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
